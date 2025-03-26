/**
 * Core type definitions for the brand system
 */

// Brand DNA Types
export interface BrandDNA {
  essence: BrandEssence;
  expression: BrandExpression;
  impact: BrandImpact;
}

export interface BrandEssence {
  purpose: string;
  promise: string;
  personality: string;
}

export interface BrandExpression {
  voice: BrandVoice;
  visuals: BrandVisuals;
}

export interface BrandVoice {
  tone: string;
  style: string;
  examples: string[];
}

export interface BrandVisuals {
  colors: string[];
  typography: string[];
  imagery: string[];
}

export interface BrandImpact {
  audience: BrandAudience;
  values: BrandValues;
}

export interface BrandAudience {
  who: string[];
  needs: string[];
  journey: string[];
}

export interface BrandValues {
  core: string[];
  actions: string[];
}

// Brand Evolution Types
export interface BrandEvolution {
  history: BrandHistory[];
  current: BrandHealth;
  future: BrandFuture;
}

export interface BrandHistory {
  date: string;
  change: string;
  impact: string;
}

export interface BrandHealth {
  health: number;
  consistency: number;
  resonance: number;
}

export interface BrandFuture {
  opportunities: string[];
  risks: string[];
  adaptations: string[];
}

// Brand Intelligence Types
export interface BrandIntelligence {
  insights: BrandInsights;
  recommendations: BrandRecommendations;
}

export interface BrandInsights {
  audience: string[];
  market: string[];
  performance: string[];
}

export interface BrandRecommendations {
  immediate: string[];
  shortTerm: string[];
  longTerm: string[];
}

// AI Conversation Types
export interface AIConversationContext {
  history: {
    messages: Message[];
    topics: string[];
    decisions: string[];
  };
  current: {
    suggestions: Suggestion[];
    actions: AIAction[];
    learning: AILearning;
    next: NextSteps;
  };
  state: ConversationState;
  preferences: UserPreferences;
  journey: BrandJourney;
}

export interface ConversationState {
  stage: 'initial' | 'in-progress' | 'completed';
  status: 'ready' | 'loading' | 'error';
  lastInteraction: string;
}

export interface UserPreferences {
  experience: 'beginner' | 'intermediate' | 'expert';
  style: 'formal' | 'casual' | 'technical';
  focus: string[];
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface BrandJourney {
  stage: 'discovery' | 'design' | 'delivery' | 'development';
  progress: number;
  nextSteps: string[];
  challenges: string[];
}

// Main Brand Context Type
export interface BrandContext {
  dna: BrandDNA;
  evolution: BrandEvolution;
  intelligence: BrandIntelligence;
}

// AI Response Types
export interface AIResponse {
  message: string;
  suggestions: Suggestion[];
  actions: AIAction[];
  learning: AILearning;
  next: NextSteps;
}

export interface Suggestion {
  text: string;
  message: string;
  action?: AIAction;
}

export interface AIAction {
  type: 'navigate' | 'update' | 'generate' | 'analyze';
  target: string;
  data: any;
}

export interface AILearning {
  topics: string[];
  questions: string[];
  insights: string[];
}

export interface NextSteps {
  immediate: string[];
  suggested: string[];
  questions: string[];
} 