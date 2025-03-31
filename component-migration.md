# Component Migration Guide for Tailwind CSS v4

This guide provides step-by-step instructions for updating existing UI components to leverage our Tailwind CSS v4 setup with theme variables.

## Migration Process Overview

1. **Replace hardcoded colors** with theme variables
2. **Update dark mode patterns** to use theme variables instead of `dark:` classes
3. **Leverage the new utilities** in your component logic
4. **Test in both modes** to ensure proper adaptation

## Before You Start

Ensure you understand our [Tailwind v4 setup](./v4-migration.md) and review the [UI guidelines](../../src/lib/ui/tailwind-guidelines.md).

## Step 1: Replace Hardcoded Colors

### Common Color Replacements

| Before (Hardcoded) | After (Theme Variable) |
|------------------|----------------------|
| `text-gray-900 dark:text-white` | `text-foreground` |
| `text-gray-500 dark:text-gray-400` | `text-muted-foreground` |
| `bg-white dark:bg-gray-900` | `bg-background` |
| `bg-gray-100 dark:bg-gray-800` | `bg-muted` |
| `bg-blue-600 text-white` | `bg-primary text-primary-foreground` |
| `bg-red-600 text-white` | `bg-destructive text-destructive-foreground` |
| `border-gray-200 dark:border-gray-700` | `border-border` |

### Example Transformation

```tsx
// BEFORE
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4 border border-gray-200 dark:border-gray-700">
  <h3 className="font-medium text-blue-600 dark:text-blue-400">Title</h3>
  <p className="text-gray-500 dark:text-gray-400">Description text here</p>
  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
    Click Me
  </button>
</div>

// AFTER
<div className="bg-background text-foreground p-4 border border-border">
  <h3 className="font-medium text-primary">Title</h3>
  <p className="text-muted-foreground">Description text here</p>
  <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md">
    Click Me
  </button>
</div>
```

## Step 2: Update Component Variants

If your component uses `cva` (class-variance-authority) for variants, update the variants to use theme variables:

```tsx
// BEFORE
const cardVariants = cva(
  'rounded-lg border',
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-gray-950 text-gray-950 dark:text-gray-50 border-gray-200 dark:border-gray-800',
        destructive: 'bg-red-600 text-white border-red-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// AFTER
const cardVariants = cva(
  'rounded-lg border',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground border-border',
        destructive: 'bg-destructive text-destructive-foreground border-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
```

## Step 3: Leverage Theme Utilities and Hooks

Update your component's logic to use our theme utilities and hooks when appropriate:

```tsx
// BEFORE
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

function MyComponent() {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    // Check if dark mode is active
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
    
    // Listen for changes in dark mode
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);
  
  return (
    <div className={cn(
      'p-4 rounded-md',
      isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    )}>
      {/* Component content */}
    </div>
  );
}

// AFTER
import { useUITheme, cn } from '@/lib/ui';

function MyComponent() {
  const theme = useUITheme();
  
  return (
    <div className="p-4 rounded-md bg-background text-foreground">
      {/* Component content */}
      {theme.isDarkMode() && (
        <span className="text-muted-foreground">Dark mode is active</span>
      )}
    </div>
  );
}
```

## Step 4: Use Predefined Theme Variants

For consistent styling across components, use our predefined theme variants:

```tsx
import { cva } from 'class-variance-authority';
import { themeVariants, cn } from '@/lib/ui';

const myComponentVariants = cva(
  'rounded-md transition-colors',
  {
    variants: {
      intent: themeVariants.colorVariants,
      size: themeVariants.sizeVariants,
    },
    defaultVariants: {
      intent: 'default',
      size: 'md',
    },
  }
);
```

## Testing Your Migration

After updating a component, test it in both light and dark modes to ensure it adapts correctly.

### Common Issues to Check

1. **Contrast Issues**: Ensure text has sufficient contrast against backgrounds in both modes
2. **Missing Mappings**: Check for colors that don't have direct theme variable replacements
3. **Interactive States**: Test hover, focus, and active states
4. **Border Colors**: Make sure borders use theme-appropriate colors

## Component-Specific Migration Notes

### Buttons

```tsx
// Preferred theme-based styling
<button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
  Click Me
</button>
```

### Cards

```tsx
// Preferred theme-based styling
<div className="bg-card text-card-foreground rounded-lg border border-border p-4">
  Card Content
</div>
```

### Form Elements

```tsx
// Preferred theme-based styling
<input 
  className="bg-background text-foreground border border-input rounded-md px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary"
  placeholder="Enter text"
/>
```

## Example Implementation

For a complete example of a component properly using our Tailwind v4 setup, see:

- `src/components/ui/ThemeTest.tsx` - Theme variable usage demonstration
- `src/components/ui/ThemeTester.tsx` - Before/after comparison
- `src/lib/ui/component-template.tsx` - Template for new components

## Need Help?

If you encounter difficulties migrating a specific component, refer to:

1. [Tailwind v4 Migration Guide](./v4-migration.md)
2. [UI Theme Guidelines](../../src/lib/ui/tailwind-guidelines.md)
3. [Theme System Documentation](../../THEMING.md) 