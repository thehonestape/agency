import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      // Tailwind v4 multi-theme configuration
      theme: {
        themes: {
          // Define default theme
          default: {
            // This is applied to all themes
            colors: {
              primary: '#0ea5e9', // sky-500
              secondary: '#f1f5f9', // slate-100
              accent: '#f59e0b', // amber-500
              muted: '#f1f5f9', // slate-100
              destructive: '#ef4444', // red-500
              border: '#e2e8f0', // slate-200 
              input: '#e2e8f0', // slate-200
              ring: '#0ea5e9', // sky-500
            },
            borderRadius: {
              radius: '0.5rem',
            }
          },
          // Blue theme (light variant)
          'blue-light': {
            colors: {
              background: '#ffffff',
              foreground: '#0f172a',
              card: '#ffffff',
              'card-foreground': '#0f172a',
              popover: '#ffffff', 
              'popover-foreground': '#0f172a',
              primary: '#0ea5e9',
              'primary-foreground': '#ffffff',
            }
          },
          // Blue theme (dark variant)
          'blue-dark': {
            colors: {
              background: '#0f172a',
              foreground: '#f8fafc',
              card: '#1e293b',
              'card-foreground': '#f8fafc',
              popover: '#1e293b',
              'popover-foreground': '#f8fafc',
              primary: '#38bdf8',
              'primary-foreground': '#ffffff',
              secondary: '#334155',
              'secondary-foreground': '#f8fafc',
              muted: '#334155',
              'muted-foreground': '#94a3b8',
              border: '#334155',
              input: '#334155',
              ring: '#38bdf8',
            }
          },
          // Green theme (light variant)
          'green-light': {
            colors: {
              background: '#ffffff',
              foreground: '#166534',
              card: '#ffffff',
              'card-foreground': '#166534',
              popover: '#ffffff',
              'popover-foreground': '#166534',
              primary: '#22c55e',
              'primary-foreground': '#ffffff',
              secondary: '#f0fdf4',
              'secondary-foreground': '#166534',
              muted: '#f0fdf4',
              'muted-foreground': '#22c55e',
              border: '#bbf7d0',
              input: '#bbf7d0',
              ring: '#22c55e',
            }
          },
          // Green theme (dark variant)
          'green-dark': {
            colors: {
              background: '#052e16',
              foreground: '#f0fdf4',
              card: '#14532d',
              'card-foreground': '#f0fdf4',
              popover: '#14532d',
              'popover-foreground': '#f0fdf4',
              primary: '#4ade80',
              'primary-foreground': '#000000',
              secondary: '#166534',
              'secondary-foreground': '#f0fdf4',
              muted: '#166534',
              'muted-foreground': '#bbf7d0',
              border: '#166534',
              input: '#166534',
              ring: '#4ade80',
            }
          },
          // Zinc theme (light variant)
          'zinc-light': {
            colors: {
              background: '#ffffff',
              foreground: '#18181b',
              card: '#ffffff',
              'card-foreground': '#18181b',
              popover: '#ffffff',
              'popover-foreground': '#18181b',
              primary: '#71717a',
              'primary-foreground': '#ffffff',
              secondary: '#f4f4f5',
              'secondary-foreground': '#18181b',
              muted: '#f4f4f5',
              'muted-foreground': '#71717a',
              accent: '#71717a',
              'accent-foreground': '#ffffff',
              border: '#e4e4e7',
              input: '#e4e4e7',
              ring: '#71717a',
            }
          },
          // Zinc theme (dark variant)
          'zinc-dark': {
            colors: {
              background: '#18181b',
              foreground: '#f4f4f5',
              card: '#27272a',
              'card-foreground': '#f4f4f5',
              popover: '#27272a',
              'popover-foreground': '#f4f4f5',
              primary: '#71717a',
              'primary-foreground': '#ffffff',
              secondary: '#52525b',
              'secondary-foreground': '#ffffff',
              muted: '#3f3f46',
              'muted-foreground': '#d4d4d8',
              accent: '#f4f4f5',
              'accent-foreground': '#18181b',
              border: '#3f3f46',
              input: '#3f3f46',
              ring: '#71717a',
            }
          },
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@ui': path.resolve(__dirname, './src/components/ui'),
      '@patterns': path.resolve(__dirname, './src/components/patterns'),
      '@services': path.resolve(__dirname, './src/services'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@types': path.resolve(__dirname, './src/types'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  server: {
    port: 3002,
    host: true,
  },
});