import { ReactNode, ComponentType } from 'react';
import React from 'react';
import { hexToRgb } from './utils';

// Define theme metadata interface
export interface ThemeMetadata {
  id: string;
  name: string;
  description: string;
  preview?: string;
  category: 'marketing' | 'dashboard' | 'documentation' | 'blog' | 'ecommerce' | 'portfolio' | 'business';
  tags: string[];
}

// Define component variants each theme can provide
export type ComponentVariant = 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';

// Theme component registry interface
export interface ThemeComponents {
  Button: ComponentType<any> | null;
  Card: ComponentType<any> | null;
  Input: ComponentType<any> | null;
  Header: ComponentType<any> | null;
  Footer: ComponentType<any> | null;
  // Add more component types as needed
}

// Theme tokens interface
export interface ThemeTokens {
  colors: Record<string, string>;
  typography: {
    fontFamily: Record<string, string>;
    fontSize: Record<string, any>;
  };
  spacing: Record<string, any>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
}

// Complete theme interface
export interface Theme {
  metadata: ThemeMetadata;
  components: ThemeComponents;
  tokens: ThemeTokens;
  css: string;
  variables: Record<string, string>;
}

// Theme categories
export type ThemeCategory = 'marketing' | 'dashboard' | 'documentation' | 'blog' | 'ecommerce' | 'portfolio' | 'business';

// Theme registry to store and manage themes
export class ThemeRegistry {
  private themes: Record<string, Theme> = {};
  private registered: Set<string> = new Set(); // Track registered theme IDs

  constructor() {
    // Initialize with empty theme registry
  }

  // Register a new theme
  register(theme: Theme): void {
    if (this.themes[theme.metadata.id]) {
      console.warn(`Theme with ID ${theme.metadata.id} already exists and will be overwritten.`);
    }
    
    this.themes[theme.metadata.id] = theme;
    this.registered.add(theme.metadata.id);
    console.log(`Registered theme: ${theme.metadata.name} (${theme.metadata.id})`);
  }

  // Check if a theme is already registered
  isRegistered(themeId: string): boolean {
    return this.registered.has(themeId);
  }

  // Get a theme by ID
  getTheme(id: string): Theme | undefined {
    return this.themes[id];
  }

  // Get all registered themes
  getAllThemes(): Theme[] {
    return Object.values(this.themes);
  }

  // Get themes by category
  getThemesByCategory(category: ThemeCategory): Theme[] {
    return this.getAllThemes().filter(theme => theme.metadata.category === category);
  }

  // Get themes by tag
  getThemesByTag(tag: string): Theme[] {
    return this.getAllThemes().filter(theme => theme.metadata.tags.includes(tag));
  }

  // Remove a theme
  removeTheme(id: string): boolean {
    if (this.themes[id]) {
      delete this.themes[id];
      return true;
    }
    return false;
  }
}

// Create and export the singleton instance
export const themeRegistry = new ThemeRegistry();

// Theme component loader with null checks
export async function loadThemeComponent(
  themeId: string,
  componentName: keyof ThemeComponents
): Promise<React.ComponentType<any> | null> {
  const theme = themeRegistry.getTheme(themeId);
  if (!theme) {
    throw new Error(`Theme ${themeId} not found`);
  }
  
  return theme.components[componentName];
}

// Themed component wrapper - use createElement to avoid JSX issues in TS files
export function ThemedComponent<Props extends object>(props: {
  themeId: string;
  component: keyof ThemeComponents;
} & Props): ReactNode {
  const { themeId, component, ...rest } = props;
  const theme = themeRegistry.getTheme(themeId);
  if (!theme) {
    throw new Error(`Theme ${themeId} not found`);
  }
  
  const Component = theme.components[component];
  if (!Component) {
    return null; // Return null if component doesn't exist
  }
  
  return React.createElement(Component, { ...rest });
}

// Register base themes on initial import
const blueTheme: Theme = {
  metadata: {
    id: 'blue-light',
    name: 'Blue (Light)',
    description: 'Default blue theme with light background',
    category: 'marketing',
    tags: ['blue', 'light', 'modern']
  },
  components: {
    Button: null,
    Card: null,
    Input: null,
    Header: null,
    Footer: null
  },
  tokens: {
    colors: {},
    typography: {
      fontFamily: {},
      fontSize: {}
    },
    spacing: {},
    borderRadius: {},
    shadows: {}
  },
  css: '',
  variables: {}
};

