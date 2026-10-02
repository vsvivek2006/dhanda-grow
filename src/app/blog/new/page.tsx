"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TiptapEditor } from "@/components/blog/TiptapEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { AVAILABLE_MODELS } from "@/lib/ai/models";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [keywords, setKeywords] = useState("");
  const [model, setModel] = useState(AVAILABLE_MODELS[0].id);
  const [audience, setAudience] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);

  const [generatedTitle, setGeneratedTitle] = useState("");
  const [generatedMeta, setGeneratedMeta] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!topic) {
      alert("Please enter a topic.");
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch("/api/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          tone,
          keywords: keywords.split(",").map((k) => k.trim()).filter(Boolean),
          audience,
          model,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Generation failed");
      }

      setGeneratedTitle(data.title || "");
      setGeneratedMeta(data.metaDescription || "");
      setEditorContent(data.content || "");
      setTags(data.suggestedTags || []);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = async () => {
    if (!generatedTitle.trim()) {
      alert("Please provide a blog title.");
      return;
    }
    if (!editorContent.trim()) {
      alert("Please provide blog content before publishing.");
      return;
    }

    setIsPublishing(true);
    setPublishedUrl(null);

    try {
      const res = await fetch("/api/blog/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: generatedTitle,
          excerpt: generatedMeta || generatedTitle,
          content: editorContent,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to publish blog post");
      }

      setPublishedUrl(data.url);
      setTimeout(() => {
        router.push(data.url);
      }, 1200);
    } catch (err: any) {
      alert(err.message || "Failed to publish post.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create AI Blog Post</h1>
        <p className="text-muted-foreground mt-2">
          Use the Groq-powered AI engine to generate rich, SEO-optimized blog posts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Controls */}
        <div className="space-y-6">
          <div className="space-y-4 p-6 bg-card border rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold">Generation Settings</h2>
            
            <div className="space-y-2">
              <Label>Topic</Label>
              <Input
                placeholder="e.g. How to Rank #1 on Google Maps for Local Cafes"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Tone</Label>
              <Input
                placeholder="e.g. Professional, Conversational, Actionable"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Target Audience</Label>
              <Input
                placeholder="e.g. Small business owners, local shops"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>SEO Keywords (comma separated)</Label>
              <Input
                placeholder="Google Maps ranking, local marketing, customer reviews"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>AI Model</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                {AVAILABLE_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.provider})
                  </option>
                ))}
              </select>
            </div>

            <Button
              className="w-full"
              onClick={handleGenerate}
              disabled={isGenerating || !topic}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Content"
              )}
            </Button>
          </div>
        </div>

        {/* Right column: Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={generatedTitle}
              onChange={(e) => setGeneratedTitle(e.target.value)}
              placeholder="Blog Title"
              className="font-semibold text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label>Meta Description</Label>
            <Input
              value={generatedMeta}
              onChange={(e) => setGeneratedMeta(e.target.value)}
              placeholder="SEO Meta Description"
            />
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <Label>Content (Rich Text)</Label>
            <TiptapEditor content={editorContent} onChange={setEditorContent} />
          </div>

          {publishedUrl && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Published successfully! Redirecting to article...</span>
            </div>
          )}

          <div className="flex justify-end gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => alert("Draft saved in editor session.")}
              disabled={isPublishing}
            >
              Save Draft
            </Button>
            <Button
              onClick={handlePublish}
              disabled={isPublishing || !generatedTitle || !editorContent}
              className="bg-primary hover:bg-primary/90"
            >
              {isPublishing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  Publish Blog
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
