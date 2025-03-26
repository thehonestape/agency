/**
 * Typography Components Example
 * This shows how to create typography components using our Box component as a base
 */

import React from 'react';
import Box, { BoxProps } from './Box';
import { ResponsiveValue } from '../responsive';

// Text Component
export interface TextProps extends BoxProps {
  fontSize?: ResponsiveValue<string>;
  fontWeight?: ResponsiveValue<string | number>;
  letterSpacing?: ResponsiveValue<string>;
  lineHeight?: ResponsiveValue<string | number>;
  textAlign?: ResponsiveValue<string>;
  fontStyle?: ResponsiveValue<string>;
  textTransform?: ResponsiveValue<string>;
  textDecoration?: ResponsiveValue<string>;
  truncate?: boolean;
}

/**
 * Text component for paragraphs, spans, and other text elements
 * 
 * Example usage:
 * <Text 
 *   fontSize="md"
 *   color="gray.700"
 *   lineHeight="tall"
 *   textAlign={{ base: "center", md: "left" }}
 * >
 *   This is a text component with responsive alignment
 * </Text>
 */
export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ truncate, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        as="p"
        {...(truncate && {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        })}
        {...props}
      />
    );
  }
);

Text.displayName = 'Text';

// Heading Component
export interface HeadingProps extends TextProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

/**
 * Heading component for titles and subtitles
 * 
 * Example usage:
 * <Heading 
 *   as="h2"
 *   size="xl"
 *   color="primary"
 *   mb="md"
 * >
 *   Section Title
 * </Heading>
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as = 'h2', size = 'lg', ...props }, ref) => {
    // Map size to fontSize
    const sizeMap: Record<string, string> = {
      xs: 'xs',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'xl',
      '2xl': '2xl',
      '3xl': '3xl',
      '4xl': '4xl',
    };

    return (
      <Text
        ref={ref}
        as={as}
        fontSize={sizeMap[size]}
        fontWeight="bold"
        lineHeight="shorter"
        {...props}
      />
    );
  }
);

Heading.displayName = 'Heading';

// Link Component
export interface LinkProps extends TextProps {
  isExternal?: boolean;
  href?: string;
}

/**
 * Link component for hyperlinks
 * 
 * Example usage:
 * <Link 
 *   href="https://example.com"
 *   color="blue.500"
 *   isExternal
 * >
 *   External Link
 * </Link>
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ isExternal, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        as="a"
        color="primary"
        textDecoration="underline"
        _hover={{ textDecoration: 'none' }}
        {...(isExternal && {
          target: '_blank',
          rel: 'noopener noreferrer',
        })}
        {...props}
      />
    );
  }
);

Link.displayName = 'Link';

export default {
  Text,
  Heading,
  Link
}; 