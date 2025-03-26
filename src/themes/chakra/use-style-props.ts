/**
 * Style Props Hook
 * A React hook that applies style props to components, similar to Chakra UI
 */

import { useMemo } from 'react';
import { styleProps } from './theme-extension';
import { createResponsiveStyles, ResponsiveValue, defaultBreakpoints } from './responsive';
import { Theme } from '../types';
import { useTheme } from '../providers/ThemeProvider';

export type StylePropsConfig = typeof styleProps;
export type StyleProp = keyof StylePropsConfig;

/**
 * Maps React props to CSS properties based on theme tokens
 */
export interface StylePropsValues {
  // Space props
  m?: ResponsiveValue<string | number>;
  margin?: ResponsiveValue<string | number>;
  mt?: ResponsiveValue<string | number>;
  marginTop?: ResponsiveValue<string | number>;
  mr?: ResponsiveValue<string | number>;
  marginRight?: ResponsiveValue<string | number>;
  mb?: ResponsiveValue<string | number>;
  marginBottom?: ResponsiveValue<string | number>;
  ml?: ResponsiveValue<string | number>;
  marginLeft?: ResponsiveValue<string | number>;
  mx?: ResponsiveValue<string | number>;
  marginX?: ResponsiveValue<string | number>;
  my?: ResponsiveValue<string | number>;
  marginY?: ResponsiveValue<string | number>;
  p?: ResponsiveValue<string | number>;
  padding?: ResponsiveValue<string | number>;
  pt?: ResponsiveValue<string | number>;
  paddingTop?: ResponsiveValue<string | number>;
  pr?: ResponsiveValue<string | number>;
  paddingRight?: ResponsiveValue<string | number>;
  pb?: ResponsiveValue<string | number>;
  paddingBottom?: ResponsiveValue<string | number>;
  pl?: ResponsiveValue<string | number>;
  paddingLeft?: ResponsiveValue<string | number>;
  px?: ResponsiveValue<string | number>;
  paddingX?: ResponsiveValue<string | number>;
  py?: ResponsiveValue<string | number>;
  paddingY?: ResponsiveValue<string | number>;

  // Color props
  color?: ResponsiveValue<string>;
  bg?: ResponsiveValue<string>;
  backgroundColor?: ResponsiveValue<string>;
  borderColor?: ResponsiveValue<string>;

  // Typography props
  fontSize?: ResponsiveValue<string | number>;
  fontWeight?: ResponsiveValue<string | number>;
  lineHeight?: ResponsiveValue<string | number>;
  letterSpacing?: ResponsiveValue<string | number>;
  textAlign?: ResponsiveValue<string>;
  fontStyle?: ResponsiveValue<string>;

  // Layout props
  width?: ResponsiveValue<string | number>;
  w?: ResponsiveValue<string | number>;
  height?: ResponsiveValue<string | number>;
  h?: ResponsiveValue<string | number>;
  minWidth?: ResponsiveValue<string | number>;
  minW?: ResponsiveValue<string | number>;
  maxWidth?: ResponsiveValue<string | number>;
  maxW?: ResponsiveValue<string | number>;
  minHeight?: ResponsiveValue<string | number>;
  minH?: ResponsiveValue<string | number>;
  maxHeight?: ResponsiveValue<string | number>;
  maxH?: ResponsiveValue<string | number>;

  // Flexbox props
  alignItems?: ResponsiveValue<string>;
  alignContent?: ResponsiveValue<string>;
  justifyItems?: ResponsiveValue<string>;
  justifyContent?: ResponsiveValue<string>;
  flexWrap?: ResponsiveValue<string>;
  flexDirection?: ResponsiveValue<string>;
  flex?: ResponsiveValue<string | number>;
  flexGrow?: ResponsiveValue<string | number>;
  flexShrink?: ResponsiveValue<string | number>;
  flexBasis?: ResponsiveValue<string | number>;
  justifySelf?: ResponsiveValue<string>;
  alignSelf?: ResponsiveValue<string>;
  order?: ResponsiveValue<string | number>;

  // Border props
  border?: ResponsiveValue<string>;
  borderWidth?: ResponsiveValue<string | number>;
  borderStyle?: ResponsiveValue<string>;
  borderRadius?: ResponsiveValue<string | number>;
  borderTop?: ResponsiveValue<string>;
  borderRight?: ResponsiveValue<string>;
  borderBottom?: ResponsiveValue<string>;
  borderLeft?: ResponsiveValue<string>;

