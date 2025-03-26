import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { Button } from "./button";
import { cn } from "../../lib/utils";
import { useTheme } from "./theme";

export function ThemeSwitcher({ className }: { className?: string }) {
  const { mode, setMode } = useTheme();

  const toggleTheme = () => {
    setMode((prevMode) => {
      if (prevMode === "light") return "dark";
      if (prevMode === "dark") return "system";
      return "light";
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn("w-9 h-9 rounded-full", className)}
      aria-label="Toggle theme"
    >
      {mode === "light" && <FiSun className="h-5 w-5" />}
      {mode === "dark" && <FiMoon className="h-5 w-5" />}
      {mode === "system" && (
        <div className="relative h-5 w-5">
          <FiSun className="absolute h-full w-full opacity-100 transition-opacity dark:opacity-0" />
          <FiMoon className="absolute h-full w-full opacity-0 transition-opacity dark:opacity-100" />
        </div>
      )}
    </Button>
  );
} 