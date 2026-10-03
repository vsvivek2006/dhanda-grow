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
      const { data: dbPosts, error } = await supabaseAdmin
        .from("blog_posts")
        .select("id, title, slug, excerpt, tags, cover_image_url, author, created_at, updated_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Notice fetching posts from Supabase:", error.message);
      }

      const localPosts = getLocalPosts();
      const postsMap = new Map<string, PostSummary>();

      // Populate from DB
      (dbPosts || []).forEach((p: any) => {
        postsMap.set(p.slug, {
          id: p.id || p.slug,
          title: p.title,
          slug: p.slug,
          meta_description: p.excerpt || "",
          cover_image_url: p.cover_image_url || "",
          author: p.author || "Dhanda Grow Team",
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
            cover_image_url: lp.cover_image_url || "",
            author: lp.author || "Dhanda Grow Team",
            tags: lp.tags || [],
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-gray-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Blog Posts
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage, draft, edit, and publish your blog articles.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-colors cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          Create Post
        </Link>
      </div>

      <PostTable initialPosts={postList} />
    </div>
  );
}
