import React from 'react';

export default function TailwindTest() {
  return (
    <div className="p-10 bg-white">
      <h1 className="text-3xl font-bold mb-4">Tailwind Test</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Basic Colors</h2>
        <div className="bg-red-500 text-white p-4 mb-2 rounded">
          Red Background (bg-red-500)
        </div>
        <div className="bg-blue-500 text-white p-4 mb-2 rounded">
          Blue Background (bg-blue-500)
        </div>
        <div className="bg-green-500 text-white p-4 mb-2 rounded">
          Green Background (bg-green-500)
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Custom Colors</h2>
        <div className="bg-primary text-white p-4 mb-2 rounded">
          Primary Color Background (bg-primary)
        </div>
        <div className="bg-secondary text-white p-4 mb-2 rounded">
          Secondary Color Background (bg-secondary)
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Utility Classes</h2>
        <div className="p-4 bg-gray-200 mb-2 rounded w-full md:w-1/2 lg:w-1/3">
          Responsive Width (full width on mobile, half on md, third on lg)
        </div>
        <div className="p-4 bg-gray-200 mb-2 rounded shadow-lg">
          Box Shadow (shadow-lg)
        </div>
      </div>
      
      <div className="border-t pt-4 mt-8">
        <p className="text-sm text-gray-600">
          If you can see properly colored boxes above, Tailwind is working correctly.
        </p>
      </div>
    </div>
  );
} 