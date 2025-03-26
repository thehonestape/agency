import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

// Spacing system based on 8px grid
export const spacing = {
  0: "0px",
  0.5: "2px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
  32: "128px",
  40: "160px",
  48: "192px",
  56: "224px",
  64: "256px",
  80: "320px",
  96: "384px",
};

// Color palette following the 60-30-10 rule
export const colorPalette = {
  // 60% - Primary/Base colors
  primary: "hsl(var(--primary))",
  background: "hsl(var(--background))",
  card: "hsl(var(--card))",
  
  // 30% - Secondary colors
  secondary: "hsl(var(--secondary))",
  muted: "hsl(var(--muted))",
  accent: "hsl(var(--accent))",
  
  // 10% - Accent colors for important UI elements
  destructive: "hsl(var(--destructive))",
  info: "hsl(var(--info, 215 100% 50%))",
  success: "hsl(var(--success, 142 76% 36%))",
  warning: "hsl(var(--warning, 38 92% 50%))",
  
  // Foreground colors
  foreground: "hsl(var(--foreground))",
  "primary-foreground": "hsl(var(--primary-foreground))",
  "secondary-foreground": "hsl(var(--secondary-foreground))",
  "accent-foreground": "hsl(var(--accent-foreground))",
  "muted-foreground": "hsl(var(--muted-foreground))",
  "destructive-foreground": "hsl(var(--destructive-foreground))",
};

// Typography system with fluid scaling
export const typography = {
  // Font sizes that scale fluidly between breakpoints
  fontSize: {
    xs: "text-xs fluid-xs",
    sm: "text-sm fluid-sm",
    base: "text-base fluid-base",
    lg: "text-lg fluid-lg",
    xl: "text-xl fluid-xl",
    "2xl": "text-2xl fluid-2xl",
    "3xl": "text-3xl fluid-3xl",
    "4xl": "text-4xl fluid-4xl",
    "5xl": "text-5xl fluid-5xl",
  },
  
  // Line heights that ensure readability
  lineHeight: {
    none: "leading-none", // 1
    tight: "leading-tight", // 1.25
    snug: "leading-snug", // 1.375
    normal: "leading-normal", // 1.5
    relaxed: "leading-relaxed", // 1.625
    loose: "leading-loose", // 2
  },
  
  // Font weights for proper visual hierarchy
  fontWeight: {
    thin: "font-thin", // 100
    extralight: "font-extralight", // 200
    light: "font-light", // 300
    normal: "font-normal", // 400
    medium: "font-medium", // 500
    semibold: "font-semibold", // 600
    bold: "font-bold", // 700
    extrabold: "font-extrabold", // 800
    black: "font-black", // 900
  },
};

// Shadows for depth perception
export const shadows = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
  inner: "shadow-inner",
};

// Border radius for consistent UI elements
export const radius = {
  none: "rounded-none",
  sm: "rounded-sm",
  DEFAULT: "rounded-md",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

// Animation durations
export const durations = {
  fastest: "duration-75",
  faster: "duration-100",
  fast: "duration-150",
  normal: "duration-200",
  slow: "duration-300",
  slower: "duration-500",
  slowest: "duration-700",
};

// Timing functions
export const easings = {
  linear: "ease-linear",
  in: "ease-in",
  out: "ease-out",
  inOut: "ease-in-out",
};

// Container variants for semantic layouts
export const containerVariants = cva("mx-auto", {
  variants: {
    size: {
      xs: "max-w-xs",
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
      "5xl": "max-w-5xl",
      "6xl": "max-w-6xl",
      "7xl": "max-w-7xl",
      full: "max-w-full",
      prose: "max-w-prose",
    },
    padding: {
      none: "px-0",
      sm: "px-4",
      md: "px-6",
      lg: "px-8",
      xl: "px-12",
    },
  },
  defaultVariants: {
    size: "5xl",
    padding: "md",
  },
});

// Types for container variants
export type ContainerVariantsProps = VariantProps<typeof containerVariants>;
export type ContainerSize = NonNullable<ContainerVariantsProps["size"]>;
export type ContainerPadding = NonNullable<ContainerVariantsProps["padding"]>;

// Grid variants for complex layouts
export const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      7: "grid-cols-7",
      8: "grid-cols-8",
      9: "grid-cols-9",
      10: "grid-cols-10",
      11: "grid-cols-11",
      12: "grid-cols-12",
      auto: "grid-cols-auto",
      "auto-fill": "grid-cols-auto-fill",
      "auto-fit": "grid-cols-auto-fit",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
      16: "gap-16",
    },
    responsive: {
      true: "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
      false: "",
    },
  },
  defaultVariants: {
    cols: 1,
    gap: 4,
    responsive: false,
  },
});

// Types for grid variants
export type GridVariantsProps = VariantProps<typeof gridVariants>;
export type GridCols = NonNullable<GridVariantsProps["cols"]>;
export type GridGap = NonNullable<GridVariantsProps["gap"]>;

