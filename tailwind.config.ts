import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        surface: "#F5F7FA",
        surface2: "#EEF1F8",
        navy: "#060C18",
        accent: "#4A6FE8",
        "accent-light": "#A8BEFF",
        "accent-dim": "#EBF0FF",
        text: "#0D1828",
        muted: "#6B7D9C",
        border: "#E2E8F0",
      },
      fontFamily: {
        // Bricolage Grotesque for headings/display
        display: ["var(--font-bricolage)", "sans-serif"],
        // DM Sans for body
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "12px",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s forwards",
      },
    },
  },
  plugins: [],
};

export default config;
