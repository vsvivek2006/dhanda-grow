"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  TrendingUp,
  Search,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Share2,
  Calendar,
  Send,
  PhoneCall,
  Navigation,
  Check,
  Eye,
  Zap,
  Star,
} from "lucide-react";
import {
  GoogleMapsLogo,
  GoogleGLogo,
  WhatsAppRealLogo,
  InstagramRealLogo,
  FacebookRealLogo,
} from "@/components/ui/BrandIcons";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/ui/ParallaxSection";

const mapQueries = [
  {
    query: "best biryani & cafe near me",
    category: "Restaurants & Dining",
    rank: "#1 on Google Maps",
    discovery: "+340% Views",
    calls: 142,
    directions: 285,
    tagline: "Dominating local food search in 5km radius",
  },
  {
    query: "top clothing boutique in indiranagar",
    category: "Retail Fashion",
    rank: "#1 on Google Maps",
    discovery: "+210% Views",
    calls: 86,
    directions: 195,
    tagline: "Captures weekend festive walk-in shoppers",
  },
  {
    query: "best dental clinic & implant near me",
    category: "Doctors & Healthcare",
    rank: "#1 on Google Maps",
    discovery: "+185% Views",
    calls: 94,
    directions: 148,
    tagline: "Builds instant patient trust with top map position",
  },
  {
    query: "bridal makeup & hair spa near me",
    category: "Salons & Beauty",
    rank: "#1 on Google Maps",
    discovery: "+195% Views",
    calls: 110,
    directions: 165,
    tagline: "Keeps appointment books packed for wedding season",
  },
];

