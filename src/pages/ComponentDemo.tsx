import React, { useState } from 'react';
import { ThemeProvider } from '../themes/providers/ThemeContext';
import { useTheme } from '../hooks/useTheme';
import Container from '../components/core/layout/Container';
import ComponentRenderer from '../lib/composition/ComponentRenderer';
import { generateFromDescription } from '../generators/ai/generateFromDescription';
import { composeComponents, createGridLayout } from '../lib/composition/composeComponents';
import { ComponentDescriptor } from '../lib/composition/types';

// Demo component to show theme switching
const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>Current Theme: {theme.name}</h3>
      <button 
        onClick={() => setTheme(theme.name === 'salient' 
          ? require('../themes/protocol/theme.config').default 
          : require('../themes/salient/theme.config').default
        )}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: theme.colors.primary,
          color: 'white',
          border: 'none',
          borderRadius: theme.radius.md,
          cursor: 'pointer',
        }}
      >
        Switch Theme
      </button>
    </div>
  );
};

// Demo page
const ComponentDemo = () => {
  const [description, setDescription] = useState('');
  const [generatedComponent, setGeneratedComponent] = useState<ComponentDescriptor | null>(null);
  const { theme } = useTheme();
  
  // Handler to generate component from description
  const handleGenerateComponent = async () => {
    if (!description) return;
    
    const component = await generateFromDescription(description, theme);
    setGeneratedComponent(component);
  };
  
  // Create a grid layout to display multiple generated components
  const createDemoGrid = () => {
    if (!generatedComponent) return null;
    
    // Clone the generated component twice to create a grid
    const components = [
      generatedComponent,
      { ...generatedComponent, name: `${generatedComponent.name}2` },
      { ...generatedComponent, name: `${generatedComponent.name}3` },
    ];
    
    // Create a grid layout
    const gridLayout = createGridLayout(3, '1rem');
    const composedGrid = composeComponents(components, gridLayout);
    
    return composedGrid;
  };
  
  return (
    <div style={{ 
      backgroundColor: theme.colors.background, 
      color: theme.colors.text,
      minHeight: '100vh',
      padding: '2rem 0',
    }}>
      <Container maxWidth="lg">
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold',
          marginBottom: '2rem',
          color: theme.colors.primary,
        }}>
          Component System Demo
        </h1>
        
        <ThemeSwitcher />
        
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>Generate Component from Description</h2>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe a component (e.g., 'blue card with heading and text')"
              style={{ 
                padding: '0.75rem',
                borderRadius: theme.radius.md,
                border: `1px solid ${theme.colors.border}`,
                width: '100%',
              }}
            />
            <button
              onClick={handleGenerateComponent}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: theme.colors.primary,
                color: 'white',
                border: 'none',
                borderRadius: theme.radius.md,
                cursor: 'pointer',
              }}
            >
              Generate
            </button>
          </div>
          
          <div style={{ 
            marginTop: '2rem', 
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.radius.lg,
            padding: '1.5rem',
            backgroundColor: theme.colors.background === '#ffffff' 
              ? '#f9fafb' 
              : 'rgba(255,255,255,0.05)',
          }}>
            <h3 style={{ marginBottom: '1rem' }}>Generated Component Preview</h3>
            {generatedComponent ? (
              <ComponentRenderer descriptor={generatedComponent} />
            ) : (
              <p>Enter a description and click Generate to create a component</p>
            )}
          </div>
          
          {generatedComponent && (
            <div style={{ 
              marginTop: '2rem', 
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.radius.lg,
              padding: '1.5rem',
              backgroundColor: theme.colors.background === '#ffffff' 
                ? '#f9fafb' 
                : 'rgba(255,255,255,0.05)',
            }}>
              <h3 style={{ marginBottom: '1rem' }}>Composed Grid Layout</h3>
              <ComponentRenderer descriptor={createDemoGrid()!} />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

// Wrap with ThemeProvider when used standalone
const ComponentDemoWithTheme = () => (
  <ThemeProvider>
    <ComponentDemo />
  </ThemeProvider>
);

export default ComponentDemoWithTheme; 