import React from 'react';

export default function HomeView() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <p className="mb-6">Welcome to the home view. Add your content here.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Feature 1</h2>
          <p>Description of your first feature goes here. You can use any of your existing components.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Feature 2</h2>
          <p>Description of your second feature goes here.</p>
        </div>
      </div>
    </div>
  );
} 