# Prettier Plugin for Tailwind CSS Integration

This document explains how to use the Prettier plugin for Tailwind CSS in our project to automatically sort Tailwind utility classes based on the recommended class order.

## Overview

We use [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) to automatically organize Tailwind CSS classes in a consistent order. This helps maintain code readability and follows Tailwind's recommended class ordering conventions.

## Configuration

Our Prettier configuration is defined in `.prettierrc` at the root of the project:

```json
{
  "plugins": ["prettier-plugin-tailwindcss"],
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100,
  "trailingComma": "es5",
  "tailwindStylesheet": "./src/styles/globals.css",
  "tailwindFunctions": ["clsx", "tw"]
}
```

Key configuration options:

- `tailwindStylesheet`: Points to our main CSS file which includes theme configuration
- `tailwindFunctions`: Lists JavaScript functions where Tailwind classes should be sorted

## Usage

### Running Prettier

We've added two scripts to `package.json` for running Prettier:

- `npm run format`: Formats all files and fixes class ordering
- `npm run format:check`: Checks if files are properly formatted without making changes

To format a specific file:

```bash
npx prettier --write src/components/YourComponent.tsx
```

### Class Sorting Examples

#### Before Formatting

```jsx
<div className="p-4 mb-4 text-sm border rounded-lg bg-blue-50 text-blue-800">
  Alert content
</div>
```

#### After Formatting

```jsx
<div className="mb-4 rounded-lg border bg-blue-50 p-4 text-sm text-blue-800">
  Alert content
</div>
```

### Function Call Sorting

The plugin also sorts classes within function calls specified in `tailwindFunctions`:

```jsx
// Before
const buttonClasses = clsx(
  'px-4 py-2 inline-flex justify-center items-center rounded-md',
  { 'bg-blue-500 text-white': isPrimary }
);

// After
const buttonClasses = clsx(
  'inline-flex items-center justify-center rounded-md px-4 py-2',
  { 'bg-blue-500 text-white': isPrimary }
);
```

## Best Practices

1. **Run before committing**: Format your code before committing changes
2. **Don't manually sort**: Let the plugin handle class ordering automatically
3. **Keep plugins updated**: Ensure you're using the latest version of the plugin
4. **Be careful with conflicts**: This plugin must be loaded last if using with other Prettier plugins

## Troubleshooting

If you encounter issues:

1. Make sure you've installed both `prettier` and `prettier-plugin-tailwindcss` as dev dependencies
2. Verify that Tailwind CSS v4 is properly set up with correct stylesheet paths
3. Check for conflicts with other Prettier plugins in your editor

For more information, see the [official plugin documentation](https://github.com/tailwindlabs/prettier-plugin-tailwindcss). 