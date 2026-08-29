import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: {
    "/**": ["./src/lib/email/assets/icon.png", "./public/icon.png"],
  },
};

export default nextConfig;
