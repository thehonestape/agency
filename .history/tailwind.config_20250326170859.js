/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Standard colors
        white: "#ffffff",
        black: "#000000",
        red: {
          500: "#ef4444",
        },
        blue: {
          500: "#3b82f6",
        },
        green: {
          500: "#22c55e",
        },
        gray: {
          200: "#e5e7eb",
        },
        // Custom colors
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        background: "rgb(var(--color-background) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
      },
    },
  },
  plugins: [],
} 