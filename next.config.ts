import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  env: {
    GOOGLE_BOOKS_API_KEY: process.env.GOOGLE_BOOKS_API_KEY
  }
}

export default nextConfig
