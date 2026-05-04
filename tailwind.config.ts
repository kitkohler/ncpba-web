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
        "deep-soil":  "#2C2416",
        "oak-bark":   "#6B5B45",
        ember:        "#C75B00",
        "ember-dark": "#A34A00",
        sage:         "#739B5B",
        "warm-cream": "#EDE5D4",
        sand:         "#F5EFE3",
        smoke:        "#A8A09A",
      },
      fontFamily: {
        display: ["cardea", "Palatino Linotype", "Georgia", "serif"],
        body: ["var(--loaded-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1200px",
      },
      boxShadow: {
        card:    "0 1px 3px rgba(44,36,22,0.07), 0 4px 12px rgba(44,36,22,0.04)",
        "card-hover": "0 4px 16px rgba(44,36,22,0.14)",
        nav:     "0 2px 16px rgba(44,36,22,0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
