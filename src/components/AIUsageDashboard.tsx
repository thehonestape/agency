import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart, LineChart, DonutChart } from '@tremor/react';
import { PromptHistory, calculateAICost } from '../services/aiService';

// Define the interface for usage stats
export interface AIUsageStats {
  totalQueries: number;
  totalTokens: number;
  estimatedCost: number;
  history: any[]; // In a real app, this would be strongly typed
}

interface AIUsageDashboardProps {
  usage?: AIUsageStats;
}

export function AIUsageDashboard({ usage }: AIUsageDashboardProps) {
  const [usageData, setUsageData] = useState<any[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user ID for testing - will be replaced with actual user ID from auth
  const mockUserId = 'test-user-id';

  useEffect(() => {
    // If usage data is provided as props, use it
    if (usage) {
      setTotalCost(usage.estimatedCost);
      setIsLoading(false);
      return;
    }
    
    // Otherwise, generate mock data for demo purposes
    const generateMockUsage = () => {
      const today = new Date();
      const mockData = [];
      
      // Generate 14 days of mock data
      for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Randomize the model used
        const models = ['gpt-3.5-turbo', 'gpt-4o', 'claude-3-opus', 'claude-3-sonnet'];
        const model = models[Math.floor(Math.random() * models.length)];
        
        // Generate random token counts
        const promptTokens = Math.floor(Math.random() * 500) + 100;
        const completionTokens = Math.floor(Math.random() * 1000) + 200;
        
        // Calculate cost
        const cost = calculateAICost(model, promptTokens, completionTokens);
        
        mockData.push({
          id: `usage-${i}`,
          user_id: mockUserId,
          model,
          prompt_tokens: promptTokens,
          completion_tokens: completionTokens,
          total_tokens: promptTokens + completionTokens,
          cost,
          created_at: date.toISOString(),
          date: date.toLocaleDateString()
        });
      }
      
      return mockData;
    };
    
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // For demo, use mock data
        const mockUsageData = generateMockUsage();
        const mockTotalCost = mockUsageData.reduce((sum, item) => sum + parseFloat(item.cost.toString()), 0);
        
        setUsageData(mockUsageData);
        setTotalCost(mockTotalCost);
      } catch (error) {
        console.error('Error fetching AI usage data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [usage]);
  
  // Determine which data to use
  const displayData = usage?.history?.length ? usage.history : usageData;
  
  // Prepare chart data
  const dailyUsageData = displayData.reduce((acc: Record<string, any>[], item) => {
    // Extract date from the item - the field name might be different depending on the data source
    const itemDate = item.date || new Date(item.created_at || item.timestamp).toLocaleDateString();
    
    const existingDay = acc.find(day => day.date === itemDate);
    
    if (existingDay) {
      existingDay.tokens += item.total_tokens || 0;
      existingDay.cost += parseFloat((item.cost || 0).toString());
    } else {
      acc.push({
        date: itemDate,
        tokens: item.total_tokens || 0,
        cost: parseFloat((item.cost || 0).toString())
      });
    }
    
    return acc;
  }, []).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Model usage breakdown
  const modelUsage = displayData.reduce((acc: Record<string, any>[], item) => {
    const modelName = item.model || 'unknown';
    const existingModel = acc.find(model => model.name === modelName);
    
    if (existingModel) {
      existingModel.cost += parseFloat((item.cost || 0).toString());
      existingModel.tokens += item.total_tokens || 0;
    } else {
      acc.push({
        name: modelName,
        cost: parseFloat((item.cost || 0).toString()),
        tokens: item.total_tokens || 0
      });
    }
    
    return acc;
  }, []);
  
  // Helper to calculate total tokens in the data
  const calculateTotalTokens = () => {
    if (usage?.totalTokens) return usage.totalTokens;
    return displayData.reduce((sum, item) => sum + (item.total_tokens || 0), 0);
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>AI Usage Dashboard</CardTitle>
        <CardDescription>
          Track your AI API usage and costs
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p>Loading usage data...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">
                    ${usage?.estimatedCost.toFixed(2) || totalCost.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total AI costs</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">
                    {calculateTotalTokens().toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total tokens used</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">
                    {usage?.totalQueries || displayData.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Total AI requests</div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="cost">
              <TabsList className="mb-4">
                <TabsTrigger value="cost">Cost Over Time</TabsTrigger>
                <TabsTrigger value="tokens">Token Usage</TabsTrigger>
                <TabsTrigger value="models">Model Breakdown</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cost">
                <Card>
                  <CardHeader>
                    <CardTitle>Daily AI Costs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {dailyUsageData.length > 0 ? (
                      <LineChart
                        data={dailyUsageData}
                        index="date"
                        categories={["cost"]}
                        colors={["indigo"]}
                        valueFormatter={(value) => `$${value.toFixed(2)}`}
                        showLegend={false}
                        className="h-72"
                      />
                    ) : (
                      <div className="flex justify-center items-center h-72 text-muted-foreground">
                        No usage data available
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="tokens">
                <Card>
                  <CardHeader>
                    <CardTitle>Daily Token Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {dailyUsageData.length > 0 ? (
                      <BarChart
                        data={dailyUsageData}
                        index="date"
                        categories={["tokens"]}
                        colors={["blue"]}
                        valueFormatter={(value) => value.toLocaleString()}
                        showLegend={false}
                        className="h-72"
                      />
                    ) : (
                      <div className="flex justify-center items-center h-72 text-muted-foreground">
                        No token usage data available
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="models">
                <Card>
                  <CardHeader>
                    <CardTitle>Cost by Model</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {modelUsage.length > 0 ? (
                      <DonutChart
                        data={modelUsage}
                        index="name"
                        category="cost"
                        valueFormatter={(value) => `$${value.toFixed(2)}`}
                        className="h-72"
                      />
                    ) : (
                      <div className="flex justify-center items-center h-72 text-muted-foreground">
                        No model usage data available
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="text-xs text-muted-foreground mt-2">
              <p>
                This dashboard shows your AI usage patterns and associated costs.
                Monitor your usage to optimize costs and improve efficiency.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 