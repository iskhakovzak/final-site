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
        sans: ["var(--font-inter)"],
        syne: ["var(--font-syne)"],
        "playfair-display": ["var(--font-playfair-display)"],
        montserrat: ["var(--font-montserrat)"],
      },
      colors: {
        primary: "#B5AB9A",
        secondary: "#EAEAEA",
        background: "#121212",
        surface: "#1A1A1A",
        "surface-light": "#2A2A2A",
        "text-primary": "#EAEAEA",
        "text-secondary": "#B0B0B0",
        "text-muted": "#888888",
        accent: "#B5AB9A",
        error: "#FF6B6B",
        success: "#51CF66",
        warning: "#FFD43B",
      },
    },
  },
  plugins: [],
};
export default config;
