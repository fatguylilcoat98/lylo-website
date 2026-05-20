import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFBF6",
          100: "#FBF8F1",
          200: "#F6F0E2",
        },
        ink: {
          900: "#1F1B17",
          800: "#2A2522",
          700: "#3C342E",
          600: "#5C524A",
          500: "#7A6F65",
          400: "#9A8F84",
        },
        sky: {
          50: "#F2F7FB",
          100: "#E4EEF6",
          200: "#CFDFEC",
          300: "#B0CBE0",
          400: "#85B0CF",
          500: "#5E92B7",
          600: "#427699",
          700: "#33607F",
        },
        gold: {
          50: "#FBF4E1",
          100: "#F6E8C2",
          200: "#EFD79A",
          300: "#E5C476",
          400: "#D4A85A",
          500: "#B88A3F",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgba(60, 52, 46, 0.12)",
        warm: "0 24px 60px -28px rgba(184, 138, 63, 0.25)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "blob-drift": {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(20px, -20px) scale(1.05)" },
          "66%": { transform: "translate(-15px, 15px) scale(0.97)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "blob-drift": "blob-drift 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
