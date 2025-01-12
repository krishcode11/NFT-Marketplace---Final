/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable SWC minification
  swcMinify: true,

  // Optimize images
  images: {
    domains: ['ipfs.io', 'ipfs.infura.io'],
    unoptimized: process.env.NODE_ENV !== 'production',
  },

  // Experimental features for better performance
  experimental: {
    // Enable optimizations
    optimizeCss: true,
    optimizePackageImports: ['@web3modal', '@tanstack/react-query', 'framer-motion'],
  },

  // Disable source maps in production
  productionBrowserSourceMaps: false,
};

export default nextConfig;
