/**
 * Component System Exports
 * 
 * This file provides a convenient way to import all components and utilities
 * from the modular component system.
 */

// Core Components
export { default as Button } from '../components/core/inputs/Button';
export { default as Container } from '../components/core/layout/Container';
export { default as AppShell } from '../components/core/layout/AppShell';

// Pattern Components
export { default as Card } from '../components/patterns/cards/Card';

// Block Components
export { default as FeatureCard } from '../components/blocks/features/FeatureCard';
export { default as FeatureSection } from '../components/blocks/features/FeatureSection';

// Theme System
export { ThemeProvider, useTheme } from '../themes/providers/ThemeProvider';
export { getThemeValue, getCssVar, getThemeClass } from '../hooks/useTheme';
export { default as salientTheme } from '../themes/salient/theme.config';
export { default as protocolTheme } from '../themes/protocol/theme.config';
export { generateThemeFromBrand, applyThemeToDom } from '../themes/generators/brandToTheme';
export type { Theme, ThemeMode } from '../themes/types';
export type { BrandData } from '../themes/generators/brandToTheme';

// Component Composition
export { 
  composeComponents,
  createGridLayout,
  createFlexLayout,
  createStackLayout
} from '../lib/composition/composeComponents';
export { default as ComponentRenderer } from '../lib/composition/ComponentRenderer';

// AI Generation
export { generateFromDescription } from '../generators/ai/generateFromDescription';

// Component Registry
export { componentRegistry, useComponentRegistry } from '../lib/discovery/ComponentRegistry';

// Types
export * from '../lib/composition/types';
export * from '../themes/types'; 