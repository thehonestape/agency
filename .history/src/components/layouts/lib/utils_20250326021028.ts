import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combine multiple class names with Tailwind CSS optimization
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * This file re-exports utilities from the main utils file
 * to fix import paths across the codebase.
 */
export * from '../../../lib/utils'; 