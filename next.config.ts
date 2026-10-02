import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ezobooks.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dhandhagrow.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dhanda.app",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/admin/login",
        destination: "/login",
      },
      {
        source: "/signin",
        destination: "/login",
      },
      {
        source: "/admin-login",
        destination: "/login",
      },
    ];
  },
};

export default nextConfig;
