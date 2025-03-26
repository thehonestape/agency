import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/button';
import { FiSend, FiCpu, FiMessageCircle, FiUser, FiDownload } from 'react-icons/fi';
import { Input } from '../components/ui/input';
import { AIUsageDashboard, AIUsageStats } from '../components/AIUsageDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAIAssistant } from '../components/ai/AIAssistantProvider';
import { generateContent, generateProjectInsights, getAIUsage, getTotalAICost, getPromptHistory } from '../services/aiService';
import { AIQuickAccessButton } from '../components/ai/AIQuickAccessButton';

export function AIHelpPage() {
  const { openAssistant } = useAIAssistant();
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: 'Hello! I\'m your AI assistant. How can I help you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [usageStats, setUsageStats] = useState<AIUsageStats>({
    totalQueries: 0,
    totalTokens: 0,
    estimatedCost: 0,
    history: []
  });

  // Fetch AI usage statistics on page load
  useEffect(() => {
    async function fetchAIData() {
      try {
        // In a real app, you'd fetch actual user ID from authentication
        const userId = 'current-user';
        
        // These would be API calls in a real app
        const history = await getPromptHistory(userId);
        const totalCost = await getTotalAICost(userId);
        const usage = await getAIUsage(userId);
        
        const totalTokens = usage.reduce((sum, item) => sum + item.prompt_tokens + item.completion_tokens, 0);
        
        setUsageStats({
          totalQueries: history.length,
          totalTokens,
          estimatedCost: totalCost,
          history: history
        });
        
        // Generate some sample AI insights for demo purposes
        const sampleProjectData = {
          id: 'project-1',
          name: 'Brand Refresh',
          description: 'Complete brand refresh for Acme Corp',
          currentPhase: 'design',
          startDate: '2023-01-15',
          targetCompletionDate: '2023-05-30'
        };
        
        const insights = await generateProjectInsights(sampleProjectData);
        setAiInsights(insights);
        
      } catch (error) {
        console.error("Error fetching AI data:", error);
      }
    }
    
    fetchAIData();
  }, []);

  const handleSendMessage = () => {
    if (query.trim() === '') return;
    
    // Add user message
    setMessages([...messages, { role: 'user', content: query }]);
    setIsLoading(true);
    
    // Call the AI service
    generateContent({
      prompt: query,
      model: 'gpt-4o'
    }).then(response => {
      // Add AI response
      setMessages(current => [
        ...current, 
        { role: 'assistant', content: response.text }
      ]);
    }).catch(error => {
      console.error("Error generating AI response:", error);
      // Add error message
      setMessages(current => [
        ...current, 
        { role: 'assistant', content: "I'm sorry, I encountered an error processing your request." }
      ]);
    }).finally(() => {
      setIsLoading(false);
      setQuery('');
    });
  };

  const openPersistentAssistant = (withPrompt?: string) => {
    // Open the persistent AI assistant
    openAssistant();
    
    // If there's a prompt, we could theoretically pass it to the assistant
    // This would require extending the AIAssistantProvider functionality
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">AI Assistant</h1>
          <p className="text-muted-foreground">
            Get assistance with your work using powerful AI tools
          </p>
        </div>
        <div>
          <Button onClick={() => openPersistentAssistant()} variant="default">
            <FiCpu className="mr-2" /> Open AI Assistant
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="assistant">
        <TabsList className="mb-6">
          <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
          <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assistant">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>Ask questions or request help with your projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4 mb-4 max-h-96 overflow-y-auto">
                  {messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg ${
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground ml-12' 
                          : 'bg-muted mr-12'
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        {message.role === 'user' ? (
                          <FiUser className="mr-2" size={14} />
                        ) : (
                          <FiCpu className="mr-2" size={14} />
                        )}
                        <span className="text-xs font-semibold">
                          {message.role === 'user' ? 'You' : 'AI Assistant'}
                        </span>
                      </div>
                      {message.content}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="bg-muted p-3 rounded-lg mr-12">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message here..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button onClick={handleSendMessage} type="button" disabled={isLoading || !query.trim()}>
                    <FiSend className="mr-2" /> Send
                  </Button>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Need more advanced assistance? Use the persistent AI assistant by clicking the button below or pressing <kbd className="px-1 py-0.5 rounded bg-muted">Alt+A</kbd>
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-2" 
                    onClick={() => openPersistentAssistant()}
                  >
                    <FiMessageCircle className="mr-2" /> Open Persistent Assistant
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common AI Assistant tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => openPersistentAssistant("Generate a content calendar for my project")}
                  >
                    <FiCpu className="mr-2" /> Create Content Calendar
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => openPersistentAssistant("Analyze my brand for consistency")}
                  >
                    <FiCpu className="mr-2" /> Brand Consistency Analysis
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => openPersistentAssistant("Write social media posts for my brand")}
                  >
                    <FiCpu className="mr-2" /> Generate Social Media Content
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => openPersistentAssistant("Suggest improvements for my project")}
                  >
                    <FiCpu className="mr-2" /> Project Improvement Ideas
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => openPersistentAssistant("Create a project brief")}
                  >
                    <FiCpu className="mr-2" /> Generate Project Brief
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="usage">
          <AIUsageDashboard usage={usageStats} />
        </TabsContent>
        
        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Insights</CardTitle>
              <CardDescription>Automatically generated insights based on your project data</CardDescription>
            </CardHeader>
            <CardContent>
              {aiInsights ? (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Project Health Assessment</h3>
                    <div className="flex items-center mb-4">
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        aiInsights.health === 'on_track' ? 'bg-green-500' :
                        aiInsights.health === 'at_risk' ? 'bg-amber-500' :
                        'bg-red-500'
                      }`}></div>
                      <span className="font-medium">
                        {aiInsights.health === 'on_track' ? 'On Track' :
                         aiInsights.health === 'at_risk' ? 'At Risk' :
                         'Delayed'}
                      </span>
                    </div>
                    
                    <h4 className="font-medium mb-2">Key Insights:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {aiInsights.insights?.map((insight: any, index: number) => (
                        <li key={index}>
                          <span className="font-medium">{insight.title}</span>: {insight.description}
                          <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                            insight.impact === 'high' ? 'bg-red-100 text-red-800' :
                            insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {insight.impact.toUpperCase()}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <h4 className="font-medium mt-4 mb-2">Recommendations:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {aiInsights.recommendations?.map((rec: any, index: number) => (
                        <li key={index}>
                          <span className="font-medium">{rec.title}</span>: {rec.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button variant="outline">
                      <FiDownload className="mr-2" /> Export Insights
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FiCpu size={40} className="mx-auto mb-4 text-muted-foreground" />
                  <p>Generating insights...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Floating AI Assistant Button */}
      <AIQuickAccessButton position="floating" />
    </>
  );
} 