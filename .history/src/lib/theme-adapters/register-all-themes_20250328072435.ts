import { themeRegistry, Theme, ThemeCategory } from '../theme-registry';
import { salientTheme } from './salient-adapter';
import { protocolTheme } from './protocol-adapter';

// Helper function to create a theme without components (for showcase purposes)
const createThemeAdapter = (
  id: string, 
  name: string, 
  description: string, 
  category: ThemeCategory, 
  tags: string[],
  primaryColor: string,
  accentColor: string
): Theme => {
  return {
    metadata: {
      id,
      name,
      description,
      category,
      tags,
    },
    components: {
      Button: null,
      Card: null,
      Input: null,
      Header: null,
      Footer: null,
    },
    tokens: {
      colors: {
        // Base colors
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        
        // UI colors
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        
        // State colors
        destructive: 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
        success: 'var(--success)',
        'success-foreground': 'var(--success-foreground)',
        warning: 'var(--warning)',
        'warning-foreground': 'var(--warning-foreground)',
        info: 'var(--info)',
        'info-foreground': 'var(--info-foreground)',
      },
      typography: {
        fontFamily: {
          sans: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          mono: 'Menlo, Monaco, monospace',
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
    css: '', // We don't need to inject CSS variables anymore since they're in theme.css
  };
};

// Create additional themes
const transmitTheme = createThemeAdapter(
  'transmit',
  'Transmit',
  'A modern theme with vibrant colors and sharp edges',
  'marketing',
  ['modern', 'vibrant', 'sharp'],
  '#6366f1',
  '#f472b6'
);

const syntaxTheme = createThemeAdapter(
  'syntax',
  'Syntax',
  'A developer-focused theme with monospace typography and code-like aesthetics',
  'documentation',
  ['developer', 'code', 'technical'],
  '#3b82f6',
  '#10b981'
);

const primerTheme = createThemeAdapter(
  'primer',
  'Primer',
  'A clean and minimal theme inspired by GitHub\'s design system',
  'dashboard',
  ['minimal', 'clean', 'github'],
  '#0969da',
  '#8250df'
);

const pocketTheme = createThemeAdapter(
  'pocket',
  'Pocket',
  'A compact theme with rounded corners and soft colors',
  'blog',
  ['compact', 'rounded', 'soft'],
  '#ee4444',
  '#ea4c89'
);

const keynoteTheme = createThemeAdapter(
  'keynote',
  'Keynote',
  'A presentation-focused theme with bold typography and high contrast',
  'marketing',
  ['presentation', 'bold', 'contrast'],
  '#f97316',
  '#14b8a6'
);

const commitTheme = createThemeAdapter(
  'commit',
  'Commit',
  'A professional theme with subtle colors and balanced proportions',
  'business',
  ['professional', 'subtle', 'balanced'],
  '#0891b2',
  '#8b5cf6'
);

const radiantTheme = createThemeAdapter(
  'radiant',
  'Radiant',
  'A vibrant theme with gradients and glowing effects',
  'portfolio',
  ['vibrant', 'gradient', 'glow'],
  '#8b5cf6',
  '#ec4899'
);

const studioTheme = createThemeAdapter(
  'studio',
  'Studio',
  'A creative theme for digital agencies and creative studios',
  'portfolio',
  ['creative', 'agency', 'studio'],
  '#06b6d4',
  '#f43f5e'
);

// Register all themes
export const registerAllThemes = () => {
  // Register our fully implemented themes first if not already registered
  if (!themeRegistry.isRegistered('salient')) {
    themeRegistry.register(salientTheme);
  }
  
  if (!themeRegistry.isRegistered('protocol')) {
    themeRegistry.register(protocolTheme);
  }
  
  // Register additional themes if they don't already exist
  const additionalThemes = [
    transmitTheme,
    syntaxTheme,
    primerTheme,
    pocketTheme,
    keynoteTheme,
    commitTheme,
    radiantTheme,
    studioTheme
  ];
  
  for (const theme of additionalThemes) {
    if (!themeRegistry.isRegistered(theme.metadata.id)) {
      themeRegistry.register(theme);
    }
  }
  
  console.log(`Theme registry contains ${themeRegistry.getAllThemes().length} themes`);
}; 