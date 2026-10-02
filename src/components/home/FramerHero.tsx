"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  ArrowRight,
  Play,
  Layers,
} from "lucide-react";
import {
  AppleLogo,
  GooglePlayLogo,
  InstagramRealLogo,
  WhatsAppRealLogo,
  FacebookRealLogo,
  GoogleMapsLogo,
} from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";

const keynoteTabs = [
  {
    id: "dashboard",
    label: "Overview",
    labelMobile: "Overview",
    title: "AI Autonomous Marketing Engine",
    subtitle: "Complete automated command center for Instagram, WhatsApp, Facebook & Google Maps",
    image: "/images/dhanda-3d-hero.jpg",
    alt: "Dhanda Grow 3D AI Marketing Engine Dashboard",
    tag: "Autonomous Suite",
  },
  {
    id: "instagram",
    label: "Instagram & Facebook",
    labelMobile: "Social",
    title: "Daily Branded Social Creatives",
    subtitle: "Diwali, Holi, and weekend sale posters auto-stamped with your logo & contact details",
    image: "/images/3d-social-studio.jpg",
    alt: "3D AI Social Media Generator Studio with Floating Phone and Festival Posters",
    tag: "365 Days Ready",
  },
  {
    id: "whatsapp",
    label: "WhatsApp Engine",
    labelMobile: "WhatsApp",
    title: "5-Star Google Review Booster",
    subtitle: "1-Click automated WhatsApp prompts that turn satisfied customers into 5-star reviews",
    image: "/images/dhanda-3d-hero.jpg",
    alt: "Dhanda Grow 3D AI Marketing Engine Dashboard",
    tag: "Review Shield Active",
  },
  {
    id: "maps",
    label: "Google Maps Radar",
    labelMobile: "Maps",
    title: "Local 3-Pack Ranking Dominance",
    subtitle: "Automated keyword optimization & real-time neighborhood competitor tracking",
    image: "/images/3d-maps-radar.jpg",
    alt: "3D Google Maps Ranking Radar and Rating Shield",
    tag: "Rank #1 Locked",
  },
];

