/**
 * Button component recipe
 * Defines the base styles, variants, and default variants for the Button component.
 */

export interface ButtonRecipe {
  base: string;
  variants: {
    variant: Record<string, string>;
    size: Record<string, string>;
    fullWidth: Record<string, string>;
    elevation: Record<string, string>;
  };
  defaultVariants: {
    variant: string;
    size: string;
    fullWidth: boolean;
    elevation: string;
  };
  compoundVariants: Array<{
    variant: string[];
    className: string;
  }>;
}

export const buttonRecipe: ButtonRecipe = {
  base: [
    'inline-flex',
    'items-center',
    'justify-center',
    'whitespace-nowrap',
    'rounded-md',
    'text-sm',
    'font-medium',
    'transition-all',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-ring',
    'focus-visible:ring-offset-2',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
    'select-none',
    'touch-manipulation',
    'relative',
    'overflow-hidden',
    'border',
    'border-transparent',
  ].join(' '),
  
  variants: {
    variant: {
      default: [
        'bg-[hsl(var(--component-button-background-primary))]',
        'text-[hsl(var(--component-button-text-primary))]',
        'hover:bg-[hsl(var(--component-button-background-primary)/0.9)]',
        'active:scale-[0.98]',
        'active:bg-[hsl(var(--component-button-background-primary)/0.95)]',
      ].join(' '),
      
      secondary: [
        'bg-[hsl(var(--component-button-background-secondary))]',
        'text-[hsl(var(--component-button-text-secondary))]',
        'hover:bg-[hsl(var(--component-button-background-secondary)/0.8)]',
        'active:scale-[0.98]',
        'active:bg-[hsl(var(--component-button-background-secondary)/0.9)]',
      ].join(' '),
      
      destructive: [
        'bg-[hsl(var(--status-error))]',
        'text-white',
        'hover:bg-[hsl(var(--status-error)/0.9)]',
        'active:scale-[0.98]',
        'active:bg-[hsl(var(--status-error)/0.95)]',
      ].join(' '),
      
      outline: [
        'border',
        'border-[hsl(var(--border-base))]',
        'bg-transparent',
        'text-[hsl(var(--foreground-base))]',
        'hover:bg-[hsl(var(--background-subtle))]',
        'hover:text-[hsl(var(--foreground-base))]',
        'active:scale-[0.98]',
        'active:bg-[hsl(var(--background-subtle)/0.95)]',
      ].join(' '),
      
      ghost: [
        'bg-transparent',
        'text-[hsl(var(--foreground-base))]',
        'hover:bg-[hsl(var(--background-subtle))]',
        'hover:text-[hsl(var(--foreground-base))]',
        'active:scale-[0.98]',
        'active:bg-[hsl(var(--background-subtle)/0.95)]',
      ].join(' '),
      
      link: [
        'bg-transparent',
        'text-[hsl(var(--interactive-base))]',
        'underline-offset-4',
        'hover:underline',
        'active:text-[hsl(var(--interactive-base)/0.9)]',
      ].join(' '),
    },
    
    size: {
      default: 'h-10 px-4 py-2 min-w-[6rem]',
      sm: 'h-9 rounded-md px-3 text-xs min-w-[4.5rem]',
      lg: 'h-11 rounded-md px-8 text-base min-w-[8rem]',
      icon: 'h-10 w-10 min-w-0',
      mobile: 'h-12 px-5 py-3 min-w-[6rem] text-base', // Optimized for mobile touch targets
    },
    
    fullWidth: {
      true: 'w-full',
      false: '',
    },
    
    elevation: {
      flat: '',
      raised: 'shadow-sm',
      elevated: 'shadow-md',
    },
  },
  
  defaultVariants: {
    variant: 'default',
    size: 'default',
    fullWidth: false,
    elevation: 'flat',
  },
  
  compoundVariants: [
    {
      variant: ['default', 'destructive'],
      className: [
        'before:absolute',
        'before:inset-0',
        'before:bg-white',
        'before:opacity-0',
        'before:transition-opacity',
        'hover:before:opacity-5',
        'active:before:opacity-10',
        'focus-visible:before:opacity-10',
      ].join(' '),
    },
  ],
};

export default buttonRecipe; 