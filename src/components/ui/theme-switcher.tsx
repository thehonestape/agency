import React from 'react';
import { Button } from './button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

export const ThemeSwitcher = () => {
  // Use the global theme context instead of local state
  const { isDarkMode, toggleDarkMode } = useTheme();

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