import React from "react";
import { cn } from "../../lib/utils";
import { useBrand } from "./BrandProvider";
import { FiChevronDown } from "react-icons/fi";

export interface BrandSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface BrandSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label?: string;
  helperText?: string;
  error?: string;
  options: BrandSelectOption[];
  variant?: "default" | "filled" | "outline";
  colorScheme?: "primary" | "secondary" | "accent";
  fullWidth?: boolean;
  onChange?: (value: string) => void;
}

export const BrandSelect = React.forwardRef<HTMLSelectElement, BrandSelectProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      options,
      variant = "default",
      colorScheme = "primary",
      fullWidth = false,
      onChange,
      ...props
    },
    ref
  ) => {
    const { currentBrand } = useBrand();
    
    // Handle change event
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value);
    };

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
    const getSelectStyles = () => {
      let styles: React.CSSProperties = {};
      
      if (primaryColor) {
        if (variant === "filled") {
          styles.backgroundColor = `${primaryColor}15`; // 15% opacity
          styles.borderColor = `${primaryColor}30`; // 30% opacity
        } else if (variant === "outline") {
          styles.borderColor = `${primaryColor}50`; // 50% opacity
        }
      }
      
      return styles;
    };
    
    const baseClasses = [
      "flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      fullWidth ? "w-full" : "w-auto",
      variant === "filled" ? "bg-muted/50" : "",
      error ? "border-destructive focus-visible:ring-destructive" : "",
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
        <div className="relative">
          <select
            className={cn(...baseClasses, "pr-8")}
            ref={ref}
            style={getSelectStyles()}
            onChange={handleChange}
            {...props}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <FiChevronDown className="h-4 w-4 opacity-50" />
          </div>
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