import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ['@powerpay/shared', '@powerpay/ui'],
};

export default nextConfig;
