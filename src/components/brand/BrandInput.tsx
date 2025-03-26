import React from "react";
import { cn } from "../../lib/utils";
import { useBrand } from "./BrandProvider";

export interface BrandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: "default" | "filled" | "outline";
  colorScheme?: "primary" | "secondary" | "accent";
  fullWidth?: boolean;
}

export const BrandInput = React.forwardRef<HTMLInputElement, BrandInputProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      startIcon,
      endIcon,
      variant = "default",
      colorScheme = "primary",
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const { currentBrand } = useBrand();
    
    // Get appropriate brand colors
    const getBrandColor = () => {
      if (!currentBrand) return null;
      
      const colorObj = currentBrand.colors.find(c => {
        if (colorScheme === "primary") return c.isPrimary;
        if (colorScheme === "secondary") return c.isSecondary;
        if (colorScheme === "accent") return c.isAccent;
        return false;
      });
      
      return colorObj?.value;
    };
    
    const primaryColor = getBrandColor();
    
    // Apply styles based on variant and brand
    const getInputStyles = () => {
      let styles: React.CSSProperties = {};
      
      if (primaryColor) {
        if (variant === "filled") {
          styles.backgroundColor = `${primaryColor}15`; // 15% opacity
          styles.borderColor = `${primaryColor}30`; // 30% opacity
        } else if (variant === "outline") {
          styles.borderColor = `${primaryColor}50`; // 50% opacity
        }
        
        // Focus styles will be handled by the :focus-within in Tailwind
      }
      
      return styles;
    };
    
    const baseClasses = [
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      fullWidth ? "w-full" : "w-auto",
      variant === "filled" ? "bg-muted/50" : "",
      error ? "border-destructive focus-visible:ring-destructive" : "",
      !startIcon && "pl-3",
      !endIcon && "pr-3",
    ];
    
    return (
      <div className={cn("space-y-2", fullWidth ? "w-full" : "w-auto", className)}>
        {label && (
          <label
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              error ? "text-destructive" : ""
            )}
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            "relative flex items-center rounded-md",
            error ? "text-destructive" : ""
          )}
        >
          {startIcon && (
            <div className="absolute left-2 flex h-full items-center pointer-events-none">
              {startIcon}
            </div>
          )}
          <input
            className={cn(
              ...baseClasses,
              startIcon && "pl-9",
              endIcon && "pr-9"
            )}
            ref={ref}
            style={getInputStyles()}
            {...props}
          />
          {endIcon && (
            <div className="absolute right-2 flex h-full items-center pointer-events-none">
              {endIcon}
            </div>
          )}
        </div>
        {(helperText || error) && (
          <p
            className={cn(
              "text-xs",
              error ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
); 