import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BRAND_NAME, WHATSAPP_LINK } from "@/lib/constants";
import { RevealOnScroll } from "@/components/ui/ParallaxSection";

import { BreadcrumbSchema, FAQSchema } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
  title: "AI Marketing for Local Business FAQs | Dhanda Grow",
  description:
    "Find clear answers on automated Google Maps SEO, WhatsApp 5-star reviews, AI festive social creatives, and setup with Dhanda Grow.",
  alternates: {
    canonical: "https://dhandhagrow.com/faq",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://dhandhagrow.com/faq",
    siteName: "Dhanda Grow",
    title: "AI Marketing for Local Business FAQs | Dhanda Grow",
    description:
      "Find clear answers on automated Google Maps SEO, WhatsApp 5-star reviews, AI festive social creatives, and setup with Dhanda Grow.",
    images: [
      {
        url: "/images/dhanda-3d-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Dhanda Grow FAQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Marketing for Local Business FAQs | Dhanda Grow",
    description:
      "Find clear answers on automated Google Maps SEO, WhatsApp 5-star reviews, AI festive social creatives, and setup with Dhanda Grow.",
    images: ["/images/dhanda-3d-hero.jpg"],
  },
};

const faqs = [
  {
    question: "What exactly is Dhanda Grow?",
    answer:
      "Dhanda Grow (by Ezo Technologies) is an AI-driven digital marketing platform built specifically for Indian local businesses. It automates Google Maps local SEO, generates and schedules daily social media creatives (including festival posts), and helps you gather and respond to 5-star Google reviews on complete autopilot."
  },
  {
    question: "Do I need design or technical skills to use Dhanda Grow?",
    answer:
      "Not at all. Dhanda Grow is designed specifically for busy shop owners, doctors, and restaurant managers. Social media posters are ready in 1-click with your logo already attached, review requests are automated via WhatsApp, and AI drafts thoughtful responses."
  },
  {
    question: "How does Dhanda Grow boost my Google Maps ranking?",
    answer:
      "Google's algorithm prioritizes businesses with complete profiles, fresh photo uploads, high review velocity, and consistent local citations. Dhanda Grow continuously audits your profile, alerts you to gaps, prompts regular review collection, and aligns your categories with trending search terms."
  },
  {
    question: "How does the WhatsApp review collection work?",
    answer:
      "After a customer transaction or visit, Dhanda Grow sends an automated, polite WhatsApp message thanking them and providing a 1-tap direct link to your Google review page. Because WhatsApp has high open rates in India, customers are much more likely to leave a positive rating."
  },
  {
    question: "Does it support regional festivals and Hindi captions?",
    answer:
      "Yes! Our AI creative studio understands Indian festive calendars—Diwali, Eid, Holi, Navratri, Republic Day, and regional occasions. It automatically generates attractive banners and writes engaging captions in conversational English, Hindi, and Hinglish."
  },
  {
    question: "Can I connect both Instagram and Facebook?",
    answer:
      "Yes. You can link your official Facebook page and Instagram business account. When a creative is approved, Dhanda Grow publishes it across both platforms simultaneously in seconds."
  },
  {
    question: "Is my Google Business Profile and customer data safe?",
    answer:
      "Absolutely. We use official Google Business Profile APIs and Meta Graph APIs with enterprise-level encryption. We never access your personal credentials and never sell your customer contact data to third parties."
  },
  {
    question: "How do I get started?",
    answer:
      "You can get started completely free! Simply click 'Start Free Now' to book a 2-minute walkthrough demo with our growth specialist, or download our mobile app on the App Store or Google Play."
  }
];

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#04040f] text-slate-100 font-sans relative overflow-hidden">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "FAQ", url: "/faq" },
        ]}
      />
      <FAQSchema faqs={faqs} />
      {/* Glow Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-glow rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 px-4 container mx-auto max-w-4xl text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs md:text-sm font-semibold mb-6">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Everything You Need to Know</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
          Frequently Asked <span className="text-gradient-brand">Questions</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Clear answers on how Dhanda Grow puts local SEO, social media, and customer reviews on autopilot for your business.
        </p>
      </section>

      {/* FAQ Accordion */}
      <section className="py-8 px-4 container mx-auto max-w-3xl relative z-10">
        <RevealOnScroll direction="up" delay={0.1}>
          <div className="glass-card rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl bg-[#09091f]">
            <Accordion className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-white/10 bg-white/5 rounded-2xl px-4 sm:px-6 data-[state=open]:border-purple-500/50 data-[state=open]:bg-purple-950/20 transition-all"
                >
                  <AccordionTrigger className="text-left font-bold text-base md:text-lg text-white py-5 hover:no-underline hover:text-purple-300 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-300 text-sm md:text-base leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </RevealOnScroll>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 container mx-auto max-w-4xl text-center relative z-10 border-t border-white/10 mt-16">
        <RevealOnScroll direction="up" delay={0.15}>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-white mb-6">
            Still Have Questions?
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Chat with our growth specialists directly on WhatsApp or book a free 5-minute product walkthrough.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              asChild
              className="bg-gradient-brand hover:opacity-90 text-white font-bold text-lg h-14 px-8 rounded-full shadow-2xl shadow-purple-600/40 hover:scale-105 transition-all"
            >
              <Link href="/contact" className="inline-flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span>Book Free Strategy Demo</span>
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
                <span>Ask on WhatsApp</span>
              </a>
            </Button>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}
