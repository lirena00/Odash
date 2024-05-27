/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "icons.duckduckgo.com",
      },
    ],
  },
  env: {
    WEATHER_KEY: process.env.WEATHER_KEY,
  },
};

export default nextConfig;
