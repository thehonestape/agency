import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Input class utilities for the dual API
export const inputClasses = {
  base: "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  
  // Size variants
  size: {
    xs: "h-8 px-2 text-xs py-1",
    sm: "h-9 px-2 text-xs py-1.5",
    md: "h-10 px-3 text-sm py-2",
    lg: "h-12 px-4 text-base py-2.5",
    xl: "h-14 px-5 text-lg py-3",
  },
  
  // State variants
  state: {
    default: "",
    error: "border-error focus-visible:ring-error",
    success: "border-success focus-visible:ring-success",
    warning: "border-warning focus-visible:ring-warning",
    disabled: "opacity-50 cursor-not-allowed",
  },
  
  // Visual variants
  variant: {
    default: "bg-background",
    filled: "bg-muted/50 border-input",
    flushed: "border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-b-2",
    outline: "bg-transparent",
    unstyled: "border-0 shadow-none bg-transparent px-0 py-0 h-auto focus-visible:ring-0",
  },
  
  // Border variants
  border: {
    none: "border-0",
    thin: "border-[1px]",
    default: "border-[1px]",
    thick: "border-2",
  },
  
  // Shadow variants
  shadow: {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  },
  
  // Rounded variants
  rounded: {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  },
};

// Legacy inputVariants for backward compatibility
const inputVariants = cva(
  inputClasses.base,
  {
    variants: {
      // Size variants
      inputSize: {
        sm: inputClasses.size.sm,
        md: inputClasses.size.md,
        lg: inputClasses.size.lg,
      },
      // State variants
      state: {
        default: inputClasses.state.default,
        error: inputClasses.state.error,
        success: inputClasses.state.success,
        warning: inputClasses.state.warning,
      },
      // Visual variants
      variant: {
        default: inputClasses.variant.default,
        subtle: "bg-subtle",
        muted: "bg-muted",
        inverse: "bg-inverse",
      },
      // Border variants
      border: {
        none: inputClasses.border.none,
        subtle: "border-subtle",
        default: inputClasses.border.default,
        strong: "border-2 border-default",
      },
      // Shadow variants
      shadow: {
        none: inputClasses.shadow.none,
        sm: inputClasses.shadow.sm,
        md: inputClasses.shadow.md,
        lg: inputClasses.shadow.lg,
      },
      // Rounded variants
      rounded: {
        none: inputClasses.rounded.none,
        sm: inputClasses.rounded.sm,
        md: inputClasses.rounded.md,
        lg: inputClasses.rounded.lg,
        xl: inputClasses.rounded.xl,
        full: inputClasses.rounded.full,
      },
      // Container query support
      container: {
        true: "@container",
        false: "",
      },
    },
    defaultVariants: {
      inputSize: "md",
      state: "default",
      variant: "default",
      border: "default",
      shadow: "none",
      rounded: "md",
      container: false,
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "state">,
    VariantProps<typeof inputVariants> {
  // Common props
  asChild?: boolean;
  
  // Prop-based API (Chakra-like)
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
  helperText?: string;
  
  // Container for error/helper text
  renderErrorMessage?: boolean;
  renderHelperText?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    // Common props
    className, 
    type = "text",
    
    // Legacy props (for backward compatibility)
    inputSize,
    state,
    variant,
    border,
    shadow,
    rounded,
    container,
    
    // Prop-based API (Chakra-like)
    size,
    isDisabled,
    isInvalid,
    isReadOnly,
    isRequired,
    errorMessage,
    helperText,
    renderErrorMessage = false,
    renderHelperText = false,
    
    // Native props
    disabled,
    readOnly,
    required,
    
    ...props 
  }, ref) => {
    // Resolve prop values, prioritizing Chakra-style props
    const resolvedSize = size ? size : inputSize;
    const resolvedDisabled = isDisabled !== undefined ? isDisabled : disabled;
    const resolvedReadOnly = isReadOnly !== undefined ? isReadOnly : readOnly;
    const resolvedRequired = isRequired !== undefined ? isRequired : required;
    const resolvedState = isInvalid ? "error" : state;
    
    // Generate appropriate classes
    const classes = cn(
      // Base input classes
      inputClasses.base,
      
      // Apply size
      resolvedSize && inputClasses.size[resolvedSize as keyof typeof inputClasses.size],
      
      // Apply state
      resolvedState && inputClasses.state[resolvedState as keyof typeof inputClasses.state],
      
      // Apply variant
      variant && (
        variant === "default" 
          ? inputClasses.variant.default 
          : variant === "subtle" 
            ? "bg-subtle" 
            : variant === "muted" 
              ? "bg-muted" 
              : "bg-inverse"
      ),
      
      // Apply border
      border && (
        border === "none" 
          ? inputClasses.border.none 
          : border === "subtle" 
            ? "border-subtle" 
            : border === "default" 
              ? inputClasses.border.default 
              : "border-2 border-default"
      ),
      
      // Apply shadow
      shadow && inputClasses.shadow[shadow as keyof typeof inputClasses.shadow],
      
      // Apply rounded
      rounded && inputClasses.rounded[rounded as keyof typeof inputClasses.rounded],
      
      // Apply container
      container && "@container",
      
      // Apply custom classes
      className
    );
    
    return (
      <>
        <input
          type={type}
          className={classes}
          ref={ref}
          disabled={resolvedDisabled}
          readOnly={resolvedReadOnly}
          required={resolvedRequired}
          aria-invalid={isInvalid}
          aria-required={resolvedRequired}
          data-component="input"
          data-input-size={resolvedSize || inputSize}
          data-input-state={resolvedState || state}
          data-input-variant={variant}
          data-input-border={border}
          data-input-shadow={shadow}
          data-input-rounded={rounded}
          data-input-container={container}
          data-input-disabled={resolvedDisabled}
          data-input-readonly={resolvedReadOnly}
          data-input-required={resolvedRequired}
          data-input-invalid={isInvalid}
          {...props}
        />
        
        {/* Error message */}
        {renderErrorMessage && isInvalid && errorMessage && (
          <div className="mt-1 text-sm text-error" data-component="input-error">
            {errorMessage}
          </div>
        )}
        
        {/* Helper text */}
        {renderHelperText && helperText && (
          <div className="mt-1 text-sm text-muted-foreground" data-component="input-helper">
            {helperText}
          </div>
        )}
      </>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };