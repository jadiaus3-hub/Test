/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: false, // Using pages directory for now
  },
  typescript: {
    // Next.js will run type checking during build
    ignoreBuildErrors: false,
  },
  eslint: {
    // Next.js will run ESLint during build
    ignoreDuringBuilds: false,
  },
}

export default nextConfig