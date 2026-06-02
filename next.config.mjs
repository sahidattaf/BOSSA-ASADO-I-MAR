/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/weekend-fire.html',
      },
    ];
  },
};

export default nextConfig;
