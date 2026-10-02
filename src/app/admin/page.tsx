import React from "react";
import Link from "next/link";
import {
  FileText,
  PlusCircle,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
  ExternalLink,
  Cpu,
  BookOpen,
} from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/server";
import { getAllPosts } from "@/lib/blog-utils";
import { PostTable } from "@/components/admin/PostTable";
import type { PostSummary } from "@/lib/validations/post";

export const revalidate = 0; // Always fresh real-time metrics

export default async function AdminBlogOverviewPage() {
  // Fetch posts from database
  let dbPosts: any[] = [];
  try {
    const { data: posts, error } = await supabaseAdmin
      .from("blog_posts")
      .select("id, title, slug, excerpt, tags, created_at, updated_at")
      .order("created_at", { ascending: false });

    if (!error && posts) {
      dbPosts = posts;
    }
  } catch (err) {
    console.warn("Could not fetch db posts:", err);
  }

  // Fetch local markdown posts
  const localPosts = getAllPosts();
  const postsMap = new Map<string, PostSummary>();

  // Populate from DB
  dbPosts.forEach((p: any) => {
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

  const allPosts = Array.from(postsMap.values());
  const publishedCount = allPosts.filter((p) => p.status === "published").length;
  const draftCount = allPosts.filter((p) => p.status === "draft").length;

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Blog Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Blog Studio &amp; Content Hub
            </h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-semibold border border-purple-500/30">
              Live
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Dhanda Grow AI Blog Management &amp; Writing Console • {currentDate}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/blog"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span>Public Blog</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </Link>

          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition-all shadow-md shadow-purple-900/40 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Write New Article</span>
          </Link>
        </div>
      </div>

      {/* Blog Operational Metrics (4-Column Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Live Published Articles */}
        <div className="p-5 rounded-2xl border border-white/10 bg-[#08081a] shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400">Live Articles</span>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{publishedCount}</p>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              Published &amp; ranking on Google
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Draft Articles */}
        <div className="p-5 rounded-2xl border border-white/10 bg-[#08081a] shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400">Draft Articles</span>
            <p className="text-2xl font-bold text-amber-400 mt-1">{draftCount}</p>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              In progress in editor
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-800/60 flex items-center justify-center text-amber-400 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* AI Writer Engine */}
        <div className="p-5 rounded-2xl border border-white/10 bg-[#08081a] shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400">AI Writer Model</span>
            <p className="text-lg font-bold text-purple-400 mt-1">Groq Llama 3.3</p>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              Instant 70B Versatile generation
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-800/60 flex items-center justify-center text-purple-400 shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
        </div>

        {/* Total Content Volume */}
        <div className="p-5 rounded-2xl border border-white/10 bg-[#08081a] shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400">Total Articles</span>
            <p className="text-2xl font-bold text-cyan-400 mt-1">{allPosts.length}</p>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              Full SEO &amp; Schema coverage
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Quick Launchers (3-Column Grid) */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 font-mono">
          Blog Quick Launchers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* AI Article Writer */}
          <Link
            href="/admin/blog/new"
            className="p-4 rounded-2xl border border-white/10 bg-[#08081a] hover:bg-[#0d0d26] hover:border-purple-500/50 transition-all flex items-center justify-between group shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-amber-800/60 flex items-center justify-center text-yellow-400 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white">AI Article Writer</h3>
                <p className="text-[10px] text-slate-400">Generate with Groq AI &amp; Tiptap</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-yellow-400 transition-colors" />
          </Link>

          {/* Blog Directory */}
          <Link
            href="/admin/blog"
            className="p-4 rounded-2xl border border-white/10 bg-[#08081a] hover:bg-[#0d0d26] hover:border-purple-500/50 transition-all flex items-center justify-between group shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-950/80 border border-purple-800/60 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white">All Blog Posts</h3>
                <p className="text-[10px] text-slate-400">Manage, edit &amp; filter articles</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-purple-400 transition-colors" />
          </Link>

          {/* View Live Blog */}
          <Link
            href="/blog"
            target="_blank"
            className="p-4 rounded-2xl border border-white/10 bg-[#08081a] hover:bg-[#0d0d26] hover:border-purple-500/50 transition-all flex items-center justify-between group shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white">View Public Blog</h3>
                <p className="text-[10px] text-slate-400">See live reader experience</p>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 transition-colors" />
          </Link>
        </div>
      </div>

      {/* Full Articles Directory & Management Table */}
      <div className="rounded-2xl border border-white/10 bg-[#08081a] shadow-xl p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-400" />
            <h2 className="text-sm font-semibold text-white">Article Management</h2>
          </div>
          <Link
            href="/admin/blog/new"
            className="text-xs text-purple-400 hover:text-purple-300 font-medium inline-flex items-center gap-1 transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-yellow-300" />
            <span>Create Post</span>
          </Link>
        </div>

        <PostTable initialPosts={allPosts} />
      </div>
    </div>
  );
}
