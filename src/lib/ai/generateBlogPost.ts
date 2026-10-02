import "server-only";

import { generateBlogPostWithGroq } from "./providers/groq";

export interface GenerateBlogPostInput {
  topic: string;
  tone?: string;            // e.g. "professional", "conversational"
  keywords?: string[];      // SEO keywords to naturally include
  wordCount?: number;       // approx target length
  audience?: string;        // e.g. "small business owners in India"
  model?: string;           // AI model ID (e.g. "openai/gpt-oss-120b")
}

export interface GenerateBlogPostOutput {
  title: string;
  metaDescription: string;
  content: string;          // HTML, ready to load into Tiptap
  suggestedTags: string[];
}

export async function generateBlogPost(
  input: GenerateBlogPostInput
): Promise<GenerateBlogPostOutput> {
  const apiKey = process.env.GROQ_API_KEY;

  if (apiKey && apiKey !== "your_groq_api_key_here") {
    try {
      return await generateBlogPostWithGroq(input);
    } catch (err) {
      console.warn("Groq generation failed or rate limited, using intelligent fallback template:", err);
    }
  }

  // Fallback high-value editorial generator
  return generateEditorialDraft(input);
}

function generateEditorialDraft(input: GenerateBlogPostInput): GenerateBlogPostOutput {
  const cleanTopic = input.topic.trim();
  const kwList = input.keywords && input.keywords.length > 0
    ? input.keywords
    : ["local marketing", "customer acquisition", "business growth"];

  const title = `${cleanTopic}: The Practical Guide for Local Business Owners`;
  const metaDescription = `Learn proven strategies and step-by-step tactics to master ${cleanTopic.toLowerCase()}. Practical tips designed specifically for local shops and service brands.`;

  const content = `
<h2>Introduction: Why ${cleanTopic} Matters Right Now</h2>
<p>For modern local businesses, staying competitive requires more than just opening your doors and hoping customers find you. Whether you run a neighborhood retail store, a bustling restaurant, or a specialized healthcare clinic, mastering <strong>${cleanTopic.toLowerCase()}</strong> has become an essential pillar for sustainable footfall and revenue growth.</p>

<p>In this comprehensive guide, we unpack the foundational strategies, immediate action steps, and common pitfalls to avoid as you optimize your local presence.</p>

<h2>1. Understanding the Core Mechanics</h2>
<p>To succeed with ${kwList[0] || "modern marketing"}, you must first understand how nearby consumers make buying decisions. Over 80% of local purchases begin with an online search or social recommendation. When customers search within your neighborhood, they look for three critical signals:</p>
<ul>
  <li><strong>Relevance:</strong> Does your offering directly address what they are searching for?</li>
  <li><strong>Social Proof & Trust:</strong> Do other local customers consistently leave authentic 5-star reviews?</li>
  <li><strong>Accessibility:</strong> Can they easily find your location, opening hours, and direct contact options on WhatsApp?</li>
</ul>

<h2>2. Actionable Step-by-Step Implementation</h2>
<p>Here is the exact playbook to implement ${cleanTopic.toLowerCase()} effectively in your day-to-day operations:</p>
<ol>
  <li><strong>Audit Your Existing Listings:</strong> Review your primary categories, address consistency, and fresh visual assets.</li>
  <li><strong>Automate Routine Outreach:</strong> Never leave customer engagement to manual memory. Use automated review collection and scheduled social posts to keep your brand top-of-mind.</li>
  <li><strong>Focus on Keywords Naturally:</strong> Integrate key terms such as <em>${kwList.join(", ")}</em> naturally into your profile descriptions, post captions, and customer responses.</li>
</ol>

<blockquote>
  <p>"Consistent local visibility isn't built on one-time hacks. It is the cumulative result of fresh content, rapid review responses, and accurate profile data."</p>
</blockquote>

<h2>3. Common Mistakes to Avoid</h2>
<p>Many business owners struggle not from lack of effort, but from misdirected energy. Avoid these critical mistakes:</p>
<ul>
  <li>Ignoring negative feedback instead of replying politely within 24 hours.</li>
  <li>Posting irregularly without a structured festive or promotional calendar.</li>
  <li>Failing to track where your new customer inquiries are actually coming from.</li>
</ul>

<h2>Conclusion & Next Steps</h2>
<p>Mastering ${cleanTopic.toLowerCase()} does not have to eat up 20 hours of your week. By setting up automated systems and focusing on customer trust, your local business can consistently outperform larger competitors and dominate local search.</p>
`;

  return {
    title,
    metaDescription,
    content: content.trim(),
    suggestedTags: [...kwList, "Local SEO", "Business Growth"],
  };
}