export function FramerHero() {
  const [activeTab, setActiveTab] = useState(0);
  const current = keynoteTabs[activeTab];

  return (
    <section className="relative pt-10 sm:pt-16 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-purple-500/12 via-cyan-500/8 to-transparent blur-[140px] pointer-events-none rounded-full" />

      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-4xl mx-auto relative z-10 mb-10 sm:mb-14"
      >
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-medium bg-white/[0.04] border border-white/10 text-zinc-300 mb-4 sm:mb-6 backdrop-blur-md">
          <div className="flex items-center gap-1.5 mr-1">
            <InstagramRealLogo className="w-3.5 h-3.5" />
            <WhatsAppRealLogo className="w-3.5 h-3.5" />
            <FacebookRealLogo className="w-3.5 h-3.5" />
            <GoogleMapsLogo className="w-3.5 h-3.5" />
          </div>
          <span className="text-white font-semibold">Automated Local Marketing</span>
          <span className="text-zinc-600 hidden sm:inline">?</span>
          <span className="text-zinc-400 hidden sm:inline">Zero Design Skills Needed</span>
        </div>

        {/* Headline */}
        <h1 className="text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-white mb-4 sm:mb-6 leading-[1.06]">
          Grow Your Business <br />
          <span className="text-gradient-brand">with Intelligent AI</span> <br />
          <span className="text-gradient-brand">Marketing</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg text-zinc-300 max-w-xl mx-auto mb-7 sm:mb-10 leading-relaxed font-normal px-2 sm:px-0">
          Automate your Google Maps rankings, daily festival social posts, and 5-star WhatsApp reviews on complete autopilot.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4 sm:mb-5">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto h-12 px-7 text-sm font-semibold bg-white hover:bg-zinc-200 text-black rounded-xl shadow-lg transition-all"
          >
            <a href="#lead-capture" className="flex items-center justify-center gap-2">
              <span>Start for free</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto h-12 px-6 text-sm font-semibold border-white/15 bg-white/[0.03] hover:bg-white/10 text-white rounded-xl backdrop-blur-md transition-all"
          >
            <a href="#features" className="flex items-center justify-center gap-2">
              <Play className="w-3.5 h-3.5 fill-white text-white" />
              <span>Explore product tour</span>
            </a>
          </Button>
        </div>

        {/* Store Badges ? own row on mobile */}
        <div className="flex items-center justify-center gap-2.5 mb-5 sm:mb-6">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/90 border border-white/15 text-white flex items-center gap-2 transition-all hover:scale-105 shadow-md group"
          >
            <AppleLogo className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            <div className="text-left leading-none">
              <div className="text-[8px] text-zinc-400 uppercase font-mono tracking-wider">App Store</div>
              <div className="text-[11px] font-bold text-white">iPhone</div>
            </div>
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/90 border border-white/15 text-white flex items-center gap-2 transition-all hover:scale-105 shadow-md group"
          >
            <GooglePlayLogo className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <div className="text-left leading-none">
              <div className="text-[8px] text-zinc-400 uppercase font-mono tracking-wider">Google Play</div>
              <div className="text-[11px] font-bold text-white">Android</div>
            </div>
          </a>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs text-zinc-400 flex-wrap">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
            ))}
          </div>
          <span>
            <strong className="text-white font-medium">4.9 / 5.0 rating</strong>{" "}
            from 10,000+ local shops, clinics &amp; restaurants
          </span>
        </div>
      </motion.div>

      {/* PRODUCT VIEWPORT */}
      <div id="features" className="relative max-w-5xl mx-auto">
        {/* Tabs */}
        <div className="flex items-center justify-center mb-3 sm:mb-4 overflow-x-auto no-scrollbar px-1">
          <div className="inline-flex p-1 rounded-xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl">
            {keynoteTabs.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeTab === idx
                    ? "bg-white text-black shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {tab.id === "dashboard" && <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />}
                {tab.id === "instagram" && <InstagramRealLogo className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />}
                {tab.id === "whatsapp" && <WhatsAppRealLogo className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />}
                {tab.id === "maps" && <GoogleMapsLogo className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />}
                <span className="sm:hidden">{tab.labelMobile}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Canvas Card */}
        <div className="relative rounded-2xl border border-white/10 bg-[#090910] p-1.5 sm:p-3 shadow-2xl overflow-hidden">
          <BorderBeam size={320} duration={12} colorFrom="#a855f7" colorTo="#38bdf8" />

          {/* Window Chrome */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 border-b border-white/[0.06] bg-black/40 rounded-t-xl mb-1.5 sm:mb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-zinc-700" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-zinc-700" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-[11px] font-mono text-zinc-500 hidden sm:inline">
                dhanda-grow.app/{current.id}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10 max-w-[110px] truncate">
                {current.tag}
              </span>
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </div>
          </div>

          {/* Product Image ? taller ratio on mobile */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-xl overflow-hidden bg-black/90 border border-white/5">
            <Image
              src={current.image}
              alt={current.alt}
              fill
              priority
              className="object-cover object-top transition-opacity duration-300"
              sizes="(max-width: 1024px) 100vw, 1100px"
            />
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-black/50 rounded-b-xl border-t border-white/[0.06] mt-1.5 sm:mt-2 gap-1.5 sm:gap-2">
            <div className="text-left min-w-0 flex-1">
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span className="truncate">{current.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10 shrink-0 hidden sm:inline">
                  {current.tag}
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5 line-clamp-2 sm:line-clamp-none">
                {current.subtitle}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-auto shrink-0">
              <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 pulse-dot" />
                <span>Live Synced</span>
              </span>
              <a
                href="#lead-capture"
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 ml-1 sm:ml-2"
              >
                <span>Automate Now</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
