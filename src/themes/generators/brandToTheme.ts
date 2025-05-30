import { Theme } from '../types';

export interface BrandData {
  name: string;
  colors: {
    primary: string;
    secondary?: string;
    accent?: string;
    background?: string;
    text?: string;
    [key: string]: string | undefined;
  };
  typography: {
    headingFont?: string;
    bodyFont?: string;
    baseSize?: number;
    scale?: number;
    lineHeight?: number;
  };
  spacing?: {
    baseUnit?: number;
    density?: 'compact' | 'comfortable' | 'spacious';
  };
  radius?: {
    base?: number;
  };
  mode?: 'light' | 'dark' | 'system';
}

/**
 * Generate a color palette based on a primary color
 * This creates semantic colors like success, warning, etc.
 */
export function generateColorPalette(primaryColor: string, mode: 'light' | 'dark' = 'light') {
  // Convert hex to HSL for easier manipulation
  const primaryHSL = hexToHSL(primaryColor);
  const [h, s, l] = primaryHSL.split(' ').map(val => 
    parseFloat(val.replace('%', ''))
  );

  // Generate semantic colors based on hue shifts
  const palette = {
    primary: `${h} ${s}% ${l}%`,
    secondary: `${(h + 30) % 360} ${s}% ${l}%`,
    accent: `${(h + 60) % 360} ${s}% ${l}%`,
    success: `${120} ${s}% ${l}%`,
    warning: `${40} ${s}% ${l}%`,
    danger: `${0} ${s}% ${l}%`,
    info: `${200} ${s}% ${l}%`,
  };

  // Generate background, text and border colors based on mode
  if (mode === 'light') {
    return {
      ...palette,
      background: '0 0% 100%', // White in HSL
      text: '0 0% 10%', // Near black
      muted: '0 0% 95%',
      mutedForeground: '0 0% 45%',
      border: '0 0% 90%',
      card: '0 0% 100%',
      cardForeground: '0 0% 10%',
    };
  } else {
    return {
      ...palette,
      background: '0 0% 10%', // Near black in HSL
      text: '0 0% 95%', // Near white
      muted: '0 0% 20%',
      mutedForeground: '0 0% 65%',
      border: '0 0% 25%',
      card: '0 0% 15%',
      cardForeground: '0 0% 95%',
    };
  }
}

/**
 * Generate spacing scale based on base unit and density preference
 */
export function generateSpacingScale(baseUnit: number = 4, density: 'compact' | 'comfortable' | 'spacious' = 'comfortable') {
  // Density multipliers
  const densityMap = {
    compact: 0.85,
    comfortable: 1,
    spacious: 1.25
  };
  
  const multiplier = densityMap[density];
  const unit = baseUnit * multiplier;
  
  return {
    xxs: `${unit * 0.25}px`,
    xs: `${unit * 0.5}px`,
    sm: `${unit}px`,
    md: `${unit * 2}px`,
    lg: `${unit * 3}px`,
    xl: `${unit * 5}px`,
    xxl: `${unit * 8}px`,
  };
}

/**
 * Generate border radius scale based on a base value
 */
export function generateRadiusScale(base: number = 0.5) {
  return {
    sm: `${base * 0.5}rem`,
    md: `${base}rem`,
    lg: `${base * 1.5}rem`,
    xl: `${base * 2}rem`,
    full: '9999px',
  };
}

/**
 * Generate shadow scale
 */
export function generateShadowScale(intensity: number = 1, colorMode: 'light' | 'dark' = 'light') {
  const shadowColor = colorMode === 'light' 
    ? 'rgba(0, 0, 0, 0.1)' 
    : 'rgba(0, 0, 0, 0.3)';
  
  return {
    sm: `0 1px ${2 * intensity}px ${shadowColor}`,
    md: `0 ${2 * intensity}px ${4 * intensity}px ${shadowColor}`,
    lg: `0 ${4 * intensity}px ${8 * intensity}px ${shadowColor}`,
    xl: `0 ${6 * intensity}px ${12 * intensity}px ${shadowColor}`,
  };
}

/**
 * Convert hex color to HSL format
 */
export function hexToHSL(hex: string): string {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  // Find max and min values for lightness
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h = h / 6;
  }
  
  // Convert to HSL format
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  
  return `${h} ${s}% ${l}%`;
}

/**
 * Convert HSL string to hex color
 */
