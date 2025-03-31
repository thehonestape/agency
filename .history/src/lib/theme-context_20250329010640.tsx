import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, themeRegistry } from './theme-registry';
import { salientTheme } from './theme-adapters/salient-adapter';
import { protocolTheme } from './theme-adapters/protocol-adapter';

// Register default themes 
themeRegistry.register(salientTheme);
themeRegistry.register(protocolTheme);

// Theme context interface
interface ThemeContextType {
  currentThemeId: string;
  currentTheme: Theme | null;
  availableThemes: Theme[];
  setCurrentThemeId: (id: string) => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  currentThemeId: 'blue-light',
  currentTheme: null,
  availableThemes: [],
  setCurrentThemeId: () => {},
  toggleDarkMode: () => {},
  isDarkMode: false,
});

// Provider props interface
interface ThemeProviderProps {
  children: ReactNode;
  defaultThemeId?: string;
}

// Theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultThemeId = 'blue-light' 
}) => {
  // State for current theme
  const [currentThemeId, setCurrentThemeId] = useState<string>(defaultThemeId);
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
  // Get available themes
  const availableThemes = themeRegistry.getAllThemes();
  
  // Toggle dark mode - using Tailwind v4 approach with data-theme attribute
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    // Update current theme ID based on dark mode change
    if (newMode) {
      // Switch to dark variant of current theme
      if (!currentThemeId.includes('dark')) {
        const baseTheme = currentThemeId.replace('-light', '');
        const darkThemeId = `${baseTheme}-dark`;
        
        // Only change if dark variant exists
        if (availableThemes.some(theme => theme.metadata.id === darkThemeId)) {
          setCurrentThemeId(darkThemeId);
        }
      }
    } else {
      // Switch to light variant of current theme
      if (currentThemeId.includes('dark')) {
        const baseTheme = currentThemeId.replace('-dark', '');
        const lightThemeId = `${baseTheme}-light`;
        
        // Only change if light variant exists
        if (availableThemes.some(theme => theme.metadata.id === lightThemeId)) {
          setCurrentThemeId(lightThemeId);
        }
      }
    }
  };

  // Effect to load theme
  useEffect(() => {
    const loadTheme = async () => {
      try {
        // Get theme from registry
        const theme = themeRegistry.getTheme(currentThemeId);
        
        if (!theme) {
          console.error(`Theme with ID ${currentThemeId} not found, falling back to default`);
          // Fall back to default theme
          setCurrentThemeId('blue-light');
          setCurrentTheme(availableThemes[0] || null);
        } else {
          setCurrentTheme(theme);
          
          // Set dark mode based on theme ID
          const isDark = currentThemeId.includes('dark');
          setIsDarkMode(isDark);
          
          // Apply theme using data-theme attribute (Tailwind v4 approach)
          document.documentElement.setAttribute('data-theme', currentThemeId);
          
          // Also maintain dark class for compatibility
          if (isDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          
          // Force UI components to update
          setTimeout(() => {
            const themeRefreshableElements = document.querySelectorAll('[data-theme-refreshable]');
            themeRefreshableElements.forEach(element => {
              (element as HTMLElement).dataset.themeRefresh = Date.now().toString();
            });
          }, 50);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
        // Fall back to default theme in case of error
        setCurrentThemeId('blue-light');
        setCurrentTheme(availableThemes[0] || null);
      }
    };
    
    loadTheme();
  }, [currentThemeId, availableThemes]);

  // Enable theme transitions after a short delay
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const enableTransitions = () => {
        document.documentElement.classList.add('transition-ready');
      };

      if (document.readyState === 'complete') {
        // Document already loaded, add small delay
        setTimeout(enableTransitions, 100);
      } else {
        // Wait for document to load
        window.addEventListener('load', () => {
          setTimeout(enableTransitions, 100);
        });
      }

      return () => {
        window.removeEventListener('load', enableTransitions);
      };
    }
  }, []);
  
  // Provide theme context
  return (
    <ThemeContext.Provider
      value={{
        currentThemeId,
        currentTheme,
        availableThemes,
        setCurrentThemeId,
        toggleDarkMode,
        isDarkMode
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme context
export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider; 