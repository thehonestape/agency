import React from 'react';

/**
 * Simple Component Gallery
 * This is a minimal test component to debug routing issues
 */
const SimpleComponentGallery: React.FC = () => {
  return (
    <div className="p-12">
      <h1 className="text-3xl font-bold mb-6">Simple Component Gallery</h1>
      <p className="mb-4">
        This is a minimal test component to debug routing issues.
      </p>
      <div className="p-4 bg-blue-100 rounded-md">
        Test content
      </div>
    </div>
  );
};

export default SimpleComponentGallery; 