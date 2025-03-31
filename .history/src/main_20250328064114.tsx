import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/globals.css'
import './styles/fonts.css'
import './styles/tremor.css'
import './styles/blocknote.css'
import './styles/theme.css'
import { ThemeProvider } from './lib/theme-context'
import { registerAllThemes } from './lib/theme-adapters/register-all-themes'
import registerAllUIComponents from './lib/register-ui-components'

// Register all themes on application startup
registerAllThemes();

// Register all UI components with the component registry
registerAllUIComponents();

// Display app identity in console
const appName = import.meta.env.VITE_APP_NAME || 'Agency App';
console.log(
  `%c${appName}`,
  'color: #00A9FF; font-size: 24px; font-weight: bold; text-shadow: 1px 1px 1px rgba(0,0,0,0.2);'
);
console.log(`Running at: ${window.location.origin}`);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultThemeId="salient">
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
) 