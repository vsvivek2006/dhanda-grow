import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PostEditor } from "@/components/admin/PostEditor";

export const metadata = {
  title: "Create Blog Post | Admin | Dhanda Grow",
};

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 pb-2 border-b border-gray-800">
        <Link
          href="/admin/blog"
          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800 transition-colors cursor-pointer"
          title="Back to Blog Posts"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Create Blog Post
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Write your post with real-time slug generation, cover image upload, and rich text editing.
          </p>
        </div>
      </div>

      <PostEditor />
    </div>
  );
}
