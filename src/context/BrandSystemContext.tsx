import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  BrandContext,
  AIConversationContext,
  AIResponse,
  Message,
  Suggestion,
  AIAction,
  UserPreferences,
  BrandJourney
} from '../types/brand-system';

interface BrandSystemContextType {
  // Brand State
  brandContext: BrandContext | null;
  setBrandContext: (context: BrandContext) => void;
  
  // AI Conversation State
  conversationContext: AIConversationContext | null;
  setConversationContext: (context: AIConversationContext) => void;
  
  // User Preferences
  userPreferences: UserPreferences;
  setUserPreferences: (preferences: UserPreferences) => void;
  
  // Brand Journey
  brandJourney: BrandJourney;
  setBrandJourney: (journey: BrandJourney) => void;
  
  // AI Interaction Methods
  sendMessage: (message: string) => Promise<void>;
  applySuggestion: (suggestion: Suggestion) => void;
  executeAction: (action: AIAction) => void;
  
  // State Management
  isLoading: boolean;
  error: Error | null;
  clearConversation: () => void;
}

// Create context
const BrandSystemContext = createContext<BrandSystemContextType | undefined>(undefined);

// Default user preferences
const defaultUserPreferences: UserPreferences = {
  experience: 'beginner',
  style: 'casual',
  focus: ['brand-essence', 'visual-identity']
};

// Default brand journey
const defaultBrandJourney: BrandJourney = {
  stage: 'discovery',
  progress: 0,
  nextSteps: [],
  challenges: []
};

// Default conversation context
const defaultConversationContext: AIConversationContext = {
  history: {
    messages: [],
    topics: [],
    decisions: []
  },
  current: {
    suggestions: [],
    actions: [],
    learning: {
      topics: [],
      questions: [],
      insights: []
    },
    next: {
      immediate: [],
      suggested: [],
      questions: []
    }
  },
  state: {
    stage: 'initial',
    status: 'ready',
    lastInteraction: new Date().toISOString()
  },
  preferences: defaultUserPreferences,
  journey: defaultBrandJourney
};

export function BrandSystemProvider({ children }: { children: ReactNode }) {
  // State
  const [brandContext, setBrandContext] = useState<BrandContext | null>(null);
  const [conversationContext, setConversationContext] = useState<AIConversationContext | null>(defaultConversationContext);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(defaultUserPreferences);
  const [brandJourney, setBrandJourney] = useState<BrandJourney>(defaultBrandJourney);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Send message to AI
  const sendMessage = async (message: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Add user message to conversation
      const userMessage: Message = {
        role: 'user',
        content: message,
        timestamp: new Date().toISOString()
      };

      // Update conversation context
      setConversationContext(prev => {
        if (!prev) return null;
        return {
          ...prev,
          history: {
            ...prev.history,
            messages: [...prev.history.messages, userMessage]
          }
        };
      });

      // TODO: Call AI service
      // const response = await aiService.chat({
      //   message,
      //   context: {
      //     brandContext,
      //     conversationContext,
      //     userPreferences,
      //     brandJourney
      //   }
      // });

      // For now, use mock response
      const mockResponse: AIResponse = {
        message: "I understand you're working on your brand. How can I help you?",
        suggestions: [
          {
            text: "Define brand purpose",
            message: "Let's define your brand's purpose",
            action: {
              type: 'navigate',
              target: 'brand-purpose',
              data: {}
            }
          }
        ],
        actions: [],
        learning: {
          topics: ['brand-essence'],
          questions: ['What is your brand\'s purpose?'],
          insights: ['User is starting their brand journey']
        },
        next: {
          immediate: ['Define brand purpose'],
          suggested: ['Set brand values', 'Identify target audience'],
          questions: ['What problem does your brand solve?']
        }
      };

      // Add AI response to conversation
      const assistantMessage: Message = {
        role: 'assistant',
        content: mockResponse.message,
        timestamp: new Date().toISOString()
      };

      setConversationContext(prev => {
        if (!prev) return null;
        return {
          ...prev,
          history: {
            ...prev.history,
            messages: [...prev.history.messages, assistantMessage]
          }
        };
      });

      // Execute any actions
      if (mockResponse.actions.length > 0) {
        mockResponse.actions.forEach(action => executeAction(action));
      }

    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      console.error('Error sending message:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Apply suggestion
  const applySuggestion = (suggestion: Suggestion) => {
    if (suggestion.action) {
      executeAction(suggestion.action);
    }

    if (suggestion.message) {
      sendMessage(suggestion.message);
    }
  };

  // Execute action
  const executeAction = (action: AIAction) => {
    switch (action.type) {
      case 'navigate':
        // TODO: Implement navigation
        console.log('Navigating to:', action.target);
        break;
      case 'update':
        // TODO: Implement brand update
        console.log('Updating brand:', action.target);
        break;
      case 'generate':
        // TODO: Implement content generation
        console.log('Generating content for:', action.target);
        break;
      case 'analyze':
        // TODO: Implement brand analysis
        console.log('Analyzing:', action.target);
        break;
      default:
        console.warn('Unknown action type:', action.type);
    }
  };

  // Clear conversation
  const clearConversation = () => {
    setConversationContext(prev => {
      if (!prev) return null;
      return {
        ...prev,
        history: {
          ...prev.history,
          messages: []
        }
      };
    });
  };

  // Value object
  const value: BrandSystemContextType = {
    brandContext,
    setBrandContext,
    conversationContext,
    setConversationContext,
    userPreferences,
    setUserPreferences,
    brandJourney,
    setBrandJourney,
    sendMessage,
    applySuggestion,
    executeAction,
    isLoading,
    error,
    clearConversation
  };

  return (
    <BrandSystemContext.Provider value={value}>
      {children}
    </BrandSystemContext.Provider>
  );
}

// Custom hook
export function useBrandSystem() {
  const context = useContext(BrandSystemContext);
  if (context === undefined) {
    throw new Error('useBrandSystem must be used within a BrandSystemProvider');
  }
  return context;
} 