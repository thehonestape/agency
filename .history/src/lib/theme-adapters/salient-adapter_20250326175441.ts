import { Theme } from '../theme-registry';
import Button from '../../components/salient/Button';
import Card from '../../components/salient/Card';

// Salient theme definition
export const salientTheme: Theme = {
  metadata: {
    id: 'salient',
    name: 'Salient',
    description: 'A clean and modern light theme with subtle shadows and rounded corners',
    category: 'dashboard',
    tags: ['clean', 'modern', 'light'],
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
      primary: '#00A9FF',
      secondary: '#6366f1',
      accent: '#f43f5e',
      
      // UI colors
      background: '#ffffff',
      foreground: '#0f172a',
      card: '#ffffff',
      'card-foreground': '#0f172a',
      muted: '#f8fafc',
      'muted-foreground': '#64748b',
      border: '#e2e8f0',
      input: '#e2e8f0',
      
      // State colors
      destructive: '#ef4444',
      'destructive-foreground': '#ffffff',
      success: '#22c55e',
      'success-foreground': '#ffffff',
      warning: '#f59e0b',
      'warning-foreground': '#0f172a',
      info: '#3b82f6',
      'info-foreground': '#ffffff',
    },
    typography: {
      fontFamily: {
        sans: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        mono: 'JetBrains Mono, monospace',
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
      DEFAULT: '0.375rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
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
    /* Salient Theme CSS Variables */
    :root {
      --font-sans: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      --font-mono: JetBrains Mono, monospace;
      
      /* Base colors */
      --primary: #00A9FF;
      --primary-foreground: #f8fafc;
      --secondary: #6366f1;
      --secondary-foreground: #0f172a;
      --accent: #f43f5e;
      --accent-foreground: #0f172a;
      
      /* UI colors */
      --background: #ffffff;
      --foreground: #0f172a;
      --card: #ffffff;
      --card-foreground: #0f172a;
      --muted: #f8fafc;
      --muted-foreground: #64748b;
      --border: #e2e8f0;
      --input: #e2e8f0;
      
      /* State colors */
      --destructive: #ef4444;
      --destructive-foreground: #ffffff;
      --success: #22c55e;
      --success-foreground: #ffffff;
      --warning: #f59e0b;
      --warning-foreground: #0f172a;
      --info: #3b82f6;
      --info-foreground: #ffffff;
      
      /* Border radius */
      --radius: 0.375rem;
    }
  `,
}; 