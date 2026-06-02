import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Hostinger (and most non-Vercel Node hosts) don't run the Next.js image
    // optimizer (/_next/image), which silently breaks every next/image — logo
    // and remote images alike. Serving images unoptimized fixes that everywhere.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
