import { ReactNode } from "react";
import { motion, HTMLMotionProps, MotionStyle, Transition } from "framer-motion";
import {
  fadeVariants,
  slideUpVariants,
  slideDownVariants,
  slideLeftVariants,
  slideRightVariants,
  scaleVariants,
  cardVariants,
  listItemVariants,
  containerVariants,
  pageVariants,
  transitions,
  durations,
} from "../../lib/motion";

// Base interface for all motion components
interface BaseMotionProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  style?: MotionStyle;
}

// FadeIn component
export function FadeIn({
  children,
  delay = 0,
  className = "",
  style = {},
  ...props
}: BaseMotionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeVariants}
      className={className}
      style={{ ...style }}
      transition={{
        delay,
        ...transitions.fade,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// SlideUp component
export function SlideUp({
  children,
  delay = 0,
  className = "",
  style = {},
  ...props
}: BaseMotionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideUpVariants}
      className={className}
      style={{ ...style }}
      transition={{
        delay,
        ...transitions.slide,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// SlideDown component
export function SlideDown({
  children,
  delay = 0,
  className = "",
  style = {},
  ...props
}: BaseMotionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideDownVariants}
      className={className}
      style={{ ...style }}
      transition={{
        delay,
        ...transitions.slide,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// SlideLeft component
export function SlideLeft({
  children,
  delay = 0,
  className = "",
  style = {},
  ...props
}: BaseMotionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideLeftVariants}
      className={className}
      style={{ ...style }}
      transition={{
        delay,
        ...transitions.slide,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// SlideRight component
export function SlideRight({
  children,
  delay = 0,
  className = "",
  style = {},
  ...props
}: BaseMotionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideRightVariants}
      className={className}
      style={{ ...style }}
      transition={{
        delay,
        ...transitions.slide,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ScaleIn component
export function ScaleIn({
  children,
  delay = 0,
  className = "",
  style = {},
  ...props
}: BaseMotionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={scaleVariants}
      className={className}
      style={{ ...style }}
      transition={{
        delay,
        ...transitions.scale,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// MotionCard component
export function MotionCard({
  children,
  delay = 0,
  className = "",
  style = {},
  ...props
}: BaseMotionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover="hover"
      whileTap="tap"
      variants={cardVariants}
      className={className}
      style={{ ...style }}
      transition={{
        delay,
        duration: durations.normal,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// MotionList component (container for staggered children)
interface MotionListProps extends BaseMotionProps {
  staggerDelay?: number;
}

export function MotionList({
  children,
  delay = 0,
  staggerDelay = 0.07,
  className = "",
  style = {},
  ...props
}: MotionListProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className={className}
      style={{ ...style }}
      transition={{
        delay,
        staggerChildren: staggerDelay,
        delayChildren: delay,
        duration: durations.normal,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// MotionItem component (for use inside MotionList)
export function MotionItem({
  children,
  className = "",
  style = {},
  ...props
}: BaseMotionProps) {
  return (
    <motion.div
      variants={listItemVariants}
      className={className}
      style={{ ...style }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// PageTransition component
export function PageTransition({
  children,
  className = "",
  style = {},
  ...props
}: BaseMotionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
      className={className}
      style={{ ...style }}
      transition={{
        duration: durations.normal,
        when: "beforeChildren",
        staggerChildren: 0.1,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Higher-order component to make any element have hover animation
interface WithHoverProps extends BaseMotionProps {
  scale?: number;
}

export function WithHover({
  children,
  scale = 1.05,
  className = "",
  style = {},
  ...props
}: WithHoverProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ duration: 0.2 }}
      className={className}
      style={{ ...style }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Higher-order component to make any element have tap animation
interface WithTapProps extends BaseMotionProps {
  scale?: number;
}

export function WithTap({
  children,
  scale = 0.95,
  className = "",
  style = {},
  ...props
}: WithTapProps) {
  return (
    <motion.div
      whileTap={{ scale }}
      transition={{ duration: 0.1 }}
      className={className}
      style={{ ...style }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Higher-order component to make any element have hover and tap animation
export function WithTapHover({
  children,
  className = "",
  style = {},
  ...props
}: BaseMotionProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={className}
      style={{ ...style }}
      {...props}
    >
      {children}
    </motion.div>
  );
} 