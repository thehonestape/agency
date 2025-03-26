/**
 * CSS Variables Generator
 * Creates CSS variables from our theme token system.
 */
import { HSLColor, hslToString, defaultTheme } from './tokens';

/**
 * Generates a CSS string with all theme variables
 * This can be injected into a style tag or CSS file
 */
export function generateThemeCssVariables(): string {
  let cssString = '';
  
  // Create light theme variables
  cssString += ':root {\n';
  cssString += generateThemeVariables(defaultTheme.light);
  cssString += '}\n\n';
  
  // Create dark theme variables
  cssString += '.dark {\n';
  cssString += generateThemeVariables(defaultTheme.dark);
  cssString += '}\n';
  
  return cssString;
}

/**
 * Generates theme variables for a specific theme (light or dark)
 */
function generateThemeVariables(theme: Record<string, any>): string {
  let cssVars = '';
  
  // Helper for recursive property traversal
  const processObject = (obj: Record<string, any>, prefix: string = '') => {
    Object.entries(obj).forEach(([key, value]) => {
      const varName = prefix ? `--${prefix}-${key}` : `--${key}`;
      
      // Process HSL color
      if (value && typeof value === 'object' && 'h' in value) {
        const hslValue = value as HSLColor;
        cssVars += `  ${varName}: ${hslToString(hslValue)};\n`;
      } 
      // Process nested object
      else if (value && typeof value === 'object') {
        processObject(value, prefix ? `${prefix}-${key}` : key);
      }
      // Process string/number value (shouldn't happen with our structure, but as safeguard)
      else if (value !== undefined && value !== null) {
        cssVars += `  ${varName}: ${value};\n`;
      }
    });
  };
  
  // Process each category in the theme
  Object.entries(theme).forEach(([category, values]) => {
    processObject(values as Record<string, any>, category);
  });
  
  return cssVars;
}

/**
 * Generates all the HSL variable CSS in a style tag
 * Can be used to inject theme variables into the document during runtime
 */
export function injectThemeCssVariables() {
  // Check if the style tag already exists
  const existingStyle = document.getElementById('theme-variables');
  if (existingStyle) {
    existingStyle.innerHTML = generateThemeCssVariables();
    return;
  }
  
  // Create new style tag
  const style = document.createElement('style');
  style.id = 'theme-variables';
  style.innerHTML = generateThemeCssVariables();
  document.head.appendChild(style);
}

export default generateThemeCssVariables; 