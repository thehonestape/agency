import React from 'react';
import { componentRegistry, ComponentMetadata } from './component-registry';

// Type for component registration entry
export interface ComponentRegistrationEntry<Props = any> {
  component: React.ComponentType<Props>;
  metadata: ComponentMetadata;
  defaultProps?: Partial<Props>;
}

/**
 * Register multiple components at once
 * @param components Array of components with their metadata to register
 */
export function registerComponents(components: ComponentRegistrationEntry[]): void {
  components.forEach(({ component, metadata, defaultProps }) => {
    componentRegistry.register(component, metadata, defaultProps);
  });
  
  console.log(`Registered ${components.length} components`);
}

/**
 * Register all components in a category
 * @param category Category name
 * @param components Object mapping of component ID to component and optional defaultProps
 * @param baseMetadata Base metadata to apply to all components
 */
export function registerComponentsInCategory(
  category: ComponentMetadata['category'],
  components: Record<string, {
    component: React.ComponentType<any>;
    name: string;
    description: string;
    tags?: string[];
    defaultProps?: any;
    example?: React.ReactNode;
  }>,
  baseMetadata: Partial<Omit<ComponentMetadata, 'id' | 'name' | 'description' | 'category' | 'tags'>> = {}
): void {
  const entries = Object.entries(components).map(([id, { component, name, description, tags = [], defaultProps, example }]) => ({
    component,
    metadata: {
      id,
      name,
      description,
      category,
      tags,
      example,
      ...baseMetadata,
    },
    defaultProps,
  }));
  
  registerComponents(entries);
}

export default registerComponents; 