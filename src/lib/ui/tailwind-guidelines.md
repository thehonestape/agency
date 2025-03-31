# UI Component Guidelines for Tailwind CSS v4

This document provides comprehensive guidelines for creating UI components that properly leverage our Tailwind CSS v4 setup.

## Core Principles

1. **Use CSS Variables**: Always use CSS variables from our theme system instead of hardcoded color values.
2. **Consistent Class Usage**: Follow patterns established by our component library.
3. **Dark Mode Compatibility**: Ensure all components work properly in both light and dark modes.
4. **Responsive Design**: Build components that adapt properly across all breakpoints.
5. **Accessibility**: Ensure components are accessible to all users.

## Using Theme Variables

### CSS Variables vs Direct Color Values

```tsx
// ❌ INCORRECT - Hardcoded values
<div className="bg-blue-600 text-white">
  Button
</div>

// ✅ CORRECT - Using theme CSS variables 
<div className="bg-background text-foreground">
  Button
</div>
```

### Available Theme-Based Utility Classes

These custom utilities must be defined in the `@utilities` block in `globals.css`:

- `bg-background`, `bg-foreground`
- `text-foreground`, `text-background` 
- `border-border`
- and others as defined in our theme

## Component Structure

### Class Organization

Follow this order of concerns for CSS classes:

1. Layout & Positioning (e.g., `flex`, `grid`, `m-4`)
2. Sizing (e.g., `h-10`, `w-full`)
3. Typography (e.g., `text-lg`, `font-medium`)
4. Colors & Appearance (e.g., `bg-background`, `text-foreground`)
5. States & Variants (e.g., `hover:bg-primary/80`)

### Using Variants with class-variance-authority (CVA)

For components with variants, use our established pattern with CSS variables:

```tsx
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md focus-visible:ring-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        // More variants...
      },
      // More variant categories...
    },
    defaultVariants: {
      variant: 'default',
      // Other defaults...
    },
  }
);
```

## Practical Examples

### Using Theme Variables in JSX

```tsx
// Component example
function Card({ children, className, ...props }) {
  return (
    <div 
      className={cn(
        "rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}
```

### Handling Dark Mode

Tailwind v4 with our setup handles dark mode via the `.dark` class, but you should make sure your components respond correctly:

```tsx
// ❌ INCORRECT - Manual dark mode handling
<div className="bg-white dark:bg-slate-900">
  Content
</div>

// ✅ CORRECT - Using our theme variables
<div className="bg-background text-foreground">
  Content
</div>
```

## Implementation Checklist

When creating or updating a UI component:

- [ ] Use theme CSS variables for colors (not hardcoded values)
- [ ] Define necessary utility classes in the `@utilities` block in `globals.css`
- [ ] Test component in both light and dark modes
- [ ] Ensure responsive behavior across all breakpoints
- [ ] Verify accessibility (keyboard navigation, ARIA attributes, contrast)
- [ ] Follow established naming conventions
- [ ] Use the `cn()` utility for merging class names

## Best Practices

1. **Component-Specific Utilities**: If a component needs custom utilities, add them to the `@utilities` block in `globals.css`.
2. **Theme Context**: Use the `useThemeContext()` hook when your component needs to interact with theme settings.
3. **CSS-First Approach**: Leverage Tailwind v4's CSS-first configuration by adding styles to appropriate CSS files.
4. **Prefer Composition**: Build complex components by composing simpler ones.
5. **Keep Components Focused**: Each component should have a single responsibility.

## Troubleshooting

### "Cannot apply unknown utility class" Error

If you see this error, you need to define the utility class in `globals.css`:

```css
@utilities {
  .my-custom-class {
    /* Your CSS properties */
  }
}
```

### CSS Variables Not Working in Dark Mode

Make sure you're using our theme variables rather than hardcoded colors. The theme system handles dark mode automatically.

## Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs/installation)
- [Our Theming Documentation](../../THEMING.md)
- [Migration Guide](../../docs/tailwind/v4-migration.md) 