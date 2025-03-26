import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, ThemeContextValue, ThemeMode } from '../types';
import salientTheme from '../salient/theme.config';
import protocolTheme from '../protocol/theme.config';

// Default theme
const defaultTheme = salientTheme;

// Create context
export const ThemeContext = createContext<ThemeContextValue>({
  theme: defaultTheme,
  setTheme: () => {},
});

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  defaultMode?: ThemeMode;
}

export const ThemeProvider = ({ 
  children, 
  defaultTheme = salientTheme,
  defaultMode = 'system' 
}: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mode, setMode] = useState<ThemeMode>(defaultMode);
  
  // Function to set theme
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('app-theme', newTheme.name);
  };
  
  // Function to set mode
  const setThemeMode = (newMode: ThemeMode) => {
    setMode(newMode);
    localStorage.setItem('app-theme-mode', newMode);
    
    // If system, detect user preference
    if (newMode === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDark ? protocolTheme : salientTheme);
    } else if (newMode === 'dark') {
      setTheme(protocolTheme);
    } else {
      setTheme(salientTheme);
    }
  };
  
  // Handle system preference changes
  useEffect(() => {
    if (mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e: MediaQueryListEvent) => {
        setTheme(e.matches ? protocolTheme : salientTheme);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [mode]);
  
  // Initialize theme from localStorage on mount
  useEffect(() => {
    const savedThemeName = localStorage.getItem('app-theme');
    const savedThemeMode = localStorage.getItem('app-theme-mode') as ThemeMode;
    
    if (savedThemeMode) {
      setThemeMode(savedThemeMode);
    } else if (savedThemeName) {
      // Backward compatibility
      const theme = savedThemeName === 'protocol' ? protocolTheme : salientTheme;
      setTheme(theme);
    }
  }, []);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme
export const useTheme = () => useContext(ThemeContext); 