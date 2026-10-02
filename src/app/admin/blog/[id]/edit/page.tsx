import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/server";
import { getPostBySlug } from "@/lib/blog-utils";
import { PostEditor } from "@/components/admin/PostEditor";
import type { PostRecord } from "@/lib/validations/post";

interface EditBlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const { id } = await params;

  const fetchPost = async (): Promise<PostRecord | null> => {
    try {
      // 1. Try finding in Supabase by ID
      const { data: dbPostById } = await supabaseAdmin
        .from("blog_posts")
        .select("id, title, slug, content, excerpt, tags, created_at, updated_at")
        .eq("id", id)
        .single();

      if (dbPostById) {
        return {
          id: dbPostById.id,
          title: dbPostById.title,
          slug: dbPostById.slug,
          content: dbPostById.content || "",
          meta_description: dbPostById.excerpt || "",
          cover_image_url: "",
          author: "Dhanda Grow Team",
          tags: Array.isArray(dbPostById.tags) ? dbPostById.tags : [],
          status: "published",
          source: "manual",
          published_at: dbPostById.created_at,
          created_at: dbPostById.created_at || new Date().toISOString(),
          updated_at: dbPostById.updated_at || new Date().toISOString(),
        };
      }

      // 2. Try finding in Supabase by Slug
      const { data: dbPostBySlug } = await supabaseAdmin
        .from("blog_posts")
        .select("id, title, slug, content, excerpt, tags, created_at, updated_at")
        .eq("slug", id)
        .single();

      if (dbPostBySlug) {
        return {
          id: dbPostBySlug.id,
          title: dbPostBySlug.title,
          slug: dbPostBySlug.slug,
          content: dbPostBySlug.content || "",
          meta_description: dbPostBySlug.excerpt || "",
          cover_image_url: "",
          author: "Dhanda Grow Team",
          tags: Array.isArray(dbPostBySlug.tags) ? dbPostBySlug.tags : [],
          status: "published",
          source: "manual",
          published_at: dbPostBySlug.created_at,
          created_at: dbPostBySlug.created_at || new Date().toISOString(),
          updated_at: dbPostBySlug.updated_at || new Date().toISOString(),
        };
      }

      // 3. Fallback to local markdown file
      const localPost = await getPostBySlug(id);
      if (localPost) {
        return {
          id: localPost.slug,
          title: localPost.title,
          slug: localPost.slug,
          content: localPost.content || "",
          meta_description: localPost.excerpt || "",
          cover_image_url: "",
          author: "Dhanda Grow Team",
          tags: [],
          status: "published",
          source: "manual",
          published_at: localPost.date,
          created_at: localPost.date || new Date().toISOString(),
          updated_at: localPost.date || new Date().toISOString(),
        };
      }

      return null;
    } catch (err) {
      console.error("Error fetching post for editing:", err);
      return null;
    }
  };

  const post = await fetchPost();

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 pb-3 border-b border-white/10">
        <Link
          href="/admin/blog"
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 transition-colors cursor-pointer"
          title="Back to Blog Posts"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Edit Blog Post
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Modify article contents, regenerate sections, update meta tags, or change publishing status.
          </p>
        </div>
      </div>

      <PostEditor initialData={post} />
    </div>
  );
}
