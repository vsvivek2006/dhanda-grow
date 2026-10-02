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
};

export default nextConfig;
