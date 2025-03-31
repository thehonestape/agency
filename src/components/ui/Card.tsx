import * as React from 'react';
import { cn } from '../../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground transition-all duration-200',
  {
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
    compoundVariants: [
      {
        density: 'compact',
        className: 'p-0',
      },
      {
        density: 'comfortable',
        className: 'p-2',
      },
    ],
  }
);

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  interactive?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, density, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, density, interactive, className }))}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const headerVariants = cva('flex flex-col space-y-1.5', {
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
});

interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof headerVariants> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, density, ...props }, ref) => (
    <div ref={ref} className={cn(headerVariants({ density, className }))} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const titleVariants = cva(
  'text-2xl font-semibold leading-none tracking-tight text-card-foreground',
  {
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
  }
);

interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof titleVariants> {}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, size, ...props }, ref) => (
    <h3 ref={ref} className={cn(titleVariants({ size, className }))} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

const descriptionVariants = cva('text-muted-foreground', {
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
});

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof descriptionVariants> {}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, size, ...props }, ref) => (
    <p ref={ref} className={cn(descriptionVariants({ size, className }))} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

const contentVariants = cva('', {
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
});

interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contentVariants> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, density, ...props }, ref) => (
    <div ref={ref} className={cn(contentVariants({ density, className }))} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const footerVariants = cva('flex items-center', {
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
});

interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof footerVariants> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, density, align, ...props }, ref) => (
    <div ref={ref} className={cn(footerVariants({ density, align, className }))} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
  headerVariants,
  titleVariants,
  descriptionVariants,
  contentVariants,
  footerVariants,
};
