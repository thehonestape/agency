/**
 * Recipe system exports
 * This file provides a convenient way to import all component recipes.
 */

export { default as buttonRecipe, type ButtonRecipe } from './button.recipe';
export { default as cardRecipe, type CardRecipe } from './card.recipe';

// Re-export everything for convenience
export * from './button.recipe';
export * from './card.recipe'; 