const blueDarkTheme: Theme = {
  metadata: {
    id: 'blue-dark',
    name: 'Blue (Dark)',
    description: 'Default blue theme with dark background',
    category: 'marketing',
    tags: ['blue', 'dark', 'modern']
  },
  components: {
    Button: null,
    Card: null,
    Input: null,
    Header: null,
    Footer: null
  },
  tokens: {
    colors: {},
    typography: {
      fontFamily: {},
      fontSize: {}
    },
    spacing: {},
    borderRadius: {},
    shadows: {}
  },
  css: '',
  variables: {}
};

const greenTheme: Theme = {
  metadata: {
    id: 'green-light',
    name: 'Green (Light)',
    description: 'Green theme with light background',
    category: 'ecommerce',
    tags: ['green', 'light', 'eco']
  },
  components: {
    Button: null,
    Card: null,
    Input: null,
    Header: null,
    Footer: null
  },
  tokens: {
    colors: {},
    typography: {
      fontFamily: {},
      fontSize: {}
    },
    spacing: {},
    borderRadius: {},
    shadows: {}
  },
  css: '',
  variables: {}
};

const greenDarkTheme: Theme = {
  metadata: {
    id: 'green-dark',
    name: 'Green (Dark)',
    description: 'Green theme with dark background',
    category: 'ecommerce',
    tags: ['green', 'dark', 'eco']
  },
  components: {
    Button: null,
    Card: null,
    Input: null,
    Header: null,
    Footer: null
  },
  tokens: {
    colors: {},
    typography: {
      fontFamily: {},
      fontSize: {}
    },
    spacing: {},
    borderRadius: {},
    shadows: {}
  },
  css: '',
  variables: {}
};

const zincTheme: Theme = {
  metadata: {
    id: 'zinc-light',
    name: 'Zinc (Light)',
    description: 'Neutral zinc gray theme with light background',
    category: 'business',
    tags: ['zinc', 'gray', 'light', 'neutral']
  },
  components: {
    Button: null,
    Card: null,
    Input: null,
    Header: null,
    Footer: null
  },
  tokens: {
    colors: {},
    typography: {
      fontFamily: {},
      fontSize: {}
    },
    spacing: {},
    borderRadius: {},
    shadows: {}
  },
  css: '',
  variables: {}
};

const zincDarkTheme: Theme = {
  metadata: {
    id: 'zinc-dark',
    name: 'Zinc (Dark)',
    description: 'Neutral zinc gray theme with dark background',
    category: 'business',
    tags: ['zinc', 'gray', 'dark', 'neutral']
  },
  components: {
    Button: null,
    Card: null,
    Input: null,
    Header: null,
    Footer: null
  },
  tokens: {
    colors: {},
    typography: {
      fontFamily: {},
      fontSize: {}
    },
    spacing: {},
    borderRadius: {},
    shadows: {}
  },
  css: '',
  variables: {}
};

const roseTheme: Theme = {
  metadata: {
    id: 'rose-light',
    name: 'Rose (Light)',
    description: 'Vibrant rose theme with light background',
    category: 'marketing',
    tags: ['rose', 'pink', 'light', 'vibrant']
  },
  components: {
    Button: null,
    Card: null,
    Input: null,
    Header: null,
    Footer: null
  },
  tokens: {
    colors: {},
    typography: {
      fontFamily: {},
      fontSize: {}
    },
    spacing: {},
    borderRadius: {},
    shadows: {}
  },
  css: '',
  variables: {}
};

const roseDarkTheme: Theme = {
  metadata: {
    id: 'rose-dark',
    name: 'Rose (Dark)',
    description: 'Vibrant rose theme with dark background',
    category: 'marketing',
    tags: ['rose', 'pink', 'dark', 'vibrant']
  },
  components: {
    Button: null,
    Card: null,
    Input: null,
    Header: null,
    Footer: null
  },
  tokens: {
    colors: {},
    typography: {
      fontFamily: {},
      fontSize: {}
    },
    spacing: {},
    borderRadius: {},
    shadows: {}
  },
  css: '',
  variables: {}
};

// Register all base themes
themeRegistry.register(blueTheme);
themeRegistry.register(blueDarkTheme);
themeRegistry.register(greenTheme);
themeRegistry.register(greenDarkTheme);
themeRegistry.register(zincTheme);
themeRegistry.register(zincDarkTheme);
themeRegistry.register(roseTheme);
themeRegistry.register(roseDarkTheme);

export default themeRegistry; 