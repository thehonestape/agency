import React, { forwardRef, useEffect, useRef } from "react";
import { useStyleProps } from "../hooks/use-style-props";
import { useComponentAnalytics } from "../hooks/use-component-analytics";
import { cn } from "../lib/utils";

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  // Intelligent style props
  w?: string | number | object;
  h?: string | number | object;
  p?: string | number | object;
  m?: string | number | object;
  bg?: string;
  color?: string;
  borderRadius?: string | number | object;
  shadow?: string;
  
  // Self-adaptation props
  adaptToContent?: boolean;
  adaptToContainer?: boolean;
  optimizeFor?: "readability" | "density" | "interaction" | "default";
  
  // Analytics and feedback
  collectUsageData?: boolean;
  
  // Composition props
  as?: React.ElementType;
}

/**
 * Box is the most fundamental primitive component.
 * It's an intelligent div that learns from how it's used.
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ 
    children, 
    className,
    as: Component = "div",
    adaptToContent = false,
    adaptToContainer = false,
    optimizeFor = "default",
    collectUsageData = true,
    ...props 
  }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const combinedRef = useCombinedRefs(ref, internalRef);
    
    // Process style props into className
    const { styleClasses, restProps } = useStyleProps(props);
    
    // Analytics and learning system
    const { recordUsage, adaptiveProps } = useComponentAnalytics(
      "Box", 
      props, 
      { enabled: collectUsageData }
    );
    
    // Content adaptation logic
    useEffect(() => {
      if (!adaptToContent || !internalRef.current) return;
      
      // Implement content adaptation logic
      const observer = new ResizeObserver(entries => {
        for (const entry of entries) {
          // Analyze content and adapt component
          const contentRect = entry.contentRect;
          // Intelligent sizing and spacing based on content
        }
      });
      
      observer.observe(internalRef.current);
      return () => observer.disconnect();
    }, [adaptToContent]);
    
    // Container adaptation logic
    useEffect(() => {
      if (!adaptToContainer || !internalRef.current) return;
      
      // Implement container adaptation logic
      const observer = new ResizeObserver(entries => {
        // Adapt to container size changes
      });
      
      if (internalRef.current.parentElement) {
        observer.observe(internalRef.current.parentElement);
      }
      
      return () => observer.disconnect();
    }, [adaptToContainer]);
    
    // Record component usage for analytics
    useEffect(() => {
      if (collectUsageData) {
        recordUsage();
      }
    }, [collectUsageData, recordUsage]);
    
    // Apply optimization strategies based on optimizeFor
    const optimizedProps = applyOptimizationStrategy(optimizeFor, restProps);
    
    return (
      <Component
        ref={combinedRef}
        className={cn(
          styleClasses,
          getOptimizationClasses(optimizeFor),
          className
        )}
        {...optimizedProps}
        {...adaptiveProps}
      >
        {children}
      </Component>
    );
  }
);

Box.displayName = "Box";

// Helper function to combine refs
function useCombinedRefs<T>(...refs: React.Ref<T>[]) {
  const targetRef = React.useRef<T>(null);
  
  React.useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return;
      
      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        (ref as React.MutableRefObject<T | null>).current = targetRef.current;
      }
    });
  }, [refs]);
  
  return targetRef;
}

// Apply optimization strategies based on the optimizeFor prop
function applyOptimizationStrategy(strategy: string, props: any) {
  switch (strategy) {
    case "readability":
      return {
        ...props,
        // Enhance for readability
      };
    case "density":
      return {
        ...props,
        // Optimize for information density
      };
    case "interaction":
      return {
        ...props,
        // Optimize for interactive elements
      };
    default:
      return props;
  }
}

// Get tailwind classes based on optimization strategy
function getOptimizationClasses(strategy: string) {
  switch (strategy) {
    case "readability":
      return "text-base leading-relaxed";
    case "density":
      return "text-sm leading-tight";
    case "interaction":
      return "transition-all";
    default:
      return "";
  }
} 