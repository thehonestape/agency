import { Theme } from '../theme-registry';
import Button from '../../components/protocol/Button';
import Card from '../../components/protocol/Card';
import { colorTokens, hslToString } from '../../components/ui/theme/tokens';

// Protocol theme definition
export const protocolTheme: Theme = {
  metadata: {
    id: 'protocol',
    name: 'Protocol',
    description: 'A clean and professional theme with sharp edges and subtle gradients',
    category: 'business',
    tags: ['professional', 'sharp', 'clean'],
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
      primary: hslToString(colorTokens.primary[600]),
      secondary: hslToString(colorTokens.secondary[600]),
      accent: hslToString(colorTokens.accent[600]),
      
      // UI colors
      background: hslToString(colorTokens.neutral[50]),
      foreground: hslToString(colorTokens.neutral[900]),
      card: hslToString(colorTokens.neutral[50]),
      'card-foreground': hslToString(colorTokens.neutral[900]),
      muted: hslToString(colorTokens.neutral[100]),
      'muted-foreground': hslToString(colorTokens.neutral[500]),
      border: hslToString(colorTokens.neutral[200]),
      input: hslToString(colorTokens.neutral[200]),
      
      // State colors
      destructive: hslToString(colorTokens.error[600]),
      'destructive-foreground': hslToString(colorTokens.neutral[50]),
      success: hslToString(colorTokens.success[600]),
      'success-foreground': hslToString(colorTokens.neutral[50]),
      warning: hslToString(colorTokens.warning[600]),
      'warning-foreground': hslToString(colorTokens.neutral[900]),
      info: hslToString(colorTokens.info[600]),
      'info-foreground': hslToString(colorTokens.neutral[50]),
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
      none: '0px',
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
      --font-mono: SF Mono, Menlo, Consolas, Monaco, monospace;
      
      /* Base colors */
      --background: ${hslToString(colorTokens.neutral[50])};
      --foreground: ${hslToString(colorTokens.neutral[900])};
      --card: ${hslToString(colorTokens.neutral[50])};
      --card-foreground: ${hslToString(colorTokens.neutral[900])};
      --primary: ${hslToString(colorTokens.primary[600])};
      --primary-foreground: ${hslToString(colorTokens.neutral[50])};
      --secondary: ${hslToString(colorTokens.secondary[600])};
      --secondary-foreground: ${hslToString(colorTokens.neutral[50])};
      --accent: ${hslToString(colorTokens.accent[600])};
      --accent-foreground: ${hslToString(colorTokens.neutral[50])};
      --muted: ${hslToString(colorTokens.neutral[100])};
      --muted-foreground: ${hslToString(colorTokens.neutral[500])};
      
      /* UI colors */
      --border: ${hslToString(colorTokens.neutral[200])};
      --input: ${hslToString(colorTokens.neutral[200])};
      --ring: ${hslToString(colorTokens.primary[600])};
      --popover: ${hslToString(colorTokens.neutral[50])};
      --popover-foreground: ${hslToString(colorTokens.neutral[900])};
      
      /* State colors */
      --destructive: ${hslToString(colorTokens.error[600])};
      --destructive-foreground: ${hslToString(colorTokens.neutral[50])};
      --success: ${hslToString(colorTokens.success[600])};
      --success-foreground: ${hslToString(colorTokens.neutral[50])};
      --warning: ${hslToString(colorTokens.warning[600])};
      --warning-foreground: ${hslToString(colorTokens.neutral[900])};
      --info: ${hslToString(colorTokens.info[600])};
      --info-foreground: ${hslToString(colorTokens.neutral[50])};
      
      /* Border radius */
      --radius: 0.25rem;
      --radius-sm: 0.125rem;
      --radius-md: 0.375rem;
      --radius-lg: 0.5rem;
      --radius-xl: 0.75rem;
      --radius-2xl: 1rem;
    }
    
    .dark {
      --background: ${hslToString(colorTokens.neutral[950])};
      --foreground: ${hslToString(colorTokens.neutral[50])};
      --card: ${hslToString(colorTokens.neutral[900])};
      --card-foreground: ${hslToString(colorTokens.neutral[50])};
      --primary: ${hslToString(colorTokens.primary[400])};
      --primary-foreground: ${hslToString(colorTokens.neutral[900])};
      --secondary: ${hslToString(colorTokens.secondary[400])};
      --secondary-foreground: ${hslToString(colorTokens.neutral[900])};
      --accent: ${hslToString(colorTokens.accent[400])};
      --accent-foreground: ${hslToString(colorTokens.neutral[900])};
      --muted: ${hslToString(colorTokens.neutral[800])};
      --muted-foreground: ${hslToString(colorTokens.neutral[400])};
      
      /* UI colors */
      --border: ${hslToString(colorTokens.neutral[800])};
      --input: ${hslToString(colorTokens.neutral[800])};
      --ring: ${hslToString(colorTokens.primary[400])};
      --popover: ${hslToString(colorTokens.neutral[900])};
      --popover-foreground: ${hslToString(colorTokens.neutral[50])};
      
      /* State colors */
      --destructive: ${hslToString(colorTokens.error[900])};
      --destructive-foreground: ${hslToString(colorTokens.neutral[50])};
      --success: ${hslToString(colorTokens.success[900])};
      --success-foreground: ${hslToString(colorTokens.neutral[50])};
      --warning: ${hslToString(colorTokens.warning[900])};
      --warning-foreground: ${hslToString(colorTokens.neutral[50])};
      --info: ${hslToString(colorTokens.info[900])};
      --info-foreground: ${hslToString(colorTokens.neutral[50])};
    }
  `,
}; 