import React from 'react';
import { ThemeName } from '@/lib/theme-provider';
import { ComponentType, getThemeComponent, componentProps } from '@/lib/theme-components';
import ComponentWrapper from './component-wrapper';

interface ThemeComponentDisplayProps {
  theme: ThemeName;
  componentType: ComponentType;
  className?: string;
}

export default function ThemeComponentDisplay({ 
  theme, 
  componentType, 
  className = '' 
}: ThemeComponentDisplayProps) {
  // Dynamically get the component from the theme
  const Component = getThemeComponent(theme, componentType);
  
  // Get the appropriate props for this component type
  const props = componentProps[componentType];
  
  // Add theme-specific class to props
  const themeComponentClass = `${theme}-${componentType.toLowerCase()}`;
  
  return (
    <div className={`theme-component-display ${className}`}>
      <div className="mb-2 text-sm font-medium text-muted-foreground">
        {theme} / {componentType}
      </div>
      <div className={`border border-border rounded-lg overflow-hidden theme-${theme}`}>
        <div className={`p-4 bg-muted/30 theme-${theme}`}>
          <ComponentWrapper theme={theme} componentType={componentType}>
            <Component {...props} className={themeComponentClass} />
          </ComponentWrapper>
        </div>
      </div>
    </div>
  );
} 