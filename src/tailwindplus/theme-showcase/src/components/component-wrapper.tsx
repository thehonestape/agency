import React from 'react';
import { ThemeName } from '@/lib/theme-provider';
import { ComponentType } from '@/lib/theme-components';

interface ComponentWrapperProps {
  theme: ThemeName;
  componentType: ComponentType;
  children: React.ReactNode;
  className?: string;
}

export default function ComponentWrapper({
  theme,
  componentType,
  children,
  className = '',
}: ComponentWrapperProps) {
  // Apply specific styling based on component type and theme
  const getWrapperStyles = () => {
    switch (componentType) {
      case 'Header':
        return 'w-full overflow-hidden';
      case 'Hero':
        return 'w-full overflow-hidden';
      case 'Footer':
        return 'w-full overflow-hidden';
      case 'Card':
        return 'max-w-md mx-auto';
      case 'Button':
        return 'flex justify-center items-center p-4';
      default:
        return '';
    }
  };
  
  // Get component-specific class based on theme
  const componentClass = `${theme}-${componentType.toLowerCase()}`;
  
  // Clone the child element and add the theme-specific class if possible
  const enhancedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child) && typeof child.type !== 'string') {
      // For React components, we'll wrap them in a div with the theme class
      return (
        <div className={`theme-${theme}`}>
          {child}
        </div>
      );
    }
    return child;
  });
  
  return (
    <div className={`component-wrapper theme-${theme} ${getWrapperStyles()} ${className}`}>
      <div className={componentClass}>
        {enhancedChildren}
      </div>
    </div>
  );
} 