import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  fallbacks: {
    document: "/_offline", // Define the fallback page
  },
});

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

export default withPWA(nextConfig);
