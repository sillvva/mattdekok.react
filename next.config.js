const withPWA = require('next-pwa')

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'storage.googleapis.com'],
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public'
  }
});

module.exports = nextConfig
