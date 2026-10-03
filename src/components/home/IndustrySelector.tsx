"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Utensils,
  Store,
  Scissors,
  Stethoscope,
  Dumbbell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThreeDCard } from "@/components/ui/ThreeDCard";
import { RevealOnScroll } from "@/components/ui/ParallaxSection";

const industries = {
  restaurants: {
    tabLabel: "Restaurants & Cafes",
    title: "Restaurants, Cafes & Bakeries",
    icon: Utensils,
    mapsKeyword: "Best Biryani & Chinese near me",
    rankChange: "#8 → #1 on Google Maps",
    postIdea: "Weekend Special: Buy 1 Chef's Special Pizza & Get Garlic Bread Free! 🍕",
    reviewMsg: "Thank you for dining at Spice Hub! Please rate your experience on Google ⭐",
    benefit: "Fill tables on slow weekdays with automated festival and weekend promo posts.",
  },
  retail: {
    tabLabel: "Retail & Stores",
    title: "Clothing, Electronics & Retail Stores",
    icon: Store,
    mapsKeyword: "Designer Kurti & Sarees near me",
    rankChange: "#14 → #2 on Google Maps",
    postIdea: "Festive Clearance Sale: Flat 40% OFF on all new arrivals this weekend only! ✨",
    reviewMsg: "Thank you for shopping at Royal Fashion! Tap here to share a 5★ review on Google.",
    benefit: "Drives foot traffic into your physical storefront instead of losing buyers online.",
  },
  salons: {
    tabLabel: "Salons & Spas",
    title: "Salons, Parlours & Spas",
    icon: Scissors,
    mapsKeyword: "Best Bridal Makeup & Hair Spa near me",
    rankChange: "#11 → #1 on Google Maps",
    postIdea: "Pre-Wedding Glow Package: HydraFacial + Hair Botox at flat ₹1,999! 💇‍♀️",
    reviewMsg: "Loved your makeover at Glamour Studio? Rate us on Google and get 10% off next visit!",
    benefit: "Keeps appointment books full with seasonal makeover banners and viral reels ideas.",
  },
  clinics: {
    tabLabel: "Clinics & Doctors",
    title: "Dental, Clinics & Health Centers",
    icon: Stethoscope,
    mapsKeyword: "Dentist & Dental Implant Clinic near me",
    rankChange: "#9 → #1 on Google Maps",
    postIdea: "Painless Dental Consultation & Scaling Week: Prioritize your oral health today! 🦷",
    reviewMsg: "We care for your health! Please share your experience with Dr. Sharma on Google.",
    benefit: "Builds unshakeable patient trust with authenticated 5-star Google ratings.",
  },
  gyms: {
    tabLabel: "Gyms & Fitness",
    title: "Gyms, Crossfit & Fitness Studios",
    icon: Dumbbell,
    mapsKeyword: "Best Unisex Gym & Personal Trainer near me",
    rankChange: "#12 → #2 on Google Maps",
    postIdea: "Transform in 90 Days: New Year Fitness Batch opening with 30% early bird discount! 💪",
    reviewMsg: "Crushed your workout at Iron Fitness? Drop us a 5-star review on Google!",
    benefit: "Converts seasonal inquiries into year-long memberships with targeted social creatives.",
  },
};

export function IndustrySelector() {
  const [activeTab, setActiveTab] = useState<keyof typeof industries>("restaurants");

  return (
    <section className="py-14 sm:py-24 px-4 container mx-auto max-w-7xl relative border-t border-white/10 overflow-hidden">
      <RevealOnScroll direction="up" delay={0.1}>
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20">
            Tailored For You
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight">
            Built for Every Local Business Category
          </h2>
          <p className="text-base md:text-lg text-slate-300">
            Select your category to see how Dhanda Grow automates your growth from day one.
          </p>

          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {(Object.keys(industries) as (keyof typeof industries)[]).map((key) => {
              const item = industries[key];
              const Icon = item.icon;
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-brand text-white shadow-lg shadow-purple-600/30 scale-105"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll direction="up" delay={0.15}>
        <ThreeDCard depth={15} glowColor="rgba(124, 58, 237, 0.35)">
          <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 md:p-10 border border-purple-500/30 bg-gradient-to-b from-[#0f0f35] to-[#08081c] shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" /> Custom Industry Workflow
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white">
                  {industries[activeTab].title}
                </h3>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                  {industries[activeTab].benefit}
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Rank Radar:</strong> {industries[activeTab].rankChange}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Target Search:</strong> &quot;{industries[activeTab].mapsKeyword}&quot;</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button asChild className="bg-gradient-brand text-white rounded-full px-6 py-2">
                    <Link href="/contact" className="inline-flex items-center gap-2">
                      <span>Activate for My Business</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="space-y-3 p-5 rounded-2xl bg-black/40 border border-white/10">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Automated Creative Post
                </div>
                <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white font-medium text-xs leading-relaxed">
                  &quot;{industries[activeTab].postIdea}&quot;
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider pt-2">
                  WhatsApp Review Message
                </div>
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-slate-200 text-xs leading-relaxed">
                  &quot;{industries[activeTab].reviewMsg}&quot;
                </div>
              </div>
            </div>
          </div>
        </ThreeDCard>
      </RevealOnScroll>
    </section>
  );
}
