import { useTheme as useThemeContext } from '../themes/providers/ThemeContext';

export const useTheme = useThemeContext;

// Additional theme helper functions
export function getThemeValue<T>(path: string, defaultValue?: T): T | undefined {
  const { theme } = useThemeContext();
  
  // Handle dot notation for nested properties (e.g., "colors.primary")
  const parts = path.split('.');
  let value: any = theme;
  
  for (const part of parts) {
    if (value === undefined || value === null) return defaultValue;
    value = value[part];
  }
  
  return value !== undefined ? value : defaultValue;
}

// Helper to get CSS variable format from theme
export function getCssVar(path: string, defaultValue?: string): string {
  const value = getThemeValue<string>(path, defaultValue);
  return value || defaultValue || '';
}

// Get custom class based on theme value
export function getThemeClass(prefix: string, key: string): string {
  const { theme } = useThemeContext();
  const themeName = theme.name;
  return `${prefix}-${themeName}-${key}`;
} 