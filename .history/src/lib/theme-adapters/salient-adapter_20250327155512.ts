import { Theme } from '../theme-registry';
import Button from '../../components/salient/Button';
import Card from '../../components/salient/Card';

// Salient theme definition
export const salientTheme: Theme = {
  metadata: {
    id: 'salient',
    name: 'Salient',
    description: 'A modern and attractive theme with rounded corners and vibrant colors',
    category: 'marketing',
    tags: ['modern', 'rounded', 'vibrant'],
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
      primary: '#3b82f6',
      secondary: '#6366f1',
      accent: '#f43f5e',
      
      // UI colors
      background: '#ffffff',
      foreground: '#18181b',
      card: '#ffffff',
      'card-foreground': '#18181b',
      muted: '#f4f4f5',
      'muted-foreground': '#71717a',
      border: '#e4e4e7',
      input: '#e4e4e7',
      
      // State colors
      destructive: '#ef4444',
      'destructive-foreground': '#fafafa',
      success: '#22c55e',
      'success-foreground': '#fafafa',
      warning: '#eab308',
      'warning-foreground': '#18181b',
      info: '#06b6d4',
      'info-foreground': '#fafafa',
      
      // Dark mode colors
      'dark-background': '#18181b',
      'dark-foreground': '#fafafa',
      'dark-card': '#27272a',
      'dark-card-foreground': '#fafafa',
      'dark-muted': '#3f3f46',
      'dark-muted-foreground': '#a1a1aa',
      'dark-border': '#52525b',
      'dark-input': '#52525b',
    },
    typography: {
      fontFamily: {
        sans: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        mono: 'SF Mono, Menlo, Consolas, Monaco, monospace',
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
      sm: '0.25rem',
      DEFAULT: '0.5rem',
      md: '0.75rem',
      lg: '1rem',
      xl: '1.5rem',
      '2xl': '2rem',
      '3xl': '3rem',
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
      --font-mono: SF Mono, Menlo, Consolas, Monaco, monospace;
      
      /* Base colors */
      --primary: #3b82f6;
      --primary-foreground: #ffffff;
      --secondary: #6366f1;
      --secondary-foreground: #ffffff;
      --accent: #f43f5e;
      --accent-foreground: #ffffff;
      
      /* UI colors */
      --background: #ffffff;
      --foreground: #18181b;
      --card: #ffffff;
      --card-foreground: #18181b;
      --popover: #ffffff;
      --popover-foreground: #18181b;
      --muted: #f4f4f5;
      --muted-foreground: #71717a;
      --border: #e4e4e7;
      --input: #e4e4e7;
      --ring: #3b82f6;
      
      /* State colors */
      --destructive: #ef4444;
      --destructive-foreground: #fafafa;
      --success: #22c55e;
      --success-foreground: #fafafa;
      --warning: #eab308;
      --warning-foreground: #18181b;
      --info: #06b6d4;
      --info-foreground: #fafafa;
      
      /* Navigation Colors */
      --nav-bg: #ffffff;
      --nav-border: #e5e7eb;
      --nav-text: #111827;
      --nav-text-hover: #3b82f6;
      --nav-bg-hover: #f0f9ff;
      --nav-bg-active: #3b82f6;
      --nav-text-active: #ffffff;
      --nav-icon: #6b7280;
      --nav-icon-active: #ffffff;
      --nav-icon-hover: #3b82f6;
      --nav-section-text: #6b7280;
      --nav-count: #6b7280;
      
      /* Border radius */
      --radius: 0.5rem;
    }
    
    .dark {
      --background: #18181b;
      --foreground: #fafafa;
      --card: #27272a;
      --card-foreground: #fafafa;
      --popover: #27272a;
      --popover-foreground: #fafafa;
      --muted: #3f3f46;
      --muted-foreground: #a1a1aa;
      --border: #52525b;
      --input: #52525b;
      --ring: #7dd3fc;
      
      --destructive: #7f1d1d;
      --destructive-foreground: #fafafa;
      --success: #15803d;
      --success-foreground: #fafafa;
      --warning: #854d0e;
      --warning-foreground: #fafafa;
      --info: #0e7490;
      --info-foreground: #fafafa;

      /* Navigation Colors - Dark Mode */
      --nav-bg: #1e293b;
      --nav-border: #334155;
      --nav-text: #f8fafc;
      --nav-text-hover: #3b82f6;
      --nav-bg-hover: #334155;
      --nav-bg-active: #3b82f6;
      --nav-text-active: #1e293b;
      --nav-icon: #94a3b8;
      --nav-icon-active: #1e293b;
      --nav-icon-hover: #3b82f6;
      --nav-section-text: #94a3b8;
      --nav-count: #94a3b8;
    }
  `,
}; 