import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Flex,
  Grid,
  Metric,
  ProgressBar,
  Text,
  Title,
  Badge,
  Card as TremorCard,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Button,
  Divider,
  BarChart, 
  LineChart, 
  DonutChart, 
  Legend
} from '@/components/ui/tremor';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PromptHistory, calculateAICost } from '@/services/aiService';

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
  const [dailyUsageData, setDailyUsageData] = useState<any[]>([]);
  const [modelUsage, setModelUsage] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);

  // If usage prop is not provided, generate mock data
  useEffect(() => {
    if (usage) {
      setDisplayData(usage.history || []);
      setIsLoading(false);
    } else {
      // Generate mock data after a delay to simulate loading
      const timer = setTimeout(() => {
        const mockData = generateMockUsage();
        setDisplayData(mockData);
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [usage]);

  // Generate mock usage data for demo purposes
  const generateMockUsage = () => {
    const models = [
      'gpt-4-turbo',
      'gpt-4-vision',
      'gpt-3.5-turbo',
      'claude-3-opus',
      'claude-3-sonnet',
    ];
    const dates = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    });

    return dates.flatMap((date) =>
      Array.from({ length: Math.floor(Math.random() * 10) }, () => {
        const model = models[Math.floor(Math.random() * models.length)];
        const promptTokens = Math.floor(Math.random() * 1500) + 150;
        const completionTokens = Math.floor(Math.random() * 3500) + 350;
        const tokens = promptTokens + completionTokens;
        const cost = calculateAICost(model, promptTokens, completionTokens);
        return {
          id: `${date}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date(date).getTime(),
          date,
          model,
          prompt_tokens: promptTokens,
          completion_tokens: completionTokens,
          total_tokens: tokens,
          cost,
        };
      })
    );
  };

  // Process data for visualizations
  useEffect(() => {
    if (displayData.length === 0) return;

    // Calculate costs by day
    const usageByDay = displayData.reduce((acc: Record<string, any>, item: any) => {
      const date = item.date || new Date(item.timestamp).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = {
          date,
          cost: 0,
          tokens: 0,
        };
      }
      acc[date].cost += parseFloat((item.cost || 0).toString());
      acc[date].tokens += item.total_tokens || 0;
      return acc;
    }, {});

    // Convert to array and sort by date
    const sortedData = Object.values(usageByDay).sort((a: any, b: any) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    setDailyUsageData(sortedData);

    // Calculate total cost
    const cost = displayData.reduce(
      (sum: number, item: any) => sum + parseFloat((item.cost || 0).toString()),
      0
    );
    setTotalCost(cost);

    // Calculate usage by model
    const byModel = displayData.reduce((acc: Record<string, any>, item: any) => {
      const modelName = item.model || 'unknown';
      if (!acc[modelName]) {
        acc[modelName] = {
          name: modelName,
          cost: 0,
          tokens: 0,
        };
      }
      acc[modelName].cost += parseFloat((item.cost || 0).toString());
      acc[modelName].tokens += item.total_tokens || 0;
      return acc;
    }, {});

    setModelUsage(Object.values(byModel));
  }, [displayData]);

  // Async function to fetch data in a real app
  const fetchData = async () => {
    try {
      setIsLoading(true);
      // In a real app, fetch data from your API
      // const response = await fetch('/api/ai-usage');
      // const data = await response.json();
      // setDisplayData(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching AI usage data:', error);
      setIsLoading(false);
    }
  };

  // Transform display data for usage by API
  const transformDataByAPI = () => {
    const apiUsage: Record<string, number> = {};

    for (const item of displayData) {
      const modelName = item.model || 'unknown';
      if (!apiUsage[modelName]) {
        apiUsage[modelName] = 0;
      }
      apiUsage[modelName] += parseFloat((item.cost || 0).toString());
    }

    return Object.entries(apiUsage).map(([modelName, cost]) => ({
      name: modelName,
      cost: parseFloat(cost.toString()),
      tokens: displayData
        .filter(dataItem => dataItem.model === modelName)
        .reduce((sum, dataItem) => sum + (dataItem.total_tokens || 0), 0)
    }));
  };

  // Helper to calculate total tokens in the data
  const calculateTotalTokens = () => {
    if (usage?.totalTokens) return usage.totalTokens;
    return displayData.reduce((sum, item) => sum + (item.total_tokens || 0), 0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Usage Dashboard</CardTitle>
        <CardDescription>Track your AI API usage and costs</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-40 items-center justify-center">
            <p>Loading usage data...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card className="bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total AI Costs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${usage?.estimatedCost.toFixed(2) || totalCost.toFixed(2)}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Tokens Used
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {calculateTotalTokens().toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total AI Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {usage?.totalQueries || displayData.length}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="cost" className="mt-6">
              <TabsList className="mb-4 w-full justify-start">
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
                        categories={['cost']}
                        colors={['cyan']}
                        valueFormatter={(value) => `$${value.toFixed(2)}`}
                        showLegend={false}
                        className="h-72"
                        showGridLines={true}
                        curveType="monotone"
                        showXAxis={true}
                        showYAxis={true}
                        yAxisWidth={60}
                        showAnimation={true}
                        connectNulls={true}
                      />
                    ) : (
                      <div className="flex h-72 items-center justify-center text-muted-foreground">
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
                        categories={['tokens']}
                        colors={['lime']}
                        valueFormatter={(value) => value.toLocaleString()}
                        showLegend={false}
                        className="h-72"
                        showGridLines={true}
                        showXAxis={true}
                        showYAxis={true}
                        yAxisWidth={60}
                        showAnimation={true}
                      />
                    ) : (
                      <div className="flex h-72 items-center justify-center text-muted-foreground">
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
                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div>
                          <DonutChart
                            data={modelUsage}
                            index="name"
                            category="cost"
                            valueFormatter={(value) => `$${value.toFixed(2)}`}
                            className="h-72"
                            colors={["cyan", "sky", "lime", "yellow"]}
                            showAnimation={true}
                            variant="pie"
                          />
                        </div>
                        <div className="flex items-center">
                          <Legend 
                            categories={modelUsage.map(model => model.name)}
                            colors={["cyan", "sky", "lime", "yellow"]}
                            className="w-full"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-72 items-center justify-center text-muted-foreground">
                        No model usage data available
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-4 text-sm text-muted-foreground">
              <p>
                This dashboard shows your AI usage patterns and associated costs. Monitor your usage
                to optimize costs and improve efficiency.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
