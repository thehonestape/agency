/**
 * Base color tokens
 * These are the raw color values without semantic meaning.
 * All values are in hex format for better compatibility with Tailwind v4.
 * 
 * This file defines our global color palette that serves as the foundation
 * for all semantic colors in the system.
 * 
 * Following a structured approach with three layers:
 * 1. Base Colors: Foundational color scales from 50-950
 * 2. Semantic Colors: Colors mapped to their purpose in the UI
 * 3. Component Colors: Specific color applications for UI components
 */

export const baseColors = {
  transparent: 'transparent',
  current: 'currentColor',
  white: '#ffffff',
  black: '#000000',
  
  // Neutral scale - Used for backgrounds, text, and borders
  // The backbone of our UI, providing structure and hierarchy
  gray: {
    50: '#f8fafc',  // Lightest background
    100: '#f1f5f9', // Light background, hover states
    200: '#e2e8f0', // Light borders, dividers
    300: '#cbd5e1', // Medium borders, disabled states
    400: '#94a3b8', // Muted text, placeholders
    500: '#64748b', // Secondary text, icons
    600: '#475569', // Primary text in dark mode
    700: '#334155', // Emphasized text in dark mode
    800: '#1e293b', // Dark backgrounds
    900: '#0f172a', // Primary text in light mode
    950: '#020617', // Darkest background
  },
  
  // Primary brand colors - The main color identity of the application
  // Each of these can serve as the primary color for different themes
  
  // Blue scale - Default primary color
  blue: {
    50: '#f0f9ff',  // Lightest background, hover states
    100: '#e0f2fe', // Light background, hover states
    200: '#bae6fd', // Light borders, subtle accents
    300: '#7dd3fc', // Medium accents
    400: '#38bdf8', // Strong accents
    500: '#0ea5e9', // Default buttons, links
    600: '#0284c7', // Primary buttons, active states
    700: '#0369a1', // Hover states, emphasized elements
    800: '#075985', // Active states, pressed buttons
    900: '#0c4a6e', // Very dark accents
    950: '#082f49', // Darkest variant
  },
  
  // Teal scale - Alternative primary color
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6', // Default buttons, links
    600: '#0d9488', // Primary buttons, active states
    700: '#0f766e', // Hover states, emphasized elements
    800: '#115e59', // Active states, pressed buttons
    900: '#134e4a',
    950: '#042f2e',
  },
  
  // Purple scale - Alternative primary color
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7', // Default buttons, links
    600: '#9333ea', // Primary buttons, active states
    700: '#7e22ce', // Hover states, emphasized elements
    800: '#6b21a8', // Active states, pressed buttons
    900: '#581c87',
    950: '#3b0764',
  },
  
  // Indigo scale - Alternative primary color
  indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1', // Default buttons, links
    600: '#4f46e5', // Primary buttons, active states
    700: '#4338ca', // Hover states, emphasized elements
    800: '#3730a3', // Active states, pressed buttons
    900: '#312e81',
    950: '#1e1b4b',
  },
  
  // Rose scale - Alternative primary color
  rose: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e', // Default buttons, links
    600: '#e11d48', // Primary buttons, active states
    700: '#be123c', // Hover states, emphasized elements
    800: '#9f1239', // Active states, pressed buttons
    900: '#881337',
    950: '#4c0519',
  },
  
  // Functional colors - Used for feedback and status indicators
  // These colors maintain their meaning across all themes
  
  // Green scale - Success indicators
  green: {
    50: '#f0fdf4',  // Success background
    100: '#dcfce7', // Success background (hover)
    200: '#bbf7d0', // Success border (subtle)
    300: '#86efac', // Success border
    400: '#4ade80', // Success text (subtle)
    500: '#22c55e', // Success text
    600: '#16a34a', // Success buttons, icons
    700: '#15803d', // Success hover states
    800: '#166534', // Success active states
    900: '#14532d',
    950: '#052e16',
  },
  
  // Red scale - Error indicators
  red: {
    50: '#fef2f2',  // Error background
    100: '#fee2e2', // Error background (hover)
    200: '#fecaca', // Error border (subtle)
    300: '#fca5a5', // Error border
    400: '#f87171', // Error text (subtle)
    500: '#ef4444', // Error text
    600: '#dc2626', // Error buttons, icons
    700: '#b91c1c', // Error hover states
    800: '#991b1b', // Error active states
    900: '#7f1d1d',
    950: '#450a0a',
  },
  
  // Amber scale - Warning indicators and accent color
  amber: {
    50: '#fffbeb',  // Warning background
    100: '#fef3c7', // Warning background (hover)
    200: '#fde68a', // Warning border (subtle)
    300: '#fcd34d', // Warning border
    400: '#fbbf24', // Warning text (subtle)
    500: '#f59e0b', // Warning text, accent color
    600: '#d97706', // Warning buttons, accent hover
    700: '#b45309', // Warning hover states, accent active
    800: '#92400e', // Warning active states
    900: '#78350f',
    950: '#451a03',
  },
};

// Type definition for a color scale
export type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

export type ColorToken = keyof typeof baseColors | 
  `${keyof typeof baseColors & string}.${50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950}`;

export default baseColors;