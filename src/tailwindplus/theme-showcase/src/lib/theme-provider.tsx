import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the available themes
export type ThemeName = 'protocol' | 'salient' | 'studio' | 'radiant' | 'commit' | 'keynote' | 'pocket' | 'primer' | 'transmit';

// Theme context type
type ThemeContextType = {
  currentTheme: ThemeName;
  setCurrentTheme: (theme: ThemeName) => void;
  isChanging: boolean;
};

// Create the theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider props
interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: ThemeName;
}

// CSS variables for each theme
const themeVariables: Record<ThemeName, Record<string, string>> = {
  protocol: {
    '--primary': '#0ea5e9',
    '--primary-foreground': '#ffffff',
    '--secondary': '#f1f5f9',
    '--secondary-foreground': '#0f172a',
    '--accent': '#f8fafc',
    '--accent-foreground': '#0f172a',
    '--background': '#ffffff',
    '--foreground': '#0f172a',
    '--muted': '#f1f5f9',
    '--muted-foreground': '#64748b',
    '--border': '#e2e8f0',
  },
  salient: {
    '--primary': '#2563eb',
    '--primary-foreground': '#ffffff',
    '--secondary': '#f3f4f6',
    '--secondary-foreground': '#1f2937',
    '--accent': '#f9fafb',
    '--accent-foreground': '#1f2937',
    '--background': '#ffffff',
    '--foreground': '#1f2937',
    '--muted': '#f3f4f6',
    '--muted-foreground': '#6b7280',
    '--border': '#e5e7eb',
  },
  studio: {
    '--primary': '#000000',
    '--primary-foreground': '#ffffff',
    '--secondary': '#f5f5f5',
    '--secondary-foreground': '#171717',
    '--accent': '#fafafa',
    '--accent-foreground': '#171717',
    '--background': '#ffffff',
    '--foreground': '#171717',
    '--muted': '#f5f5f5',
    '--muted-foreground': '#737373',
    '--border': '#e5e5e5',
  },
  radiant: {
    '--primary': '#8b5cf6',
    '--primary-foreground': '#ffffff',
    '--secondary': '#f3e8ff',
    '--secondary-foreground': '#581c87',
    '--accent': '#faf5ff',
    '--accent-foreground': '#581c87',
    '--background': '#ffffff',
    '--foreground': '#581c87',
    '--muted': '#f3e8ff',
    '--muted-foreground': '#9333ea',
    '--border': '#e9d5ff',
  },
  commit: {
    '--primary': '#10b981',
    '--primary-foreground': '#ffffff',
    '--secondary': '#ecfdf5',
    '--secondary-foreground': '#064e3b',
    '--accent': '#f0fdfa',
    '--accent-foreground': '#064e3b',
    '--background': '#ffffff',
    '--foreground': '#064e3b',
    '--muted': '#ecfdf5',
    '--muted-foreground': '#059669',
    '--border': '#d1fae5',
  },
  keynote: {
    '--primary': '#f59e0b',
    '--primary-foreground': '#ffffff',
    '--secondary': '#fef3c7',
    '--secondary-foreground': '#78350f',
    '--accent': '#fffbeb',
    '--accent-foreground': '#78350f',
    '--background': '#ffffff',
    '--foreground': '#78350f',
    '--muted': '#fef3c7',
    '--muted-foreground': '#d97706',
    '--border': '#fde68a',
  },
  pocket: {
    '--primary': '#ef4444',
    '--primary-foreground': '#ffffff',
    '--secondary': '#fee2e2',
    '--secondary-foreground': '#7f1d1d',
    '--accent': '#fef2f2',
    '--accent-foreground': '#7f1d1d',
    '--background': '#ffffff',
    '--foreground': '#7f1d1d',
    '--muted': '#fee2e2',
    '--muted-foreground': '#dc2626',
    '--border': '#fecaca',
  },
  primer: {
    '--primary': '#3b82f6',
    '--primary-foreground': '#ffffff',
    '--secondary': '#eff6ff',
    '--secondary-foreground': '#1e3a8a',
    '--accent': '#f8fafc',
    '--accent-foreground': '#1e3a8a',
    '--background': '#ffffff',
    '--foreground': '#1e3a8a',
    '--muted': '#eff6ff',
    '--muted-foreground': '#3b82f6',
    '--border': '#bfdbfe',
  },
  transmit: {
    '--primary': '#6366f1',
    '--primary-foreground': '#ffffff',
    '--secondary': '#eef2ff',
    '--secondary-foreground': '#312e81',
    '--accent': '#f5f7ff',
    '--accent-foreground': '#312e81',
    '--background': '#ffffff',
    '--foreground': '#312e81',
    '--muted': '#eef2ff',
    '--muted-foreground': '#4f46e5',
    '--border': '#c7d2fe',
  },
};

