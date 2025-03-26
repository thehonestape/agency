import React from 'react';

// Minimal polyfill for Next.js Head component that doesn't do anything in this context
const Head = ({ children }) => {
  // In a real application, we'd update document title and meta tags
  // For this demo, we'll just render nothing
  return null;
};

export default Head; 