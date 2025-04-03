/**
 * Semantic sizing tokens
 * These map the base sizing values to their semantic meaning in the UI.
 */

import { baseSizing, componentSizing } from '../base/sizing';

/**
 * Semantic sizing structure with direct mappings to UI elements
 * This makes it easier to maintain consistent sizing across components
 */
export const semanticSizing = {
  // Component heights - derived from base sizing
  'component-height-xs': baseSizing[8],
  'component-height-sm': baseSizing[9],
  'component-height-md': baseSizing[10],
  'component-height-lg': baseSizing[11],
  'component-height-xl': baseSizing[12],
  
  // Icon sizes
  'icon-size-xs': componentSizing.icon.xs,
  'icon-size-sm': componentSizing.icon.sm,
  'icon-size-md': componentSizing.icon.md,
  'icon-size-lg': componentSizing.icon.lg,
  'icon-size-xl': componentSizing.icon.xl,
  
  // Form element heights
  'input-height-xs': componentSizing.formElement.xs,
  'input-height-sm': componentSizing.formElement.sm,
  'input-height-md': componentSizing.formElement.md,
  'input-height-lg': componentSizing.formElement.lg,
  'input-height-xl': componentSizing.formElement.xl,
  
  // Avatar sizes
  'avatar-size-xs': componentSizing.avatar.xs,
  'avatar-size-sm': componentSizing.avatar.sm,
  'avatar-size-md': componentSizing.avatar.md,
  'avatar-size-lg': componentSizing.avatar.lg,
  'avatar-size-xl': componentSizing.avatar.xl,
  'avatar-size-2xl': componentSizing.avatar['2xl'],
  
  // Container max widths
  'container-sm': componentSizing.container.sm,
  'container-md': componentSizing.container.md,
  'container-lg': componentSizing.container.lg,
  'container-xl': componentSizing.container.xl,
  'container-2xl': componentSizing.container['2xl'],
  
  // Button-specific heights
  'button-height-xs': componentSizing.button.xs,
  'button-height-sm': componentSizing.button.sm,
  'button-height-md': componentSizing.button.md,
  'button-height-lg': componentSizing.button.lg,
  'button-height-xl': componentSizing.button.xl,
  
  // Min widths for components - using string values to avoid TypeScript errors
  'button-min-width-xs': '64px',      // 64px
  'button-min-width-sm': '72px',      // 72px
  'button-min-width-md': '96px',      // 96px
  'button-min-width-lg': '128px',     // 128px
  'button-min-width-xl': '160px',     // 160px
  
  // Border radius
  'radius-none': baseSizing[0],
  'radius-sm': baseSizing[0.5],   // 2px
  'radius-md': baseSizing[1],     // 4px
  'radius-lg': baseSizing[1.5],   // 6px
  'radius-xl': baseSizing[2],     // 8px
  'radius-2xl': baseSizing[3],    // 12px
  'radius-3xl': baseSizing[4],    // 16px
  'radius-full': '9999px',
  
  // Typography sizes (for consistency with the type scale)
  'text-xs': baseSizing[3],       // 12px
  'text-sm': baseSizing[3.5],     // 14px
  'text-base': baseSizing[4],     // 16px
  'text-lg': '18px',              // 18px
  'text-xl': baseSizing[5],       // 20px
  'text-2xl': baseSizing[6],      // 24px
  'text-3xl': '30px',             // 30px
  'text-4xl': baseSizing[9],      // 36px
  'text-5xl': baseSizing[12],     // 48px
  'text-6xl': '60px',             // 60px
  'text-7xl': '72px',             // 72px
  'text-8xl': baseSizing[24],     // 96px
  'text-9xl': baseSizing[32],     // 128px
};

export default semanticSizing;
