import React from 'react';
import { useTheme } from '../../lib/theme-context';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

// Define button variants using CVA
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        sm: "h-9 px-3 rounded-md",
        md: "h-10 py-2 px-4",
        lg: "h-11 px-8 rounded-md",
        xl: "h-12 px-10 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// Define common button properties
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  arrow?: boolean | 'left' | 'right';
}

export function Button({
  className,
  variant = "default",
  size,
  children,
  icon,
  iconPosition = 'left',
  arrow,
  ...props
}: ButtonProps) {
  const { currentThemeId } = useTheme();
  
  // Render arrow if needed
  const renderArrow = () => {
    if (!arrow) return null;
    
    return (
      <svg 
        className={`h-4 w-4 ${arrow === 'left' ? 'mr-2' : 'ml-2'}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {arrow === 'left' ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        )}
      </svg>
    );
  };

  // Render our fallback button
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {arrow === 'left' && renderArrow()}
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
      {arrow && arrow !== 'left' && renderArrow()}
    </button>
  );
}

export default Button; 