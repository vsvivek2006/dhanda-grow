import { NextResponse } from "next/server";
import { generateBlogPost } from "@/lib/ai/generateBlogPost";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, tone, keywords, wordCount, audience, model } = body;

    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const output = await generateBlogPost({
      topic,
      tone,
      keywords,
      wordCount,
      audience,
      model,
    });

    return NextResponse.json(output);
  } catch (error: any) {
    console.error("Error generating blog post:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
