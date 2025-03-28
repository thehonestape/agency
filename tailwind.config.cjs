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
        background: '#ffffff',
        foreground: '#0f172a',
        card: '#ffffff',
        'card-foreground': '#0f172a',
        primary: '#1e293b',
        'primary-foreground': '#f8fafc',
        secondary: '#f1f5f9',
        'secondary-foreground': '#1e293b',
        muted: '#f1f5f9',
        'muted-foreground': '#64748b',
        accent: '#f1f5f9',
        'accent-foreground': '#1e293b',
        
        // State colors
        destructive: '#ef4444',
        'destructive-foreground': '#f8fafc',
        success: '#22c55e',
        'success-foreground': '#f8fafc',
        warning: '#f59e0b',
        'warning-foreground': '#0f172a',
        info: '#3b82f6',
        'info-foreground': '#f8fafc',
        
        // UI colors
        popover: '#ffffff',
        'popover-foreground': '#0f172a',
        border: '#e2e8f0',
        input: '#e2e8f0',
        ring: '#0f172a',

        // Button specific colors
        'button-background': '#1e293b',
        'button-text': '#f8fafc',
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
} 