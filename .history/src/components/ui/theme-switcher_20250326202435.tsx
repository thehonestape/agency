import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { Button } from "./button";
import { cn } from "../../lib/utils";
import { useTheme } from "../../lib/theme-context";

export function ThemeSwitcher({ className }: { className?: string }) {
  const { currentTheme } = useTheme();
  
  // Check if we're in dark mode based on the current theme's background color
  const isDarkMode = currentTheme?.tokens?.colors?.background === '#18181b';
  
  // For simplicity, toggle between light and dark mode
  const toggleTheme = () => {
    // This is a placeholder for actual theme switching
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn("w-9 h-9 rounded-full", className)}
      aria-label="Toggle theme"
    >
      {!isDarkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
    </Button>
  );
} 