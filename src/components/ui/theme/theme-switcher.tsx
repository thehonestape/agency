import React from 'react';
import { useTheme } from '@/lib/ThemeProvider';
import { Button } from '../button';
import { Moon, Sun, Laptop, Palette } from 'lucide-react';

export interface ThemeSwitcherProps {
  className?: string;
  includeSystem?: boolean;
  showLabel?: boolean;
  showColorPalettes?: boolean;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  className = '',
  includeSystem = true,
  showLabel = false,
  showColorPalettes = false,
}) => {
  const { theme, setTheme, colorPalette } = useTheme();
  
  // Extract the mode from the current theme
  const mode = theme.split('-')[1];
  
  // Function to set the mode while preserving the color palette
  const setMode = (newMode: 'light' | 'dark' | 'system') => {
    if (newMode === 'system') {
      // For system mode, detect the user's system preference
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(`${colorPalette}-${systemPreference}` as any);
      // Add a listener to update the theme when system preference changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        setTheme(`${colorPalette}-${e.matches ? 'dark' : 'light'}` as any);
      });
    } else {
      setTheme(`${colorPalette}-${newMode}` as any);
    }
  };
  
  // Function to set the color palette while preserving the mode
  const setColorPalette = (newPalette: string) => {
    setTheme(`${newPalette}-${mode}` as any);
  };
  
  // Handle click on the theme button
  const handleClick = () => {
    if (includeSystem) {
      setMode(mode === "light" ? "dark" : mode === "dark" ? "system" : "light");
    } else {
      setMode(mode === "light" ? "dark" : "light");
    }
  };
  
  // Get the appropriate icon based on the current theme
  const getIcon = () => {
    if (mode === 'light') return <Sun className="h-4 w-4" />;
    if (mode === 'dark') return <Moon className="h-4 w-4" />;
    return <Laptop className="h-4 w-4" />;
  };
  
  // Get the appropriate label based on the current theme
  const getLabel = () => {
    if (mode === 'light') return 'Light';
    if (mode === 'dark') return 'Dark';
    return 'System';
  };
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Mode Switcher */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClick}
        aria-label={`Switch to ${mode === 'light' ? 'dark' : mode === 'dark' ? (includeSystem ? 'system' : 'light') : 'light'} mode`}
      >
        {getIcon()}
        {showLabel && <span className="ml-2">{getLabel()}</span>}
      </Button>
      
      {/* Color Palette Switcher */}
      {showColorPalettes && (
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Change color palette"
            onClick={() => {
              // Simple cycling through color palettes
              const palettes = ['blue', 'teal', 'purple', 'indigo', 'rose'];
              const currentIndex = palettes.indexOf(colorPalette);
              const nextPalette = palettes[(currentIndex + 1) % palettes.length];
              setColorPalette(nextPalette);
            }}
          >
            <Palette className="h-4 w-4" />
            {showLabel && <span className="ml-2">Colors</span>}
          </Button>
          
          {/* Color indicator */}
          <div className={`absolute bottom-0 right-0 w-2 h-2 rounded-full bg-${colorPalette}-500`} />
        </div>
      )}
    </div>
  );
};