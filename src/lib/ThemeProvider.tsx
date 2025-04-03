import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available theme options
export type ThemeOption = 
  | 'blue-light' | 'blue-dark' 
  | 'teal-light' | 'teal-dark' 
  | 'purple-light' | 'purple-dark' 
  | 'indigo-light' | 'indigo-dark' 
  | 'rose-light' | 'rose-dark';

interface ThemeContextType {
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
  isDark: boolean;
  colorPalette: string; 
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'blue-light',
  setTheme: () => null,
  isDark: false,
  colorPalette: 'blue',
});

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeOption;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'blue-light',
}) => {
  const [theme, setTheme] = useState<ThemeOption>(() => {
    // Try to get the theme from localStorage
    try {
      const savedTheme = localStorage.getItem('theme') as ThemeOption;
      return savedTheme || defaultTheme;
    } catch (error) {
      return defaultTheme;
    }
  });

  // Extract color palette and mode from theme
  const [colorPalette, mode] = theme.split('-') as [string, 'light' | 'dark'];
  
  // Detect if the current theme is dark
  const isDark = mode === 'dark';

  useEffect(() => {
    try {
      // Save theme to localStorage
      localStorage.setItem('theme', theme);
      
      // Apply theme to the document element
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.setAttribute('data-color-palette', colorPalette);
      
      // For Tailwind v4 compatibility, toggle the dark class on the root element
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // Theme palette is applied via data attributes and CSS classes
      // No need to set environment variables in the browser

      // Log the current state for debugging
      console.log(`Theme applied: ${theme}, Color palette: ${colorPalette}, Dark mode: ${isDark ? 'enabled' : 'disabled'}`);
      console.log(`Root element classes: ${document.documentElement.className}`);
      console.log(`Root element data-theme: ${document.documentElement.getAttribute('data-theme')}`);
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  }, [theme, colorPalette, isDark]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, colorPalette }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;