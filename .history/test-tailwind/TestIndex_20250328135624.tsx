import React from 'react';
import { createRoot } from 'react-dom/client';
import { TailwindTest } from './TailwindTest';
import './index.css';

// For testing just our Tailwind setup
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <TailwindTest />
    </React.StrictMode>
  );
} 