// Check if we're in a browser environment
const isClient = typeof window !== 'undefined';

// Add global transitions for smooth theme switching
const addGlobalTransitions = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    :root {
      --theme-transition-duration: 300ms;
    }
    
    *, *::before, *::after {
      transition: background-color var(--theme-transition-duration) ease-out,
                  border-color var(--theme-transition-duration) ease-out,
                  color var(--theme-transition-duration) ease-out,
                  fill var(--theme-transition-duration) ease-out,
                  stroke var(--theme-transition-duration) ease-out;
    }
  `;
  document.head.appendChild(style);
};

// Apply theme class to all elements that need it
const applyThemeClass = (theme: ThemeName) => {
  if (!isClient) return;
  
  // Apply to body
  document.body.className = document.body.className
    .replace(/theme-\w+/g, '')
    .trim();
  document.body.classList.add(`theme-${theme}`);
  
  // Apply to html
  document.documentElement.className = document.documentElement.className
    .replace(/theme-\w+/g, '')
    .trim();
  document.documentElement.classList.add(`theme-${theme}`);
  
  // Apply to all component wrappers
  document.querySelectorAll('.component-wrapper').forEach(el => {
    el.className = el.className
      .replace(/theme-\w+/g, '')
      .trim();
    el.classList.add(`theme-${theme}`);
  });
};

export function ThemeProvider({ 
  children, 
  initialTheme = 'protocol' 
}: ThemeProviderProps) {
  // Get stored theme or use initial theme
  const getInitialTheme = (): ThemeName => {
    if (!isClient) return initialTheme;
    
    try {
      const storedTheme = localStorage.getItem('theme') as ThemeName;
      return storedTheme && themeVariables[storedTheme] ? storedTheme : initialTheme;
    } catch (e) {
      console.warn('Could not access localStorage for theme:', e);
      return initialTheme;
    }
  };

  const [currentTheme, setCurrentTheme] = useState<ThemeName>(getInitialTheme);
  const [isChanging, setIsChanging] = useState(false);

  // Handle theme change
  const handleThemeChange = (newTheme: ThemeName) => {
    if (currentTheme === newTheme) return;
    
    setIsChanging(true);
    setCurrentTheme(newTheme);
    
    // Store theme preference
    if (isClient) {
      try {
        localStorage.setItem('theme', newTheme);
      } catch (e) {
        console.warn('Could not save theme to localStorage:', e);
      }
    }
    
    // Reset changing state after transition completes
    setTimeout(() => {
      setIsChanging(false);
    }, 300);
  };

  const value = {
    currentTheme,
    setCurrentTheme: handleThemeChange,
    isChanging,
  };

  // Apply CSS variables and theme classes when theme changes
  useEffect(() => {
    // Add global transition styles once
    if (isClient) {
      addGlobalTransitions();
    }
    
    // Apply theme variables and classes
    if (isClient) {
      requestAnimationFrame(() => {
        // Apply CSS variables
        const variables = themeVariables[currentTheme];
        Object.entries(variables).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value);
        });
        
        // Apply theme classes
        applyThemeClass(currentTheme);
      });
    }
  }, [currentTheme]);

  // Apply the theme on initial load to avoid flash of wrong theme
  useEffect(() => {
    if (isClient) {
      // Apply theme immediately
      const variables = themeVariables[currentTheme];
      Object.entries(variables).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
      
      // Apply theme classes
      applyThemeClass(currentTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={value}>
      <div className={`theme-${currentTheme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// Hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 