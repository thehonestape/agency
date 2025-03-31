import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const proseVariants = cva(
  "prose",
  {
    variants: {
      variant: {
        default: "prose-slate",
        gray: "prose-gray",
        zinc: "prose-zinc",
        neutral: "prose-neutral",
        stone: "prose-stone",
      },
      size: {
        sm: "prose-sm",
        base: "prose",
        lg: "prose-lg",
        xl: "prose-xl",
        "2xl": "prose-2xl",
      },
      theme: {
        light: "",
        dark: "dark:prose-invert",
        auto: "dark:prose-invert",
      },
      width: {
        default: "",
        none: "max-w-none",
        narrow: "max-w-[65ch]",
        wide: "max-w-[80ch]",
      },
      spacing: {
        default: "",
        tight: "[&>*]:my-2",
        relaxed: "[&>*]:my-6",
        custom: "", // Use with className for custom spacing
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
      theme: "auto",
      width: "default",
      spacing: "default",
    },
  }
);

export interface ProseProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof proseVariants> {
  asChild?: boolean;
}

/**
 * Prose component
 * 
 * A container for longform content that applies proper typography styling
 * using Tailwind's Typography plugin. This component is ideal for:
 * 
 * - Blog posts
 * - Articles
 * - Documentation
 * - Any content with multiple paragraphs, headings, lists, etc.
 * 
 * Example:
 * <Prose>
 *   <h2>Article Title</h2>
 *   <p>First paragraph...</p>
 *   <h3>Section Heading</h3>
 *   <p>More content...</p>
 * </Prose>
 */
const Prose = React.forwardRef<HTMLDivElement, ProseProps>(
  ({ 
    className, 
    variant, 
    size, 
    theme,
    width,
    spacing,
    asChild = false, 
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(proseVariants({ 
          variant, 
          size, 
          theme,
          width,
          spacing,
          className 
        }))}
        data-component="prose"
        data-prose-variant={variant}
        data-prose-size={size}
        data-prose-theme={theme}
        data-prose-width={width}
        data-prose-spacing={spacing}
        {...props}
      />
    );
  }
);

Prose.displayName = "Prose";

export { Prose, proseVariants };
