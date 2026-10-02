"use client";

import React from "react";
import Image from "next/image";
import {
  Sparkles,
  MapPin,
  Share2,
  Star,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Smartphone,
  ShieldCheck,
  Zap,
  Download,
  QrCode,
  ThumbsUp,
} from "lucide-react";
import { AppleLogo, GooglePlayLogo } from "@/components/ui/BrandIcons";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { APP_STORE_URL, PLAY_STORE_URL, WHATSAPP_LINK } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/ui/ParallaxSection";

const appReviews = [
  {
    name: "Vikram Malhotra",
    role: "Owner, Malhotra Sweets & Bakery",
    location: "Jaipur, Rajasthan",
    rating: 5,
    source: "Google Play Store",
    comment:
      "Dhanda Grow completely replaced my expensive agency. Our Google Maps rank jumped to #1 in our market area, and we get Diwali & Rakhi posters made in literally 10 seconds right on my mobile.",
  },
  {
    name: "Dr. Ananya Sengupta",
    role: "Lead Dentist, Smile Dental Clinic",
    location: "Kolkata, WB",
    rating: 5,
    source: "Apple App Store",
    comment:
      "The WhatsApp review invite feature is magic. We gathered over 280 five-star Google reviews in 3 months with zero awkward conversations. Walk-in patient inquiries have doubled.",
  },
  {
    name: "Karan Oberoi",
    role: "Founder, Apex Unisex Salon & Spa",
    location: "Chandigarh",
    rating: 5,
    source: "Google Play Store",
    comment:
      "Super intuitive mobile app. Every morning I open Dhanda Grow, pick today's festival or offer banner, and share directly to my WhatsApp status. Footfall is consistently high.",
  },
];

const threeSteps = [
  {
    num: "01",
    title: "Download App & Connect Shop",
    desc: "Install on iOS or Android, enter your business name, and link your Google Business Profile in 60 seconds with zero paperwork.",
    badge: "Instant 60s Setup",
  },
  {
    num: "02",
    title: "Turn On AI Local Autopilot",
    desc: "Our AI immediately detects your missing local search keywords, schedules 365 days of festival banners, and configures review links.",
    badge: "Full Automation",
  },
  {
    num: "03",
    title: "Watch Local Walk-Ins Surge",
    desc: "Nearby customers discover your shop first on Google Maps, read authentic 5-star ratings, and walk into your physical location.",
    badge: "+148% Avg Footfall",
  },
];

export function ApplioFeatures() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* ──────────────────────────────────────────
          3-STEP APP ONBOARDING TOUR
      ────────────────────────────────────────── */}
      <RevealOnScroll direction="up" delay={0.1}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 mb-4">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Simple 3-Step Setup</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            How Dhanda Grow Works on Your Phone
          </h2>
          <p className="text-base sm:text-lg text-zinc-400">
            No desktop required. Manage your local shop growth entirely from your pocket.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16 md:mb-24">
          {threeSteps.map((step) => (
            <SpotlightCard key={step.num} className="p-8 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black font-mono text-zinc-600 group-hover:text-cyan-400 transition-colors">
                    {step.num}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 font-mono">
                    {step.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center text-xs font-semibold text-cyan-400">
                <span>Ready in App</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </div>
            </SpotlightCard>
          ))}
        </div>
      </RevealOnScroll>

      {/* ──────────────────────────────────────────
          APP STORE VERIFIED REVIEWS
      ────────────────────────────────────────── */}
      <RevealOnScroll direction="up" delay={0.15}>
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-300 mb-4">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Verified Merchant Stories</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Loved by 10,000+ Shop Owners
          </h2>
          <p className="text-base sm:text-lg text-zinc-400">
            See how Indian retail, clinic, restaurant, and salon owners grow their storefronts every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16 md:mb-24">
          {appReviews.map((rev, idx) => (
            <SpotlightCard key={idx} className="p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400">
                    {rev.source}
                  </span>
                </div>
                <p className="text-sm text-zinc-300 italic mb-6 leading-relaxed">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <div className="font-bold text-white text-sm">{rev.name}</div>
                <div className="text-xs text-zinc-400">{rev.role}</div>
                <div className="text-[11px] text-cyan-400 font-mono mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  <span>{rev.location}</span>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </RevealOnScroll>

      {/* ──────────────────────────────────────────
          DIRECT DOWNLOAD BANNER (APPLIO STYLE)
      ────────────────────────────────────────── */}
      <RevealOnScroll direction="up" delay={0.2}>
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 border border-white/20 bg-gradient-to-br from-[#12122b] via-[#0c0c1e] to-[#060612] shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/15 blur-3xl pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-600/15 blur-3xl pointer-events-none rounded-full" />

          <div className="relative z-10 flex flex-col md:grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                Get Started In 60 Seconds
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                Ready to Dominate Google Maps & Festival Marketing in Your Town?
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base max-w-xl">
                Download the Dhanda Grow app now for iOS and Android. Zero credit card needed. Enjoy instant Google profile analysis and 3 free festival creatives.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-black border border-white/20 text-white hover:border-violet-500/50 hover:scale-105 transition-all shadow-xl"
                >
                  <AppleLogo className="w-6 h-6 text-white" />
                  <div className="text-left">
                    <div className="text-[10px] text-zinc-400 uppercase font-mono">Download on the</div>
                    <div className="text-sm font-bold text-white">App Store</div>
                  </div>
                </a>

                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-black border border-white/20 text-white hover:border-cyan-500/50 hover:scale-105 transition-all shadow-xl"
                >
                  <GooglePlayLogo className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-[10px] text-zinc-400 uppercase font-mono">Get it on</div>
                    <div className="text-sm font-bold text-white">Google Play</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-center">
              <div className="p-6 rounded-2xl bg-black/80 border border-white/15 backdrop-blur-xl text-center shadow-2xl">
                <div className="w-32 h-32 mx-auto rounded-xl bg-white p-2 flex items-center justify-center mb-3">
                  <QrCode className="w-28 h-28 text-black" />
                </div>
                <div className="text-xs font-bold text-white">Scan with Camera</div>
                <div className="text-[11px] text-zinc-400">Instant App Download</div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