export function HSLToHex(hsl: string): string {
  // Parse HSL values
  const [h, s, l] = hsl.split(' ').map(v => parseFloat(v.replace('%', '')));
  
  // Convert to 0-1 range
  const hNorm = h / 360;
  const sNorm = s / 100;
  const lNorm = l / 100;
  
  // Calculations
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs((hNorm * 6) % 2 - 1));
  const m = lNorm - c / 2;
  
  let r, g, b;
  
  if (hNorm < 1/6) {
    [r, g, b] = [c, x, 0];
  } else if (hNorm < 2/6) {
    [r, g, b] = [x, c, 0];
  } else if (hNorm < 3/6) {
    [r, g, b] = [0, c, x];
  } else if (hNorm < 4/6) {
    [r, g, b] = [0, x, c];
  } else if (hNorm < 5/6) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }
  
  // Convert to 0-255 range and then to hex
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Main function to generate a theme from brand data
 */
export function generateThemeFromBrand(brand: BrandData): Theme {
  // Default values if not provided
  const primaryColor = brand.colors.primary || '#000000';
  const mode = brand.mode || 'light';
  const headingFont = brand.typography.headingFont || 'Inter';
  const bodyFont = brand.typography.bodyFont || 'Inter';
  const baseUnit = brand.spacing?.baseUnit || 4;
  const density = brand.spacing?.density || 'comfortable';
  const baseRadius = brand.radius?.base || 0.5;
  
  // Generate color palette
  const colorPalette = generateColorPalette(primaryColor, mode as 'light' | 'dark');
  
  // Generate spacing scale
  const spacing = generateSpacingScale(baseUnit, density);
  
  // Generate radius scale
  const radius = generateRadiusScale(baseRadius);
  
  // Generate shadow scale
  const shadows = generateShadowScale(1, mode as 'light' | 'dark');
  
  // Construct and return the theme
  return {
    name: brand.name || 'Generated Theme',
    colors: {
      primary: HSLToHex(colorPalette.primary),
      secondary: HSLToHex(colorPalette.secondary),
      accent: HSLToHex(colorPalette.accent),
      background: HSLToHex(colorPalette.background),
      text: HSLToHex(colorPalette.text),
      muted: HSLToHex(colorPalette.muted),
      border: HSLToHex(colorPalette.border),
      danger: HSLToHex(colorPalette.danger),
      success: HSLToHex(colorPalette.success),
      warning: HSLToHex(colorPalette.warning),
      info: HSLToHex(colorPalette.info),
    },
    radius,
    fonts: {
      heading: headingFont,
      body: bodyFont,
      mono: 'JetBrains Mono, monospace',
    },
    spacing,
    shadows,
  };
}

/**
 * Generate CSS variables from a theme object
 */
export function generateCssVariables(theme: Theme): string {
  let css = ':root {\n';
  
  // Colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    css += `  --color-${key}: ${value};\n`;
  });
  
  // Border radius
  Object.entries(theme.radius).forEach(([key, value]) => {
    css += `  --radius-${key}: ${value};\n`;
  });
  
  // Spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    css += `  --spacing-${key}: ${value};\n`;
  });
  
  // Shadows
  Object.entries(theme.shadows).forEach(([key, value]) => {
    css += `  --shadow-${key}: ${value};\n`;
  });
  
  // Typography
  Object.entries(theme.fonts).forEach(([key, value]) => {
    css += `  --font-${key}: ${value};\n`;
  });
  
  css += '}\n';
  return css;
}

/**
 * Apply theme to the DOM by generating and inserting CSS variables
 */
export function applyThemeToDom(theme: Theme, target: HTMLElement = document.documentElement): void {
  // Apply colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    target.style.setProperty(`--color-${key}`, value);
  });
  
  // Apply radius
  Object.entries(theme.radius).forEach(([key, value]) => {
    target.style.setProperty(`--radius-${key}`, value);
  });
  
  // Apply spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    target.style.setProperty(`--spacing-${key}`, value);
  });
  
  // Apply shadows
  Object.entries(theme.shadows).forEach(([key, value]) => {
    target.style.setProperty(`--shadow-${key}`, value);
  });
  
  // Apply typography
  Object.entries(theme.fonts).forEach(([key, value]) => {
    target.style.setProperty(`--font-${key}`, value);
  });
} 