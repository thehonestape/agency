#!/usr/bin/env node

/**
 * Theme Generator Script
 * 
 * This script generates new theme variations based on our theming architecture.
 * It creates both light and dark mode variations of the theme.
 * 
 * Usage:
 * node generate-theme.js [themeName] [primary-color]
 * 
 * Example:
 * node generate-theme.js indigo "#4f46e5"
 * node generate-theme.js emerald "#10b981"
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Command line arguments
const [themeName, primaryColor] = process.argv.slice(2);

if (!themeName || !primaryColor) {
  console.error('Usage: node generate-theme.js [themeName] [primary-color]');
  console.error('Example: node generate-theme.js indigo "#4f46e5"');
  process.exit(1);
}

// Validate theme name
if (!/^[a-z][a-z0-9-]*$/.test(themeName)) {
  console.error('Theme name must be in kebab-case (lowercase with hyphens)');
  process.exit(1);
}

// Convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Generate color scale
function generateColorScale(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;

  // Convert RGB to HSL
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  // Generate color scale
  const scale = {
    50: adjustLightness(hex, 0.95),
    100: adjustLightness(hex, 0.9),
    200: adjustLightness(hex, 0.85),
    300: adjustLightness(hex, 0.75),
    400: adjustLightness(hex, 0.65),
    500: hex,
    600: adjustLightness(hex, 0.45),
    700: adjustLightness(hex, 0.35),
    800: adjustLightness(hex, 0.25),
    900: adjustLightness(hex, 0.2),
    950: adjustLightness(hex, 0.15),
  };

  return scale;
}

// Adjust lightness of a hex color
function adjustLightness(hex, amount) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const r = Math.round(rgb.r * amount);
  const g = Math.round(rgb.g * amount);
  const b = Math.round(rgb.b * amount);

  return `#${[r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('')}`;
}

// Directory path
const themesDir = path.join(process.cwd(), 'src', 'components', 'ui', 'theme', 'presets');

// Create directory if it doesn't exist
if (!fs.existsSync(themesDir)) {
  fs.mkdirSync(themesDir, { recursive: true });
}

// Theme template
const themeTemplate = `import { defineTheme } from "../theme-utils";

/**
 * ${themeName.charAt(0).toUpperCase() + themeName.slice(1)} theme
 * A theme based on ${primaryColor} as the primary color
 */
