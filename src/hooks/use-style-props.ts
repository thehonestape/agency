import { useMemo } from 'react';

// Types for style props
interface StyleProps {
  w?: string | number | object;
  h?: string | number | object;
  minW?: string | number | object;
  minH?: string | number | object;
  maxW?: string | number | object;
  maxH?: string | number | object;
  p?: string | number | object;
  px?: string | number | object;
  py?: string | number | object;
  pt?: string | number | object;
  pr?: string | number | object;
  pb?: string | number | object;
  pl?: string | number | object;
  m?: string | number | object;
  mx?: string | number | object;
  my?: string | number | object;
  mt?: string | number | object;
  mr?: string | number | object;
  mb?: string | number | object;
  ml?: string | number | object;
  bg?: string;
  color?: string;
  opacity?: string | number;
  borderRadius?: string | number | object;
  rounded?: string | number | object;
  shadow?: string;
  position?: string;
  display?: string;
  flex?: string | number | boolean;
  flexDirection?: string;
  flexWrap?: string;
  alignItems?: string;
  justifyContent?: string;
  gap?: string | number;
  overflow?: string;
  textAlign?: string;
  fontWeight?: string | number;
  fontSize?: string | number;
  lineHeight?: string | number;
  [key: string]: any;
}

// Type guard to check if a prop is a style prop
const isStyleProp = (prop: string): boolean => {
  return [
    'w', 'h', 'minW', 'minH', 'maxW', 'maxH',
    'p', 'px', 'py', 'pt', 'pr', 'pb', 'pl',
    'm', 'mx', 'my', 'mt', 'mr', 'mb', 'ml',
    'bg', 'color', 'opacity',
    'borderRadius', 'rounded', 'shadow',
    'position', 'display', 'flex', 'flexDirection',
    'flexWrap', 'alignItems', 'justifyContent', 'gap',
    'overflow', 'textAlign', 'fontWeight', 'fontSize', 'lineHeight'
  ].includes(prop);
};

// Convert a value to a Tailwind scale value
const toTwScale = (value: string | number | undefined): string | undefined => {
  if (value === undefined) return undefined;
  
  // If value is already a string that doesn't look like a plain number, return it
  if (typeof value === 'string' && !/^\d+$/.test(value)) return value;
  
  // Map numeric values to Tailwind spacing scale
  const numericValue = typeof value === 'number' ? value : parseInt(value as string, 10);
  
  // Map to Tailwind's spacing scale
  const spacingMap: Record<number, string> = {
    0: '0',
    0.5: '0.5',
    1: '1',
    1.5: '1.5',
    2: '2',
    2.5: '2.5',
    3: '3',
    3.5: '3.5',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: '10',
    11: '11',
    12: '12',
    14: '14',
    16: '16',
    20: '20',
    24: '24',
    28: '28',
    32: '32',
    36: '36',
    40: '40',
    44: '44',
    48: '48',
    52: '52',
    56: '56',
    60: '60',
    64: '64',
    72: '72',
    80: '80',
    96: '96',
  };
  
  return spacingMap[numericValue] || String(numericValue);
};

