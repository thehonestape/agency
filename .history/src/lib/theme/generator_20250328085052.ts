import { Theme, ThemeConfig, ThemeMode, ThemeTypography, ThemeColors } from './types';

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
  const scales = {
    50: 2.5,    // Lightest - multiplies RGB values to make them lighter
    100: 2.0,
    200: 1.75,
    300: 1.5,
    400: 1.25,
    500: 1.0,   // Base color - no adjustment
    600: 0.85,
    700: 0.7,
    800: 0.55,
    900: 0.4,
    950: 0.25,  // Darkest - reduces RGB values to make them darker
  };

  return Object.entries(scales).reduce((acc, [key, value]) => ({
    ...acc,
    [key]: adjustLightness(baseColor, value),
  }), {});
}

/**
 * Calculate relative luminance of a color
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(val => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 */
function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRGB(color1);
  const rgb2 = hexToRGB(color2);
  if (!rgb1 || !rgb2) return 0;

  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Ensure a color meets contrast requirements against a background
 */
function ensureContrastRatio(foreground: string, background: string, minRatio: number = 4.5): string {
  const ratio = getContrastRatio(foreground, background);
  if (ratio >= minRatio) return foreground;

  // If contrast is too low, adjust the color
  const rgb = hexToRGB(foreground);
  if (!rgb) return foreground;

  // Adjust lightness until we meet the contrast ratio
  let adjusted = foreground;
  let currentRatio = ratio;
  let attempts = 0;
  const maxAttempts = 10;

  while (currentRatio < minRatio && attempts < maxAttempts) {
    const isDark = getLuminance(rgb.r, rgb.g, rgb.b) < 0.5;
    adjusted = adjustLightness(adjusted, isDark ? 0.9 : 1.1);
    currentRatio = getContrastRatio(adjusted, background);
    attempts++;
  }

  return adjusted;
}

/**
 * Generate semantic color tokens
 */
function generateSemanticColors(
  primaryColor: string,
  secondaryColor: string,
  accentColor: string,
  isDark: boolean
): Record<string, string> {
  const baseColors = {
    // Base colors
    primary: primaryColor,
    secondary: secondaryColor,
    accent: accentColor,
    
    // UI colors
    background: isDark ? '#111827' : '#ffffff',
    foreground: isDark ? '#f9fafb' : '#111827',
    card: isDark ? '#1f2937' : '#ffffff',
    muted: isDark ? '#1f2937' : '#f3f4f6',
    border: isDark ? '#374151' : '#e5e7eb',
    input: isDark ? '#1f2937' : '#ffffff',
    popover: isDark ? '#1f2937' : '#ffffff',
    ring: '#3b82f6',
    
    // State colors
    destructive: '#ef4444',
    success: '#22c55e',
    warning: '#f59e0b',
    info: '#3b82f6',
  };

  // Generate foreground colors with proper contrast
  return Object.entries(baseColors).reduce((acc, [key, value]) => {
    const foregroundKey = `${key}-foreground`;
    const foregroundValue = isDark ? '#ffffff' : '#000000';
    
    return {
      ...acc,
      [key]: value,
      [foregroundKey]: ensureContrastRatio(foregroundValue, value),
    };
  }, {});
}

/**
 * Generate navigation colors
 */
function generateNavigationColors(isDark: boolean): Record<string, string> {
  const base = isDark ? '#1f2937' : '#ffffff';
  const border = isDark ? '#374151' : '#e5e7eb';
  const text = isDark ? '#f9fafb' : '#111827';
  const muted = isDark ? '#9ca3af' : '#6b7280';

  return {
    'nav-bg': base,
    'nav-border': border,
    'nav-text': text,
    'nav-text-hover': isDark ? '#ffffff' : '#000000',
    'nav-bg-hover': isDark ? '#374151' : '#f3f4f6',
    'nav-bg-active': isDark ? '#374151' : '#f3f4f6',
    'nav-text-active': isDark ? '#ffffff' : '#000000',
    'nav-icon': muted,
    'nav-icon-active': isDark ? '#ffffff' : '#000000',
    'nav-icon-hover': isDark ? '#ffffff' : '#000000',
    'nav-section-text': muted,
    'nav-count': muted,
  };
}

