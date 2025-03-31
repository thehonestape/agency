import React from 'react';
import clsx from 'clsx';

interface ButtonDemoProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isOutlined?: boolean;
  isDisabled?: boolean;
}

export const ButtonDemo: React.FC<ButtonDemoProps> = ({
  variant = 'primary',
  size = 'md',
  isOutlined = false,
  isDisabled = false,
}) => {
  const buttonClasses = clsx(
    'inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors focus:outline-none',
    {
      // Size variations
      'h-8 text-xs': size === 'sm',
      'h-10 text-sm': size === 'md',
      'h-12 text-base': size === 'lg',

      // Variant + outline combinations
      'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary' && !isOutlined,
      'bg-secondary text-secondary-foreground hover:bg-secondary/90': variant === 'secondary' && !isOutlined,
      'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'danger' && !isOutlined,

      'border-2 border-primary bg-transparent text-primary hover:bg-primary/10':
        variant === 'primary' && isOutlined,
      'border-2 border-secondary bg-transparent text-secondary-foreground hover:bg-secondary/10':
        variant === 'secondary' && isOutlined,
      'border-2 border-destructive bg-transparent text-destructive hover:bg-destructive/10':
        variant === 'danger' && isOutlined,

      // Disabled state
      'cursor-not-allowed opacity-60': isDisabled,
    }
  );

  return (
    <button className={buttonClasses} disabled={isDisabled}>
      Button Demo
    </button>
  );
};

export default ButtonDemo;
