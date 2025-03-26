import React, { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { Button } from "./button";
import { cn } from "../../lib/utils";

type Theme = "light" | "dark" | "system";

export function ThemeSwitcher({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) || "system"
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === "light") return "dark";
      if (prevTheme === "dark") return "system";
      return "light";
    });
  };

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn("w-9 h-9 rounded-full", className)}
      aria-label="Toggle theme"
    >
      {theme === "light" && <FiSun className="h-5 w-5" />}
      {theme === "dark" && <FiMoon className="h-5 w-5" />}
      {theme === "system" && (
        <div className="relative h-5 w-5">
          <FiSun className="absolute h-full w-full opacity-100 transition-opacity dark:opacity-0" />
          <FiMoon className="absolute h-full w-full opacity-0 transition-opacity dark:opacity-100" />
        </div>
      )}
    </Button>
  );
} 