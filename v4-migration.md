# Tailwind CSS v4 Migration Guide

This document provides guidelines for working with Tailwind CSS v4 in the Workhorse Platform.

## Key Differences from Tailwind v3

Tailwind CSS v4 introduces several significant changes:

1. **CSS-First Configuration**: No more `tailwind.config.js` - configuration is done in your CSS
2. **Auto-Detection of Content**: No need to specify content paths - Tailwind v4 detects them automatically
3. **Separate PostCSS Plugin**: The PostCSS plugin is now in `@tailwindcss/postcss`
4. **Dedicated Vite Plugin**: We use `@tailwindcss/vite` for Vite integration
5. **No @tailwind Directives**: Use `@import "tailwindcss"` instead
6. **@theme Directive**: Use for theme configuration (replaces theme section in `tailwind.config.js`)
7. **@utilities Directive**: Required for custom utility classes

## Migration Steps

Our migration to Tailwind CSS v4 involved the following steps:

1. Installing new dependencies:

   ```bash
   npm install tailwindcss@latest @tailwindcss/postcss @tailwindcss/vite
   ```

2. Updating Vite configuration (`vite.config.ts`):

   ```typescript
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';
   import path from 'path';
   import tailwindcss from '@tailwindcss/vite';

   export default defineConfig({
     plugins: [tailwindcss(), react()],
     // ... rest of configuration
   });
   ```

3. Creating PostCSS configuration (`postcss.config.mjs`):

   ```javascript
   export default {
     plugins: {
       '@tailwindcss/postcss': {},
     },
   };
   ```

4. Converting `globals.css`:

   ```css
   @import './fonts.css';
   @import './theme.css';
   @import 'tailwindcss';

   /* Define utility classes to map to our CSS variables */
   @utilities {
     .bg-background {
       background-color: var(--background);
     }
     .text-foreground {
       color: var(--foreground);
     }
   }

   /* Rest of global styles */
   ```

5. Creating theme configuration in `theme.css`:

   ```css
   @theme {
     /* Color System - Light Mode */
     --background: #ffffff;
     --foreground: #0f172a;
     /* More theme variables */
   }

   /* Dark theme overrides - outside the @theme block */
   .dark {
     --background: var(--background-dark);
     --foreground: var(--foreground-dark);
     /* More dark mode overrides */
   }
   ```

6. Removing the `tailwind.config.js` or `tailwind.config.mjs` file entirely

## Common Issues & Solutions

### "Cannot apply unknown utility class" Error

This error occurs when using a custom utility class that hasn't been defined:

```
Cannot apply unknown utility class: bg-background
```

**Solution**: Define the utility class in an `@utilities` block:

```css
@utilities {
  .bg-background {
    background-color: var(--background);
  }
}
```

### "@theme blocks must only contain custom properties" Error

This error occurs when adding non-allowed content inside `@theme` blocks:

```
@theme blocks must only contain custom properties or @keyframes
```

**Solution**: Move media queries, selectors, and other rules outside the `@theme` block:

```css
/* CORRECT */
@theme {
  --color-primary: #3b82f6;
  --color-primary-dark: #60a5fa;
}

.dark {
  --color-primary: var(--color-primary-dark);
}
```

### "@source paths must be quoted" Error

When using `@source` directives for explicit content patterns:

```
@source paths must be quoted
```

**Solution**: Either add quotes around paths or remove `@source` directives entirely to rely on automatic detection:

```css
/* Option 1: Use quotes */
@source "../src/**/*.{js,jsx,tsx}";

/* Option 2: Remove @source and rely on automatic detection */
```

### Port Already in Use Error

```
Error: Port 3002 is already in use
```

**Solution**: Kill any processes using the port:

```bash
lsof -ti:3002 | xargs kill -9
```

## Best Practices

1. **Keep `@theme` blocks simple**: Only include custom properties and keyframes
2. **Use `.dark` class for dark mode**: Don't use media queries in `@theme` blocks
3. **Define custom utilities explicitly**: Add any custom utility classes in `@utilities` block
4. **Prefer automatic content detection**: Remove explicit content patterns unless needed
5. **Use direct CSS properties**: When working with theme variables, prefer direct CSS over `@apply`

## Resources

- [Official Tailwind CSS v4 Documentation](https://tailwindcss.com/docs/installation)
- [CSS-First Configuration](https://tailwindcss.com/docs/installation#css-first-configuration)
- [Project THEMING.md](../../THEMING.md) for our specific implementation
