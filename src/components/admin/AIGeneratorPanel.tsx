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
  const [wordCount, setWordCount] = useState(800);
  const [audience, setAudience] = useState("Local shop owners, doctors, clinic directors, restaurant founders");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const FALLBACK_MODEL_ID = "openai/gpt-oss-20b";

  const selectedModelInfo =
    AVAILABLE_MODELS.find((m) => m.id === selectedModel) || AVAILABLE_MODELS[0];

  const generationSteps = useMemo(
    () => [
      { label: `Connecting to ${selectedModelInfo.name} (${selectedModelInfo.speed})...`, progress: 20 },
      { label: "Analyzing topic, audience & search intent...", progress: 45 },
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
    setIsRateLimited(false);

    const toastId = toast.loading(`Generating article with ${selectedModelInfo.name}...`, {
      description: "Crafting headline, SEO metadata, rich content, and tags.",
    });

    try {
      const keywordList = keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);

      const response = await fetch("/api/admin/blog/generate", {
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

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to generate blog post from Groq API");
      }

      setProgressPercent(100);
      toast.success("AI draft generated successfully!", {
        id: toastId,
        description: `Generated via ${selectedModelInfo.name}. Loaded into editor.`,
      });

      setHasGenerated(true);
      onGenerated(data as GenerateBlogPostOutput);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Unexpected error during AI generation. Check your network or API quota.";
      const isLimit =
        message.toLowerCase().includes("429") ||
        message.toLowerCase().includes("rate limit") ||
        message.toLowerCase().includes("rate_limit");
      if (isLimit) {
        setIsRateLimited(true);
        setErrorBanner(null);
        toast.error("Rate limit hit", {
          id: toastId,
          description: "The flagship model is busy. Switch to GPT-OSS 20B for instant generation.",
        });
      } else {
        setErrorBanner(message);
        toast.error("Generation failed", {
          id: toastId,
          description: message,
        });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-xl border border-gray-800 bg-gray-900 shadow-sm space-y-5 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gray-800 border border-gray-700 text-purple-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              AI Content Strategist
              <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-purple-950/80 text-purple-300 border border-purple-800/60">
                {selectedModelInfo.name}
              </span>
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Draft an SEO-structured article tailored to Dhanda Grow.
            </p>
          </div>
        </div>

        {hasGenerated && !isGenerating && (
          <span className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-md border border-emerald-800/60">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Draft In Editor
          </span>
        )}
      </div>

      {/* Rate-Limit Fallback Banner */}
      {isRateLimited && !isGenerating && (
        <div className="p-3.5 rounded-lg border border-amber-700/50 bg-amber-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white">Flagship Model Rate-Limited</h4>
              <p className="text-xs text-amber-200/90 mt-0.5">
                GPT-OSS 120B is temporarily busy. Switch to the Ultra-Fast 20B model for instant generation.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedModel(FALLBACK_MODEL_ID);
              setIsRateLimited(false);
              setTimeout(handleGenerate, 50);
            }}
            className="self-end sm:self-auto shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-gray-900 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Switch to 20B &amp; Retry
          </button>
        </div>
      )}

      {/* Error Banner */}
      {errorBanner && (
        <div className="p-3.5 rounded-lg border border-rose-800/60 bg-rose-950/40 flex items-start gap-2.5 text-rose-200 text-xs">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-white">Generation Error</p>
            <p className="mt-0.5 text-rose-300/90">{errorBanner}</p>
          </div>
          <button
            type="button"
            onClick={() => setErrorBanner(null)}
            className="text-rose-400 hover:text-white"
          >
            ×
          </button>
        </div>
      )}

      {/* Generation in Progress State */}
      {isGenerating && (
        <div className="rounded-xl border border-purple-800/60 bg-purple-950/30 p-5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-purple-300 font-semibold">
              <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
              <span>{generationSteps[currentStepIndex]?.label || "Generating..."}</span>
            </div>
            <span className="font-mono text-purple-400 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Input Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Model Selector */}
        <div className="md:col-span-2 space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-gray-300">
              Select AI Engine
            </label>
            <span className="text-[11px] text-gray-400">
              Reasoning: Low • Schema Guaranteed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {AVAILABLE_MODELS.map((model) => {
              const isSelected = selectedModel === model.id;
              return (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => setSelectedModel(model.id)}
                  disabled={disabled || isGenerating}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "border-purple-500 bg-purple-950/40 ring-1 ring-purple-500/50"
                      : "border-gray-800 bg-gray-900/60 hover:border-gray-700"
                  } disabled:opacity-50`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white text-xs">{model.name}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono font-semibold ${
                        model.id === "openai/gpt-oss-120b"
                          ? "bg-purple-900/80 text-yellow-300 border border-purple-700/60"
                          : model.id === "openai/gpt-oss-20b"
                          ? "bg-emerald-950/90 text-emerald-300 border border-emerald-800/60"
                          : "bg-gray-800 text-purple-300 border border-gray-700"
                      }`}
                    >
                      {model.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-snug line-clamp-2 mb-2">
                    {model.description}
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 pt-1.5 border-t border-gray-800/80">
                    <span>Context: {model.contextWindow}</span>
                    <span className={isSelected ? "text-yellow-400 font-semibold" : "text-gray-400"}>
                      ⚡ {model.speed}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Topic Input & Quick Suggestions */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="block text-xs font-semibold text-gray-300">
            Target Topic or Title <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. 7 Proven SEO Tactics for Service Businesses in India"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={disabled || isGenerating}
            className="w-full px-3.5 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all disabled:opacity-50"
          />

          {/* Quick Prompts */}
          <div className="pt-1">
            <span className="text-[11px] text-gray-400 mr-2">Try inspiration:</span>
            <div className="inline-flex flex-wrap gap-1.5 mt-1">
              {SUGGESTED_TOPICS.map((suggested) => (
                <button
                  key={suggested}
                  type="button"
                  onClick={() => setTopic(suggested)}
                  disabled={disabled || isGenerating}
                  className="text-[11px] px-2 py-1 rounded bg-gray-800/80 hover:bg-gray-700 text-purple-300 hover:text-white border border-gray-700 transition-colors truncate max-w-[280px] sm:max-w-none cursor-pointer disabled:opacity-50"
                >
                  {suggested}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tone Selector */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            Editorial Tone
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            disabled={disabled || isGenerating}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all disabled:opacity-50 cursor-pointer"
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
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            Target Article Length
          </label>
          <div className="flex items-center gap-2">
            {[600, 800, 1200].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setWordCount(count)}
                disabled={disabled || isGenerating}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  wordCount === count
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:text-white border border-gray-700 hover:bg-gray-700"
                }`}
              >
                ~{count} words
              </button>
            ))}
          </div>
        </div>

        {/* Keywords */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            Target SEO Keywords (Comma Separated)
          </label>
          <input
            type="text"
            placeholder="e.g. digital marketing, local SEO, PPC lead gen"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            disabled={disabled || isGenerating}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all disabled:opacity-50"
          />
        </div>

        {/* Audience */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            Target Audience Persona
          </label>
          <input
            type="text"
            placeholder="e.g. Small business founders, marketing heads in India"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            disabled={disabled || isGenerating}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all disabled:opacity-50"
          />
        </div>
      </div>

      {/* Action Trigger */}
      <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-800">
        <p className="text-[11px] text-gray-400 text-center sm:text-left">
          Using <span className="text-yellow-400 font-semibold">{selectedModelInfo.name}</span>. Generates title, slug, meta description, outline, content &amp; tags.
        </p>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {hasGenerated ? (
            <button
              type="button"
              onClick={handleGenerate}
              disabled={disabled || isGenerating}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white border border-gray-700 transition-all text-xs cursor-pointer disabled:opacity-50"
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-colors text-xs cursor-pointer disabled:opacity-50"
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
