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
    'px-4 py-2 inline-flex justify-center items-center rounded-md font-medium focus:outline-none transition-colors',
    {
      // Size variations
      'text-xs h-8': size === 'sm',
      'text-sm h-10': size === 'md',
      'text-base h-12': size === 'lg',
      
      // Variant + outline combinations
      'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary' && !isOutlined,
      'bg-gray-500 text-white hover:bg-gray-600': variant === 'secondary' && !isOutlined,
      'bg-red-500 text-white hover:bg-red-600': variant === 'danger' && !isOutlined,
      
      'border-2 border-blue-500 bg-transparent text-blue-500 hover:bg-blue-50': variant === 'primary' && isOutlined,
      'border-2 border-gray-500 bg-transparent text-gray-500 hover:bg-gray-50': variant === 'secondary' && isOutlined,
      'border-2 border-red-500 bg-transparent text-red-500 hover:bg-red-50': variant === 'danger' && isOutlined,
      
      // Disabled state
      'cursor-not-allowed opacity-60': isDisabled,
    }
  );

  return (
    <button 
      className={buttonClasses}
      disabled={isDisabled}
    >
      Button Demo
    </button>
  );
};

export default ButtonDemo; 