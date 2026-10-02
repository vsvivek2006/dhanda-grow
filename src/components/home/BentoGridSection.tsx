"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Share2,
  Star,
  TrendingUp,
  Search,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Smartphone,
  Send,
  Sliders,
  DollarSign,
  PhoneCall,
  Navigation,
  RefreshCw,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { Button } from "@/components/ui/button";

const searchQueries = [
  { query: "top clothing boutique in indiranagar", rank: "#1", category: "Retail", views: "+210%" },
  { query: "best dental clinic near me", rank: "#1", category: "Healthcare", views: "+185%" },
  { query: "best biryani & cafe open now", rank: "#1", category: "Food & Dining", views: "+340%" },
  { query: "bridal makeup & hair spa near me", rank: "#1", category: "Beauty", views: "+195%" },
  { query: "unisex gym with personal trainer", rank: "#1", category: "Fitness", views: "+160%" },
];

const festivalThemes = [
  {
    name: "Diwali Dhamaka",
    color: "from-amber-500/20 via-orange-500/10 to-amber-900/30",
    border: "border-amber-500/30",
    badge: "Diwali 2026",
    headline: "Lighting Up Your Celebrations! Flat 30% Festive OFF ✨",
    tagline: "Visit our store today & claim your assured festival gift hamper.",
  },
  {
    name: "Holi Colors Fest",
    color: "from-fuchsia-500/20 via-pink-500/10 to-violet-900/30",
    border: "border-pink-500/30",
    badge: "Holi Special",
    headline: "Splash Into Fresh Spring Collections & Crazy Combos 🎨",
    tagline: "Pure organic gulal + exclusive deals on every purchase this week.",
  },
  {
    name: "Weekend Mega Sale",
    color: "from-cyan-500/20 via-blue-500/10 to-indigo-900/30",
    border: "border-cyan-500/30",
    badge: "Weekend Flash",
    headline: "48-Hour Weekend Rush: Buy 2 Get 1 Free Storewide! ⚡",
    tagline: "Exclusive for local walk-in customers only. Hurry while stocks last.",
  },
];

