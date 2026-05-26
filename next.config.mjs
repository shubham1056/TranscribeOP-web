/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 'standalone' is for self-hosted / container deploys (App Service, Docker).
  // Azure Static Web Apps wants the default .next output, so disable standalone there.
  ...(process.env.AZURE_STATIC_WEB_APPS === 'true' ? {} : { output: 'standalone' }),
  experimental: { typedRoutes: true },
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/v1/:path*`,
      },
    ];
  },
};
export default nextConfig;
