import React from "react";
import Link from "next/link";
import {
  FileText,
  Users,
  PlusCircle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  Compass,
  Phone,
} from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/server";
import { getAllPosts } from "@/lib/blog-utils";
import { format } from "date-fns";

export const revalidate = 0; // Always fresh real-time metrics

export default async function AdminOverviewPage() {
  // 1. Fetch posts counts
  let dbPostsCount = 0;
  let recentPosts: Array<{
    id: string;
    title: string;
    slug: string;
    status: string;
    created_at: string;
  }> = [];

  try {
    const { data: posts } = await supabaseAdmin
      .from("blog_posts")
      .select("id, title, slug, excerpt, created_at, updated_at")
      .order("created_at", { ascending: false })
      .limit(5);

    if (posts) {
      recentPosts = posts.map((p: any) => ({
        id: p.id || p.slug,
        title: p.title,
        slug: p.slug,
        status: "published",
        created_at: p.created_at || new Date().toISOString(),
      }));
      dbPostsCount = posts.length;
    }
  } catch (err) {
    console.warn("Could not fetch db posts:", err);
  }

  // Also include markdown files count
  const localPosts = getAllPosts();
  const totalPostsCount = Math.max(dbPostsCount, localPosts.length);
  const publishedCount = totalPostsCount;
  const draftCount = 0;

  if (recentPosts.length === 0 && localPosts.length > 0) {
    recentPosts = localPosts.slice(0, 5).map((lp) => ({
      id: lp.slug,
      title: lp.title,
      slug: lp.slug,
      status: "published",
      created_at: lp.date || new Date().toISOString(),
    }));
  }

  // 2. Fetch leads counts & recent leads
  let totalLeadsCount = 0;
  let recentLeads: Array<{
    id: string;
    name: string;
    phone: string;
    business_type?: string;
    created_at: string;
  }> = [];

  try {
    const { data: leads, count } = await supabaseAdmin
      .from("leads")
      .select("id, name, phone, business_type, created_at", { count: "exact" })
      .order("created_at", { ascending: false })
      .limit(5);

    totalLeadsCount = count || leads?.length || 0;
    recentLeads = leads || [];
  } catch (err) {
    console.warn("Could not fetch leads:", err);
  }

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Admin Overview
            </h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-semibold border border-purple-500/30">
              Live
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Welcome back to Dhanda Grow management console • {currentDate}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition-all shadow-md shadow-purple-900/40 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5 text-yellow-300" />
            <span>Write New Article</span>
          </Link>
        </div>
      </div>

      {/* Operational Metrics Cards (4-Column Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Live Articles */}
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

        {/* Captured Leads */}
        <div className="p-5 rounded-2xl border border-white/10 bg-[#08081a] shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400">Captured Leads</span>
            <p className="text-2xl font-bold text-purple-400 mt-1">{totalLeadsCount}</p>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              Customer inquiries in CRM
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-800/60 flex items-center justify-center text-purple-400 shrink-0">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* AI & Local Growth Tools */}
        <div className="p-5 rounded-2xl border border-white/10 bg-[#08081a] shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400">Active Automations</span>
            <p className="text-2xl font-bold text-cyan-400 mt-1">3 Active</p>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              Maps, Reviews, Social Studio
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Quick Actions 5-Card Grid (Exact Growth-Service launcher structure) */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 font-mono">
          Quick Launchers
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* AI Article Writer */}
          <Link
            href="/admin/blog/new"
            className="p-3.5 rounded-2xl border border-white/10 bg-[#08081a] hover:bg-[#0d0d26] hover:border-purple-500/50 transition-all flex items-center justify-between group shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-950/80 border border-amber-800/60 flex items-center justify-center text-yellow-400 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white">AI Article Writer</h3>
                <p className="text-[10px] text-slate-400">Draft with Groq</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-yellow-400 transition-colors" />
          </Link>

          {/* Blog Posts Library */}
          <Link
            href="/admin/blog"
            className="p-3.5 rounded-2xl border border-white/10 bg-[#08081a] hover:bg-[#0d0d26] hover:border-purple-500/50 transition-all flex items-center justify-between group shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-950/80 border border-purple-800/60 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white">Blog Directory</h3>
                <p className="text-[10px] text-slate-400">Manage articles</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-purple-400 transition-colors" />
          </Link>

          {/* Customer Leads */}
          <Link
            href="/admin/leads"
            className="p-3.5 rounded-2xl border border-white/10 bg-[#08081a] hover:bg-[#0d0d26] hover:border-purple-500/50 transition-all flex items-center justify-between group shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white">Customer Leads</h3>
                <p className="text-[10px] text-slate-400">Review pipeline</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
          </Link>

          {/* Google Maps Audit */}
          <Link
            href="/tools/google-maps-ranking"
            className="p-3.5 rounded-2xl border border-white/10 bg-[#08081a] hover:bg-[#0d0d26] hover:border-purple-500/50 transition-all flex items-center justify-between group shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white">Google Maps Tool</h3>
                <p className="text-[10px] text-slate-400">Rank tracking</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 transition-colors" />
          </Link>

          {/* ROI Calculator */}
          <Link
            href="/roi-calculator"
            className="p-3.5 rounded-2xl border border-white/10 bg-[#08081a] hover:bg-[#0d0d26] hover:border-purple-500/50 transition-all flex items-center justify-between group shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white">ROI Calculator</h3>
                <p className="text-[10px] text-slate-400">Pitch generator</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 transition-colors" />
          </Link>
        </div>
      </div>

      {/* Split Activity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Customer Leads */}
        <div className="rounded-2xl border border-white/10 bg-[#08081a] shadow-xl overflow-hidden flex flex-col h-full">
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#0a0a24]">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-semibold text-white">Recent Customer Leads</h2>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-medium transition-colors"
            >
              <span>All Leads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1 overflow-x-auto">
            {recentLeads.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <Users className="w-7 h-7 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">No customer leads captured yet.</p>
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.02] text-slate-400 font-semibold border-b border-white/10">
                  <tr>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Business</th>
                    <th className="py-3 px-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">{lead.name}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-cyan-400" />
                          <span>{lead.phone}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {lead.business_type || "Local Business"}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-400 font-mono text-[11px]">
                        {lead.created_at
                          ? format(new Date(lead.created_at), "dd MMM")
                          : "Today"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Recent Articles */}
        <div className="rounded-2xl border border-white/10 bg-[#08081a] shadow-xl overflow-hidden flex flex-col h-full">
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#0a0a24]">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              <h2 className="text-sm font-semibold text-white">Recent Articles</h2>
            </div>
            <Link
              href="/admin/blog"
              className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-medium transition-colors"
            >
              <span>All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1 overflow-x-auto">
            {recentPosts.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <FileText className="w-7 h-7 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">No blog posts created yet.</p>
                <Link
                  href="/admin/blog/new"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-yellow-300" />
                  Create Article
                </Link>
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.02] text-slate-400 font-semibold border-b border-white/10">
                  <tr>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {recentPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 font-medium text-white max-w-[200px] truncate">
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="hover:text-purple-300 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Published
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-slate-400 font-mono text-[11px] whitespace-nowrap">
                        {post.created_at
                          ? format(new Date(post.created_at), "dd MMM")
                          : "Today"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
