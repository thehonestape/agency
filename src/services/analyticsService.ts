import { supabase } from '../lib/supabase';

// Analytics event types
export type AnalyticsEventType = 
  | 'ai_prompt_sent'
  | 'ai_response_received'
  | 'project_health_analyzed'
  | 'insight_generated'
  | 'artifact_analyzed'
  | 'feature_used'
  | 'error_occurred';

// Analytics event data structure
export interface AnalyticsEvent {
  id?: string;
  user_id: string;
  event_type: AnalyticsEventType;
  event_data?: Record<string, any>;
  timestamp?: string;
  session_id?: string;
  device_info?: string;
}

// AI usage metrics
export interface AIUsageMetrics {
  total_prompts: number;
  total_tokens: number;
  estimated_cost: number;
  most_used_model: string;
  most_common_prompt_type: string;
}

// Generate a session ID for tracking events in a single user session
let currentSessionId = '';

/**
 * Initialize the analytics session
 */
export const initAnalyticsSession = (): string => {
  currentSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  return currentSessionId;
};

/**
 * Track an analytics event
 */
export const trackEvent = async (
  userId: string,
  eventType: AnalyticsEventType,
  eventData?: Record<string, any>
): Promise<void> => {
  try {
    // Ensure we have a session ID
    if (!currentSessionId) {
      initAnalyticsSession();
    }
    
    // Get basic device/browser info
    const deviceInfo = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenSize: `${window.screen.width}x${window.screen.height}`
    };
    
    const event: AnalyticsEvent = {
      user_id: userId,
      event_type: eventType,
      event_data: eventData,
      timestamp: new Date().toISOString(),
      session_id: currentSessionId,
      device_info: JSON.stringify(deviceInfo)
    };
    
    // Save event to Supabase
    const { error } = await supabase
      .from('analytics_events')
      .insert([event]);
      
    if (error) {
      console.error('Error tracking analytics event:', error);
    }
  } catch (error) {
    // Don't let analytics errors impact the application
    console.error('Failed to track analytics event:', error);
  }
};

/**
 * Track AI usage specifically
 */
export const trackAIUsage = async (
  userId: string,
  model: string,
  promptType: string,
  promptTokens: number,
  completionTokens: number,
  estimatedCost: number
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('ai_usage_metrics')
      .insert([{
        user_id: userId,
        model,
        prompt_type: promptType,
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: promptTokens + completionTokens,
        estimated_cost: estimatedCost,
        timestamp: new Date().toISOString()
      }]);
      
    if (error) {
      console.error('Error tracking AI usage:', error);
    }
  } catch (error) {
    console.error('Failed to track AI usage:', error);
  }
};

/**
 * Get AI usage metrics for a user
 */
export const getAIUsageMetrics = async (userId: string): Promise<AIUsageMetrics | null> => {
  try {
    // Get total prompts
    const { data: promptsData, error: promptsError } = await supabase
      .from('ai_usage_metrics')
      .select('id')
      .eq('user_id', userId);
      
    if (promptsError) {
      console.error('Error fetching AI prompts count:', promptsError);
      return null;
    }
    
    // Get total tokens and cost
    const { data: tokensData, error: tokensError } = await supabase
      .from('ai_usage_metrics')
      .select('total_tokens, estimated_cost')
      .eq('user_id', userId);
      
    if (tokensError) {
      console.error('Error fetching AI tokens data:', tokensError);
      return null;
    }
    
    // Get most used model - using count aggregation with SQL query
    const { data: modelData, error: modelError } = await supabase
      .rpc('get_most_used_ai_model', { user_id_param: userId });
      
    if (modelError) {
      console.error('Error fetching most used model:', modelError);
      return null;
    }
    
    // Get most common prompt type - using count aggregation with SQL query
    const { data: promptTypeData, error: promptTypeError } = await supabase
      .rpc('get_most_common_prompt_type', { user_id_param: userId });
      
    if (promptTypeError) {
      console.error('Error fetching most common prompt type:', promptTypeError);
      return null;
    }
    
    // Calculate metrics
    const totalPrompts = promptsData.length;
    const totalTokens = tokensData.reduce((sum, item) => sum + (item.total_tokens || 0), 0);
    const estimatedCost = tokensData.reduce((sum, item) => sum + (item.estimated_cost || 0), 0);
    const mostUsedModel = modelData?.model || 'unknown';
    const mostCommonPromptType = promptTypeData?.prompt_type || 'unknown';
    
    return {
      total_prompts: totalPrompts,
      total_tokens: totalTokens,
      estimated_cost: estimatedCost,
      most_used_model: mostUsedModel,
      most_common_prompt_type: mostCommonPromptType
    };
  } catch (error) {
    console.error('Failed to get AI usage metrics:', error);
    return null;
  }
};

/**
 * Get analytics events for a specific user
 */
export const getUserEvents = async (
  userId: string,
  limit: number = 50,
  eventType?: AnalyticsEventType
): Promise<AnalyticsEvent[]> => {
  try {
    let query = supabase
      .from('analytics_events')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(limit);
      
    if (eventType) {
      query = query.eq('event_type', eventType);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching user events:', error);
      return [];
    }
    
    return data as AnalyticsEvent[];
  } catch (error) {
    console.error('Failed to get user events:', error);
    return [];
  }
};

export const analyticsService = {
  initAnalyticsSession,
  trackEvent,
  trackAIUsage,
  getAIUsageMetrics,
  getUserEvents
};

export default analyticsService; 