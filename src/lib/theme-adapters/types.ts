export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface ColorTokens {
  // Base colors with scales
  primary: ColorScale;
  secondary: ColorScale;
  accent: ColorScale;
  
  // UI colors
  background: {
    default: string;
    paper: string;
    inverse: string;
    subtle: string;
    muted: string;
  };
  
  // Text colors
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    inverse: string;
    link: string;
  };
  
  // State colors
  error: ColorScale;
  warning: ColorScale;
  success: ColorScale;
  info: ColorScale;
  
  // Border colors
  border: string;
}

export interface SpacingTokens {
  // Base spacing units
  px: {
    [key: string]: string;
  };
  
  // Component spacing
  container: {
    padding: string;
    margin: string;
  };
  
  // Layout spacing
  section: {
    padding: string;
    margin: string;
  };
  
  // Stack spacing
  stack: {
    [key: string]: string;
  };
  
  // Grid spacing
  grid: {
    [key: string]: string;
  };
}

export interface TypographyTokens {
  // Font families
  fontFamily: {
    sans: string[];
    serif: string[];
    mono: string[];
  };
  
  // Font sizes with line heights
  fontSize: {
    [key: string]: [string, { lineHeight: string }];
  };
  
  // Text styles
  textStyles: {
    [key: string]: {
      fontSize: string;
      lineHeight: string;
      fontWeight: string;
      letterSpacing: string;
    };
  };
}

export interface Theme {
  metadata: {
    id: string;
    name: string;
    description?: string;
  };
  
  tokens: {
    colors: ColorTokens;
    spacing: SpacingTokens;
    typography: TypographyTokens;
    borderRadius: {
      [key: string]: string;
    };
    shadows: {
      [key: string]: string;
    };
  };
} 