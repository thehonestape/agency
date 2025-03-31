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
  isLoading: boolean;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  currentThemeId: 'salient',
  currentTheme: null,
  availableThemes: [],
  setCurrentThemeId: () => {},
  isLoading: true,
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
  // Get available themes
  const availableThemes = themeRegistry.getAllThemes();
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      
      // If current theme isn't already dark, switch to dark variant
      if (!currentThemeId.includes('dark')) {
        const baseTheme = currentThemeId.replace('-light', '');
        const darkThemeId = `${baseTheme}-dark`;
        
        // Only change if dark variant exists
        if (availableThemes.some(theme => theme.metadata.id === darkThemeId)) {
          setCurrentThemeId(darkThemeId);
        }
      }
    } else {
      document.documentElement.classList.remove('dark');
      
      // If current theme is dark, switch to light variant
      if (currentThemeId.includes('dark')) {
        const baseTheme = currentThemeId.replace('-dark', '');
        const lightThemeId = `${baseTheme}-light`;
        
        // Only change if light variant exists
        if (availableThemes.some(theme => theme.metadata.id === lightThemeId)) {
          setCurrentThemeId(lightThemeId);
        }
      }
    }
    
    // Force select components to rerender
    const selectComponents = document.querySelectorAll('.select-trigger, .select-content');
    selectComponents.forEach(component => {
      (component as HTMLElement).dataset.themeRefresh = Date.now().toString();
    });
  };

  // Effect to load theme
  useEffect(() => {
    const loadTheme = async () => {
      setIsLoading(true);
      
      try {
        // Get theme from registry
        const theme = themeRegistry.getTheme(currentThemeId);
        
        if (!theme) {
          console.error(`Theme with ID ${currentThemeId} not found, falling back to default`);
          // Fall back to default theme
          setCurrentThemeId('blue-light');
          setCurrentTheme(availableThemes[0] || null);
        } else {
          setCurrentTheme(theme ?? null);
          
          // Apply theme by setting data-theme attribute
          document.documentElement.setAttribute('data-theme', currentThemeId);
          
          // Check if current theme is dark
          setIsDarkMode(currentThemeId.includes('dark'));
          
          // Update dark mode class
          if (currentThemeId.includes('dark')) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          
          // Force UI components to update
          setTimeout(() => {
            const selectComponents = document.querySelectorAll('.select-trigger, .select-content');
            selectComponents.forEach(component => {
              (component as HTMLElement).dataset.themeRefresh = Date.now().toString();
            });
          }, 50);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
        // Fall back to default theme in case of error
        setCurrentThemeId('blue-light');
        setCurrentTheme(availableThemes[0] || null);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTheme();
    
    // Clean up function
    return () => {
      // Any cleanup needed
    };
  }, [currentThemeId, availableThemes]);

  // Enable theme transitions after a short delay
  useEffect(() => {
    // Initially we prevent transitions to avoid FOUC
    // Enable them after document is fully loaded
    if (typeof window !== 'undefined') {
      const enableTransitions = () => {
        // Add transition-ready class to enable transitions
        document.documentElement.classList.add('transition-ready');
      };

      // Wait for document to be fully loaded plus a small delay
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
        isLoading,
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