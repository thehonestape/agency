/**
 * Button Component Example
 * This shows how to create a button component using our Box component as a base
 */

import React from 'react';
import Box, { BoxProps } from './Box';
import { ResponsiveValue } from '../responsive';
import { cn } from '../../../lib/utils';

// Define ButtonProps separately from BoxProps to avoid conflicts
export interface ButtonProps {
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  colorScheme?: string;
  isFullWidth?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loadingText?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  // Box props we need to pass through
  className?: string;
  children?: React.ReactNode;
  [key: string]: any; // Allow other props to pass through
}

/**
 * Button component with various styles and states
 * 
 * Example usage:
 * <Button 
 *   variant="solid"
 *   colorScheme="primary"
 *   size="md"
 *   onClick={() => console.log('Button clicked')}
 * >
 *   Click Me
 * </Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'solid', 
    size = 'md', 
    colorScheme = 'primary',
    isFullWidth,
    isDisabled,
    isLoading,
    leftIcon,
    rightIcon,
    loadingText,
    children,
    className,
    type = 'button',
    ...props 
  }, ref) => {
    // Define size styles based on size prop
    const sizeStyles: Record<string, Record<string, string>> = {
      xs: { px: '2', py: '1', fontSize: 'xs' },
      sm: { px: '3', py: '1.5', fontSize: 'sm' },
      md: { px: '4', py: '2', fontSize: 'md' },
      lg: { px: '6', py: '3', fontSize: 'lg' },
    };

    // Define variant styles based on variant and colorScheme
    const variantStyles: Record<string, Record<string, any>> = {
      solid: {
        bg: colorScheme,
        color: 'white',
        _hover: { opacity: 0.9 },
        _active: { opacity: 0.8 },
      },
      outline: {
        bg: 'transparent',
        color: colorScheme,
        border: '1px solid',
        borderColor: colorScheme,
        _hover: { bg: `${colorScheme}Alpha.100` },
        _active: { bg: `${colorScheme}Alpha.200` },
      },
      ghost: {
        bg: 'transparent',
        color: colorScheme,
        _hover: { bg: `${colorScheme}Alpha.100` },
        _active: { bg: `${colorScheme}Alpha.200` },
      },
      link: {
        bg: 'transparent',
        color: colorScheme,
        padding: 0,
        height: 'auto',
        textDecoration: 'underline',
        _hover: { textDecoration: 'none' },
      },
    };

    // Content based on loading state
    const content = isLoading ? (
      <>
        <Box
          as="span"
          className="loading-spinner"
          mr={loadingText ? '2' : '0'}
          display="inline-block"
          width="1em"
          height="1em"
          borderRadius="full"
          borderWidth="2px"
          borderStyle="solid"
          borderColor="currentColor"
          borderLeftColor="transparent"
          animation="spin 0.45s linear infinite"
        />
        {loadingText || children}
      </>
    ) : (
      <>
        {leftIcon && <Box as="span" mr="2" display="inline-flex">{leftIcon}</Box>}
        {children}
        {rightIcon && <Box as="span" ml="2" display="inline-flex">{rightIcon}</Box>}
      </>
    );

    return (
      <Box
        ref={ref as any} // Use type assertion to handle the ref type difference
        as="button"
        type={type}
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="md"
        fontWeight="semibold"
        transition="all 0.2s"
        cursor={isDisabled || isLoading ? 'not-allowed' : 'pointer'}
        opacity={isDisabled ? 0.6 : 1}
        width={isFullWidth ? '100%' : 'auto'}
        disabled={isDisabled || isLoading}
        className={cn(className)}
        {...sizeStyles[size]}
        {...variantStyles[variant]}
        {...props}
      >
        {content}
      </Box>
    );
  }
);

Button.displayName = 'Button';

export default Button; 