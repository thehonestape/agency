import { ComponentDescriptor, LayoutDescriptor } from './types';

/**
 * Compose multiple components into a layout structure
 * 
 * @param components List of components to compose into the layout
 * @param layout Layout descriptor defining how components should be arranged
 * @returns A new component descriptor that includes all the components in the specified layout
 */
export function composeComponents(
  components: ComponentDescriptor[],
  layout: LayoutDescriptor
): ComponentDescriptor {
  // Copy all components to avoid mutating the originals
  const componentsCopy = components.map(c => ({ ...c }));
  
  // Create appropriate containing element based on layout type
  const container: ComponentDescriptor = {
    type: 'pattern',
    name: `Composed${layout.type.charAt(0).toUpperCase() + layout.type.slice(1)}`,
    tag: 'div',
    layout: {},
    children: componentsCopy,
  };
  
  // Apply layout configuration
  switch (layout.type) {
    case 'grid':
      container.layout = {
        display: 'grid',
        gap: layout.gap || '1rem',
      };
      
      // Add grid template if provided
      if (layout.columns) {
        container.layout.gridTemplateColumns = `repeat(${layout.columns}, 1fr)`;
      }
      
      if (layout.rows) {
        container.layout.gridTemplateRows = `repeat(${layout.rows}, auto)`;
      }
      
      if (layout.areas && layout.areas.length > 0) {
        container.layout.gridTemplateAreas = layout.areas.map(area => `"${area}"`).join(' ');
      }
      
      if (layout.template) {
        container.layout.gridTemplate = layout.template;
      }
      
      // Assign grid areas to children if grid areas are defined
      if (layout.areas && componentsCopy.length <= layout.areas.length) {
        const areas = layout.areas.join(' ').split(' ').filter(a => a !== '.' && a !== '');
        
        componentsCopy.forEach((component, index) => {
          if (index < areas.length) {
            component.layout = component.layout || {};
            component.layout.gridArea = areas[index];
          }
        });
      }
      break;
      
    case 'flex':
      container.layout = {
        display: 'flex',
        gap: layout.gap || '1rem',
        flexDirection: layout.flow === 'column' ? 'column' : 'row',
      };
      break;
      
    case 'stack':
      container.layout = {
        display: 'flex',
        flexDirection: 'column',
        gap: layout.gap || '1rem',
      };
      break;
  }
  
  // Add any additional layout properties
  if (container.layout) {
    Object.keys(layout).forEach(key => {
      if (!['type', 'columns', 'rows', 'gap', 'areas', 'template', 'flow'].includes(key)) {
        container.layout![key] = layout[key];
      }
    });
  }
  
  return container;
}

/**
 * Create a grid layout descriptor
 */
export function createGridLayout(
  columns: number, 
  gap?: string | number,
  areas?: string[]
): LayoutDescriptor {
  return {
    type: 'grid',
    columns,
    gap,
    areas,
  };
}

/**
 * Create a flex layout descriptor
 */
export function createFlexLayout(
  flow: 'row' | 'column' = 'row',
  gap?: string | number,
): LayoutDescriptor {
  return {
    type: 'flex',
    flow,
    gap,
  };
}

/**
 * Create a stack layout descriptor (shorthand for column flex)
 */
export function createStackLayout(
  gap?: string | number,
): LayoutDescriptor {
  return {
    type: 'stack',
    gap,
  };
} 