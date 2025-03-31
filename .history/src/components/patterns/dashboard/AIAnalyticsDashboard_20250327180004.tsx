import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Text, 
  Metric, 
  Flex, 
  Tab, 
  TabGroup, 
  TabList, 
  TabPanel, 
  TabPanels,
  AreaChart,
  BarChart,
  Title,
  Subtitle,
  DonutChart,
  Legend,
  Grid,
  Badge
} from '@tremor/react';
import { FiCode, FiDollarSign, FiCpu, FiBarChart2, FiClock, FiAlertCircle, FiZap } from 'react-icons/fi';
import { supabase } from "../../../lib/supabase";
import { getAIUsageMetrics, AIUsageMetrics, getUserEvents } from '../services';

// Mock data for the charts when real data isn't available yet
const mockMonthlyData = [
  { month: 'Jan', tokens: 12000, cost: 0.24 },
  { month: 'Feb', tokens: 15000, cost: 0.30 },
  { month: 'Mar', tokens: 21000, cost: 0.42 },
  { month: 'Apr', tokens: 18000, cost: 0.36 },
  { month: 'May', tokens: 24000, cost: 0.48 },
  { month: 'Jun', tokens: 30000, cost: 0.60 },
];

const mockModelData = [
  { model: 'gpt-3.5-turbo', value: 60 },
  { model: 'gpt-4o', value: 25 },
  { model: 'claude-3-sonnet', value: 10 },
  { model: 'claude-3-opus', value: 5 },
];

const mockPromptTypeData = [
  { name: 'Content Ideas', value: 35 },
  { name: 'Project Description', value: 25 },
  { name: 'Next Steps', value: 20 },
  { name: 'Improve Artifact', value: 15 },
  { name: 'Project Insights', value: 5 },
];

interface AIAnalyticsDashboardProps {
  userId?: string;
}

