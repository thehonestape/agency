/**
 * Flex Component Example
 * This shows how to extend the Box component for a Flexbox layout
 */

import React from 'react';
import Box, { BoxProps } from './Box';

export interface FlexProps extends BoxProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  align?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  gap?: string | number;
}

/**
 * Flex component provides a simple way to create flexbox layouts
 * 
 * Example usage:
 * <Flex 
 *   direction={{ base: 'column', md: 'row' }}
 *   justify="space-between"
 *   align="center"
 *   p="lg"
 *   gap="md"
 * >
 *   <Box>Item 1</Box>
 *   <Box>Item 2</Box>
 *   <Box>Item 3</Box>
 * </Flex>
 */
export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ 
    direction = 'row', 
    wrap = 'nowrap', 
    align = 'stretch', 
    justify = 'flex-start', 
    gap,
    ...props 
  }, ref) => {
    return (
      <Box
        ref={ref}
        display="flex"
        flexDirection={direction}
        flexWrap={wrap}
        alignItems={align}
        justifyContent={justify}
        gap={gap}
        {...props}
      />
    );
  }
);

Flex.displayName = 'Flex';

export default Flex; 