  // Position props
  position?: ResponsiveValue<string>;
  zIndex?: ResponsiveValue<string | number>;
  top?: ResponsiveValue<string | number>;
  right?: ResponsiveValue<string | number>;
  bottom?: ResponsiveValue<string | number>;
  left?: ResponsiveValue<string | number>;

  // Shadow props
  boxShadow?: ResponsiveValue<string>;
  textShadow?: ResponsiveValue<string>;

  [key: string]: any;
}

// Aliases for common style props
const stylePropsAliases: Record<string, string> = {
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mx: 'marginX',
  my: 'marginY',
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  px: 'paddingX',
  py: 'paddingY',
  w: 'width',
  h: 'height',
  minW: 'minWidth',
  maxW: 'maxWidth',
  minH: 'minHeight',
  maxH: 'maxHeight',
  bg: 'backgroundColor',
};

/**
 * Gets a value from the theme based on a scale and key
 */
export function getThemeValue(theme: Theme, scale: string, key: string | number): string | undefined {
  if (typeof key === 'string' && key.includes('.')) {
    // Handle dot notation like "colors.primary.500"
    const parts = key.split('.');
    let value: any = theme;
    
    // Navigate through the object following the path
    for (const part of parts) {
      if (!value[part]) return undefined;
      value = value[part];
    }
    
    return typeof value === 'string' ? value : undefined;
  }

  // Handle direct lookups on theme scales
  switch (scale) {
    case 'colors':
      return theme.colors[key as string];
    case 'space':
      return theme.spacing[key as string];
    case 'radii':
      return theme.radius[key as string];
    case 'shadows':
      return theme.shadows[key as string];
    // Add more scales as needed
    default:
      return undefined;
  }
}

/**
 * Custom hook to convert style props to a CSS styles object
 */
export function useStyleProps(props: StylePropsValues) {
  const { theme } = useTheme();
  
  return useMemo(() => {
    const { styleProps: filteredProps, otherProps } = extractStyleProps(props);
    const styles = stylesFromProps(styleProps, filteredProps, theme);
    
    return {
      styles,
      otherProps,
    };
  }, [props, theme]);
}

/**
 * Extracts style props from a props object
 */
function extractStyleProps(props: Record<string, any>) {
  const styleProps: Record<string, any> = {};
  const otherProps: Record<string, any> = {};
  
  for (const key in props) {
    // Check if prop is a style prop or an alias
    const styleProp = key in stylePropsAliases ? stylePropsAliases[key] : key;
    
    if (styleProp in styleProps) {
      styleProps[styleProp] = props[key];
    } else {
      otherProps[key] = props[key];
    }
  }
  
  return { styleProps, otherProps };
}

/**
 * Converts style props to a CSS styles object
 */
function stylesFromProps(
  propsConfig: StylePropsConfig,
  props: Record<string, any>,
  theme: Theme
): React.CSSProperties {
  const styles: Record<string, any> = {};
  
  for (const key in props) {
    const value = props[key];
    if (value === undefined || value === null) continue;
    
    // Get the config for this prop
    const config = propsConfig[key as StyleProp];
    if (!config) continue;
    
    // Handle responsive values
    if (typeof value === 'object' || Array.isArray(value)) {
      const cssValue = createResponsiveStyles(
        value,
        (val) => {
          // If a scale is specified, look up the value in the theme
          if (config.scale && typeof val === 'string' || typeof val === 'number') {
            const themeValue = getThemeValue(theme, config.scale, val);
            if (themeValue) return themeValue;
          }
          
          return String(val);
        },
        defaultBreakpoints // You could get these from theme
      );
      
      // Handle properties that map to multiple CSS properties (like mx -> marginLeft, marginRight)
      if (Array.isArray(config.properties)) {
        config.properties.forEach(prop => {
          styles[prop] = cssValue;
        });
      } else {
        styles[config.property] = cssValue;
      }
    }
    // Handle simple values
    else {
      const cssValue = config.scale
        ? getThemeValue(theme, config.scale, value) || value
        : value;
      
      // Handle properties that map to multiple CSS properties
      if (Array.isArray(config.properties)) {
        config.properties.forEach(prop => {
          styles[prop] = cssValue;
        });
      } else {
        styles[config.property] = cssValue;
      }
    }
  }
  
  return styles as React.CSSProperties;
}

export default useStyleProps; 