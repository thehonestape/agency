import React, { useState, useEffect, useRef } from 'react';
import { DashboardLayout } from "../components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { BrandContainer } from "../components/brand/BrandContainer";
import { BrandGrid } from "../components/brand/BrandGrid";
import { BrandHeading } from "../components/brand/BrandHeading";
import { BrandText } from "../components/brand/BrandText";
import { BrandSwitcher } from "../components/brand/BrandSwitcher";
import { useBrand } from "../components/brand/BrandProvider";
import { Alert, AlertDescription } from "../components/ui/alert";

// Import themed components
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

// Import AI components
import { AIQuickAccessButton } from "../components/ai/AIQuickAccessButton";

// Import icons
import { 
  FiPlus, 
  FiTrendingUp, 
  FiTrendingDown, 
  FiEye, 
  FiActivity, 
  FiMessageCircle, 
  FiCalendar, 
  FiClock,
  FiTarget,
  FiClipboard,
  FiInfo,
  FiBell,
  FiArrowRight,
  FiCheck,
  FiLayout,
  FiPenTool,
  FiGrid
} from "react-icons/fi";

import { DashboardNav } from "../components/dashboard/DashboardNav";

// Mock data for the dashboard
const mockBrands = [
  { id: '1', name: 'Acme Corp', lastUpdated: '2023-05-15', status: 'active' },
  { id: '2', name: 'Globex Industries', lastUpdated: '2023-05-10', status: 'active' },
  { id: '3', name: 'Cyberdyne Systems', lastUpdated: '2023-05-01', status: 'review' },
];

const mockProjects = [
  { id: '1', name: 'Website Redesign', brand: 'Acme Corp', phase: 'design', completion: 65 },
  { id: '2', name: 'Brand Guidelines', brand: 'Globex Industries', phase: 'definition', completion: 40 },
  { id: '3', name: 'Social Media Campaign', brand: 'Cyberdyne Systems', phase: 'discovery', completion: 20 },
];

const mockStats = {
  brands: 3,
  projects: 3,
  activeProjects: 2,
  completedProjects: 0,
};

// Mock data for brand health metrics
const brandHealth = [
  { label: 'Brand Recognition', value: 78, change: 12, trend: 'up' },
  { label: 'Brand Sentiment', value: 92, change: 8, trend: 'up' },
  { label: 'Consistency Score', value: 85, change: 5, trend: 'up' },
  { label: 'Market Position', value: 67, change: 3, trend: 'down' },
];

// Mock data for recent activity
const recentActivity = [
  { type: 'project', title: 'Brand Guidelines Updated', user: 'Alex', action: 'updated', time: '2 hours ago' },
  { type: 'asset', title: 'New Logo Uploaded', user: 'Sarah', action: 'created', time: '4 hours ago' },
  { type: 'project', title: 'Website Mockups Review', user: 'Mike', action: 'commented on', time: '1 day ago' },
  { type: 'asset', title: 'Brand Colors Updated', user: 'Jessica', action: 'modified', time: '2 days ago' },
  { type: 'project', title: 'Social Media Strategy', user: 'David', action: 'approved', time: '3 days ago' },
];

// Mock data for upcoming tasks
const upcomingTasks = [
  { title: 'Finalize brand guidelines', due: 'Tomorrow', priority: 'high' },
  { title: 'Review website mockups', due: 'in 2 days', priority: 'medium' },
  { title: 'Social media content approval', due: 'in 3 days', priority: 'medium' },
  { title: 'Client presentation prep', due: 'in 1 week', priority: 'low' },
];

// Mock data for AI suggestions
const aiSuggestions = [
  'Consider updating your color palette to improve accessibility scores.',
  'Your brand messaging shows inconsistencies across platforms.',
  'Schedule a team review of recent customer feedback for brand alignment.',
];

// Types for AI Chat
interface Message {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    text: "Hello! I'm your Brand AI Assistant. How can I help you with your branding today?",
    sender: 'ai',
    timestamp: new Date(),
  },
];

// AI response generator (mock)
const generateAIResponse = async (message: string): Promise<string> => {
  // In a real implementation, this would call an AI service
  const responses = [
    "I've analyzed your brand's performance across social channels, and I notice engagement is highest with visual content that incorporates your secondary color palette. Would you like to see some examples?",
    "Based on recent market trends, your competitors are shifting towards more minimalist design languages. Would you like me to suggest some updates to your visual identity that maintain your brand essence while incorporating these trends?",
    "I notice your brand messaging tends to focus on product features rather than emotional benefits. Research shows that emotional connections drive loyalty. Would you like me to suggest some new messaging approaches?",
    "Looking at your brand performance data, I see opportunities to strengthen your position in the eco-conscious segment. Would you like me to develop some sustainability-focused messaging options?",
    "Your target audience analysis shows growing engagement from Gen Z users. I can suggest some tone-of-voice adjustments that might resonate better with this demographic while staying true to your core brand values.",
  ];
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demo purposes, choose a random response
  return responses[Math.floor(Math.random() * responses.length)];
};

