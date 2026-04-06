/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.yahoo.com' },
      { protocol: 'https', hostname: '**.yimg.com' },
    ],
  },
  env: {
    NEXT_PUBLIC_URL: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000',
  },
}

export default nextConfig
