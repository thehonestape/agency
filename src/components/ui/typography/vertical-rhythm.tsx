import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const verticalRhythmVariants = cva(
  "",
  {
    variants: {
      // Vertical spacing that aligns with the 8px baseline grid
      space: {
        0: "space-y-0",
        1: "space-y-1", // 4px
        2: "space-y-2", // 8px
        3: "space-y-3", // 12px
        4: "space-y-4", // 16px
        5: "space-y-5", // 20px
        6: "space-y-6", // 24px
        8: "space-y-8", // 32px
        10: "space-y-10", // 40px
        12: "space-y-12", // 48px
        16: "space-y-16", // 64px
      },
      // Responsive spacing that changes at different breakpoints
      responsive: {
        true: "space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10",
        false: "",
      },
      // Consistent first element spacing
      firstElementMargin: {
        none: "first:mt-0",
        inherit: "",
      },
      // Consistent last element spacing
      lastElementMargin: {
        none: "last:mb-0",
        inherit: "",
      },
    },
    defaultVariants: {
      space: 4,
      responsive: false,
      firstElementMargin: "none",
      lastElementMargin: "none",
    },
  }
);

export interface VerticalRhythmProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof verticalRhythmVariants> {
  asChild?: boolean;
}

/**
 * VerticalRhythm component
 * 
 * A container that applies consistent vertical spacing between child elements
 * based on the 8px baseline grid. Use this to maintain proper typographic rhythm
 * in content areas with multiple text elements.
 * 
 * Example:
 * <VerticalRhythm space={4}>
 *   <Heading>Title</Heading>
 *   <Paragraph>First paragraph...</Paragraph>
 *   <Paragraph>Second paragraph...</Paragraph>
 * </VerticalRhythm>
 */
const VerticalRhythm = React.forwardRef<HTMLDivElement, VerticalRhythmProps>(
  ({ 
    className, 
    space, 
    responsive, 
    firstElementMargin,
    lastElementMargin,
    asChild = false, 
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(verticalRhythmVariants({ 
          space, 
          responsive, 
          firstElementMargin,
          lastElementMargin,
          className 
        }))}
        data-component="vertical-rhythm"
        data-rhythm-space={space}
        data-rhythm-responsive={responsive}
        data-rhythm-first-margin={firstElementMargin}
        data-rhythm-last-margin={lastElementMargin}
        {...props}
      />
    );
  }
);

VerticalRhythm.displayName = "VerticalRhythm";

export { VerticalRhythm, verticalRhythmVariants };
