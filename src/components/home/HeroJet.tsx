"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  MapPin,
  Share2,
  Star,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Play,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { ThreeDCard } from "@/components/ui/ThreeDCard";

const heroTabs = [
  {
    id: "dashboard",
    label: "AI Growth Engine",
    alt: "Dhanda Grow 3D AI Marketing Engine Dashboard",
    image: "/images/dhanda-3d-hero.jpg",
    badge: "Keynote Architecture",
    metricTitle: "Unified Command",
    metricValue: "99.8% Automated",
  },
  {
    id: "maps",
    label: "Google Maps Radar",
    alt: "3D Google Maps Ranking Radar and Rating Shield",
    image: "/images/3d-maps-radar.jpg",
    badge: "Local 3-Pack Autopilot",
    metricTitle: "Top Local Rank",
    metricValue: "Rank #1 Locked",
  },
  {
    id: "social",
    label: "Daily Social Studio",
    alt: "3D AI Social Media Generator Studio with Floating Phone and Festival Posters",
    image: "/images/3d-social-studio.jpg",
    badge: "Auto Festival Creatives",
    metricTitle: "Festival Banners",
    metricValue: "365 Days Ready",
  },
];

export function HeroJet() {
  const [activeTab, setActiveTab] = useState(0);
  const currentTab = heroTabs[activeTab];

  return (
    <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Radial Spotlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-violet-600/15 via-cyan-500/10 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-violet-600/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-cyan-600/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Hero Header Content */}
      <div className="text-center max-w-4xl mx-auto relative z-10">
        {/* Linear/Jet Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium shimmer-pill text-zinc-300 mb-8 cursor-pointer hover:scale-105 transition-transform duration-200">
          <span className="flex h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
          <span className="font-semibold text-white">Dhanda AI 2.0 is Live</span>
          <span className="text-zinc-500">•</span>
          <span className="text-violet-400 flex items-center gap-1 font-semibold">
            See the Jet Bento Architecture <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        {/* Hero Headline (Generated via MCP SEO Content Tool) */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.08]">
          Your Shop Deserves to Be the{" "}
          <span className="text-gradient">First Name on Google Maps.</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-xl text-zinc-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          Dhanda Grow is the AI-powered local business marketing automation suite built for India&apos;s shop owners, clinics, salons, cafes, gyms, and service centers. We automate your Google Maps ranking, daily festival social posters, and 5-star WhatsApp reviews — so you can spend your time serving customers, not juggling marketing tools.
        </p>

        {/* Hero CTA Button Cluster */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto h-13 px-8 text-base font-bold bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white rounded-xl shadow-[0_0_35px_rgba(124,58,237,0.35)] transition-all duration-300 hover:scale-105"
          >
            <a href="#lead-capture" className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-200" />
              <span>Start 7-Day Free Trial</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto h-13 px-7 text-base font-semibold border-white/15 bg-white/[0.03] hover:bg-white/10 hover:border-white/30 text-white rounded-xl backdrop-blur-md transition-all duration-200"
          >
            <a href="#bento-suite" className="flex items-center justify-center gap-2">
              <Play className="w-4 h-4 fill-white text-white" />
              <span>Explore Interactive Demo</span>
            </a>
          </Button>
        </div>

        {/* Social Proof Avatars Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-400 pb-10">
          <div className="flex -space-x-2 overflow-hidden">
            <span className="inline-block h-7 w-7 rounded-full ring-2 ring-[#04040f] bg-gradient-to-tr from-violet-600 to-pink-500 flex items-center justify-center text-[10px] text-white font-bold">RK</span>
            <span className="inline-block h-7 w-7 rounded-full ring-2 ring-[#04040f] bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-[10px] text-white font-bold">AS</span>
            <span className="inline-block h-7 w-7 rounded-full ring-2 ring-[#04040f] bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-[10px] text-white font-bold">PS</span>
            <span className="inline-block h-7 w-7 rounded-full ring-2 ring-[#04040f] bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-[10px] text-white font-bold">MD</span>
          </div>
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span>
            <strong className="text-white font-semibold">4.9/5 Rating</strong> from 10,000+ local businesses across India
          </span>
        </div>
      </div>

      {/* Central Framer Jet Product Stage Viewport */}
      <div id="bento-suite" className="relative max-w-5xl mx-auto mt-2">
        {/* Floating Viewport Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="inline-flex p-1.5 rounded-xl bg-zinc-900/90 border border-white/10 backdrop-blur-xl shadow-2xl">
            {heroTabs.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  activeTab === idx
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/25"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.id === "dashboard" && <Layers className="w-3.5 h-3.5" />}
                {tab.id === "maps" && <MapPin className="w-3.5 h-3.5" />}
                {tab.id === "social" && <Share2 className="w-3.5 h-3.5" />}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3D Keynote Stage Card with BorderBeam */}
        <ThreeDCard className="w-full">
          <div className="relative rounded-2xl sm:rounded-3xl border border-white/15 bg-[#090912] p-2.5 sm:p-4 shadow-2xl overflow-hidden group">
            <BorderBeam size={350} duration={12} colorFrom="#a855f7" colorTo="#38bdf8" />

            {/* Inner Browser Window Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-black/40 rounded-t-xl mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-[11px] font-mono text-zinc-500 hidden sm:inline">
                  dhanda-grow.app/engine/v2.0
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  {currentTab.badge}
                </span>
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>

            {/* Main Visual Display */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/10] rounded-xl overflow-hidden bg-black/60">
              <Image
                src={currentTab.image}
                alt={currentTab.alt}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-102"
                sizes="(max-width: 1024px) 100vw, 1100px"
              />

              {/* Ambient Bottom Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090912] via-transparent to-transparent pointer-events-none" />

              {/* Floating Keynote Metric Pill (Top Left) */}
              <div className="absolute top-4 left-4 p-3 rounded-xl bg-black/75 border border-white/15 backdrop-blur-md shadow-2xl hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                    {currentTab.metricTitle}
                  </div>
                  <div className="text-base font-black text-white">{currentTab.metricValue}</div>
                </div>
              </div>

              {/* Floating Keynote Status Pill (Bottom Right) */}
              <div className="absolute bottom-4 right-4 p-3 rounded-xl bg-black/80 border border-white/15 backdrop-blur-md shadow-2xl flex items-center gap-2.5">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase font-mono">Status</div>
                  <div className="text-xs font-bold text-emerald-400">Live AI Autopilot Active</div>
                </div>
              </div>
            </div>
          </div>
        </ThreeDCard>
      </div>
    </section>
  );
}
