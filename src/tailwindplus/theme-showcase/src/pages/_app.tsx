import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@/lib/theme-provider';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  // Force theme class on body for SSR
  useEffect(() => {
    // Get the current theme from localStorage or default to 'protocol'
    const currentTheme = localStorage.getItem('theme') || 'protocol';
    
    // Remove any existing theme classes
    document.body.className = document.body.className
      .replace(/theme-\w+/g, '')
      .trim();
    
    // Add the current theme class
    document.body.classList.add(`theme-${currentTheme}`);
  }, []);
  
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
} 