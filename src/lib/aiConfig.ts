/**
 * AI Services Configuration
 * 
 * This file contains configuration for all AI services, including API keys,
 * base URLs, model lists, and other settings. It consolidates all environment
 * variables in one place for easier management.
 */

// Check if OpenAI API key is available
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

// Models available for AI services
export const AVAILABLE_MODELS = {
  DEFAULT: 'gpt-3.5-turbo', // Default model to use when not specified
  GPT35: 'gpt-3.5-turbo',
  GPT4: 'gpt-4o',
  CLAUDE_SONNET: 'claude-3-sonnet',
  CLAUDE_OPUS: 'claude-3-opus',
} as const;

// Define model rate type
interface ModelRate {
  prompt: number;
  completion: number;
}

// Cost rates per 1000 tokens (as of May 2024)
// These should be updated periodically
export const MODEL_COST_RATES: Record<string, ModelRate> = {
  'gpt-3.5-turbo': { 
    prompt: 0.0015, 
    completion: 0.002 
  },
  'gpt-4o': { 
    prompt: 0.01, 
    completion: 0.03 
  },
  'claude-3-opus': { 
    prompt: 0.015, 
    completion: 0.075 
  },
  'claude-3-sonnet': { 
    prompt: 0.008, 
    completion: 0.024 
  }
};

// Token limits by model
export const MODEL_TOKEN_LIMITS: Record<string, number> = {
  'gpt-3.5-turbo': 16385,
  'gpt-4o': 32768,
  'claude-3-opus': 200000,
  'claude-3-sonnet': 180000
};

// Default system prompts to use with various models
export const DEFAULT_SYSTEM_PROMPTS = {
  ASSISTANT: 'You are a helpful assistant for a creative agency project management system. Provide concise, professional responses.',
  PROJECT_INSIGHTS: 'You are a project analytics specialist. Analyze project data to identify risks, opportunities, and strategic recommendations.',
  CONTENT_GENERATION: 'You are a content specialist generating high-quality, engaging content for creative projects.',
  TECHNICAL_WRITER: 'You are a technical writer creating clear, precise documentation and specifications.'
};

// Timeout configuration for API calls
export const AI_SERVICE_TIMEOUTS = {
  DEFAULT: 30000, // 30 seconds default timeout
  GENERATE_CONTENT: 60000, // 60 seconds for content generation
  PROJECT_ANALYSIS: 45000, // 45 seconds for project analysis
};

// Check if a valid OpenAI API key is configured
export const isOpenAIConfigured = (): boolean => {
  return !!OPENAI_API_KEY && OPENAI_API_KEY.startsWith('sk-');
};

// Get the configured API key
export const getOpenAIApiKey = (): string => {
  return OPENAI_API_KEY;
};

// Get a recommended model based on task type
export const getRecommendedModel = (taskType: string): string => {
  switch (taskType) {
    case 'complex_analysis':
    case 'strategic_insights':
      return AVAILABLE_MODELS.GPT4;
    case 'content_generation':
    case 'basic_tasks':
      return AVAILABLE_MODELS.GPT35;
    default:
      return AVAILABLE_MODELS.DEFAULT;
  }
};

// Calculate cost for token usage
export const calculateCost = (
  model: string, 
  promptTokens: number, 
  completionTokens: number
): number => {
  // Get the rate for the specified model, or fall back to default
  const defaultModel = AVAILABLE_MODELS.DEFAULT;
  const rates = MODEL_COST_RATES[model] || MODEL_COST_RATES[defaultModel];
  
  return (promptTokens / 1000 * rates.prompt) + (completionTokens / 1000 * rates.completion);
};

export default {
  isOpenAIConfigured,
  getOpenAIApiKey,
  getRecommendedModel,
  calculateCost,
  AVAILABLE_MODELS,
  MODEL_COST_RATES,
  MODEL_TOKEN_LIMITS,
  DEFAULT_SYSTEM_PROMPTS,
  AI_SERVICE_TIMEOUTS
}; 