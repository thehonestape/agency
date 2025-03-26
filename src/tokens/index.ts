/**
 * Token system exports
 * This file provides a convenient way to import all tokens.
 */

// Base tokens
export { default as baseColors, type ColorToken } from './base/colors';

// Semantic tokens
export { default as semanticColors, type SemanticColorToken } from './semantic/colors';

// Re-export everything for convenience
export * from './base/colors';
export * from './semantic/colors'; 