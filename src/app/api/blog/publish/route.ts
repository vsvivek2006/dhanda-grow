import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export async function POST(req: Request) {
  try {
    const { title, excerpt, content, slug } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const postSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!fs.existsSync(BLOG_DIR)) {
      fs.mkdirSync(BLOG_DIR, { recursive: true });
    }

    const today = new Date().toISOString().split("T")[0];
    const cleanExcerpt = (excerpt || title).replace(/"/g, '\\"');
    const cleanTitle = title.replace(/"/g, '\\"');

    const fileContent = `---
title: "${cleanTitle}"
date: "${today}"
excerpt: "${cleanExcerpt}"
---

${content}
`;

    const filePath = path.join(BLOG_DIR, `${postSlug}.md`);
    fs.writeFileSync(filePath, fileContent, "utf8");

    return NextResponse.json({
      success: true,
      slug: postSlug,
      url: `/blog/${postSlug}`,
    });
  } catch (error: any) {
    console.error("Error publishing blog post:", error);
    return NextResponse.json(
      { error: error.message || "Failed to publish blog post" },
      { status: 500 }
    );
  }
}
