import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
        charcoal: {
          800: "#1c1917",
          900: "#0c0a09",
          950: "#050403",
        },
        cream: {
          50:  "#fefdf8",
          100: "#fdf8ed",
          200: "#faf0d7",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      backgroundImage: {
        "restaurant-hero": "linear-gradient(to bottom, rgba(12,10,9,0.7) 0%, rgba(12,10,9,0.4) 60%, rgba(12,10,9,0.85) 100%)",
        "gold-gradient": "linear-gradient(135deg, #d97706 0%, #fbbf24 50%, #d97706 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
