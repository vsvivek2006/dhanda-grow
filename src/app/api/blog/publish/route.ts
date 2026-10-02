import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { supabaseAdmin } from "@/lib/supabase/server";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export async function POST(req: Request) {
  try {
    const { title, excerpt, content, slug, tags } = await req.json();

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

    // Also persist/sync into Supabase blog_posts table
    try {
      await supabaseAdmin.from("blog_posts").upsert(
        {
          slug: postSlug,
          title,
          excerpt: excerpt || title,
          content,
          tags: Array.isArray(tags) ? tags : [],
          updated_at: new Date().toISOString(),
        },
        { onConflict: "slug" }
      );
    } catch (dbErr) {
      console.warn("Supabase blog sync notice:", dbErr);
    }

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
