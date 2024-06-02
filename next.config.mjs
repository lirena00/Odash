/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  env: {
    WEATHER_KEY: process.env.WEATHER_KEY,
  },
};

export default nextConfig;
