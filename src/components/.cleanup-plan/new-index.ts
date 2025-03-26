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