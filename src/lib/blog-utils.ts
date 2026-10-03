import fs from "fs";
import path from "path";
import { cache } from "react";
import { supabaseAdmin } from "@/lib/supabase/server";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags?: string[];
  cover_image_url?: string;
  author?: string;
}

export const DEFAULT_BLOG_COVERS = [
  "/images/dhanda-3d-hero.jpg",
  "/images/3d-maps-radar.jpg",
  "/images/3d-social-studio.jpg",
  "/images/3d-reviews-growth.jpg",
];

export function getPostCoverImage(coverUrl?: string | null, slugOrIndex?: string | number): string {
  if (coverUrl && typeof coverUrl === "string" && coverUrl.trim().length > 0 && !coverUrl.includes("undefined")) {
    return coverUrl.trim();
  }
  if (typeof slugOrIndex === "number") {
    return DEFAULT_BLOG_COVERS[Math.abs(slugOrIndex) % DEFAULT_BLOG_COVERS.length];
  }
  if (typeof slugOrIndex === "string" && slugOrIndex.trim().length > 0) {
    let hash = 0;
    for (let i = 0; i < slugOrIndex.length; i++) {
      hash = (hash << 5) - hash + slugOrIndex.charCodeAt(i);
      hash |= 0;
    }
    return DEFAULT_BLOG_COVERS[Math.abs(hash) % DEFAULT_BLOG_COVERS.length];
  }
  return DEFAULT_BLOG_COVERS[0];
}

export function getLocalPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR);

  const posts = files
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const fullPath = path.join(BLOG_DIR, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Simple frontmatter parser for our exact format
      const match = fileContents.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

      let title = slug;
      let date = new Date().toISOString().split("T")[0];
      let excerpt = "";
      let content = fileContents;
      let cover_image_url: string | undefined = undefined;
      let author: string | undefined = undefined;

      if (match) {
        const frontmatter = match[1];
        content = match[2];

        const titleMatch = frontmatter.match(/title:\s*"(.*?)"/);
        const dateMatch = frontmatter.match(/date:\s*"(.*?)"/);
        const excerptMatch = frontmatter.match(/excerpt:\s*"(.*?)"/);
        const tagsMatch = frontmatter.match(/tags:\s*(\[[\s\S]*?\])/);
        const coverMatch = frontmatter.match(/cover_image_url:\s*"(.*?)"/);
        const authorMatch = frontmatter.match(/author:\s*"(.*?)"/);

        if (titleMatch) title = titleMatch[1];
        if (dateMatch) date = dateMatch[1];
        if (excerptMatch) excerpt = excerptMatch[1];
        if (coverMatch && coverMatch[1]) cover_image_url = coverMatch[1];
        if (authorMatch && authorMatch[1]) author = authorMatch[1];

        let tags: string[] = [];
        if (tagsMatch) {
          try {
            tags = JSON.parse(tagsMatch[1]);
          } catch {
            tags = [];
          }
        }

        return { slug, title, date, excerpt, content, tags, cover_image_url, author };
      }

      return { slug, title, date, excerpt, content, tags: [] };
    });

  return posts;
}

export const getAllPosts = cache(async (): Promise<BlogPost[]> => {
  const postsMap = new Map<string, BlogPost>();

  // 1. Seed with local markdown files
  try {
    const localPosts = getLocalPosts();
    for (const post of localPosts) {
      postsMap.set(post.slug, post);
    }
  } catch (err) {
    console.warn("Notice loading local markdown posts:", err);
  }

  // 2. Query Supabase blog_posts table (exclude heavy 'content' column to minimize DB wire transfer)
  try {
    const { data: dbPosts, error } = await supabaseAdmin
      .from("blog_posts")
      .select("id, title, slug, excerpt, tags, cover_image_url, author, created_at, updated_at")
      .order("created_at", { ascending: false });

    if (!error && dbPosts) {
      for (const row of dbPosts) {
        postsMap.set(row.slug, {
          slug: row.slug,
          title: row.title,
          date: row.created_at
            ? new Date(row.created_at).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          excerpt: row.excerpt || row.title,
          content: "", // Content is deliberately deferred to getPostBySlug to keep listing payloads lightweight
          tags: Array.isArray(row.tags) ? row.tags : [],
          cover_image_url: row.cover_image_url || undefined,
          author: row.author || undefined,
        });
      }
    }
  } catch (err) {
    console.warn("Notice querying Supabase blog posts:", err);
  }

  // Sort descending by date
  return Array.from(postsMap.values()).sort((a, b) => (a.date < b.date ? 1 : -1));
});

export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  // Check Supabase first
  try {
    const { data: row, error } = await supabaseAdmin
      .from("blog_posts")
      .select("id, title, slug, excerpt, content, tags, cover_image_url, author, created_at, updated_at")
      .eq("slug", slug)
      .maybeSingle();

    if (!error && row) {
      return {
        slug: row.slug,
        title: row.title,
        date: row.created_at
          ? new Date(row.created_at).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        excerpt: row.excerpt || row.title,
        content: row.content || "",
        tags: Array.isArray(row.tags) ? row.tags : [],
        cover_image_url: row.cover_image_url || undefined,
        author: row.author || undefined,
      };
    }
  } catch (err) {
    console.warn(`Notice querying Supabase for slug "${slug}":`, err);
  }

  // Fallback to local markdown files
  const localPosts = getLocalPosts();
  return localPosts.find((p) => p.slug === slug) || null;
});
