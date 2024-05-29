/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://api-everybuy.onrender.com/:path*', // Proxy to Backend
        },
      ];
    },
  };
  
  export default nextConfig;
  