import { MotionProps, Variant, Variants } from "framer-motion";

// Duration presets
export const durations = {
  fastest: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slowest: 0.8,
};

// Easing presets
export const easings = {
  // Smooth animations
  smooth: [0.4, 0, 0.2, 1],
  smoothOut: [0, 0, 0.2, 1],
  smoothIn: [0.4, 0, 1, 1],
  
  // Bouncy animations
  bounce: [0.175, 0.885, 0.32, 1.275],
  bounceOut: [0.175, 0.885, 0.32, 1],
  bounceIn: [0.6, -0.28, 0.735, 0.045],
  
  // Elastic animations
  elastic: [0.25, 0.1, 0.25, 1],
};

// Transition presets
export const transitions = {
  // Basic transitions
  fade: { 
    duration: durations.normal, 
    ease: easings.smooth 
  },
  slide: { 
    type: "spring", 
    stiffness: 300, 
    damping: 30, 
    mass: 1 
  },
  scale: { 
    duration: durations.normal, 
    ease: easings.bounce 
  },
  
  // Special purpose transitions
  stagger: (staggerTime = 0.05) => ({
    staggerChildren: staggerTime,
    delayChildren: 0.05,
  }),
  spring: { 
    type: "spring", 
    stiffness: 400, 
    damping: 17 
  },
  slow: { 
    duration: durations.slow, 
    ease: easings.smooth 
  },
  fast: { 
    duration: durations.fast, 
    ease: easings.smooth 
  },
  
  // Interactive transitions
  button: { 
    duration: durations.fastest, 
    ease: easings.smooth
  },
  hover: { 
    duration: durations.fast, 
    ease: easings.smooth 
  }
};

// Common animation variants
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.fade },
  exit: { opacity: 0, transition: { ...transitions.fade, duration: durations.fast } }
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: transitions.slide
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    transition: transitions.fast
  }
};

export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: transitions.slide
  },
  exit: { 
    opacity: 0, 
    y: 20, 
    transition: transitions.fast
  }
};

export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: transitions.slide
  },
  exit: { 
    opacity: 0, 
    x: -20, 
    transition: transitions.fast
  }
};

export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: transitions.slide
  },
  exit: { 
    opacity: 0, 
    x: 20, 
    transition: transitions.fast
  }
};

export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: transitions.scale
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    transition: transitions.fast
  }
};

// Card animation
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: durations.normal, ease: easings.smooth }
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: transitions.hover
  },
  tap: {
    scale: 0.98,
    transition: transitions.button
  },
  exit: { 
    opacity: 0,
    scale: 0.95,
    transition: transitions.fast
  }
};

// List item stagger animation
export const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: durations.normal, ease: easings.smooth }
  },
  exit: { 
    opacity: 0, 
    x: -10, 
    transition: { duration: durations.fast }
  }
};

// Container variants for staggered children
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      ...transitions.stagger(0.07),
      ease: easings.smooth,
      duration: durations.normal
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: durations.fast,
      ease: easings.smooth,
      staggerChildren: 0.03,
      staggerDirection: -1,
    }
  }
};

// Page transition variants
export const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: durations.normal,
      ease: easings.smoothOut,
      when: "beforeChildren",
      staggerChildren: 0.1,
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: durations.fast,
      ease: easings.smoothIn,
    }
  }
};

// Utility function for creating hover animation props
export const createHoverAnimation = (
  scale = 1.05, 
  duration = durations.fast
): MotionProps => ({
  whileHover: { scale },
  transition: { duration, ease: easings.smooth }
});

// Utility function for creating tap animation props
export const createTapAnimation = (
  scale = 0.95,
  duration = durations.fastest
): MotionProps => ({
  whileTap: { scale },
  transition: { duration, ease: easings.smooth }
});

// Utility function for creating spring animation
export const createSpringAnimation = (
  stiffness = 400, 
  damping = 17, 
  mass = 1
): MotionProps["transition"] => ({
  type: "spring",
  stiffness,
  damping,
  mass
});

// Helper to combine transition presets
export const combineTransitions = (...transitions: Partial<MotionProps["transition"]>[]) => {
  return Object.assign({}, ...transitions);
};

// Responsive variants based on viewport
export const createResponsiveVariants = (
  baseVariants: Variants,
  breakpoints: { [key: string]: number } = { sm: 640, md: 768, lg: 1024 }
): { [key: string]: Variants } => {
  const result: { [key: string]: Variants } = { base: baseVariants };
  
  Object.entries(breakpoints).forEach(([key, _]) => {
    result[key] = baseVariants;
  });
  
  return result;
};

// Export typed motion props
export type MotionTransition = MotionProps["transition"];
export type MotionVariant = Variant; 