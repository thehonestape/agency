import { ReactNode, ComponentType } from 'react';
import React from 'react';

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
}

// Theme categories
export type ThemeCategory = 'marketing' | 'dashboard' | 'documentation' | 'blog' | 'ecommerce' | 'portfolio' | 'business';

// Theme registry to store and manage themes
class ThemeRegistry {
  private themes: Map<string, Theme> = new Map();
  private registered: Set<string> = new Set(); // Track registered theme IDs

  constructor() {
    // Initialize with empty theme registry
  }

  // Register a new theme
  register(theme: Theme): void {
    if (this.themes.has(theme.metadata.id)) {
      // Skip registration if theme already exists
      console.warn(`Theme with ID ${theme.metadata.id} already registered. Skipping re-registration.`);
      return;
    }
    this.themes.set(theme.metadata.id, theme);
    this.registered.add(theme.metadata.id);
    console.log(`Registered theme: ${theme.metadata.name} (${theme.metadata.id})`);
  }

  // Check if a theme is already registered
  isRegistered(themeId: string): boolean {
    return this.registered.has(themeId);
  }

  // Get a theme by ID
  getTheme(id: string): Theme | undefined {
    return this.themes.get(id);
  }

  // Get all registered themes
  getAllThemes(): Theme[] {
    return Array.from(this.themes.values());
  }

  // Get themes by category
  getThemesByCategory(category: ThemeCategory): Theme[] {
    return this.getAllThemes().filter(theme => theme.metadata.category === category);
  }

  // Get themes by tag
  getThemesByTag(tag: string): Theme[] {
    return this.getAllThemes().filter(theme => theme.metadata.tags.includes(tag));
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

export default themeRegistry; 