import React, { createContext, useContext, useEffect, useState } from 'react';
import { generateThemeColors, getContrastingTextColor } from '../lib/utils';

// Define type-safe built-in theme names
export type BuiltInThemeName = 'light' | 'dark' | 'system';
export type ThemeName = BuiltInThemeName | string;

type CustomTheme = {
  name: string;
  colors: Record<string, string>;
};

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
  storageKey?: string;
  customThemes?: CustomTheme[];
};

type ThemeProviderState = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  applyCustomTheme: (colors: {
    primary: string;
    background: string;
    [key: string]: string;
  }, name?: string) => void;
  availableThemes: string[];
  isChanging: boolean;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  applyCustomTheme: () => null,
  availableThemes: ['light', 'dark', 'system'],
  isChanging: false,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

// Helper to determine if we're in a browser environment
const isClient = typeof window !== 'undefined';

// Add global transitions for smooth theme switching
const addGlobalTransitions = () => {
  if (!isClient) return;
  
  // Check if transitions are already added
  if (document.getElementById('theme-transitions')) return;
  
  const style = document.createElement('style');
  style.id = 'theme-transitions';
  style.innerHTML = `
    :root {
      --theme-transition-duration: 300ms;
    }
    
    *, *::before, *::after {
      transition: background-color var(--theme-transition-duration) ease-out,
                  border-color var(--theme-transition-duration) ease-out,
                  color var(--theme-transition-duration) ease-out,
                  fill var(--theme-transition-duration) ease-out,
                  stroke var(--theme-transition-duration) ease-out;
    }
  `;
  document.head.appendChild(style);
};

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
  customThemes = [],
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeName>(
    () => (localStorage.getItem(storageKey) as ThemeName) || defaultTheme
  );
  
  const [availableThemes, setAvailableThemes] = useState<string[]>([
    'light', 'dark', 'system', 
    ...customThemes.map(theme => theme.name)
  ]);
  
  const [customThemesMap, setCustomThemesMap] = useState<Record<string, CustomTheme>>(
    () => {
      const themeMap: Record<string, CustomTheme> = {};
      customThemes.forEach(theme => {
        themeMap[theme.name] = theme;
      });
      return themeMap;
    }
  );
  
  const [isChanging, setIsChanging] = useState(false);
  
  // Add global transitions on initial load
  useEffect(() => {
    if (isClient) {
      addGlobalTransitions();
    }
  }, []);

  // Apply theme to document root
  useEffect(() => {
    if (!isClient) return;
    
    // Start transition
    setIsChanging(true);
    
    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      const root = window.document.documentElement;
      
      // First remove all theme classes
      root.classList.remove('light', 'dark', 'system');
      
      // Remove all theme-specific classes
      const themeClasses = Array.from(root.classList).filter(cls => cls.startsWith('theme-'));
      themeClasses.forEach(cls => root.classList.remove(cls));
      
      // Handle system preference
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light';
        
        root.classList.add(systemTheme);
        root.classList.add('theme-system');
        return;
      }
      
      // Handle built-in themes
      if (theme === 'light' || theme === 'dark') {
        root.classList.add(theme);
        root.classList.add(`theme-${theme}`);
        return;
      }
      
      // Handle custom themes by applying CSS variables
      const customTheme = customThemesMap[theme];
      if (customTheme) {
        // First add the base theme class (light or dark)
        // We determine if it's a dark theme by checking background color
        const backgroundHsl = customTheme.colors['background'] || "0 0% 100%";
        const [_, saturation, lightness] = backgroundHsl.split(' ').map(parseFloat);
        const isDarkTheme = lightness < 50;
        root.classList.add(isDarkTheme ? 'dark' : 'light');
        root.classList.add(`theme-${theme}`);
        
        // Apply all custom CSS variables
        Object.entries(customTheme.colors).forEach(([key, value]) => {
          root.style.setProperty(`--${key}`, value);
        });
      }
      
      // End transition after duration
      setTimeout(() => {
        setIsChanging(false);
      }, 300); // Match the transition duration
    });
  }, [theme, customThemesMap]);

  // Listen for system theme changes
  useEffect(() => {
    if (!isClient || theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Initial check
    document.documentElement.classList.toggle('dark', mediaQuery.matches);
    
    // Listen for changes
    const listener = (event: MediaQueryListEvent) => {
      document.documentElement.classList.toggle('dark', event.matches);
    };
    
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);
  
  // Function to add a new custom theme
  const applyCustomTheme = (colors: {
    primary: string;
    background: string;
    [key: string]: string;
  }, name: string = `theme-${Date.now()}`) => {
    // Generate complete theme with proper contrast
    const themeColors = generateThemeColors(colors);
    
    // Create the new theme
    const newTheme: CustomTheme = {
      name,
      colors: themeColors
    };
    
    // Update available themes
    setAvailableThemes(prev => {
      if (!prev.includes(name)) {
        return [...prev, name];
      }
      return prev;
    });
    
    // Update themes map
    setCustomThemesMap(prev => ({
      ...prev,
      [name]: newTheme
    }));
    
    // Apply the new theme
    setTheme(name);
  };

  const value = {
    theme,
    setTheme: (theme: ThemeName) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    applyCustomTheme,
    availableThemes,
    isChanging
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  
  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');
  
  return context;
}; 