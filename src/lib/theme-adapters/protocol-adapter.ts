import { Theme } from '../theme-registry';
import Button from '../../components/protocol/Button';
import Card from '../../components/protocol/Card';

// Protocol theme definition
export const protocolTheme: Theme = {
  metadata: {
    id: 'protocol',
    name: 'Protocol',
    description: 'A clean, professional theme with sharp edges and bold typography',
    category: 'business',
    tags: ['modern', 'professional', 'clean'],
  },
  components: {
    Button,
    Card,
    Input: null,
    Header: null,
    Footer: null,
  },
  tokens: {
    colors: {
      // Base colors
      primary: '#0070f3',
      secondary: '#6b7280',
      accent: '#f472b6',
      
      // UI colors
      background: '#ffffff',
      foreground: '#111827',
      card: '#ffffff',
      'card-foreground': '#111827',
      muted: '#f3f4f6',
      'muted-foreground': '#6b7280',
      border: '#e5e7eb',
      input: '#e5e7eb',
      
      // State colors
      destructive: '#ef4444',
      'destructive-foreground': '#ffffff',
      success: '#22c55e',
      'success-foreground': '#ffffff',
      warning: '#f59e0b',
      'warning-foreground': '#1a202c',
      info: '#3b82f6',
      'info-foreground': '#ffffff',
      
      // Dark mode colors
      'dark-background': '#1a202c',
      'dark-foreground': '#f3f4f6',
      'dark-card': '#1f2937',
      'dark-card-foreground': '#f3f4f6',
      'dark-muted': '#374151',
      'dark-muted-foreground': '#d1d5db',
      'dark-border': '#4b5563',
      'dark-input': '#4b5563',
    },
    typography: {
      fontFamily: {
        sans: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        mono: 'Menlo, Monaco, Consolas, "Liberation Mono", monospace',
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
    },
    spacing: {
      px: '1px',
      0: '0px',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      11: '2.75rem',
      12: '3rem',
      14: '3.5rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      44: '11rem',
      48: '12rem',
      52: '13rem',
      56: '14rem',
      60: '15rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem',
    },
    borderRadius: {
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px',
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      none: 'none',
    },
  },
  css: `
    /* Protocol Theme CSS Variables */
    :root {
      --font-sans: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      --font-mono: Menlo, Monaco, Consolas, "Liberation Mono", monospace;
      
      /* Base colors */
      --primary: #0070f3;
      --secondary: #6b7280;
      --accent: #f472b6;
      
      /* UI colors */
      --background: #ffffff;
      --foreground: #111827;
      --card: #ffffff;
      --card-foreground: #111827;
      --muted: #f3f4f6;
      --muted-foreground: #6b7280;
      --border: #e5e7eb;
      --input: #e5e7eb;
      
      /* State colors */
      --destructive: #ef4444;
      --destructive-foreground: #ffffff;
      --success: #22c55e;
      --success-foreground: #ffffff;
      --warning: #f59e0b;
      --warning-foreground: #1a202c;
      --info: #3b82f6;
      --info-foreground: #ffffff;
      
      /* Border radius */
      --radius: 0.25rem;
    }
    
    .dark {
      --background: #1a202c;
      --foreground: #f3f4f6;
      --card: #1f2937;
      --card-foreground: #f3f4f6;
      --muted: #374151;
      --muted-foreground: #d1d5db;
      --border: #4b5563;
      --input: #4b5563;
    }
  `,
}; 