/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#083D91",
          50:  "#E8EFFE",
          100: "#C5D6FB",
          200: "#8AAEF8",
          300: "#5087F4",
          400: "#1F63EE",
          500: "#083D91",
          600: "#063280",
          700: "#05256B",
          800: "#031855",
          900: "#020D38",
        },
        secondary: {
          DEFAULT: "#C9A227",
          50:  "#FDF8E8",
          100: "#F9EEC5",
          200: "#F3DC88",
          300: "#ECC94B",
          400: "#DEB52F",
          500: "#C9A227",
          600: "#A8881F",
          700: "#876D18",
          800: "#655211",
          900: "#42360A",
        },
        surface: "#FFFFFF",
        muted:   "#E5E5E5",
        // CSS-variable-based semantic colors (auto dark/light via global.css)
        canvas:      "rgb(var(--color-bg) / <alpha-value>)",
        "canvas-muted": "rgb(var(--color-bg-muted) / <alpha-value>)",
        ink:         "rgb(var(--color-fg) / <alpha-value>)",
        "ink-muted": "rgb(var(--color-fg-muted) / <alpha-value>)",
        brand:       "rgb(var(--color-primary) / <alpha-value>)",
        gold:        "rgb(var(--color-secondary) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
