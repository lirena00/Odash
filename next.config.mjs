/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  env: {
    WEATHER_KEY: process.env.WEATHER_KEY,
    AI_URL: process.env.AI_URL,
  },
};

export default nextConfig;
