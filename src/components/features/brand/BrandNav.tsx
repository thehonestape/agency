import React from "react";
import { cn } from "../../lib/utils";
import { useBrand, useBrandColors, useBrandTypography } from "./BrandProvider";
import { Link, useLocation } from "react-router-dom";

export interface NavItemProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

export interface BrandNavProps {
  items: NavItemProps[];
  variant?: "default" | "pills" | "tabs" | "minimal" | "underline";
  direction?: "horizontal" | "vertical";
  colorScheme?: "primary" | "secondary" | "accent" | "neutral";
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  fullWidth?: boolean;
  iconPosition?: "left" | "right" | "top";
  className?: string;
  itemClassName?: string;
  activeItemClassName?: string;
}

export function BrandNav({
  items,
  variant = "default",
  direction = "horizontal",
  colorScheme = "primary",
  size = "md",
  rounded = false,
  fullWidth = false,
  iconPosition = "left",
  className,
  itemClassName,
  activeItemClassName,
}: BrandNavProps) {
  const { currentBrand } = useBrand();
  const colors = useBrandColors();
  const typography = useBrandTypography();
  const location = useLocation();
  
  // Get brand colors
  const getColorValue = (type: "primary" | "secondary" | "accent" | "neutral") => {
    const colorMap = {
      primary: colors.find(c => c.isPrimary)?.value || "#1F2937",
      secondary: colors.find(c => c.isSecondary)?.value || "#6B7280",
      accent: colors.find(c => c.isAccent)?.value || "#F59E0B",
      neutral: "#6B7280"
    };
    
    return colorMap[type];
  };
  
  // Get border radius
  const getBorderRadius = () => {
    if (!rounded) return undefined;
    
    // Use brand radii if available
    if (currentBrand?.radii) {
      return currentBrand.radii.medium;
    }
    
    return "0.375rem";
  };
  
  // Get size values
  const getFontSize = () => {
    const sizeMap = {
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem"
    };
    
    return sizeMap[size];
  };
  
  const getPadding = () => {
    const sizeMap = {
      sm: direction === "horizontal" ? "0.5rem 0.75rem" : "0.5rem 0.75rem",
      md: direction === "horizontal" ? "0.625rem 1rem" : "0.625rem 1rem",
      lg: direction === "horizontal" ? "0.75rem 1.25rem" : "0.75rem 1.25rem"
    };
    
    return sizeMap[size];
  };
  
  // Get nav container styles
  const containerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: direction === "horizontal" ? "row" : "column",
    alignItems: direction === "horizontal" ? "center" : "stretch",
    justifyContent: "flex-start",
    gap: direction === "horizontal" ? "0.5rem" : "0.25rem",
    fontFamily: typography?.bodyFont || typography?.fontFamily || "inherit",
    width: fullWidth ? "100%" : "auto"
  };
  
  // Get item styles based on variant and active state
  const getItemStyles = (isActive: boolean, isDisabled: boolean): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: getPadding(),
      fontSize: getFontSize(),
      fontWeight: isActive ? 600 : 400,
      cursor: isDisabled ? "not-allowed" : "pointer",
      opacity: isDisabled ? 0.5 : 1,
      borderRadius: getBorderRadius(),
      transition: "all 0.2s ease",
    };
    
    if (iconPosition === "top") {
      baseStyles.flexDirection = "column";
      baseStyles.gap = "0.25rem";
    } else if (iconPosition === "right") {
      baseStyles.flexDirection = "row-reverse";
    }
    
    // Set styles based on variant
    const color = getColorValue(colorScheme);
    
    switch (variant) {
      case "pills":
        if (isActive) {
          baseStyles.backgroundColor = color;
          baseStyles.color = "#ffffff";
        } else {
          baseStyles.backgroundColor = "transparent";
          baseStyles.color = "inherit";
        }
        break;
        
      case "tabs":
        baseStyles.borderBottom = isActive ? `2px solid ${color}` : "2px solid transparent";
        baseStyles.color = isActive ? color : "inherit";
        baseStyles.marginBottom = "-2px";
        break;
        
      case "underline":
        baseStyles.borderBottom = isActive ? `2px solid ${color}` : "2px solid transparent";
        baseStyles.color = isActive ? color : "inherit";
        baseStyles.borderRadius = "0";
        break;
        
      case "minimal":
        baseStyles.color = isActive ? color : "inherit";
        baseStyles.fontWeight = isActive ? 600 : 400;
        break;
        
      default: // default variant
        baseStyles.color = isActive ? color : "inherit";
        baseStyles.fontWeight = isActive ? 600 : 400;
        baseStyles.borderBottom = isActive ? `2px solid ${color}` : "none";
    }
    
    return baseStyles;
  };
  
  return (
    <nav style={containerStyles} className={className}>
      {items.map((item, index) => {
        const isActive = item.isActive !== undefined 
          ? item.isActive 
          : location.pathname === item.href;
        
        const pillHoverClass = variant === "pills" && !isActive 
          ? `hover:bg-opacity-10 hover:bg-${colorScheme}` 
          : "";
        
        return (
          <Link
            key={index}
            to={item.href}
            onClick={item.isDisabled ? (e) => e.preventDefault() : item.onClick}
            style={getItemStyles(isActive, Boolean(item.isDisabled))}
            className={cn(
              "transition-colors",
              pillHoverClass,
              isActive ? activeItemClassName : "",
              itemClassName
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {item.icon && iconPosition !== "right" && (
              <span className="nav-icon">{item.icon}</span>
            )}
            <span>{item.label}</span>
            {item.icon && iconPosition === "right" && (
              <span className="nav-icon">{item.icon}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
} 