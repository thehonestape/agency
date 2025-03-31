/**
 * CSS Variables Generator
 * Creates CSS variables from our theme token system.
 */
import { defaultTheme } from './tokens';

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
      
      // Process string/number value (shouldn't happen with our structure, but as safeguard)
      if (value !== undefined && value !== null) {
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

export function generateCssVariables(theme = defaultTheme.light) {
  const variables: string[] = [];

  Object.entries(theme).forEach(([prefix, values]) => {
    Object.entries(values).forEach(([key, value]) => {
      if (typeof value === 'string') {
        variables.push(`--${prefix}-${key}: ${value};`);
      }
    });
  });

  return variables.join('\n');
}

export function generateThemeCss(theme = defaultTheme) {
  return `
    :root {
      ${generateCssVariables(theme.light)}
    }

    .dark {
      ${generateCssVariables(theme.dark)}
    }
  `;
}

export default generateThemeCssVariables; 