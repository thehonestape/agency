import React, { createContext, useContext, useEffect, useState } from 'react';

// Theme IDs supported by the application
export type ThemeId = 'blue-light' | 'blue-dark' | 'green-light' | 'green-dark' | 'zinc-light' | 'zinc-dark';

// Define the shape of our theme context
interface ThemeContextType {
  currentThemeId: ThemeId;
  setTheme: (theme: ThemeId) => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

// Create the theme context with a default value
const ThemeContext = createContext<ThemeContextType>({
  currentThemeId: 'blue-light',
  setTheme: () => {},
  toggleDarkMode: () => {},
  isDarkMode: false,
});

// Hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  defaultTheme?: ThemeId;
}> = ({ children, defaultTheme = 'blue-light' }) => {
  // State for the current theme ID
  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>(defaultTheme);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(defaultTheme.includes('dark'));

  // Function to set the theme
  const setTheme = (themeId: ThemeId) => {
    setCurrentThemeId(themeId);
    setIsDarkMode(themeId.includes('dark'));
    
    // Store the theme preference in localStorage
    localStorage.setItem('theme', themeId);
    
    // Apply the theme to the document element
    document.documentElement.setAttribute('data-theme', themeId);
    
    // Refresh any components that listen for theme changes
    refreshThemeComponents();
  };

  // Function to toggle dark mode based on the current theme
  const toggleDarkMode = () => {
    const currentBase = currentThemeId.split('-')[0];
    const newTheme = isDarkMode 
      ? `${currentBase}-light` as ThemeId 
      : `${currentBase}-dark` as ThemeId;
    
    setTheme(newTheme);
  };

  // Function to refresh theme-related components
  const refreshThemeComponents = () => {
    // Find all elements with the data-theme-refreshable attribute and force a repaint
    document.querySelectorAll('[data-theme-refreshable]').forEach((el) => {
      // Cast to HTMLElement to access style properties
      const element = el as HTMLElement;
      // Force a repaint of the element
      const display = element.style.display;
      element.style.display = 'none';
      // This line causes the browser to flush the style changes
      void element.offsetHeight;
      element.style.display = display;
    });
  };

  // Effect to load the theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeId | null;
    
    // If there's a saved theme, use it
    if (savedTheme) {
      // Verify it's a valid theme before setting
      const isValidTheme = [
        'blue-light', 'blue-dark',
        'green-light', 'green-dark',
        'zinc-light', 'zinc-dark'
      ].includes(savedTheme);
      
      setTheme(isValidTheme ? savedTheme : 'blue-light');
    } else {
      // Otherwise, use the default theme
      setTheme(defaultTheme);
    }
  }, [defaultTheme]);

  return (
    <ThemeContext.Provider value={{ currentThemeId, setTheme, toggleDarkMode, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 