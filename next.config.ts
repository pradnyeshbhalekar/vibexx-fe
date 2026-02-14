import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://vibexx-be.onrender.com/api/:path*",
      },
      {
        source: "/login",
        destination: "https://vibexx-be.onrender.com/login",
      },
      {
        source: "/callback",
        destination: "https://vibexx-be.onrender.com/callback",
      },
    ];
  },
};

export default nextConfig;