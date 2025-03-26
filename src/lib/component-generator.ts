import React from 'react';
import { Theme } from './theme-registry';
import { cn } from './utils';

// Component descriptor types
export type ComponentType = 
  | 'primitive'  // Most basic elements (div, span, etc)
  | 'element'    // UI components (button, input, etc)
  | 'block'      // Composed elements (card with content)
  | 'layout'     // Structural components (grid, flex container)
  | 'page'       // Full page layouts

// Basic layout properties
export interface LayoutProps {
  display?: 'block' | 'flex' | 'grid' | 'inline' | 'inline-block' | 'inline-flex';
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

// Style properties that can be applied to any component
export interface StyleProps {
  width?: 'auto' | 'full' | 'screen' | 'fit' | number;
  height?: 'auto' | 'full' | 'screen' | 'fit' | number;
  color?: string;
  backgroundColor?: string;
  border?: string;
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
  custom?: Record<string, string | number>;
}

// Behavior properties for interactive components
export interface BehaviorProps {
  interactive?: boolean;
  hover?: Partial<StyleProps>;
  active?: Partial<StyleProps>;
  focus?: Partial<StyleProps>;
  disabled?: Partial<StyleProps>;
  animation?: 'none' | 'fade' | 'slide' | 'scale' | 'custom';
}

// Component descriptor contains all the information to generate a component
export interface ComponentDescriptor {
  type: ComponentType;
  name: string;
  tag?: keyof JSX.IntrinsicElements;
  layout?: LayoutProps;
  style?: StyleProps;
  behavior?: BehaviorProps;
  children?: ComponentDescriptor[] | string;
  props?: Record<string, any>;
}

// Transform a component descriptor to CSS classes
function descriptorToClasses(descriptor: ComponentDescriptor, theme: Theme): string {
  // Debug the theme to see what we're working with
  console.log("Theme in descriptorToClasses:", theme?.metadata?.id);
  
  const classes: string[] = [];
  
  // Layout classes
  if (descriptor.layout) {
    const { display, direction, align, justify, wrap, gap, padding, margin } = descriptor.layout;
    
    if (display) classes.push(`${display}`);
    if (display === 'flex' || display === 'inline-flex') {
      if (direction) classes.push(`flex-${direction}`);
      if (align) classes.push(`items-${align}`);
      if (justify) classes.push(`justify-${justify}`);
      if (wrap) classes.push(`flex-${wrap}`);
    }
    if (gap) classes.push(`gap-${gapToTailwind(gap)}`);
    if (padding) classes.push(`p-${spacingToTailwind(padding)}`);
    if (margin) classes.push(`m-${spacingToTailwind(margin)}`);
  }
  
  // Style classes
  if (descriptor.style) {
    const { width, height, borderRadius, shadow } = descriptor.style;
    
    if (width === 'full') classes.push('w-full');
    else if (width === 'screen') classes.push('w-screen');
    else if (width === 'fit') classes.push('w-fit');
    else if (typeof width === 'number') classes.push(`w-[${width}px]`);
    
    if (height === 'full') classes.push('h-full');
    else if (height === 'screen') classes.push('h-screen');
    else if (height === 'fit') classes.push('h-fit');
    else if (typeof height === 'number') classes.push(`h-[${height}px]`);
    
    if (borderRadius === 'sm') classes.push('rounded-sm');
    else if (borderRadius === 'md') classes.push('rounded-md');
    else if (borderRadius === 'lg') classes.push('rounded-lg');
    else if (borderRadius === 'full') classes.push('rounded-full');
    
    if (shadow === 'sm') classes.push('shadow-sm');
    else if (shadow === 'md') classes.push('shadow-md');
    else if (shadow === 'lg') classes.push('shadow-lg');
    else if (shadow === 'xl') classes.push('shadow-xl');
  }
  
  // Behavior classes
  if (descriptor.behavior?.interactive) {
    classes.push('cursor-pointer');
  }
  
  return classes.join(' ');
}

// Helper functions to map our abstracted values to Tailwind classes
function gapToTailwind(gap: string): string {
  const gapMap: Record<string, string> = {
    'none': '0',
    'xs': '1',
    'sm': '2',
    'md': '4',
    'lg': '6', 
    'xl': '8'
  };
  return gapMap[gap] || '0';
}

function spacingToTailwind(spacing: string): string {
  const spacingMap: Record<string, string> = {
    'none': '0',
    'xs': '1',
    'sm': '2',
    'md': '4',
    'lg': '6',
    'xl': '8'
  };
  return spacingMap[spacing] || '0';
}

// The dynamic component generator function
export function generateComponent(descriptor: ComponentDescriptor, theme: Theme): React.FC<any> {
  // Validate descriptor
  if (!descriptor) {
    console.error('Component descriptor is null or undefined');
    // Return an empty div component as fallback
    const EmptyComponent: React.FC = () => React.createElement('div', {}, 'Invalid component descriptor');
    return EmptyComponent;
  }

  // Define the generated component as a function component
  const GeneratedComponent: React.FC<any> = (props) => {
    // Safety check for theme
    if (!theme) {
      console.error('Theme is null or undefined in generateComponent');
      return React.createElement('div', {}, 'Missing theme');
    }

    const Tag = descriptor.tag || 'div';
    const classes = descriptorToClasses(descriptor, theme);
    const combinedClassNames = cn(classes, props?.className || '');
    
    // Generate style object from descriptor
    const style: React.CSSProperties = {};
    if (descriptor.style) {
      const { color, backgroundColor, border, opacity, custom } = descriptor.style;
      
      if (color) style.color = color;
      if (backgroundColor) style.backgroundColor = backgroundColor;
      if (border) style.border = border;
      if (opacity !== undefined) style.opacity = opacity;
      
      // Merge in any custom styles
      if (custom) {
        Object.entries(custom).forEach(([key, value]) => {
          // @ts-ignore - dynamically setting style properties
          style[key] = value;
        });
      }
    }
    
    // Handle children safely
    let childElements = props?.children;
    
    try {
      if (descriptor.children) {
        if (typeof descriptor.children === 'string') {
          childElements = descriptor.children;
        } else if (Array.isArray(descriptor.children)) {
          childElements = descriptor.children.map((child, index) => {
            if (!child) {
              console.error(`Invalid child at index ${index}`);
              return React.createElement('div', { key: index, className: 'error-component' }, 'Invalid child component');
            }
            
            try {
              // Generate child component and render it directly
              const ChildComponent = generateComponent(child, theme);
              return React.createElement(ChildComponent, { key: index });
            } catch (error) {
              console.error(`Error generating child component: ${error}`);
              return React.createElement('div', { key: index, className: 'error-component' }, 'Error rendering component');
            }
          });
        } else {
          console.error('descriptor.children is neither a string nor an array');
          childElements = React.createElement('div', { className: 'error-component' }, 'Invalid children format');
        }
      }
    } catch (error) {
      console.error('Error processing children:', error);
      childElements = React.createElement('div', { className: 'error-component' }, 'Error processing children');
    }
    
    return React.createElement(
      Tag,
      {
        className: combinedClassNames,
        style,
        ...(descriptor.props || {}),
        ...(props || {})
      },
      childElements
    );
  };
  
  // Set display name for debugging
  GeneratedComponent.displayName = descriptor.name || 'UnnamedComponent';
  
  return GeneratedComponent;
}

// Generate a component from an image (placeholder for AI integration)
export async function generateFromImage(imageUrl: string, theme: Theme): Promise<ComponentDescriptor> {
  // This would be replaced with actual AI processing
  // For now, return a placeholder component
  return {
    type: 'block',
    name: 'ImageGeneratedComponent',
    tag: 'div',
    layout: {
      display: 'flex',
      direction: 'column',
      align: 'center',
      justify: 'center',
      gap: 'md',
      padding: 'lg'
    },
    style: {
      width: 'full',
      borderRadius: 'md',
      shadow: 'md',
      backgroundColor: '#f9f9f9'
    },
    children: [
      {
        type: 'element',
        name: 'Heading',
        tag: 'h2',
        style: {
          color: '#333'
        },
        children: 'Component Generated from Image'
      },
      {
        type: 'element',
        name: 'Description',
        tag: 'p',
        style: {
          color: '#666'
        },
        children: `This component was generated from the image at ${imageUrl}`
      }
    ]
  };
}

// Save generated component to the file system
export function saveGeneratedComponent(descriptor: ComponentDescriptor): void {
  // This would be implemented with file system access
  console.log('Component saved:', descriptor.name);
}

export default {
  generateComponent,
  generateFromImage,
  saveGeneratedComponent
}; 