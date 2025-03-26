/**
 * Grid Primitive Component
 * 
 * An intelligent grid container with auto-layout capabilities.
 */

import React, { forwardRef } from 'react';
import Box, { BoxProps } from './Box';

export interface GridProps extends BoxProps {
  // Grid-specific props
  templateColumns?: string;
  templateRows?: string;
  templateAreas?: string;
  autoColumns?: string;
  autoRows?: string;
  autoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense';
  gap?: string | number;
  rowGap?: string | number;
  columnGap?: string | number;
  
  // Intelligent grid features
  autoFit?: boolean;
  autoFill?: boolean;
  minChildWidth?: string | number;
  maxChildWidth?: string | number;
  responsiveColumns?: boolean;
  intelligentLayout?: 'content' | 'balanced' | 'masonry';
}

export interface GridItemProps extends BoxProps {
  area?: string;
  colSpan?: number | { [key: string]: number };
  rowSpan?: number | { [key: string]: number };
  colStart?: number | string;
  colEnd?: number | string;
  rowStart?: number | string;
  rowEnd?: number | string;
}

/**
 * Grid is a primitive component for grid layouts with intelligent layout features.
 * 
 * Example usage:
 * <Grid 
 *   templateColumns="repeat(3, 1fr)"
 *   gap="4"
 *   autoFit
 *   minChildWidth="200px"
 * >
 *   <GridItem>Item 1</GridItem>
 *   <GridItem colSpan={2}>Item 2</GridItem>
 * </Grid>
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ 
    children,
    templateColumns,
    templateRows,
    templateAreas,
    autoColumns,
    autoRows,
    autoFlow,
    gap,
    rowGap,
    columnGap,
    autoFit = false,
    autoFill = false,
    minChildWidth,
    maxChildWidth,
    responsiveColumns = false,
    intelligentLayout,
    ...props 
  }, ref) => {
    // Convert grid props to style props
    const gridProps = {
      display: 'grid',
      gridTemplateColumns: templateColumns,
      gridTemplateRows: templateRows,
      gridTemplateAreas: templateAreas,
      gridAutoColumns: autoColumns,
      gridAutoRows: autoRows,
      gridAutoFlow: autoFlow,
      gap,
      rowGap,
      columnGap,
    };
    
    // Handle auto-fitting and responsive grids
    if (autoFit && minChildWidth) {
      gridProps.gridTemplateColumns = `repeat(auto-fit, minmax(${minChildWidth}, ${maxChildWidth || '1fr'}))`;
    } else if (autoFill && minChildWidth) {
      gridProps.gridTemplateColumns = `repeat(auto-fill, minmax(${minChildWidth}, ${maxChildWidth || '1fr'}))`;
    } else if (responsiveColumns) {
      // Create responsive grid using custom responsive prop format
      // This would be more sophisticated in a real implementation
      gridProps.gridTemplateColumns = 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))';
    }
    
    // Handle intelligent layout patterns
    const getIntelligentLayoutStyles = () => {
      if (!intelligentLayout) return {};
      
      switch (intelligentLayout) {
        case 'content':
          // Content-aware grid that adapts to content size
          return {
            gridAutoRows: 'min-content',
            // Other content-based optimizations
          };
        case 'balanced':
          // Balanced grid that tries to keep rows of similar height
          return {
            gridAutoRows: 'auto',
            // Other balance optimizations
          };
        case 'masonry':
          // Masonry-like layout (simplified version)
          return {
            gridAutoFlow: 'dense',
            // In a real implementation, this would use a more sophisticated approach
          };
        default:
          return {};
      }
    };
    
    return (
      <Box
        ref={ref}
        {...gridProps}
        {...getIntelligentLayoutStyles()}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

/**
 * GridItem is a component for individual items within a Grid component.
 */
export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ 
    children,
    area,
    colSpan,
    rowSpan,
    colStart,
    colEnd,
    rowStart,
    rowEnd,
    ...props 
  }, ref) => {
    // Convert grid item props to style props
    const gridItemProps: Record<string, any> = {
      gridArea: area,
      gridColumnStart: colStart,
      gridColumnEnd: colEnd,
      gridRowStart: rowStart,
      gridRowEnd: rowEnd,
    };
    
    // Handle span values
    if (colSpan !== undefined) {
      if (typeof colSpan === 'number') {
        gridItemProps.gridColumn = `span ${colSpan}`;
      } else if (typeof colSpan === 'object') {
        // Handle responsive spans (simplified version)
        // In a real implementation, this would generate responsive styles
        gridItemProps.gridColumn = `span ${colSpan.base || 1}`;
      }
    }
    
    if (rowSpan !== undefined) {
      if (typeof rowSpan === 'number') {
        gridItemProps.gridRow = `span ${rowSpan}`;
      } else if (typeof rowSpan === 'object') {
        gridItemProps.gridRow = `span ${rowSpan.base || 1}`;
      }
    }
    
    return (
      <Box
        ref={ref}
        {...gridItemProps}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

Grid.displayName = 'Grid';
GridItem.displayName = 'GridItem';

export default Object.assign(Grid, { Item: GridItem }); 