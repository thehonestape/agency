import React from 'react';

export default function TailwindTest() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">Tailwind Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-red-500 text-white p-6 rounded-lg shadow-md">
          Red Box (bg-red-500)
        </div>
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          Blue Box (bg-blue-500)
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          Green Box (bg-green-500)
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
          Yellow Box (bg-yellow-500)
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-primary text-white p-6 rounded-lg shadow-md">
          Primary Color Box (bg-primary)
        </div>
        <div className="bg-secondary text-white p-6 rounded-lg shadow-md">
          Secondary Color Box (bg-secondary)
        </div>
        <div className="bg-accent text-white p-6 rounded-lg shadow-md">
          Accent Color Box (bg-accent)
        </div>
        <div className="bg-destructive text-destructive-foreground p-6 rounded-lg shadow-md">
          Destructive Color Box (bg-destructive)
        </div>
      </div>
    </div>
  );
} 