// Responsive breakpoints reference
export const breakpoints = {
  xs: "480px", // Extra small devices
  sm: "640px", // Small devices
  md: "768px", // Medium devices
  lg: "1024px", // Large devices
  xl: "1280px", // Extra large devices
  "2xl": "1536px", // 2X Extra large devices
};

// Touchable interactive element sizes (for meeting minimum 44×44px touch target for mobile)
export const touchableSize = {
  sm: "min-w-[36px] min-h-[36px]", // Small, for very compact UI
  md: "min-w-[44px] min-h-[44px]", // Standard, meets recommendations
  lg: "min-w-[52px] min-h-[52px]", // Large, for improved accessibility
  xl: "min-w-[64px] min-h-[64px]", // Extra large for primary actions
};

// Consistent z-index scale to avoid conflicts
export const zIndices = {
  behind: "-1",
  base: "0",
  raised: "1",
  dropdown: "10",
  sticky: "20",
  fixed: "30",
  overlay: "40",
  modal: "50",
  popover: "60",
  toast: "70",
  tooltip: "80",
  top: "100",
};

// Button state styles for consistent interactive elements
export const interactiveStateClasses = {
  hover: "hover:bg-opacity-90 hover:translate-y-[-1px]",
  active: "active:bg-opacity-95 active:translate-y-0",
  focus: "focus:outline-none focus:ring-2 focus:ring-offset-2",
  disabled: "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
};

// Function to create responsive classes based on breakpoints
export const responsive = (property: string, values: Record<string, string>): string => {
  return Object.entries(values)
    .map(([breakpoint, value]) => {
      if (breakpoint === "base") return `${property}-${value}`;
      return `${breakpoint}:${property}-${value}`;
    })
    .join(" ");
};

// Apply cognitive efficiency principles with adaptive content density
export const applyAdaptiveDensity = (density: "compact" | "default" | "comfortable") => {
  const densityClasses = {
    compact: "space-y-2 p-2",
    default: "space-y-4 p-4",
    comfortable: "space-y-6 p-6",
  };
  
  return densityClasses[density];
};

// Generate spacing utility classes
export const spaceY = (size: keyof typeof spacing) => `space-y-${size}`;
export const spaceX = (size: keyof typeof spacing) => `space-x-${size}`;
export const p = (size: keyof typeof spacing) => `p-${size}`;
export const px = (size: keyof typeof spacing) => `px-${size}`;
export const py = (size: keyof typeof spacing) => `py-${size}`;
export const m = (size: keyof typeof spacing) => `m-${size}`;
export const mx = (size: keyof typeof spacing) => `mx-${size}`;
export const my = (size: keyof typeof spacing) => `my-${size}`;

// Helper for visually hiding elements while keeping them accessible for screen readers
export const srOnly = "sr-only";
export const notSrOnly = "not-sr-only";

// Helper to create a container with proper spacing and max-width
export const createContainer = (
  size?: ContainerSize, 
  padding?: ContainerPadding
) => {
  return cn(containerVariants({ size, padding }));
};

// Helper to create a responsive grid layout
export const createGrid = (options: {
  cols?: GridCols;
  gap?: GridGap;
  responsive?: boolean;
}) => {
  return cn(gridVariants(options));
};

// Apply perceptual clarity to any component
export const perceptualClarity = (level: "low" | "medium" | "high") => {
  const clarityClasses = {
    low: "opacity-80",
    medium: "opacity-90",
    high: "opacity-100 font-medium",
  };
  
  return clarityClasses[level];
};

// Apply interaction integrity styles
export const interactionIntegrity = (element: "button" | "input" | "link" | "card") => {
  const elementClasses = {
    button: "transition-all duration-200 active:scale-[0.98]",
    input: "transition-all duration-150 focus:ring-2",
    link: "transition-colors duration-150 hover:underline",
    card: "transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]",
  };
  
  return elementClasses[element];
};

// Helper to create emotionally resonant microinteractions
export const microinteraction = (type: "pulse" | "pop" | "shake" | "bounce") => {
  const animationClasses = {
    pulse: "animate-pulse",
    pop: "animate-in zoom-in-50 duration-300",
    shake: "animate-wiggle",
    bounce: "animate-bounce",
  };
  
  return animationClasses[type];
};

export default {
  spacing,
  colorPalette,
  typography,
  shadows,
  radius,
  durations,
  easings,
  containerVariants,
  gridVariants,
  breakpoints,
  touchableSize,
  zIndices,
  interactiveStateClasses,
  responsive,
  spaceY,
  spaceX,
  p,
  px,
  py,
  m,
  mx,
  my,
  srOnly,
  notSrOnly,
  createContainer,
  createGrid,
  perceptualClarity,
  interactionIntegrity,
  microinteraction,
  applyAdaptiveDensity,
}; 