import React from "react";
import { useTheme } from "./theme-provider";
import { cn } from "../../../lib/utils";

// Icons for theme modes
function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 12.75C11.0711 12.75 12.75 11.0711 12.75 9C12.75 6.92893 11.0711 5.25 9 5.25C6.92893 5.25 5.25 6.92893 5.25 9C5.25 11.0711 6.92893 12.75 9 12.75ZM9 14.25C11.8995 14.25 14.25 11.8995 14.25 9C14.25 6.10051 11.8995 3.75 9 3.75C6.10051 3.75 3.75 6.10051 3.75 9C3.75 11.8995 6.10051 14.25 9 14.25Z"
        fill="currentColor"
      />
      <path
        d="M9 1.5C9.41421 1.5 9.75 1.83579 9.75 2.25V3C9.75 3.41421 9.41421 3.75 9 3.75C8.58579 3.75 8.25 3.41421 8.25 3V2.25C8.25 1.83579 8.58579 1.5 9 1.5Z"
        fill="currentColor"
      />
      <path
        d="M9 14.25C9.41421 14.25 9.75 14.5858 9.75 15V15.75C9.75 16.1642 9.41421 16.5 9 16.5C8.58579 16.5 8.25 16.1642 8.25 15.75V15C8.25 14.5858 8.58579 14.25 9 14.25Z"
        fill="currentColor"
      />
      <path
        d="M16.5 9C16.5 8.58579 16.1642 8.25 15.75 8.25H15C14.5858 8.25 14.25 8.58579 14.25 9C14.25 9.41421 14.5858 9.75 15 9.75H15.75C16.1642 9.75 16.5 9.41421 16.5 9Z"
        fill="currentColor"
      />
      <path
        d="M3.75 9C3.75 8.58579 3.41421 8.25 3 8.25H2.25C1.83579 8.25 1.5 8.58579 1.5 9C1.5 9.41421 1.83579 9.75 2.25 9.75H3C3.41421 9.75 3.75 9.41421 3.75 9Z"
        fill="currentColor"
      />
      <path
        d="M13.6967 4.3033C13.9896 4.01041 13.9896 3.53553 13.6967 3.24264L13.1719 2.71785C12.879 2.42496 12.4041 2.42496 12.1112 2.71785C11.8183 3.01074 11.8183 3.48562 12.1112 3.77851L12.636 4.3033C12.9289 4.59619 13.4038 4.59619 13.6967 4.3033Z"
        fill="currentColor"
      />
      <path
        d="M4.3033 13.6967C4.59619 13.4038 4.59619 12.9289 4.3033 12.636L3.77851 12.1112C3.48562 11.8183 3.01074 11.8183 2.71785 12.1112C2.42496 12.4041 2.42496 12.879 2.71785 13.1719L3.24264 13.6967C3.53553 13.9896 4.01041 13.9896 4.3033 13.6967Z"
        fill="currentColor"
      />
      <path
        d="M13.6967 13.6967C13.4038 13.9896 12.9289 13.9896 12.636 13.6967L12.1112 13.1719C11.8183 12.879 11.8183 12.4041 12.1112 12.1112C12.4041 11.8183 12.879 11.8183 13.1719 12.1112L13.6967 12.636C13.9896 12.9289 13.9896 13.4038 13.6967 13.6967Z"
        fill="currentColor"
      />
      <path
        d="M4.3033 4.3033C4.01041 4.59619 3.53553 4.59619 3.24264 4.3033L2.71785 3.77851C2.42496 3.48562 2.42496 3.01074 2.71785 2.71785C3.01074 2.42496 3.48562 2.42496 3.77851 2.71785L4.3033 3.24264C4.59619 3.53553 4.59619 4.01041 4.3033 4.3033Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.12727 2.81215C9.31311 3.17383 9.17348 3.60941 8.81179 3.79525C7.24463 4.57934 6.24999 6.26624 6.24999 8.18181C6.24999 10.9827 8.51909 13.2518 11.32 13.2518C12.3375 13.2518 13.2737 12.9153 14.0339 12.3478C14.3511 12.1058 14.7966 12.1709 15.0385 12.4882C15.2805 12.8055 15.2153 13.251 14.898 13.493C13.8755 14.2518 12.6306 14.7018 11.32 14.7018C7.71818 14.7018 4.79999 11.7836 4.79999 8.18181C4.79999 5.58067 6.20151 3.30072 8.32636 2.23667C8.68804 2.05083 9.12363 2.19047 9.30947 2.55215L9.12727 2.81215Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SystemIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 2.25C3.25736 2.25 2.25 3.25736 2.25 4.5V10.5C2.25 11.7426 3.25736 12.75 4.5 12.75H6.75V14.25H5.25C4.83579 14.25 4.5 14.5858 4.5 15C4.5 15.4142 4.83579 15.75 5.25 15.75H12.75C13.1642 15.75 13.5 15.4142 13.5 15C13.5 14.5858 13.1642 14.25 12.75 14.25H11.25V12.75H13.5C14.7426 12.75 15.75 11.7426 15.75 10.5V4.5C15.75 3.25736 14.7426 2.25 13.5 2.25H4.5ZM9.75 12.75V14.25H8.25V12.75H9.75ZM3.75 4.5C3.75 4.08579 4.08579 3.75 4.5 3.75H13.5C13.9142 3.75 14.25 4.08579 14.25 4.5V10.5C14.25 10.9142 13.9142 11.25 13.5 11.25H4.5C4.08579 11.25 3.75 10.9142 3.75 10.5V4.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export interface ThemeSwitcherProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Size of the theme switcher
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Variant/style of the theme switcher
   */
  variant?: "default" | "outline" | "ghost" | "icon";
  
  /**
   * Whether to show the label
   */
  showLabel?: boolean;
  
  /**
   * Whether to include system theme option
   */
  includeSystem?: boolean;
}

/**
 * ThemeSwitcher component for toggling between light, dark and system themes
 */
export function ThemeSwitcher({
  className,
  size = "md",
  variant = "icon",
  showLabel = false,
  includeSystem = true,
  ...props
}: ThemeSwitcherProps) {
  const { mode, setMode } = useTheme();

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
    // If system theme is included, cycle through light, dark, system
    if (includeSystem) {
      setMode((prevMode) => {
        if (prevMode === "light") return "dark";
        if (prevMode === "dark") return "system";
        return "light";
      });
    } 
    // Otherwise just toggle between light and dark
    else {
      setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
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
      aria-label={`Change theme, current theme is ${mode}`}
      {...props}
    >
      {mode === "light" && (
        <>
          <SunIcon className="h-[1.2em] w-[1.2em]" />
          {showLabel && <span className="ml-2">Light</span>}
        </>
      )}
      {mode === "dark" && (
        <>
          <MoonIcon className="h-[1.2em] w-[1.2em]" />
          {showLabel && <span className="ml-2">Dark</span>}
        </>
      )}
      {mode === "system" && (
        <>
          <SystemIcon className="h-[1.2em] w-[1.2em]" />
          {showLabel && <span className="ml-2">System</span>}
        </>
      )}
    </button>
  );
} 