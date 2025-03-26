import { Theme } from '../types';

// Protocol theme - Dark theme with purple primary color
const protocolTheme: Theme = {
  name: 'protocol',
  colors: {
    primary: '#8b5cf6',
    secondary: '#6366f1',
    accent: '#f43f5e',
    background: '#0f172a',
    text: '#f8fafc',
    muted: '#1e293b',
    border: '#334155',
    danger: '#ef4444',
    success: '#22c55e',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
  radius: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
  spacing: {
    xxs: '2px',
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.5)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.6)',
  },
  // Additional metadata
  isDark: true,
};

export default protocolTheme; 