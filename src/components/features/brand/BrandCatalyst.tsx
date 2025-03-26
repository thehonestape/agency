import React from 'react';
import { useBrand, BrandColor } from './BrandProvider';
import * as Catalyst from '../catalyst';

// Helper to find color by property
function findColorByProperty(colors: BrandColor[], property: string): string | undefined {
  const color = colors.find(c => {
    switch (property) {
      case 'primary': return c.isPrimary;
      case 'secondary': return c.isSecondary;
      case 'accent': return c.isAccent;
      default: return c.name === property;
    }
  });
  
  return color?.value;
}

// Helper to map color values to Catalyst color keys
function mapColorToCatalyst(colorValue: string | undefined): keyof typeof Catalyst.Button extends React.ForwardRefExoticComponent<infer P> ? P extends { color?: infer C } ? C : never : never {
  // This is a simplified mapping - in a real application, you'd want to analyze the color
  // and map it to the closest Catalyst color based on hue, saturation, etc.
  
  // For now, we'll just return a default value
  return 'blue' as any;
}

// BrandCatalyst adapts Catalyst UI components to use the current brand's styling
export const BrandCatalyst = {
  // Layout components
  SidebarLayout: Catalyst.SidebarLayout,
  StackedLayout: Catalyst.StackedLayout,
  Sidebar: Catalyst.Sidebar,
  Navbar: Catalyst.Navbar,
  Divider: Catalyst.Divider,
  
  // Button with brand-aware styling
  Button: React.forwardRef(({ variant = 'primary', outline, plain, ...props }: { variant?: string, outline?: boolean, plain?: boolean } & Omit<React.ComponentPropsWithoutRef<typeof Catalyst.Button>, 'color'>, ref) => {
    const { currentBrand } = useBrand();
    
    // Map brand colors to Catalyst colors
    const getColorClass = (): 'blue' | 'green' | 'red' | 'amber' | 'indigo' | 'purple' | 'pink' => {
      if (!currentBrand) return 'blue'; // Default fallback
      
      // Get the color value based on the variant
      const colorValue = findColorByProperty(currentBrand.colors, variant);
      
      // Map color to a Catalyst compatible value
      return mapColorToCatalyst(colorValue);
    };
    
    return <Catalyst.Button ref={ref} color={getColorClass()} outline={outline} plain={plain} {...props} />;
  }),
  
  // Input with brand styling
  Input: (props: React.ComponentPropsWithoutRef<typeof Catalyst.Input>) => {
    return <Catalyst.Input {...props} />;
  },
  
  // Text area with brand styling
  Textarea: (props: React.ComponentPropsWithoutRef<typeof Catalyst.Textarea>) => {
    return <Catalyst.Textarea {...props} />;
  },
  
  // Checkbox with brand styling
  Checkbox: (props: React.ComponentPropsWithoutRef<typeof Catalyst.Checkbox>) => {
    return <Catalyst.Checkbox {...props} />;
  },
  
  // Radio with brand styling
  Radio: (props: React.ComponentPropsWithoutRef<typeof Catalyst.Radio>) => {
    return <Catalyst.Radio {...props} />;
  },
  
  // Select with brand styling
  Select: (props: React.ComponentPropsWithoutRef<typeof Catalyst.Select>) => {
    return <Catalyst.Select {...props} />;
  },
  
  // Switch with brand styling
  Switch: (props: React.ComponentPropsWithoutRef<typeof Catalyst.Switch>) => {
    return <Catalyst.Switch {...props} />;
  },
  
  // Avatar with brand styling
  Avatar: (props: React.ComponentPropsWithoutRef<typeof Catalyst.Avatar>) => {
    return <Catalyst.Avatar {...props} />;
  },
  
  // Badge with brand styling
  Badge: (props: React.ComponentPropsWithoutRef<typeof Catalyst.Badge>) => {
    return <Catalyst.Badge {...props} />;
  },
  
  // Table with brand styling
  Table: Catalyst.Table,
  
  // Alert with brand styling
  Alert: (props: React.ComponentPropsWithoutRef<typeof Catalyst.Alert>) => {
    const { variant = 'info', ...otherProps } = props;
    const { currentBrand } = useBrand();
    
    // Map brand colors to alert variants
    const getVariantClass = () => {
      if (!currentBrand) return variant;
      
      switch (variant) {
        case 'info':
          return 'blue';
        case 'success':
          return 'green';
        case 'warning':
          return 'yellow';
        case 'error':
          return 'red';
        default:
          return variant;
      }
    };
    
    return <Catalyst.Alert variant={getVariantClass()} {...otherProps} />;
  },
  
  // Dialog with brand styling
  Dialog: Catalyst.Dialog
};

// Export individual components for convenience
export const {
  SidebarLayout,
  StackedLayout,
  Sidebar,
  Navbar,
  Divider,
  Button,
  Input,
  Textarea,
  Checkbox,
  Radio,
  Select,
  Switch,
  Avatar,
  Badge,
  Table,
  Alert,
  Dialog
} = BrandCatalyst; 