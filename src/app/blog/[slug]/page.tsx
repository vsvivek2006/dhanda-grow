import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/blog-utils";
import ReactMarkdown from "react-markdown";
import { CalendarIcon, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SERVICE_PRICE } from "@/lib/constants";

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
    title: `${post.title} | GetGSTFast`,
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
      <div className="bg-slate-50 border-b border-border py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-brand-blue hover:underline mb-6">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Blog
          </Link>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-navy mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarIcon className="w-4 h-4" />
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

      <div className="container mx-auto max-w-3xl px-4 py-12">
        <div className="prose prose-lg md:prose-xl prose-slate max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <div className="mt-16 bg-navy text-white rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">Need help with your GST Registration?</h2>
          <p className="text-blue-100 mb-8">
            Don't let compliance hold you back. Get your GSTIN quickly and affordably. Government fee is ₹0, and we only charge a flat {SERVICE_PRICE} service fee.
          </p>
          <Button size="lg" className="bg-primary hover:bg-cta-hover h-14 px-8 text-lg" asChild>
            <Link href="/gst-registration">Get Started Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
