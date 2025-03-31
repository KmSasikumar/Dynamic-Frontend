// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'vit-tm-task.api.trademarkia.app', // For API image URLs
      'via.placeholder.com', // For placeholder images (if used)
      'localhost' // For local development
    ],
  },
  // Enable TypeScript for Next.js configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  // Webpack configuration (optional)
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;