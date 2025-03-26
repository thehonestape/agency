import React from 'react';
import { Button, Card, Theme } from '../../component-system';

interface ThemePreviewProps {
  theme: Theme;
  colorMode?: 'light' | 'dark';
}

/**
 * Component that renders a preview of a theme with various UI elements
 */
export const ThemePreview: React.FC<ThemePreviewProps> = ({ 
  theme, 
  colorMode = 'light' 
}) => {
  // Create a variant of the theme for dark mode preview if needed
  const previewTheme = colorMode === 'dark' ? 
    { 
      ...theme,
      colors: {
        ...theme.colors,
        background: '#1a1a1a',
        text: '#f5f5f5',
        muted: '#2a2a2a',
        border: '#333333'
      }
    } : theme;
    
  return (
    <Card variant="outlined">
      <div style={{ padding: '1.5rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '1rem',
          alignItems: 'center'
        }}>
          <h3 style={{ fontWeight: 'bold' }}>Theme Preview</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}></div>
        </div>
        
        <div 
          id="theme-preview-container"
          style={{ 
            padding: '2rem', 
            border: '1px solid var(--color-border)', 
            borderRadius: 'var(--radius-md)',
            backgroundColor: previewTheme.colors.background,
            color: previewTheme.colors.text,
            position: 'relative',
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <h1 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '0.5rem',
            fontFamily: previewTheme.fonts.heading,
            fontWeight: 700,
            color: previewTheme.colors.primary
          }}>
            Heading Level 1
          </h1>
          <h2 style={{ 
            fontSize: '2rem', 
            marginBottom: '0.5rem',
            fontFamily: previewTheme.fonts.heading,
            fontWeight: 700,
          }}>
            Heading Level 2
          </h2>
          <h3 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '1rem',
            fontFamily: previewTheme.fonts.heading,
            fontWeight: 700,
          }}>
            Heading Level 3
          </h3>
          
          <p style={{ 
            marginBottom: '1rem',
            fontSize: '1rem',
            fontFamily: previewTheme.fonts.body,
            lineHeight: 1.5,
          }}>
            This is a paragraph of text that demonstrates the body font settings. The quick brown fox jumps over the lazy dog.
          </p>
          
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginBottom: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '1rem',
            marginBottom: '1.5rem' 
          }}>
            <Card variant="default">
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Default Card</h3>
                <p style={{ fontSize: '0.875rem' }}>This is a default card with base styling.</p>
              </div>
            </Card>
            <Card variant="elevated">
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Elevated Card</h3>
                <p style={{ fontSize: '0.875rem' }}>This card has elevation and shadow.</p>
              </div>
            </Card>
          </div>
          
          <div style={{ 
            padding: '1rem', 
            backgroundColor: previewTheme.colors.muted,
            borderRadius: 'var(--radius-md)',
            fontSize: '0.875rem',
            color: previewTheme.colors.text
          }}>
            This is a muted container that shows the muted background color and text color.
          </div>
        </div>
      </div>
    </Card>
  );
}; 