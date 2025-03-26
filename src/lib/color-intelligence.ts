import { BrandColor } from "../components/brand/BrandProvider";
import chroma from "chroma-js";

/**
 * Interface for the contrast matrix that defines relationships between colors
 * Similar to Huemint's approach: 100 = max contrast, 1 = min contrast, 0 = not connected
 */
export interface ContrastMatrix {
  /** Matrix of contrast values - a 2D array where each cell represents desired contrast between colors */
  matrix: number[][];
  /** Names of the nodes in the matrix for reference */
  nodes: string[];
}

/**
 * Interface for color generation parameters
 */
export interface ColorGenerationParams {
  /** Brand colors to use as the foundation */
  brandColors: BrandColor[];
  /** Lock specific colors (like primary brand colors) */
  lockedColors?: {
    [key: string]: string;
  };
  /** Contrast requirements between UI elements */
  contrastMatrix?: ContrastMatrix;
  /** Controls randomness in generation (0-2.4) similar to Huemint */
  temperature?: number;
  /** Whether to optimize for dark mode */
  darkMode?: boolean;
  /** WCAG accessibility level to target */
  accessibilityLevel?: "AA" | "AAA";
}

/**
 * Default contrast matrix for UI elements based on common accessibility patterns
 * This defines relationships between UI elements like bg-text, button-bg, etc.
 */
const DEFAULT_CONTRAST_MATRIX: ContrastMatrix = {
  matrix: [
    // bg    text   primary secondary accent muted  border
    [0,     70,    40,     30,      50,    20,    10],  // background
    [70,    0,     60,     40,      65,    30,    40],  // text
    [40,    60,    0,      50,      45,    35,    25],  // primary
    [30,    40,    50,     0,       40,    20,    15],  // secondary
    [50,    65,    45,     40,      0,     55,    35],  // accent
    [20,    30,    35,     20,      55,    0,     10],  // muted
    [10,    40,    25,     15,      35,    10,    0],   // border
  ],
  nodes: ["background", "text", "primary", "secondary", "accent", "muted", "border"]
};

/**
 * Default matrix for dark mode - adjusts some relationships for better dark mode contrast
 */
const DARK_MODE_CONTRAST_MATRIX: ContrastMatrix = {
  matrix: [
    // bg    text   primary secondary accent muted  border
    [0,     80,    50,     25,      60,    15,    20],  // background (darker)
    [80,    0,     40,     50,      55,    40,    45],  // text (lighter)
    [50,    40,    0,      30,      50,    35,    30],  // primary
    [25,    50,    30,     0,       45,    25,    15],  // secondary
    [60,    55,    50,     45,      0,     60,    40],  // accent (more vibrant)
    [15,    40,    35,     25,      60,    0,     20],  // muted
    [20,    45,    30,     15,      40,    20,    0],   // border
  ],
  nodes: ["background", "text", "primary", "secondary", "accent", "muted", "border"]
};

/**
 * Calculates the contrast ratio between two colors according to WCAG standards
 * @param color1 First color in hex format
 * @param color2 Second color in hex format
 * @returns Contrast ratio between 1 and 21
 */
export function getContrastRatio(color1: string, color2: string): number {
  try {
    return chroma.contrast(color1, color2);
  } catch (e) {
    console.error("Error calculating contrast:", e);
    return 1; // Fallback to minimum contrast
  }
}

/**
 * Converts a contrast ratio (1-21) to a contrast score (0-100) for the matrix
 * @param ratio WCAG contrast ratio
 * @returns Normalized contrast score for the matrix
 */
export function contrastRatioToScore(ratio: number): number {
  // Normalize to 0-100 scale where higher means more contrast
  // WCAG suggests 4.5:1 for AA and 7:1 for AAA
  // Map these to reasonable scores: 4.5:1 → 60, 7:1 → 80, 21:1 → 100
  
  if (ratio <= 1) return 0;
  if (ratio >= 21) return 100;
  
  return Math.round((Math.log(ratio) / Math.log(21)) * 100);
}

/**
 * Converts a contrast score (0-100) to a target contrast ratio (1-21)
 * @param score Contrast score from matrix
 * @returns Target WCAG contrast ratio
 */
