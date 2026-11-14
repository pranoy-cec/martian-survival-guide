/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'trek.nasa.gov',
      },
      {
        protocol: 'https',
        hostname: 'mars.nasa.gov',
      },
      {
        protocol: 'https',
        hostname: 'images-assets.nasa.gov',
      },
      {
        protocol: 'https',
        hostname: 'photojournal.jpl.nasa.gov',
      },
    ],
  },
};

module.exports = nextConfig;
