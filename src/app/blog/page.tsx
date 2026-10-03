import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getPostCoverImage } from "@/lib/blog-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Sparkles, User, ArrowRight } from "lucide-react";
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

export const revalidate = 60; // Refresh quickly when new posts are published

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

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

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>Growth Knowledge Hub</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4">
            Insights &amp; Guides for <span className="text-gradient">Local Businesses</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Practical strategies, step-by-step checklists, and industry playbooks to help you win on Google Maps and drive foot traffic.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post, idx) => {
            const coverImg = getPostCoverImage(post.cover_image_url, post.slug || idx);
            const author = post.author || "Dhanda Grow Team";

            return (
              <RevealOnScroll key={post.slug} delay={idx * 0.05} direction="up">
                <Link href={`/blog/${post.slug}`} className="block group h-full">
                  <Card className="glass-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-950/40 hover:-translate-y-1.5 h-full flex flex-col overflow-hidden">
                    <div className="relative aspect-video w-full overflow-hidden bg-gray-900 shrink-0">
                      <Image
                        src={coverImg}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 550px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
                      {post.tags && post.tags[0] && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/75 backdrop-blur-md text-purple-300 border border-purple-500/30">
                          #{post.tags[0]}
                        </span>
                      )}
                    </div>

                    <CardHeader className="p-6 pb-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <div className="flex items-center gap-1.5 text-primary font-medium">
                          <CalendarIcon className="w-3.5 h-3.5" />
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </time>
                        </div>
                        <div className="flex items-center gap-1 text-slate-400">
                          <User className="w-3 h-3 text-purple-400" />
                          <span>{author}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl sm:text-2xl font-heading text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-2 flex-1 flex flex-col justify-between">
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>

                      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                        <div className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold group-hover:translate-x-1 transition-transform">
                          <span>Read full guide</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </RevealOnScroll>
            );
          })}
          {posts.length === 0 && (
            <p className="text-muted-foreground text-center py-12 col-span-2">No blog posts found yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