export const ${themeName.replace(/-([a-z])/g, (g) => g[1].toUpperCase())}Theme = defineTheme({
  light: {
    colors: {
      background: "hsl(0 0% 100%)",
      foreground: "hsl(222.2 84% 4.9%)",
      card: "hsl(0 0% 100%)",
      "card-foreground": "hsl(222.2 84% 4.9%)",
      popover: "hsl(0 0% 100%)",
      "popover-foreground": "hsl(222.2 84% 4.9%)",
      primary: "${primaryColor}",
      "primary-foreground": "hsl(210 40% 98%)",
      secondary: "hsl(210 40% 96.1%)",
      "secondary-foreground": "hsl(222.2 47.4% 11.2%)",
      muted: "hsl(210 40% 96.1%)",
      "muted-foreground": "hsl(215.4 16.3% 46.9%)",
      accent: "hsl(210 40% 96.1%)",
      "accent-foreground": "hsl(222.2 47.4% 11.2%)",
      destructive: "hsl(0 84.2% 60.2%)",
      "destructive-foreground": "hsl(210 40% 98%)",
      success: "hsl(142.1 76.2% 36.3%)",
      "success-foreground": "hsl(210 40% 98%)",
      warning: "hsl(38 92% 50%)",
      "warning-foreground": "hsl(222.2 84% 4.9%)",
      info: "hsl(221.2 83.2% 53.3%)",
      "info-foreground": "hsl(210 40% 98%)",
      border: "hsl(214.3 31.8% 91.4%)",
      input: "hsl(214.3 31.8% 91.4%)",
      ring: "hsl(222.2 84% 4.9%)",
    },
    radius: {
      default: "0.5rem",
      sm: "0.3rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
    },
  },
  dark: {
    colors: {
      background: "hsl(222.2 84% 4.9%)",
      foreground: "hsl(210 40% 98%)",
      card: "hsl(222.2 84% 4.9%)",
      "card-foreground": "hsl(210 40% 98%)",
      popover: "hsl(222.2 84% 4.9%)",
      "popover-foreground": "hsl(210 40% 98%)",
      primary: "${primaryColor}",
      "primary-foreground": "hsl(222.2 47.4% 11.2%)",
      secondary: "hsl(217.2 32.6% 17.5%)",
      "secondary-foreground": "hsl(210 40% 98%)",
      muted: "hsl(217.2 32.6% 17.5%)",
      "muted-foreground": "hsl(215 20.2% 65.1%)",
      accent: "hsl(217.2 32.6% 17.5%)",
      "accent-foreground": "hsl(210 40% 98%)",
      destructive: "hsl(0 62.8% 30.6%)",
      "destructive-foreground": "hsl(210 40% 98%)",
      success: "hsl(142.1 70.6% 45.3%)",
      "success-foreground": "hsl(210 40% 98%)",
      warning: "hsl(48 96.5% 58.8%)",
      "warning-foreground": "hsl(222.2 47.4% 11.2%)",
      info: "hsl(217.2 91.2% 59.8%)",
      "info-foreground": "hsl(222.2 47.4% 11.2%)",
      border: "hsl(217.2 32.6% 17.5%)",
      input: "hsl(217.2 32.6% 17.5%)",
      ring: "hsl(212.7 26.8% 83.9%)",
    },
    radius: {
      default: "0.5rem",
      sm: "0.3rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
    },
  },
});
`;

// Theme utils if it doesn't exist
const themeUtilsPath = path.join(process.cwd(), 'src', 'components', 'ui', 'theme', 'theme-utils.ts');
if (!fs.existsSync(themeUtilsPath)) {
  const themeUtilsContent = `import { HSLColor } from "./tokens";

/**
 * Theme definition type for consistent theme creation
 */
export interface ThemeDefinition {
  light: {
    colors: Record<string, string>;
    radius?: Record<string, string>;
  };
  dark: {
    colors: Record<string, string>;
    radius?: Record<string, string>;
  };
}

/**
 * Helper to define themes with type checking
 */
export function defineTheme(theme: ThemeDefinition): ThemeDefinition {
  return theme;
}

/**
 * Converts a CSS HSL string to an HSLColor object
 */
export function parseHsl(hslStr: string): HSLColor | null {
  const matches = hslStr.match(/hsl\\(\\s*(\\d+)\\s*,\\s*(\\d+)%\\s*,\\s*(\\d+)%\\s*\\)/);
  if (!matches) return null;
  
  return {
    h: parseInt(matches[1]),
    s: parseInt(matches[2]),
    l: parseInt(matches[3])
  };
}

/**
 * Converts an HSLColor object to a CSS HSL string
 */
