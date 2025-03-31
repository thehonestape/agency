import { type ColorTokens, type SpacingTokens, type TypographyTokens } from '@/lib/theme-adapters/types';

export type ContainerName = 'default' | 'narrow' | 'wide';

export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
  active?: boolean;
}

export interface BaseShellProps {
  // Theme tokens
  theme?: {
    colors?: ColorTokens;
    spacing?: SpacingTokens;
    typography?: TypographyTokens;
  };
  
  // Layout configuration
  layout?: {
    type: 'stacked' | 'sidebar' | 'multi-column';
    container?: {
      name?: ContainerName;
      query?: string;
    };
  };
  
  // Density control
  density?: 'compact' | 'comfortable' | 'spacious';
  
  // Navigation configuration
  navigation?: {
    type: 'top' | 'side' | 'both';
    items: NavigationItem[];
    activeItem?: string;
  };
  
  // Content areas
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  main?: React.ReactNode;
  footer?: React.ReactNode;

  // Common className prop
  className?: string;

  // Variants for responsive design
  variants?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
}

// Stacked layout props
export interface StackedShellProps extends BaseShellProps {
  layout: {
    type: 'stacked';
  } & BaseShellProps['layout'];
  
  // Page header props
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

// Sidebar layout props
export interface SidebarShellProps extends BaseShellProps {
  layout: {
    type: 'sidebar';
    sidebarWidth?: string;
  } & BaseShellProps['layout'];

  // Page header props
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

// Multi-column layout props
export interface MultiColumnShellProps extends BaseShellProps {
  layout: {
    type: 'multi-column';
    columns: {
      left?: { width?: string };
      main: { width?: string };
      right?: { width?: string };
    };
  } & BaseShellProps['layout'];

  // Page header props
  title?: string;
  description?: string;
  children?: React.ReactNode;
} 