# Component & Theme Generators

This directory contains utility scripts for generating components and themes that follow our project's standards.

## Component Generator

Quickly scaffold new components that adhere to our theming architecture.

### Usage

```bash
# Using npm script
npm run generate:component [category] [ComponentName]

# Using yarn
yarn generate:component [category] [ComponentName]

# Or directly
node src/scripts/generate-component.js [category] [ComponentName]
```

### Examples

```bash
# Generate a UI component
yarn generate:component ui Button

# Generate a marketing component
yarn generate:component marketing Hero

# Generate a feedback component
yarn generate:component feedback Alert
```

### Valid Categories

- `ui` - Core UI components
- `marketing` - Marketing-related components
- `application-shells` - Application layout shells
- `forms` - Form-related components
- `data-display` - Components for displaying data
- `navigation` - Navigation components
- `feedback` - User feedback components
- `overlays` - Modal dialogs, drawers, etc.
- `brand` - Brand-related components
- `dashboard` - Dashboard components
- `editor` - Content editor components

## Theme Generator

Create new theme variations based on our theming architecture.

### Usage

```bash
# Using npm script
npm run generate:theme [themeName] [primaryColor]

# Using yarn
yarn generate:theme [themeName] [primaryColor]

# Or directly
node src/scripts/generate-theme.js [themeName] [primaryColor]
```

### Examples

```bash
# Generate an indigo theme
yarn generate:theme indigo "hsl(234, 89%, 55%)"

# Generate an emerald theme
yarn generate:theme emerald "hsl(140, 84%, 39%)"

# Generate a rose theme
yarn generate:theme rose "hsl(330, 84%, 65%)"
```

### Notes

- Theme names should be kebab-case (lowercase with hyphens)
- Primary colors should be in HSL or OKLCH format
- Themes automatically create both light and dark mode variations

## What Gets Generated

### For Components

1. Component file with proper theming integration
2. Index file for exporting the component
3. Test file for component testing
4. Updates to category index file
5. Updates to component audit file (if applicable)

### For Themes

1. Theme definition file in the presets directory
2. Updates to theme presets index
3. Updates to theme switcher to include the new theme
4. Creates theme utilities if they don't exist

## Best Practices

1. Keep component names in PascalCase
2. Keep theme names in kebab-case
3. Follow the component audit to determine which components need to be implemented
4. Test components in both light and dark modes
5. When creating themes, try to maintain good contrast ratios 