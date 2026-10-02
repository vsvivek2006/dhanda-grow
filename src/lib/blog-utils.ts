import fs from "fs";
import path from "path";
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

      if (match) {
        const frontmatter = match[1];
        content = match[2];

        const titleMatch = frontmatter.match(/title:\s*"(.*?)"/);
        const dateMatch = frontmatter.match(/date:\s*"(.*?)"/);
        const excerptMatch = frontmatter.match(/excerpt:\s*"(.*?)"/);

        if (titleMatch) title = titleMatch[1];
        if (dateMatch) date = dateMatch[1];
        if (excerptMatch) excerpt = excerptMatch[1];
      }

      return { slug, title, date, excerpt, content };
    });

  return posts;
}

export async function getAllPosts(): Promise<BlogPost[]> {
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

  // 2. Query Supabase blog_posts table (takes priority over local file defaults)
  try {
    const { data: dbPosts, error } = await supabaseAdmin
      .from("blog_posts")
      .select("id, title, slug, excerpt, content, tags, cover_image_url, created_at, updated_at")
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
          content: row.content,
          tags: Array.isArray(row.tags) ? row.tags : [],
          cover_image_url: row.cover_image_url || undefined,
        });
      }
    }
  } catch (err) {
    console.warn("Notice querying Supabase blog posts:", err);
  }

  // Sort descending by date
  return Array.from(postsMap.values()).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  // Check Supabase first
  try {
    const { data: row, error } = await supabaseAdmin
      .from("blog_posts")
      .select("id, title, slug, excerpt, content, tags, cover_image_url, created_at, updated_at")
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
        content: row.content,
        tags: Array.isArray(row.tags) ? row.tags : [],
        cover_image_url: row.cover_image_url || undefined,
      };
    }
  } catch (err) {
    console.warn(`Notice querying Supabase for slug "${slug}":`, err);
  }

  // Fallback to local markdown files
  const localPosts = getLocalPosts();
  return localPosts.find((p) => p.slug === slug) || null;
}
