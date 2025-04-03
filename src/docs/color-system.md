# Color System Documentation

## Overview

Our color system is designed to be flexible, cohesive, and aligned with Tailwind v4. It provides a structured approach to color usage across the application, ensuring consistency while allowing for easy customization of brand colors.

## System Architecture

The color system is organized in three layers:

1. **Base Colors** - The foundational color scales
2. **Semantic Colors** - Mapping base colors to UI purposes
3. **Component Colors** - Specific color applications for UI components

### 1. Base Colors

Base colors are organized into scales from 50 (lightest) to 950 (darkest), following the Tailwind convention. These include:

- **Neutral Colors** - Used for backgrounds, text, and borders (gray)
- **Primary Brand Colors** - Core identity colors (blue, teal, purple, etc.)
- **Functional Colors** - Used for feedback and status (red, green, amber, etc.)

```typescript
// Example of base colors
const gray = {
  50: '#f9fafb',
  100: '#f3f4f6',
  // ...
  900: '#111827',
  950: '#030712',
};

const blue = {
  50: '#eff6ff',
  100: '#dbeafe',
  // ...
  900: '#1e3a8a',
  950: '#172554',
};
```

### 2. Semantic Colors

Semantic colors map base colors to their purpose in the UI. They are organized into logical categories:

1. **Surface** - Background colors for different UI layers
2. **Content** - Text and icon colors
3. **Border** - Border and divider colors
4. **Interactive** - Colors for interactive elements
5. **Status** - Feedback and status colors
6. **Component-specific** - Colors for specific UI components

Each category contains both light and dark mode variants.

```typescript
// Example of semantic colors
const semanticColors = {
  surface: {
    background: baseColors.white,
    backgroundDark: baseColors.gray[950],
    // ...
  },
  content: {
    primary: baseColors.gray[900],
    primaryDark: baseColors.gray[50],
    // ...
  },
  // ...
};
```

### 3. Component Colors

Component colors are derived from semantic colors to ensure consistency across components. They provide specific color applications for different component states and variants.

```typescript
// Example of component colors
const componentColors = {
  button: {
    primaryBg: semanticColors.interactive.default,
    primaryText: semanticColors.interactive.onInteractive,
    // ...
  },
  card: {
    bg: semanticColors.surface.card,
    text: semanticColors.content.primary,
    // ...
  },
  // ...
};
```

## Theme Generation

The color system includes a theme generation function that allows for easy customization of brand colors while maintaining semantic relationships.

```typescript
// Create a custom theme with teal as the primary color
const tealTheme = createThemeColors(baseColors.teal);
```

The `createThemeColors` function takes three parameters:
- `primaryColor` - The primary color scale to use for the theme
- `secondaryColor` (optional) - The secondary color scale
- `accentColor` (optional) - The accent color scale

## Using Colors in Components

### Tailwind Classes

Colors are available as Tailwind classes following this pattern:

```html
<!-- Surface colors -->
<div class="bg-background"></div>
<div class="bg-background-subtle"></div>

<!-- Content colors -->
<div class="text-foreground"></div>
<div class="text-foreground-muted"></div>

<!-- Border colors -->
<div class="border border-border"></div>
<div class="border border-border-focus"></div>

<!-- Interactive colors -->
<div class="bg-interactive text-interactive-text"></div>
<div class="bg-interactive-hover"></div>

<!-- Status colors -->
<div class="bg-success text-success-foreground"></div>
<div class="bg-error text-error-foreground"></div>
```

### Component Usage

Components use these semantic colors to maintain consistency:

```tsx
// Button component using semantic colors
<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>
```

## Dark Mode

The color system includes dark mode variants for all semantic colors. To use dark mode:

```html
<!-- Dark mode using Tailwind's dark class -->
<div class="bg-background dark:bg-background-dark"></div>
<div class="text-foreground dark:text-foreground-dark"></div>
```

## Best Practices

1. **Use semantic colors instead of base colors** - This ensures consistency and makes theme switching easier.

   ```tsx
   // Good
   <div className="bg-background text-foreground"></div>
   
   // Avoid
   <div className="bg-white text-gray-900"></div>
   ```

2. **Use the appropriate color category** - Choose colors based on their semantic meaning.

   ```tsx
   // Good
   <button className="bg-interactive text-interactive-text"></button>
   
   // Avoid
   <button className="bg-blue-600 text-white"></button>
   ```

3. **Consider dark mode** - Always include dark mode variants when defining custom styles.

   ```tsx
   // Good
   <div className="bg-background dark:bg-background-dark"></div>
   
   // Incomplete
   <div className="bg-background"></div>
   ```

4. **Use component-specific colors for components** - This ensures consistent styling across the application.

   ```tsx
   // Good
   <Alert variant="success">Success message</Alert>
   
   // Avoid custom styling
   <div className="bg-green-50 text-green-800 border border-green-200 p-4">
     Success message
   </div>
   ```

5. **Use status colors for feedback** - Use the appropriate status colors for success, error, warning, and info states.

   ```tsx
   // Good
   <div className="bg-success-subtle text-success"></div>
   <div className="bg-error-subtle text-error"></div>
   ```

## Extending the Color System

To add a new color to the system:

1. Add the base color scale to `baseColors` in `src/tokens/base/colors.ts`
2. Update the semantic mappings in `src/tokens/semantic/colors.ts`
3. Update the Tailwind configuration in `tailwind.config.js`

To create a new theme:

```typescript
// Create a new theme with custom colors
export const customTheme = createThemeColors(
  baseColors.purple,  // primary
  baseColors.gray,    // secondary
  baseColors.amber    // accent
);
```

## Color Accessibility

All color combinations in the system have been checked for accessibility, ensuring:

- Text colors have sufficient contrast against their backgrounds (WCAG AA compliance)
- Interactive elements are distinguishable from non-interactive elements
- Focus states are clearly visible
- Error states are perceivable without relying on color alone

When customizing themes, ensure that your color choices maintain these accessibility standards.
