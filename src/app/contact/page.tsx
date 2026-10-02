import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SUPPORT_EMAIL, SUPPORT_PHONE, WHATSAPP_LINK, BRAND_NAME } from "@/lib/constants";
import { LeadForm } from "@/components/shared/LeadForm";
import { RevealOnScroll } from "@/components/ui/ParallaxSection";

import { BreadcrumbSchema } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
  title: "Contact Dhanda Grow — Start With AI Marketing for Your Local Business",
  description:
    "Get in touch with Dhanda Grow specialists in Jaipur, India. Schedule your free 1-on-1 demo for Google Maps ranking, AI posters, and automated review management.",
  alternates: {
    canonical: "https://dhandhagrow.com/contact",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://dhandhagrow.com/contact",
    siteName: "Dhanda Grow",
    title: "Contact Dhanda Grow — Start With AI Marketing for Your Local Business",
    description:
      "Get in touch with Dhanda Grow specialists in Jaipur, India. Schedule your free 1-on-1 demo for Google Maps ranking, AI posters, and automated review management.",
    images: [
      {
        url: "/images/dhanda-3d-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Dhanda Grow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Dhanda Grow — Start With AI Marketing for Your Local Business",
    description:
      "Get in touch with Dhanda Grow specialists in Jaipur, India. Schedule your free 1-on-1 demo for Google Maps ranking, AI posters, and automated review management.",
    images: ["/images/dhanda-3d-hero.jpg"],
  },
};

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://dhandhagrow.com/contact/#webpage",
    "name": "Contact Dhanda Grow",
    "url": "https://dhandhagrow.com/contact",
    "description":
      "Contact Dhanda Grow for local business AI marketing and Google Business Profile optimization assistance.",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "Dhanda Grow",
      "telephone": SUPPORT_PHONE,
      "email": SUPPORT_EMAIL,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Jaipur",
        "addressRegion": "Rajasthan",
        "addressCountry": "IN",
      },
      "url": "https://dhandhagrow.com",
    },
  };

  return (
    <div className="py-20 bg-background relative overflow-hidden">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Dedicated Support for Local Businesses</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Contact <span className="text-gradient">Dhanda Grow</span> Support
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you need onboarding assistance, Google Maps ranking guidance, or social media automation setup, our team is here for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Details */}
          <RevealOnScroll direction="up" delay={0.1}>
            <div className="space-y-8">
              <h2 className="text-2xl font-heading font-bold text-foreground">Get in Touch</h2>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <Card className="glass-card border-border hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-foreground">WhatsApp Chat</h3>
                    <p className="text-sm text-muted-foreground mb-2">Fastest response for instant queries.</p>
                    <a href={WHATSAPP_LINK} className="text-primary font-semibold hover:underline text-sm">
                      Chat with us →
                    </a>
                  </CardContent>
                </Card>

                <Card className="glass-card border-border hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <Phone className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-foreground">Direct Call</h3>
                    <p className="text-sm text-muted-foreground mb-2">Mon-Sat, 9:00 AM to 7:00 PM</p>
                    <a href={`tel:${SUPPORT_PHONE.replace(/\D/g, '')}`} className="text-primary font-semibold hover:underline text-sm">
                      {SUPPORT_PHONE}
                    </a>
                  </CardContent>
                </Card>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-border space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Email Support</h4>
                    <a href={`mailto:${SUPPORT_EMAIL}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {SUPPORT_EMAIL}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Corporate Location</h4>
                    <p className="text-muted-foreground">
                      Jaipur, Rajasthan, India
                    </p>
                  </div>
                </div>
              </div>

              {/* What we help with */}
              <div className="glass-card p-6 rounded-2xl border border-border">
                <h3 className="font-heading font-semibold text-foreground mb-4">What we help with:</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>Onboarding assistance:</strong> Connect your Google Business Profile & social channels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>Google Maps ranking:</strong> Profile audit and local SEO optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>Social media automation:</strong> Daily posters, festival banners & auto-scheduling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>Review management:</strong> Automated WhatsApp review collection & AI replies</span>
                  </li>
                </ul>
              </div>
            </div>
          </RevealOnScroll>

          {/* Contact Form */}
          <RevealOnScroll direction="up" delay={0.2}>
            <div className="glass-card rounded-3xl shadow-xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border bg-muted/40">
                <h3 className="text-center font-heading font-semibold text-base text-foreground">Request a Free Demo / Support</h3>
                <p className="text-center text-xs text-muted-foreground mt-1">Leave your details and our team will get back to you within 2 business hours.</p>
              </div>
              <div className="p-4 md:p-6">
                <LeadForm />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
}
