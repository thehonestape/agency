import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { Theme, ThemeContextValue, ThemeMode, ThemeProviderProps } from '../types';
import { generateThemeFromBrand, applyThemeToDom, generateCssVariables } from '../generators/brandToTheme';
import salientTheme from '../presets/salient';
import protocolTheme from '../presets/protocol';

// Default theme is salient (light)
const defaultTheme = salientTheme;

// Create the theme context
export const ThemeContext = createContext<ThemeContextValue>({
  theme: defaultTheme,
  setTheme: () => {},
  availableThemes: [defaultTheme],
  isDark: false,
  setMode: () => {},
  mode: 'light',
});

/**
 * ThemeProvider component
 * Manages theme state and provides theme context to the app
 */
export const ThemeProvider = ({ 
  children, 
  defaultTheme = salientTheme,
  defaultMode = 'system',
  themes = [salientTheme, protocolTheme]
}: ThemeProviderProps) => {
  // State for current theme and mode
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);
  const [availableThemes, setAvailableThemes] = useState<Theme[]>(themes);
  const [mounted, setMounted] = useState(false);
  
  // Compute isDark based on theme properties
  const isDark = useMemo(() => {
    if (!theme) return false;
    
    // Check if the theme is explicitly marked as dark
    if (theme.isDark) return true;
    
    // Check background color brightness as a fallback
    const bgColor = theme.colors.background;
    if (bgColor.startsWith('#')) {
      const r = parseInt(bgColor.slice(1, 3), 16);
      const g = parseInt(bgColor.slice(3, 5), 16);
      const b = parseInt(bgColor.slice(5, 7), 16);
      // Simple brightness formula (0-255, lower is darker)
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness < 128;
    }
    
    return false;
  }, [theme]);

  // Function to set theme
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    
    // Save to localStorage
    try {
      localStorage.setItem('app-theme', JSON.stringify({ 
        name: newTheme.name,
        isDark
      }));
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
    
    // Apply the theme to the DOM
    applyThemeToDom(newTheme);
  };
  
  // Function to set mode
  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    
    try {
      localStorage.setItem('app-theme-mode', newMode);
    } catch (error) {
      console.error('Error saving theme mode to localStorage:', error);
    }
    
    // If system, detect user preference
    if (newMode === 'system') {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDarkMode ? protocolTheme : salientTheme);
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
    setMounted(true);
    
    try {
      // First check for mode preference
      const savedThemeMode = localStorage.getItem('app-theme-mode') as ThemeMode;
      
      if (savedThemeMode) {
        setModeState(savedThemeMode);
        
        if (savedThemeMode === 'system') {
          const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
          setThemeState(isDarkMode ? protocolTheme : salientTheme);
        } else if (savedThemeMode === 'dark') {
          setThemeState(protocolTheme);
        } else {
          setThemeState(salientTheme);
        }
      } 
      // Backward compatibility
      else {
        const savedThemeData = localStorage.getItem('app-theme');
        if (savedThemeData) {
          try {
            const { name } = JSON.parse(savedThemeData);
            const foundTheme = availableThemes.find(t => t.name === name);
            if (foundTheme) {
              setThemeState(foundTheme);
            }
          } catch (e) {
            console.error('Error parsing saved theme:', e);
          }
        }
      }
    } catch (error) {
      console.error('Error loading theme from localStorage:', error);
    }
  }, []);
  
  // Apply theme to DOM whenever it changes
  useEffect(() => {
    if (mounted) {
      applyThemeToDom(theme);
    }
  }, [theme, mounted]);
  
  // Add a new theme to available themes
  const addTheme = (newTheme: Theme) => {
    setAvailableThemes(prev => {
      // Replace if name exists, otherwise add
      const exists = prev.findIndex(t => t.name === newTheme.name);
      if (exists >= 0) {
        const updated = [...prev];
        updated[exists] = newTheme;
        return updated;
      }
      return [...prev, newTheme];
    });
  };
  
  // Context value
  const contextValue: ThemeContextValue = {
    theme,
    setTheme,
    availableThemes,
    isDark,
    setMode,
    mode,
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook for accessing theme context
export const useTheme = () => useContext(ThemeContext); 