/**
 * Base sizing tokens
 * These define the sizing scale used throughout the application.
 * Following a consistent scale for all size-related properties.
 */

export const baseSizing = {
  // Core sizing scale (in pixels, but without units for compatibility)
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
  
  // Semantic aliases for common sizing patterns
  none: '0',
  xs: '0.75rem',    // 12px
  sm: '1.5rem',     // 24px
  md: '2rem',       // 32px
  lg: '2.5rem',     // 40px
  xl: '3rem',       // 48px
  '2xl': '4rem',    // 64px
  '3xl': '5rem',    // 80px
  '4xl': '6rem',    // 96px
  
  // Percentage-based sizing
  'full': '100%',
  'half': '50%',
  'third': '33.333333%',
  'quarter': '25%',
  'fifth': '20%',
  'three-quarters': '75%',
  'min': 'min-content',
  'max': 'max-content',
  'fit': 'fit-content',
};

// Component-specific sizing patterns
export const componentSizing = {
  // Button heights by size
  button: {
    xs: baseSizing[8],     // h-8 (32px)
    sm: baseSizing[9],     // h-9 (36px)
    md: baseSizing[10],    // h-10 (40px)
    lg: baseSizing[11],    // h-11 (44px)
    xl: baseSizing[12],    // h-12 (48px)
  },
  
  // Icon sizes
  icon: {
    xs: baseSizing[3],     // 12px
    sm: baseSizing[4],     // 16px
    md: baseSizing[5],     // 20px
    lg: baseSizing[6],     // 24px
    xl: baseSizing[8],     // 32px
  },
  
  // Form element heights
  formElement: {
    xs: baseSizing[8],     // 32px
    sm: baseSizing[9],     // 36px
    md: baseSizing[10],    // 40px
    lg: baseSizing[12],    // 48px
    xl: baseSizing[14],    // 56px
  },
  
  // Avatar sizes
  avatar: {
    xs: baseSizing[6],     // 24px
    sm: baseSizing[8],     // 32px
    md: baseSizing[10],    // 40px
    lg: baseSizing[12],    // 48px
    xl: baseSizing[16],    // 64px
    '2xl': baseSizing[20], // 80px
  },
  
  // Container max widths
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export default baseSizing;
