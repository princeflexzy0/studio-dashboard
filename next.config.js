/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better error detection
  reactStrictMode: true,
  
  // Optimize images
  images: {
    domains: [],
    formats: ['image/webp'],
  },
  
  // Enable SWC minification
  swcMinify: true,
  
  // Optimize production build
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Optimize CSS
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
