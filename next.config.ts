import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  cacheComponents: true,
  images: {
    qualities: [75, 100],
    // remotePatterns have no effect in production
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/images/*',
      },
    ]
  }
};

export default nextConfig
