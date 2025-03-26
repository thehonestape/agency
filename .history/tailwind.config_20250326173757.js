/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00A9FF",
        secondary: "#6366f1",
        accent: "#f43f5e",
        background: "#ffffff",
        foreground: "#0f172a",
        card: "#ffffff",
        "card-foreground": "#0f172a",
        muted: "#f8fafc",
        "muted-foreground": "#64748b",
        border: "#e2e8f0",
        input: "#e2e8f0",
        destructive: "#ef4444",
        "destructive-foreground": "#ffffff",
        success: "#22c55e",
        "success-foreground": "#ffffff",
        warning: "#f59e0b",
        "warning-foreground": "#0f172a",
        info: "#3b82f6",
        "info-foreground": "#ffffff",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
} 