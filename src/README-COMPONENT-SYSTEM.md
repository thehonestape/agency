# Modular Component Architecture System

This directory contains the implementation of a modular, composable, AI-enhanced component system using Tailwind CSS v4, React, and TypeScript. The system is designed for scalability, portability, and integration with AI generation workflows.

## Key Concepts

### 1. Component Hierarchy

Components are organized in a hierarchical structure that promotes reusability and composition:

- **Core** - Atomic primitives with minimal styling (`/components/core/`)
- **UI** - Styled and interactive primitives (`/components/ui/`)
- **Patterns** - Compound, reusable UI patterns (`/components/patterns/`)
- **Blocks** - Page sections that form composable units (`/components/blocks/`)
- **Pages** - Full-page layouts (`/components/pages/`)

### 2. Theming System

The architecture uses a robust theming system:

- **Theme Definitions** - Located in `/themes/` with individual theme configurations
- **Theme Provider** - React context for theme access and switching
- **Tokens** - Design tokens organized in the `/tokens/` directory

### 3. Component Registry

A central registry system for component discovery and management:

- **Component Registration** - Register components with metadata
- **Discovery API** - Find components by category, tags, or search
- **Versioning** - Track component versions and changes

### 4. AI Component Generation

AI-assisted component creation:

- **Text to Component** - Generate components from text descriptions
- **Image to Component** - Extract component structures from images
- **Component Descriptor** - Universal intermediate representation format

### 5. Composition Engine

Tools for programmatically combining components:

- **Layout System** - Create grid, flex, and stack layouts
- **Component Composition** - Combine multiple components
- **Responsive Layouts** - Adapt layouts to different screen sizes

## Getting Started

### Demo Page

Visit `/component-system-demo` to see a demonstration of the component system in action.

### Creating a New Component

1. Determine the appropriate level (core, ui, pattern, block, page)
2. Create a new file in the corresponding directory
3. Implement the component following the standard component API
4. Register the component in the registry

### Using the Theme System

```tsx
import { useTheme } from '../hooks/useTheme';

const MyComponent = () => {
  const { theme } = useTheme();
  
  return (
    <div style={{ 
      color: theme.colors.text,
      backgroundColor: theme.colors.background
    }}>
      Themed Component
    </div>
  );
};
```

### Generating Components with AI

```tsx
import { generateFromDescription } from '../generators/ai/generateFromDescription';
import { useTheme } from '../hooks/useTheme';
import ComponentRenderer from '../lib/composition/ComponentRenderer';

const AIGeneratedComponent = () => {
  const { theme } = useTheme();
  const [descriptor, setDescriptor] = useState(null);
  
  const generateComponent = async () => {
    const componentDescriptor = await generateFromDescription(
      'A card with a heading and paragraph', 
      theme
    );
    setDescriptor(componentDescriptor);
  };
  
  return descriptor ? (
    <ComponentRenderer descriptor={descriptor} />
  ) : (
    <button onClick={generateComponent}>Generate Component</button>
  );
};
```

### Composing Components

```tsx
import { composeComponents, createGridLayout } from '../lib/composition/composeComponents';
import ComponentRenderer from '../lib/composition/ComponentRenderer';

const ComposedComponents = ({ components }) => {
  // Create a 3-column grid layout
  const gridLayout = createGridLayout(3, '1rem');
  const composedGrid = composeComponents(components, gridLayout);
  
  return <ComponentRenderer descriptor={composedGrid} />;
};
```

## Directory Structure

```
agency/src/
├── components/
│   ├── core/          # Atomic primitives
│   ├── ui/            # Styled primitives
│   ├── patterns/      # Compound patterns
│   ├── blocks/        # Page sections
│   ├── pages/         # Full pages
│   ├── themes/        # Theme definitions
│   └── generators/    # AI generation
├── tokens/            # Design tokens
├── hooks/             # Custom hooks
└── lib/
    ├── composition/   # Component composition
    ├── discovery/     # Component registry
    └── ...            # Other utilities
```

## Future Development

- Multi-framework component export (React, Vue, Svelte)
- Visual component builder
- Component marketplace
- Analytics for component usage

## Contributing

When adding to this system, please follow these guidelines:

1. Use TypeScript for all components and utilities
2. Follow the established directory structure
3. Add appropriate tests for new functionality
4. Document components with JSDoc comments
5. Register components in the component registry 