import React from 'react';
import { Button } from './button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/ThemeProvider';

export const ThemeSwitcher = () => {
  // Use the global theme context instead of local state
  const { isDark: isDarkMode, setTheme } = useTheme();
  
  // Toggle between light and dark mode while preserving the color palette
  const toggleDarkMode = () => {
    const { theme } = useTheme();
    const [colorPalette, mode] = theme.split('-');
    const newMode = mode === 'light' ? 'dark' : 'light';
    setTheme(`${colorPalette}-${newMode}` as any);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} theme`}
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}; 