import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Share2,
  Star,
  LayoutDashboard,
  Zap,
  Sparkles,
  CheckCircle2,
  Calendar,
  MessageCircle,
  TrendingUp,
  BarChart3,
  Bot,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { BRAND_NAME, WHATSAPP_LINK } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Services & AI Marketing Capabilities | ${BRAND_NAME}`,
  description: "Explore Dhanda Grow capabilities: Google Maps ranking optimization, 1-click social media poster generation, WhatsApp review automation, and 24/7 AI review responses.",
};

const capabilities = [
  {
    tag: "Local SEO",
    title: "Google Maps Optimization & Local SEO",
    icon: MapPin,
    color: "from-purple-500 to-indigo-500",
    description:
      "When nearby customers search for what you sell, being in the top 3 on Google Maps means receiving 70% of all local calls and foot traffic. We optimize your listing continuously to outrank nearby competitors.",
    features: [
      "Real-time 100-point Google Business Profile health score",
      "Local competitor radar across all neighborhood pins",
      "Automatic detection of trending local buyer search keywords",
      "Live tracking of direction requests, website clicks, and phone calls",
    ],
  },
  {
    tag: "Social Media",
    title: "Autopilot Social Media Studio",
    icon: Share2,
    color: "from-cyan-500 to-blue-500",
    description:
      "Never worry about what to post again. Our AI generates stunning daily promotional graphics, festive greetings, and engaging captions branded with your logo, contact number, and address.",
    features: [
      "1-Click cross-posting to Facebook & Instagram simultaneously",
      "Pre-designed festival & seasonal banners for all Indian holidays",
      "Captions & hashtags generated in both English and regional tones",
      "Automated brand watermarking with your logo and phone number",
    ],
  },
  {
    tag: "Reputation",
    title: "Automated WhatsApp 5-Star Review Engine",
    icon: Star,
    color: "from-emerald-500 to-teal-500",
    description:
      "Customer reviews make or break local purchasing decisions. Dhanda Grow automatically sends polite 1-click review invites to satisfied customers over WhatsApp and replies to every review with AI.",
    features: [
      "Automated WhatsApp review request messages after purchase or visit",
      "24/7 instant AI responses to all positive reviews in under 10 seconds",
      "Negative feedback interceptor to resolve complaints privately",
      "Direct Google review link generation to remove friction for customers",
    ],
  },
  {
    tag: "Analytics",
    title: "Unified Merchant Growth Dashboard",
    icon: LayoutDashboard,
    color: "from-pink-500 to-rose-500",
    description:
      "Stop juggling multiple complicated marketing apps. Manage your Google Maps rankings, upcoming scheduled social posts, and customer reviews from a single unified control center.",
    features: [
      "Consolidated performance metrics visible at a glance",
      "Simple weekly growth checklists tailored to your industry",
      "Customer sentiment analysis and satisfaction tracking",
      "Mobile app access for iOS and Android on the go",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#04040f] text-slate-100 font-sans relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-glow rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 container mx-auto max-w-5xl text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs md:text-sm font-semibold mb-6">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Complete Marketing Autopilot for Local Retail & Services</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
          Everything You Need to <br />
          <span className="text-gradient-brand">
            Get Found, Get Reviewed & Get Customers
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
          Dhanda Grow takes the tedious, time-consuming marketing tasks off your plate. Our AI handles your Google Maps ranking, daily social media posts, and review management so you can focus on running your business.
        </p>
      </section>

      {/* Capabilities Deep-Dive Grid */}
      <section className="py-12 px-4 container mx-auto max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="glass-card rounded-3xl p-8 border border-white/10 hover:border-purple-500/40 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  {item.features.map((feat, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Workflow Steps */}
      <section className="py-24 px-4 container mx-auto max-w-6xl relative z-10 border-t border-white/10 mt-12">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20">
            Simple 3-Step Setup
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-white">
            How Dhanda Grow Works for You
          </h2>
          <p className="text-slate-300 text-base md:text-lg">
            No complex tech setup, no expensive consultants. You're up and running in 2 minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-3xl border border-white/10 relative text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-gradient-brand text-white font-black text-xl flex items-center justify-center mx-auto shadow-lg shadow-purple-600/30">
              1
            </div>
            <h3 className="font-heading text-xl font-bold text-white">Connect Your Profiles</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Link your Google Business Profile and social media accounts in 1-click. Our AI immediately audits your visibility.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-white/10 relative text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-gradient-brand text-white font-black text-xl flex items-center justify-center mx-auto shadow-lg shadow-purple-600/30">
              2
            </div>
            <h3 className="font-heading text-xl font-bold text-white">AI Takes Over Marketing</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Daily posts are scheduled, Google Maps keywords are optimized, and WhatsApp review requests are dispatched automatically.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-white/10 relative text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-gradient-brand text-white font-black text-xl flex items-center justify-center mx-auto shadow-lg shadow-purple-600/30">
              3
            </div>
            <h3 className="font-heading text-xl font-bold text-white">Watch Your Foot Traffic Grow</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Gain top Google Maps ranks, attract consistent customer calls, and collect a steady stream of authenticated 5-star reviews.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 container mx-auto max-w-4xl text-center relative z-10 border-t border-white/10">
        <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-white mb-6">
          Ready to Put Your Marketing on Autopilot?
        </h2>
        <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of local business owners who save 10+ hours every week and dominate their neighborhood market.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            asChild
            className="bg-gradient-brand hover:opacity-90 text-white font-bold text-lg h-14 px-8 rounded-full shadow-2xl shadow-purple-600/40 hover:scale-105 transition-all"
          >
            <Link href="/contact" className="inline-flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>Get Free Demo & Setup</span>
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-lg h-14 px-8 rounded-full"
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>Talk to Specialist</span>
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
