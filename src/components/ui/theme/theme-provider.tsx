import React, { createContext, useContext, useEffect, useState } from "react";
import defaultTheme from "./tokens";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode | ((prevMode: ThemeMode) => ThemeMode)) => void;
  theme: typeof defaultTheme.light | typeof defaultTheme.dark;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "system",
  setMode: () => {},
  theme: defaultTheme.light,
  isDark: false,
});

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
  disableTransitions?: boolean;
}

// Apply theme to CSS variables
function applyThemeToDOM(
  theme: typeof defaultTheme.light | typeof defaultTheme.dark
) {
  const root = document.documentElement;

  // Helper to set nested properties
  const setNestedProperties = (
    obj: Record<string, any>,
    prefix: string
  ) => {
    Object.entries(obj).forEach(([key, value]) => {
      // If value is a hex color or other primitive
      if (value && typeof value !== "object") {
        root.style.setProperty(`--${prefix}-${key}`, value);
      } 
      // Otherwise, it's a nested object
      else if (value && typeof value === "object") {
        setNestedProperties(
          value as Record<string, any>,
          `${prefix}-${key}`
        );
      }
    });
  };

  // Apply all theme properties
  Object.entries(theme).forEach(([category, values]) => {
    setNestedProperties(values as Record<string, any>, category);
  });
}

export function ThemeProvider({
  children,
  defaultMode = "system",
  disableTransitions = false,
}: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);
  const [theme, setTheme] = useState(
    defaultMode === "dark" ? defaultTheme.dark : defaultTheme.light
  );
  const [isDark, setIsDark] = useState(defaultMode === "dark");
  const [mounted, setMounted] = useState(false);

  // Update the theme when the mode changes
  useEffect(() => {
    // Don't do anything on the server
    if (!mounted) return;

    const root = document.documentElement;
    
    // Disable transitions during theme changes if requested
    if (disableTransitions) {
      root.classList.add("disable-transitions");
    }

    // Handle system mode
    if (mode === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? defaultTheme.dark : defaultTheme.light);
      setIsDark(prefersDark);
      root.classList.remove("light", "dark");
      root.classList.add(prefersDark ? "dark" : "light");
    } else {
      setTheme(mode === "dark" ? defaultTheme.dark : defaultTheme.light);
      setIsDark(mode === "dark");
      root.classList.remove("light", "dark");
      root.classList.add(mode);
    }

    // Apply theme to DOM
    applyThemeToDOM(mode === "dark" ? defaultTheme.dark : defaultTheme.light);

    // Save to localStorage
    localStorage.setItem("theme", mode);

    // Re-enable transitions
    if (disableTransitions) {
      setTimeout(() => {
        root.classList.remove("disable-transitions");
      }, 0);
    }
  }, [mode, mounted, disableTransitions]);

  // Set mounted state
  useEffect(() => {
    setMounted(true);

    // Initialize from localStorage or system preference
    const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
    if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
      setMode(savedTheme);
    }

    // Listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (mode === "system") {
        setIsDark(mediaQuery.matches);
        setTheme(mediaQuery.matches ? defaultTheme.dark : defaultTheme.light);
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(mediaQuery.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, theme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}