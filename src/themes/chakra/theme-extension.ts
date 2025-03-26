/**
 * Chakra-inspired theme extension for the Agency app
 * This provides utilities to extend and customize themes
 * with a Chakra UI-like API.
 */

import { Theme } from '../types';

export type ThemeExtension = Partial<{
  colors: Record<string, string>;
  space: Record<string, string>;
  fontSizes: Record<string, string>;
  fontWeights: Record<string, number | string>;
  lineHeights: Record<string, number | string>;
  letterSpacings: Record<string, string>;
  borders: Record<string, string>;
  radii: Record<string, string>;
  shadows: Record<string, string>;
  zIndices: Record<string, number>;
  components: Record<string, ComponentStyleConfig>;
}>;

export interface ComponentStyleConfig {
  baseStyle?: StyleObject;
  sizes?: Record<string, StyleObject>;
  variants?: Record<string, StyleObject>;
  defaultProps?: {
    size?: string;
    variant?: string;
    colorScheme?: string;
  };
}

export interface StyleObject {
  [key: string]: any;
}

/**
 * Extend a theme with additional values
 */
export function extendTheme(theme: Theme, extension: ThemeExtension): Theme {
  // Create a deep copy of the theme to avoid mutations
  const newTheme = JSON.parse(JSON.stringify(theme)) as Theme;
  
  // Helper to merge nested objects
  const deepMerge = (target: any, source: any) => {
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        // Create the key if it doesn't exist in target
        if (!target[key]) target[key] = {};
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  };
  
  // Merge colors
  if (extension.colors) {
    newTheme.colors = {
      ...newTheme.colors,
      ...extension.colors,
    };
  }
  
  // Merge spacing
  if (extension.space) {
    newTheme.spacing = {
      ...newTheme.spacing,
      ...extension.space,
    };
  }
  
  // Merge radii
  if (extension.radii) {
    newTheme.radius = {
      ...newTheme.radius,
      ...extension.radii,
    };
  }
  
  // Merge shadows
  if (extension.shadows) {
    newTheme.shadows = {
      ...newTheme.shadows,
      ...extension.shadows,
    };
  }
  
  // Additional metadata that might exist on the theme
  newTheme.components = newTheme.components || {};
  
  // Merge components
  if (extension.components) {
    for (const [componentName, config] of Object.entries(extension.components)) {
      newTheme.components[componentName] = deepMerge(
        newTheme.components[componentName] || {},
        config
      );
    }
  }
  
  return newTheme;
}

/**
 * Create a component theme with variants, sizes, etc.
 */
export function defineStyleConfig(config: ComponentStyleConfig): ComponentStyleConfig {
  return config;
}

/**
 * Create multi-part component theme
 */
export function defineMultiStyleConfig(config: Record<string, ComponentStyleConfig>): Record<string, ComponentStyleConfig> {
  return config;
}

/**
 * Chakra-like style props for components
 */
export const styleProps = {
  // Space props
  margin: { property: 'margin', scale: 'space' },
  marginTop: { property: 'marginTop', scale: 'space' },
  marginRight: { property: 'marginRight', scale: 'space' },
  marginBottom: { property: 'marginBottom', scale: 'space' },
  marginLeft: { property: 'marginLeft', scale: 'space' },
  marginX: { properties: ['marginLeft', 'marginRight'], scale: 'space' },
  marginY: { properties: ['marginTop', 'marginBottom'], scale: 'space' },
  padding: { property: 'padding', scale: 'space' },
  paddingTop: { property: 'paddingTop', scale: 'space' },
  paddingRight: { property: 'paddingRight', scale: 'space' },
  paddingBottom: { property: 'paddingBottom', scale: 'space' },
  paddingLeft: { property: 'paddingLeft', scale: 'space' },
  paddingX: { properties: ['paddingLeft', 'paddingRight'], scale: 'space' },
  paddingY: { properties: ['paddingTop', 'paddingBottom'], scale: 'space' },
  
  // Color props
  color: { property: 'color', scale: 'colors' },
  backgroundColor: { property: 'backgroundColor', scale: 'colors' },
  bg: { property: 'backgroundColor', scale: 'colors' },
  borderColor: { property: 'borderColor', scale: 'colors' },
  
  // Typography props
  fontSize: { property: 'fontSize', scale: 'fontSizes' },
  fontWeight: { property: 'fontWeight', scale: 'fontWeights' },
  lineHeight: { property: 'lineHeight', scale: 'lineHeights' },
  letterSpacing: { property: 'letterSpacing', scale: 'letterSpacings' },
  textAlign: { property: 'textAlign' },
  fontStyle: { property: 'fontStyle' },
  
  // Layout props
  width: { property: 'width', scale: 'sizes' },
  height: { property: 'height', scale: 'sizes' },
  minWidth: { property: 'minWidth', scale: 'sizes' },
  maxWidth: { property: 'maxWidth', scale: 'sizes' },
  minHeight: { property: 'minHeight', scale: 'sizes' },
  maxHeight: { property: 'maxHeight', scale: 'sizes' },
  
  // Flexbox props
  alignItems: { property: 'alignItems' },
  alignContent: { property: 'alignContent' },
  justifyItems: { property: 'justifyItems' },
  justifyContent: { property: 'justifyContent' },
  flexWrap: { property: 'flexWrap' },
  flexDirection: { property: 'flexDirection' },
  flex: { property: 'flex' },
  flexGrow: { property: 'flexGrow' },
  flexShrink: { property: 'flexShrink' },
  flexBasis: { property: 'flexBasis', scale: 'sizes' },
  justifySelf: { property: 'justifySelf' },
  alignSelf: { property: 'alignSelf' },
  order: { property: 'order' },
  
  // Border props
  border: { property: 'border', scale: 'borders' },
  borderWidth: { property: 'borderWidth', scale: 'borderWidths' },
  borderStyle: { property: 'borderStyle', scale: 'borderStyles' },
  borderRadius: { property: 'borderRadius', scale: 'radii' },
  
  // Position props
  position: { property: 'position' },
  zIndex: { property: 'zIndex', scale: 'zIndices' },
  top: { property: 'top', scale: 'space' },
  right: { property: 'right', scale: 'space' },
  bottom: { property: 'bottom', scale: 'space' },
  left: { property: 'left', scale: 'space' },
  
  // Shadow props
  boxShadow: { property: 'boxShadow', scale: 'shadows' },
  textShadow: { property: 'textShadow', scale: 'shadows' },
};

export default { extendTheme, defineStyleConfig, defineMultiStyleConfig, styleProps }; 