export function AIAnalyticsDashboard({ userId }: AIAnalyticsDashboardProps) {
  const [usageMetrics, setUsageMetrics] = useState<AIUsageMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState<any[]>(mockMonthlyData);
  const [modelData, setModelData] = useState<any[]>(mockModelData);
  const [promptTypeData, setPromptTypeData] = useState<any[]>(mockPromptTypeData);
  const [hasRealData, setHasRealData] = useState(false);

  useEffect(() => {
    const loadAnalyticsData = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        // Get user metrics
        const metrics = await getAIUsageMetrics(userId);
        
        if (metrics) {
          setUsageMetrics(metrics);
          setHasRealData(true);
          
          // Load monthly data
          const { data: monthlyUsage, error: monthlyError } = await supabase
            .from('monthly_ai_usage_summary')
            .select('month, total_tokens, total_cost, total_requests')
            .eq('user_id', userId)
            .order('month', { ascending: true })
            .limit(6);
            
          if (!monthlyError && monthlyUsage && monthlyUsage.length > 0) {
            const formattedMonthly = monthlyUsage.map(item => ({
              month: new Date(item.month).toLocaleString('default', { month: 'short' }),
              tokens: item.total_tokens,
              cost: parseFloat(item.total_cost)
            }));
            setMonthlyData(formattedMonthly);
          }
          
          // Generate model distribution data
          if (metrics.most_used_model !== 'unknown') {
            // This is just a simplified example. In a real app, you'd query for the full distribution
            const mockDistribution = [
              { model: metrics.most_used_model, value: 60 },
              { model: 'gpt-3.5-turbo', value: 25 },
              { model: 'claude-3-sonnet', value: 15 }
            ];
            setModelData(mockDistribution);
          }
          
          // Generate prompt type distribution
          if (metrics.most_common_prompt_type !== 'unknown') {
            // This is just a simplified example
            const mockPromptDist = [
              { name: metrics.most_common_prompt_type, value: 40 },
              { name: 'Content Ideas', value: 30 },
              { name: 'Project Insights', value: 20 },
              { name: 'Next Steps', value: 10 }
            ];
            setPromptTypeData(mockPromptDist);
          }
        }
      } catch (error) {
        console.error('Error loading analytics data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalyticsData();
  }, [userId]);

  return (
    <div className="space-y-6">
      <TabGroup>
        <TabList>
          <Tab>Usage Overview</Tab>
          <Tab>Model Performance</Tab>
          <Tab>Cost Analysis</Tab>
        </TabList>
        
        <TabPanels>
          {/* Usage Overview Panel */}
          <TabPanel>
            <div className="mt-6">
              <Grid numItems={1} numItemsMd={2} numItemsLg={3} className="gap-6">
                {/* Total Prompts Card */}
                <Card decoration="top" decorationColor="blue">
                  <Flex alignItems="center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FiCode className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <Text>Total AI Prompts</Text>
                      <Metric>{usageMetrics ? usageMetrics.total_prompts : '0'}</Metric>
                    </div>
                  </Flex>
                  {!hasRealData && (
                    <Text className="text-xs text-gray-500 mt-2">
                      Using demo data - actual usage will appear here once available
                    </Text>
                  )}
                </Card>
                
                {/* Token Usage Card */}
                <Card decoration="top" decorationColor="purple">
                  <Flex alignItems="center">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <FiCpu className="h-6 w-6 text-purple-500" />
                    </div>
                    <div className="ml-3">
                      <Text>Total Tokens Used</Text>
                      <Metric>
                        {usageMetrics 
                          ? `${(usageMetrics.total_tokens / 1000).toFixed(1)}K` 
                          : `${(mockMonthlyData.reduce((sum, item) => sum + item.tokens, 0) / 1000).toFixed(1)}K`}
                      </Metric>
                    </div>
                  </Flex>
                  {!hasRealData && (
                    <Text className="text-xs text-gray-500 mt-2">
                      Using demo data - actual usage will appear here once available
                    </Text>
                  )}
                </Card>
                
                {/* Cost Card */}
                <Card decoration="top" decorationColor="green">
                  <Flex alignItems="center">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <FiDollarSign className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <Text>Estimated Cost</Text>
                      <Metric>
                        ${usageMetrics 
                          ? usageMetrics.estimated_cost.toFixed(2) 
                          : mockMonthlyData.reduce((sum, item) => sum + item.cost, 0).toFixed(2)}
                      </Metric>
                    </div>
                  </Flex>
                  {!hasRealData && (
                    <Text className="text-xs text-gray-500 mt-2">
                      Using demo data - actual costs will appear here once available
                    </Text>
                  )}
                </Card>
              </Grid>
              
              {/* Monthly Trend Chart */}
              <Card className="mt-6">
                <Title>Monthly AI Usage Trend</Title>
                <Subtitle>Token consumption and cost over time</Subtitle>
                
                <AreaChart
                  className="mt-6 h-72"
                  data={monthlyData}
                  index="month"
                  categories={["tokens"]}
                  colors={["blue"]}
                  valueFormatter={(value) => `${value.toLocaleString()} tokens`}
                  showLegend={false}
                />
                
                <AreaChart
                  className="mt-6 h-72"
                  data={monthlyData}
                  index="month"
                  categories={["cost"]}
                  colors={["green"]}
                  valueFormatter={(value) => `$${value.toFixed(2)}`}
                  showLegend={false}
                />
                
                {!hasRealData && (
                  <div className="mt-2 text-center">
                    <Badge icon={FiAlertCircle} color="amber">Using Demo Data</Badge>
                  </div>
                )}
              </Card>
            </div>
          </TabPanel>
          
          {/* Model Performance Panel */}
          <TabPanel>
            <div className="mt-6">
              <Grid numItems={1} numItemsMd={2} className="gap-6">
                {/* Model Distribution */}
                <Card>
                  <Title>AI Model Distribution</Title>
                  <Subtitle>Usage breakdown by model</Subtitle>
                  
                  <DonutChart
                    className="mt-6"
                    data={modelData}
                    category="value"
                    index="model"
                    valueFormatter={(value) => `${value}%`}
                    colors={["blue", "cyan", "indigo", "violet"]}
                  />
                  
                  <Legend
                    className="mt-3"
                    categories={modelData.map(item => item.model)}
                    colors={["blue", "cyan", "indigo", "violet"]}
                  />
                  
                  {!hasRealData && (
                    <div className="mt-2 text-center">
                      <Badge icon={FiAlertCircle} color="amber">Using Demo Data</Badge>
                    </div>
                  )}
                </Card>
                
                {/* Prompt Type Distribution */}
                <Card>
                  <Title>Prompt Type Distribution</Title>
                  <Subtitle>Usage breakdown by prompt category</Subtitle>
                  
                  <DonutChart
                    className="mt-6"
                    data={promptTypeData}
                    category="value"
                    index="name"
                    valueFormatter={(value) => `${value}%`}
                    colors={["emerald", "green", "lime", "amber", "orange"]}
                  />
                  
                  <Legend
                    className="mt-3"
                    categories={promptTypeData.map(item => item.name)}
                    colors={["emerald", "green", "lime", "amber", "orange"]}
                  />
                  
                  {!hasRealData && (
                    <div className="mt-2 text-center">
                      <Badge icon={FiAlertCircle} color="amber">Using Demo Data</Badge>
                    </div>
                  )}
                </Card>
              </Grid>
              
              {/* Most Used Model */}
              <Card className="mt-6">
                <Flex alignItems="center">
                  <div>
                    <Title>Most Used AI Model</Title>
                    <Subtitle>Based on your usage history</Subtitle>
                  </div>
                  <Badge color="blue">
                    {usageMetrics ? usageMetrics.most_used_model : modelData[0].model}
                  </Badge>
                </Flex>
                
                <div className="mt-6 space-y-3">
                  <div>
                    <Flex justifyContent="between">
                      <Text>Response Quality</Text>
                      <Text>92%</Text>
                    </Flex>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <Flex justifyContent="between">
                      <Text>Cost Efficiency</Text>
                      <Text>78%</Text>
                    </Flex>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <Flex justifyContent="between">
                      <Text>Speed</Text>
                      <Text>95%</Text>
                    </Flex>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: "95%" }}></div>
                    </div>
                  </div>
                </div>
                
                {!hasRealData && (
                  <div className="mt-4 text-center">
                    <Badge icon={FiAlertCircle} color="amber">Using Demo Data</Badge>
                  </div>
                )}
              </Card>
            </div>
          </TabPanel>
          
          {/* Cost Analysis Panel */}
          <TabPanel>
            <div className="mt-6">
              <Card>
                <Title>Cost Breakdown</Title>
                <Subtitle>AI spending by model</Subtitle>
                
                <BarChart
                  className="mt-6 h-80"
                  data={[
                    { model: "GPT-3.5 Turbo", cost: 0.24 },
                    { model: "GPT-4o", cost: 0.68 },
                    { model: "Claude-3-Sonnet", cost: 0.32 },
                    { model: "Claude-3-Opus", cost: 0.16 }
                  ]}
                  index="model"
                  categories={["cost"]}
                  colors={["green"]}
                  valueFormatter={(value) => `$${value.toFixed(2)}`}
                />
                
                {!hasRealData && (
                  <div className="mt-2 text-center">
                    <Badge icon={FiAlertCircle} color="amber">Using Demo Data</Badge>
                  </div>
                )}
              </Card>
              
              <Card className="mt-6">
                <Title>Cost Projection</Title>
                <Subtitle>Estimated spending for the next 3 months</Subtitle>
                
                <div className="mt-6 p-4 border rounded-lg">
                  <Flex justifyContent="between" alignItems="center">
                    <div>
                      <Text>Current Monthly Rate</Text>
                      <Metric>$1.40</Metric>
                    </div>
                    <div>
                      <Text>Projected Q2 Total</Text>
                      <Metric>$4.20</Metric>
                    </div>
                    <div>
                      <Text className="text-green-600">Savings Opportunity</Text>
                      <Metric className="text-green-600">$0.85</Metric>
                    </div>
                  </Flex>
                </div>
                
                <div className="mt-6">
                  <Title>Cost Optimization Recommendations</Title>
                  <div className="mt-3 space-y-4">
                    <div className="p-3 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                      <Text className="font-medium">Use GPT-3.5 Turbo for initial drafts</Text>
                      <Text className="text-sm mt-1">
                        For many initial content generation tasks, GPT-3.5 Turbo provides good results at 10% of the cost of GPT-4.
                      </Text>
                    </div>
                    
                    <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                      <Text className="font-medium">Optimize prompt design</Text>
                      <Text className="text-sm mt-1">
                        More specific prompts tend to generate better results with fewer tokens. Consider refining your most frequently used prompts.
                      </Text>
                    </div>
                    
                    <div className="p-3 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
                      <Text className="font-medium">Cache common responses</Text>
                      <Text className="text-sm mt-1">
                        For frequently asked questions or common tasks, consider implementing a caching system to avoid redundant API calls.
                      </Text>
                    </div>
                  </div>
                </div>
                
                {!hasRealData && (
                  <div className="mt-4 text-center">
                    <Badge icon={FiAlertCircle} color="amber">Using Demo Data</Badge>
                  </div>
                )}
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
} 