export function hslToString(hsl: HSLColor): string {
  return \`\${hsl.h} \${hsl.s}% \${hsl.l}%\`;
}

/**
 * Adjusts the lightness of an HSL color
 */
export function adjustLightness(hsl: HSLColor, amount: number): HSLColor {
  return {
    ...hsl,
    l: Math.max(0, Math.min(100, hsl.l + amount))
  };
}

/**
 * Generates a color palette from a base color
 */
export function generatePalette(baseColor: HSLColor, options = { darkMode: false }): Record<string, HSLColor> {
  const { darkMode } = options;
  
  // Adjust HSL values based on whether we're in dark mode
  const adjustments = darkMode ? {
    background: { h: 0, s: 0, l: 10 },
    foreground: { h: 0, s: 0, l: 95 },
    primary: { h: 0, s: 0, l: 15 },
    secondary: { h: 0, s: -10, l: -10 },
    muted: { h: 0, s: -20, l: -30 },
    accent: { h: 30, s: 10, l: 0 },
  } : {
    background: { h: 0, s: 0, l: 100 },
    foreground: { h: 0, s: 0, l: 10 },
    primary: { h: 0, s: 0, l: 0 },
    secondary: { h: 0, s: -10, l: 10 },
    muted: { h: 0, s: -20, l: 20 },
    accent: { h: 30, s: 10, l: 0 },
  };
  
  return {
    primary: baseColor,
    'primary-light': {
      ...baseColor,
      l: Math.min(100, baseColor.l + 15)
    },
    'primary-dark': {
      ...baseColor,
      l: Math.max(0, baseColor.l - 15)
    },
    // Generate other colors relative to base color
    // You can add more sophisticated color generation here
  };
}
`;
  fs.writeFileSync(themeUtilsPath, themeUtilsContent);
  console.log(`Created theme utilities: ${themeUtilsPath}`);
}

// Create theme file
const themePath = path.join(themesDir, `${themeName}.ts`);
fs.writeFileSync(themePath, themeTemplate);
console.log(`Theme created: ${themePath}`);

// Update theme presets index file
const presetsIndexPath = path.join(themesDir, 'index.ts');
const themeExport = `export * from './${themeName}';`;

if (!fs.existsSync(presetsIndexPath)) {
  fs.writeFileSync(presetsIndexPath, `${themeExport}\n`);
  console.log(`Created presets index: ${presetsIndexPath}`);
} else {
  const indexContent = fs.readFileSync(presetsIndexPath, 'utf8');
  if (!indexContent.includes(themeExport)) {
    fs.appendFileSync(presetsIndexPath, `${themeExport}\n`);
    console.log(`Updated presets index: ${presetsIndexPath}`);
  }
}

// Update main theme selector to include the new theme
try {
  const themeSwitcherPath = path.join(process.cwd(), 'src', 'components', 'ui', 'theme', 'theme-switcher.tsx');
  
  if (fs.existsSync(themeSwitcherPath)) {
    let content = fs.readFileSync(themeSwitcherPath, 'utf8');
    
    // Find the themes array in the theme switcher
    const themesRegex = /const themes\s*=\s*\[([\s\S]*?)\]/;
    const match = content.match(themesRegex);
    
    if (match) {
      // Check if theme is already included
      if (!content.includes(`name: "${themeName}"`)) {
        // Add new theme to the themes array
        const newThemeEntry = `\n  { name: "${themeName}", theme: ${themeName.replace(/-([a-z])/g, (g) => g[1].toUpperCase())}Theme },`;
        const updatedThemes = content.replace(themesRegex, (match) => {
          return match.replace(/\]/, `${newThemeEntry}\n]`);
        });
        
        // Add the import if it doesn't exist
        const importStatement = `import { ${themeName.replace(/-([a-z])/g, (g) => g[1].toUpperCase())}Theme } from "./presets/${themeName}";`;
        if (!updatedThemes.includes(importStatement)) {
          const updatedContent = updatedThemes.replace(
            /import {([\s\S]*?)} from "\.\/tokens";/,
            (match) => `${match}\n${importStatement}`
          );
          
          fs.writeFileSync(themeSwitcherPath, updatedContent);
          console.log(`Updated theme switcher to include ${themeName} theme`);
        } else {
          fs.writeFileSync(themeSwitcherPath, updatedThemes);
          console.log(`Updated theme switcher to include ${themeName} theme`);
        }
      } else {
        console.log(`Theme ${themeName} already included in theme switcher`);
      }
    } else {
      console.log(`Could not find themes array in ${themeSwitcherPath}`);
    }
  }
} catch (error) {
  console.error(`Error updating theme switcher: ${error.message}`);
}

console.log(`\n✅ ${themeName} theme successfully generated!`);
console.log(`You can now use the ${themeName} theme in your application.`); 