import * as React from "react";
import { cn } from "@/lib/utils";

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  direction?: "row" | "column";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  divider?: React.ReactNode;
  children: React.ReactNode;
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ 
    className, 
    spacing = 4, 
    direction = "column", 
    align = "stretch", 
    justify = "start", 
    wrap = false, 
    divider,
    children, 
    ...props 
  }, ref) => {
    const getSpacingClass = () => {
      if (direction === "column") {
        return `gap-${spacing}`;
      }
      return `gap-x-${spacing}`;
    };
    
    const getDirectionClass = () => {
      return direction === "column" ? "flex-col" : "flex-row";
    };
    
    const getAlignClass = () => {
      switch (align) {
        case "start": return "items-start";
        case "center": return "items-center";
        case "end": return "items-end";
        case "stretch": return "items-stretch";
        default: return "items-stretch";
      }
    };
    
    const getJustifyClass = () => {
      switch (justify) {
        case "start": return "justify-start";
        case "center": return "justify-center";
        case "end": return "justify-end";
        case "between": return "justify-between";
        case "around": return "justify-around";
        case "evenly": return "justify-evenly";
        default: return "justify-start";
      }
    };
    
    const getWrapClass = () => {
      return wrap ? "flex-wrap" : "flex-nowrap";
    };

    // If there's a divider, we need to render it between each child
    const childrenWithDividers = React.Children.toArray(children).reduce<React.ReactNode[]>(
      (acc, child, index, array) => {
        acc.push(child);
        if (divider && index < array.length - 1) {
          acc.push(
            React.cloneElement(
              divider as React.ReactElement,
              { key: `divider-${index}` }
            )
          );
        }
        return acc;
      },
      []
    );
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          getDirectionClass(),
          getSpacingClass(),
          getAlignClass(),
          getJustifyClass(),
          getWrapClass(),
          className
        )}
        data-component="stack"
        data-stack-direction={direction}
        data-stack-spacing={spacing}
        {...props}
      >
        {divider ? childrenWithDividers : children}
      </div>
    );
  }
);

Stack.displayName = "Stack";

// Export a VStack component for convenience (vertical stack)
export const VStack = React.forwardRef<HTMLDivElement, Omit<StackProps, "direction">>(
  (props, ref) => <Stack ref={ref} direction="column" {...props} />
);

VStack.displayName = "VStack";

// Export an HStack component for convenience (horizontal stack)
export const HStack = React.forwardRef<HTMLDivElement, Omit<StackProps, "direction">>(
  (props, ref) => <Stack ref={ref} direction="row" {...props} />
);

HStack.displayName = "HStack";
