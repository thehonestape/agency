import React, { InputHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const inputVariants = cva(
  "flex w-full border border-input bg-background text-foreground shadow-sm transition-all duration-200 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        default: "h-10 px-3 py-2 text-sm rounded-md",
        sm: "h-8 px-2 py-1 text-xs rounded-sm",
        lg: "h-12 px-4 py-3 text-base rounded-md",
        xl: "h-14 px-5 py-4 text-lg rounded-lg",
      },
      state: {
        default: "",
        error: "border-destructive focus-visible:ring-destructive/30",
        success: "border-green-500 focus-visible:ring-green-500/30",
        warning: "border-yellow-500 focus-visible:ring-yellow-500/30",
      },
      width: {
        default: "w-full",
        auto: "w-auto",
        sm: "w-32",
        md: "w-64",
        lg: "w-96",
      },
    },
    defaultVariants: {
      size: "default",
      state: "default",
      width: "default",
    },
  }
);

export interface InputProps 
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "width">,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
  loading?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className = "", 
    size, 
    state, 
    width, 
    leftIcon, 
    rightIcon, 
    helperText, 
    loading = false,
    disabled,
    ...props 
  }, ref) => {
    // Prepare ARIA attributes properly
    const ariaProps: {[key: string]: string} = {};
    if (loading) ariaProps["aria-busy"] = "true";
    if (state === "error") ariaProps["aria-invalid"] = "true";
    
    return (
      <div className="relative w-full">
        {loading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="animate-spin h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
        
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        <input
          className={cn(
            inputVariants({ size, state, width }),
            leftIcon && "pl-10",
            rightIcon && !loading && "pr-10",
            loading && "pr-10",
            className
          )}
          ref={ref}
          disabled={disabled || loading}
          {...ariaProps}
          {...props}
        />
        
        {rightIcon && !loading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {rightIcon}
          </div>
        )}
        
        {helperText && (
          <p className={cn(
            "text-xs mt-1",
            state === "error" && "text-destructive",
            state === "success" && "text-green-600",
            state === "warning" && "text-yellow-600",
            state === "default" && "text-muted-foreground"
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input"; 