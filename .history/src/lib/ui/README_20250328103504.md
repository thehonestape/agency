# UI Component Library for Tailwind CSS v4

This library provides a comprehensive, standardized approach for UI components to properly leverage Tailwind CSS v4's CSS-first configuration in our application.

## Core Principles

1. **Theme Variables**: All components use CSS variables from our theme system
2. **Tailwind v4 Integration**: Components are built to work with Tailwind v4's CSS-first approach
3. **Dark Mode Support**: Components automatically support both light and dark modes
4. **Consistent API**: All components follow a consistent, predictable API pattern
5. **Type Safety**: Full TypeScript support for all components and utilities

## Implementation

Our implementation includes:

1. **Expanded Utility Classes** in `globals.css` that define all theme-based utility classes
2. **Theme Hook** (`useUITheme.ts`) for easy access to theme variables in components
3. **Helper Functions** (`theme-utils.ts`) for manipulating theme variables
4. **Standard Variants** (`themeVariants`) for consistent styling
5. **Example Components** for reference implementation
6. **Migration Guide** for updating existing components
7. **Demo Page** at `/dashboard/design/theme` or `/theme`

## Getting Started

Import the necessary utilities:

```tsx
import { cn, useUITheme, themeVariants } from '@/lib/ui';
```

## Available Tools & Utilities

### 1. Theme Utilities (`theme-utils.ts`)

- `cn()`: Utility for merging class names with Tailwind's class merging
- `getCssVar()`: Get CSS variable by name
- `getAllThemeVars()`: Get all theme CSS variables
- `getThemeMode()`: Get current theme mode ('light' or 'dark')
- `getVariantClasses()`: Get background and text classes for a variant
- `createThemeStyle()`: Create inline style object with CSS variables

### 2. Theme Hook (`useUITheme.ts`)

A React hook that provides access to theme variables and functions:

```tsx
const theme = useUITheme();

// Available properties and methods
theme.mode               // Current theme mode ('light' or 'dark')
theme.cssVars            // All CSS variables from the theme
theme.getVar('primary')  // Get specific CSS variable
theme.isDarkMode()       // Check if dark mode is active
theme.toggleMode()       // Toggle between light and dark
theme.setMode('dark')    // Set theme mode directly
theme.setPrimaryColor('#3b82f6')  // Change primary color
```

### 3. Theme Variants (`component-factory.ts`)

Pre-defined variant styles for consistent component styling:

```tsx
import { cva } from 'class-variance-authority';
import { themeVariants } from '@/lib/ui';

const buttonVariants = cva('base-button-styles', {
  variants: {
    intent: themeVariants.colorVariants,
    size: themeVariants.sizeVariants,
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  }
});
```

## Demo & Test Components

- `ThemeTest.tsx`: Examples of using theme variables with components
- `ThemeTester.tsx`: Side-by-side comparison of hardcoded vs theme variable usage

## Migration Process

To migrate existing components to use Tailwind v4 with our theme system:

1. Replace hardcoded colors with theme variables 
2. Update dark mode patterns to use theme variables instead of `dark:` modifiers
3. Leverage the theme hook for dynamic theming
4. Test in both modes to ensure proper adaptation

See the [Component Migration Guide](../../docs/tailwind/component-migration.md) for detailed instructions.

## Resources

- [Tailwind v4 Documentation](https://tailwindcss.com/docs/installation)
- [Tailwind v4 Migration Guide](../../docs/tailwind/v4-migration.md)
- [Project Theming Documentation](../../THEMING.md) 