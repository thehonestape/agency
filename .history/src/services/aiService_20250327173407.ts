import { supabase } from '../lib/supabase';
import OpenAI from 'openai';

// API key from environment
const apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
const useRealApi = !!apiKey && apiKey !== 'sk-your-openai-api-key';
const useOllama = true; // Set to true to use Ollama local AI

// Initialize OpenAI client only if we have a real API key
let openai: OpenAI | null = null;
if (useRealApi) {
  openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true // Only for development, should be removed in production
  });
} else {
  console.warn('Using local AI implementation.');
}

// Types for AI prompts and responses
export interface AIPrompt {
  prompt: string;
  model?: string; // Default model if not specified
  context?: Record<string, any>; // Additional context for the AI
  max_tokens?: number;
}

export interface AIResponse {
  text: string;
  model: string;
  created_at: string;
  prompt_id?: string;
  metadata?: Record<string, any>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Track prompt history in Supabase
export interface PromptHistory {
  id: string;
  user_id: string;
  prompt: string;
  response: string;
  model: string;
  context?: Record<string, any>;
  created_at: string;
}

// Models available for generation
export type AIModel = 'gpt-3.5-turbo' | 'gpt-4o' | 'claude-3-opus' | 'claude-3-sonnet';

// Cost tracking interface
export interface AIUsage {
  id?: string;
  user_id: string;
  prompt_tokens: number;
  completion_tokens: number;
  model: string;
  cost: number;
  created_at?: string;
}

// Cost rates per 1000 tokens (as of May 2024)
// NOTE: Update these rates periodically as they may change
export const AI_COST_RATES = {
  'gpt-3.5-turbo': { prompt: 0.0015, completion: 0.002 },
  'gpt-4o': { prompt: 0.01, completion: 0.03 },
  'claude-3-opus': { prompt: 0.015, completion: 0.075 },
  'claude-3-sonnet': { prompt: 0.008, completion: 0.024 }
};

// Calculate cost based on tokens and model
export function calculateAICost(model: string, promptTokens: number, completionTokens: number): number {
  const rates = AI_COST_RATES[model as keyof typeof AI_COST_RATES] || AI_COST_RATES['gpt-3.5-turbo'];
  return (promptTokens / 1000 * rates.prompt) + (completionTokens / 1000 * rates.completion);
}

// Templates for common AI operations
export const promptTemplates = {
  generateProjectDescription: (projectName: string, industry: string, goals: string[]): string => {
    return `Create a detailed project description for a ${industry} project called "${projectName}". 
    The main goals of this project are: ${goals.join(', ')}.
    Include sections for project overview, objectives, target audience, and deliverables.`;
  },
  
  generateContentIdeas: (projectName: string, assetType: string, audience: string): string => {
    return `Generate 5 creative content ideas for ${assetType} assets for the "${projectName}" project.
    The target audience is ${audience}.
    For each idea, provide a title and a brief description of the content.`;
  },
  
  improveAssetMetadata: (assetName: string, currentMetadata: Record<string, any>): string => {
    return `Suggest improvements for the metadata of the asset "${assetName}" with the following current metadata:
    ${JSON.stringify(currentMetadata, null, 2)}
    
    Provide a more comprehensive and SEO-friendly set of metadata that includes keywords, descriptions, and any other relevant fields.`;
  },
  
  suggestNextSteps: (projectName: string, currentStatus: string, completedTasks: string[]): string => {
    return `Based on the current status "${currentStatus}" of project "${projectName}" and the following completed tasks:
    ${completedTasks.join('\n- ')}
    
    Suggest the next 3 steps to move this project forward, with a brief explanation for each step.`;
  },
  
  analyzeProjectHealth: (projectData: any): string => {
    return `Analyze the health of this project and provide insights:
    
    Project: ${projectData.name}
    Description: ${projectData.description || 'No description provided'}
    Current Phase: ${projectData.currentPhase}
    Timeline: Started ${projectData.startDate ? new Date(projectData.startDate).toLocaleDateString() : 'N/A'}, 
              Expected completion: ${projectData.targetCompletionDate ? new Date(projectData.targetCompletionDate).toLocaleDateString() : 'N/A'}
    
    Please provide:
    1. Assessment of project health (on track, at risk, delayed)
    2. Three key insights about the project
    3. Two actionable recommendations
    
    Format as JSON with the following structure:
    {
      "health": "on_track|at_risk|delayed",
      "insights": [
        { "title": "Insight title", "description": "Details", "impact": "low|medium|high" }
      ],
      "recommendations": [
        { "title": "Recommendation title", "description": "Details" }
      ]
    }`;
  }
};

// Ollama client helper - adjust the URL if needed
async function generateOllamaResponse(prompt: string, model = 'llama3.2', context?: Record<string, any>): Promise<string> {
  try {
    console.log(`Calling Ollama API with model: ${model}`);
    
    // Build an enhanced prompt that includes context information
    let enhancedPrompt = prompt;
    
    if (context) {
      // If we have a system prompt, use it
      if (context.systemPrompt) {
        enhancedPrompt = `${context.systemPrompt}\n\n${enhancedPrompt}`;
      }
      
      // If we have conversation history, prepend it to the prompt
      if (context.conversationHistory && Array.isArray(context.conversationHistory)) {
        enhancedPrompt = "Previous conversation:\n" + 
          context.conversationHistory.map((msg: any) => 
            `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
          ).join('\n') + 
          "\n\nCurrent user message: " + prompt;
      }
      
      // If we have app context, include it (if not already in system prompt)
      if (context.appContext && !context.systemPrompt) {
        enhancedPrompt = `[Context: The user is currently on the ${context.appContext.appSection} page (${context.appContext.currentPage})]\n\n${enhancedPrompt}`;
      }

      console.log('Enhanced prompt with context information');
    }
    
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: model,
        prompt: enhancedPrompt,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 800  // Limit response length
        }
      })
    });
    
    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error calling Ollama API:', error);
    return 'Error generating response from local model. Is Ollama running?';
  }
}

// Check if Ollama is running on startup with enhanced debugging
let ollamaAvailable = false;

export async function checkOllamaStatus(): Promise<boolean> {
  console.log('Checking Ollama availability...');
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout
    
    const response = await fetch('http://localhost:11434/api/version', {
      method: 'GET',
      signal: controller.signal
    }).finally(() => clearTimeout(timeoutId));
    
    console.log('Ollama API response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Ollama is available (version ${data.version})`);
      
      // Also check available models
      try {
        const modelsResponse = await fetch('http://localhost:11434/api/tags', {
          method: 'GET'
        });
        
        if (modelsResponse.ok) {
          const modelsData = await modelsResponse.json();
          console.log('Available Ollama models:', modelsData.models ? modelsData.models.map((m: any) => m.name).join(', ') : 'None');
        } else {
          console.warn('Could not fetch Ollama models, status:', modelsResponse.status);
          console.log('Trying alternative Ollama models API...');
          
          // Try the "list" API as an alternative
          const listResponse = await fetch('http://localhost:11434/api/list', {
            method: 'GET'
          });
          
          if (listResponse.ok) {
            const listData = await listResponse.json();
            console.log('Available Ollama models (from list API):', 
              listData.models ? listData.models.map((m: any) => m.name).join(', ') : 
              Array.isArray(listData) ? listData.map((m: any) => m.name || m.model).join(', ') : 'None');
          }
        }
      } catch (modelError) {
        console.warn('Could not fetch Ollama models:', modelError);
      }
      
      ollamaAvailable = true;
    } else {
      console.warn('⚠️ Ollama API responded but with an error status:', response.status);
      ollamaAvailable = false;
    }
  } catch (error) {
    console.warn('❌ Ollama is not available, will use fallback methods instead:', error);
    ollamaAvailable = false;
  }
  
  console.log('Ollama availability set to:', ollamaAvailable);
  return ollamaAvailable;
}

// Run the check immediately with error handling
(async () => {
  try {
    await checkOllamaStatus();
  } catch (error) {
    console.error('Failed to check Ollama status:', error);
    ollamaAvailable = false;
  }
})();

// Generate AI content using the selected implementation
export async function generateContent(prompt: AIPrompt): Promise<AIResponse> {
  // If Ollama is requested but not available, log a warning and fall back to mock
  if (useOllama && !ollamaAvailable) {
    console.warn('Ollama was requested but is not available. Using mock response instead.');
    return generateMockResponse(prompt);
  }
  
  if (useOllama && ollamaAvailable) {
    try {
      console.log('Using Ollama for local AI generation...');
      // Use llama3.2 as the default model, or codellama for code-related prompts
      let model = 'llama3.2';
      
      // If the prompt model is specified and contains 'llama' or 'code', use that
      if (prompt.model?.includes('llama')) {
        model = prompt.model;
      } else if (prompt.model?.includes('code') || 
                prompt.prompt.toLowerCase().includes('code') || 
                prompt.prompt.toLowerCase().includes('function') || 
                prompt.prompt.toLowerCase().includes('programming')) {
        model = 'codellama';
      }
      
      console.log(`Selected Ollama model: ${model}`);
      const ollemaText = await generateOllamaResponse(prompt.prompt, model, prompt.context);
      
      // Mock token counting for local models
      const promptTokens = Math.ceil(prompt.prompt.length / 4);
      const completionTokens = Math.ceil(ollemaText.length / 4);
      
      return {
        text: ollemaText,
        model: model,
        created_at: new Date().toISOString(),
        usage: {
          prompt_tokens: promptTokens,
          completion_tokens: completionTokens,
          total_tokens: promptTokens + completionTokens
        }
      };
    } catch (error) {
      console.error('Error with Ollama, falling back to mock:', error);
      return generateMockResponse(prompt);
    }
  } else if (useRealApi && openai) {
    try {
      // Real OpenAI API implementation
      const modelName = prompt.model || 'gpt-3.5-turbo';
      
      // Define type for OpenAI messages
      type OpenAIMessageRole = "system" | "user" | "assistant";
      
      interface OpenAIMessage {
        role: OpenAIMessageRole;
        content: string;
      }
      
      // Default system message or custom system prompt if provided
      const systemMessage: OpenAIMessage = { 
        role: "system", 
        content: prompt.context?.systemPrompt || 
                 "You are a helpful assistant for a creative agency project management system. Provide concise, professional responses."
      };
      
      let messages: OpenAIMessage[] = [
        systemMessage,
        { role: "user", content: prompt.prompt }
      ];
      
      // If we have conversation history, add it to the messages
      if (prompt.context?.conversationHistory && Array.isArray(prompt.context.conversationHistory)) {
        // Insert conversation history before the latest user message
        const historyMessages: OpenAIMessage[] = prompt.context.conversationHistory
          .filter(msg => msg.role === 'user' || msg.role === 'assistant')
          .map(msg => ({
            role: msg.role as OpenAIMessageRole,
            content: msg.content
          }));
          
        messages = [
          messages[0], // Keep the system message
          ...historyMessages,
          messages[1] // The current user message
        ];
      }
      
      // If we have app context but no system prompt was provided, add it to the system message
      if (prompt.context?.appContext && !prompt.context?.systemPrompt) {
        const appContextInfo = `The user is currently in the ${prompt.context.appContext.appSection} section of the app.`;
        messages[0].content = `${messages[0].content} ${appContextInfo}`;
      }
      
      const completion = await openai.chat.completions.create({
        messages,
        model: modelName,
        max_tokens: prompt.max_tokens || 500,
      });
      
      const response: AIResponse = {
        text: completion.choices[0]?.message?.content || "No response generated",
        model: modelName,
        created_at: new Date().toISOString(),
        usage: {
          prompt_tokens: completion.usage?.prompt_tokens || 0,
          completion_tokens: completion.usage?.completion_tokens || 0,
          total_tokens: completion.usage?.total_tokens || 0
        }
      };
      
      // Track usage if we have a logged-in user
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await trackAIUsage({
          user_id: user.id,
          prompt_tokens: response.usage?.prompt_tokens || 0,
          completion_tokens: response.usage?.completion_tokens || 0,
          model: modelName,
          cost: calculateAICost(
            modelName, 
            response.usage?.prompt_tokens || 0, 
            response.usage?.completion_tokens || 0
          )
        });
      }
      
      return response;
    } catch (error) {
      console.error('Error generating AI content with OpenAI:', error);
      // Fall back to Ollama or mock
      if (useOllama) {
        return generateContent({...prompt, model: 'llama3.2'});
      } else {
        return generateMockResponse(prompt);
      }
    }
  } else {
    console.log('Using mock AI implementation.');
    return generateMockResponse(prompt);
  }
}

// Generate a mock response that's more intelligent and helpful
function generateMockResponse(prompt: AIPrompt): AIResponse {
  console.log('Using mock AI response generator');
  
  // Parse the prompt to determine the type of question
  const query = prompt.prompt.toLowerCase();
  let response = '';
  
  // Brand strategy questions
  if (query.includes('brand strategy') || query.includes('positioning') || query.includes('target audience')) {
    response = "Based on my analysis, your brand strategy should focus on three key elements: 1) Differentiation through your unique AI-human collaborative approach, 2) Positioning as a premium service that delivers measurable ROI, and 3) Targeting decision-makers who value both innovation and proven results. I've analyzed your competitors and found most are either fully AI-automated or traditional agencies - your hybrid model occupies a valuable middle ground that you should emphasize in your communications.";
  } 
  // Visual identity questions
  else if (query.includes('logo') || query.includes('color') || query.includes('design') || query.includes('visual')) {
    response = "Your current visual identity uses a color palette dominated by blue tones (primary #3B82F6) which conveys trust and professionalism, but lacks the warmth that would align with your 'human+AI' positioning. I recommend introducing a complementary warm accent color (perhaps a muted coral #F97866) to create balance. Your typography is strong but consider increasing contrast between headings and body text for better readability and hierarchy. For your logo application, ensure consistent spacing (use the 'o' in Workhorse as your spacing unit) across all platforms.";
  } 
  // Content and messaging questions
  else if (query.includes('content') || query.includes('message') || query.includes('copy') || query.includes('write') || query.includes('text')) {
    response = "After reviewing your content strategy, I see three opportunities: 1) Your messaging tends to focus on features rather than outcomes - try reframing around the transformative results clients experience; 2) Case studies lack specific metrics - add quantifiable results where possible (e.g., '37% increase in conversion rate'); 3) Your voice is consistent but could be more distinctive - consider introducing more industry-specific terminology balanced with accessible explanations to demonstrate both expertise and clarity.";
  } 
  // Market trends questions
  else if (query.includes('trend') || query.includes('market') || query.includes('industry') || query.includes('competitor')) {
    response = "Recent industry analysis shows three emerging trends relevant to your brand: 1) Increased emphasis on measurable brand performance metrics (69% of CMOs now track brand value quantitatively); 2) Growing preference for collaborative tools that augment rather than replace creative teams; 3) Rising importance of adaptable brand systems that evolve with market conditions. Your closest competitors are still using static brand guidelines, creating an opportunity for you to emphasize your dynamic, AI-enhanced approach as a competitive advantage.";
  }
  // Social media questions
  else if (query.includes('social') || query.includes('instagram') || query.includes('twitter') || query.includes('linkedin') || query.includes('facebook')) {
    response = "Based on your brand positioning and audience analysis, LinkedIn should be your primary platform (87% of your target audience uses it daily), followed by Twitter for industry news engagement. Your current posting frequency (2x weekly) is below the optimal level - aim for 4-5 quality posts weekly on LinkedIn with a 3:1:1 ratio of educational content, thought leadership, and promotional material. Video content is currently underutilized in your strategy - consider adding short-form expert interviews or process videos which typically see 38% higher engagement for B2B brands in your sector.";
  }
  // Project management questions
  else if (query.includes('project') || query.includes('timeline') || query.includes('manage') || query.includes('client')) {
    response = "Analyzing your current project workflow, I see opportunities to improve client collaboration at three key points: 1) Strategy development - consider implementing collaborative workshops using the Brand Sprint methodology; 2) Feedback cycles - your average review cycle takes 5.3 days, which is 28% longer than industry benchmarks; consider implementing structured feedback templates and scheduled review sessions; 3) Handoff processes - create a comprehensive client onboarding package with maintenance guidelines to ensure brand consistency post-delivery. These adjustments could potentially reduce project timelines by 15-20% while improving client satisfaction.";
  }
  // General questions about the tool/platform
  else if (query.includes('how do you') || query.includes('what can you') || query.includes('help me')) {
    response = "I'm your Brand Intelligence Assistant, designed to provide strategic insights and practical recommendations for your brand. I can help with: 1) Brand strategy development and refinement; 2) Visual identity analysis and recommendations; 3) Content and messaging optimization; 4) Competitive analysis and market positioning; 5) Performance metrics analysis and improvement strategies; 6) Project workflow optimization. I learn from our interactions to provide increasingly tailored advice. What specific aspect of your brand would you like to explore today?";
  }
  // Default response for other queries
  else {
    response = "Based on my analysis of your brand's current position and market trends, I'd recommend focusing on three key areas: 1) Strengthening your differential value proposition around the AI-human collaborative approach, which 76% of creative decision-makers find compelling; 2) Developing more industry-specific case studies demonstrating measurable outcomes; and 3) Creating a more systematic approach to visual consistency across touchpoints. Would you like me to elaborate on any of these areas specifically?";
  }
  
  // Add a more specific follow-up question based on the query context
  if (query.includes('how') || query.includes('what') || query.includes('why')) {
    response += " Does that address what you were looking for? I can provide more specific recommendations if you tell me more about your particular goals.";
  } else {
    response += " Would you like me to explore any of these points in more detail or suggest implementation steps?";
  }
  
  return {
    text: response,
    model: "mock-gpt4-brand-expert",
    created_at: new Date().toISOString(),
    usage: {
      prompt_tokens: Math.ceil(prompt.prompt.length / 4),
      completion_tokens: Math.ceil(response.length / 4),
      total_tokens: Math.ceil((prompt.prompt.length + response.length) / 4)
    }
  };
}

// Track AI usage in Supabase
export async function trackAIUsage(usage: AIUsage): Promise<void> {
  try {
    const { error } = await supabase
      .from('ai_usage')
      .insert([
        {
          user_id: usage.user_id,
          prompt_tokens: usage.prompt_tokens,
          completion_tokens: usage.completion_tokens,
          model: usage.model,
          cost: usage.cost
        }
      ]);
      
    if (error) {
      console.error('Error tracking AI usage:', error);
    }
  } catch (error) {
    console.error('Failed to track AI usage:', error);
  }
}

// Get AI usage history for a user
export async function getAIUsage(userId: string): Promise<AIUsage[]> {
  try {
    const { data, error } = await supabase
      .from('ai_usage')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching AI usage:', error);
      return [];
    }
    
    return data as AIUsage[];
  } catch (error) {
    console.error('Failed to get AI usage:', error);
    return [];
  }
}

