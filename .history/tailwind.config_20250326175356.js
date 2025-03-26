/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        "card-foreground": 'var(--card-foreground)',
        muted: 'var(--muted)',
        "muted-foreground": 'var(--muted-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        destructive: 'var(--destructive)',
        "destructive-foreground": 'var(--destructive-foreground)',
        success: 'var(--success)',
        "success-foreground": 'var(--success-foreground)',
        warning: 'var(--warning)',
        "warning-foreground": 'var(--warning-foreground)',
        info: 'var(--info)',
        "info-foreground": 'var(--info-foreground)',
      },
    },
  },
  plugins: [],
} 