import { ComponentDefinition, ComponentDescriptor } from '../composition/types';

/**
 * A singleton registry for component discovery and management
 */
class ComponentRegistry {
  private components = new Map<string, ComponentDefinition>();
  private static instance: ComponentRegistry;

  private constructor() {
    // Private constructor to enforce singleton pattern
  }

  /**
   * Get the singleton instance
   */
  public static getInstance(): ComponentRegistry {
    if (!ComponentRegistry.instance) {
      ComponentRegistry.instance = new ComponentRegistry();
    }
    return ComponentRegistry.instance;
  }

  /**
   * Register a component in the registry
   */
  public register(id: string, component: ComponentDefinition): void {
    if (this.components.has(id)) {
      console.warn(`Component with id "${id}" already exists and will be overwritten.`);
    }
    this.components.set(id, component);
  }

  /**
   * Get a component by id
   */
  public get(id: string): ComponentDefinition | undefined {
    return this.components.get(id);
  }

  /**
   * Get all components
   */
  public getAll(): ComponentDefinition[] {
    return Array.from(this.components.values());
  }

  /**
   * Get components by category
   */
  public getByCategory(category: string): ComponentDefinition[] {
    return Array.from(this.components.values())
      .filter(comp => comp.metadata.category === category);
  }

  /**
   * Get components by tags
   */
  public getByTags(tags: string[]): ComponentDefinition[] {
    return Array.from(this.components.values())
      .filter(comp => {
        const componentTags = comp.metadata.tags || [];
        return tags.some(tag => componentTags.includes(tag));
      });
  }

  /**
   * Search components by name, description, or tags
   */
  public search(query: string): ComponentDefinition[] {
    const searchTerms = query.toLowerCase().split(' ');
    
    return Array.from(this.components.values())
      .filter(comp => {
        const name = comp.metadata.name.toLowerCase();
        const description = (comp.metadata.description || '').toLowerCase();
        const tags = (comp.metadata.tags || []).join(' ').toLowerCase();
        const searchSpace = `${name} ${description} ${tags}`;
        
        return searchTerms.every(term => searchSpace.includes(term));
      });
  }

  /**
   * Remove a component by id
   */
  public unregister(id: string): boolean {
    return this.components.delete(id);
  }

  /**
   * Check if a component exists
   */
  public has(id: string): boolean {
    return this.components.has(id);
  }

  /**
   * Get the total number of registered components
   */
  public size(): number {
    return this.components.size;
  }

  /**
   * Clear all components
   */
  public clear(): void {
    this.components.clear();
  }
}

// Export the singleton instance
export const componentRegistry = ComponentRegistry.getInstance();

// Hook to access the registry
export function useComponentRegistry() {
  return componentRegistry;
} 