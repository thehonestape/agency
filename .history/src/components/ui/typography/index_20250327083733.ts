/**
 * Typography component exports
 */

export { Text } from './Text';
export type { TextProps } from './Text';
export { Heading } from './Heading';
export type { HeadingProps } from './Heading';

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