const festivalPosts = [
  {
    id: "diwali",
    title: "Diwali Dhamaka Festive Mega Sale",
    badge: "Diwali Special",
    headline: "Lighting Up Your Celebrations! Flat 30% Festive OFF ✨",
    tagline: "Visit our showroom today & claim your assured festival gift hamper.",
    caption:
      "✨ This Diwali, brighten your home with exclusive festive collections at [Your Shop]! Flat 30% discount on all new arrivals. Visit us today at Main Market or WhatsApp us for home delivery. #HappyDiwali #FestiveSale #LocalShop #DiwaliDhamaka",
    accent: "from-amber-500/20 via-orange-500/10 to-amber-900/40",
    border: "border-amber-500/30",
    btnColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  {
    id: "holi",
    title: "Holi Colors Fest & Spring Clearance",
    badge: "Holi Mega Offer",
    headline: "Splash Into Fresh Spring Collections & Exclusive Combos 🎨",
    tagline: "Pure organic gulal + assured gifts on every purchase this week.",
    caption:
      "🎨 Celebrate the vibrant festival of colors with irresistible deals at [Your Shop]! Buy 2 Get 1 Free on all spring trends. Drop by before Sunday! #HoliSpecial #FestiveOffers #SpringFest #LocalBusiness",
    accent: "from-fuchsia-500/20 via-pink-500/10 to-violet-900/40",
    border: "border-pink-500/30",
    btnColor: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  },
  {
    id: "weekend",
    title: "Weekend Flash Walk-In Rush",
    badge: "48-Hour Weekend Rush",
    headline: "Weekend Special: Flat 40% OFF Storewide This Saturday & Sunday! ⚡",
    tagline: "Exclusive for local walk-in customers only. First 50 buyers get VIP gift.",
    caption:
      "⚡ Weekend shopping alert! Enjoy massive 40% savings across all items this weekend only at [Your Shop]. Tap directions below to visit! #WeekendSale #LocalDeals #ShopLocal #LimitedPeriodOffer",
    accent: "from-cyan-500/20 via-blue-500/10 to-indigo-900/40",
    border: "border-cyan-500/30",
    btnColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  },
];

export function CoreGrowthEngines() {
  const [activeMapQuery, setActiveMapQuery] = useState(0);
  const [activeFestIndex, setActiveFestIndex] = useState(0);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [sharedWhatsApp, setSharedWhatsApp] = useState(false);

  const currentQuery = mapQueries[activeMapQuery];
  const currentFest = festivalPosts[activeFestIndex];

  const handleCopyCaption = () => {
    navigator.clipboard?.writeText(currentFest.caption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  const handleShareSimulate = () => {
    setSharedWhatsApp(true);
    setTimeout(() => setSharedWhatsApp(false), 2500);
  };

  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-purple-600/8 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[400px] bg-cyan-600/8 blur-[160px] pointer-events-none rounded-full" />

      {/* Header */}
      <RevealOnScroll direction="up" delay={0.1}>
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/[0.04] border border-white/10 text-zinc-300 mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>The Autonomous Growth Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.04em] text-white mb-4">
            Google Maps Dominance & Social Media Autopilot
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
            Designed specifically for local retail shops, restaurants, doctors, and salons. Two interconnected engines that attract nearby buyers and keep your brand buzzing every single day.
          </p>
        </div>
      </RevealOnScroll>

      {/* ============================================================== */}
      {/* TWIN CORE ENGINES: SIDE BY SIDE ARCHITECTURE                   */}
      {/* ============================================================== */}
      <div className="grid lg:grid-cols-2 gap-8 relative z-10">
        {/* ============================================================== */}
        {/* ENGINE 01: GOOGLE MAPS 3-PACK RANKING RADAR                    */}
        {/* ============================================================== */}
        <RevealOnScroll direction="up" delay={0.15} className="h-full">
          <div className="rounded-3xl border border-white/10 bg-[#080814]/90 p-5 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between relative overflow-hidden group h-full">
            <BorderBeam size={260} duration={14} colorFrom="#38bdf8" colorTo="#34d399" />

          <div>
            {/* Engine Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center shadow-inner">
                  <GoogleMapsLogo className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                      Engine 01
                    </span>
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[10px] text-zinc-400 font-mono">Live Sync</span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Google Maps Ranking Radar
                  </h3>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Top 3 Position Locked</span>
              </div>
            </div>

            <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
              When someone nearby searches for what you sell, 70% of phone calls and store visits go to the top 3 spots on Google Maps. Dhanda Grow audits your profile, injects high-intent keywords, and propels your business to #1.
            </p>

            {/* Interactive Query Selector Pills */}
            <div className="space-y-2 mb-6">
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Select Local Category Search:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {mapQueries.map((q, idx) => (
                  <button
                    key={q.query}
                    onClick={() => setActiveMapQuery(idx)}
                    className={`text-left p-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between border ${
                      activeMapQuery === idx
                        ? "bg-cyan-500/15 border-cyan-500/40 text-white shadow-md"
                        : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    <span className="truncate mr-1">{q.category}</span>
                    <span className="text-[10px] font-mono text-cyan-400 shrink-0 font-bold">#1</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Radar Telemetry Window */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-cyan-500/25 bg-black/60 shadow-xl">
              <Image
                src="/images/3d-maps-radar.jpg"
                alt="3D Google Maps Local 3-Pack Telemetry"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 border border-white/15 backdrop-blur-md text-[11px] font-mono text-cyan-300 flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 pulse-dot" />
                <span>Live Neighborhood Geocode Radar</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold text-white px-3 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
                <span>Rank Radar Status</span>
                <span className="text-emerald-400 font-mono text-[11px]">Dominating 12 Geocodes</span>
              </div>
            </div>

            {/* Live Google Search Preview Card */}
            <div className="rounded-2xl border border-white/10 bg-black/60 p-4 sm:p-5 mb-6 space-y-4">
              <div className="flex items-center gap-2.5 text-xs text-zinc-300 border-b border-white/[0.06] pb-3">
                <GoogleGLogo className="w-4 h-4 shrink-0" />
                <span className="text-zinc-400 font-mono text-[11px]">google.com/search?q=</span>
                <span className="text-white font-semibold truncate">&quot;{currentQuery.query}&quot;</span>
              </div>

              {/* Simulated Local 3-Pack Result */}
              <div className="rounded-xl p-3.5 bg-zinc-900/70 border border-cyan-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[11px] font-bold">
                      {currentQuery.rank}
                    </span>
                    <span className="font-bold text-white text-sm">[Your Business Name]</span>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 font-bold">{currentQuery.discovery}</span>
                </div>
                <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span>4.9 (280+ Reviews)</span>
                  <span>•</span>
                  <span>Open Now</span>
                </div>
                <div className="text-[11px] text-zinc-400">{currentQuery.tagline}</div>
              </div>

              {/* Monthly Action Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-white font-mono">+{currentQuery.calls}</div>
                    <div className="text-[10px] text-zinc-400">Direct Calls / mo</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-white font-mono">+{currentQuery.directions}</div>
                    <div className="text-[10px] text-zinc-400">Directions Tapped</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Capability Checklist */}
            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Automated Google Business Profile updates & category tuning</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Dominates high-converting &quot;near me&quot; searches across all local pins</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Real-time competitor rank alerts and neighborhood telemetry</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-mono">Radar Status: Active 24/7</span>
            <Link
              href="/services"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 group"
            >
              <span>Explore Rank Radar</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </RevealOnScroll>

        {/* ============================================================== */}
        {/* ENGINE 02: AI SOCIAL MEDIA CREATIVE SUITE                      */}
        {/* ============================================================== */}
        <RevealOnScroll direction="up" delay={0.25} className="h-full">
          <div className="rounded-3xl border border-white/10 bg-[#080814]/90 p-5 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between relative overflow-hidden group h-full">
            <BorderBeam size={260} duration={14} colorFrom="#c084fc" colorTo="#f43f5e" />

          <div>
            {/* Engine Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center shadow-inner">
                  <Share2 className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-pink-400 font-semibold">
                      Engine 02
                    </span>
                    <span className="flex h-1.5 w-1.5 rounded-full bg-pink-400" />
                    <span className="text-[10px] text-zinc-400 font-mono">365 Days Ready</span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    AI Social Creative Autopilot
                  </h3>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <InstagramRealLogo className="w-4 h-4 text-pink-400" />
                <WhatsAppRealLogo className="w-4 h-4 text-[#25d366]" />
                <FacebookRealLogo className="w-4 h-4 text-blue-400" />
              </div>
            </div>

            <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
              Never stare at a blank screen again. Dhanda Grow creates stunning festive posters, discount banners, and engaging Hindi/English captions customized with your logo, phone number, and address in 1-click.
            </p>

            {/* Visual Social Media Studio Showcase Window */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-pink-500/25 bg-black/60 shadow-xl">
              <Image
                src="/images/3d-social-studio.jpg"
                alt="3D AI Social Media Generator Studio"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 border border-white/15 backdrop-blur-md text-[11px] font-mono text-pink-300 flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-pink-400 pulse-dot" />
                <span>365-Day Festive Content Studio</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold text-white px-3 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
                <span>Festival Schedule</span>
                <span className="text-pink-300 font-mono text-[11px]">Diwali, Holi & Weekend Rush</span>
              </div>
            </div>

            {/* Campaign Switcher Tabs */}
            <div className="space-y-2 mb-6">
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Select Festival / Promotional Campaign:
              </div>
              <div className="grid grid-cols-3 gap-2">
                {festivalPosts.map((fest, idx) => (
                  <button
                    key={fest.id}
                    onClick={() => setActiveFestIndex(idx)}
                    className={`text-center p-2.5 rounded-xl text-xs font-medium transition-all border truncate ${
                      activeFestIndex === idx
                        ? "bg-pink-500/15 border-pink-500/40 text-white shadow-md font-semibold"
                        : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    {fest.badge}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Generated Poster & Caption Canvas */}
            <div className="rounded-2xl border border-white/10 bg-black/60 p-4 sm:p-5 mb-6 space-y-4">
              {/* Graphic Banner Preview */}
              <div
                className={`rounded-xl border ${currentFest.border} bg-gradient-to-br ${currentFest.accent} p-4 sm:p-5 relative overflow-hidden transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-white border border-white/20">
                    {currentFest.badge}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">1080 x 1080 HD Branded</span>
                </div>

                <h4 className="text-base sm:text-lg font-black text-white mb-2 leading-snug">
                  {currentFest.headline}
                </h4>
                <p className="text-xs text-zinc-300 mb-4">{currentFest.tagline}</p>

                {/* Auto Watermark Stamp */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-black/70 border border-white/15 text-[11px] text-zinc-200 backdrop-blur-md">
                  <div className="flex items-center gap-1.5 font-semibold text-white truncate">
                    <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                    <span>Your Shop Name • +91 98765 43210</span>
                  </div>
                  <span className="text-emerald-400 font-mono text-[10px] shrink-0">Auto-Stamped</span>
                </div>
              </div>

              {/* AI Auto-Caption Box */}
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/[0.08] space-y-2">
                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="font-semibold text-zinc-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-pink-400" /> AI Caption & Viral Hashtags
                  </span>
                  <button
                    onClick={handleCopyCaption}
                    className="text-xs text-pink-400 hover:text-pink-300 font-semibold"
                  >
                    {copiedCaption ? "Copied! ✓" : "Copy Caption"}
                  </button>
                </div>
                <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                  {currentFest.caption}
                </p>
              </div>

              {/* Action Simulation Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handleShareSimulate}
                  className="p-2.5 rounded-xl bg-[#25d366]/15 hover:bg-[#25d366]/25 border border-[#25d366]/30 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <WhatsAppRealLogo className="w-4 h-4 text-[#25d366]" />
                  <span>{sharedWhatsApp ? "Sent to Status! ✓" : "Post to WhatsApp Status"}</span>
                </button>

                <button
                  onClick={handleShareSimulate}
                  className="p-2.5 rounded-xl bg-pink-500/15 hover:bg-pink-500/25 border border-pink-500/30 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <InstagramRealLogo className="w-4 h-4 text-pink-400" />
                  <span>Share to Instagram</span>
                </button>
              </div>
            </div>

            {/* Core Capability Checklist */}
            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-pink-400 shrink-0" />
                <span>365-day Indian festival calendar (Diwali, Holi, Eid, regional events)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-pink-400 shrink-0" />
                <span>Logo, address & contact details automatically stamped on every poster</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-pink-400 shrink-0" />
                <span>1-click cross-publishing to WhatsApp Status, Facebook, and Instagram</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-mono">Creative Queue: 365 Days Ready</span>
            <Link
              href="/services"
              className="text-xs font-semibold text-pink-400 hover:text-pink-300 inline-flex items-center gap-1 group"
            >
              <span>Explore Social Studio</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  </section>
  );
}
