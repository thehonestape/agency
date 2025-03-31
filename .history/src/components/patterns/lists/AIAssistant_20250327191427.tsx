import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/Card';
import { Button } from '@ui/button';
import { Textarea } from '@ui/textarea';
import { FiSend, FiX, FiLoader } from 'react-icons/fi';
import { AIResponse } from '@services/aiService';

interface AIAssistantProps {
  initialPrompt?: string;
  context?: Record<string, any>;
  onGenerate: (response: AIResponse) => void;
  onClose: () => void;
}

export function AIAssistant({ 
  initialPrompt = '', 
  context = {}, 
  onGenerate, 
  onClose 
}: AIAssistantProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    try {
      setIsLoading(true);
      setError(null);

      // Here you would typically call your AI service
      // For now, we'll simulate a response
      const response: AIResponse = {
        text: `AI response for: ${prompt}`,
        model: 'gpt-4',
        created_at: new Date().toISOString(),
        metadata: {
          tokens: 100,
          timestamp: new Date().toISOString()
        }
      };

      onGenerate(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate response');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>AI Assistant</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <FiX className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask the AI assistant for help..."
              className="min-h-[100px]"
            />
          </div>
          
          {error && (
            <div className="text-sm text-red-500">
              {error}
            </div>
          )}
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading || !prompt.trim()}>
              {isLoading ? (
                <>
                  <FiLoader className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FiSend className="mr-2 h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 