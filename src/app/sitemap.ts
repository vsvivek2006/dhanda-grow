import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog-utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://getgstfast.com';

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/pricing',
    '/gst-registration',
    '/gst-registration-documents-required',
    '/blog',
    '/privacy-policy',
    '/terms-and-conditions',
    '/refund-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' || route === '/gst-registration' ? 1 : 0.8,
  }));

  // Add blog posts to sitemap
  const posts = getAllPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
