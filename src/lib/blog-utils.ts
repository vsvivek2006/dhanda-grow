import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR);

  const posts = files
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const fullPath = path.join(BLOG_DIR, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Extremely simple frontmatter parser for our exact format
      const match = fileContents.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      
      let title = slug;
      let date = "";
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
    })
    // Sort by date descending
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}
