/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ['everybuy-category.s3.eu-north-1.amazonaws.com'],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "everybuy-category.s3.eu-north-1.amazonaws.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://api-everybuy.onrender.com/:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
