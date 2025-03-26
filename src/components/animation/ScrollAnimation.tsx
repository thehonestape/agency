import React from 'react';
import { motion } from 'framer-motion';

interface ScrollAnimationProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  once?: boolean;
  duration?: number;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  once = true,
  duration = 0.5
}) => {
  // Get initial animation values based on direction
  const getInitialValues = () => {
    switch (direction) {
      case 'up':
        return { y: 40, opacity: 0 };
      case 'down':
        return { y: -40, opacity: 0 };
      case 'left':
        return { x: 40, opacity: 0 };
      case 'right':
        return { x: -40, opacity: 0 };
      default:
        return { y: 40, opacity: 0 };
    }
  };

  // Get animated values (destination)
  const getAnimatedValues = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 };
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitialValues()}
      whileInView={getAnimatedValues()}
      viewport={{ once, margin: "-50px" }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation; 