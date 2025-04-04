import React from "react";
import { cn } from "@/lib/utils";
import { SunIcon, MoonIcon } from "lucide-react";
import { useTheme } from "@/lib/ThemeProvider";

export interface ThemeToggleProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Size of the theme toggle
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Variant/style of the theme toggle
   */
  variant?: "default" | "outline" | "ghost" | "icon";
  
  /**
   * Whether to show the label
   */
  showLabel?: boolean;
}

/**
 * A simple theme toggle component that switches between light and dark themes
 */
export function ThemeToggle({
  className,
  size = "md",
  variant = "icon",
  showLabel = false,
  ...props
}: ThemeToggleProps) {
  // Use the theme context
  const { isDark, theme, setTheme } = useTheme();
  
  // Toggle between light and dark mode while preserving the color palette
  const toggleMode = () => {
    const [colorPalette, mode] = theme.split('-');
    const newMode = mode === 'light' ? 'dark' : 'light';
    setTheme(`${colorPalette}-${newMode}` as any);
  };
  
  // Define size classes
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-9 w-9",
    lg: "h-10 w-10",
  };

  // Define variant classes
  const variantClasses = {
    default: "bg-secondary hover:bg-muted text-foreground",
    outline: "border border-border bg-transparent hover:bg-secondary text-foreground",
    ghost: "bg-transparent hover:bg-secondary text-foreground",
    icon: "text-foreground hover:text-primary",
  };

  return (
    <button
      type="button"
      className={cn(
        "flex items-center justify-center rounded-md transition-colors",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      onClick={toggleMode}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      {...props}
    >
      {isDark ? (
        <>
          <SunIcon className="h-[1.2em] w-[1.2em]" />
          {showLabel && <span className="ml-2">Switch to Light</span>}
        </>
      ) : (
        <>
          <MoonIcon className="h-[1.2em] w-[1.2em]" />
          {showLabel && <span className="ml-2">Switch to Dark</span>}
        </>
      )}
    </button>
  );
}
