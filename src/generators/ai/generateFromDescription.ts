import { ComponentDescriptor, StyleProps, LayoutProps } from '../../lib/composition/types';
import { Theme } from '../../themes/types';

/**
 * Generate a component structure from a text description using AI
 * 
 * @param description User's description of desired component
 * @param theme Current theme to apply to the generated component
 * @returns A component descriptor that can be used to create a React component
 */
export async function generateFromDescription(
  description: string, 
  theme: Theme
): Promise<ComponentDescriptor> {
  // This is a placeholder - in a real implementation, this would call an AI service
  // For now, we'll return a mock response based on keyword detection
  
  const desc = description.toLowerCase();
  
  // Detect component type from description
  let type: ComponentDescriptor['type'] = 'primitive';
  if (desc.includes('page') || desc.includes('screen')) {
    type = 'page';
  } else if (desc.includes('section') || desc.includes('block')) {
    type = 'block';
  } else if (desc.includes('card') || desc.includes('form') || desc.includes('pattern')) {
    type = 'pattern';
  }
  
  // Detect colors from description
  const style: StyleProps = {};
  if (desc.includes('blue')) {
    style.bg = theme.colors.primary;
    style.color = 'white';
  } else if (desc.includes('green')) {
    style.bg = theme.colors.success;
    style.color = 'white';
  } else if (desc.includes('red')) {
    style.bg = theme.colors.danger;
    style.color = 'white';
  } else {
    style.bg = theme.colors.background;
    style.color = theme.colors.text;
  }
  
  // Detect layout from description
  const layout: LayoutProps = {
    padding: theme.spacing.lg,
  };
  
  if (desc.includes('center')) {
    layout.display = 'flex';
    layout.justifyContent = 'center';
    layout.alignItems = 'center';
  } else if (desc.includes('grid')) {
    layout.display = 'grid';
    layout.gap = theme.spacing.md;
  } else if (desc.includes('flex')) {
    layout.display = 'flex';
    layout.gap = theme.spacing.md;
  }
  
  // Generate a basic component based on the description
  const componentDescriptor: ComponentDescriptor = {
    type,
    name: `Generated${type.charAt(0).toUpperCase() + type.slice(1)}`,
    tag: 'div',
    layout,
    style,
    props: {
      'data-generated': 'true',
    },
    children: [],
    metadata: {
      description: `AI-generated component from description: "${description}"`,
      author: 'AI Assistant',
      created: new Date().toISOString(),
      category: type,
      tags: description.split(' ').filter(word => word.length > 3),
    }
  };
  
  // Add children based on description
  if (desc.includes('heading') || desc.includes('title')) {
    componentDescriptor.children = [
      {
        type: 'primitive',
        name: 'Heading',
        tag: 'h2',
        style: {
          color: style.color,
        },
        children: 'Generated Heading',
      },
    ];
  }
  
  if (desc.includes('text') || desc.includes('paragraph')) {
    const textComponent: ComponentDescriptor = {
      type: 'primitive',
      name: 'Paragraph',
      tag: 'p',
      style: {
        color: style.color,
      },
      children: 'This is a generated paragraph of text to demonstrate AI-based component generation.',
    };
    
    if (Array.isArray(componentDescriptor.children)) {
      componentDescriptor.children.push(textComponent);
    } else {
      componentDescriptor.children = [textComponent];
    }
  }
  
  if (desc.includes('button')) {
    const buttonComponent: ComponentDescriptor = {
      type: 'primitive',
      name: 'Button',
      tag: 'button',
      style: {
        bg: theme.colors.primary,
        color: 'white',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        borderRadius: theme.radius.md,
      },
      children: 'Click Me',
    };
    
    if (Array.isArray(componentDescriptor.children)) {
      componentDescriptor.children.push(buttonComponent);
    } else {
      componentDescriptor.children = [buttonComponent];
    }
  }
  
  return componentDescriptor;
} 