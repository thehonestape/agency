import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define variants for different transition types
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.61, 1, 0.88, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.37, 0, 0.63, 1],
    },
  },
};

// Define variants for staggered children animations
export const staggerContainerVariants = {
  initial: {},
  enter: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export const staggerItemVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.42, 0, 0.58, 1],
    },
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: {
      duration: 0.3,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  key?: string | number;
}

const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className = "", 
  key
}) => {
  return (
    <motion.div
      key={key}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition; 