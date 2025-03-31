import { Theme, ThemeConfig, ThemeMode, ThemeTypography } from './types';

/**
 * Convert hex to RGB
 */
function hexToRGB(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Convert RGB to hex
 */
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Adjust lightness of a hex color
 */
function adjustLightness(hex: string, amount: number): string {
  const rgb = hexToRGB(hex);
  if (!rgb) return hex;

  const r = Math.round(rgb.r * amount);
  const g = Math.round(rgb.g * amount);
  const b = Math.round(rgb.b * amount);

  return rgbToHex(r, g, b);
}

/**
 * Generate a color scale from a base color
 */
function generateColorScale(baseColor: string): Record<string, string> {
  return {
    50: adjustLightness(baseColor, 0.95),
    100: adjustLightness(baseColor, 0.9),
    200: adjustLightness(baseColor, 0.85),
    300: adjustLightness(baseColor, 0.75),
    400: adjustLightness(baseColor, 0.65),
    500: baseColor,
    600: adjustLightness(baseColor, 0.45),
    700: adjustLightness(baseColor, 0.35),
    800: adjustLightness(baseColor, 0.25),
    900: adjustLightness(baseColor, 0.2),
    950: adjustLightness(baseColor, 0.15),
  };
}

/**
 * Generate a theme from configuration
 */
export function generateTheme(config: ThemeConfig): Theme {
  const {
    primaryColor,
    secondaryColor = adjustLightness(primaryColor, 0.9),
    accentColor = adjustLightness(primaryColor, 0.85),
    mode = 'light',
    fontFamily = {
      sans: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
    baseSpacing = 4,
    baseRadius = 4,
  } = config;

  // Generate color scales
  const primaryScale = generateColorScale(primaryColor);
  const secondaryScale = generateColorScale(secondaryColor);
  const accentScale = generateColorScale(accentColor);

  // Base colors based on mode
  const isDark = mode === 'dark';
  const baseColors = isDark ? {
    background: '#111827',
    'background-foreground': '#f9fafb',
    foreground: '#f9fafb',
    card: '#1f2937',
    'card-foreground': '#f9fafb',
    muted: '#1f2937',
    'muted-foreground': '#9ca3af',
    border: '#374151',
    'border-foreground': '#f9fafb',
    input: '#1f2937',
    'input-foreground': '#f9fafb',
    popover: '#1f2937',
    'popover-foreground': '#f9fafb',
    ring: '#3b82f6',
  } : {
    background: '#ffffff',
    'background-foreground': '#111827',
    foreground: '#111827',
    card: '#ffffff',
    'card-foreground': '#111827',
    muted: '#f3f4f6',
    'muted-foreground': '#6b7280',
    border: '#e5e7eb',
    'border-foreground': '#111827',
    input: '#ffffff',
    'input-foreground': '#111827',
    popover: '#ffffff',
    'popover-foreground': '#111827',
    ring: '#3b82f6',
  };

  // State colors
  const stateColors = {
    destructive: '#ef4444',
    'destructive-foreground': '#ffffff',
    success: '#22c55e',
    'success-foreground': '#ffffff',
    warning: '#f59e0b',
    'warning-foreground': '#ffffff',
    info: '#3b82f6',
    'info-foreground': '#ffffff',
  };

  // Button specific colors
  const buttonColors = {
    'button-background': isDark ? '#1f2937' : '#f3f4f6',
    'button-text': isDark ? '#f9fafb' : '#111827',
  };

  // Navigation colors
  const navColors = {
    'nav-bg': isDark ? '#111827' : '#ffffff',
    'nav-border': isDark ? '#374151' : '#e5e7eb',
    'nav-text': isDark ? '#f9fafb' : '#111827',
    'nav-text-hover': isDark ? '#e5e7eb' : '#4b5563',
    'nav-bg-hover': isDark ? '#1f2937' : '#f3f4f6',
    'nav-bg-active': isDark ? '#374151' : '#e5e7eb',
    'nav-text-active': isDark ? '#ffffff' : '#111827',
    'nav-icon': isDark ? '#9ca3af' : '#6b7280',
    'nav-icon-active': isDark ? '#ffffff' : '#111827',
    'nav-icon-hover': isDark ? '#e5e7eb' : '#4b5563',
    'nav-section-text': isDark ? '#9ca3af' : '#6b7280',
    'nav-count': isDark ? '#9ca3af' : '#6b7280',
  };

  // Generate spacing scale
  const spacing = {
    xxs: `${baseSpacing * 0.5}px`,
    xs: `${baseSpacing}px`,
    sm: `${baseSpacing * 2}px`,
    md: `${baseSpacing * 3}px`,
    lg: `${baseSpacing * 4}px`,
    xl: `${baseSpacing * 6}px`,
    xxl: `${baseSpacing * 8}px`,
  };

  // Generate radius scale
  const radius = {
    sm: `${baseRadius * 0.5}px`,
    DEFAULT: `${baseRadius}px`,
    md: `${baseRadius}px`,
    lg: `${baseRadius * 2}px`,
    xl: `${baseRadius * 4}px`,
    '2xl': `${baseRadius * 8}px`,
    full: '9999px',
  };

  // Generate shadow scale
  const shadows = {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  };

  // Generate speed scale for animations
  const speeds = {
    fastest: '75ms',
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
    slowest: '500ms',
  };

  // Typography scale
  const typography: ThemeTypography = {
    fontFamily: {
      sans: fontFamily.sans || 'Inter, system-ui, sans-serif',
      mono: fontFamily.mono || 'JetBrains Mono, monospace',
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }] as [string, { lineHeight: string }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }] as [string, { lineHeight: string }],
      base: ['1rem', { lineHeight: '1.5rem' }] as [string, { lineHeight: string }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }] as [string, { lineHeight: string }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }] as [string, { lineHeight: string }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }] as [string, { lineHeight: string }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }] as [string, { lineHeight: string }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }] as [string, { lineHeight: string }],
      '5xl': ['3rem', { lineHeight: '1' }] as [string, { lineHeight: string }],
    },
  };

  return {
    name: `Theme-${primaryColor.slice(1)}`,
    colors: {
      ...baseColors,
      ...stateColors,
      ...buttonColors,
      ...navColors,
      primary: primaryScale[500],
      'primary-foreground': isDark ? '#ffffff' : '#ffffff',
      secondary: secondaryScale[500],
      'secondary-foreground': isDark ? '#ffffff' : '#ffffff',
      accent: accentScale[500],
      'accent-foreground': isDark ? '#ffffff' : '#ffffff',
      ...Object.entries(primaryScale).reduce((acc, [key, value]) => ({
        ...acc,
        [`primary-${key}`]: value,
      }), {}),
      ...Object.entries(secondaryScale).reduce((acc, [key, value]) => ({
        ...acc,
        [`secondary-${key}`]: value,
      }), {}),
      ...Object.entries(accentScale).reduce((acc, [key, value]) => ({
        ...acc,
        [`accent-${key}`]: value,
      }), {}),
    },
    typography,
    spacing,
    radius,
    shadows,
    speeds,
  };
}

