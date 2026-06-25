import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  cacheComponents: true,
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000', // e.g., '3000', '8000', or '1337'
        pathname: '/api/images/*', // e.g., '/media/**', or '/**' for any path
      },
    ]
  }
};

export default nextConfig
