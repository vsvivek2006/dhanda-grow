import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PostEditor } from "@/components/admin/PostEditor";

export const metadata = {
  title: "Create Blog Post | Admin | Dhanda Grow",
};

export default function NewBlogPostPage() {
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
            Create Blog Post
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Write your post with real-time slug generation, cover image upload, and rich Tiptap editing.
          </p>
        </div>
      </div>

      <PostEditor />
    </div>
  );
}
