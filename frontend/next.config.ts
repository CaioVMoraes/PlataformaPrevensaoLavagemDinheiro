import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  outputFileTracingRoot: process.cwd(),
  reactStrictMode: true,
  trailingSlash: true,
};

export default nextConfig;
