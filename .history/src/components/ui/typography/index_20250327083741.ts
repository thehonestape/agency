/**
 * Typography component exports
 */

export { Text } from './text';
export type { TextProps } from './text';
export { Heading } from './heading';
export type { HeadingProps } from './heading';

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