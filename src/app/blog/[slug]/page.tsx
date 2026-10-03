import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/blog-utils";
import { Calendar, User, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BRAND_NAME } from "@/lib/constants";
import { BreadcrumbSchema, ArticleSchema } from "@/components/seo/JsonLdSchemas";
import { cleanHtml, normalizeContentToHtml } from "@/lib/ai/contentFormatter";

export const revalidate = 3600; // Cache and revalidate every hour for high-speed TTFB

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return { title: "Post Not Found" };
  }

  const postUrl = `https://dhandhagrow.com/blog/${post.slug}`;
  const title = `${post.title} | ${BRAND_NAME}`;
  const authorName = post.author || "Dhanda Grow Team";
  const coverImage = post.cover_image_url || "/images/dhanda-3d-hero.jpg";

  return {
    title,
    description: post.excerpt,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: "article",
      locale: "en_IN",
      url: postUrl,
      siteName: "Dhanda Grow",
      title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [authorName],
      images: [
        {
          url: coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
      images: [coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  let sanitizedContent = "";
  try {
    const isHtml = /<[a-z][\s\S]*>/i.test(post.content || "");
    const normalized = isHtml ? post.content : normalizeContentToHtml(post.content || "");
    sanitizedContent = cleanHtml(normalized || "");
  } catch (sanitizeErr) {
    console.error("Content sanitization error:", sanitizeErr);
    sanitizedContent = "<p>Content could not be displayed safely.</p>";
  }

  const authorName = post.author || "Dhanda Grow Team";

  return (
    <article className="min-h-screen bg-gray-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        datePublished={post.date}
        url={`https://dhandhagrow.com/blog/${post.slug}`}
      />

      {/* Article Hero Header (Growth-Service Parity) */}
      <header className="bg-gradient-to-br from-gray-900 via-purple-950/80 to-indigo-950 py-16 sm:py-24 px-6 relative overflow-hidden border-b border-purple-900/30">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-950/90 text-purple-300 border border-purple-700/50"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            {post.title}
          </h1>

          {/* Byline & Metadata */}
          <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-purple-200/90 border-t border-purple-800/40">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-900/80 border border-purple-600/40 flex items-center justify-center text-yellow-400">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-purple-300/70 block">Author</span>
                <span className="font-semibold text-white">
                  {authorName}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-900/80 border border-purple-600/40 flex items-center justify-center text-purple-300">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-purple-300/70 block">Published</span>
                <span className="font-medium text-white">
                  {new Date(post.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Post Container */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12">
        {/* Cover Image */}
        {post.cover_image_url && (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-purple-900/40 mb-12 shadow-2xl shadow-purple-950/50 bg-gray-900">
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
        )}

        {/* Post HTML Content (Sanitized & Styled with Growth-Service article-content Hierarchy) */}
        <div
          className="article-content max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />

        {/* Share & Tags Bottom Row */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-purple-900/30 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                Topics:
              </span>
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-900 border border-purple-900/50 text-purple-300"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <Link
              href="/blog"
              className="text-xs font-semibold text-yellow-400 hover:underline flex items-center gap-1"
            >
              ← Back to all articles
            </Link>
          </div>
        )}

        {/* Bottom CTA Banner (Growth-Service Parity) */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-gray-900 via-purple-950/60 to-indigo-950 border border-purple-800/40 text-center space-y-6 shadow-2xl shadow-black/50">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/50 text-purple-300 text-xs font-semibold border border-purple-700/50 mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>Grow Your Local Presence</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to rank higher on Google Maps &amp; automate your marketing?
          </h2>
          <p className="text-sm sm:text-base text-purple-200/90 max-w-xl mx-auto leading-relaxed">
            Join local shop owners, restaurants, and service businesses who save 10+ hours every week with Dhanda Grow.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xl shadow-purple-900/50 transition-all text-sm"
            >
              Get Free Demo &amp; Strategy Session
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
