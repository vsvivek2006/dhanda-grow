"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { PostEditor } from "@/components/admin/PostEditor";

export default function NewBlogPostPage() {
  return (
    <div className="container mx-auto py-8 max-w-5xl px-4">
      <div className="flex items-center gap-3 pb-4 mb-6 border-b border-white/10">
        <Link
          href="/admin/blog"
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 transition-colors cursor-pointer"
          title="Back to Blog Dashboard"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            Create AI Blog Post
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-normal">
              <Sparkles className="w-3 h-3 inline mr-1 text-yellow-400" />
              Groq Powered
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Generate high-ranking local marketing guides with 15-year agency cadence, or draft manually with rich Tiptap formatting.
          </p>
        </div>
      </div>

      <PostEditor />
    </div>
  );
}
