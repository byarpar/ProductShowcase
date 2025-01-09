/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
    unoptimized: true, // Add this to prevent caching issues
  },
  experimental: {
    serverActions: true
  }
}

module.exports = nextConfig

