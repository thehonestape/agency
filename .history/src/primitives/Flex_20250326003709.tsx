/**
 * Flex Primitive Component
 * 
 * An intelligent flexbox container that optimizes layout based on content.
 */

import React, { forwardRef } from 'react';
import Box, { BoxProps } from './Box';

export interface FlexProps extends BoxProps {
  // Flex-specific props
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  gap?: string | number;
  columnGap?: string | number;
  rowGap?: string | number;
  
  // Intelligent layout features
  autoAlign?: boolean;
  adaptiveLayout?: 'stack' | 'grid' | 'even' | 'content';
  stretchChildren?: boolean;
  equalColumns?: boolean;
}

/**
 * Flex is a primitive component for flexbox layouts with intelligent
 * layout optimization and content adaptation.
 * 
 * Example usage:
 * <Flex 
 *   direction={{ base: 'column', md: 'row' }}
 *   gap="4"
 *   align="center"
 *   justify="space-between"
 *   autoAlign
 * >
 *   <Box>Item 1</Box>
 *   <Box>Item 2</Box>
 * </Flex>
 */
export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ 
    children,
    direction = 'row',
    wrap = 'nowrap',
    align = 'stretch',
    justify = 'flex-start',
    gap,
    columnGap,
    rowGap,
    autoAlign = false,
    adaptiveLayout,
    stretchChildren = false,
    equalColumns = false,
    ...props 
  }, ref) => {
    // Convert flex props to style props
    const flexProps = {
      display: 'flex',
      flexDirection: direction,
      flexWrap: wrap,
      alignItems: align,
      justifyContent: justify,
      gap,
      columnGap,
      rowGap,
    };
    
    // Additional intelligent layout strategies
    const getAdaptiveStyles = () => {
      if (!adaptiveLayout) return {};
      
      switch (adaptiveLayout) {
        case 'stack':
          return {
            display: 'flex',
            flexDirection: 'column',
            gap: gap || 4,
            // Additional stack layout optimizations
          };
        case 'grid':
          return {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: gap || 4,
            // Additional grid layout optimizations
          };
        case 'even':
          return {
            display: 'flex',
            '& > *': {
              flex: equalColumns ? '1' : 'auto'
            },
            // Additional even layout optimizations
          };
        case 'content':
          return {
            display: 'flex',
            flexWrap: 'wrap',
            // Additional content-based layout optimizations
          };
        default:
          return {};
      }
    };
    
    // Use the style props system to convert to Tailwind classes
    const adaptiveStyles = getAdaptiveStyles();
    
    // Process child components if needed
    const processedChildren = React.Children.map(children, (child) => {
      // Apply stretch to children if requested
      if (stretchChildren && React.isValidElement(child)) {
        return React.cloneElement(child, {
          ...child.props,
          style: {
            ...child.props.style,
            flex: '1 1 0%',
          },
        });
      }
      return child;
    });
    
    return (
      <Box
        ref={ref}
        {...flexProps}
        {...adaptiveStyles}
        {...props}
      >
        {processedChildren || children}
      </Box>
    );
  }
);

Flex.displayName = 'Flex';

export default Flex; 