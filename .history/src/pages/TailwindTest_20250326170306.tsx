import React from 'react';

export default function TailwindTest() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">Tailwind Test</h1>
      <div className="bg-red-500 text-white p-4 mb-4 rounded">
        This should have a red background
      </div>
      <div className="bg-green-500 text-white p-4 mb-4 rounded">
        This should have a green background
      </div>
      <div className="bg-blue-500 text-white p-4 mb-4 rounded">
        This should have a blue background
      </div>
      <div className="bg-yellow-500 text-black p-4 mb-4 rounded">
        This should have a yellow background
      </div>
      <div className="bg-pink-500 text-white p-4 mb-4 rounded">
        This should have a pink background
      </div>
      <div className="bg-primary text-primary-foreground p-4 mb-4 rounded">
        This should use your custom primary color
      </div>
      <div className="bg-secondary text-secondary-foreground p-4 mb-4 rounded">
        This should use your custom secondary color
      </div>
      <div className="border border-border p-4 mb-4 rounded">
        This should use your custom border color
      </div>
    </div>
  );
} 