# Component Organization & Theming System

This document explains how our components are organized and how theming works in the Workhorse Agency project.

## Component Organization

Our components are organized into the following structure:

```
src/components/
├── ui/                  # Core UI components (primitive building blocks)
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   ├── theme/           # Theme management components
│   │   ├── theme-provider.tsx
│   │   ├── theme-switcher.tsx
│   │   ├── tokens.ts    # Theme tokens/CSS variables definition
│   │   ├── presets/     # Preset themes
│   │   └── ...
│   └── ...
├── application-shells/  # Application layout shells
├── marketing/           # Marketing-related components
├── forms/               # Form-related components
├── data-display/        # Components for displaying data
├── navigation/          # Navigation components
├── feedback/            # User feedback components
├── overlays/            # Modal dialogs, drawers, etc.
├── brand/               # Brand-related components
├── dashboard/           # Dashboard components
└── editor/              # Content editor components
```

### Component Categories

1. **UI Components**: Core primitive components that follow our theming architecture
2. **Application Shells**: Overall application layout structures
3. **Marketing Components**: Components specifically for marketing pages
4. **Form Components**: Advanced form inputs and layouts
5. **Data Display Components**: Tables, charts, statistics displays
6. **Navigation Components**: Navigation bars, breadcrumbs, pagination
7. **Feedback Components**: Alerts, notifications, progress indicators
8. **Overlay Components**: Modals, drawers, popovers
9. **Brand Components**: Brand-specific components
10. **Dashboard Components**: Components specific to dashboard views

## Theming Architecture

Our theming system is based on CSS variables defined in a single source of truth.

### Key Principles

1. **CSS Variables as Single Source of Truth**: All theme values are defined as CSS variables in `:root` and `.dark` selectors in `globals.css`
2. **Dark Mode via Class**: Dark mode is toggled by adding/removing the `.dark` class on the `<html>` element
3. **HSL Color Format**: We use HSL format for better color manipulation
4. **Component Integration via Tailwind**: Component styles use Tailwind classes that reference the CSS variables

### Theme Variables

The main theme variables include:

```css
:root {
  /* Base colors */
  --background: hsl(...);
  --foreground: hsl(...);
  --card: hsl(...);
  --card-foreground: hsl(...);
  --primary: hsl(...);
  --primary-foreground: hsl(...);
  --secondary: hsl(...);
  --secondary-foreground: hsl(...);
  --muted: hsl(...);
  --muted-foreground: hsl(...);
  --accent: hsl(...);
  --accent-foreground: hsl(...);
  
  /* State colors */
  --destructive: hsl(...);
  --destructive-foreground: hsl(...);
  --success: hsl(...);
  --success-foreground: hsl(...);
  --warning: hsl(...);
  --warning-foreground: hsl(...);
  --info: hsl(...);
  --info-foreground: hsl(...);
  
  /* Element colors */
  --border: hsl(...);
  --input: hsl(...);
  --ring: hsl(...);
  
  /* UI Metrics */
  --radius: 0.5rem;
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  
  /* Animation Timings */
  --speed-fastest: 50ms;
  --speed-fast: 100ms;
  --speed-normal: 200ms;
  --speed-slow: 300ms;
  --speed-slowest: 500ms;
}

.dark {
  /* Dark mode overrides */
  --background: hsl(...);
  --foreground: hsl(...);
  /* ... and so on ... */
}
```

### Using Theme Variables in Components

Components should use these variables through Tailwind classes:

```tsx
// Example Button component
<button className="bg-primary text-primary-foreground rounded-md px-4 py-2">
  Click me
</button>
```

## Component Development

### Creating New Components

We provide utilities to create new components following our standards:

```bash
# Generate a new UI component
node src/scripts/generate-component.js ui Button

# Generate a marketing component
node src/scripts/generate-component.js marketing Hero

# Generate a form component
node src/scripts/generate-component.js forms Checkbox
```

### Component Implementation Pattern

Components should follow this pattern:

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define variants using class-variance-authority
const exampleVariants = cva(
  "base-styles-here", 
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        primary: "bg-primary text-primary-foreground",
        // ...
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3 text-sm",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Define component props with VariantProps
export interface ExampleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof exampleVariants> {}

// Create component with forwardRef
const Example = React.forwardRef<HTMLDivElement, ExampleProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(exampleVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Example.displayName = "Example";

export { Example, exampleVariants };
```

## Theme Generation

You can create new themes using our theme generator:

```bash
# Generate a new theme with a primary color
node src/scripts/generate-theme.js indigo "hsl(234, 89%, 55%)"

# Generate a green theme
node src/scripts/generate-theme.js emerald "hsl(140, 84%, 39%)"
```

## Component Audit

We maintain a component audit in `THEMING-COMPONENT-AUDIT.md` to track the implementation status of all components and their theming compliance.

## Best Practices

1. **Use CSS Variables**: Always use CSS variables for colors, not hardcoded values
2. **Follow Naming Conventions**: Use consistent naming (e.g., kebab-case for files, PascalCase for component names)
3. **Test in Light and Dark Modes**: Always test components in both modes
4. **Implement Variants**: All components should support variants (primary, secondary, etc.)
5. **Support Sizes**: Components should have size variants where appropriate
6. **Use Class Variance Authority**: Use cva for managing component variants
7. **Document Your Work**: Update the component audit when adding or modifying components
8. **Follow Accessibility Guidelines**: Ensure components are accessible (ARIA support, keyboard navigation)
9. **Test Responsiveness**: All components should be responsive
10. **Consistent API**: Maintain a consistent API across components (props, naming) 