export function BentoGridSection() {
  // Google Maps Radar State
  const [queryIndex, setQueryIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  // Festival Poster State
  const [selectedFestival, setSelectedFestival] = useState(0);

  // Review Simulator State
  const [selectedStars, setSelectedStars] = useState(5);
  const [hasRated, setHasRated] = useState(false);

  // ROI Calculator State
  const [calcBusiness, setCalcBusiness] = useState<"retail" | "food" | "salon" | "clinic" | "gym">("retail");
  const [dailyFootfall, setDailyFootfall] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setQueryIndex((prev) => (prev + 1) % searchQueries.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setQueryIndex((prev) => (prev + 1) % searchQueries.length);
      setIsScanning(false);
    }, 800);
  };

  const currentQuery = searchQueries[queryIndex];
  const activeFestival = festivalThemes[selectedFestival];

  // Footfall multiplier estimates
  const multiplier = {
    retail: { callsPerDay: 0.45, directionsPerDay: 0.8, avgTicket: 1200 },
    food: { callsPerDay: 0.7, directionsPerDay: 1.2, avgTicket: 650 },
    salon: { callsPerDay: 0.6, directionsPerDay: 0.9, avgTicket: 1500 },
    clinic: { callsPerDay: 0.85, directionsPerDay: 0.75, avgTicket: 2200 },
    gym: { callsPerDay: 0.4, directionsPerDay: 0.6, avgTicket: 4500 },
  }[calcBusiness];

  const estExtraCalls = Math.round(dailyFootfall * multiplier.callsPerDay * 30 * 0.45);
  const estExtraDirections = Math.round(dailyFootfall * multiplier.directionsPerDay * 30 * 0.55);
  const estMonthlyRevenue = Math.round(
    estExtraDirections * 0.22 * multiplier.avgTicket + estExtraCalls * 0.3 * multiplier.avgTicket
  );

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Jet Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-violet-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-cyan-600/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-violet-500/10 border border-violet-500/20 text-violet-300 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>The Jet-Engine Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-5 leading-tight">
          Everything Your Local Business Needs.{" "}
          <span className="text-gradient">Zero Manual Effort.</span>
        </h2>
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
          Dhanda Grow brings the Google Maps radar, festival social automation, and WhatsApp review engine into one high-performance Bento suite.
        </p>
      </div>

      {/* Bento Grid (Jet/Linear Asymmetric Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ============================================================== */}
        {/* CARD 1: Google Maps Local Rank Radar (Span 8 Cols)             */}
        {/* ============================================================== */}
        <SpotlightCard className="lg:col-span-8 flex flex-col justify-between group">
          <BorderBeam size={300} duration={10} colorFrom="#7c3aed" colorTo="#06b6d4" />
          
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shadow-inner">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-violet-400">Pillar 01</span>
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] text-zinc-400 font-mono">LIVE SYNCED</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Google Maps Local SEO Autopilot</h3>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSimulateScan}
                disabled={isScanning}
                className="text-xs border-white/10 hover:border-violet-500/40 hover:bg-violet-500/10 text-zinc-300"
              >
                <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isScanning ? "animate-spin text-violet-400" : ""}`} />
                {isScanning ? "Scanning..." : "Simulate Search"}
              </Button>
            </div>

            <p className="text-sm text-zinc-400 mb-6">
              Rank in the coveted Google Local 3-Pack when high-intent buyers search for your services nearby. Continuous keyword optimization, photo geo-tagging, and profile freshness.
            </p>

            {/* Interactive Radar Visual Box */}
            <div className="rounded-xl border border-white/10 bg-[#07070d] p-5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 blur-3xl rounded-full pointer-events-none" />

              {/* Simulated Google Search Bar */}
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-zinc-900/80 border border-white/10 text-sm text-zinc-300 mb-4 font-mono shadow-inner">
                <Search className="w-4 h-4 text-violet-400 shrink-0" />
                <span className="truncate">google.com/search?q={currentQuery.query}</span>
                <span className="ml-auto shrink-0 text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  {currentQuery.category}
                </span>
              </div>

              {/* Live Rank Result Card */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-violet-950/20 border border-violet-500/30 backdrop-blur-md">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex flex-col items-center justify-center text-white font-extrabold shadow-lg shadow-emerald-500/20 shrink-0">
                    <span className="text-[10px] uppercase font-bold tracking-tighter opacity-80">Rank</span>
                    <span className="text-lg leading-none">{currentQuery.rank}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                      Your Business Name Here
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </h4>
                    <p className="text-xs text-zinc-400">4.9 ★★★★★ (480+ local reviews) • Open now</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <span className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300 flex items-center gap-1 font-mono">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    {currentQuery.views} Footfall
                  </span>
                </div>
              </div>

              {/* Telemetry Chips */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/[0.06] text-center">
                <div>
                  <div className="text-xs text-zinc-500">Google 3-Pack</div>
                  <div className="text-sm font-bold text-emerald-400">Locked #1</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">Profile Health</div>
                  <div className="text-sm font-bold text-violet-300">100% Verified</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">Local Citations</div>
                  <div className="text-sm font-bold text-cyan-400">42/42 Synced</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between text-xs text-zinc-400 border-t border-white/[0.06] pt-4">
            <span>Automated Weekly Google Rank Audits</span>
            <span className="text-violet-400 font-medium">Included in Standard Plan →</span>
          </div>
        </SpotlightCard>

        {/* ============================================================== */}
        {/* CARD 2: Daily Festival Posters (Span 4 Cols)                  */}
        {/* ============================================================== */}
        <SpotlightCard className="lg:col-span-4 flex flex-col justify-between group">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shadow-inner">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-pink-400">Pillar 02</span>
                <h3 className="text-lg font-bold text-white">Daily AI Festival Creatives</h3>
              </div>
            </div>

            <p className="text-xs text-zinc-400 mb-4">
              Never miss Diwali, Holi, Eid, or weekend sales. Pre-branded festival banners generated 24 hours in advance.
            </p>

            {/* Festival Switcher Tabs */}
            <div className="flex gap-1.5 p-1 rounded-lg bg-white/5 border border-white/10 mb-4">
              {festivalThemes.map((fest, idx) => (
                <button
                  key={fest.name}
                  onClick={() => setSelectedFestival(idx)}
                  className={`flex-1 py-1 px-2 rounded-md text-[11px] font-semibold transition-all ${
                    selectedFestival === idx
                      ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {fest.badge}
                </button>
              ))}
            </div>

            {/* Live Interactive Festival Poster Preview */}
            <div
              className={`rounded-xl border ${activeFestival.border} bg-gradient-to-br ${activeFestival.color} p-5 relative overflow-hidden transition-all duration-300 shadow-xl`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-white border border-white/20">
                  {activeFestival.badge}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">1080 x 1080 HD</span>
              </div>

              <h4 className="text-base font-extrabold text-white mb-2 leading-snug">
                {activeFestival.headline}
              </h4>
              <p className="text-xs text-zinc-300 mb-4 line-clamp-2">
                {activeFestival.tagline}
              </p>

              {/* Auto Watermark Badge */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-black/60 border border-white/15 text-[11px] text-zinc-300 backdrop-blur-md">
                <span className="font-semibold text-white truncate max-w-[130px] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-pink-400 shrink-0" />
                  <span>Your Shop Name</span>
                </span>
                <span className="text-emerald-400 font-mono text-[10px]">WhatsApp Auto-Stamp</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-xs text-zinc-400">365 Pre-Scheduled Posts</span>
            <span className="text-xs font-semibold text-pink-400">Auto WhatsApp Share →</span>
          </div>
        </SpotlightCard>

        {/* ============================================================== */}
        {/* CARD 3: 5-Star WhatsApp Review Booster (Span 4 Cols)          */}
        {/* ============================================================== */}
        <SpotlightCard className="lg:col-span-4 flex flex-col justify-between group">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-inner">
                <Star className="w-5 h-5 fill-amber-400/30" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Pillar 03</span>
                <h3 className="text-lg font-bold text-white">5-Star WhatsApp Booster</h3>
              </div>
            </div>

            <p className="text-xs text-zinc-400 mb-4">
              Turn happy walk-in customers into 5-star Google ratings right at checkout via automated WhatsApp invites.
            </p>

            {/* Simulated WhatsApp Notification Box */}
            <div className="rounded-xl border border-emerald-500/30 bg-[#081a13]/90 p-4 relative overflow-hidden shadow-xl">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-emerald-500/20 text-xs text-emerald-300">
                <Smartphone className="w-3.5 h-3.5" />
                <span className="font-semibold">WhatsApp Business Notification</span>
                <span className="ml-auto text-[10px] text-zinc-400">Just now</span>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/50 border border-emerald-500/20 text-xs text-zinc-200 mb-3">
                <p className="mb-2">
                  &ldquo;Hello Rahul! Thank you for visiting us today. How was your experience with our team?&rdquo;
                </p>

                {/* Interactive Star Rating */}
                <div className="flex items-center gap-1.5 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => {
                        setSelectedStars(star);
                        setHasRated(true);
                      }}
                      className="transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= selectedStars
                            ? "text-amber-400 fill-amber-400 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]"
                            : "text-zinc-600"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {hasRated && (
                <div className="text-[11px] font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded p-2 text-center animate-fade-in flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{selectedStars}-Star Rating Clicked! Customer auto-redirected to Google Maps.</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
            <span className="flex items-center gap-1">
              <span>Avg. Rating:</span>
              <strong className="text-white">4.9</strong>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>(840+ Ratings)</span>
            </span>
            <span className="text-amber-400 font-semibold">100% Verified →</span>
          </div>
        </SpotlightCard>

        {/* ============================================================== */}
        {/* CARD 4: Interactive Local Footfall & ROI Calculator (Span 8)  */}
        {/* ============================================================== */}
        <SpotlightCard className="lg:col-span-8 flex flex-col justify-between group">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-inner">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Interactive ROI Engine</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Project Your Footfall & Revenue Lift</h3>
                </div>
              </div>
            </div>

            <p className="text-sm text-zinc-400 mb-6">
              Calculate the direct monthly business impact of achieving #1 Google Maps ranking and consistent festival social engagement.
            </p>

            {/* Category Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-6">
              {[
                { id: "retail", label: "Retail Shop" },
                { id: "food", label: "Restaurant/Cafe" },
                { id: "salon", label: "Salon & Spa" },
                { id: "clinic", label: "Dental/Clinic" },
                { id: "gym", label: "Fitness/Gym" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCalcBusiness(item.id as any)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all text-center ${
                    calcBusiness === item.id
                      ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                      : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Footfall Slider */}
            <div className="mb-6 p-4 rounded-xl bg-[#080812] border border-white/10">
              <div className="flex items-center justify-between text-xs text-zinc-300 mb-2">
                <span>Current Daily Walk-in Footfall:</span>
                <span className="font-mono text-cyan-400 font-bold text-sm">{dailyFootfall} customers/day</span>
              </div>
              <input
                type="range"
                min="10"
                max="150"
                step="5"
                value={dailyFootfall}
                onChange={(e) => setDailyFootfall(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-zinc-800 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                <span>10 daily</span>
                <span>75 daily</span>
                <span>150 daily</span>
              </div>
            </div>

            {/* Computed Output Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-500/20">
                <div className="flex items-center gap-2 text-violet-400 text-xs mb-1">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Extra Phone Inquiries</span>
                </div>
                <div className="text-2xl font-black text-white font-mono">+{estExtraCalls} /mo</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">High-intent buyer calls</div>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
                <div className="flex items-center gap-2 text-cyan-400 text-xs mb-1">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Extra Direction Clicks</span>
                </div>
                <div className="text-2xl font-black text-white font-mono">+{estExtraDirections} /mo</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">Direct map navigations</div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                <div className="flex items-center gap-2 text-emerald-400 text-xs mb-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Est. Revenue Lift</span>
                </div>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  +₹{estMonthlyRevenue.toLocaleString("en-IN")}
                </div>
                <div className="text-[11px] text-zinc-400 mt-0.5">Projected monthly value</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-zinc-400">Based on Google Maps local search conversion benchmarks</span>
            <Button
              asChild
              className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold text-xs h-9 px-4 rounded-lg shadow-lg shadow-violet-500/20"
            >
              <a href="#lead-capture">
                Get Your Custom Audit Report <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </a>
            </Button>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
