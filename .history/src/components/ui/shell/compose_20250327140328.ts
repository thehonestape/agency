import { type BaseShellProps, type ContainerName } from './types';
import { cn } from '@/lib/utils';

type Density = 'compact' | 'comfortable' | 'spacious';
type LayoutType = 'stacked' | 'sidebar' | 'multi-column';

export function composeShellStyles(props: BaseShellProps) {
  const { theme, layout, density = 'comfortable', variants } = props;
  
  return {
    // Base styles
    base: {
      display: 'flex',
      flexDirection: layout?.type === 'stacked' ? 'column' : 'row',
      minHeight: '100vh',
      background: theme?.colors?.background?.default || 'bg-background',
    },
    
    // Layout-specific styles
    layout: {
      stacked: 'flex-col',
      sidebar: 'flex-row',
      'multi-column': 'flex-row',
    }[layout?.type || 'stacked'] as string,
    
    // Density adjustments
    density: {
      compact: 'gap-2',
      comfortable: 'gap-4',
      spacious: 'gap-6',
    }[density as Density],
    
    // Container styles
    container: {
      default: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
      narrow: 'max-w-3xl mx-auto px-4 sm:px-6 lg:px-8',
      wide: 'max-w-full mx-auto px-4 sm:px-6 lg:px-8',
    } as const,
    
    // Navigation styles
    navigation: {
      top: {
        container: cn(
          "w-full border-b",
          theme?.colors?.border ? `border-${theme.colors.border}` : "border-border"
        ),
        nav: cn(
          "flex items-center justify-between px-4",
          theme?.spacing?.container?.padding || "p-4"
        ),
      },
      side: {
        container: cn(
          "h-full border-r",
          theme?.colors?.border ? `border-${theme.colors.border}` : "border-border"
        ),
        nav: cn(
          "flex flex-col gap-2 p-4",
          theme?.spacing?.stack?.md
        ),
      },
      both: {
        top: {
          container: cn(
            "w-full border-b",
            theme?.colors?.border ? `border-${theme.colors.border}` : "border-border"
          ),
          nav: cn(
            "flex items-center justify-between px-4",
            theme?.spacing?.container?.padding || "p-4"
          ),
        },
        side: {
          container: cn(
            "h-full border-r",
            theme?.colors?.border ? `border-${theme.colors.border}` : "border-border"
          ),
          nav: cn(
            "flex flex-col gap-2 p-4",
            theme?.spacing?.stack?.md
          ),
        },
      },
    }[props.navigation?.type || 'top'],
    
    // Content area styles
    content: {
      header: cn(
        "w-full border-b",
        theme?.colors?.border ? `border-${theme.colors.border}` : "border-border"
      ),
      sidebar: cn(
        "h-full border-r",
        theme?.colors?.border ? `border-${theme.colors.border}` : "border-border"
      ),
      main: cn(
        "flex-1 overflow-auto",
        theme?.spacing?.container?.padding || "p-4"
      ),
      footer: cn(
        "w-full border-t",
        theme?.colors?.border ? `border-${theme.colors.border}` : "border-border"
      ),
    },

    // Responsive variants
    variants: {
      sm: variants?.sm,
      md: variants?.md,
      lg: variants?.lg,
      xl: variants?.xl,
    },
  };
}

export function composeStackedShellStyles(props: BaseShellProps) {
  const baseStyles = composeShellStyles(props);
  
  return {
    ...baseStyles,
    // Stacked-specific styles
    stacked: {
      container: "flex flex-col min-h-screen",
      header: cn(
        baseStyles.content.header,
        "bg-white shadow"
      ),
      main: cn(
        "flex-1 overflow-auto",
        baseStyles.content.main
      ),
      footer: baseStyles.content.footer,
    },
  };
}

export function composeSidebarShellStyles(props: BaseShellProps) {
  const baseStyles = composeShellStyles(props);
  
  return {
    ...baseStyles,
    // Sidebar-specific styles
    sidebar: {
      container: "flex min-h-screen",
      sidebar: cn(
        "w-64 flex-shrink-0",
        baseStyles.content.sidebar
      ),
      content: "flex-1 flex flex-col",
      header: baseStyles.content.header,
      main: cn(
        "flex-1 overflow-auto",
        baseStyles.content.main
      ),
      footer: baseStyles.content.footer,
    },
  };
}

export function composeMultiColumnShellStyles(props: BaseShellProps) {
  const baseStyles = composeShellStyles(props);
  
  return {
    ...baseStyles,
    // Multi-column-specific styles
    multiColumn: {
      container: "flex min-h-screen",
      left: cn(
        "w-64 flex-shrink-0",
        baseStyles.content.sidebar
      ),
      main: cn(
        "flex-1 overflow-auto",
        baseStyles.content.main
      ),
      right: cn(
        "w-64 flex-shrink-0",
        baseStyles.content.sidebar
      ),
    },
  };
} 