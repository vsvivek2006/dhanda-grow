"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";
import { toast } from "sonner";
import {
  Save,
  Send,
  Trash2,
  Loader2,
  Lock,
  Unlock,
  Sparkles,
  PenTool,
  Info,
  ArrowLeft,
  Eye,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { postSchema, type PostInput, type PostRecord } from "@/lib/validations/post";
import { createPostAction, updatePostAction, deletePostAction } from "@/app/admin/blog/actions";
import { ImageUpload } from "./ImageUpload";
import { TagInput } from "./TagInput";
import { AIGeneratorPanel } from "./AIGeneratorPanel";
import { ConfirmDialog } from "./ConfirmDialog";
import type { GenerateBlogPostOutput } from "@/lib/ai/generateBlogPost";

/** localStorage key for autosaved drafts. */
function getDraftKey(postId?: string) {
  return `blog-draft-${postId ?? "new"}`;
}

const TiptapEditor = dynamic(
  () => import("./TiptapEditor").then((mod) => mod.TiptapEditor),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[350px] w-full rounded-xl border border-gray-800 bg-gray-900/60 p-6 flex flex-col items-center justify-center text-gray-500 animate-pulse">
        <Loader2 className="w-6 h-6 animate-spin text-purple-500 mb-2" />
        <span className="text-xs font-medium">Loading rich text editor...</span>
      </div>
    ),
  }
);

interface PostEditorProps {
  initialData?: PostRecord | null;
}

