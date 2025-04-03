/**
 * Theme tokens based on Tailwind's color palette
 * Using direct hex values for better compatibility with Tailwind v4
 */

import { baseColors } from '@/tokens/base/colors';

// Color tokens for theme system
export const colorTokens = {
  primary: baseColors.blue[600],
  secondary: baseColors.gray[600],
  accent: baseColors.amber[500],
  success: baseColors.green[600],
  warning: baseColors.amber[500],
  error: baseColors.red[600],
  info: baseColors.blue[500]
};

// Default theme configuration
export const defaultTheme = {
  light: {
    // Background colors
    background: {
      base: baseColors.gray[50],
      subtle: baseColors.gray[100],
      muted: baseColors.gray[200],
      emphasized: baseColors.gray[300],
    },
    // Foreground/text colors
    foreground: {
      base: baseColors.gray[900],
      muted: baseColors.gray[700],
      subtle: baseColors.gray[500],
      accent: baseColors.blue[700],
    },
    // Border colors
    border: {
      base: baseColors.gray[200],
      subtle: baseColors.gray[100],
      emphasized: baseColors.gray[300],
      focus: baseColors.blue[500],
    },
    // Interactive element colors
    interactive: {
      base: baseColors.blue[600],
      hover: baseColors.blue[700],
      active: baseColors.blue[800],
      muted: baseColors.blue[50],
    },
    // Status colors
    status: {
      success: baseColors.green[600],
      error: baseColors.red[600],
      warning: baseColors.amber[500],
      info: baseColors.blue[500],
    },
  },
  dark: {
    // Background colors
    background: {
      base: baseColors.gray[950],
      subtle: baseColors.gray[900],
      muted: baseColors.gray[800],
      emphasized: baseColors.gray[700],
    },
    // Foreground/text colors
    foreground: {
      base: baseColors.gray[50],
      muted: baseColors.gray[400],
      subtle: baseColors.gray[500],
      accent: baseColors.blue[400],
    },
    // Border colors
    border: {
      base: baseColors.gray[700],
      subtle: baseColors.gray[800],
      emphasized: baseColors.gray[600],
      focus: baseColors.blue[500],
    },
    // Interactive element colors
    interactive: {
      base: baseColors.blue[500],
      hover: baseColors.blue[400],
      active: baseColors.blue[300],
      muted: baseColors.gray[800],
    },
    // Status colors
    status: {
      success: baseColors.green[500],
      error: baseColors.red[500],
      warning: baseColors.amber[500],
      info: baseColors.blue[500],
    },
  },
};

export default defaultTheme;