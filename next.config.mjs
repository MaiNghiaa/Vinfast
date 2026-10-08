/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable gzip compression
  compress: true,

  images: {
    // Prefer modern formats
    formats: ['image/avif', 'image/webp'],
    // Optimize image sizes for common breakpoints
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vinfastphuongdonghanoi.com',
      },
      {
        protocol: 'https',
        hostname: 'vinfastthinhcuong.com.vn',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'vinfastauto.com',
      },
    ],
  },

  // Optimize production bundles
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
