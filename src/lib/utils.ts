import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combine multiple class names with Tailwind CSS optimization
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as currency
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)
}

/**
 * Format a date string
 */
export function formatDate(dateString: string, options: Intl.DateTimeFormatOptions = {}): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  }).format(date)
}

/**
 * Truncate a string to a maximum length
 */
export function truncateString(str: string, maxLength: number = 50): string {
  if (str.length <= maxLength) return str
  return `${str.slice(0, maxLength)}...`
}

/**
 * Generate a random color from a fixed palette
 */
export function getRandomColor(seed: string): string {
  const colors = [
    "#0ea5e9", // sky-500
    "#6366f1", // indigo-500
    "#8b5cf6", // violet-500
    "#ec4899", // pink-500
    "#f43f5e", // rose-500
    "#ef4444", // red-500
    "#f97316", // orange-500
    "#eab308", // yellow-500
    "#84cc16", // lime-500
    "#22c55e", // green-500
    "#10b981", // emerald-500
    "#06b6d4", // cyan-500
  ]
  
  // Simple hash function to get a consistent color for the same input
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  return colors[Math.abs(hash) % colors.length]
}

/**
 * Delay execution for a specified time
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Convert an object to URL query parameters
 */
export function objectToQueryString(obj: Record<string, any>): string {
  return Object.keys(obj)
    .filter(key => obj[key] !== undefined && obj[key] !== null)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&")
}

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Debounce a function call
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Calculates whether to use light or dark text based on background color luminance
 * Using the WCAG contrast algorithm for better accessibility
 * @param backgroundColor - HSL values in format "h s% l%" (for example "210 30% 95%")
 * @returns HSL values for contrasting text - either white or black based on optimal contrast
 */
export function getContrastingTextColor(backgroundColor: string): string {
  try {
    // Parse HSL values - handle both formats: "h s% l%" and "h s% l% / a%"
    const parts = backgroundColor.split(' ');
    const h = parseInt(parts[0]);
    // Remove percentage sign from saturation and lightness
    const s = parseInt(parts[1].replace('%', ''));
    // Handle both normal lightness and those with alpha channel
    const l = parseInt(parts[2].includes('/') ? parts[2].split('/')[0].replace('%', '') : parts[2].replace('%', ''));
    
    // Convert HSL to RGB for luminance calculation
    // Algorithm from https://www.w3.org/TR/WCAG20-TECHS/G17.html
    
    // Normalize HSL values
    const normalizedH = h / 360;
    const normalizedS = s / 100;
    const normalizedL = l / 100;
    
    // Convert to RGB
    let r, g, b;
    
    if (normalizedS === 0) {
      r = g = b = normalizedL;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = normalizedL < 0.5 
        ? normalizedL * (1 + normalizedS) 
        : normalizedL + normalizedS - normalizedL * normalizedS;
      const p = 2 * normalizedL - q;
      
      r = hue2rgb(p, q, normalizedH + 1/3);
      g = hue2rgb(p, q, normalizedH);
      b = hue2rgb(p, q, normalizedH - 1/3);
    }
    
    // Convert RGB to luminance
    const adjustedR = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const adjustedG = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const adjustedB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    
    // Calculate relative luminance
    const luminance = 0.2126 * adjustedR + 0.7152 * adjustedG + 0.0722 * adjustedB;
    
    // Calculate contrast ratios with white and black
    const contrastWithWhite = (1.0 + 0.05) / (luminance + 0.05);
    const contrastWithBlack = (luminance + 0.05) / (0.0 + 0.05);
    
    // Use the color with higher contrast
    return contrastWithWhite > contrastWithBlack ? "0 0% 100%" : "0 0% 0%";
  } catch (error) {
    console.error("Error calculating contrasting text color:", error, backgroundColor);
    // Default fallback - use white text for dark backgrounds, black for light
    const [_, __, lightness] = backgroundColor.split(' ');
    const lightnessValue = parseFloat(lightness);
    return lightnessValue < 50 ? "0 0% 100%" : "0 0% 0%";
  }
}

/**
 * Generates theme variables for a button with proper contrast
 * @param primaryColor - RGB values in format "r g b" (space-separated)
 * @returns Object with button-text and button-background values
 */
export function generateButtonColors(primaryColor: string) {
  const textColor = getContrastingTextColor(primaryColor);
  
  return {
    'button-background': primaryColor,
    'button-text': textColor,
  };
}

/**
 * Creates a complete set of theme colors with proper contrast
 * @param baseColors - Object with base HSL values 
 * @returns Object with all theme variables
 */
export function generateThemeColors(baseColors: { 
  primary: string;
  background: string;
  foreground?: string;
  accent?: string;
  success?: string;
  warning?: string;
  info?: string;
  destructive?: string;
}) {
  const {
    primary, 
    background,
    foreground = getContrastingTextColor(background),
    accent = primary,
    success = "142.1 76.2% 36.3%", // green-600
    warning = "38 92% 50%",        // amber-500
    info = "221.2 83.2% 53.3%",    // blue-500
    destructive = "0 84.2% 60.2%"  // red-500
  } = baseColors;
  
  // Extract the background lightness value
  const [bg_h, bg_s, bg_l] = background.split(' ');
  const bgLightness = parseFloat(bg_l);
  
  // Create contrasting shades for muted and border colors
  // For light themes, make muted/border darker; for dark themes, make them lighter
  const isDarkTheme = bgLightness < 50;
  
  // Calculate contrasting muted background (slightly different from main background)
  const mutedLightness = isDarkTheme 
    ? Math.min(bgLightness + 10, 90) + '%' 
    : Math.max(bgLightness - 10, 10) + '%';
  const mutedBackground = `${bg_h} ${bg_s} ${mutedLightness}`;
  
  // For muted foreground, adjust opacity to create contrast while maintaining color scheme
  const mutedForeground = isDarkTheme
    ? foreground.replace('%)', ' / 0.7)').replace('%', '%')
    : foreground.replace('%)', ' / 0.7)').replace('%', '%');
  
  // Create visible border color with enough contrast from background
  const borderLightness = isDarkTheme
    ? Math.min(bgLightness + 20, 95) + '%'
    : Math.max(bgLightness - 20, 5) + '%';
  const borderColor = `${bg_h} ${bg_s} ${borderLightness}`;
  
  // Create input color with proper contrast
  const inputColor = borderColor;
  
  return {
    // Base colors
    'background': background,
    'foreground': foreground,
    
    // Component colors
    'card': background,
    'card-foreground': foreground,
    'popover': background,
    'popover-foreground': foreground,
    
    // Primary colors
    'primary': primary,
    'primary-foreground': getContrastingTextColor(primary),
    
    // Secondary colors from accent
    'secondary': accent,
    'secondary-foreground': getContrastingTextColor(accent),
    
    // Muted colors (with improved contrast)
    'muted': mutedBackground,
    'muted-foreground': mutedForeground,
    
    // Accent colors
    'accent': accent,
    'accent-foreground': getContrastingTextColor(accent),
    
    // Semantic colors
    'destructive': destructive,
    'destructive-foreground': getContrastingTextColor(destructive),
    'success': success,
    'success-foreground': getContrastingTextColor(success),
    'warning': warning,
    'warning-foreground': getContrastingTextColor(warning),
    'info': info,
    'info-foreground': getContrastingTextColor(info),
    
    // Border and ring colors (with improved contrast)
    'border': borderColor,
    'input': inputColor,
    'ring': primary,
  };
}
