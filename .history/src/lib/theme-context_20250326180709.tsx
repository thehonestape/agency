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
          
          // Update the CSS content directly from the theme
          styleEl.textContent = theme.css;

          // Manually apply the color variables for Tailwind compatibility
          document.documentElement.style.setProperty('--primary', theme.tokens.colors.primary);
          document.documentElement.style.setProperty('--primary-foreground', theme.tokens.colors['primary-foreground']);
          document.documentElement.style.setProperty('--secondary', theme.tokens.colors.secondary);
          document.documentElement.style.setProperty('--secondary-foreground', theme.tokens.colors['secondary-foreground']);
          document.documentElement.style.setProperty('--accent', theme.tokens.colors.accent);
          document.documentElement.style.setProperty('--accent-foreground', theme.tokens.colors['accent-foreground']);
          document.documentElement.style.setProperty('--background', theme.tokens.colors.background);
          document.documentElement.style.setProperty('--foreground', theme.tokens.colors.foreground);
          document.documentElement.style.setProperty('--card', theme.tokens.colors.card);
          document.documentElement.style.setProperty('--card-foreground', theme.tokens.colors['card-foreground']);
          document.documentElement.style.setProperty('--muted', theme.tokens.colors.muted);
          document.documentElement.style.setProperty('--muted-foreground', theme.tokens.colors['muted-foreground']);
          document.documentElement.style.setProperty('--border', theme.tokens.colors.border);
          document.documentElement.style.setProperty('--input', theme.tokens.colors.input);
          document.documentElement.style.setProperty('--destructive', theme.tokens.colors.destructive);
          document.documentElement.style.setProperty('--destructive-foreground', theme.tokens.colors['destructive-foreground']);
          document.documentElement.style.setProperty('--success', theme.tokens.colors.success);
          document.documentElement.style.setProperty('--success-foreground', theme.tokens.colors['success-foreground']);
          document.documentElement.style.setProperty('--warning', theme.tokens.colors.warning);
          document.documentElement.style.setProperty('--warning-foreground', theme.tokens.colors['warning-foreground']);
          document.documentElement.style.setProperty('--info', theme.tokens.colors.info);
          document.documentElement.style.setProperty('--info-foreground', theme.tokens.colors['info-foreground']);
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