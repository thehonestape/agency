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
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  currentThemeId: 'salient',
  currentTheme: null,
  availableThemes: [],
  setCurrentThemeId: () => {},
  isLoading: true,
});

// Provider props interface
interface ThemeProviderProps {
  children: ReactNode;
  defaultThemeId?: string;
}

// Theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultThemeId = 'salient' 
}) => {
  // State for current theme
  const [currentThemeId, setCurrentThemeId] = useState<string>(defaultThemeId);
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Get available themes
  const availableThemes = themeRegistry.getAllThemes();
  
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
          setCurrentThemeId('salient');
          setCurrentTheme(salientTheme);
        } else {
          setCurrentTheme(theme ?? null);
          
          // Apply theme by setting data-theme attribute
          document.documentElement.setAttribute('data-theme', currentThemeId);
          
          // Check system preference for dark mode
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (prefersDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      } catch (error) {
        console.error('Error loading theme:', error);
        // Fall back to default theme in case of error
        setCurrentThemeId('salient');
        setCurrentTheme(salientTheme);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTheme();
  }, [currentThemeId]);

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
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme context
export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider; 