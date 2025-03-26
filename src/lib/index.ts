/**
 * Library exports index
 * 
 * This file exports all utilities and configurations from the lib directory
 * to make imports easier across the codebase.
 */

// Export supabase client and utilities
export * from './supabase';

// Export AI configuration
export { default as aiConfig } from './aiConfig';
export * from './aiConfig';

// Export theme provider
export * from './ThemeProvider';

// Export general utilities
export * from './utils'; 