// Default font stacks
const DEFAULT_FONTS = {
  sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  sansAlt: 'Poppins, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  sansDisplay: 'Clash Display, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  serif: 'Merriweather, Georgia, Cambria, "Times New Roman", Times, serif',
  serifAlt: 'Playfair Display, Georgia, Cambria, "Times New Roman", Times, serif',
  serifDisplay: 'Fraunces, Georgia, Cambria, "Times New Roman", Times, serif',
  mono: 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  monoAlt: 'Fira Code, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  heading: 'Clash Display, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  body: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  code: 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  ui: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

// Default typography settings
const DEFAULT_TYPOGRAPHY = {
  fontFamily: {
    sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    sansAlt: 'Poppins, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    sansDisplay: 'Clash Display, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    serif: 'Merriweather, Georgia, Cambria, "Times New Roman", Times, serif',
    serifAlt: 'Playfair Display, Georgia, Cambria, "Times New Roman", Times, serif',
    serifDisplay: 'Fraunces, Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    monoAlt: 'Fira Code, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    heading: 'Clash Display, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    body: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    code: 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    ui: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  fontFeatureSettings: {
    ligatures: true,
    kerning: true,
    contextual: true,
    oldstyleNums: false,
    liningNums: true,
    tabularNums: false,
    proportionalNums: true,
    diagonalFractions: true,
    ordinal: true,
    slashedZero: true,
    stylistic: false,
    swash: false,
    titling: false,
  },
  fontVariationSettings: {
    weight: 400,
    width: 100,
    slant: 0,
    optical: 0,
    grade: 0,
  },
  scale: {
    base: 16,
    ratio: 1.25,
    unit: 'rem',
  },
  paragraph: {
    indent: '1.5em',
    maxWidth: '65ch',
    marginBottom: '1.5em',
  },
  heading: {
    fontFamily: 'var(--font-heading)',
    fontWeight: '700',
    lineHeight: '1.2',
    letterSpacing: '-0.02em',
    marginBottom: '1em',
  },
  list: {
    indent: '1.5em',
    markerColor: 'currentColor',
    markerStyle: 'disc',
  },
  link: {
    color: 'var(--color-primary)',
    decoration: 'none',
    hoverColor: 'var(--color-primary-600)',
    hoverDecoration: 'underline',
  },
  code: {
    fontFamily: 'var(--font-code)',
    fontSize: '0.875em',
    lineHeight: '1.5',
    padding: '0.2em 0.4em',
    borderRadius: '0.25rem',
    backgroundColor: 'var(--color-muted)',
  },
};

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
      sans: DEFAULT_TYPOGRAPHY.fontFamily.sans,
      display: DEFAULT_TYPOGRAPHY.fontFamily.sansDisplay,
      mono: DEFAULT_TYPOGRAPHY.fontFamily.mono,
      sansAlt: DEFAULT_TYPOGRAPHY.fontFamily.sansAlt,
      serif: DEFAULT_TYPOGRAPHY.fontFamily.serif,
      serifAlt: DEFAULT_TYPOGRAPHY.fontFamily.serifAlt,
    },
    baseSpacing = 4,
    baseRadius = 4,
  } = config;

  // Generate color scales
  const primaryScale = generateColorScale(primaryColor);
  const secondaryScale = generateColorScale(secondaryColor);
  const accentScale = generateColorScale(accentColor);

  // Generate semantic colors
  const isDark = mode === 'dark';
  const semanticColors = generateSemanticColors(primaryColor, secondaryColor, accentColor, isDark);
  const navigationColors = generateNavigationColors(isDark);

  // Combine all colors
  const colors: ThemeColors = {
    ...semanticColors,
    ...navigationColors,
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
      sans: fontFamily.sans || DEFAULT_TYPOGRAPHY.fontFamily.sans,
      display: fontFamily.display || DEFAULT_TYPOGRAPHY.fontFamily.sansDisplay,
      mono: fontFamily.mono || DEFAULT_TYPOGRAPHY.fontFamily.mono,
      sansAlt: fontFamily.sansAlt || DEFAULT_TYPOGRAPHY.fontFamily.sansAlt,
      serif: fontFamily.serif || DEFAULT_TYPOGRAPHY.fontFamily.serif,
      serifAlt: fontFamily.serifAlt || DEFAULT_TYPOGRAPHY.fontFamily.serifAlt,
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    fontFeatureSettings: DEFAULT_TYPOGRAPHY.fontFeatureSettings,
    fontVariationSettings: DEFAULT_TYPOGRAPHY.fontVariationSettings,
    scale: DEFAULT_TYPOGRAPHY.scale,
    spacing: {
      paragraph: '1.5em',
      heading: '1em',
      list: '1em',
      maxWidth: '65ch',
      indent: '1.5em',
    },
    components: {
      heading: {
        fontFamily: 'var(--font-display)',
        fontWeight: '700',
        lineHeight: '1.2',
        letterSpacing: '-0.02em',
      },
      link: {
        color: 'var(--color-primary)',
        decoration: 'none',
        hoverColor: 'var(--color-primary-600)',
        hoverDecoration: 'underline',
      },
      code: {
        fontSize: '0.875em',
        padding: '0.2em 0.4em',
        borderRadius: '0.25rem',
        backgroundColor: 'var(--color-muted)',
      },
    },
  };

  return {
    name: `Theme-${primaryColor.slice(1)}`,
    colors: colors as ThemeColors,
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

  // Font sizes
  Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
    css += `  --font-size-${key}: ${value};\n`;
  });

  // Line heights
  Object.entries(theme.typography.lineHeight).forEach(([key, value]) => {
    css += `  --line-height-${key}: ${value};\n`;
  });

  // Letter spacing
  Object.entries(theme.typography.letterSpacing).forEach(([key, value]) => {
    css += `  --letter-spacing-${key}: ${value};\n`;
  });

  // Font feature settings
  const featureSettings = Object.entries(theme.typography.fontFeatureSettings)
    .filter(([_, value]) => value)
    .map(([key]) => `"${key}" 1`)
    .join(', ');
  css += `  --font-feature-settings: ${featureSettings};\n`;

  // Font variation settings
  const variationSettings = Object.entries(theme.typography.fontVariationSettings)
    .map(([key, value]) => `"${key}" ${value}`)
    .join(', ');
  css += `  --font-variation-settings: ${variationSettings};\n`;

  // Typography scale
  Object.entries(theme.typography.scale).forEach(([key, value]) => {
    css += `  --scale-${key}: ${value};\n`;
  });

  // Spacing
  Object.entries(theme.typography.spacing).forEach(([key, value]) => {
    css += `  --spacing-${key}: ${value};\n`;
  });

  // Component styles
  Object.entries(theme.typography.components).forEach(([component, styles]) => {
    Object.entries(styles).forEach(([key, value]) => {
      css += `  --${component}-${key}: ${value};\n`;
    });
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