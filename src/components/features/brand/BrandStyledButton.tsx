import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { useBrand, useBrandColors, useBrandTypography } from "./BrandProvider";
import { cn } from "../../lib/utils";

export interface BrandStyledButtonProps extends ButtonProps {
  colorVariant?: "primary" | "secondary" | "accent" | "neutral";
  rounded?: boolean;
  subtle?: boolean;
}

export function BrandStyledButton({
  children,
  className,
  colorVariant = "primary",
  variant = "default",
  rounded = false,
  subtle = false,
  ...props
}: BrandStyledButtonProps) {
  const { currentBrand } = useBrand();
  const colors = useBrandColors();
  const typography = useBrandTypography();
  
  if (!currentBrand) {
    // Fall back to default styling if no brand is selected
    return (
      <Button variant={variant} className={className} {...props}>
        {children}
      </Button>
    );
  }
  
  // Find the relevant color based on variant
  const primaryColor = colors.find(c => c.isPrimary)?.value || "hsl(var(--primary))";
  const secondaryColor = colors.find(c => c.isSecondary)?.value || "hsl(var(--secondary))";
  const accentColor = colors.find(c => c.isAccent)?.value || "hsl(var(--accent))";
  
  // Compute the button style based on the brand
  const buttonStyle: React.CSSProperties = {
    fontFamily: typography?.bodyFont || typography?.fontFamily || "inherit",
    fontWeight: typography?.fontWeights?.medium || 500,
    borderRadius: rounded ? (currentBrand.radii?.large || "8px") : (currentBrand.radii?.medium || "4px"),
  };
  
  // Add color styles based on variant
  if (variant === "default") {
    // Solid buttons
    switch (colorVariant) {
      case "primary":
        buttonStyle.backgroundColor = subtle ? `${primaryColor}22` : primaryColor;
        buttonStyle.color = subtle ? primaryColor : "hsl(var(--button-text))";
        break;
      case "secondary":
        buttonStyle.backgroundColor = subtle ? `${secondaryColor}22` : secondaryColor;
        buttonStyle.color = subtle ? secondaryColor : "hsl(var(--button-text))";
        break;
      case "accent":
        buttonStyle.backgroundColor = subtle ? `${accentColor}22` : accentColor;
        buttonStyle.color = subtle ? accentColor : "hsl(var(--button-text))";
        break;
      default:
        // Keep default Tailwind styling
    }
  } else if (variant === "outline") {
    // Outline buttons
    switch (colorVariant) {
      case "primary":
        buttonStyle.borderColor = primaryColor;
        buttonStyle.color = primaryColor;
        break;
      case "secondary":
        buttonStyle.borderColor = secondaryColor;
        buttonStyle.color = secondaryColor;
        break;
      case "accent":
        buttonStyle.borderColor = accentColor;
        buttonStyle.color = accentColor;
        break;
      default:
        // Keep default Tailwind styling
    }
  }
  
  return (
    <Button
      variant={variant}
      className={cn("transition-all", className)}
      style={buttonStyle}
      {...props}
    >
      {children}
    </Button>
  );
} 