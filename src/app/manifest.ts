import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dhanda Grow — AI Marketing for Local Businesses',
    short_name: 'Dhanda Grow',
    description:
      'AI marketing platform for local businesses. Dominate Google Maps rankings, automate daily social media posts, and collect 5-star customer reviews.',
    start_url: '/',
    display: 'standalone',
    background_color: '#04040f',
    theme_color: '#04040f',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  };
}
