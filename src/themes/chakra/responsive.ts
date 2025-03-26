/**
 * Responsive Style System
 * Inspired by Chakra UI's responsive styling approach
 */

export type ResponsiveValue<T> = T | Array<T | null> | {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
  [key: string]: T | undefined;
};

export interface BreakpointConfig {
  base: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  [key: string]: string;
}

// Default breakpoints (can be customized in theme)
export const defaultBreakpoints: BreakpointConfig = {
  base: '0px',
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

/**
 * Converts responsive props to CSS media queries
 */
export function createResponsiveStyles<T>(
  value: ResponsiveValue<T>,
  styleFunction: (val: T) => string,
  breakpoints: BreakpointConfig = defaultBreakpoints
): string {
  // If value is not responsive (plain value)
  if (!isResponsiveValue(value)) {
    return styleFunction(value as T);
  }

  let styles = '';

  // Handle array syntax (like [base, sm, md, lg, xl, 2xl])
  if (Array.isArray(value)) {
    const breakpointKeys = ['base', 'sm', 'md', 'lg', 'xl', '2xl'];
    value.forEach((val, index) => {
      if (val === null || val === undefined) return;
      
      const breakpointKey = breakpointKeys[index] || breakpointKeys[breakpointKeys.length - 1];
      
      if (index === 0) {
        // Base styles (no media query)
        styles += styleFunction(val as T);
      } else {
        // Media query for this breakpoint
        const breakpointValue = breakpoints[breakpointKey];
        styles += `@media (min-width: ${breakpointValue}) { ${styleFunction(val as T)} }`;
      }
    });
  } 
  // Handle object syntax (like { base: val, md: val })
  else {
    // Extract breakpoints in order
    const breakpointEntries = Object.entries(breakpoints)
      .sort(([, a], [, b]) => {
        // Convert to numbers for comparison
        const aValue = parseInt(a.replace('px', ''));
        const bValue = parseInt(b.replace('px', ''));
        return aValue - bValue;
      });
    
    for (const [key, breakpointValue] of breakpointEntries) {
      const val = (value as any)[key];
      if (val === undefined) continue;
      
      if (key === 'base') {
        // Base styles (no media query)
        styles += styleFunction(val as T);
      } else {
        // Media query for this breakpoint
        styles += `@media (min-width: ${breakpointValue}) { ${styleFunction(val as T)} }`;
      }
    }
  }

  return styles;
}

/**
 * Check if a value is responsive (array or object with breakpoint keys)
 */
function isResponsiveValue<T>(value: any): value is ResponsiveValue<T> {
  if (Array.isArray(value)) return true;
  if (value && typeof value === 'object') {
    // Check if any keys match breakpoint names
    return ['base', 'sm', 'md', 'lg', 'xl', '2xl'].some(
      breakpoint => breakpoint in value
    );
  }
  return false;
}

/**
 * Optimizes responsive styles by merging media queries
 */
export function optimizeResponsiveStyles(css: string): string {
  // This is a simplified version that could be expanded in a real implementation
  const mediaQueries: Record<string, string> = {};
  
  // Extract media queries and their content using regex
  const mediaQueryRegex = /@media\s*\([^)]+\)\s*{\s*([^}]+)\s*}/g;
  let match;
  
  // Replace media queries with placeholders and collect their content
  let optimizedCss = css.replace(mediaQueryRegex, (match, content, offset) => {
    const mediaQuery = match.slice(0, match.indexOf('{') + 1);
    
    if (!mediaQueries[mediaQuery]) {
      mediaQueries[mediaQuery] = '';
    }
    
    mediaQueries[mediaQuery] += content;
    return `[[MEDIA_QUERY_${offset}]]`;
  });
  
  // Replace placeholders with merged media queries
  for (const [mediaQuery, content] of Object.entries(mediaQueries)) {
    const fullMediaQuery = `${mediaQuery} ${content} }`;
    const placeholder = new RegExp(`\\[\\[MEDIA_QUERY_\\d+\\]\\]`);
    optimizedCss = optimizedCss.replace(placeholder, fullMediaQuery);
    
    // Remove remaining placeholders for this media query
    optimizedCss = optimizedCss.replace(
      new RegExp(`\\[\\[MEDIA_QUERY_\\d+\\]\\]`, 'g'),
      ''
    );
  }
  
  return optimizedCss;
}

export default {
  createResponsiveStyles,
  optimizeResponsiveStyles,
  defaultBreakpoints,
}; 