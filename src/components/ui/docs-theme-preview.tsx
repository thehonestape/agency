import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { SunIcon, MoonIcon } from "lucide-react";

export interface DocsThemePreviewProps extends React.HTMLAttributes<HTMLButtonElement> {
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
  
  /**
   * ID of the main content element to apply the theme to
   */
  targetElementId?: string;
}

/**
 * DocsThemePreview component for toggling between light and dark themes
 * in the documentation preview area only
 */
export function DocsThemePreview({
  className,
  size = "md",
  variant = "icon",
  showLabel = false,
  targetElementId = "docs-main-content",
  ...props
}: DocsThemePreviewProps) {
  const [isDark, setIsDark] = useState(false);

  // Define size classes
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-9 w-9",
    lg: "h-10 w-10",
  };

  // Define variant classes
  const variantClasses = {
    default:
      "bg-secondary hover:bg-muted text-foreground",
    outline:
      "border border-border bg-transparent hover:bg-secondary text-foreground",
    ghost:
      "bg-transparent hover:bg-secondary text-foreground",
    icon: "text-foreground hover:text-primary",
  };

  const handleClick = () => {
    try {
      // Toggle dark mode state
      const newIsDark = !isDark;
      setIsDark(newIsDark);
      
      // Get the target element
      const targetElement = document.getElementById(targetElementId);
      if (!targetElement) {
        console.error(`Target element with ID "${targetElementId}" not found`);
        return;
      }
      
      // Toggle dark mode class on the target element only
      if (newIsDark) {
        targetElement.classList.add("dark-preview");
      } else {
        targetElement.classList.remove("dark-preview");
      }
      
      console.log(`Theme preview changed to: ${newIsDark ? 'dark' : 'light'}`);
    } catch (error) {
      console.error('Error switching theme preview:', error);
    }
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
      onClick={handleClick}
      aria-label={`Change theme preview, current theme is ${isDark ? 'dark' : 'light'}`}
      {...props}
    >
      {!isDark ? (
        <>
          <SunIcon className="h-[1.2em] w-[1.2em]" />
          {showLabel && <span className="ml-2">Light</span>}
        </>
      ) : (
        <>
          <MoonIcon className="h-[1.2em] w-[1.2em]" />
          {showLabel && <span className="ml-2">Dark</span>}
        </>
      )}
    </button>
  );
}
