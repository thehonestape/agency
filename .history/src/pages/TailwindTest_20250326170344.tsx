import React, { useEffect } from 'react';
import '../tailwind-test.css';

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
      <div className="bg-red-500 text-white p-4 mb-4 rounded" style={{ backgroundColor: 'red', color: 'white', padding: '1rem', marginBottom: '1rem', borderRadius: '0.25rem' }}>
        This should have a red background (with inline styles)
      </div>
      <div className="bg-green-500 text-white p-4 mb-4 rounded" style={{ backgroundColor: 'green', color: 'white', padding: '1rem', marginBottom: '1rem', borderRadius: '0.25rem' }}>
        This should have a green background (with inline styles)
      </div>
      <div className="bg-blue-500 text-white p-4 mb-4 rounded" style={{ backgroundColor: 'blue', color: 'white', padding: '1rem', marginBottom: '1rem', borderRadius: '0.25rem' }}>
        This should have a blue background (with inline styles)
      </div>
      <div className="bg-yellow-500 text-black p-4 mb-4 rounded">
        This should have a yellow background
      </div>
      <div className="bg-pink-500 text-white p-4 mb-4 rounded">
        This should have a pink background
      </div>
      <div className="bg-primary text-primary-foreground p-4 mb-4 rounded">
        This should use your custom primary color (Tailwind class)
      </div>
      <div className="bg-secondary text-secondary-foreground p-4 mb-4 rounded">
        This should use your custom secondary color
      </div>
      <div className="border border-border p-4 mb-4 rounded">
        This should use your custom border color
      </div>
      <p style={{ marginTop: '2rem', fontWeight: 'bold' }}>
        If you see colors above from the inline styles but not from Tailwind classes, it means Tailwind CSS is not being properly applied.
      </p>
    </div>
  );
} 