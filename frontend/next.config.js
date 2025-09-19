/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    NEXT_PUBLIC_ADMIN_PASSWORD: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '',
  },
  // Static export for Netlify
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['localhost', 'images.unsplash.com'],
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['@heroicons/react', 'lucide-react'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Bundle analyzer
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimize bundle splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Framer Motion chunk
          framer: {
            name: 'framer-motion',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](framer-motion|@dnd-kit)[\\/]/,
            priority: 20,
          },
          // UI libraries chunk
          ui: {
            name: 'ui-libs',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](@heroicons|@dnd-kit|clsx|tailwind-merge)[\\/]/,
            priority: 15,
          },
          // Common chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
}

module.exports = nextConfig
