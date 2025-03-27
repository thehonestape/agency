import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground transition-all duration-200",
  {
    variants: {
      // Visual variants
      variant: {
        default: "shadow-sm hover:shadow-md",
        flat: "border-none shadow-none",
        outlined: "shadow-none",
        elevated: "shadow-md hover:shadow-lg",
        filled: "bg-muted border-none shadow-none",
      },
      // Size variants
      size: {
        sm: "p-3",
        md: "p-6",
        lg: "p-8",
      },
      // Interactive variants
      interactive: {
        true: "cursor-pointer hover:translate-y-[-2px] active:translate-y-[0px]",
        false: "",
      },
      // State variants
      state: {
        default: "",
        success: "border-l-4 border-l-success",
        warning: "border-l-4 border-l-warning",
        error: "border-l-4 border-l-error",
        info: "border-l-4 border-l-info",
      },
      // Container query support
      container: {
        true: "@container",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      interactive: false,
      state: "default",
      container: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant, 
    size, 
    interactive, 
    state, 
    container, 
    ...props 
  }, ref) => (
    <div
      ref={ref}
      className={cn(
        cardVariants({ 
          variant, 
          size, 
          interactive, 
          state, 
          container, 
          className 
        })
      )}
      {...props}
    />
  )
);

Card.displayName = "Card";

const headerVariants = cva(
  "flex flex-col space-y-1.5",
  {
    variants: {
      size: {
        sm: "p-3",
        md: "p-6",
        lg: "p-8",
      },
      border: {
        none: "",
        bottom: "border-b",
      },
    },
    defaultVariants: {
      size: "md",
      border: "bottom",
    },
  }
);

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof headerVariants> {
  asChild?: boolean;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, size, border, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(headerVariants({ size, border, className }))}
      {...props}
    />
  )
);

CardHeader.displayName = "CardHeader";

const titleVariants = cva(
  "font-semibold leading-none tracking-tight text-card-foreground",
  {
    variants: {
      size: {
        sm: "text-lg",
        md: "text-xl",
        lg: "text-2xl",
      },
      weight: {
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
    },
    defaultVariants: {
      size: "md",
      weight: "semibold",
    },
  }
);

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof titleVariants> {
  asChild?: boolean;
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, size, weight, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(titleVariants({ size, weight, className }))}
      {...props}
    />
  )
);

CardTitle.displayName = "CardTitle";

const descriptionVariants = cva(
  "text-muted-foreground",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      weight: {
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
      },
    },
    defaultVariants: {
      size: "md",
      weight: "normal",
    },
  }
);

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof descriptionVariants> {
  asChild?: boolean;
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, size, weight, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(descriptionVariants({ size, weight, className }))}
      {...props}
    />
  )
);

CardDescription.displayName = "CardDescription";

const contentVariants = cva(
  "",
  {
    variants: {
      size: {
        sm: "p-3 pt-0",
        md: "p-6 pt-0",
        lg: "p-8 pt-0",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contentVariants> {
  asChild?: boolean;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(contentVariants({ size, className }))}
      {...props}
    />
  )
);

CardContent.displayName = "CardContent";

const footerVariants = cva(
  "flex items-center",
  {
    variants: {
      size: {
        sm: "p-3 pt-0",
        md: "p-6 pt-0",
        lg: "p-8 pt-0",
      },
      border: {
        none: "",
        top: "border-t",
      },
      align: {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
        between: "justify-between",
      },
    },
    defaultVariants: {
      size: "md",
      border: "top",
      align: "left",
    },
  }
);

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof footerVariants> {
  asChild?: boolean;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, size, border, align, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(footerVariants({ size, border, align, className }))}
      {...props}
    />
  )
);

CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
  headerVariants,
  titleVariants,
  descriptionVariants,
  contentVariants,
  footerVariants,
}; 