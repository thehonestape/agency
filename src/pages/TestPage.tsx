import React from 'react';
import { Link } from 'react-router-dom';

export function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Test Page</h1>
      <p className="mb-4">This is a test page to debug rendering issues.</p>
      <div className="p-4 bg-blue-100 rounded">
        If you can see this page, the rendering system is working.
      </div>
      <div className="mt-4">
        <Link to="/tremor-test" className="text-blue-600 hover:underline">
          Go to Tremor Components Test Page
        </Link>
      </div>
    </div>
  );
} 