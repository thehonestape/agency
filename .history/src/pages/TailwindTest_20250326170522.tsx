import React, { useEffect } from 'react';
// Import styles from globals.css directly
import '../styles/globals.css';

export default function TailwindTest() {
  useEffect(() => {
    // Attempt to directly set styles on the document body
    document.body.style.backgroundColor = 'lightblue';
    
    return () => {
      // Clean up
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="p-10" style={{ backgroundColor: 'white' }}>
      <h1 className="text-3xl font-bold text-blue-500 mb-4" style={{ color: 'blue' }}>Tailwind Test</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>With Inline Styles (Should Work)</h2>
        <div style={{ backgroundColor: 'red', color: 'white', padding: '1rem', marginBottom: '1rem', borderRadius: '0.25rem' }}>
          Red background with inline styles
        </div>
        <div style={{ backgroundColor: 'green', color: 'white', padding: '1rem', marginBottom: '1rem', borderRadius: '0.25rem' }}>
          Green background with inline styles
        </div>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>With Tailwind Color Classes</h2>
        <div className="bg-red-500 text-white p-4 mb-4 rounded">
          Should have red background (bg-red-500)
        </div>
        <div className="bg-green-500 text-white p-4 mb-4 rounded">
          Should have green background (bg-green-500)
        </div>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>With Custom Color Variables</h2>
        <div className="bg-primary text-white p-4 mb-4 rounded">
          Should use primary color (var(--color-primary))
        </div>
        <div className="bg-secondary text-white p-4 mb-4 rounded">
          Should use secondary color (var(--color-secondary))
        </div>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>With Sizing & Spacing Utilities</h2>
        <div className="p-8 bg-gray-200 mb-4 rounded">
          Should have large padding (p-8)
        </div>
        <div className="mt-8 p-2 bg-gray-200 rounded">
          Should have top margin (mt-8)
        </div>
      </div>

      <p style={{ marginTop: '2rem', fontWeight: 'bold', backgroundColor: 'yellow', padding: '1rem' }}>
        If you see colors from inline styles but not from Tailwind classes, there's an issue with Tailwind processing.
      </p>
    </div>
  );
} 