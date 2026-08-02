import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/**": ["./public/brand/zentra-logo-gold.png"],
  },
};

export default nextConfig;
