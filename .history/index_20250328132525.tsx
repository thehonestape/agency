import React from 'react';
import { createRoot } from 'react-dom/client';
import { ViewPrototype } from './ViewPrototype';

// Assume there is a CSS import here for your tailwind styles
// import './styles.css';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <ViewPrototype />
    </React.StrictMode>
  );
} 