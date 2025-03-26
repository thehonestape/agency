/**
 * Box Component Example
 * This shows how to create a component that supports Chakra-like style props
 */

import React from 'react';
import { useStyleProps, StylePropsValues } from '../use-style-props';
import { cn } from '../../../lib/utils';

export interface BoxProps extends StylePropsValues {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  // Extend with other HTML attributes that don't conflict with style props
  id?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  tabIndex?: number;
  role?: string;
  aria?: Record<string, string>;
  [key: string]: any; // Allow other attributes
}

/**
 * Box is a base component that supports style props.
 * It can be used directly or as a base for other components.
 * 
 * Example usage:
 * <Box 
 *   p="md" 
 *   bg="primary"
 *   color="white"
 *   borderRadius="md"
 *   mb={{ base: 'md', md: 'lg' }}
 * >
 *   Content
 * </Box>
 */
export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ as: Component = 'div', className, children, ...props }, ref) => {
    // Extract style props and convert them to CSS
    const { styles, otherProps } = useStyleProps(props);

    return (
      <Component
        ref={ref}
        className={cn(className)}
        style={styles}
        {...otherProps}
      >
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';

export default Box; 