export function scoreToContrastRatio(score: number): number {
  if (score <= 0) return 1;
  if (score >= 100) return 21;
  
  return Math.pow(21, score / 100);
}

/**
 * Creates a color palette optimized for accessibility based on brand colors
 * @param params Generation parameters
 * @returns Object containing generated color palette
 */
export function generateAccessiblePalette(params: ColorGenerationParams) {
  const {
    brandColors,
    lockedColors = {},
    temperature = 1.2,
    darkMode = false,
    accessibilityLevel = "AA"
  } = params;
  
  // Use provided contrast matrix or default based on mode
  const contrastMatrix = params.contrastMatrix || 
    (darkMode ? DARK_MODE_CONTRAST_MATRIX : DEFAULT_CONTRAST_MATRIX);
  
  // Extract primary, secondary, and accent colors from brand colors
  const primaryBrandColors = brandColors.filter(c => c.isPrimary).map(c => c.value);
  const secondaryBrandColors = brandColors.filter(c => c.isSecondary).map(c => c.value);
  const accentBrandColors = brandColors.filter(c => c.isAccent).map(c => c.value);
  
  // Initialize the color palette with locked colors
  const colorPalette: Record<string, string> = { ...lockedColors };
  
  // Extract the nodes from contrast matrix
  const { nodes } = contrastMatrix;
  
  // Set primary color from brand if not already locked
  if (!colorPalette.primary && primaryBrandColors.length > 0) {
    colorPalette.primary = primaryBrandColors[0];
  }
  
  // Set secondary color from brand if not already locked
  if (!colorPalette.secondary && secondaryBrandColors.length > 0) {
    colorPalette.secondary = secondaryBrandColors[0];
  }
  
  // Set accent color from brand if not already locked
  if (!colorPalette.accent && accentBrandColors.length > 0) {
    colorPalette.accent = accentBrandColors[0];
  }
  
  // Set background and text colors based on mode
  if (!colorPalette.background) {
    colorPalette.background = darkMode ? "#0f172a" : "#ffffff";
  }
  
  if (!colorPalette.text) {
    colorPalette.text = darkMode ? "#f8fafc" : "#0f172a";
  }
  
  // Generate remaining colors based on contrast requirements
  nodes.forEach((node) => {
    if (colorPalette[node]) return; // Skip if color is already set
    
    // Get the node index
    const nodeIndex = nodes.indexOf(node);
    
    // For each candidate color, calculate how well it meets contrast requirements
    const candidateColors = generateCandidateColors(
      brandColors.map(c => c.value), 
      darkMode, 
      temperature
    );
    
    let bestColor = "";
    let bestScore = -Infinity;
    
    // Find the color that best satisfies all contrast relationships
    for (const candidate of candidateColors) {
      let score = 0;
      
      // Check contrast against each defined node
      for (let i = 0; i < nodes.length; i++) {
        const targetNode = nodes[i];
        if (!colorPalette[targetNode]) continue;
        
        const targetConstrast = contrastMatrix.matrix[nodeIndex][i];
        if (targetConstrast === 0) continue;
        
        const actualContrast = getContrastRatio(candidate, colorPalette[targetNode]);
        const actualScore = contrastRatioToScore(actualContrast);
        
        // Calculate how close this is to our target contrast
        const difference = Math.abs(actualScore - targetConstrast);
        
        // Lower differences are better
        score -= difference;
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestColor = candidate;
      }
    }
    
    // If we found a suitable color, use it
    if (bestColor) {
      colorPalette[node] = bestColor;
    } else {
      // Fallback to a default if no good match was found
      colorPalette[node] = darkMode ? 
        getDefaultDarkColor(node) : 
        getDefaultLightColor(node);
    }
  });
  
  // Add foreground colors for elements that need them
  colorPalette["primary-foreground"] = ensureReadable(
    colorPalette.primary, 
    darkMode ? "#0f172a" : "#ffffff", 
    accessibilityLevel
  );
  
  colorPalette["secondary-foreground"] = ensureReadable(
    colorPalette.secondary, 
    darkMode ? "#f8fafc" : "#0f172a", 
    accessibilityLevel
  );
  
  colorPalette["accent-foreground"] = ensureReadable(
    colorPalette.accent, 
    darkMode ? "#0f172a" : "#ffffff", 
    accessibilityLevel
  );
  
  colorPalette["muted-foreground"] = ensureReadable(
    colorPalette.muted, 
    darkMode ? "#f8fafc" : "#0f172a", 
    accessibilityLevel
  );
  
  // Generate semantic colors if needed
  if (!colorPalette.success) {
    colorPalette.success = darkMode ? "#10b981" : "#10b981"; // Emerald-500
    colorPalette["success-foreground"] = darkMode ? "#0f172a" : "#ffffff";
  }
  
  if (!colorPalette.warning) {
    colorPalette.warning = darkMode ? "#f59e0b" : "#f59e0b"; // Amber-500
    colorPalette["warning-foreground"] = darkMode ? "#0f172a" : "#ffffff";
  }
  
  if (!colorPalette.destructive) {
    colorPalette.destructive = darkMode ? "#ef4444" : "#ef4444"; // Red-500
    colorPalette["destructive-foreground"] = darkMode ? "#0f172a" : "#ffffff";
  }
  
  if (!colorPalette.info) {
    colorPalette.info = darkMode ? "#3b82f6" : "#3b82f6"; // Blue-500
    colorPalette["info-foreground"] = darkMode ? "#0f172a" : "#ffffff";
  }
  
  // Add ring
  if (!colorPalette.ring) {
    colorPalette.ring = colorPalette.primary;
  }
  
  // Add additional UI colors
  colorPalette.card = colorPalette.background;
  colorPalette["card-foreground"] = colorPalette.text;
  
  colorPalette.popover = colorPalette.background;
  colorPalette["popover-foreground"] = colorPalette.text;
  
  colorPalette.input = colorPalette.border;
  
  return {
    colorPalette,
    // Return contrast analysis for debugging/visualization
    contrastAnalysis: analyzeContrastMatrix(colorPalette, contrastMatrix)
  };
}

