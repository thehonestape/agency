import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Text, textVariants } from "./text";

const paragraphVariants = cva(
  "mb-4 max-w-prose",
  {
    variants: {
      // Paragraph-specific spacing that aligns with baseline grid
      spacing: {
        none: "mb-0",
        sm: "mb-2", // 8px
        md: "mb-4", // 16px
        lg: "mb-6", // 24px
        xl: "mb-8", // 32px
      },
      // Paragraph-specific line heights for better readability
      leading: {
        tight: "leading-tight", // 1.25
        snug: "leading-snug", // 1.375
        normal: "leading-normal", // 1.5
        relaxed: "leading-relaxed", // 1.625
        loose: "leading-loose", // 2
      },
      // Max width constraints for optimal readability
      measure: {
        none: "",
        narrow: "max-w-[45ch]", // ~45 characters
        default: "max-w-[65ch]", // ~65 characters
        wide: "max-w-[80ch]", // ~80 characters
      },
      // First paragraph styling
      firstParagraph: {
        true: "first:mt-0 first:text-lg first:font-medium",
        false: "",
      },
    },
    defaultVariants: {
      spacing: "md",
      leading: "relaxed",
      measure: "default",
      firstParagraph: false,
    },
  }
);

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants>,
    Omit<React.ComponentPropsWithoutRef<typeof Text>, "asChild"> {
  asChild?: boolean;
}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ 
    className, 
    spacing, 
    leading, 
    measure, 
    firstParagraph,
    variant, 
    size = "base", 
    state, 
    align, 
    weight,
    asChild = false, 
    ...props 
  }, ref) => {
    return (
      <Text
        ref={ref}
        variant={variant}
        size={size}
        state={state}
        align={align}
        weight={weight}
        className={cn(paragraphVariants({ 
          spacing, 
          leading, 
          measure, 
          firstParagraph,
          className 
        }))}
        data-component="paragraph"
        data-paragraph-spacing={spacing}
        data-paragraph-leading={leading}
        data-paragraph-measure={measure}
        data-paragraph-first={firstParagraph}
        {...props}
      />
    );
  }
);

Paragraph.displayName = "Paragraph";

export { Paragraph, paragraphVariants };
