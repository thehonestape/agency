/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Base colors
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        
        // State colors
        destructive: 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
        success: 'var(--success)',
        'success-foreground': 'var(--success-foreground)',
        warning: 'var(--warning)',
        'warning-foreground': 'var(--warning-foreground)',
        info: 'var(--info)',
        'info-foreground': 'var(--info-foreground)',
        
        // UI colors
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',

        // Button specific colors
        'button-background': 'var(--button-background)',
        'button-text': 'var(--button-text)',
        
        // Navigation colors
        'nav-bg': 'var(--nav-bg)',
        'nav-border': 'var(--nav-border)',
        'nav-text': 'var(--nav-text)',
        'nav-text-hover': 'var(--nav-text-hover)',
        'nav-bg-hover': 'var(--nav-bg-hover)',
        'nav-bg-active': 'var(--nav-bg-active)',
        'nav-text-active': 'var(--nav-text-active)',
        'nav-icon': 'var(--nav-icon)',
        'nav-icon-active': 'var(--nav-icon-active)',
        'nav-icon-hover': 'var(--nav-icon-hover)',
        'nav-section-text': 'var(--nav-section-text)',
        'nav-count': 'var(--nav-count)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      animation: {
        'spin-slow': 'spin-slow 3s linear infinite',
      },
      transitionDuration: {
        fastest: 'var(--speed-fastest)',
        fast: 'var(--speed-fast)',
        normal: 'var(--speed-normal)',
        slow: 'var(--speed-slow)',
        slowest: 'var(--speed-slowest)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
} 