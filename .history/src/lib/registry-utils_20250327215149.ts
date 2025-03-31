import { ComponentDescriptor } from './composition/types';
import { componentRegistry } from './discovery/ComponentRegistry';

/**
 * Register a UI component with the registry
 * 
 * @param id Component ID
 * @param component React component to register
 * @param metadata Component metadata
 * @param descriptor Component descriptor
 */
export function registerUIComponent(
  id: string,
  component: React.ComponentType<any>,
  metadata: {
    name: string;
    description?: string;
    category?: string;
    tags?: string[];
    author?: string;
    version?: string;
  },
  descriptor: Partial<ComponentDescriptor> = {}
) {
  // Default values for the component descriptor
  const defaultDescriptor: ComponentDescriptor = {
    type: 'primitive',
    name: metadata.name,
    tag: 'div',
    props: {},
    metadata: {
      description: metadata.description,
      category: metadata.category,
      tags: metadata.tags,
    }
  };

  // Merge with provided descriptor
  const mergedDescriptor = {
    ...defaultDescriptor,
    ...descriptor,
  };

  // Register with the component registry
  componentRegistry.register(id, {
    id,
    component,
    descriptor: mergedDescriptor as ComponentDescriptor,
    metadata: {
      name: metadata.name,
      description: metadata.description || '',
      category: metadata.category || 'ui',
      tags: metadata.tags || [],
      created: new Date().toISOString(),
      author: metadata.author || 'UI System',
      version: metadata.version || '1.0.0',
    },
  });
}

/**
 * Register multiple UI components at once
 * 
 * @param components Object mapping component IDs to their registration data
 */
export function registerUIComponents(
  components: Record<
    string,
    {
      component: React.ComponentType<any>;
      name: string;
      description?: string;
      category?: string;
      tags?: string[];
      author?: string;
      version?: string;
      descriptor?: Partial<ComponentDescriptor>;
    }
  >
) {
  Object.entries(components).forEach(([id, data]) => {
    registerUIComponent(
      id,
      data.component,
      {
        name: data.name,
        description: data.description,
        category: data.category,
        tags: data.tags,
        author: data.author,
        version: data.version,
      },
      data.descriptor
    );
  });

  console.log(`Registered ${Object.keys(components).length} UI components`);
}

/**
 * Clear all registered components
 */
export function clearRegistry() {
  componentRegistry.clear();
}

export default {
  registerUIComponent,
  registerUIComponents,
  clearRegistry,
}; 