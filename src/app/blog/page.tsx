import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Sparkles } from "lucide-react";
import { BRAND_NAME } from "@/lib/constants";
import { RevealOnScroll } from "@/components/ui/ParallaxSection";

import { BreadcrumbSchema } from "@/components/seo/JsonLdSchemas";

export const metadata: Metadata = {
  title: "AI Marketing for Local Business — Insights & Guides | Dhanda Grow Blog",
  description:
    "Explore practical guides, local SEO tutorials, and marketing automation playbooks designed to help Indian shops and service businesses grow foot traffic.",
  alternates: {
    canonical: "https://dhandhagrow.com/blog",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://dhandhagrow.com/blog",
    siteName: "Dhanda Grow",
    title: "AI Marketing for Local Business — Insights & Guides | Dhanda Grow Blog",
    description:
      "Explore practical guides, local SEO tutorials, and marketing automation playbooks designed to help Indian shops and service businesses grow foot traffic.",
    images: [
      {
        url: "/images/dhanda-3d-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Dhanda Grow Blog & Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Marketing for Local Business — Insights & Guides | Dhanda Grow Blog",
    description:
      "Explore practical guides, local SEO tutorials, and marketing automation playbooks designed to help Indian shops and service businesses grow foot traffic.",
    images: ["/images/dhanda-3d-hero.jpg"],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="py-20 bg-background min-h-screen relative overflow-hidden">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ]}
      />
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Growth Knowledge Hub</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4">
            Insights & Guides for <span className="text-gradient">Local Businesses</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Practical strategies, step-by-step checklists, and industry insights to help you get more local foot traffic and sales.
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post, idx) => (
            <RevealOnScroll key={post.slug} delay={idx * 0.1} direction="up">
              <Link href={`/blog/${post.slug}`} className="block group">
                <Card className="glass-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-primary font-medium mb-2">
                      <CalendarIcon className="w-4 h-4" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                    <CardTitle className="text-2xl font-heading text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 inline-flex items-center text-primary text-sm font-semibold group-hover:translate-x-1 transition-transform">
                      Read article →
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </RevealOnScroll>
          ))}
          {posts.length === 0 && (
            <p className="text-muted-foreground text-center py-12">No blog posts found yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
