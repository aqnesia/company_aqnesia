import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        surface: "#f8f9fb",
        "surface-light": "#ffffff",
        border: "rgba(35, 27, 53, 0.12)",
        foreground: "#181520",
        muted: "#464157",
        accent: "#231b35",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["var(--font-machina)", "monospace", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