/**
 * Analyzes how well the generated palette satisfies the contrast requirements
 */
function analyzeContrastMatrix(
  colorPalette: Record<string, string>, 
  contrastMatrix: ContrastMatrix
) {
  const analysis: Record<string, Record<string, { 
    target: number, 
    actual: number, 
    ratio: number, 
    pass: boolean 
  }>> = {};
  
  const { nodes, matrix } = contrastMatrix;
  
  nodes.forEach((node1, i) => {
    if (!colorPalette[node1]) return;
    analysis[node1] = {};
    
    nodes.forEach((node2, j) => {
      if (!colorPalette[node2] || i === j) return;
      
      const targetScore = matrix[i][j];
      if (targetScore === 0) return;
      
      const actualRatio = getContrastRatio(colorPalette[node1], colorPalette[node2]);
      const actualScore = contrastRatioToScore(actualRatio);
      
      analysis[node1][node2] = {
        target: targetScore,
        actual: actualScore,
        ratio: actualRatio,
        pass: actualRatio >= (targetScore >= 60 ? 4.5 : 3)
      };
    });
  });
  
  return analysis;
}

/**
 * Ensures a color has sufficient contrast against a foreground color
 */
function ensureReadable(
  background: string, 
  preferredForeground: string, 
  level: "AA" | "AAA" = "AA"
): string {
  const minContrast = level === "AAA" ? 7 : 4.5;
  
  try {
    const contrast = getContrastRatio(background, preferredForeground);
    
    if (contrast >= minContrast) {
      return preferredForeground;
    }
    
    // If contrast is insufficient, generate a better color
    // Start from the preferred foreground and adjust lightness
    const isDark = chroma(background).luminance() < 0.5;
    
    // If background is dark, make text lighter; if light, make text darker
    const targetLightness = isDark ? 0.9 : 0.1;
    
    // Create a more readable color by adjusting lightness while preserving hue
    let adjustedColor = chroma(preferredForeground)
      .set('hsl.l', targetLightness)
      .hex();
    
    // Further adjust if still not readable
    if (getContrastRatio(background, adjustedColor) < minContrast) {
      // If still not sufficient, resort to black or white
      adjustedColor = isDark ? "#ffffff" : "#000000";
    }
    
    return adjustedColor;
  } catch (e) {
    console.error("Error ensuring readable color:", e);
    // Fallback to black or white
    return chroma(background).luminance() < 0.5 ? "#ffffff" : "#000000";
  }
}

