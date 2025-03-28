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
      'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary' && !isOutlined,
      'bg-gray-500 text-white hover:bg-gray-600': variant === 'secondary' && !isOutlined,
      'bg-red-500 text-white hover:bg-red-600': variant === 'danger' && !isOutlined,

      'border-2 border-blue-500 bg-transparent text-blue-500 hover:bg-blue-50':
        variant === 'primary' && isOutlined,
      'border-2 border-gray-500 bg-transparent text-gray-500 hover:bg-gray-50':
        variant === 'secondary' && isOutlined,
      'border-2 border-red-500 bg-transparent text-red-500 hover:bg-red-50':
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
