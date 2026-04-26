import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rose: {
          400: "#fb7185", 500: "#f43f5e", 600: "#e11d48", 700: "#be123c",
        },
        plum: {
          800: "#3b1f2b", 900: "#27111a", 950: "#150a10",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-dm)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "coach-hero": "linear-gradient(135deg, #27111a 0%, #3b1f2b 40%, #1e1b4b 100%)",
        "coach-gradient": "linear-gradient(135deg, #e11d48 0%, #9333ea 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