/**
 * Generates candidate colors based on brand colors with intelligent variations
 */
function generateCandidateColors(
  baseColors: string[],
  darkMode: boolean,
  temperature: number
): string[] {
  const candidates: string[] = [];
  
  // Include originals
  candidates.push(...baseColors);
  
  // The higher the temperature, the more diverse colors we generate
  const variationCount = Math.floor(temperature * 20);
  
  baseColors.forEach(color => {
    try {
      const chromaColor = chroma(color);
      
      // Create variations with different lightness
      for (let i = 1; i <= variationCount; i++) {
        const ratio = i / variationCount;
        
        // In dark mode, focus on darker variations
        if (darkMode) {
          candidates.push(
            chromaColor.darken(ratio * 2).hex(),
            chromaColor.brighten(ratio).hex()
          );
        } else {
          candidates.push(
            chromaColor.brighten(ratio * 2).hex(),
            chromaColor.darken(ratio).hex()
          );
        }
        
        // Add some variations with different saturation
        candidates.push(
          chromaColor.saturate(ratio).hex(),
          chromaColor.desaturate(ratio).hex()
        );
        
        // Add some hue variations
        if (temperature > 1.5) {
          candidates.push(
            chromaColor.set('hsl.h', '+30').hex(),
            chromaColor.set('hsl.h', '-30').hex()
          );
        }
      }
    } catch (e) {
      console.error("Error generating variations for color:", color, e);
    }
  });
  
  // Add some neutral colors
  if (darkMode) {
    candidates.push(
      "#0f172a", // Slate-900
      "#1e293b", // Slate-800
      "#334155", // Slate-700
      "#475569", // Slate-600
      "#000000", // Black
      "#ffffff"  // White
    );
  } else {
    candidates.push(
      "#f8fafc", // Slate-50
      "#f1f5f9", // Slate-100
      "#e2e8f0", // Slate-200
      "#cbd5e1", // Slate-300
      "#ffffff", // White
      "#000000"  // Black
    );
  }
  
  // Remove duplicates
  return [...new Set(candidates)];
}

/**
 * Return default light mode colors for fallback
 */
function getDefaultLightColor(node: string): string {
  switch (node) {
    case "background": return "#ffffff";
    case "text": return "#0f172a";
    case "primary": return "#3b82f6";
    case "secondary": return "#f1f5f9";
    case "accent": return "#f59e0b";
    case "muted": return "#f1f5f9";
    case "border": return "#e2e8f0";
    default: return "#ffffff";
  }
}

/**
 * Return default dark mode colors for fallback
 */
function getDefaultDarkColor(node: string): string {
  switch (node) {
    case "background": return "#0f172a";
    case "text": return "#f8fafc";
    case "primary": return "#3b82f6";
    case "secondary": return "#1e293b";
    case "accent": return "#f59e0b";
    case "muted": return "#1e293b";
    case "border": return "#334155";
    default: return "#0f172a";
  }
}

/**
 * Generates complete light and dark palettes from brand colors
 * @param brandColors Brand colors to use as the foundation
 * @param options Additional generation options
 * @returns Object containing light and dark mode palettes
 */
export function generateThemePalettes(
  brandColors: BrandColor[],
  options: {
    temperature?: number;
    lockedColors?: {
      light?: Record<string, string>;
      dark?: Record<string, string>;
    }
  } = {}
) {
  const temperature = options.temperature ?? 1.2;
  
  // Generate light mode palette
  const lightPalette = generateAccessiblePalette({
    brandColors,
    lockedColors: options.lockedColors?.light || {},
    temperature,
    darkMode: false,
    accessibilityLevel: "AA"
  });
  
  // Generate dark mode palette
  const darkPalette = generateAccessiblePalette({
    brandColors,
    lockedColors: options.lockedColors?.dark || {},
    temperature,
    darkMode: true,
    accessibilityLevel: "AA"
  });
  
  return {
    light: lightPalette.colorPalette,
    dark: darkPalette.colorPalette,
    analysis: {
      light: lightPalette.contrastAnalysis,
      dark: darkPalette.contrastAnalysis
    }
  };
} 