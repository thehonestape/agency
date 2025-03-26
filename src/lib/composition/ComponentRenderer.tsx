import React from 'react';
import { ComponentDescriptor } from './types';
import { useTheme } from '../../hooks/useTheme';

// Helper to convert style object to CSS styles
const convertStylesToCss = (styles: Record<string, any>, theme: any) => {
  const cssStyles: Record<string, string> = {};
  
  Object.entries(styles).forEach(([key, value]) => {
    // Handle background
    if (key === 'bg') {
      cssStyles.backgroundColor = value;
    }
    // Handle border radius
    else if (key === 'borderRadius') {
      cssStyles.borderRadius = typeof value === 'number' ? `${value}px` : value;
    }
    // Handle standard keys
    else {
      cssStyles[key] = value;
    }
  });
  
  return cssStyles;
};

// Helper to convert layout props to CSS
const convertLayoutToCss = (layout: Record<string, any>) => {
  const cssStyles: Record<string, string> = {};
  
  Object.entries(layout).forEach(([key, value]) => {
    switch (key) {
      case 'display':
      case 'position':
      case 'flexDirection':
      case 'gridTemplateColumns':
      case 'gridTemplateRows':
      case 'gridTemplateAreas':
      case 'gridArea':
      case 'gridTemplate':
        cssStyles[key] = value;
        break;
      case 'justifyContent':
        if (value === 'start') cssStyles[key] = 'flex-start';
        else if (value === 'end') cssStyles[key] = 'flex-end';
        else if (value === 'between') cssStyles[key] = 'space-between';
        else if (value === 'around') cssStyles[key] = 'space-around';
        else if (value === 'evenly') cssStyles[key] = 'space-evenly';
        else cssStyles[key] = value;
        break;
      case 'alignItems':
        if (value === 'start') cssStyles[key] = 'flex-start';
        else if (value === 'end') cssStyles[key] = 'flex-end';
        else cssStyles[key] = value;
        break;
      case 'gap':
        cssStyles[key] = typeof value === 'number' ? `${value}px` : value;
        break;
      case 'padding':
        cssStyles[key] = typeof value === 'number' ? `${value}px` : value;
        break;
      case 'margin':
        cssStyles[key] = typeof value === 'number' ? `${value}px` : value;
        break;
      case 'width':
      case 'height':
        cssStyles[key] = typeof value === 'number' ? `${value}px` : value;
        break;
      default:
        // Use kebab case for other custom properties
        const kebabKey = key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
        cssStyles[kebabKey] = value;
    }
  });
  
  return cssStyles;
};

interface ComponentRendererProps {
  descriptor: ComponentDescriptor;
  overrideProps?: Record<string, any>;
}

/**
 * A component that renders a component from its descriptor
 */
export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  descriptor,
  overrideProps = {},
}) => {
  const { theme } = useTheme();
  
  // Extract properties from descriptor
  const {
    tag = 'div',
    props = {},
    style = {},
    layout = {},
    behavior = {},
    children,
  } = descriptor;
  
  // Convert styles to CSS
  const styleProps = convertStylesToCss(style, theme);
  const layoutProps = convertLayoutToCss(layout);
  
  // Merge all styles
  const mergedStyles = {
    ...styleProps,
    ...layoutProps,
  };
  
  // Merge props with behavior and overrides
  const mergedProps = {
    ...props,
    ...behavior,
    ...overrideProps,
    style: mergedStyles,
  };
  
  // Render children
  const renderedChildren = () => {
    if (!children) {
      return null;
    }
    
    if (typeof children === 'string') {
      return children;
    }
    
    if (Array.isArray(children)) {
      return children.map((child, index) => {
        if (typeof child === 'string') {
          return <React.Fragment key={index}>{child}</React.Fragment>;
        }
        return <ComponentRenderer key={index} descriptor={child} />;
      });
    }
    
    return null;
  };
  
  // Dynamically render the element
  return React.createElement(
    tag,
    mergedProps,
    renderedChildren()
  );
};

export default ComponentRenderer; 