import React from 'react';

// Define metadata for components
export interface ComponentMetadata {
  id: string;
  name: string;
  description: string;
  category: 'core' | 'ui' | 'pattern' | 'block' | 'page';
  tags: string[];
  example?: React.ReactNode;
  author?: string;
  version?: string;
  previewUrl?: string;
  sourceUrl?: string;
  created?: Date;
  updated?: Date;
}

// Interface for a registered component
export interface RegisteredComponent<Props = any> {
  metadata: ComponentMetadata;
  component: React.ComponentType<Props>;
  defaultProps?: Partial<Props>;
}

// Component Registry class
class ComponentRegistry {
  private components: Map<string, RegisteredComponent> = new Map();

  constructor() {
    // Initialize empty registry
  }

  // Register a component
  register<Props>(
    component: React.ComponentType<Props>,
    metadata: ComponentMetadata,
    defaultProps?: Partial<Props>
  ): void {
    if (this.components.has(metadata.id)) {
      console.warn(`Component with ID ${metadata.id} already exists in the registry. Overwriting.`);
    }
    
    this.components.set(metadata.id, {
      metadata,
      component,
      defaultProps,
    });
    
    console.log(`Registered component: ${metadata.name} (${metadata.id})`);
  }

  // Get a component by ID
  getComponent(id: string): RegisteredComponent | undefined {
    return this.components.get(id);
  }

  // Get all components
  getAllComponents(): RegisteredComponent[] {
    return Array.from(this.components.values());
  }

  // Get components by category
  getComponentsByCategory(category: ComponentMetadata['category']): RegisteredComponent[] {
    return this.getAllComponents().filter(c => c.metadata.category === category);
  }

  // Get components by tag
  getComponentsByTag(tag: string): RegisteredComponent[] {
    return this.getAllComponents().filter(c => c.metadata.tags.includes(tag));
  }

  // Search components by name or description
  searchComponents(query: string): RegisteredComponent[] {
    const lowerQuery = query.toLowerCase();
    return this.getAllComponents().filter(c => 
      c.metadata.name.toLowerCase().includes(lowerQuery) || 
      c.metadata.description.toLowerCase().includes(lowerQuery) ||
      c.metadata.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }
  
  // Get component count
  getCount(): number {
    return this.components.size;
  }
  
  // Clear all components
  clear(): void {
    this.components.clear();
  }
}

// Export singleton instance
export const componentRegistry = new ComponentRegistry();

// Create a React context for registry
export const ComponentRegistryContext = React.createContext(componentRegistry);

// Hook to access registry
export const useComponentRegistry = () => React.useContext(ComponentRegistryContext);

export default componentRegistry; 