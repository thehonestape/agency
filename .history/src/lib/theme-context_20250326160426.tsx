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
          
          // Apply theme's CSS
          const styleId = 'theme-variables';
          let styleEl = document.getElementById(styleId) as HTMLStyleElement;
          
          if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = styleId;
            document.head.appendChild(styleEl);
          }
          
          styleEl.textContent = theme.css;
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