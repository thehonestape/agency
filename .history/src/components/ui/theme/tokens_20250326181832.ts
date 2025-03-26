/**
 * Theme tokens based on HSL color model for improved color manipulation
 * This system uses CSS variables with HSL values for dynamic theme switching
 */

export interface HSLColor {
  h: number; // hue (0-360)
  s: number; // saturation (0-100)
  l: number; // lightness (0-100)
}

// Helper to convert HSL object to CSS HSL string
export const hslToString = (hsl: HSLColor): string => {
  return `${hsl.h} ${hsl.s}% ${hsl.l}%`;
};

// Core color tokens as HSL values
export const colorTokens = {
  // Neutral colors
  neutral: {
    50: { h: 220, s: 20, l: 98 },
    100: { h: 220, s: 15, l: 95 },
    200: { h: 220, s: 15, l: 90 },
    300: { h: 220, s: 10, l: 83 },
    400: { h: 220, s: 8, l: 70 },
    500: { h: 220, s: 8, l: 55 },
    600: { h: 220, s: 10, l: 43 },
    700: { h: 220, s: 15, l: 33 },
    800: { h: 220, s: 20, l: 23 },
    900: { h: 220, s: 25, l: 16 },
    950: { h: 220, s: 30, l: 10 },
  },

  // Primary brand color
  primary: {
    50: { h: 210, s: 100, l: 95 },
    100: { h: 210, s: 90, l: 90 },
    200: { h: 210, s: 80, l: 85 },
    300: { h: 210, s: 70, l: 70 },
    400: { h: 210, s: 70, l: 60 },
    500: { h: 210, s: 80, l: 50 },
    600: { h: 210, s: 85, l: 45 },
    700: { h: 210, s: 90, l: 35 },
    800: { h: 210, s: 95, l: 25 },
    900: { h: 210, s: 100, l: 20 },
    950: { h: 210, s: 100, l: 15 },
  },

  // Secondary color
  secondary: {
    50: { h: 250, s: 95, l: 95 },
    100: { h: 250, s: 90, l: 90 },
    200: { h: 250, s: 80, l: 85 },
    300: { h: 250, s: 70, l: 75 },
    400: { h: 250, s: 70, l: 65 },
    500: { h: 250, s: 75, l: 55 },
    600: { h: 250, s: 80, l: 45 },
    700: { h: 250, s: 85, l: 35 },
    800: { h: 250, s: 90, l: 25 },
    900: { h: 250, s: 95, l: 20 },
    950: { h: 250, s: 95, l: 15 },
  },

  // Accent color
  accent: {
    50: { h: 280, s: 85, l: 95 },
    100: { h: 280, s: 80, l: 90 },
    200: { h: 280, s: 75, l: 85 },
    300: { h: 280, s: 70, l: 75 },
    400: { h: 280, s: 70, l: 65 },
    500: { h: 280, s: 75, l: 55 },
    600: { h: 280, s: 80, l: 45 },
    700: { h: 280, s: 85, l: 35 },
    800: { h: 280, s: 90, l: 25 },
    900: { h: 280, s: 95, l: 20 },
    950: { h: 280, s: 95, l: 15 },
  },

  // Success color
  success: {
    50: { h: 145, s: 95, l: 95 },
    100: { h: 145, s: 85, l: 90 },
    200: { h: 145, s: 75, l: 85 },
    300: { h: 145, s: 65, l: 75 },
    400: { h: 145, s: 65, l: 60 },
    500: { h: 145, s: 70, l: 45 },
    600: { h: 145, s: 75, l: 40 },
    700: { h: 145, s: 80, l: 30 },
    800: { h: 145, s: 85, l: 25 },
    900: { h: 145, s: 90, l: 20 },
    950: { h: 145, s: 95, l: 15 },
  },

  // Error color
  error: {
    50: { h: 0, s: 95, l: 95 },
    100: { h: 0, s: 90, l: 90 },
    200: { h: 0, s: 85, l: 85 },
    300: { h: 0, s: 80, l: 75 },
    400: { h: 0, s: 80, l: 65 },
    500: { h: 0, s: 85, l: 55 },
    600: { h: 0, s: 90, l: 48 },
    700: { h: 0, s: 95, l: 40 },
    800: { h: 0, s: 95, l: 30 },
    900: { h: 0, s: 95, l: 25 },
    950: { h: 0, s: 95, l: 20 },
  },

  // Warning color
  warning: {
    50: { h: 45, s: 95, l: 95 },
    100: { h: 45, s: 90, l: 90 },
    200: { h: 45, s: 85, l: 85 },
    300: { h: 45, s: 80, l: 75 },
    400: { h: 45, s: 85, l: 65 },
    500: { h: 45, s: 90, l: 55 },
    600: { h: 45, s: 95, l: 48 },
    700: { h: 45, s: 95, l: 40 },
    800: { h: 45, s: 95, l: 35 },
    900: { h: 45, s: 95, l: 30 },
    950: { h: 45, s: 95, l: 25 },
  },

  // Info color
  info: {
    50: { h: 200, s: 95, l: 95 },
    100: { h: 200, s: 90, l: 90 },
    200: { h: 200, s: 85, l: 85 },
    300: { h: 200, s: 80, l: 75 },
    400: { h: 200, s: 75, l: 65 },
    500: { h: 200, s: 80, l: 55 },
    600: { h: 200, s: 85, l: 48 },
    700: { h: 200, s: 90, l: 40 },
    800: { h: 200, s: 95, l: 35 },
    900: { h: 200, s: 95, l: 30 },
    950: { h: 200, s: 95, l: 25 },
  },
};

