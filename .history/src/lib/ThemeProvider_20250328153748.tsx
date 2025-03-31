import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeOption = 
  | 'blue-light' | 'blue-dark' 
  | 'green-light' | 'green-dark' 
  | 'zinc-light' | 'zinc-dark' 
  | 'rose-light' | 'rose-dark';

interface ThemeContextType {
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'blue-light',
  setTheme: () => null,
  isDark: false,
});

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeOption;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'blue-light',
}) => {
  const [theme, setTheme] = useState<ThemeOption>(() => {
    // Try to get the theme from localStorage
    const savedTheme = localStorage.getItem('theme') as ThemeOption;
    return savedTheme || defaultTheme;
  });

  // Detect if the current theme is dark
  const isDark = theme.includes('dark');

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('theme', theme);
    
    // Apply theme to the document element
    document.documentElement.setAttribute('data-theme', theme);
    
    // Also handle dark mode class for compatibility with many Tailwind libraries
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, isDark]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider; 