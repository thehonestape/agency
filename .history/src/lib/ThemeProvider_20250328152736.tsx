import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeOption = 
  | 'blue-light' | 'blue-dark' 
  | 'green-light' | 'green-dark' 
  | 'zinc-light' | 'zinc-dark' 
  | 'rose-light' | 'rose-dark';

interface ThemeContextType {
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'blue-light',
  setTheme: () => null,
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

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('theme', theme);
    
    // Apply theme to the document element
    document.documentElement.setAttribute('data-theme', theme);
    
    // Also handle dark mode class for compatibility
    if (theme.includes('dark')) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider; 