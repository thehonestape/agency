# Workhorse Agency Theming Architecture

This document outlines our theming architecture and provides guidelines to maintain consistency. **READ THIS BEFORE MODIFYING ANY THEME-RELATED CODE.**

## Core Architecture

Our theming system follows these principles:

1. **Single Source of Truth**: All theme variables are defined in `:root` in `globals.css`
2. **One Method for Dark Mode**: We use the `.dark` class for dark mode, not data attributes
3. **CSS Variables + Tailwind v4 Integration**: CSS variables are leveraged by Tailwind v4's simplified approach
4. **Consistent Color Format**: We use OKLCH for CSS variables for better color manipulation

## Tailwind v4 Implementation

Our project uses Tailwind CSS v4 with its modern theming capabilities:

1. **Simplified Variable Colors**: Tailwind v4 automatically handles opacity modifiers like `bg-primary/50` with our CSS variables - no special syntax needed.

2. **CSS Variables as the Foundation**: All our theme values are defined as CSS variables, which Tailwind v4 integrates seamlessly.

3. **Color Format Standardization**: We use the OKLCH color space for better color manipulation and consistency across themes.

## Key Files

- **`src/styles/globals.css`**: Contains all CSS variables and global styles
- **`tailwind.config.js`**: Maps CSS variables to Tailwind's color system
- **`src/lib/theme-registry.ts`**: Manages theme registration (if applicable)

## DO's and DON'Ts

### ✅ DO:

- Use CSS variables for any color or theme property that might change between themes
- Add new variables to the existing structure in `:root` and `.dark` in `globals.css`
- Use the `hsl(var(--variable))` syntax in Tailwind config and component styles
- Use `bg-background`, `text-foreground`, etc. utility classes instead of hardcoding colors
- Test both light and dark mode when adding new UI components

### ❌ DON'T:

- Add new theme variables directly to components without adding them to `globals.css`
- Mix different theme systems (e.g., data-theme attributes + class-based)
- Hardcode colors in components unless they're truly static
- Duplicate variable definitions in multiple places
- Add redundant CSS that Tailwind could handle

## Adding New Theme Colors

If you need to add a new semantic color:

1. Add the variable to `:root` in `globals.css` with light mode value
2. Add the variable to `.dark` with dark mode value
3. Add it to the `colors` object in `tailwind.config.js`
4. Use it via Tailwind utility classes

Example:
```css
/* In globals.css */
:root {
  /* existing variables */
  --new-color: oklch(0.6 0.2 180);
}

.dark {
  /* existing variables */  
  --new-color: oklch(0.4 0.2 180);
}
```

```js
// In tailwind.config.js
colors: {
  // existing colors
  'new-color': "hsl(var(--new-color))",
}
```

## Modifying Existing Colors

When changing existing colors:

1. Test contrast ratios for accessibility
2. Consider both light and dark mode
3. Check existing components that might be using the color

## Before You Commit

- Check that you're not introducing redundant color declarations
- Ensure dark mode still works properly
- Verify that you haven't broken any existing components
- Run the app to check for any styling errors

---

**Remember**: This architecture was carefully streamlined to be maintainable and efficient. If you believe a change to the architecture itself is needed, discuss with the team first. 