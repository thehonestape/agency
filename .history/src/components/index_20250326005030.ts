// Components library for generative theming

// Forms
export * from './forms';

// Data Display
export * from './data-display';

// Feedback
export * from './feedback';

// Layout
// Using named export for Layout since it's exported as a named function
export { Layout } from './Layout';

// Theme Provider
export * from './theme-provider';

// Core Components - All primitive components
export * from './ui/avatar';
export * from './ui/button';
export * from './ui/input';
export * from './ui/textarea';
export * from './ui/select';
export * from './ui/switch';
export * from './ui/tabs';
export * from './ui/Card';
export * from './ui/badge';
export * from './ui/banner';
export * from './ui/alert';
export * from './ui/combobox';
export * from './ui/sheet';
export * from './ui/skeleton';
export * from './ui/slider';
export * from './ui/scroll-area';
export * from './ui/label';

// Typography and Layout
export * from './ui/typography';
export * from './ui/layout';

// Theme
export * from './ui/theme/theme-provider';
export * from './ui/theme/theme-switcher';
export * from './theme-toggle';

// Feature Components
export * from './application-shells';
export * from './marketing';
export * from './editor';
export * from './forms';
export * from './data-display';
export * from './navigation';
export * from './feedback';
export * from './overlays';
export * from './brand/index';
export * from './dashboard';

// Utility Components
export * from './ErrorBoundary';

// Core UI Components
// All primitive and reusable components
export * from './ui';

// Layout Components
// Application structure, page layouts, and responsive containers
export * from './layouts';

// Feature Components
// Domain-specific components grouped by feature area
export * from './features/auth';
export * from './features/dashboard';
export * from './features/projects';
export * from './features/marketing';
export * from './features/brand';
export * from './features/editor';

// Individual Components
// Standalone components not fitting into other categories
export * from './ErrorBoundary';
export * from './theme-toggle';
export * from './theme-provider';

// Utility Components
// Components that provide specific functionality
export * from './TailwindComponentBrowser';
export * from './TailwindComponentViewer';
export * from './PreviewImageGenerator'; 