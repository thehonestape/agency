/**
 * Grid Component Example
 * This shows how to extend the Box component for CSS Grid layouts
 */

import React from 'react';
import Box, { BoxProps } from './Box';
import { ResponsiveValue } from '../responsive';

export interface GridProps extends BoxProps {
  templateColumns?: ResponsiveValue<string>;
  templateRows?: ResponsiveValue<string>;
  templateAreas?: ResponsiveValue<string>;
  gap?: ResponsiveValue<string | number>;
  rowGap?: ResponsiveValue<string | number>;
  columnGap?: ResponsiveValue<string | number>;
  autoFlow?: ResponsiveValue<'row' | 'column' | 'row dense' | 'column dense'>;
  autoRows?: ResponsiveValue<string>;
  autoColumns?: ResponsiveValue<string>;
  areas?: ResponsiveValue<string>;
}

/**
 * Grid component provides a simple way to create CSS Grid layouts
 * 
 * Example usage:
 * <Grid 
 *   templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
 *   gap="md"
 *   p="lg"
 * >
 *   <Box>Item 1</Box>
 *   <Box>Item 2</Box>
 *   <Box>Item 3</Box>
 * </Grid>
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ 
    templateColumns,
    templateRows,
    templateAreas,
    gap,
    rowGap,
    columnGap,
    autoFlow,
    autoRows,
    autoColumns,
    areas,
    ...props 
  }, ref) => {
    return (
      <Box
        ref={ref}
        display="grid"
        gridTemplateColumns={templateColumns}
        gridTemplateRows={templateRows}
        gridTemplateAreas={templateAreas}
        gap={gap}
        gridRowGap={rowGap}
        gridColumnGap={columnGap}
        gridAutoFlow={autoFlow}
        gridAutoRows={autoRows}
        gridAutoColumns={autoColumns}
        gridArea={areas}
        {...props}
      />
    );
  }
);

Grid.displayName = 'Grid';

export default Grid;

// GridItem component for grid cells
export interface GridItemProps extends BoxProps {
  colSpan?: ResponsiveValue<number | 'auto'>;
  rowSpan?: ResponsiveValue<number | 'auto'>;
  colStart?: ResponsiveValue<number | 'auto'>;
  colEnd?: ResponsiveValue<number | 'auto'>;
  rowStart?: ResponsiveValue<number | 'auto'>;
  rowEnd?: ResponsiveValue<number | 'auto'>;
  area?: ResponsiveValue<string>;
}

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ 
    colSpan,
    rowSpan,
    colStart,
    colEnd,
    rowStart,
    rowEnd,
    area,
    ...props 
  }, ref) => {
    return (
      <Box
        ref={ref}
        gridColumn={colSpan ? `span ${colSpan}` : undefined}
        gridRow={rowSpan ? `span ${rowSpan}` : undefined}
        gridColumnStart={colStart}
        gridColumnEnd={colEnd}
        gridRowStart={rowStart}
        gridRowEnd={rowEnd}
        gridArea={area}
        {...props}
      />
    );
  }
);

GridItem.displayName = 'GridItem'; 