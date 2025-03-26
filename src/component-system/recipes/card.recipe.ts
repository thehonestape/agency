/**
 * Card component recipe
 * Defines the base styles, variants, and default variants for the Card component.
 */

export interface CardRecipe {
  base: string;
  variants: {
    variant: Record<string, string>;
    density: Record<string, string>;
    interactive: Record<string, string>;
  };
  defaultVariants: {
    variant: string;
    density: string;
    interactive: boolean;
  };
  header: {
    base: string;
    variants: {
      density: Record<string, string>;
    };
    defaultVariants: {
      density: string;
    };
  };
  title: {
    base: string;
    variants: {
      size: Record<string, string>;
    };
    defaultVariants: {
      size: string;
    };
  };
  description: {
    base: string;
    variants: {
      size: Record<string, string>;
    };
    defaultVariants: {
      size: string;
    };
  };
  content: {
    base: string;
    variants: {
      density: Record<string, string>;
    };
    defaultVariants: {
      density: string;
    };
  };
  footer: {
    base: string;
    variants: {
      density: Record<string, string>;
      align: Record<string, string>;
    };
    defaultVariants: {
      density: string;
      align: string;
    };
  };
}

export const cardRecipe: CardRecipe = {
  base: [
    'rounded-lg',
    'border',
    'bg-[hsl(var(--component-card-background))]',
    'text-[hsl(var(--foreground-base))]',
    'transition-all',
    'duration-200',
  ].join(' '),
  
  variants: {
    variant: {
      default: 'shadow-sm hover:shadow-md',
      flat: 'border-none shadow-none',
      outlined: 'shadow-none',
      elevated: 'shadow-md hover:shadow-lg',
    },
    
    density: {
      default: '',
      compact: '',
      comfortable: '',
    },
    
    interactive: {
      true: 'cursor-pointer hover:translate-y-[-2px] active:translate-y-[0px]',
      false: '',
    },
  },
  
  defaultVariants: {
    variant: 'default',
    density: 'default',
    interactive: false,
  },
  
  header: {
    base: 'flex flex-col space-y-1.5',
    variants: {
      density: {
        default: 'p-6',
        compact: 'p-3',
        comfortable: 'p-8',
      },
    },
    defaultVariants: {
      density: 'default',
    },
  },
  
  title: {
    base: [
      'text-2xl',
      'font-semibold',
      'leading-none',
      'tracking-tight',
      'text-[hsl(var(--foreground-base))]',
    ].join(' '),
    variants: {
      size: {
        default: 'text-2xl',
        sm: 'text-xl',
        lg: 'text-3xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
  
  description: {
    base: 'text-[hsl(var(--foreground-muted))]',
    variants: {
      size: {
        default: 'text-sm',
        sm: 'text-xs',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
  
  content: {
    base: '',
    variants: {
      density: {
        default: 'p-6 pt-0',
        compact: 'p-3 pt-0',
        comfortable: 'p-8 pt-0',
      },
    },
    defaultVariants: {
      density: 'default',
    },
  },
  
  footer: {
    base: 'flex items-center',
    variants: {
      density: {
        default: 'p-6 pt-0',
        compact: 'p-3 pt-0',
        comfortable: 'p-8 pt-0',
      },
      align: {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
        between: 'justify-between',
      },
    },
    defaultVariants: {
      density: 'default',
      align: 'left',
    },
  },
};

export default cardRecipe; 