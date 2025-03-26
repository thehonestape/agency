import React from 'react';
import '../../styles/working-demo.css';

// Hard-coded colors instead of relying on Tailwind
const colors = [
  { name: 'Primary', color: '#00A9FF', textColor: '#ffffff' },
  { name: 'Secondary', color: '#6366f1', textColor: '#ffffff' },
  { name: 'Accent', color: '#f43f5e', textColor: '#ffffff' },
  { name: 'Background', color: '#ffffff', textColor: '#0f172a' },
  { name: 'Foreground', color: '#0f172a', textColor: '#ffffff' }
];

export default function WorkingDemo() {
  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--background)', color: 'var(--foreground)', minHeight: '100vh' }}>
      <h1 className="demo-heading">Color Palette Demo</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {colors.map((color) => (
          <div 
            key={color.name} 
            className="color-card"
            style={{ 
              border: '1px solid var(--border)', 
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: 'var(--card)'
            }}
          >
            <div 
              className="color-sample" 
              style={{ backgroundColor: color.color }}
            ></div>
            <div style={{ padding: '1rem' }}>
              <h3 style={{ 
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: 'var(--card-foreground)'
              }}>
                {color.name}
              </h3>
              <div style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                {color.color}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1.5rem',
          color: 'var(--foreground)'
        }}>
          Buttons
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: 'var(--primary)', 
            color: 'var(--primary-foreground)',
            border: 'none',
            borderRadius: 'var(--radius)',
            cursor: 'pointer'
          }}>
            Primary Button
          </button>
          
          <button style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: 'var(--secondary)', 
            color: 'var(--secondary-foreground)',
            border: 'none',
            borderRadius: 'var(--radius)',
            cursor: 'pointer'
          }}>
            Secondary Button
          </button>
          
          <button style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: 'var(--accent)', 
            color: 'var(--accent-foreground)',
            border: 'none',
            borderRadius: 'var(--radius)',
            cursor: 'pointer'
          }}>
            Accent Button
          </button>
          
          <button style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: 'transparent', 
            color: 'var(--foreground)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            cursor: 'pointer'
          }}>
            Outline Button
          </button>
        </div>
      </div>
    </div>
  );
}
