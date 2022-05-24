const withPWA = require('next-pwa')

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'storage.googleapis.com'],
  },
  pwa: {
    dest: 'public'
  }
});

module.exports = nextConfig