// Get total AI cost for a user
export async function getTotalAICost(userId: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('ai_usage')
      .select('cost')
      .eq('user_id', userId);
      
    if (error) {
      console.error('Error fetching AI costs:', error);
      return 0;
    }
    
    return data.reduce((sum, item) => sum + (item.cost || 0), 0);
  } catch (error) {
    console.error('Failed to get total AI cost:', error);
    return 0;
  }
}

// Save prompt to history
export async function savePromptToHistory(userId: string, prompt: string, response: string, model: string, context?: Record<string, any>): Promise<void> {
  try {
    const { error } = await supabase
      .from('prompt_history')
      .insert([
        {
          user_id: userId,
          prompt,
          response,
          model,
          context,
          created_at: new Date().toISOString()
        }
      ]);
      
    if (error) {
      console.error('Error saving prompt history:', error);
    }
  } catch (error) {
    console.error('Failed to save prompt history:', error);
  }
}

// Get prompt history for a user
export async function getPromptHistory(userId: string): Promise<PromptHistory[]> {
  try {
    const { data, error } = await supabase
      .from('prompt_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching prompt history:', error);
      return [];
    }
    
    return data as PromptHistory[];
  } catch (error) {
    console.error('Failed to get prompt history:', error);
    return [];
  }
}

