import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/blog-utils";
import ReactMarkdown from "react-markdown";
import { CalendarIcon, ChevronLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BRAND_NAME } from "@/lib/constants";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | ${BRAND_NAME}`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-muted/30 border-b border-border py-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto max-w-3xl px-4 relative z-10">
          <Link href="/blog" className="inline-flex items-center text-sm font-semibold text-primary hover:underline mb-6">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Guides & Articles
          </Link>
          <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
            <CalendarIcon className="w-4 h-4 text-primary" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-16">
        <article className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 leading-relaxed [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_p]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_hr]:my-10 [&_hr]:border-border">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

        {/* CTA Banner */}
        <div className="mt-20 glass-card border border-primary/30 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Grow Your Local Presence</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-foreground mb-4">
            Ready to rank higher on Google Maps & automate your marketing?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join local shop owners, restaurants, and service businesses who save 10+ hours every week with Dhanda Grow.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white h-14 px-8 text-lg rounded-full shadow-xl shadow-primary/25" asChild>
            <Link href="/contact">Get Free Demo & Strategy Session</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
