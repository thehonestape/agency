/**
 * Typography component exports
 */

import { Text } from './text';
import type { TextProps } from './text';
import { Heading } from './heading';
import type { HeadingProps } from './heading';

export { Text, Heading };
export type { TextProps, HeadingProps };

// Semantic typography composition
export const Typography = {
  Text,
  Heading,
};

export { default as Code } from './code';
export { default as Kbd } from './kbd';

export * from './text';
export * from './heading';
export * from './code';
export * from './kbd'; 