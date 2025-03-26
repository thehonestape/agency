import React, { ButtonHTMLAttributes } from 'react';
import { BaseComponentProps } from '../../../lib/composition/types';
import { useTheme } from '../../../hooks/useTheme';
import { componentRegistry } from '../../../lib/discovery/ComponentRegistry';

export interface ButtonProps extends BaseComponentProps, ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Core Button component with support for different variants and sizes
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  ...rest
}) => {
  const { theme } = useTheme();
  
  // Map sizes to padding values
  const sizeMap = {
    sm: { px: theme.spacing.xs, py: theme.spacing.xxs, fontSize: '0.875rem' },
    md: { px: theme.spacing.md, py: theme.spacing.xs, fontSize: '1rem' },
    lg: { px: theme.spacing.lg, py: theme.spacing.sm, fontSize: '1.125rem' },
    xl: { px: theme.spacing.xl, py: theme.spacing.md, fontSize: '1.25rem' },
  };
  
  // Map variants to colors
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: theme.colors.primary,
          color: 'white',
          border: 'none',
          ':hover': {
            backgroundColor: theme.colors.primary,
            opacity: 0.9,
          },
        };
      case 'secondary':
        return {
          backgroundColor: theme.colors.secondary,
          color: 'white',
          border: 'none',
          ':hover': {
            backgroundColor: theme.colors.secondary,
            opacity: 0.9,
          },
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: theme.colors.primary,
          border: `1px solid ${theme.colors.primary}`,
          ':hover': {
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
          },
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: theme.colors.text,
          border: 'none',
          ':hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          },
        };
      case 'danger':
        return {
          backgroundColor: theme.colors.danger,
          color: 'white',
          border: 'none',
          ':hover': {
            backgroundColor: theme.colors.danger,
            opacity: 0.9,
          },
        };
      default:
        return {};
    }
  };
  
  // Get size styles
  const currentSize = sizeMap[size as keyof typeof sizeMap];
  
  // Combine styles
  const buttonStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md,
    fontWeight: 500,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s ease-in-out',
    ...getVariantStyles(),
    paddingLeft: currentSize.px,
    paddingRight: currentSize.px,
    paddingTop: currentSize.py,
    paddingBottom: currentSize.py,
    fontSize: currentSize.fontSize,
  };
  
  return (
    <button
      className={`button button-${variant} button-${size} ${className}`}
      style={buttonStyles}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

// Register this component with the registry
componentRegistry.register('core.button', {
  id: 'core.button',
  component: Button,
  descriptor: {
    type: 'primitive',
    name: 'Button',
    tag: 'button',
    props: {
      variant: 'primary',
      size: 'md',
    },
    children: 'Button',
  },
  metadata: {
    name: 'Button',
    description: 'Core button component with support for different variants and sizes',
    category: 'core.inputs',
    tags: ['button', 'input', 'control', 'interactive'],
    created: new Date().toISOString(),
    author: 'Component System',
    version: '1.0.0',
  },
});

export default Button; 