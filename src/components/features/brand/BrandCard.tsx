import React, { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { useBrand } from "./BrandProvider";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "elevated" | "subtle";
  padding?: "none" | "xs" | "sm" | "md" | "lg"; 
  noBorder?: boolean;
  isInteractive?: boolean;
}

interface BrandCardHeaderProps {
  className?: string;
  children: ReactNode;
}

export const BrandCardHeader = ({ className, children }: BrandCardHeaderProps) => {
  return (
    <div className={cn("px-4 py-3 border-b border-system", className)}>
      {children}
    </div>
  );
};

// Export alias for backward compatibility
export const CardHeader = BrandCardHeader;

interface BrandCardContentProps {
  className?: string;
  children: ReactNode;
}

export const BrandCardContent = ({ className, children }: BrandCardContentProps) => {
  return (
    <div className={cn("p-4", className)}>
      {children}
    </div>
  );
};

// Export alias for backward compatibility
export const CardContent = BrandCardContent;

interface BrandCardFooterProps {
  className?: string;
  children: ReactNode;
}

export const BrandCardFooter = ({ className, children }: BrandCardFooterProps) => {
  return (
    <div className={cn("px-4 py-3 border-t border-system", className)}>
      {children}
    </div>
  );
};

// Export alias for backward compatibility
export const CardFooter = BrandCardFooter;

interface BrandCardProps {
  className?: string;
  children: ReactNode;
  variant?: "default" | "outline" | "ghost";
  noBorder?: boolean;
}

export const BrandCard = ({ 
  className, 
  children, 
  variant = "default",
  noBorder = false 
}: BrandCardProps) => {
  const variantStyles = {
    default: "bg-card text-card-foreground shadow-sm",
    ghost: "bg-transparent",
    outline: "bg-transparent border border-system",
  };

  const baseStyles = cn(
    "rounded-lg overflow-hidden",
    variantStyles[variant]
  );

  const borderStyles = noBorder ? "" : "border border-system";

  return (
    <div className={cn(
      baseStyles,
      borderStyles,
      className
    )}>
      {children}
    </div>
  );
};

export const BrandCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-base font-medium leading-tight tracking-tight", className)}
    {...props}
  />
));
BrandCardTitle.displayName = "BrandCardTitle";

// Export alias for backward compatibility
export const CardTitle = BrandCardTitle;

export const BrandCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground mt-1", className)}
    {...props}
  />
));
BrandCardDescription.displayName = "BrandCardDescription"; 