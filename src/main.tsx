import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ThemeProvider from './lib/ThemeProvider'
// Import only globals.css which already imports the necessary CSS files
import './styles/globals.css'
// Import additional CSS files that aren't included in globals.css
import './styles/tremor.css'
import './styles/blocknote.css'
import './styles/app.css'
import registerAllUIComponents from './lib/register-ui-components'

// Register all UI components with the component registry
registerAllUIComponents();

// Display app identity in console
const appName = import.meta.env.VITE_APP_NAME || 'Agency App';
console.log(
  `%c${appName}`,
  'color: #00A9FF; font-size: 24px; font-weight: bold; text-shadow: 1px 1px 1px rgba(0,0,0,0.2);'
);
console.log(`Running at: ${window.location.origin}`);

// Ensure proper theme initialization
if (typeof document !== 'undefined') {
  // Prevent flash of unstyled content
  document.documentElement.classList.remove('transition-ready');
  
  // Queue proper theme transitions after a short delay
  window.addEventListener('DOMContentLoaded', () => {
    // Give browser time to apply initial styles before enabling transitions
    setTimeout(() => {
      document.documentElement.classList.add('transition-ready');
      
      // Force a repaint of the select components to ensure they adopt the theme
      const selectComponents = document.querySelectorAll('[class*="Select"]');
      selectComponents.forEach(component => {
        component.classList.add('theme-refresh');
        setTimeout(() => component.classList.remove('theme-refresh'), 10);
      });
    }, 100);
  });
}

// Render the app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);