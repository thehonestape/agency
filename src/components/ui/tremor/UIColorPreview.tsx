import React from 'react';
import { Card, Text, Title } from '@tremor/react';
import { ThemeColor, themeToTremorColors } from './theme-config';

export const UIColorPreview = () => {
  // Our theme colors with CSS variable mapping
  const themeColorVariables = {
    primary: 'var(--primary)',
    secondary: 'var(--secondary)',
    success: 'var(--success)',
    warning: 'var(--warning)',
    destructive: 'var(--destructive)',
    info: 'var(--info)',
    muted: 'var(--muted)'
  };
  
  // Color intensities to display
  const intensities = [
    { name: 'Default', suffix: '' },
    { name: 'Foreground', suffix: '-foreground' },
  ];
  
  // Optional background/foreground pairs to show
  const backgroundForegroundPairs = [
    { name: 'Background', variable: 'var(--background)' },
    { name: 'Foreground', variable: 'var(--foreground)' },
    { name: 'Card', variable: 'var(--card)' },
    { name: 'Card Foreground', variable: 'var(--card-foreground)' },
    { name: 'Popover', variable: 'var(--popover)' },
    { name: 'Popover Foreground', variable: 'var(--popover-foreground)' },
    { name: 'Muted', variable: 'var(--muted)' },
    { name: 'Muted Foreground', variable: 'var(--muted-foreground)' },
    { name: 'Border', variable: 'var(--border)' },
    { name: 'Input', variable: 'var(--input)' },
    { name: 'Ring', variable: 'var(--ring)' },
  ];
  
  return (
    <Card className="p-6">
      <Title>Tailwind Theme Colors</Title>
      <Text className="mb-4">UI theme color variables and how they map to Tremor colors</Text>
      
      <div className="space-y-8">
        {/* Show semantic colors and their foreground variants */}
        <div>
          <Title className="text-lg mb-2">Semantic Colors</Title>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Object.entries(themeColorVariables).map(([colorName, variable]) => (
              <React.Fragment key={colorName}>
                {intensities.map(intensity => {
                  const varName = `${variable}${intensity.suffix}`;
                  const tremorColor = themeToTremorColors[colorName as ThemeColor];
                  
                  return (
                    <div key={`${colorName}-${intensity.suffix}`} className="space-y-2">
                      <div 
                        className="h-16 w-full rounded-md border flex items-end p-2"
                        style={{ backgroundColor: `var(--${colorName}${intensity.suffix})` }}
                      >
                        <div className="text-xs mt-auto leading-none" style={{ 
                          color: intensity.suffix ? undefined : `var(--${colorName}-foreground)`,
                          backgroundColor: intensity.suffix ? 'rgba(0,0,0,0.5)' : undefined,
                          padding: intensity.suffix ? '2px 4px' : undefined,
                          borderRadius: intensity.suffix ? '4px' : undefined
                        }}>
                          {colorName}{intensity.suffix}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Text className="text-xs font-medium">{colorName}{intensity.suffix}</Text>
                        <Text className="text-xs text-muted-foreground">
                          Maps to Tremor: {tremorColor}
                        </Text>
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Show background/foreground pairs */}
        <div>
          <Title className="text-lg mb-2">UI Background/Foreground Colors</Title>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {backgroundForegroundPairs.map(({ name, variable }) => (
              <div key={name} className="space-y-2">
                <div 
                  className="h-16 w-full rounded-md border flex items-end p-2"
                  style={{ backgroundColor: variable }}
                >
                  <div className="text-xs mt-auto leading-none" style={{ 
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: '2px 4px',
                    borderRadius: '4px'
                  }}>
                    {name}
                  </div>
                </div>
                <Text className="text-xs font-medium">{name}</Text>
                <Text className="text-xs text-muted-foreground">{variable}</Text>
              </div>
            ))}
          </div>
        </div>
        
        {/* CSS Variables example */}
        <div>
          <Title className="text-lg mb-2">Theme CSS Variables</Title>
          <Card className="bg-card p-4 overflow-auto">
            <pre className="text-xs">
              {`:root {
  --background: oklch(0.1 0 0);
  --foreground: oklch(0.9 0 0);
  
  --primary: oklch(0.7 0.2 250);
  --primary-foreground: oklch(0.1 0 0);
  
  --secondary: oklch(0.3 0.05 230);
  --secondary-foreground: oklch(0.9 0 0);
  
  /* And other color variables... */
}`}
            </pre>
          </Card>
          <Text className="text-xs text-muted-foreground mt-2">
            This is an example of CSS variables in a theme. Your actual theme may use different values.
          </Text>
        </div>
      </div>
    </Card>
  );
}; 