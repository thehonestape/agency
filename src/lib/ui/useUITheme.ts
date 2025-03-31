import { useEffect, useMemo, useState } from 'react';
import { useThemeContext } from '../theme/ThemeProvider';
import { getAllThemeVars, ThemeVariable, getThemeMode } from './theme-utils';

/**
 * Hook for UI components to easily access and manipulate theme variables
 * Designed specifically to work with Tailwind CSS v4's CSS-first approach
 */
export function useUITheme() {
  // Use existing theme context
  const themeContext = useThemeContext();
  
  // Since we're using CSS variables, we need to track their values
  const [cssVars, setCssVars] = useState<Record<ThemeVariable, string>>({} as Record<ThemeVariable, string>);
  const [mode, setInternalMode] = useState<'light' | 'dark'>(getThemeMode());

  // Update CSS vars when theme changes
  useEffect(() => {
    const updateCssVars = () => {
      setCssVars(getAllThemeVars());
      setInternalMode(getThemeMode());
    };

    // Initial update
    updateCssVars();

    // Set up observer for dark mode class for real-time updates
    const htmlElement = document.documentElement;
    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'class') {
          updateCssVars();
        }
      }
    });

    observer.observe(htmlElement, { attributes: true });

    return () => observer.disconnect();
  }, [themeContext.theme]);

  // Create the API for components to use
  const utils = useMemo(() => ({
    /**
     * Get CSS variable value by name
     */
    getVar: (name: ThemeVariable): string => cssVars[name] || '',

    /**
     * Check if the current theme is in dark mode
     */
    isDarkMode: (): boolean => mode === 'dark',

    /**
     * Toggle between light and dark modes
     * Uses existing theme context for consistency
     */
    toggleMode: () => {
      const newMode = mode === 'light' ? 'dark' : 'light';
      themeContext.setMode(newMode);
    },

    /**
     * Set theme mode directly
     */
    setMode: (newMode: 'light' | 'dark') => {
      themeContext.setMode(newMode);
    },

    /**
     * Set primary color
     */
    setPrimaryColor: (color: string) => {
      themeContext.setPrimaryColor(color);
    },

    /**
     * Set secondary color
     */
    setSecondaryColor: (color: string) => {
      themeContext.setSecondaryColor(color);
    },

    /**
     * Set accent color
     */
    setAccentColor: (color: string) => {
      themeContext.setAccentColor(color);
    },

    /**
     * Reset theme to defaults
     */
    resetTheme: () => {
      themeContext.resetTheme();
    },

    /**
     * Create CSS variables with proper fallbacks for components
     * that need them
     */
    createVarStyles: (variables: Partial<Record<ThemeVariable, string>>): React.CSSProperties => {
      return Object.entries(variables).reduce((acc, [key, value]) => {
        const varKey = key as ThemeVariable;
        acc[`--${varKey}`] = value || cssVars[varKey] || '';
        return acc;
      }, {} as Record<string, string>) as React.CSSProperties;
    },

    /**
     * Generate class name with proper variant based on state
     */
    getStateClass: (
      state: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info',
      prefix: 'bg' | 'text' | 'border' = 'bg'
    ): string => {
      switch (state) {
        case 'primary':
          return `${prefix}-primary`;
        case 'success':
          return `${prefix}-success`;
        case 'warning':
          return `${prefix}-warning`;
        case 'error':
          return `${prefix}-destructive`;
        case 'info':
          return `${prefix}-info`;
        default:
          return prefix === 'bg' ? `${prefix}-background` : `${prefix}-foreground`;
      }
    },
    
    /**
     * Current theme mode
     */
    mode,
    
    /**
     * All CSS variables from the theme
     */
    cssVars,
    
    /**
     * Access to the full theme from context
     */
    theme: themeContext.theme,
    
    /**
     * Access to the theme config from context
     */
    config: themeContext.config,
  }), [cssVars, mode, themeContext]);

  return utils;
} 