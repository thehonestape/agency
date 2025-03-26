import React from 'react';
import { Container } from '../../component-system';

const DemoPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Container size="xl" className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-4">Left Column</h2>
            <p className="text-gray-600">
              This is the left column content. It will stack on mobile and display side-by-side on larger screens.
            </p>
          </div>

          {/* Right Column */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-4">Right Column</h2>
            <p className="text-gray-600">
              This is the right column content. The layout is handled by CSS Grid with responsive breakpoints.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DemoPage; 