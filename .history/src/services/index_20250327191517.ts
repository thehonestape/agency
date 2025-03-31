export * from './authService';
export * from './organizationService';
export { brandMemoryService } from './brandMemoryService';
export * from './projectService';
export * from './assetService';
export * from './aiService';
export * from './storageService';
export * from './userService';

// Import analyticsService with explicit exports to avoid naming conflicts
import analyticsService, {
  initAnalyticsSession,
  trackEvent,
  // Rename the trackAIUsage function to avoid conflict with aiService
  trackAIUsage as trackAnalyticsAIUsage,
  getAIUsageMetrics,
  getUserEvents,
  type AnalyticsEvent,
  type AnalyticsEventType,
  type AIUsageMetrics
} from './analyticsService';

// Export the renamed functions and types
export {
  analyticsService,
  initAnalyticsSession,
  trackEvent,
  trackAnalyticsAIUsage,
  getAIUsageMetrics,
  getUserEvents,
};

// Export types with the proper syntax
export type {
  AnalyticsEvent,
  AnalyticsEventType,
  AIUsageMetrics
}; 