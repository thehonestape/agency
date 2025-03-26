import React from 'react';
import salientTheme from '../../themes/presets/salient';
import { Theme, ThemeContextValue, ThemeMode } from '../../themes/types';

// Create a mock ThemeContext
export const ThemeContext = React.createContext<ThemeContextValue>({
  theme: salientTheme,
  setTheme: () => {},
  availableThemes: [salientTheme],
  isDark: false,
  setMode: () => {},
  mode: 'light' as ThemeMode,
});

// Mock useTheme hook
export const useTheme = () => {
  return React.useContext(ThemeContext);
};

// Mock ThemeProvider component
export const ThemeProvider: React.FC<{ 
  children: React.ReactNode, 
  defaultTheme?: Theme,
  defaultMode?: ThemeMode 
}> = ({ children }) => {
  return (
    <ThemeContext.Provider
      value={{
        theme: salientTheme,
        setTheme: () => {},
        availableThemes: [salientTheme],
        isDark: false,
        setMode: () => {},
        mode: 'light' as ThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 