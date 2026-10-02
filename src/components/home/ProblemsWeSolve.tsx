"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  ShieldAlert,
  Clock,
  Coins,
  Check,
} from "lucide-react";
import {
  InstagramRealLogo,
  WhatsAppRealLogo,
  FacebookRealLogo,
  GoogleMapsLogo,
  GoogleGLogo,
} from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/ui/ParallaxSection";

const problemPillars = [
  {
    id: "instagram",
    platform: "Instagram",
    brandColor: "from-pink-500/20 via-rose-500/10 to-purple-900/30",
    borderColor: "border-pink-500/30",
    textColor: "text-pink-400",
    badgeBg: "bg-pink-500/10 text-pink-300 border-pink-500/20",
    icon: InstagramRealLogo,
    clientProblem: "“I don't have time to post daily, and graphic agencies charge ₹25,000/mo.”",
    painExplanation:
      "When local customers look up your shop on Instagram and see your last post was 4 months ago, they assume you are inactive or out of touch. Meanwhile, big brands post daily and steal your footfall.",
    howWeAutomate: [
      "AI automatically creates branded 1080x1080 festival and promotional posters 24 hours before every event.",
      "Your logo, shop address, and contact number are stamped automatically on every creative.",
      "High-engagement captions in Hindi and English with trending local neighborhood hashtags generated instantly.",
      "1-Click publishing directly to your Instagram Feed and Stories without opening Photoshop or Canva.",
    ],
    clientBenefit: "365 days of active, gorgeous brand presence that keeps footfall flowing without lifting a finger.",
    statMetric: "100%",
    statLabel: "Zero Design Skills Needed",
  },
  {
    id: "whatsapp",
    platform: "WhatsApp Business",
    brandColor: "from-emerald-500/20 via-teal-500/10 to-green-900/30",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-400",
    badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    icon: WhatsAppRealLogo,
    clientProblem: "“Happy customers leave without reviewing, but unhappy ones post 1-star ratings.”",
    painExplanation:
      "93% of local shoppers check Google reviews before visiting a store. Asking customers face-to-face for reviews feels awkward, and manually following up on chat is tedious and quickly forgotten.",
    howWeAutomate: [
      "Courteous 1-tap WhatsApp review invite dispatched automatically to satisfied customers post-visit.",
      "Review link opens directly to your Google Maps 5-star rating dialog, eliminating all friction.",
      "Automated morning WhatsApp Status banners generated to broadcast today's deals to all your phone contacts.",
      "AI auto-replies to every Google review with personalized gratitude within 4 seconds, 24/7.",
    ],
    clientBenefit: "Effortlessly amass hundreds of genuine 5-star Google ratings and keep regular buyers returning.",
    statMetric: "+280%",
    statLabel: "Faster Review Growth",
  },
  {
    id: "google",
    platform: "Google Maps Local 3-Pack",
    brandColor: "from-blue-500/20 via-cyan-500/10 to-indigo-900/30",
    borderColor: "border-blue-500/30",
    textColor: "text-cyan-400",
    badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    icon: GoogleMapsLogo,
    clientProblem: "“Customers search for what I sell, but Google shows my competitor first.”",
    painExplanation:
      "Over 70% of phone calls and store visits go to the top 3 businesses shown on the Google Map pack. If you are stuck on rank #9 or #14, nearby buyers literally don't know you exist.",
    howWeAutomate: [
      "Systematic Google Business Profile audit that updates 30+ ranking factors automatically.",
      "High-intent 'near me' keyword injection into profile categories, descriptions, and weekly updates.",
      "Neighborhood geocode rank radar that detects competitor movements and tracks your position live.",
      "Continuous fresh content signals that show Google your business is active and worthy of rank #1.",
    ],
    clientBenefit: "Capture the lion's share of local 'near me' searches and convert them into store walk-ins.",
    statMetric: "#1",
    statLabel: "Target Map Position",
  },
  {
    id: "facebook",
    platform: "Facebook & Meta Pages",
    brandColor: "from-blue-600/20 via-indigo-500/10 to-blue-950/30",
    borderColor: "border-blue-600/30",
    textColor: "text-blue-400",
    badgeBg: "bg-blue-600/10 text-blue-300 border-blue-600/20",
    icon: FacebookRealLogo,
    clientProblem: "“My Facebook page is dormant and looks like my shop closed down permanently.”",
    painExplanation:
      "Older and family-oriented buyers in tier-1, tier-2, and tier-3 towns rely heavily on Facebook pages to verify operating hours, phone numbers, and genuine customer recommendations before visiting.",
    howWeAutomate: [
      "Instant two-way cross-posting synchronization from your Instagram campaigns to Facebook.",
      "Automated festive deals and holiday store hour announcements updated in real-time.",
      "Local community offer templates optimized for Facebook group sharing and neighborhood reach.",
      "Verified page identity that builds immediate family trust and institutional credibility.",
    ],
    clientBenefit: "Complete Meta presence synced in real-time without spending a single minute on manual uploads.",
    statMetric: "1-Tap",
    statLabel: "Cross-Platform Sync",
  },
];

