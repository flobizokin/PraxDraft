const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/entry',
        destination: '/entry',
      },
      {
        source: '/new-note',
        destination: '/note/new',
      },
      {
        source: '/notebooks',
        destination: '/notebooks',
      },
      {
        source: '/notebooks/:stack',
        destination: '/notebooks/[stack]',
      },
      {
        source: '/search',
        destination: '/search',
      },
      {
        source: '/tour',
        destination: '/tour',
      },
      {
        source: '/note/:id',
        destination: '/note/[id]',
      },
    ]
  },
}

module.exports = withPWA(nextConfig)

