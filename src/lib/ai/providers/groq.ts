import "server-only";

import Groq from "groq-sdk";
import { buildBlogPostPrompt, blogPostResponseSchema } from "../prompts/blogPost";
import { normalizeContentToHtml } from "../contentFormatter";
import { getValidModel } from "../models";
import type { GenerateBlogPostInput, GenerateBlogPostOutput } from "../generateBlogPost";

let groqInstance: Groq | null = null;

function getGroqClient(): Groq {
  if (!groqInstance) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("GROQ_API_KEY is not set in environment variables");
    }
    groqInstance = new Groq({ apiKey });
  }
  return groqInstance;
}

/** Retry on transient Groq errors (429 rate-limit, 502/503 server errors). */
async function withRetry<T>(fn: () => Promise<T>, maxRetries = 2): Promise<T> {
  const RETRIABLE = [429, 502, 503];
  const BACKOFF_MS = [1000, 3000];
  let lastError: unknown;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err: unknown) {
      lastError = err;
      // Groq SDK surfaces status as err.status
      const status = (err as { status?: number }).status;
      if (!status || !RETRIABLE.includes(status) || attempt === maxRetries) {
        throw err;
      }
      await new Promise((res) => setTimeout(res, BACKOFF_MS[attempt] ?? 3000));
    }
  }
  throw lastError;
}

export async function generateBlogPostWithGroq(
  input: GenerateBlogPostInput
): Promise<GenerateBlogPostOutput> {
  const groq = getGroqClient();
  const prompt = buildBlogPostPrompt(input);
  const model = getValidModel(input.model || process.env.GROQ_MODEL);

  const completion = await withRetry(() =>
    groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a seasoned human editorial director and performance marketing practitioner with 15+ years of live agency experience. You write with deep analytical substance, natural burstiness, and zero detectable AI clichés or synthetic filler. Output strictly valid JSON matching the requested schema. The content field MUST be clean, valid semantic HTML with rich visual hierarchy (h2, h3, p, ul, ol, li, strong, blockquote). Never output markdown code blocks or commentary around the JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model,
      // gpt-oss-120b is a reasoning model — hidden chain-of-thought tokens are
      // drawn from this SAME budget before it writes a single character of
      // visible content. 4096 was tight enough that reasoning could eat the
      // whole budget and leave message.content empty or cut off mid-string —
      // exactly the truncated/invalid JSON safeParseJson below was patching
      // over. Raised well past what an ~800-1500 word HTML post needs (model
      // supports up to 65,536).
      max_completion_tokens: 8000,
      // Content generation doesn't need heavy deliberation — "low" leaves far
      // more of the shared budget for the actual answer. Bump to "medium"
      // only if you notice a real quality drop on harder topics.
      reasoning_effort: "low",
      // Schema-guaranteed JSON via constrained decoding, instead of the older
      // json_object mode, which only checks syntax after the fact and can't
      // help at all when the response was truncated for token-budget reasons.
      response_format: { type: "json_schema", json_schema: blogPostResponseSchema },
    })
  );

  const choice = completion.choices[0];
  const raw = choice?.message?.content;

  if (choice?.finish_reason === "length") {
    // Ran out of budget mid-response — almost certainly reasoning tokens
    // (or an unusually long post) eating into max_completion_tokens.
    // Logged explicitly so this is diagnosable instead of silently falling
    // through to the regex-repair fallback below.
    console.error(
      "Groq response truncated (finish_reason: length) — consider raising max_completion_tokens further or lowering reasoning_effort.",
      { usage: completion.usage }
    );
  }

  if (!raw) {
    throw new Error("No response received from Groq");
  }

  const parsed = safeParseJson(raw);

  // Normalize and clean HTML content ensuring full rich-text tag validity
  const formattedHtml = normalizeContentToHtml(parsed.content || "");

  return {
    title: parsed.title ? String(parsed.title).trim() : "",
    metaDescription: parsed.metaDescription ? String(parsed.metaDescription).trim() : "",
    content: formattedHtml,
    suggestedTags: Array.isArray(parsed.suggestedTags)
      ? parsed.suggestedTags.map((t: unknown) => String(t).trim()).filter(Boolean)
      : [],
  };
}

interface ParsedBlogResponse {
  title?: string;
  metaDescription?: string;
  content?: string;
  suggestedTags?: string[];
}

function safeParseJson(raw: string): ParsedBlogResponse {
  let cleaned = raw.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "").trim();
  }
  try {
    return JSON.parse(cleaned);
  } catch {
    // Repair attempt for truncated JSON — kept as a safety net. With
    // max_completion_tokens raised and structured outputs on, this path
    // should now rarely trigger.
    let repaired = cleaned;
    if (!repaired.endsWith("}")) {
      const quoteCount = (repaired.match(/(?<!\\)"/g) || []).length;
      if (quoteCount % 2 !== 0) {
        repaired += '"';
      }
      repaired += "}";
    }
    try {
      return JSON.parse(repaired);
    } catch {
      // Robust regex extraction fallback
      const title = repaired.match(/"title"\s*:\s*"([^"]+)"/)?.[1] || "";
      const metaDescription = repaired.match(/"metaDescription"\s*:\s*"([^"]+)"/)?.[1] || "";
      const contentMatch = repaired.match(/"content"\s*:\s*"([\s\S]*?)(?:"\s*,\s*"suggestedTags"|"$)/);
      const content = contentMatch
        ? contentMatch[1].replace(/\\n/g, "\n").replace(/\\"/g, '"')
        : "";
      return { title, metaDescription, content, suggestedTags: [] };
    }
  }
}