export function ProblemsWeSolve() {
  const [activePillar, setActivePillar] = useState(0);
  const current = problemPillars[activePillar];
  const CurrentIcon = current.icon;

  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/8 blur-[160px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <RevealOnScroll direction="up" delay={0.1}>
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/[0.04] border border-white/10 text-zinc-300 mb-4 backdrop-blur-md">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Real Problems • Fully Automated Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.04em] text-white mb-4">
            Why Local Businesses Lose Customers Online
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
            You didn't open your business to spend your nights designing posters in Canva or figuring out Google algorithms. Here is exactly what is hurting your footfall today — and how Dhanda Grow automates it all.
          </p>
        </div>
      </RevealOnScroll>

      {/* Platform Switcher Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10 relative z-10">
        {problemPillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          const isActive = activePillar === idx;
          return (
            <button
              key={pillar.id}
              onClick={() => setActivePillar(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-semibold transition-all border ${
                isActive
                  ? "bg-white text-black border-white shadow-xl scale-105"
                  : "bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{pillar.platform}</span>
            </button>
          );
        })}
      </div>

      {/* Deep-Dive Problem vs Solution Workstation */}
      <RevealOnScroll direction="up" delay={0.2}>
        <div
          className={`rounded-3xl border ${current.borderColor} bg-gradient-to-b from-[#0b0b18] to-[#06060e] p-5 sm:p-8 lg:p-10 shadow-2xl relative z-10`}
        >
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: The Problem & Pain */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border bg-red-500/10 text-red-300 border-red-500/20">
              <XCircle className="w-3.5 h-3.5 text-red-400" />
              <span>The Problem Clients Face</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {current.clientProblem}
            </h3>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {current.painExplanation}
            </p>

            {/* Pain Point Highlight Box */}
            <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/20 space-y-2">
              <div className="text-xs font-bold text-red-300 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> What this costs you every month:
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Lost walk-in buyers, slow weekday footfall, and 15+ wasted hours trying to figure out marketing instead of serving paying customers.
              </p>
            </div>
          </div>

          {/* Right Column: How Dhanda Grow Automates It */}
          <div className="lg:col-span-7 space-y-6 lg:border-l lg:border-white/10 lg:pl-8">
            <div className="flex items-center justify-between">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${current.badgeBg}`}>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>How Dhanda Grow Automates It</span>
              </div>
              <div className="text-right">
                <div className={`text-xl sm:text-2xl font-black font-mono ${current.textColor}`}>
                  {current.statMetric}
                </div>
                <div className="text-[10px] text-zinc-400 uppercase font-mono">{current.statLabel}</div>
              </div>
            </div>

            {/* Automated Deliverables List */}
            <div className="space-y-3">
              {current.howWeAutomate.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs sm:text-sm text-zinc-200"
                >
                  <Check className={`w-4 h-4 mt-0.5 shrink-0 ${current.textColor}`} />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            {/* Concrete Result Banner */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-[11px] text-zinc-400 uppercase font-mono">The Real Bottom Line</div>
                <div className="text-sm font-bold text-white mt-0.5">{current.clientBenefit}</div>
              </div>
              <Button asChild className="bg-white text-black hover:bg-zinc-200 rounded-xl px-5 text-xs font-semibold shrink-0 sm:ml-4 shadow-lg w-full sm:w-auto">
                <a href="#lead-capture" className="flex items-center justify-center gap-1.5">
                  <span>Automate This Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  </section>
  );
}
