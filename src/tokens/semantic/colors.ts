/**
 * Semantic color tokens
 * These map the base colors to their semantic meaning in the UI.
 * Using a structured approach aligned with Tailwind v4.
 */

import { baseColors, ColorScale } from '../base/colors';

/**
 * Semantic color structure with clear purpose and organization
 * 
 * The semantic colors are organized into logical categories:
 * 1. Surface - Background colors for different UI layers
 * 2. Content - Text and icon colors
 * 3. Border - Border and divider colors
 * 4. Interactive - Colors for interactive elements
 * 5. Status - Feedback and status colors
 * 6. Component-specific - Colors for specific UI components
 * 
 * Each category contains both light and dark mode variants
 */
export const semanticColors = {
  // ======================================================
  // SURFACE COLORS
  // Used for backgrounds of different UI elements
  // ======================================================
  surface: {
    // Main application background
    background: baseColors.white,
    backgroundDark: baseColors.gray[950],
    
    // Subtle background variations
    subtle: baseColors.gray[50],
    subtleDark: baseColors.gray[900],
    
    // Muted backgrounds for secondary elements
    muted: baseColors.gray[100],
    mutedDark: baseColors.gray[800],
    
    // Card and elevated element backgrounds
    card: baseColors.white,
    cardDark: baseColors.gray[900],
    
    // Hover state backgrounds
    hover: baseColors.gray[50],
    hoverDark: baseColors.gray[800],
    
    // Active/pressed state backgrounds
    active: baseColors.gray[100],
    activeDark: baseColors.gray[700],
    
    // Disabled state backgrounds
    disabled: baseColors.gray[50],
    disabledDark: baseColors.gray[800],
  },
  
  // ======================================================
  // CONTENT COLORS
  // Used for text, icons, and other content
  // ======================================================
  content: {
    // Primary text
    primary: baseColors.gray[900],
    primaryDark: baseColors.gray[50],
    
    // Secondary/supporting text
    secondary: baseColors.gray[600],
    secondaryDark: baseColors.gray[400],
    
    // Tertiary/muted text
    muted: baseColors.gray[500],
    mutedDark: baseColors.gray[500],
    
    // Placeholder text
    placeholder: baseColors.gray[400],
    placeholderDark: baseColors.gray[600],
    
    // Disabled text
    disabled: baseColors.gray[400],
    disabledDark: baseColors.gray[600],
    
    // Inverted text (on colored backgrounds)
    inverted: baseColors.white,
    invertedDark: baseColors.gray[950],
    
    // Brand-colored text
    brand: baseColors.blue[700],
    brandDark: baseColors.blue[400],
  },
  
  // ======================================================
  // BORDER COLORS
  // Used for borders, dividers, and outlines
  // ======================================================
  border: {
    // Default borders
    default: baseColors.gray[200],
    defaultDark: baseColors.gray[700],
    
    // Subtle borders
    subtle: baseColors.gray[100],
    subtleDark: baseColors.gray[800],
    
    // Strong/emphasized borders
    strong: baseColors.gray[300],
    strongDark: baseColors.gray[600],
    
    // Focus state borders and rings
    focus: baseColors.blue[500],
    focusDark: baseColors.blue[500],
    
    // Hover state borders
    hover: baseColors.gray[300],
    hoverDark: baseColors.gray[600],
    
    // Disabled state borders
    disabled: baseColors.gray[200],
    disabledDark: baseColors.gray[700],
  },
  
  // ======================================================
  // INTERACTIVE COLORS
  // Used for buttons, links, and other interactive elements
  // ======================================================
  interactive: {
    // Default state
    default: baseColors.blue[600],
    defaultDark: baseColors.blue[500],
    
    // Hover state
    hover: baseColors.blue[700],
    hoverDark: baseColors.blue[400],
    
    // Active/pressed state
    active: baseColors.blue[800],
    activeDark: baseColors.blue[300],
    
    // Subtle/muted interactive elements
    subtle: baseColors.blue[50],
    subtleDark: baseColors.blue[950],
    
    // Text color on interactive elements
    onInteractive: baseColors.white,
    onInteractiveDark: baseColors.white,
    
    // Secondary interactive elements
    secondary: baseColors.gray[200],
    secondaryDark: baseColors.gray[700],
    
    // Secondary hover state
    secondaryHover: baseColors.gray[300],
    secondaryHoverDark: baseColors.gray[600],
    
    // Secondary active state
    secondaryActive: baseColors.gray[400],
    secondaryActiveDark: baseColors.gray[500],
    
    // Text on secondary interactive elements
    onSecondary: baseColors.gray[900],
    onSecondaryDark: baseColors.gray[100],
  },
  
  // ======================================================
  // STATUS COLORS
  // Used for feedback and status indicators
  // ======================================================
  status: {
    // Success states
    success: baseColors.green[600],
    successDark: baseColors.green[500],
    successSubtle: baseColors.green[50],
    successSubtleDark: baseColors.green[950],
    successBorder: baseColors.green[300],
    successBorderDark: baseColors.green[700],
    successContent: baseColors.green[700],
    successContentDark: baseColors.green[300],
    
    // Error states
    error: baseColors.red[600],
    errorDark: baseColors.red[500],
    errorSubtle: baseColors.red[50],
    errorSubtleDark: baseColors.red[950],
    errorBorder: baseColors.red[300],
    errorBorderDark: baseColors.red[700],
    errorContent: baseColors.red[700],
    errorContentDark: baseColors.red[300],
    
    // Warning states
    warning: baseColors.amber[500],
    warningDark: baseColors.amber[400],
    warningSubtle: baseColors.amber[50],
    warningSubtleDark: baseColors.amber[950],
    warningBorder: baseColors.amber[300],
    warningBorderDark: baseColors.amber[700],
    warningContent: baseColors.amber[700],
    warningContentDark: baseColors.amber[300],
    
    // Info states
    info: baseColors.blue[500],
    infoDark: baseColors.blue[400],
    infoSubtle: baseColors.blue[50],
    infoSubtleDark: baseColors.blue[950],
    infoBorder: baseColors.blue[300],
    infoBorderDark: baseColors.blue[700],
    infoContent: baseColors.blue[700],
    infoContentDark: baseColors.blue[300],
  },
  
  // ======================================================
  // COMPONENT-SPECIFIC COLORS
  // Colors for specific UI components
  // ======================================================
  components: {
    // Button component colors
    button: {
      // Primary button
      primaryBg: baseColors.blue[600],
      primaryBgDark: baseColors.blue[500],
      primaryHoverBg: baseColors.blue[700],
      primaryHoverBgDark: baseColors.blue[400],
      primaryActiveBg: baseColors.blue[800],
      primaryActiveBgDark: baseColors.blue[300],
      primaryText: baseColors.white,
      primaryTextDark: baseColors.white,
      
      // Secondary button
      secondaryBg: baseColors.gray[200],
      secondaryBgDark: baseColors.gray[700],
      secondaryHoverBg: baseColors.gray[300],
      secondaryHoverBgDark: baseColors.gray[600],
      secondaryActiveBg: baseColors.gray[400],
      secondaryActiveBgDark: baseColors.gray[500],
      secondaryText: baseColors.gray[900],
      secondaryTextDark: baseColors.gray[100],
      
      // Destructive button
      destructiveBg: baseColors.red[600],
      destructiveBgDark: baseColors.red[500],
      destructiveHoverBg: baseColors.red[700],
      destructiveHoverBgDark: baseColors.red[400],
      destructiveActiveBg: baseColors.red[800],
      destructiveActiveBgDark: baseColors.red[300],
      destructiveText: baseColors.white,
      destructiveTextDark: baseColors.white,
      
      // Ghost button
      ghostBg: 'transparent',
      ghostBgDark: 'transparent',
      ghostHoverBg: baseColors.gray[100],
      ghostHoverBgDark: baseColors.gray[800],
      ghostActiveBg: baseColors.gray[200],
      ghostActiveBgDark: baseColors.gray[700],
      ghostText: baseColors.gray[900],
      ghostTextDark: baseColors.gray[100],
    },
    
    // Card component colors
    card: {
      bg: baseColors.white,
      bgDark: baseColors.gray[900],
      hoverBg: baseColors.gray[50],
      hoverBgDark: baseColors.gray[800],
      text: baseColors.gray[900],
      textDark: baseColors.gray[50],
      border: baseColors.gray[200],
      borderDark: baseColors.gray[800],
    },
    
    // Alert component colors
    alert: {
      infoBg: baseColors.blue[50],
      infoBgDark: baseColors.blue[950],
      infoBorder: baseColors.blue[200],
      infoBorderDark: baseColors.blue[800],
      infoText: baseColors.blue[900],
      infoTextDark: baseColors.blue[200],
      
      successBg: baseColors.green[50],
      successBgDark: baseColors.green[950],
      successBorder: baseColors.green[200],
      successBorderDark: baseColors.green[800],
      successText: baseColors.green[900],
      successTextDark: baseColors.green[200],
      
      warningBg: baseColors.amber[50],
      warningBgDark: baseColors.amber[950],
      warningBorder: baseColors.amber[200],
      warningBorderDark: baseColors.amber[800],
      warningText: baseColors.amber[900],
      warningTextDark: baseColors.amber[200],
      
      errorBg: baseColors.red[50],
      errorBgDark: baseColors.red[950],
      errorBorder: baseColors.red[200],
      errorBorderDark: baseColors.red[800],
      errorText: baseColors.red[900],
      errorTextDark: baseColors.red[200],
    },
    
    // Form component colors
    form: {
      inputBg: baseColors.white,
      inputBgDark: baseColors.gray[900],
      inputBorder: baseColors.gray[300],
      inputBorderDark: baseColors.gray[700],
      inputText: baseColors.gray[900],
      inputTextDark: baseColors.gray[100],
      inputPlaceholder: baseColors.gray[500],
      inputPlaceholderDark: baseColors.gray[500],
      inputFocusRing: baseColors.blue[200],
      inputFocusRingDark: baseColors.blue[800],
      inputDisabledBg: baseColors.gray[100],
      inputDisabledBgDark: baseColors.gray[800],
      inputDisabledText: baseColors.gray[500],
      inputDisabledTextDark: baseColors.gray[600],
      
      // Form validation states
      inputErrorBorder: baseColors.red[300],
      inputErrorBorderDark: baseColors.red[700],
      inputErrorRing: baseColors.red[200],
      inputErrorRingDark: baseColors.red[800],
      
      inputSuccessBorder: baseColors.green[300],
      inputSuccessBorderDark: baseColors.green[700],
      inputSuccessRing: baseColors.green[200],
      inputSuccessRingDark: baseColors.green[800],
    }
  }
};

