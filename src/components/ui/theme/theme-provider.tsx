import React, { createContext, useContext, useEffect, useState } from "react";
import { defaultTheme, HSLColor, hslToString } from "./tokens";

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

// Applies HSL values to CSS variables
function applyThemeToDOM(
  theme: typeof defaultTheme.light | typeof defaultTheme.dark
) {
  const root = document.documentElement;

  // Helper to set nested HSL variables
  const setNestedProperties = (
    obj: Record<string, any>,
    prefix: string
  ) => {
    Object.entries(obj).forEach(([key, value]) => {
      // Check if value is an HSL object
      if (value && typeof value === "object" && "h" in value) {
        root.style.setProperty(`--${prefix}-${key}`, hslToString(value as HSLColor));
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
    localStorage.setItem("theme-mode", mode);

    // Re-enable transitions after a short delay
    if (disableTransitions) {
      const tid = setTimeout(() => {
        root.classList.remove("disable-transitions");
      }, 100);
      return () => clearTimeout(tid);
    }
  }, [mode, mounted, disableTransitions]);

  // Handle system theme changes
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = () => {
      if (mode === "system") {
        const newIsDark = mediaQuery.matches;
        setTheme(newIsDark ? defaultTheme.dark : defaultTheme.light);
        setIsDark(newIsDark);
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(newIsDark ? "dark" : "light");
        applyThemeToDOM(newIsDark ? defaultTheme.dark : defaultTheme.light);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [mode, mounted]);

  // Initialize on mount - only runs client-side
  useEffect(() => {
    setMounted(true);
    
    // Read from localStorage
    const savedMode = localStorage.getItem("theme-mode") as ThemeMode;
    if (savedMode) {
      setMode(savedMode);
    }
    
    // Add CSS to disable transitions during theme change
    const style = document.createElement("style");
    style.textContent = `
      .disable-transitions * {
        transition: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Only render after mounting to avoid hydration issues
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        theme,
        isDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext); 