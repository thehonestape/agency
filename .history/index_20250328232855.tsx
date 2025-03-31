import React from 'react';
import { createRoot } from 'react-dom/client';
import { DesignSystemDocs } from './DesignSystemDocs';

// Import global styles for Tailwind v4
import './styles.css';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <DesignSystemDocs />
    </React.StrictMode>
  );
} 