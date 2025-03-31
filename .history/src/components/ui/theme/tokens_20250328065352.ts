/**
 * Theme tokens based on Tailwind's color palette
 * This system uses CSS variables for dynamic theme switching
 */

// Core color tokens
export const colorTokens = {
  // Neutral colors
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },

  // Primary brand color
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },

  // Secondary color
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },

  // Accent color
  accent: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
    950: '#500724',
  },

  // Success color
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },

  // Error color
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },

  // Warning color
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },

  // Info color
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
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
      muted: colorTokens.primary[950],
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