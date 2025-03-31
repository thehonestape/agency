import React, { createContext, useContext } from 'react';
import { Theme, ThemeConfig, ThemeMode } from './types';
import { useTheme } from './useTheme';

interface ThemeContextValue {
  theme: Theme;
  config: ThemeConfig;
  updateConfig: (config: Partial<ThemeConfig>) => void;
  setMode: (mode: ThemeMode) => void;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  setAccentColor: (color: string) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultConfig?: ThemeConfig;
  storageKey?: string;
}

export function ThemeProvider({ children, defaultConfig, storageKey }: ThemeProviderProps) {
  const theme = useTheme({ defaultConfig, storageKey });

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
} 