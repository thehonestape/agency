/**
 * Semantic spacing tokens
 * These map the base spacing values to their semantic meaning in the UI.
 */

import { baseSpacing, componentSpacing } from '../base/spacing';

/**
 * Semantic spacing structure with direct mappings to UI elements
 * This makes it easier to maintain consistent spacing across components
 */
export const semanticSpacing = {
  // Component spacing
  'component-xs': baseSpacing.xs,
  'component-sm': baseSpacing.sm,
  'component-md': baseSpacing.md,
  'component-lg': baseSpacing.lg,
  'component-xl': baseSpacing.xl,
  
  // Content spacing (inside components)
  'content-xs': baseSpacing[2],  // 8px
  'content-sm': baseSpacing[3],  // 12px
  'content-md': baseSpacing[4],  // 16px
  'content-lg': baseSpacing[6],  // 24px
  'content-xl': baseSpacing[8],  // 32px
  
  // Layout spacing (between components)
  'layout-xs': baseSpacing[2],   // 8px
  'layout-sm': baseSpacing[4],   // 16px
  'layout-md': baseSpacing[6],   // 24px
  'layout-lg': baseSpacing[8],   // 32px
  'layout-xl': baseSpacing[12],  // 48px
  
  // Section spacing (between major sections)
  'section-xs': baseSpacing[6],   // 24px
  'section-sm': baseSpacing[8],   // 32px
  'section-md': baseSpacing[12],  // 48px
  'section-lg': baseSpacing[16],  // 64px
  'section-xl': baseSpacing[24],  // 96px
  
  // Inset spacing (padding within containers)
  'inset-xs': baseSpacing[2],    // 8px
  'inset-sm': baseSpacing[4],    // 16px
  'inset-md': baseSpacing[6],    // 24px
  'inset-lg': baseSpacing[8],    // 32px
  'inset-xl': baseSpacing[10],   // 40px
  
  // Stack spacing (vertical spacing between stacked elements)
  'stack-xs': componentSpacing.stack.xs,
  'stack-sm': componentSpacing.stack.sm,
  'stack-md': componentSpacing.stack.md,
  'stack-lg': componentSpacing.stack.lg,
  'stack-xl': componentSpacing.stack.xl,
  
  // Inline spacing (horizontal spacing between inline elements)
  'inline-xs': componentSpacing.inline.xs,
  'inline-sm': componentSpacing.inline.sm,
  'inline-md': componentSpacing.inline.md,
  'inline-lg': componentSpacing.inline.lg,
  'inline-xl': componentSpacing.inline.xl,
  
  // Specific component spacing
  'button-padding-x-sm': componentSpacing.button.sm.x,
  'button-padding-y-sm': componentSpacing.button.sm.y,
  'button-padding-x-md': componentSpacing.button.md.x,
  'button-padding-y-md': componentSpacing.button.md.y,
  'button-padding-x-lg': componentSpacing.button.lg.x,
  'button-padding-y-lg': componentSpacing.button.lg.y,
  
  'card-padding-compact': componentSpacing.card.compact.inner,
  'card-padding-default': componentSpacing.card.default.inner,
  'card-padding-comfortable': componentSpacing.card.comfortable.inner,
  
  // Form element spacing
  'form-gap': baseSpacing[4],      // 16px
  'form-element-gap': baseSpacing[2], // 8px
  'form-group-gap': baseSpacing[6],   // 24px
  
  // Typography spacing
  'text-paragraph-gap': baseSpacing[4],   // 16px
  'text-heading-gap': baseSpacing[3],     // 12px
  'text-list-item-gap': baseSpacing[2],   // 8px
};

export default semanticSpacing;
