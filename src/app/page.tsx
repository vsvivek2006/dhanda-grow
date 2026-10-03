import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  MapPin,
  Share2,
  TrendingUp,
  ArrowRight,
  MessageCircle,
  BarChart3,
  Bot,
  Eye,
  Calendar,
  ShieldCheck,
  Star,
  CheckCircle2,
} from "lucide-react";
import { AppleLogo, GooglePlayLogo } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK, APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";
import { LeadForm } from "@/components/shared/LeadForm";
import { ThreeDCard } from "@/components/ui/ThreeDCard";
import { CoreGrowthEngines } from "@/components/home/CoreGrowthEngines";
import { ProblemsWeSolve } from "@/components/home/ProblemsWeSolve";
import { FramerHero } from "@/components/home/FramerHero";
import { ApplioFeatures } from "@/components/home/ApplioFeatures";
import { AppScreenshotsShowcase } from "@/components/home/AppScreenshotsShowcase";
import { IndustrySelector } from "@/components/home/IndustrySelector";
import { RevealOnScroll } from "@/components/ui/ParallaxSection";

export const metadata: Metadata = {
  title: "Dhanda Grow | AI Marketing for Local Businesses",
  description:
    "AI-powered digital marketing platform for local businesses. Skyrocket your Google Maps ranking, automate daily social media posts, and collect 5-star Google reviews automatically.",
  alternates: {
    canonical: "https://dhandhagrow.com",
  },
};

