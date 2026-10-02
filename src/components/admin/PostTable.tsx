"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  Edit3,
  Trash2,
  ExternalLink,
  Search,
  Sparkles,
  Loader2,
  FileText,
  PlusCircle,
  X,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import type { PostRecord, PostSummary } from "@/lib/validations/post";
import { deletePostAction } from "@/app/admin/blog/actions";
import { ConfirmDialog } from "./ConfirmDialog";

interface PostTableProps {
  initialPosts: PostSummary[];
}

export function PostTable({ initialPosts }: PostTableProps) {
  const [posts, setPosts] = useState<PostSummary[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{
    isOpen: boolean;
    id: string;
    title: string;
  }>({
    isOpen: false,
    id: "",
    title: "",
  });

  // Calculate counts for filter pills
  const counts = useMemo(() => {
    return {
      all: posts.length,
      published: posts.filter((p) => p.status === "published").length,
      draft: posts.filter((p) => p.status === "draft").length,
    };
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.slug.toLowerCase().includes(q) ||
        (post.author && post.author.toLowerCase().includes(q));

      const matchesStatus =
        statusFilter === "all" ? true : post.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [posts, searchQuery, statusFilter]);

  const handleDeleteTrigger = (id: string, title: string) => {
    setConfirmDelete({
      isOpen: true,
      id,
      title,
    });
  };

  const handleConfirmDelete = async () => {
    const { id, title } = confirmDelete;
    if (!id) return;

    setDeletingId(id);
    try {
      const result = await deletePostAction(id);
      if (!result.success) {
        toast.error("Failed to delete post", { description: result.error });
        return;
      }

      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Post deleted successfully", {
        description: `"${title}" has been permanently removed.`,
      });
      setConfirmDelete({ isOpen: false, id: "", title: "" });
    } catch {
      toast.error("Unexpected error deleting post", {
        description: "Please check your network and try again.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Reusable Custom Confirmation Modal */}
      <ConfirmDialog
        isOpen={confirmDelete.isOpen}
        title="Delete Blog Post?"
        description={`Are you sure you want to delete "${confirmDelete.title}"? This will permanently remove the post and cannot be undone.`}
        confirmLabel="Delete Post"
        cancelLabel="Cancel"
        isDestructive={true}
        isLoading={deletingId === confirmDelete.id}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDelete({ isOpen: false, id: "", title: "" })}
      />

      {/* Controls Bar: Search & Status Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl border border-white/10 bg-[#08081a] shadow-lg">
        {/* Search */}
        <div className="relative flex-1 sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search articles by title, slug, or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#07071a] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#07071a] border border-white/10 self-start sm:self-auto">
          {(["all", "published", "draft"] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                statusFilter === filter
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {filter === "all" ? "All Posts" : filter} ({counts[filter]})
            </button>
          ))}
        </div>
      </div>

      {/* Posts Table / Card List */}
      <div className="rounded-2xl border border-white/10 bg-[#08081a] overflow-hidden shadow-xl">
        {filteredPosts.length === 0 ? (
          <div className="py-16 text-center space-y-4 px-4">
            <div className="p-3.5 rounded-2xl bg-white/5 text-slate-400 inline-block border border-white/10">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">No articles found</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                {searchQuery
                  ? `No blog posts matched "${searchQuery}". Try a different keyword.`
                  : "You haven't created any articles in this status yet."}
              </p>
            </div>
            <div>
              <Link
                href="/admin/blog/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-colors cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                Write Your First Post
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#0c0c24] border-b border-white/10 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Title &amp; Slug</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Author</th>
                  <th className="py-3.5 px-4 hidden lg:table-cell">Created</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                {filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="py-4 px-4 sm:px-6">
                      <div className="space-y-1">
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="font-bold text-white hover:text-purple-400 transition-colors block line-clamp-1 text-sm sm:text-base"
                        >
                          {post.title}
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                          <span>/blog/{post.slug}</span>
                          {post.source && post.source !== "manual" && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-purple-300 bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-800/40">
                              <Sparkles className="w-2.5 h-2.5 text-yellow-400" />
                              AI Sourced
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          post.status === "published"
                            ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800/60"
                            : "bg-amber-950/80 text-amber-400 border border-amber-800/60"
                        }`}
                      >
                        {post.status === "published" ? "Live" : "Draft"}
                      </span>
                    </td>

                    <td className="py-4 px-4 hidden md:table-cell text-slate-400 text-xs">
                      {post.author || "Dhanda Grow Team"}
                    </td>

                    <td className="py-4 px-4 hidden lg:table-cell text-slate-400 text-xs font-mono">
                      {post.created_at ? (
                        format(new Date(post.created_at), "dd MMM yyyy")
                      ) : (
                        "—"
                      )}
                    </td>

                    <td className="py-4 px-4 sm:px-6 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {post.slug && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                            title="Preview Live Page"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="p-2 rounded-lg text-purple-400 hover:text-purple-300 hover:bg-purple-950/40 transition-colors"
                          title="Edit Post"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteTrigger(post.id, post.title)}
                          disabled={deletingId === post.id}
                          className="p-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors disabled:opacity-50 cursor-pointer"
                          title="Delete Post"
                        >
                          {deletingId === post.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
