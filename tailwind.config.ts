import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ["comfortaa", "sans-serif"],
      },
      colors: {
        text: "#e3e8eb",
        "solid-text": "var(--solid-text-color)",
        background: "#070a0c",
        primary: "#97bed1",
        secondary: "#275b73",
        accent: "var(--accent-color)",
      },
    },
  },

  plugins: [require("@tailwindcss/typography")],
};
export default config;

/*
'#3fa1d0'
*/