export default function HomePage() {

  return (
    <div className="bg-[#050508] text-zinc-100 min-h-screen relative overflow-hidden font-sans">
      {/* Framer-grade Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute top-[1400px] -left-48 w-[600px] h-[600px] bg-cyan-600/8 rounded-full blur-[160px]" />
        <div className="absolute top-[2800px] -right-48 w-[600px] h-[600px] bg-purple-600/8 rounded-full blur-[160px]" />
      </div>

      {/* ──────────────────────────────────────────
          HERO SECTION: Framer Style Software Showcase
      ────────────────────────────────────────── */}
      <FramerHero />

      {/* ──────────────────────────────────────────
          STATS BAR: PROOF COUNTERS
      ────────────────────────────────────────── */}
      <RevealOnScroll direction="up" delay={0.1}>
        <section className="border-y border-white/10 bg-[#07071a]/90 py-10 px-4 relative z-20">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl md:text-5xl font-black text-gradient-brand">
                  10,000+
                </div>
                <div className="text-xs md:text-sm text-slate-400 font-medium">Local Businesses Active</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl md:text-5xl font-black text-gradient-brand">
                  50,000+
                </div>
                <div className="text-xs md:text-sm text-slate-400 font-medium">5-Star Reviews Gathered</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl md:text-5xl font-black text-gradient-brand">
                  20 Lakh+
                </div>
                <div className="text-xs md:text-sm text-slate-400 font-medium">AI Creatives & Posts</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl md:text-5xl font-black text-gradient-brand">
                  4.8 / 5.0
                </div>
                <div className="text-xs md:text-sm text-slate-400 font-medium">Merchant Satisfaction Rating</div>
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* ──────────────────────────────────────────
          PROBLEMS WE SOLVE: 4 COSTLY VISIBILITY PROBLEMS
      ────────────────────────────────────────── */}
      <ProblemsWeSolve />

      {/* ──────────────────────────────────────────
          CORE ENGINES: GOOGLE RANKING & SOCIAL AUTOMATION
      ────────────────────────────────────────── */}
      <CoreGrowthEngines />

      {/* ──────────────────────────────────────────
          3D FEATURE 1: GOOGLE MAPS DOMINANCE
      ────────────────────────────────────────── */}
      <section className="py-14 sm:py-24 px-4 container mx-auto max-w-7xl relative overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6">
            <RevealOnScroll delay={0.05}>
              <div className="space-y-6">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20">
                  Feature 01 • Local SEO Radar
                </span>
                <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Skyrocket Your <br />
                  <span className="text-gradient-brand">
                    Google Maps Ranking
                  </span>
                </h2>
                <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                  When nearby customers search for what you sell, 70% of calls and store visits go to the top 3 spots on Google Maps. Dhanda Grow audits your profile, detects high-converting local search terms, and systematically propels your business to #1.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="glass-card p-4 rounded-2xl border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 mb-2">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-white text-sm">Health Score Radar</h3>
                    <p className="text-xs text-slate-400 mt-1">Audit 30+ ranking factors on your profile.</p>
                  </div>

                  <div className="glass-card p-4 rounded-2xl border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-2">
                      <Eye className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-white text-sm">Competitor Radar</h3>
                    <p className="text-xs text-slate-400 mt-1">See competitor ranks across all neighborhood pins.</p>
                  </div>

                  <div className="glass-card p-4 rounded-2xl border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-white text-sm">Keyword Optimization</h3>
                    <p className="text-xs text-slate-400 mt-1">Target "near me" keywords that bring buyers.</p>
                  </div>

                  <div className="glass-card p-4 rounded-2xl border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 mb-2">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-white text-sm">Traffic & Call Growth</h3>
                    <p className="text-xs text-slate-400 mt-1">Track direction taps and phone inquiries live.</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right 3D Visual */}
          <div className="lg:col-span-6">
            <RevealOnScroll delay={0.05}>
              <ThreeDCard depth={20} glowColor="rgba(6, 182, 212, 0.4)">
                <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-[#0a0a24] p-3">
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden">
                    <Image
                      src="/images/3d-maps-radar.jpg"
                      alt="3D Google Maps Ranking Radar and Rating Shield"
                      fill
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="p-4 mt-2 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-cyan-300 font-bold uppercase tracking-wider">Neighborhood Grid Telemetry</div>
                        <div className="text-sm font-black text-white">Dominating 12 of 14 Local Geocodes</div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                        Top 3 Active
                      </span>
                    </div>
                  </div>
                </div>
              </ThreeDCard>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────
          3D FEATURE 2: SOCIAL CREATIVE STUDIO
      ────────────────────────────────────────── */}
      <section className="py-14 sm:py-24 px-4 container mx-auto max-w-7xl relative border-t border-white/10 overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left 3D Visual (Alternating) */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <RevealOnScroll delay={0.05}>
              <ThreeDCard depth={20} glowColor="rgba(168, 85, 247, 0.45)">
                <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-[#0c0c2a] p-3">
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden">
                    <Image
                      src="/images/3d-social-studio.jpg"
                      alt="3D AI Social Media Generator Studio with Floating Phone and Festival Posters"
                      fill
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="p-4 mt-2 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-purple-300 font-bold uppercase tracking-wider">AI Content Studio</div>
                        <div className="text-sm font-black text-white">Diwali & Holiday Campaign Auto-Generated</div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold">
                        1-Tap Publish
                      </span>
                    </div>
                  </div>
                </div>
              </ThreeDCard>
            </RevealOnScroll>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <RevealOnScroll delay={0.05}>
              <div className="space-y-6">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20">
                  Feature 02 • Social Media Autopilot
                </span>
                <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Post Every Day Without <br />
                  <span className="text-gradient-brand">
                    Designing Anything
                  </span>
                </h2>
                <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                  Never stare at a blank screen again. Dhanda Grow creates stunning festive posters, discount banners, and engaging Hindi/English captions customized with your logo, phone number, and shop address in 1-click.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="glass-card p-4 rounded-2xl border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-2">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-white text-sm">1-Click Cross-Posting</h3>
                    <p className="text-xs text-slate-400 mt-1">Publish to Facebook, Instagram & WhatsApp Status at once.</p>
                  </div>

                  <div className="glass-card p-4 rounded-2xl border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 mb-2">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-white text-sm">Indian Festival Calendar</h3>
                    <p className="text-xs text-slate-400 mt-1">Automatic banners for Diwali, Holi, Eid, and regional events.</p>
                  </div>

                  <div className="glass-card p-4 rounded-2xl border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
                      <Bot className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-white text-sm">Smart AI Captions</h3>
                    <p className="text-xs text-slate-400 mt-1">Viral local captions and hashtags generated automatically.</p>
                  </div>

                  <div className="glass-card p-4 rounded-2xl border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 mb-2">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-white text-sm">Automated Watermark</h3>
                    <p className="text-xs text-slate-400 mt-1">Your brand logo and contact details stamped on every graphic.</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────
          3D FEATURE 3: 5-STAR WHATSAPP REVIEW ENGINE
      ────────────────────────────────────────── */}
      <section className="py-14 sm:py-24 px-4 container mx-auto max-w-7xl relative border-t border-white/10 overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <RevealOnScroll delay={0.05}>
              <div className="space-y-6">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
                  Feature 03 • 5★ Reputation Engine
                </span>
                <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Turn Happy Customers into <br />
                  <span className="text-gradient-brand">
                    5-Star Google Reviews
                  </span>
                </h2>
                <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                  93% of shoppers read Google reviews before entering a local store. Dhanda Grow makes gathering reviews seamless by dispatching courteous 1-click WhatsApp review requests and replying to every review in seconds with AI.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="glass-card p-4 rounded-2xl border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-white text-sm">WhatsApp Direct Prompts</h3>
                    <p className="text-xs text-slate-400 mt-1">Send 1-tap review links directly to happy customers.</p>
                  </div>

                  <div className="glass-card p-4 rounded-2xl border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 mb-2">
                      <Bot className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-white text-sm">Instant 4-Second Replies</h3>
                    <p className="text-xs text-slate-400 mt-1">AI replies with personalized gratitude 24/7.</p>
                  </div>

                  <div className="glass-card p-4 rounded-2xl border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 mb-2">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-white text-sm">Negative Review Shield</h3>
                    <p className="text-xs text-slate-400 mt-1">Intercept complaints privately before they hit public ratings.</p>
                  </div>

                  <div className="glass-card p-4 rounded-2xl border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-2">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-white text-sm">Trust Velocity</h3>
                    <p className="text-xs text-slate-400 mt-1">Build unstoppable credibility in your town.</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Interactive Card */}
          <div className="lg:col-span-6">
            <RevealOnScroll delay={0.05}>
              <ThreeDCard depth={20} glowColor="rgba(37, 211, 102, 0.35)">
                <div className="glass-card p-8 rounded-3xl border border-white/20 bg-gradient-to-b from-[#091b16] to-[#040c0b] shadow-2xl space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Automated WhatsApp Review Sequence
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                      100% Automated
                    </span>
                  </div>

                  <div className="rounded-2xl p-5 bg-[#075e54]/30 border border-[#25d366]/40 space-y-2">
                    <div className="text-xs text-emerald-300 font-bold flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-[#25d366]" /> Sent via WhatsApp to Customer:
                    </div>
                    <p className="text-xs md:text-sm text-white leading-relaxed">
                      &quot;Hi Ritu! Thank you for visiting [Your Shop] today. We hope you loved your experience! Tap here to leave a 5-star review on Google: bit.ly/rate-us&quot;
                    </p>
                  </div>

                  <div className="rounded-2xl p-4 bg-white/5 border border-white/10 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Ritu Verma reviewed on Google Maps</span>
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 italic">
                      &quot;Wonderful collection and polite staff! Very happy with my purchase.&quot;
                    </p>
                  </div>

                  <div className="rounded-2xl p-4 bg-purple-950/40 border border-purple-500/40 space-y-1">
                    <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                      <Bot className="w-4 h-4" /> AI Auto-Replied (Sent in 4 seconds):
                    </div>
                    <p className="text-xs text-slate-200">
                      &quot;Thank you so much Ritu! It was our pleasure to serve you. We look forward to welcoming you back soon!&quot;
                    </p>
                  </div>
                </div>
              </ThreeDCard>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────
          APPLIO APP FEATURES & TESTIMONIALS
      ────────────────────────────────────────── */}
      <ApplioFeatures />

      {/* ──────────────────────────────────────────
          3D APP SCREENSHOTS & MOBILE EXPERIENCE
      ────────────────────────────────────────── */}
      <AppScreenshotsShowcase />

      {/* ──────────────────────────────────────────
          INTERACTIVE INDUSTRY SELECTOR
      ────────────────────────────────────────── */}
      <IndustrySelector />

      {/* ──────────────────────────────────────────
          COMPARISON TABLE: WHY DHANDA GROW WINS
      ────────────────────────────────────────── */}
      <section className="py-14 sm:py-24 px-4 container mx-auto max-w-6xl relative border-t border-white/10 overflow-hidden">
        <RevealOnScroll direction="up" delay={0.1}>
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16 space-y-4">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20">
              Unbeatable Value
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight">
              Why Local Businesses Choose Dhanda Grow
            </h2>
            <p className="text-base md:text-lg text-slate-300">
              Compare Dhanda Grow against costly marketing agencies and stressful DIY attempts.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={0.15}>
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
            <table className="w-full min-w-[560px] text-left border-collapse glass-card rounded-3xl overflow-hidden border border-white/15">
              <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-xs md:text-sm">
                  <th className="p-3 sm:p-5 text-slate-300 font-semibold">Features & Benefits</th>
                  <th className="p-3 sm:p-5 text-slate-400 font-normal">Marketing Agency</th>
                  <th className="p-3 sm:p-5 text-slate-400 font-normal">Doing It Yourself</th>
                  <th className="p-3 sm:p-5 text-white font-bold bg-purple-900/40 border-l border-r border-purple-500/30">
                    <div className="flex items-center gap-1.5 text-cyan-300">
                      <Sparkles className="w-4 h-4" /> Dhanda Grow
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-xs md:text-sm">
                <tr>
                  <td className="p-3 sm:p-5 font-semibold text-white">Monthly Cost</td>
                  <td className="p-3 sm:p-5 text-slate-400">₹20,000 - ₹50,000 / mo</td>
                  <td className="p-3 sm:p-5 text-slate-400">15+ hours of your free time</td>
                  <td className="p-3 sm:p-5 font-bold text-emerald-400 bg-purple-900/20 border-l border-r border-purple-500/20">
                    Free / Affordable
                  </td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-5 font-semibold text-white">Google Maps Audit & Rank Tracking</td>
                  <td className="p-3 sm:p-5 text-slate-400">Manual monthly report</td>
                  <td className="p-3 sm:p-5 text-slate-400">Rarely done / Guesswork</td>
                  <td className="p-3 sm:p-5 font-bold text-white bg-purple-900/20 border-l border-r border-purple-500/20">
                    Real-time 24/7 AI Radar
                  </td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-5 font-semibold text-white">Daily Social Posters & Festival Graphics</td>
                  <td className="p-3 sm:p-5 text-slate-400">Takes 3-5 days per creative</td>
                  <td className="p-3 sm:p-5 text-slate-400">Hours spent struggling with design</td>
                  <td className="p-3 sm:p-5 font-bold text-white bg-purple-900/20 border-l border-r border-purple-500/20">
                    Instant 1-Click Generation
                  </td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-5 font-semibold text-white">WhatsApp Review Automation</td>
                  <td className="p-3 sm:p-5 text-slate-400">Not included / Extra charge</td>
                  <td className="p-3 sm:p-5 text-slate-400">Awkward to ask manually</td>
                  <td className="p-3 sm:p-5 font-bold text-white bg-purple-900/20 border-l border-r border-purple-500/20">
                    100% Automated Workflow
                  </td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-5 font-semibold text-white">AI 24/7 Review Replies</td>
                  <td className="p-3 sm:p-5 text-slate-400">Delayed by days</td>
                  <td className="p-3 sm:p-5 text-slate-400">Ignored or forgotten</td>
                  <td className="p-3 sm:p-5 font-bold text-white bg-purple-900/20 border-l border-r border-purple-500/20">
                    Instant under 10 seconds
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </RevealOnScroll>
      </section>

      {/* ──────────────────────────────────────────
          LEAD CAPTURE / STRATEGY DEMO SECTION
      ────────────────────────────────────────── */}
      <section className="py-14 sm:py-24 px-4 container mx-auto max-w-5xl relative border-t border-white/10 overflow-hidden" id="lead-capture">
        <RevealOnScroll direction="up" delay={0.1}>
          <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-center w-full min-w-0">
            <div className="md:col-span-6 space-y-5 sm:space-y-6 min-w-0">
              <span className="inline-block text-xs font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20">
                Get Started In 2 Minutes
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Get Your Free <span className="text-gradient-brand">Google Maps Audit</span> & Demo
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Drop your details below. Our growth specialist will run a complimentary audit of your Google Maps presence and demonstrate how Dhanda Grow will automate your marketing.
              </p>

              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Complimentary Google Maps Competitor Analysis</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>3 Free Festival Creatives tailored with your logo</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Zero obligations • 100% free consultation</span>
                </li>
              </ul>
            </div>

            <div className="md:col-span-6 w-full min-w-0">
              <LeadForm />
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ──────────────────────────────────────────
          FINAL DOWNLOAD CTA
      ────────────────────────────────────────── */}
      <section className="py-14 sm:py-24 px-4 container mx-auto max-w-4xl text-center relative border-t border-white/10 overflow-hidden">
        <RevealOnScroll direction="up" delay={0.1}>
          <div className="space-y-6">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20">
              Start Today
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-white">
              Your Customers Are Searching on Google Maps Right Now. <br />
              <span className="text-gradient-brand">
                Will They Find You?
              </span>
            </h2>
            <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Join thousands of smart shop owners, restaurants, and doctors who dominate their local market with Dhanda Grow.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto h-14 px-8 rounded-full bg-gradient-brand hover:opacity-90 text-white font-bold text-lg shadow-2xl shadow-purple-600/40 hover:scale-105 transition-all"
              >
                <Link href="/contact" className="inline-flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Start Growing My Business</span>
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto h-14 px-8 rounded-full border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-lg hover:border-purple-400 transition-all"
              >
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  <span>Instant WhatsApp Help</span>
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 pt-6">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 text-xs font-bold transition-all hover:scale-105 inline-flex items-center gap-2.5 shadow-md"
              >
                <AppleLogo className="w-5 h-5 text-white shrink-0" />
                <span>Download on App Store</span>
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 text-xs font-bold transition-all hover:scale-105 inline-flex items-center gap-2.5 shadow-md"
              >
                <GooglePlayLogo className="w-5 h-5 shrink-0" />
                <span>Get it on Google Play</span>
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}
