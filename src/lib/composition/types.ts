import { ReactNode } from 'react';

// Base props available to all components
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  variant?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  [key: string]: any;
}

// Layout properties
export interface LayoutProps {
  display?: 'block' | 'inline' | 'flex' | 'grid' | 'none';
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  gap?: string | number;
  padding?: string | number;
  margin?: string | number;
  width?: string | number;
  height?: string | number;
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  [key: string]: any;
}

// Style properties
export interface StyleProps {
  bg?: string;
  color?: string;
  border?: string;
  borderColor?: string;
  borderRadius?: string | number;
  shadow?: string;
  opacity?: number;
  [key: string]: any;
}

// Behavior properties
export interface BehaviorProps {
  onClick?: () => void;
  onHover?: () => void;
  onFocus?: () => void;
  animate?: string;
  transition?: string;
  interactive?: boolean;
  [key: string]: any;
}

// Component descriptor used for AI generation and composition
export interface ComponentDescriptor {
  type: 'primitive' | 'block' | 'pattern' | 'page';
  name: string;
  tag?: keyof JSX.IntrinsicElements;
  layout?: LayoutProps;
  props?: Record<string, any>;
  style?: StyleProps;
  behavior?: BehaviorProps;
  children?: ComponentDescriptor[] | string;
  metadata?: {
    description?: string;
    author?: string;
    created?: string;
    category?: string;
    tags?: string[];
  };
}

// Layout descriptor for composition
export interface LayoutDescriptor {
  type: 'grid' | 'flex' | 'stack';
  columns?: number;
  rows?: number;
  gap?: string | number;
  areas?: string[];
  template?: string;
  flow?: 'row' | 'column';
  [key: string]: any;
}

// Component definition for registry
export interface ComponentDefinition {
  id: string;
  component: React.ComponentType<any>;
  descriptor: ComponentDescriptor;
  metadata: {
    name: string;
    description?: string;
    category: string;
    tags?: string[];
    created: string;
    author?: string;
    version?: string;
  };
} 