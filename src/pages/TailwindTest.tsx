import React from 'react';

export default function TailwindTest() {
  return (
    <div>
      {/* This should appear with browser default styling */}
      <h1 style={{ color: 'blue', fontFamily: 'Arial', padding: '20px', border: '2px solid red' }}>
        Basic HTML with inline styles
      </h1>
      
      {/* This should show Tailwind styles if working */}
      <div className="bg-red-500 text-white p-4 m-4 rounded">
        This should have a red background and white text
      </div>
      
      <div className="bg-blue-500 text-white p-4 m-4 rounded">
        This should have a blue background and white text
      </div>
      
      <div className="p-4 m-4 border-2 border-gray-400 rounded">
        <p className="text-lg font-bold">Tailwind utility classes:</p>
        <ul className="list-disc pl-5 mt-2">
          <li className="text-red-500">This text should be red</li>
          <li className="text-blue-500">This text should be blue</li>
          <li className="text-green-500">This text should be green</li>
          <li className="font-bold">This text should be bold</li>
          <li className="italic">This text should be italic</li>
        </ul>
      </div>
    </div>
  );
} 