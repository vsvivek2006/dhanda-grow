import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "GST Registration Blog & Guides | GetGSTFast",
  description: "Read our latest guides, tips, and updates about GST registration, return filing, and compliance for small businesses in India.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="py-20 bg-background min-h-screen">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-navy mb-4">
          GST Learning Center
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Everything you need to know about GST registration, rules, and compliance in India.
        </p>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <Card className="border-border hover:border-brand-blue transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <CalendarIcon className="w-4 h-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  <CardTitle className="text-2xl font-heading text-navy group-hover:text-brand-blue transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
          {posts.length === 0 && (
            <p className="text-muted-foreground">No blog posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
