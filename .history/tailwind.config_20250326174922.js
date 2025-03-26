/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary, 210 100% 50%))',
        secondary: 'hsl(var(--secondary, 250 100% 50%))',
        accent: 'hsl(var(--accent, 350 100% 70%))',
        background: 'hsl(var(--background, 0 0% 100%))',
        foreground: 'hsl(var(--foreground, 222 47% 11%))',
        card: 'hsl(var(--card, 0 0% 100%))',
        "card-foreground": 'hsl(var(--card-foreground, 222 47% 11%))',
        muted: 'hsl(var(--muted, 210 40% 96%))',
        "muted-foreground": 'hsl(var(--muted-foreground, 215 16% 47%))',
        border: 'hsl(var(--border, 214 32% 91%))',
        input: 'hsl(var(--input, 214 32% 91%))',
        destructive: 'hsl(var(--destructive, 0 84% 60%))',
        "destructive-foreground": 'hsl(var(--destructive-foreground, 210 40% 98%))',
        success: 'hsl(var(--success, 142 76% 36%))',
        "success-foreground": 'hsl(var(--success-foreground, 210 40% 98%))',
        warning: 'hsl(var(--warning, 38 92% 50%))',
        "warning-foreground": 'hsl(var(--warning-foreground, 222 47% 11%))',
        info: 'hsl(var(--info, 221 83% 53%))',
        "info-foreground": 'hsl(var(--info-foreground, 210 40% 98%))',
      },
    },
  },
  plugins: [],
} 