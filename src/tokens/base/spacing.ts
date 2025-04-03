/**
 * Base spacing tokens
 * These define the spacing scale used throughout the application.
 * Following a 4px grid system for consistency.
 */

export const baseSpacing = {
  // Core spacing scale (in pixels, but without units for compatibility)
  0: '0',
  px: '1px',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  7: '1.75rem',    // 28px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  11: '2.75rem',   // 44px
  12: '3rem',      // 48px
  14: '3.5rem',    // 56px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  28: '7rem',      // 112px
  32: '8rem',      // 128px
  36: '9rem',      // 144px
  40: '10rem',     // 160px
  44: '11rem',     // 176px
  48: '12rem',     // 192px
  52: '13rem',     // 208px
  56: '14rem',     // 224px
  60: '15rem',     // 240px
  64: '16rem',     // 256px
  72: '18rem',     // 288px
  80: '20rem',     // 320px
  96: '24rem',     // 384px
  
  // Semantic aliases for common spacing patterns
  none: '0',
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '2.5rem',  // 40px
  '3xl': '3rem',    // 48px
};

// Component-specific spacing patterns
export const componentSpacing = {
  // Button padding by size
  button: {
    xs: { x: baseSpacing[2], y: baseSpacing[1] },    // px-2 py-1
    sm: { x: baseSpacing[3], y: baseSpacing[1.5] },  // px-3 py-1.5
    md: { x: baseSpacing[4], y: baseSpacing[2] },    // px-4 py-2
    lg: { x: baseSpacing[6], y: baseSpacing[2.5] },  // px-6 py-2.5
    xl: { x: baseSpacing[8], y: baseSpacing[3] },    // px-8 py-3
  },
  
  // Card padding by density
  card: {
    compact: { outer: baseSpacing[0], inner: baseSpacing[4] },  // p-0 with children p-4
    default: { outer: baseSpacing[1], inner: baseSpacing[5] },  // p-1 with children p-5
    comfortable: { outer: baseSpacing[2], inner: baseSpacing[6] }, // p-2 with children p-6
  },
  
  // Section spacing
  section: {
    sm: baseSpacing[4],    // 16px
    md: baseSpacing[8],    // 32px
    lg: baseSpacing[12],   // 48px
    xl: baseSpacing[16],   // 64px
    '2xl': baseSpacing[24], // 96px
  },
  
  // Stack spacing (for vertical layouts)
  stack: {
    xs: baseSpacing[1],    // 4px
    sm: baseSpacing[2],    // 8px
    md: baseSpacing[4],    // 16px
    lg: baseSpacing[6],    // 24px
    xl: baseSpacing[8],    // 32px
  },
  
  // Inline spacing (for horizontal layouts)
  inline: {
    xs: baseSpacing[1],    // 4px
    sm: baseSpacing[2],    // 8px
    md: baseSpacing[3],    // 12px
    lg: baseSpacing[4],    // 16px
    xl: baseSpacing[5],    // 20px
  },
};

export default baseSpacing;
