import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../Card';
import { Button } from '../button';
import { Input } from '../input';
import { Badge } from '../badge';
import { FiSend, FiUser, FiCpu, FiClock, FiInfo, FiZap, FiMessageSquare } from 'react-icons/fi';
import { generateContent, AIPrompt, AIResponse, generateProjectInsights } from "../../../services/aiService";
import { Project, Artifact } from '../../../types/project.types';

// Define common prompt types
const PROMPT_TYPES = {
  CONTENT_IDEAS: 'Content Ideas',
  PROJECT_DESCRIPTION: 'Project Description',
  NEXT_STEPS: 'Next Steps',
  IMPROVE_ARTIFACT: 'Improve Artifact',
  PROJECT_INSIGHTS: 'Project Insights'
};

interface AIAssistantProps {
  currentProject?: Project | null;
  artifacts?: Artifact[];
  onInsightGenerated?: (insights: any) => void;
}

export function AIAssistant({ currentProject, artifacts, onInsightGenerated }: AIAssistantProps) {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPromptType, setSelectedPromptType] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  
  // Check if OpenAI API key is configured
  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    setApiKeyMissing(!apiKey);
  }, []);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Generate project insights when a project is selected
  useEffect(() => {
    if (currentProject && onInsightGenerated) {
      generateInsights();
    }
  }, [currentProject]);

  const generateInsights = async () => {
    if (!currentProject) return;
    
    setIsLoading(true);
    try {
      const insights = await generateProjectInsights(currentProject);
      
      if (onInsightGenerated) {
        onInsightGenerated(insights);
      }
      
      // Add a message about the insights
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: `I've analyzed project "${currentProject.name}" and found ${insights.insights.length} key insights. The overall health is: ${insights.health.replace('_', ' ')}. Check the Insights tab for details.` 
        }
      ]);
    } catch (error) {
      console.error('Error generating insights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendPrompt = async () => {
    if (!prompt.trim()) return;
    
    // Add user message
    const userMessage = { role: 'user' as const, content: prompt };
    setMessages(prev => [...prev, userMessage]);
    
    // Reset prompt input
    setPrompt('');
    setSelectedPromptType('');
    
    // Generate AI response
    setIsLoading(true);
    
    try {
      const aiPrompt: AIPrompt = {
        prompt: userMessage.content,
        model: 'gpt-4o',
        max_tokens: 500
      };
      
      const response = await generateContent(aiPrompt);
      
      // Add AI response
      setMessages(prev => [...prev, { role: 'assistant', content: response.text }]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I encountered an error processing your request. Please try again or rephrase your prompt.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (type: string) => {
    let newPrompt = '';
    
    switch (type) {
      case PROMPT_TYPES.CONTENT_IDEAS:
        newPrompt = `Generate 5 content ideas for ${currentProject?.name || 'our project'} that would appeal to our target audience.`;
        break;
        
      case PROMPT_TYPES.PROJECT_DESCRIPTION:
        newPrompt = `Write a professional project description for ${currentProject?.name || 'our project'} that highlights its key features and benefits.`;
        break;
        
      case PROMPT_TYPES.NEXT_STEPS:
        newPrompt = `Based on the current state of ${currentProject?.name || 'our project'} (${currentProject?.currentPhase || 'current phase'}), suggest the next 3 steps we should take to make progress.`;
        break;
        
      case PROMPT_TYPES.IMPROVE_ARTIFACT:
        const artifactNames = artifacts?.map(a => a.name).join(', ') || 'our artifacts';
        newPrompt = `Suggest how we can improve ${artifactNames} to better meet project goals and user needs.`;
        break;
        
      case PROMPT_TYPES.PROJECT_INSIGHTS:
        newPrompt = `Analyze ${currentProject?.name || 'our project'} and provide strategic insights about potential risks, opportunities, and recommendations.`;
        break;
        
      default:
        return;
    }
    
    setPrompt(newPrompt);
    setSelectedPromptType(type);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>AI Assistant</CardTitle>
            <p className="text-sm text-muted-foreground">Ask questions or request assistance</p>
          </div>
          {apiKeyMissing && (
            <Badge variant="warning" className="flex items-center gap-1">
              <FiInfo className="h-4 w-4" />
              OpenAI API Key Not Configured
            </Badge>
          )}
        </div>
        
        {/* Quick Prompt Buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.values(PROMPT_TYPES).map(type => (
            <Button
              key={type}
              size="sm"
              variant={selectedPromptType === type ? "default" : "outline"}
              onClick={() => handleQuickPrompt(type)}
              disabled={isLoading}
            >
              <FiZap className="mr-2 h-4 w-4" />
              {type}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-auto space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <FiMessageSquare className="mx-auto h-8 w-8 mb-2" />
            <p>No messages yet. Ask me anything about your project.</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-muted ml-8' 
                  : 'bg-primary/10 mr-8'
              }`}
            >
              <div className="flex items-start">
                <div className={`p-2 rounded-full ${message.role === 'user' ? 'bg-primary' : 'bg-muted-foreground'} mr-2`}>
                  {message.role === 'user' ? <FiUser className="text-white" /> : <FiCpu className="text-white" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    {message.role === 'user' ? 'You' : 'AI Assistant'}
                  </p>
                  <div className="mt-1 whitespace-pre-line">
                    {message.content}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
        
        {isLoading && (
          <div className="flex items-center justify-center py-2">
            <FiClock className="animate-spin mr-2 h-4 w-4" />
            <p className="text-sm text-muted-foreground">Thinking...</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <div className="flex gap-2 w-full">
          <Input
            placeholder="Ask me anything..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendPrompt()}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSendPrompt}
            disabled={!prompt.trim() || isLoading}
          >
            <FiSend className="mr-2 h-4 w-4" />
            Send
          </Button>
        </div>
        {apiKeyMissing && (
          <p className="text-xs text-warning mt-2">
            To use the AI Assistant with a real API, please set VITE_OPENAI_API_KEY in your .env file.
          </p>
        )}
      </CardFooter>
    </Card>
  );
} 