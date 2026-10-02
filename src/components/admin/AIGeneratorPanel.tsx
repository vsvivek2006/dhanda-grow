"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  Sparkles,
  RefreshCw,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sliders,
  Cpu,
} from "lucide-react";
import { toast } from "sonner";
import type { GenerateBlogPostOutput } from "@/lib/ai/generateBlogPost";
import { AVAILABLE_MODELS, DEFAULT_MODEL_ID } from "@/lib/ai/models";

interface AIGeneratorPanelProps {
  onGenerated: (output: GenerateBlogPostOutput) => void;
  disabled?: boolean;
}

const SUGGESTED_TOPICS = [
  "How to Rank #1 on Google Maps in Your Local Area",
  "Why WhatsApp Review Automation Beats Traditional Feedback",
  "Local SEO Playbook for Retail Shops & Clinics in India",
  "Automated Daily Festival Banners & Social Creatives for Footfall",
];

export function AIGeneratorPanel({ onGenerated, disabled }: AIGeneratorPanelProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>(DEFAULT_MODEL_ID);
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional & Authoritative");
  const [keywords, setKeywords] = useState("");
  const [wordCount, setWordCount] = useState(900);
  const [audience, setAudience] = useState("Local shop owners, doctors, clinic directors, restaurant founders");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  const selectedModelInfo =
    AVAILABLE_MODELS.find((m) => m.id === selectedModel) || AVAILABLE_MODELS[0];

  const generationSteps = useMemo(
    () => [
      { label: `Connecting to ${selectedModelInfo.name} (${selectedModelInfo.speed})...`, progress: 20 },
      { label: "Analyzing local search intent and ranking signals...", progress: 45 },
      { label: "Structuring semantic H2/H3 headings & outline...", progress: 70 },
      { label: "Drafting rich sanitized HTML content & SEO tags...", progress: 90 },
    ],
    [selectedModelInfo.name, selectedModelInfo.speed]
  );

  // Animated progress state
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const stepTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Progress simulation during AI generation
  useEffect(() => {
    if (isGenerating) {
      setCurrentStepIndex(0);
      setProgressPercent(15);

      let step = 0;
      stepTimerRef.current = setInterval(() => {
        step += 1;
        if (step < generationSteps.length) {
          setCurrentStepIndex(step);
          setProgressPercent(generationSteps[step].progress);
        } else {
          // Creep forward slowly while waiting for final payload
          setProgressPercent((prev) => Math.min(prev + 2, 94));
        }
      }, 1600);
    } else {
      if (stepTimerRef.current) {
        clearInterval(stepTimerRef.current);
        stepTimerRef.current = null;
      }
    }

    return () => {
      if (stepTimerRef.current) {
        clearInterval(stepTimerRef.current);
      }
    };
  }, [isGenerating, generationSteps]);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Topic is required", {
        description: "Please enter a blog post topic or click a suggested inspiration prompt.",
      });
      return;
    }

    setIsGenerating(true);
    setErrorBanner(null);

    const toastId = toast.loading(`Generating article with ${selectedModelInfo.name}...`, {
      description: "Crafting headline, SEO metadata, rich content, and tags.",
    });

    try {
      const keywordList = keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);

      // Try primary admin generation endpoint first, fall back to public blog generate
      let response = await fetch("/api/admin/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          tone,
          keywords: keywordList,
          wordCount,
          audience,
          model: selectedModel,
        }),
      });

      if (!response.ok && response.status === 404) {
        response = await fetch("/api/blog/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic: topic.trim(),
            tone,
            keywords: keywordList,
            wordCount,
            audience,
            model: selectedModel,
          }),
        });
      }

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Generation request failed");
      }

      setProgressPercent(100);
      onGenerated(data);
      setHasGenerated(true);

      toast.success("Article draft generated!", {
        id: toastId,
        description: `Loaded ${data.title.slice(0, 40)}... into the editor.`,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to generate blog post with AI.";
      setErrorBanner(message);
      toast.error("Generation failed", {
        id: toastId,
        description: message,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-b from-[#0e0e2e]/90 to-[#07071a]/95 p-5 sm:p-6 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30">
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              AI Blog Writer &amp; Strategist
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
                Groq SDK
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Generates complete long-form articles with 15-year agency cadence, HTML headings, and SEO meta.
            </p>
          </div>
        </div>

        {/* AI Model Selector */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-[#07071a] p-1.5 rounded-xl border border-white/10">
          <Cpu className="w-3.5 h-3.5 text-purple-400 ml-1.5" />
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={disabled || isGenerating}
            className="bg-transparent text-xs font-semibold text-slate-200 focus:outline-none pr-2 cursor-pointer disabled:opacity-50"
          >
            {AVAILABLE_MODELS.map((model) => (
              <option key={model.id} value={model.id} className="bg-[#0a0a20] text-white">
                {model.name} ({model.speed})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Progress Bar (Visible while generating) */}
      {isGenerating && (
        <div className="space-y-2 p-4 rounded-xl bg-purple-950/30 border border-purple-800/40 animate-in fade-in">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-purple-300 flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
              {generationSteps[currentStepIndex]?.label || "Finalizing draft..."}
            </span>
            <span className="font-mono text-purple-400 font-bold">{progressPercent}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#07071a] overflow-hidden border border-purple-900/40">
            <div
              className="h-full bg-gradient-to-r from-purple-600 via-violet-500 to-amber-400 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Error Banner */}
      {errorBanner && (
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/50 text-xs text-rose-300">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-rose-200">Generation Error</p>
            <p className="mt-0.5 text-slate-300">{errorBanner}</p>
          </div>
        </div>
      )}

      {/* Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Topic Input */}
        <div className="sm:col-span-2 space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">
            Article Topic or Core Question <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. 7 Local SEO Strategies for Indian Service Businesses"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={disabled || isGenerating}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#07071a] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all disabled:opacity-50"
          />

          {/* Quick Prompts */}
          <div className="pt-1">
            <span className="text-[11px] text-slate-400 mr-2">Try inspiration:</span>
            <div className="inline-flex flex-wrap gap-1.5 mt-1">
              {SUGGESTED_TOPICS.map((suggested) => (
                <button
                  key={suggested}
                  type="button"
                  onClick={() => setTopic(suggested)}
                  disabled={disabled || isGenerating}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-purple-300 hover:text-white border border-white/10 transition-colors truncate max-w-[280px] sm:max-w-none cursor-pointer disabled:opacity-50"
                >
                  {suggested}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tone Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Editorial Tone
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            disabled={disabled || isGenerating}
            className="w-full px-3 py-2 rounded-lg bg-[#07071a] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all disabled:opacity-50 cursor-pointer"
          >
            <option value="Professional & Authoritative">
              Professional &amp; Authoritative (Default)
            </option>
            <option value="Conversational & Direct">
              Conversational &amp; Direct
            </option>
            <option value="Technical & Analytical">
              Technical &amp; Deeply Analytical
            </option>
            <option value="Case-Study Style">
              Results &amp; Case-Study Driven
            </option>
          </select>
        </div>

        {/* Word Count */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Target Article Length
          </label>
          <div className="flex items-center gap-2">
            {[600, 900, 1200].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setWordCount(count)}
                disabled={disabled || isGenerating}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  wordCount === count
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "bg-[#07071a] text-slate-400 hover:text-white border border-white/10 hover:bg-white/5"
                }`}
              >
                ~{count} words
              </button>
            ))}
          </div>
        </div>

        {/* Keywords */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Target SEO Keywords (Comma Separated)
          </label>
          <input
            type="text"
            placeholder="e.g. Google Maps ranking, local SEO, WhatsApp reviews"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            disabled={disabled || isGenerating}
            className="w-full px-3 py-2 rounded-lg bg-[#07071a] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all disabled:opacity-50"
          />
        </div>

        {/* Audience */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Target Audience Persona
          </label>
          <input
            type="text"
            placeholder="e.g. Local shop owners, doctors, clinic directors, salon owners"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            disabled={disabled || isGenerating}
            className="w-full px-3 py-2 rounded-lg bg-[#07071a] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all disabled:opacity-50"
          />
        </div>
      </div>

      {/* Action Trigger */}
      <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
        <p className="text-[11px] text-slate-400 text-center sm:text-left">
          Using <span className="text-yellow-400 font-semibold">{selectedModelInfo.name}</span>. Generates title, slug, meta description, outline, content &amp; tags.
        </p>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {hasGenerated ? (
            <button
              type="button"
              onClick={handleGenerate}
              disabled={disabled || isGenerating}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 transition-all text-xs cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <RefreshCw className="w-3.5 h-3.5 text-yellow-400" />
              )}
              Regenerate Article
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGenerate}
              disabled={disabled || isGenerating}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-all text-xs cursor-pointer disabled:opacity-50 shadow-lg shadow-purple-600/30"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Generating Draft...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  Generate Draft with AI
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