const Dashboard = () => {
  const { currentBrand, availableBrands } = useBrand();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isAITyping, setIsAITyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsAITyping(true);
    
    try {
      // Get AI response
      const aiResponseText = await generateAIResponse(inputMessage);
      
      // Add AI message
      const aiMessage: Message = {
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Add error message
      const errorMessage: Message = {
        text: "Sorry, I encountered an error processing your message. Please try again.",
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAITyping(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Agency Dashboard</h1>
            <p className="text-muted-foreground">Welcome to your agency management dashboard.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <a href="/components/showcase" className="flex items-center gap-2">
                <FiLayout className="h-4 w-4" />
                Component Showcase
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/style-tile" className="flex items-center gap-2">
                <FiPenTool className="h-4 w-4" />
                Style Tile
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/ui-blocks" className="flex items-center gap-2">
                <FiGrid className="h-4 w-4" />
                UI Blocks
              </a>
            </Button>
            <AIQuickAccessButton />
          </div>
        </div>
        
        <BrandContainer maxWidth="xl" padding="md">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Navigation sidebar for dashboard types */}
            <div className="md:w-1/4 lg:w-1/5">
              <Card>
                <CardContent className="pt-6">
                  <DashboardNav />
                </CardContent>
              </Card>
            </div>

            {/* Main dashboard content */}
            <div className="md:w-3/4 lg:w-4/5">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <BrandHeading level={1} size="xl">Dashboard</BrandHeading>
                  <BrandText color="muted">Welcome back! Here's an overview of your account.</BrandText>
                </div>
                <div className="flex items-center space-x-2">
                  <AIQuickAccessButton />
                  <Button variant="default">
                    <FiPlus className="mr-2" />
                    New Project
                  </Button>
                </div>
              </div>

              {!currentBrand && (
                <Alert variant="info" className="mb-8">
                  <FiInfo className="h-4 w-4" />
                  <AlertDescription className="ml-2">
                    <div className="font-medium">No brand selected</div>
                    <p className="mt-1">Please select a brand from the dropdown to see brand-specific styling and information.</p>
                    {availableBrands.length > 0 && (
                      <div className="mt-2 space-x-2">
                        {availableBrands.map(brand => (
                          <Button 
                            key={brand.slug} 
                            variant="outline" 
                            size="sm" 
                            onClick={() => useBrand().setBrandBySlug(brand.slug)}
                            className="mr-2 mb-2"
                          >
                            Use {brand.name}
                          </Button>
                        ))}
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              {/* Debug Info - Only show when a brand is selected */}
              {currentBrand && (
                <Card className="mb-8 bg-gray-50 dark:bg-gray-800 border-dashed border-2">
                  <CardHeader>
                    <CardTitle>Current Brand Information (Debug)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p><strong>Brand Name:</strong> {currentBrand.name}</p>
                      <p><strong>Brand Client:</strong> {currentBrand.client}</p>
                      <p><strong>Primary Color:</strong> {currentBrand.colors.find(c => c.isPrimary)?.value || 'None'}</p>
                      <div className="flex space-x-2">
                        <p><strong>Colors:</strong></p>
                        {currentBrand.colors.map((color, i) => (
                          <div 
                            key={i}
                            className="w-6 h-6 rounded border" 
                            style={{ backgroundColor: color.value }}
                            title={`${color.name}: ${color.value}`}
                          />
                        ))}
                      </div>
                      <p><strong>Typography:</strong> {currentBrand.typography.fontFamily}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* AI Quick Access Button (floating variant) */}
              <AIQuickAccessButton position="floating" />

              {/* Content only shown when a brand is selected */}
              {currentBrand ? (
                <>
                  {/* Brand Health Section */}
                  <BrandHeading level={3} className="mb-4 flex items-center">
                    <FiActivity className="mr-2" /> Brand Health
                  </BrandHeading>
                  <BrandGrid columns={4} gap="md" className="mb-8">
                    {brandHealth.map((metric) => (
                      <Card key={metric.label} className="bg-card text-card-foreground border shadow-sm">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start">
                            <BrandText size="sm" color="muted" className="font-medium">
                              {metric.label}
                            </BrandText>
                            {metric.trend === "up" ? (
                              <Badge variant="success" className="flex items-center">
                                <FiTrendingUp className="mr-1 h-3 w-3" /> {metric.change}%
                              </Badge>
                            ) : (
                              <Badge variant="warning" className="flex items-center">
                                <FiTrendingDown className="mr-1 h-3 w-3" /> {metric.change}%
                              </Badge>
                            )}
                          </div>
                          <div className="mt-2">
                            <BrandHeading level={3} className="text-3xl font-bold">
                              {metric.value}%
                            </BrandHeading>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </BrandGrid>

                  {/* Main Dashboard Content */}
                  <BrandGrid columns={3} gap="md">
                    {/* Recent Activity */}
                    <Card className="col-span-2 bg-card text-card-foreground border shadow-sm">
                      <CardHeader>
                        <CardTitle>
                          <div className="flex justify-between items-center">
                            <BrandHeading level={4} className="flex items-center">
                              <FiEye className="mr-2" /> Recent Activity
                            </BrandHeading>
                            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/90 hover:bg-primary/10">
                              View All <FiArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {recentActivity.map((activity, index) => (
                            <div 
                              key={index} 
                              className="flex items-start p-3 rounded-lg hover:bg-accent/10"
                            >
                              <div className={`
                                p-2 rounded-full mr-3
                                ${activity.type === 'project' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : ''}
                                ${activity.type === 'asset' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300' : ''}
                              `}>
                                {activity.type === 'project' && <FiClipboard className="h-4 w-4" />}
                                {activity.type === 'asset' && <FiEye className="h-4 w-4" />}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <BrandText size="sm" weight="medium">{activity.title}</BrandText>
                                  <BrandText size="xs" color="muted">{activity.time}</BrandText>
                                </div>
                                <BrandText size="xs" color="muted">
                                  {activity.user} {activity.action} this {activity.type}
                                </BrandText>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Upcoming Tasks */}
                      <Card className="bg-card text-card-foreground border shadow-sm">
                        <CardHeader>
                          <CardTitle>
                            <BrandHeading level={4} className="flex items-center">
                              <FiCalendar className="mr-2" /> Upcoming Tasks
                            </BrandHeading>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {upcomingTasks.map((task, index) => (
                              <div 
                                key={index} 
                                className="flex items-center p-2 rounded-lg hover:bg-accent/10"
                              >
                                <div className={`
                                  h-2 w-2 rounded-full mr-3 flex-shrink-0
                                  ${task.priority === 'high' ? 'bg-red-500' : ''}
                                  ${task.priority === 'medium' ? 'bg-yellow-500' : ''}
                                  ${task.priority === 'low' ? 'bg-green-500' : ''}
                                `} />
                                <div className="flex-1">
                                  <BrandText size="sm">{task.title}</BrandText>
                                  <div className="flex items-center">
                                    <FiClock className="h-3 w-3 text-muted-foreground mr-1" />
                                    <BrandText size="xs" color="muted">Due {task.due}</BrandText>
                                  </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary/90 hover:bg-primary/10">
                                  <FiCheck className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                          <Button variant="outline" size="sm" className="w-full mt-3 border-primary/20 text-primary hover:bg-primary/10">
                            View All Tasks
                          </Button>
                        </CardContent>
                      </Card>

                      {/* AI Suggestions */}
                      <Card className="border bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 shadow-sm">
                        <CardHeader className="pb-2">
                          <CardTitle>
                            <BrandHeading level={4} className="flex items-center text-blue-600 dark:text-blue-400">
                              <FiMessageCircle className="mr-2" /> AI Suggestions
                            </BrandHeading>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {aiSuggestions.map((suggestion, index) => (
                              <div 
                                key={index} 
                                className="flex items-start p-2 rounded-lg bg-card text-card-foreground shadow-sm"
                              >
                                <div className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 p-1 rounded-full mr-2 flex-shrink-0">
                                  <FiBell className="h-3 w-3" />
                                </div>
                                <BrandText size="sm">{suggestion}</BrandText>
                              </div>
                            ))}
                          </div>
                          <Button variant="outline" size="sm" className="w-full mt-3 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50">
                            Get More Insights
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </BrandGrid>
                </>
              ) : (
                <Card className="bg-card text-card-foreground p-8 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <FiEye className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="mb-2">Select a Brand to Continue</CardTitle>
                  <CardContent className="p-0 mb-6">
                    <p className="text-muted-foreground">
                      Choose a brand from the dropdown above to see brand-specific dashboard data and styling.
                    </p>
                  </CardContent>
                  <div className="flex justify-center gap-4 flex-wrap">
                    {availableBrands.map(brand => (
                      <Button 
                        key={brand.slug} 
                        variant="outline" 
                        onClick={() => useBrand().setBrandBySlug(brand.slug)}
                      >
                        Use {brand.name}
                      </Button>
                    ))}
                  </div>
                </Card>
              )}

              {/* AI Chat Panel */}
              <div className="w-full md:w-1/3">
                <div className="bg-[hsl(var(--card))] rounded-lg shadow-sm border border-system h-[calc(100vh-10rem)] flex flex-col">
                  <div className="p-4 border-b border-system flex justify-between items-center">
                    <h3 className="font-medium">Brand AI Assistant</h3>
                    <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                      Online
                    </span>
                  </div>
                  
                  {/* Messages Container */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message, index) => (
                      <div 
                        key={index}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-3/4 p-3 rounded-lg ${
                            message.sender === 'user' 
                              ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' 
                              : 'bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]'
                          }`}
                        >
                          <p>{message.text}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isAITyping && (
                      <div className="flex justify-start">
                        <div className="bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-[hsl(var(--foreground))] rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-[hsl(var(--foreground))] rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-[hsl(var(--foreground))] rounded-full animate-bounce delay-200"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  
                  {/* Input Form */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-system">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Ask about your brand..."
                        className="flex-1 px-3 py-2 bg-[hsl(var(--background))] border border-system rounded-md focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
                      />
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-md"
                        disabled={isAITyping}
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </BrandContainer>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard; 