/**
 * Convert hex to RGB values
 */
function hexToRGBValues(hex: string): string {
  const rgb = hexToRGB(hex);
  if (!rgb) return '0 0 0';
  return `${rgb.r} ${rgb.g} ${rgb.b}`;
}

/**
 * Generate CSS variables from a theme
 */
export function generateThemeCSS(theme: Theme): string {
  let css = ':root {\n';

  // Colors - using RGB values for opacity support
  Object.entries(theme.colors).forEach(([key, value]) => {
    css += `  --${key}: ${hexToRGBValues(value)};\n`;
  });

  // Typography
  Object.entries(theme.typography.fontFamily).forEach(([key, value]) => {
    css += `  --font-${key}: ${value};\n`;
  });

  Object.entries(theme.typography.fontSize).forEach(([key, [size, { lineHeight }]]) => {
    css += `  --font-size-${key}: ${size};\n`;
    css += `  --line-height-${key}: ${lineHeight};\n`;
  });

  // Spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    css += `  --spacing-${key}: ${value};\n`;
  });

  // Radius
  Object.entries(theme.radius).forEach(([key, value]) => {
    css += `  --radius-${key}: ${value};\n`;
  });

  // Shadows
  Object.entries(theme.shadows).forEach(([key, value]) => {
    css += `  --shadow-${key}: ${value};\n`;
  });

  // Speeds
  Object.entries(theme.speeds).forEach(([key, value]) => {
    css += `  --speed-${key}: ${value};\n`;
  });

  css += '}\n';
  return css;
}

/**
 * Apply theme to the DOM
 */
export function applyTheme(theme: Theme, target: HTMLElement = document.documentElement): void {
  const css = generateThemeCSS(theme);
  
  // Remove any existing theme style tag
  const existingStyle = document.getElementById('theme-style');
  if (existingStyle) {
    existingStyle.remove();
  }

  // Create and append new style tag
  const style = document.createElement('style');
  style.id = 'theme-style';
  style.textContent = css;
  document.head.appendChild(style);
} 