// Default theme configuration
export const defaultTheme = {
  light: {
    // Background colors
    background: {
      base: colorTokens.neutral[50],
      subtle: colorTokens.neutral[100],
      muted: colorTokens.neutral[200],
      emphasized: colorTokens.neutral[300],
    },
    // Foreground/text colors
    foreground: {
      base: colorTokens.neutral[900],
      muted: colorTokens.neutral[700],
      subtle: colorTokens.neutral[500],
      accent: colorTokens.primary[700],
    },
    // Border colors
    border: {
      base: colorTokens.neutral[200],
      subtle: colorTokens.neutral[100],
      emphasized: colorTokens.neutral[300],
      focus: colorTokens.primary[500],
    },
    // Interactive element colors
    interactive: {
      base: colorTokens.primary[600],
      hover: colorTokens.primary[700],
      active: colorTokens.primary[800],
      muted: colorTokens.primary[50],
    },
    // Status colors
    status: {
      success: colorTokens.success[600],
      error: colorTokens.error[600],
      warning: colorTokens.warning[500],
      info: colorTokens.info[500],
    },
  },
  dark: {
    // Background colors
    background: {
      base: colorTokens.neutral[950],
      subtle: colorTokens.neutral[900],
      muted: colorTokens.neutral[800],
      emphasized: colorTokens.neutral[700],
    },
    // Foreground/text colors
    foreground: {
      base: colorTokens.neutral[50],
      muted: colorTokens.neutral[400],
      subtle: colorTokens.neutral[500],
      accent: colorTokens.primary[400],
    },
    // Border colors
    border: {
      base: colorTokens.neutral[700],
      subtle: colorTokens.neutral[800],
      emphasized: colorTokens.neutral[600],
      focus: colorTokens.primary[500],
    },
    // Interactive element colors
    interactive: {
      base: colorTokens.primary[500],
      hover: colorTokens.primary[400],
      active: colorTokens.primary[300],
      muted: { h: colorTokens.primary[950].h, s: colorTokens.primary[950].s, l: 15 },
    },
    // Status colors
    status: {
      success: colorTokens.success[500],
      error: colorTokens.error[500],
      warning: colorTokens.warning[400],
      info: colorTokens.info[400],
    },
  },
};

export default defaultTheme; 