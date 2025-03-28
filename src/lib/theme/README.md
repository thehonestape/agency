# Theme System

A simple, practical theme system that uses hex colors and provides a clean API for managing themes in React applications.

## Features

- Hex-based color system (no HSL)
- Light/dark mode support
- CSS variable generation
- Persistent theme storage
- TypeScript support
- React hooks and context

## Installation

The theme system is part of your project's core library. No additional installation is needed.

## Usage

### Basic Setup

Wrap your app with the `ThemeProvider`:

```tsx
import { ThemeProvider } from '@/lib/theme/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Using the Theme Hook

Use the `useThemeContext` hook to access and modify the theme:

```tsx
import { useThemeContext } from '@/lib/theme/ThemeProvider';

function ThemeControls() {
  const {
    theme,
    setMode,
    setPrimaryColor,
    setSecondaryColor,
    setAccentColor,
  } = useThemeContext();

  return (
    <div>
      <button onClick={() => setMode('dark')}>Dark Mode</button>
      <button onClick={() => setMode('light')}>Light Mode</button>
      <input
        type="color"
        value={theme.colors.primary}
        onChange={(e) => setPrimaryColor(e.target.value)}
      />
    </div>
  );
}
```

### Using Theme Variables in CSS

The theme system generates CSS variables that you can use in your styles:

```css
.my-component {
  background-color: var(--color-background);
  color: var(--color-foreground);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
}
```

## Theme Configuration

The theme system accepts the following configuration options:

```typescript
interface ThemeConfig {
  primaryColor: string;      // Hex color (e.g., '#3b82f6')
  secondaryColor?: string;   // Optional secondary color
  accentColor?: string;      // Optional accent color
  mode?: 'light' | 'dark';   // Theme mode
  fontFamily?: {            // Custom font families
    sans?: string;
    mono?: string;
  };
  baseSpacing?: number;     // Base spacing unit (default: 4)
  baseRadius?: number;      // Base border radius (default: 4)
}
```

## Available Theme Properties

### Colors

- Base colors: `primary`, `secondary`, `accent`
- UI colors: `background`, `foreground`, `card`, `card-foreground`, `muted`, `muted-foreground`, `border`, `input`
- State colors: `destructive`, `success`, `warning`, `info` (with their foreground variants)

### Typography

- Font families: `sans`, `mono`
- Font sizes: `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`
- Line heights: Corresponding to each font size

### Spacing

- `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`

### Border Radius

- `sm`, `md`, `lg`, `xl`, `full`

### Shadows

- `sm`, `md`, `lg`, `xl`

## Best Practices

1. Use CSS variables for styling components
2. Keep color values in hex format
3. Use semantic color names (e.g., `primary` instead of specific colors)
4. Test components in both light and dark modes
5. Maintain good contrast ratios for accessibility

## Example

```tsx
import { ThemeProvider } from '@/lib/theme/ThemeProvider';
import { useThemeContext } from '@/lib/theme/ThemeProvider';

function ThemeDemo() {
  const { theme, setPrimaryColor } = useThemeContext();

  return (
    <div style={{ 
      backgroundColor: theme.colors.background,
      color: theme.colors.foreground,
      padding: theme.spacing.md,
      borderRadius: theme.radius.md,
    }}>
      <h1>Theme Demo</h1>
      <input
        type="color"
        value={theme.colors.primary}
        onChange={(e) => setPrimaryColor(e.target.value)}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemeDemo />
    </ThemeProvider>
  );
}
``` 