export function PostEditor({ initialData }: PostEditorProps) {
  const router = useRouter();
  const isEditing = Boolean(initialData?.id);
  const [editorMode, setEditorMode] = useState<"manual" | "ai">("manual");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isSlugCustomized, setIsSlugCustomized] = useState(Boolean(initialData?.slug));
  const [isAiGenerated, setIsAiGenerated] = useState(
    initialData?.source === "ai" || initialData?.source === "ai-edited"
  );
  const [originalAiContent, setOriginalAiContent] = useState<string | null>(null);
  const [showDraftBanner, setShowDraftBanner] = useState(false);
  const draftKey = getDraftKey(initialData?.id);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<PostInput>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      content: initialData?.content || "",
      meta_description: initialData?.meta_description || "",
      cover_image_url: initialData?.cover_image_url || "",
      author: initialData?.author || "Dhanda Grow Team",
      tags: initialData?.tags || [],
      status: initialData?.status || "draft",
      source: initialData?.source || "manual",
    },
  });

  const titleValue = watch("title");
  const slugValue = watch("slug");
  const contentValue = watch("content");
  const metaDescriptionValue = watch("meta_description") || "";

  // Warn if leaving page with unsaved edits
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !isSubmitting && !isDeleting) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty, isSubmitting, isDeleting]);

  // Check for recovered draft in localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(draftKey);
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (
        draft &&
        (draft.title || draft.content) &&
        (!initialData || (draft.savedAt && draft.savedAt > (initialData.updated_at || "")))
      ) {
        setShowDraftBanner(true);
      }
    } catch {
      // Ignore parse errors on localStorage
    }
  }, [draftKey, initialData]);

  // Autosave draft every 30s when dirty
  useEffect(() => {
    if (!isDirty) return;
    const interval = setInterval(() => {
      try {
        const payload = {
          title: titleValue,
          slug: slugValue,
          content: contentValue,
          meta_description: metaDescriptionValue,
          savedAt: new Date().toISOString(),
        };
        localStorage.setItem(draftKey, JSON.stringify(payload));
      } catch {
        // quota exceeded or blocked
      }
    }, 30_000);
    return () => clearInterval(interval);
  }, [isDirty, draftKey, titleValue, slugValue, contentValue, metaDescriptionValue]);

  // Auto-generate slug from title (unless manually customized)
  useEffect(() => {
    if (!isSlugCustomized && titleValue) {
      const generatedSlug = slugify(titleValue, {
        lower: true,
        strict: true,
        trim: true,
      });
      setValue("slug", generatedSlug, { shouldValidate: true, shouldDirty: true });
    }
  }, [titleValue, isSlugCustomized, setValue]);

  // Handle incoming AI Generator output
  const handleAiGenerated = (output: GenerateBlogPostOutput) => {
    setValue("title", output.title, { shouldValidate: true, shouldDirty: true });
    setValue("meta_description", output.metaDescription, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("content", output.content, { shouldValidate: true, shouldDirty: true });

    if (output.suggestedTags && output.suggestedTags.length > 0) {
      setValue("tags", output.suggestedTags, { shouldValidate: true, shouldDirty: true });
    }

    const generatedSlug = slugify(output.title, {
      lower: true,
      strict: true,
      trim: true,
    });
    setValue("slug", generatedSlug, { shouldValidate: true, shouldDirty: true });

    setIsAiGenerated(true);
    setOriginalAiContent(output.content);
    setEditorMode("manual");

    toast.success("AI draft populated into editor!", {
      description: "Review, edit, or customize before saving or publishing.",
    });
  };

  const handleSave = (targetStatus: "draft" | "published") => {
    handleSubmit(async (formData) => {
      setIsSubmitting(true);
      const toastId = toast.loading(
        targetStatus === "published" ? "Publishing post..." : "Saving draft...",
        {
          description: "Persisting changes and invalidating caches.",
        }
      );

      try {
        let finalSource = formData.source;
        if (isAiGenerated) {
          finalSource =
            originalAiContent && originalAiContent !== formData.content
              ? "ai-edited"
              : "ai";
        }

        const payload: PostInput = {
          ...formData,
          status: targetStatus,
          source: finalSource,
        };

        let result;
        if (isEditing && initialData?.id) {
          result = await updatePostAction(initialData.id, payload);
        } else {
          result = await createPostAction(payload);
        }

        if (!result.success) {
          toast.error("Failed to save post", {
            id: toastId,
            description: result.error,
          });
          return;
        }

        toast.success(
          targetStatus === "published"
            ? "Post published successfully!"
            : "Draft saved successfully!",
          {
            id: toastId,
            description:
              targetStatus === "published"
                ? "Your article is now live on the public blog."
                : "Your changes have been saved to the database.",
          }
        );
        // Clear autosaved draft on successful persist
        try { localStorage.removeItem(draftKey); } catch { /* ignore */ }
        router.push("/admin/blog");
        router.refresh();
      } catch {
        toast.error("Unexpected error saving post", {
          id: toastId,
          description: "Please check your network and try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

  const handleConfirmDelete = async () => {
    if (!initialData?.id || isDeleting) return;

    setIsDeleting(true);
    const toastId = toast.loading("Deleting post...", {
      description: "Removing post and metadata from storage.",
    });

    try {
      const result = await deletePostAction(initialData.id);
      if (!result.success) {
        toast.error("Failed to delete post", {
          id: toastId,
          description: result.error,
        });
        return;
      }

      toast.success("Post deleted successfully", {
        id: toastId,
        description: "The article has been permanently removed.",
      });
      setIsConfirmDeleteOpen(false);
      router.push("/admin/blog");
      router.refresh();
    } catch {
      toast.error("Unexpected error deleting post", {
        id: toastId,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={isConfirmDeleteOpen}
        title="Delete Blog Post?"
        description={`Are you sure you want to permanently delete "${titleValue || "Untitled"}"? This will remove the article and cannot be undone.`}
        confirmText="Yes, Delete Post"
        cancelText="Cancel"
        isDestructive
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setIsConfirmDeleteOpen(false)}
      />

      {/* Recovered Draft Banner */}
      {showDraftBanner && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-blue-700/50 bg-blue-950/40 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-blue-400 shrink-0" />
            <p className="text-xs text-blue-200">
              <span className="font-bold text-white">Unsaved draft recovered.</span>{" "}
              You have a locally autosaved version newer than the last database save.
            </p>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => {
                try {
                  const raw = localStorage.getItem(draftKey);
                  if (!raw) return;
                  const draft = JSON.parse(raw) as {
                    title?: string;
                    content?: string;
                    meta_description?: string;
                    slug?: string;
                  };
                  if (draft.title) setValue("title", draft.title, { shouldDirty: true });
                  if (draft.slug) setValue("slug", draft.slug, { shouldDirty: true });
                  if (draft.content) setValue("content", draft.content, { shouldDirty: true });
                  if (draft.meta_description)
                    setValue("meta_description", draft.meta_description, { shouldDirty: true });
                  toast.success("Draft restored into editor.");
                } catch {
                  toast.error("Could not restore draft.");
                }
                setShowDraftBanner(false);
              }}
              className="px-3 py-1.5 rounded-md text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              Restore
            </button>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem(draftKey);
                setShowDraftBanner(false);
              }}
              className="px-3 py-1.5 rounded-md text-xs font-medium border border-gray-700 text-gray-400 hover:bg-gray-800 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Unsaved changes indicator */}
      {isDirty && (
        <div className="flex justify-end">
          <span className="text-[11px] font-semibold text-yellow-400 bg-yellow-950/60 px-3 py-1 rounded-full border border-yellow-800/40 animate-pulse">
            • Unsaved changes in form
          </span>
        </div>
      )}

      {/* Mode Toggle (only for new posts) */}
      {!isEditing && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-gray-900 border border-gray-800 shadow-sm">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setEditorMode("manual")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                editorMode === "manual"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              Write Manually
            </button>
            <button
              type="button"
              onClick={() => setEditorMode("ai")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                editorMode === "ai"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              Generate with AI
            </button>
          </div>

          <span className="text-[11px] text-gray-400 hidden sm:inline px-3">
            {editorMode === "ai"
              ? "AI drafts complete structured post into editor for you to review."
              : "Standard WYSIWYG editor."}
          </span>
        </div>
      )}

      {/* AI Assistant Section */}
      {editorMode === "ai" && !isEditing && (
        <AIGeneratorPanel onGenerated={handleAiGenerated} disabled={isSubmitting} />
      )}

      {/* Desktop Sticky Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 sm:p-4 rounded-xl border border-gray-800 bg-gray-900/95 sticky top-4 z-20 backdrop-blur-md shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
            {isEditing ? "Editing Post" : "Draft Editor"}
          </span>
          {initialData?.status && (
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                initialData.status === "published"
                  ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800/60"
                  : "bg-amber-950/80 text-amber-400 border border-amber-800/60"
              }`}
            >
              {initialData.status === "published" ? "Live" : "Draft"}
            </span>
          )}
          {isAiGenerated && (
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-purple-950/80 text-purple-300 border border-purple-800/60 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-400" />
              AI Sourced
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {isEditing && slugValue && (
            <Link
              href={`/blog/${slugValue}`}
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors border border-gray-700"
            >
              <Eye className="w-3.5 h-3.5 text-gray-400" />
              Preview Live
            </Link>
          )}

          {isEditing && (
            <button
              type="button"
              onClick={() => setIsConfirmDeleteOpen(true)}
              disabled={isDeleting || isSubmitting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 border border-rose-900/30 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isDeleting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Trash2 className="w-3.5 h-3.5" />
              )}
              Delete
            </button>
          )}

          <button
            type="button"
            onClick={() => handleSave("draft")}
            disabled={isSubmitting || isDeleting}
            className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-lg text-xs font-semibold bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5 text-yellow-400" />
            )}
            Save Draft
          </button>

          <button
            type="button"
            onClick={() => handleSave("published")}
            disabled={isSubmitting || isDeleting}
            className="inline-flex items-center gap-1.5 py-2 px-4 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            Publish
          </button>
        </div>
      </div>

      {/* Main Grid: Content Form (left) + Metadata Sidebar (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left col: Title, Slug, Content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Post Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Post Title <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 7 Proven SEO Tactics for Service Businesses in India"
              {...register("title")}
              className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 text-sm font-semibold focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
            {errors.title && (
              <p className="mt-1.5 text-xs text-rose-400">{errors.title.message}</p>
            )}
          </div>

          {/* Slug */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-gray-300">
                URL Slug <span className="text-rose-400">*</span>
              </label>
              <button
                type="button"
                onClick={() => setIsSlugCustomized(!isSlugCustomized)}
                className="text-xs text-purple-400 hover:text-yellow-400 flex items-center gap-1 transition-colors cursor-pointer"
              >
                {isSlugCustomized ? (
                  <>
                    <Lock className="w-3 h-3" />
                    Locked Custom Slug
                  </>
                ) : (
                  <>
                    <Unlock className="w-3 h-3 text-yellow-400" />
                    Auto-Generating Slug
                  </>
                )}
              </button>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-xs text-gray-400 font-mono select-none">
                /blog/
              </span>
              <input
                type="text"
                placeholder="7-proven-local-seo-strategies"
                {...register("slug")}
                onChange={(e) => {
                  setIsSlugCustomized(true);
                  setValue("slug", e.target.value, { shouldValidate: true, shouldDirty: true });
                }}
                className="w-full pl-16 pr-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-xs sm:text-sm text-yellow-400 font-mono placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
            </div>
            {errors.slug && (
              <p className="mt-1.5 text-xs text-rose-400">{errors.slug.message}</p>
            )}
          </div>

          {/* Rich Content Editor */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Post Content <span className="text-rose-400">*</span>
            </label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <TiptapEditor
                  content={field.value}
                  onChange={(val) => field.onChange(val)}
                />
              )}
            />
            {errors.content && (
              <p className="mt-1.5 text-xs text-rose-400">{errors.content.message}</p>
            )}
          </div>
        </div>

        {/* Sidebar Metadata (Right col) */}
        <div className="space-y-5">
          {/* Cover Image */}
          <div className="p-4 sm:p-5 rounded-xl border border-gray-800 bg-gray-900 space-y-2.5 shadow-sm">
            <label className="block text-xs font-semibold text-gray-300">
              Cover Image
            </label>
            <Controller
              name="cover_image_url"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                />
              )}
            />
          </div>

          {/* SEO Meta Description */}
          <div className="p-4 sm:p-5 rounded-xl border border-gray-800 bg-gray-900 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-gray-300">
                Meta Description (SEO)
              </label>
              <span
                className={`text-[11px] font-mono font-semibold ${
                  metaDescriptionValue.length >= 120 && metaDescriptionValue.length <= 160
                    ? "text-emerald-400"
                    : metaDescriptionValue.length > 160
                    ? "text-rose-400"
                    : "text-gray-400"
                }`}
              >
                {metaDescriptionValue.length}/160
              </span>
            </div>
            <textarea
              rows={3}
              placeholder="Brief summary for search engines (120-160 characters recommended)..."
              {...register("meta_description")}
              className="w-full px-3.5 py-2 rounded-lg bg-gray-800 border border-gray-700 text-xs sm:text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
            />
            {errors.meta_description && (
              <p className="text-xs text-rose-400">{errors.meta_description.message}</p>
            )}
          </div>

          {/* Tags */}
          <div className="p-4 sm:p-5 rounded-xl border border-gray-800 bg-gray-900 space-y-2 shadow-sm">
            <label className="block text-xs font-semibold text-gray-300">
              Tags &amp; Taxonomy
            </label>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <TagInput
                  tags={field.value || []}
                  onChange={(tags) => field.onChange(tags)}
                />
              )}
            />
          </div>

          {/* Author */}
          <div className="p-4 sm:p-5 rounded-xl border border-gray-800 bg-gray-900 space-y-2 shadow-sm">
            <label className="block text-xs font-semibold text-gray-300">
              Author (Public Byline)
            </label>
            <input
              type="text"
              placeholder="Dhanda Grow Team"
              {...register("author")}
              className="w-full px-3.5 py-2 rounded-lg bg-gray-800 border border-gray-700 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
            <p className="text-[11px] text-gray-400 flex items-center gap-1.5 mt-1">
              <Info className="w-3 h-3 text-yellow-400 shrink-0" />
              Public byline displayed to readers on the article page.
            </p>
            {errors.author && (
              <p className="text-xs text-rose-400">{errors.author.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Action Bar (<sm) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-3 bg-gray-900/95 border-t border-gray-800 backdrop-blur-md z-40 flex items-center justify-between gap-2 shadow-xl">
        <button
          type="button"
          onClick={() => handleSave("draft")}
          disabled={isSubmitting || isDeleting}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5 text-yellow-400" />
          )}
          Save Draft
        </button>

        <button
          type="button"
          onClick={() => handleSave("published")}
          disabled={isSubmitting || isDeleting}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-xs transition-all disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
          Publish
        </button>
      </div>
    </div>
  );
}