/**
 * Creates a themed color palette by mapping base colors to a new primary color
 * @param primaryColor The primary color scale to use for the theme
 * @param secondaryColor Optional secondary color scale
 * @param accentColor Optional accent color scale
 * @returns A new semantic colors object with the updated color mappings
 */
export function createThemeColors(
  primaryColor: ColorScale = baseColors.blue,
  secondaryColor: ColorScale = baseColors.gray,
  accentColor: ColorScale = baseColors.amber
) {
  return {
    ...semanticColors,
    
    // Update content colors
    content: {
      ...semanticColors.content,
      brand: primaryColor[700],
      brandDark: primaryColor[400],
    },
    
    // Update border colors
    border: {
      ...semanticColors.border,
      focus: primaryColor[500],
      focusDark: primaryColor[500],
    },
    
    // Update interactive colors
    interactive: {
      ...semanticColors.interactive,
      default: primaryColor[600],
      defaultDark: primaryColor[500],
      hover: primaryColor[700],
      hoverDark: primaryColor[400],
      active: primaryColor[800],
      activeDark: primaryColor[300],
      subtle: primaryColor[50],
      subtleDark: primaryColor[950],
      // Use secondary color for secondary interactive elements
      secondary: secondaryColor[200],
      secondaryDark: secondaryColor[700],
      secondaryHover: secondaryColor[300],
      secondaryHoverDark: secondaryColor[600],
      secondaryActive: secondaryColor[400],
      secondaryActiveDark: secondaryColor[500],
    },
    
    // Update status colors
    status: {
      ...semanticColors.status,
      // Use accent color for warning states
      warning: accentColor[500],
      warningDark: accentColor[400],
      warningSubtle: accentColor[50],
      warningSubtleDark: accentColor[950],
      warningBorder: accentColor[300],
      warningBorderDark: accentColor[700],
      warningContent: accentColor[700],
      warningContentDark: accentColor[300],
    },
    
    // Update component colors
    components: {
      ...semanticColors.components,
      button: {
        ...semanticColors.components.button,
        primaryBg: primaryColor[600],
        primaryBgDark: primaryColor[500],
        primaryHoverBg: primaryColor[700],
        primaryHoverBgDark: primaryColor[400],
        primaryActiveBg: primaryColor[800],
        primaryActiveBgDark: primaryColor[300],
        // Use secondary color for secondary buttons
        secondaryBg: secondaryColor[200],
        secondaryBgDark: secondaryColor[700],
        secondaryHoverBg: secondaryColor[300],
        secondaryHoverBgDark: secondaryColor[600],
        secondaryActiveBg: secondaryColor[400],
        secondaryActiveBgDark: secondaryColor[500],
      },
      form: {
        ...semanticColors.components.form,
        inputFocusRing: primaryColor[200],
        inputFocusRingDark: primaryColor[800],
      },
      // Update alert component colors
      alert: {
        ...semanticColors.components.alert,
        // Use accent color for warning alerts
        warningBg: accentColor[50],
        warningBgDark: accentColor[950],
        warningBorder: accentColor[200],
        warningBorderDark: accentColor[800],
        warningText: accentColor[900],
        warningTextDark: accentColor[200],
      }
    }
  };
}

// Pre-defined theme color palettes
export const blueTheme = semanticColors;
export const tealTheme = createThemeColors(baseColors.teal);
export const purpleTheme = createThemeColors(baseColors.purple);
export const indigoTheme = createThemeColors(baseColors.indigo);
export const roseTheme = createThemeColors(baseColors.rose, baseColors.gray, baseColors.blue);

export default semanticColors;