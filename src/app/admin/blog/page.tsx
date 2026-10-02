import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/server";
import { getLocalPosts } from "@/lib/blog-utils";
import { PostTable } from "@/components/admin/PostTable";
import type { PostSummary } from "@/lib/validations/post";

export const revalidate = 0; // Always fresh list

export default async function AdminBlogListPage() {
  const fetchPosts = async (): Promise<PostSummary[]> => {
    try {
      // 1. Fetch from Supabase blog_posts
      const { data: dbPosts, error } = await supabaseAdmin
        .from("blog_posts")
        .select("id, title, slug, excerpt, tags, created_at, updated_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Notice fetching posts from Supabase:", error.message);
      }

      // 2. Fetch local markdown posts
      const localPosts = getLocalPosts();

      const postsMap = new Map<string, PostSummary>();

      // Populate from DB
      (dbPosts || []).forEach((p: any) => {
        postsMap.set(p.slug, {
          id: p.id || p.slug,
          title: p.title,
          slug: p.slug,
          meta_description: p.excerpt || "",
          cover_image_url: "",
          author: "Dhanda Grow Team",
          tags: Array.isArray(p.tags) ? p.tags : [],
          status: "published",
          source: "manual",
          published_at: p.created_at,
          created_at: p.created_at || new Date().toISOString(),
          updated_at: p.updated_at || new Date().toISOString(),
        });
      });

      // Merge local markdown posts
      localPosts.forEach((lp) => {
        if (!postsMap.has(lp.slug)) {
          postsMap.set(lp.slug, {
            id: lp.slug,
            title: lp.title,
            slug: lp.slug,
            meta_description: lp.excerpt || "",
            cover_image_url: "",
            author: "Dhanda Grow Team",
            tags: [],
            status: "published",
            source: "manual",
            published_at: lp.date,
            created_at: lp.date || new Date().toISOString(),
            updated_at: lp.date || new Date().toISOString(),
          });
        }
      });

      return Array.from(postsMap.values());
    } catch (err) {
      console.error("Admin blog list fetch error:", err);
      return [];
    }
  };

  const postList = await fetchPosts();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Blog Posts &amp; Content Hub
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage, draft, edit, and publish your AI-crafted or manual articles.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-md shadow-purple-600/30 cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          Create New Post
        </Link>
      </div>

      <PostTable initialPosts={postList} />
    </div>
  );
}
