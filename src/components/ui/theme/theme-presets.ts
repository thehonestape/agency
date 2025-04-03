/**
 * Theme Presets
 * Predefined color schemes that can be applied to the application
 */

import { colorTokens } from './tokens';

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: typeof colorTokens.primary;
    secondary: typeof colorTokens.secondary;
    accent: typeof colorTokens.accent;
  };
}

// Blue theme (default)
export const blueTheme: ThemePreset = {
  id: 'blue',
  name: 'Blue',
  description: 'Default blue theme with neutral gray secondary colors',
  colors: {
    primary: colorTokens.primary,
    secondary: colorTokens.secondary,
    accent: colorTokens.accent,
  }
};

// Purple theme
export const purpleTheme: ThemePreset = {
  id: 'purple',
  name: 'Purple',
  description: 'Rich purple theme with soft gray secondary colors',
  colors: {
    primary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#581c87',
      950: '#3b0764',
    },
    secondary: colorTokens.secondary,
    accent: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
      950: '#431407',
    },
  }
};

// Teal theme
export const tealTheme: ThemePreset = {
  id: 'teal',
  name: 'Teal',
  description: 'Calming teal theme with neutral gray secondary colors',
  colors: {
    primary: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6',
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a',
      950: '#042f2e',
    },
    secondary: colorTokens.secondary,
    accent: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
      950: '#4a044e',
    },
  }
};

// Green theme
export const greenTheme: ThemePreset = {
  id: 'green',
  name: 'Green',
  description: 'Fresh green theme with neutral gray secondary colors',
  colors: {
    primary: colorTokens.success,
    secondary: colorTokens.secondary,
    accent: colorTokens.warning,
  }
};

// Collection of all available theme presets
export const themePresets: Record<string, ThemePreset> = {
  blue: blueTheme,
  purple: purpleTheme,
  teal: tealTheme,
  green: greenTheme,
};

// Helper function to get a theme preset by ID
export function getThemePreset(presetId: string): ThemePreset {
  return themePresets[presetId] || blueTheme;
}
