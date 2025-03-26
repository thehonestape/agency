/**
 * Card Component Example
 * This shows how to create a card component using our Box component as a base
 */

import React from 'react';
import Box, { BoxProps } from './Box';
import { cn } from '../../../lib/utils';

export interface CardProps extends BoxProps {
  variant?: 'elevated' | 'outline' | 'filled' | 'unstyled';
}

interface CardHeaderProps extends BoxProps {}
interface CardBodyProps extends BoxProps {}
interface CardFooterProps extends BoxProps {}

/**
 * Card component provides a flexible container with variants
 * 
 * Example usage:
 * <Card variant="elevated">
 *   <CardHeader>
 *     <Heading size="md">Card Title</Heading>
 *   </CardHeader>
 *   <CardBody>
 *     <Text>Card content and description here</Text>
 *   </CardBody>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'elevated', className, children, ...props }, ref) => {
    // Define variant styles
    const variantStyles = {
      elevated: {
        bg: 'white',
        boxShadow: 'md',
        borderRadius: 'md',
      },
      outline: {
        bg: 'white',
        border: '1px solid',
        borderColor: 'gray.200',
        borderRadius: 'md',
      },
      filled: {
        bg: 'gray.100',
        borderRadius: 'md',
      },
      unstyled: {
        bg: 'transparent',
      },
    };

    return (
      <Box
        ref={ref}
        className={cn('card', className)}
        {...variantStyles[variant as keyof typeof variantStyles]}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

Card.displayName = 'Card';

/**
 * CardHeader component for the card heading area
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn('card-header', className)}
        p="md"
        pt="lg"
        fontWeight="semibold"
        {...props}
      >
        {children}
      </Box>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * CardBody component for the main content area
 */
export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn('card-body', className)}
        p="md"
        {...props}
      >
        {children}
      </Box>
    );
  }
);

CardBody.displayName = 'CardBody';

/**
 * CardFooter component for the card footer area
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn('card-footer', className)}
        p="md"
        pt="sm"
        {...props}
      >
        {children}
      </Box>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export default {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
}; 