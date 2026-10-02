import type { Metadata } from "next";
import { BRAND_NAME, SUPPORT_PHONE, WHATSAPP_LINK } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Bot, MessageCircle, MapPin, Building, Target, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/ParallaxSection";

export const metadata: Metadata = {
  title: `About Us | ${BRAND_NAME} by Ezo Technologies`,
  description: "Dhanda Grow is an AI-powered digital marketing platform built by Ezo Technologies to help local businesses automate Google Maps rankings, social media, and customer reviews.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#04040f] text-slate-100 font-sans relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-glow rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 container mx-auto max-w-4xl text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs md:text-sm font-semibold mb-6">
          <Building className="w-4 h-4 text-cyan-400" />
          <span>Built by Ezo Technologies</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
          Automating Marketing for <br />
          <span className="text-gradient-brand">
            India's Local Businesses
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Dhanda Grow empowers retail shops, restaurants, salons, and local services to dominate Google Maps and social media without hiring costly agencies.
        </p>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 container mx-auto max-w-5xl relative z-10">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          {/* Left Content */}
          <div className="md:col-span-8 space-y-8">
            <RevealOnScroll direction="up" delay={0.1}>
              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 bg-[#0a0a22]">
                <h2 className="font-heading text-2xl font-bold text-white flex items-center gap-3">
                  <Target className="w-6 h-6 text-purple-400" />
                  <span>Our Mission</span>
                </h2>
                <p className="text-slate-300 leading-relaxed text-base">
                  Local business owners are the true backbone of our economy. You manage inventory, serve customers with care, and work long hours. But in today's digital world, if you aren't visible in the Google Maps top 3 or active on social media, you lose customers to competitors who simply look bigger online.
                </p>
                <p className="text-slate-300 leading-relaxed text-base">
                  Our mission is to give every local business owner the marketing power of a full-scale corporate agency—automated, instantaneous, and at a fraction of the cost.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={0.15}>
              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 bg-[#0a0a22]">
                <h2 className="font-heading text-2xl font-bold text-white flex items-center gap-3">
                  <Bot className="w-6 h-6 text-cyan-400" />
                  <span>The Dhanda Grow Difference</span>
                </h2>
                <p className="text-slate-300 leading-relaxed text-base">
                  We believe software should save you time, not create a second job. Dhanda Grow does not require design expertise or complex marketing jargon. Everything from festival posters to Google review replies happens in 1-click or completely in the background.
                </p>
                <p className="text-slate-300 leading-relaxed text-base">
                  Quietly, consistently, and reliably, Dhanda Grow works 24/7 to turn online searches into foot traffic at your doorstep.
                </p>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Sidebar */}
          <div className="md:col-span-4 space-y-6 md:sticky md:top-28">
            <RevealOnScroll direction="up" delay={0.2}>
              <div className="glass-card rounded-3xl p-6 border border-white/10 bg-[#0c0c28]">
                <h4 className="font-heading font-bold text-base text-white mb-4">Core Capabilities</h4>
                <ul className="space-y-3 text-sm text-slate-300">
                  {[
                    "Google Maps Local SEO Optimization",
                    "AI Social Media Posters & Banners",
                    "Automated WhatsApp Review Requests",
                    "24/7 Instant AI Review Responses",
                    "Indian Festival Campaign Engine",
                    "Available on Web, iOS & Android"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={0.25}>
              <div className="glass-card rounded-3xl p-6 border border-white/10 bg-[#0c0c28]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-purple-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">Corporate Office</h4>
                    <address className="not-italic text-xs text-slate-400 leading-relaxed">
                      Ezo Technologies Pvt Ltd<br />
                      Millennium Business Park, Mahape<br />
                      Navi Mumbai, Maharashtra — 400710
                    </address>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 container mx-auto max-w-4xl text-center relative z-10 border-t border-white/10 mt-16">
        <RevealOnScroll direction="up" delay={0.1}>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Let Dhanda Grow handle your Google Maps and social media marketing. Start today completely free.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              asChild
              className="bg-gradient-brand hover:opacity-90 text-white font-bold text-lg h-14 px-8 rounded-full shadow-2xl shadow-purple-600/40 hover:scale-105 transition-all"
            >
              <Link href="/contact" className="inline-flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span>Get Started Free</span>
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
                <span>Chat on WhatsApp</span>
              </a>
            </Button>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}
