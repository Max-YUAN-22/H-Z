import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/H-Z',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
