/**
 * Utility to generate CSS variables from the token system
 * This transforms our structured tokens into CSS variables.
 */

import { baseColors } from '../tokens/base/colors';
import { semanticColors } from '../tokens/semantic/colors';

/**
 * Generate CSS variables from base color tokens
 */
export function generateBaseColorVariables(): string {
  let css = '';
  
  // Process base colors
  Object.entries(baseColors).forEach(([colorName, value]) => {
    if (typeof value === 'string' && value !== 'transparent' && value !== 'currentColor') {
      css += `  --color-${colorName}: ${value};\n`;
    } else if (typeof value === 'object') {
      Object.entries(value).forEach(([shade, colorValue]) => {
        css += `  --color-${colorName}-${shade}: ${colorValue};\n`;
      });
    }
  });
  
  return css;
}

/**
 * Generate semantic color variables for light mode
 */
export function generateLightModeVariables(): string {
  let css = '';
  
  // Process semantic colors for light mode
  processSemanticColors(semanticColors, 'light', (path, value) => {
    css += `  --${path}: ${value};\n`;
  });
  
  return css;
}

/**
 * Generate semantic color variables for dark mode
 */
export function generateDarkModeVariables(): string {
  let css = '';
  
  // Process semantic colors for dark mode
  processSemanticColors(semanticColors, 'dark', (path, value) => {
    css += `  --${path}: ${value};\n`;
  });
  
  return css;
}

/**
 * Process semantic colors and apply a callback for each token
 */
function processSemanticColors(
  obj: any, 
  mode: 'light' | 'dark', 
  callback: (path: string, value: string) => void, 
  currentPath: string = ''
) {
  for (const [key, value] of Object.entries(obj)) {
    const newPath = currentPath ? `${currentPath}-${key}` : key;
    
    if (value && typeof value === 'object') {
      if ('light' in value && 'dark' in value) {
        // This is a leaf semantic token with light/dark values
        const modeValue = value[mode];
        // Ensure value is a string
        if (typeof modeValue === 'string') {
          callback(newPath, modeValue);
        }
      } else {
        // This is a nested object, recurse
        processSemanticColors(value, mode, callback, newPath);
      }
    }
  }
}

/**
 * Generate full CSS with all variables
 */
export function generateFullCss(): string {
  let css = ':root {\n';
  
  // Add base color variables
  css += generateBaseColorVariables();
  
  // Add semantic variables for light mode
  css += generateLightModeVariables();
  
  css += '}\n\n';
  
  // Add dark mode variables
  css += '.dark {\n';
  css += generateDarkModeVariables();
  css += '}\n';
  
  return css;
}

export default generateFullCss; 