// Convert style props to Tailwind classes
const convertToTailwind = (props: StyleProps): string => {
  const classes: string[] = [];
  
  // Width and height
  if (props.w !== undefined) classes.push(`w-${toTwScale(props.w)}`);
  if (props.h !== undefined) classes.push(`h-${toTwScale(props.h)}`);
  if (props.minW !== undefined) classes.push(`min-w-${toTwScale(props.minW)}`);
  if (props.minH !== undefined) classes.push(`min-h-${toTwScale(props.minH)}`);
  if (props.maxW !== undefined) classes.push(`max-w-${toTwScale(props.maxW)}`);
  if (props.maxH !== undefined) classes.push(`max-h-${toTwScale(props.maxH)}`);
  
  // Padding
  if (props.p !== undefined) classes.push(`p-${toTwScale(props.p)}`);
  if (props.px !== undefined) classes.push(`px-${toTwScale(props.px)}`);
  if (props.py !== undefined) classes.push(`py-${toTwScale(props.py)}`);
  if (props.pt !== undefined) classes.push(`pt-${toTwScale(props.pt)}`);
  if (props.pr !== undefined) classes.push(`pr-${toTwScale(props.pr)}`);
  if (props.pb !== undefined) classes.push(`pb-${toTwScale(props.pb)}`);
  if (props.pl !== undefined) classes.push(`pl-${toTwScale(props.pl)}`);
  
  // Margin
  if (props.m !== undefined) classes.push(`m-${toTwScale(props.m)}`);
  if (props.mx !== undefined) classes.push(`mx-${toTwScale(props.mx)}`);
  if (props.my !== undefined) classes.push(`my-${toTwScale(props.my)}`);
  if (props.mt !== undefined) classes.push(`mt-${toTwScale(props.mt)}`);
  if (props.mr !== undefined) classes.push(`mr-${toTwScale(props.mr)}`);
  if (props.mb !== undefined) classes.push(`mb-${toTwScale(props.mb)}`);
  if (props.ml !== undefined) classes.push(`ml-${toTwScale(props.ml)}`);
  
  // Background and colors
  if (props.bg !== undefined) {
    // Support for theme colors and regular colors
    if (props.bg.startsWith('#') || props.bg.startsWith('rgb') || props.bg.startsWith('hsl')) {
      // For direct color values, use style attribute instead
      // This will be handled separately
    } else {
      classes.push(`bg-${props.bg}`);
    }
  }
  
  if (props.color !== undefined) {
    if (props.color.startsWith('#') || props.color.startsWith('rgb') || props.color.startsWith('hsl')) {
      // For direct color values, use style attribute
    } else {
      classes.push(`text-${props.color}`);
    }
  }
  
  // Opacity
  if (props.opacity !== undefined) classes.push(`opacity-${props.opacity}`);
  
  // Border radius
  if (props.borderRadius !== undefined) classes.push(`rounded-${toTwScale(props.borderRadius)}`);
  if (props.rounded !== undefined) classes.push(`rounded-${toTwScale(props.rounded)}`);
  
  // Shadow
  if (props.shadow !== undefined) classes.push(`shadow-${props.shadow}`);
  
  // Position
  if (props.position !== undefined) classes.push(props.position);
  
  // Display
  if (props.display !== undefined) classes.push(props.display);
  
  // Flex
  if (props.flex !== undefined) {
    if (props.flex === true) {
      classes.push('flex');
    } else if (typeof props.flex === 'string') {
      classes.push(`flex-${props.flex}`);
    } else if (typeof props.flex === 'number') {
      classes.push(`flex-${props.flex}`);
    }
  }
  
  if (props.flexDirection !== undefined) classes.push(`flex-${props.flexDirection}`);
  if (props.flexWrap !== undefined) classes.push(`flex-${props.flexWrap}`);
  if (props.alignItems !== undefined) classes.push(`items-${props.alignItems}`);
  if (props.justifyContent !== undefined) classes.push(`justify-${props.justifyContent}`);
  if (props.gap !== undefined) classes.push(`gap-${toTwScale(props.gap)}`);
  
  // Overflow
  if (props.overflow !== undefined) classes.push(`overflow-${props.overflow}`);
  
  // Typography
  if (props.textAlign !== undefined) classes.push(`text-${props.textAlign}`);
  if (props.fontWeight !== undefined) classes.push(`font-${props.fontWeight}`);
  if (props.fontSize !== undefined) classes.push(`text-${props.fontSize}`);
  if (props.lineHeight !== undefined) classes.push(`leading-${props.lineHeight}`);
  
  return classes.join(' ');
};

export function useStyleProps(props: any) {
  return useMemo(() => {
    const styleProps: StyleProps = {};
    const restProps: any = {};
    
    // Separate style props from other props
    Object.keys(props).forEach(key => {
      if (isStyleProp(key)) {
        styleProps[key] = props[key];
      } else {
        restProps[key] = props[key];
      }
    });
    
    const styleClasses = convertToTailwind(styleProps);
    
    // Extract direct style attributes for things Tailwind can't handle
    const inlineStyles: Record<string, string> = {};
    
    if (styleProps.bg && (styleProps.bg.startsWith('#') || styleProps.bg.startsWith('rgb') || styleProps.bg.startsWith('hsl'))) {
      inlineStyles.backgroundColor = styleProps.bg;
    }
    
    if (styleProps.color && (styleProps.color.startsWith('#') || styleProps.color.startsWith('rgb') || styleProps.color.startsWith('hsl'))) {
      inlineStyles.color = styleProps.color;
    }
    
    // Add inline styles to rest props if needed
    if (Object.keys(inlineStyles).length > 0) {
      restProps.style = { ...(restProps.style || {}), ...inlineStyles };
    }
    
    return { styleClasses, restProps };
  }, [props]);
} 