import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1863dc",
          "blue-dark": "#004dd6",
          "blue-deep": "#1a10ce",
          "blue-hover": "#0056a7",
          red: "#f2295b",
          "red-hotline": "#dc2626",
          dark: "#212121",
          muted: "#434343",
          gray: "#757575",
          light: "#f4f4f4",
          surface: "#f8f9fa",
          border: "#ebebeb",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "Manrope", "sans-serif"],
        mulish: ["var(--font-mulish)", "Mulish", "sans-serif"],
      },
      animation: {
        "pulse-call": "pulse-ring 2s infinite cubic-bezier(0.45, 0, 0.55, 1)",
      },
      keyframes: {
        "pulse-ring": {
          "0%": {
            transform: "scale(0.95)",
            boxShadow: "0 0 0 0 rgba(220, 38, 38, 0.7)",
          },
          "70%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 14px rgba(220, 38, 38, 0)",
          },
          "100%": {
            transform: "scale(0.95)",
            boxShadow: "0 0 0 0 rgba(220, 38, 38, 0)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
