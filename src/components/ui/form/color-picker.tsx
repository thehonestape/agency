import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const colorPickerVariants = cva(
  "flex w-full items-center gap-2",
  {
    variants: {
      // Size variants
      size: {
        sm: "h-8",
        md: "h-10",
        lg: "h-12",
      },
      // State variants
      state: {
        default: "",
        error: "border-error focus-visible:ring-error",
        success: "border-success focus-visible:ring-success",
        warning: "border-warning focus-visible:ring-warning",
        info: "border-info focus-visible:ring-info",
      },
      // Visual variants
      variant: {
        default: "bg-background",
        subtle: "bg-subtle",
        muted: "bg-muted",
        inverse: "bg-inverse",
      },
      // Border variants
      border: {
        none: "border-0",
        subtle: "border-subtle",
        default: "border-default",
        strong: "border-2 border-default",
      },
      // Shadow variants
      shadow: {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      },
      // Container query support
      container: {
        true: "@container",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
      variant: "default",
      border: "default",
      shadow: "none",
      container: false,
    },
  }
);

const colorPreviewVariants = cva(
  "rounded-md border",
  {
    variants: {
      size: {
        sm: "h-6 w-6",
        md: "h-8 w-8",
        lg: "h-10 w-10",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const colorInputVariants = cva(
  "flex h-full w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8",
        md: "h-10",
        lg: "h-12",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface ColorPickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof colorPickerVariants> {
  asChild?: boolean;
  label?: string;
  description?: string;
  error?: string;
  showHex?: boolean;
  showHSL?: boolean;
  showRGB?: boolean;
  showAlpha?: boolean;
}

const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(
  ({ 
    className, 
    size, 
    state, 
    variant, 
    border, 
    shadow, 
    container, 
    label,
    description,
    error,
    showHex = true,
    showHSL = false,
    showRGB = false,
    showAlpha = false,
    value,
    onChange,
    ...props 
  }, ref) => {
    // Helper function to convert hex to HSL
    const hexToHSL = (hex: string) => {
      // Convert hex to RGB
      let r = parseInt(hex.slice(1, 3), 16) / 255;
      let g = parseInt(hex.slice(3, 5), 16) / 255;
      let b = parseInt(hex.slice(5, 7), 16) / 255;
      
      // Find min/max for HSL calculation
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }

      // Convert to HSL values
      h = Math.round(h * 360);
      s = Math.round(s * 100);
      l = Math.round(l * 100);
      
      return { h, s, l };
    };

    // Helper function to convert hex to RGB
    const hexToRGB = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (onChange) {
        onChange(e);
      }
    };

    const colorValue = value as string;
    const hsl = hexToHSL(colorValue);
    const rgb = hexToRGB(colorValue);

    return (
      <div className="space-y-2">
        {(label || description || error) && (
          <div className="space-y-1">
            {label && (
              <label
                htmlFor={props.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
            {error && (
              <p className="text-sm text-destructive">
                {error}
              </p>
            )}
          </div>
        )}
        <div className={cn(colorPickerVariants({ 
          size, 
          state, 
          variant, 
          border, 
          shadow, 
          container, 
          className 
        }))}>
          <div 
            className={cn(colorPreviewVariants({ size }))}
            style={{ backgroundColor: colorValue }}
          />
          <input
            ref={ref}
            type="color"
            className={cn(colorInputVariants({ size }))}
            value={colorValue}
            onChange={handleChange}
            {...props}
          />
          {(showHex || showHSL || showRGB) && (
            <div className="flex gap-2 text-sm text-muted-foreground">
              {showHex && (
                <span>{colorValue}</span>
              )}
              {showHSL && (
                <span>hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</span>
              )}
              {showRGB && (
                <span>rgb({rgb.r}, {rgb.g}, {rgb.b})</span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

ColorPicker.displayName = "ColorPicker";

export { ColorPicker, colorPickerVariants, colorPreviewVariants, colorInputVariants }; 