/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 's3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/pagrico.com/assets/**',
      },
    ],
  },
  // Otimizações para produção
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