// Generate project insights based on data
export async function generateProjectInsights(projectData: any): Promise<any> {
  const prompt = promptTemplates.analyzeProjectHealth(projectData);
  
  const response = await generateContent({
    prompt,
    model: 'gpt-4o',
    max_tokens: 500
  });
  
  try {
    // Try to parse JSON from the response
    const jsonMatch = response.text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Failed to parse JSON from response');
  } catch (error) {
    console.error('Error parsing AI response:', error);
    // Return fallback data
    return {
      health: "at_risk",
      insights: [
        { 
          title: "Timeline Concerns", 
          description: "Project may face delays based on current progress rate", 
          impact: "high" 
        },
        { 
          title: "Resource Allocation", 
          description: "Current phase may require additional resources",
          impact: "medium" 
        },
        { 
          title: "Client Feedback", 
          description: "More frequent client touchpoints could improve artifact approval rate", 
          impact: "medium" 
        }
      ],
      recommendations: [
        { 
          title: "Increase Review Frequency", 
          description: "Schedule more frequent but shorter review sessions" 
        },
        { 
          title: "Focus on Critical Path", 
          description: "Prioritize artifacts that are blocking progress" 
        }
      ]
    };
  }
}

// Get project phase statuses for AI analysis
export async function getProjectPhaseStatuses(projectId: string): Promise<Record<string, string>> {
  try {
    const { data, error } = await supabase
      .from('project_phases')
      .select('phase_type, status')
      .eq('project_id', projectId);
      
    if (error) {
      console.error('Error fetching project phases:', error);
      return {};
    }
    
    return data.reduce((acc, phase) => {
      acc[phase.phase_type] = phase.status;
      return acc;
    }, {} as Record<string, string>);
  } catch (error) {
    console.error('Failed to get project phase statuses:', error);
    return {};
  }
}

export const aiService = {
  generateContent,
  savePromptToHistory,
  getPromptHistory,
  promptTemplates,
  trackAIUsage,
  getAIUsage,
  getTotalAICost,
  calculateAICost,
  checkOllamaStatus
};

export default aiService; 