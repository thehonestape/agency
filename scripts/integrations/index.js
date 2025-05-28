/**
 * Integrations Index
 * 
 * This file exports all available integrations and utility functions
 * to make them easy to use throughout the application.
 */

import SpidergramAdapter from './spidergram-adapter.js';

// Export individual adapters
export { SpidergramAdapter };

// Integration utility functions
export async function processWithSpidergram(scrapedData, config = {}) {
  const adapter = new SpidergramAdapter(config);
  return await adapter.processWithSpidergram(scrapedData);
}

// Factory function to create an integration instance
export function createIntegration(type, config = {}) {
  switch (type.toLowerCase()) {
    case 'spidergram':
      return new SpidergramAdapter(config);
    default:
      throw new Error(`Unknown integration type: ${type}`);
  }
}

// Default export
export default {
  SpidergramAdapter,
  processWithSpidergram,
  createIntegration
}; 