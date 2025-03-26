import React, { useState, useEffect, useRef } from 'react';
import { DashboardLayout } from "../components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { AiFallbackMessage } from '../components/AiFallbackMessage';
import { aiService } from '../services/aiService';

// Types for AI Chat
interface Message {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  uiComponent?: ChatUIComponent;
}

// Chat UI Component types
type ChatUIComponentType = 'color-picker' | 'image-gallery' | 'logo-generator' | 'font-selector' | 'template-picker';

interface ChatUIComponent {
  type: ChatUIComponentType;
  props: any;
}

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

// Sample logos for demonstration
const sampleLogos = [
  'https://assets.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e3a57bdb3717fbf9cec_AbilityTree_Logo.svg',
  'https://assets.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e3957bdb34208bf9cea_Millshop_Logo.svg',
  'https://assets.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e395e02d57466e7c224_WaveLine_Logo.svg',
  'https://assets.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e391e2f6a1bc2d64a99_Digitalmason_Logo.svg',
  'https://assets.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e39fbcd22e2a1b6ee2c_SmallWorld_Logo.svg',
  'https://assets.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e3905c6a62ce274d20f_Lighthouse_Logo.svg',
];

// Sample color palettes for color picker
const colorPalettes = [
  ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE'],
  ['#DB2777', '#EC4899', '#F472B6', '#F9A8D4', '#FBCFE8', '#FCE7F3'],
  ['#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0', '#D1FAE5'],
  ['#D97706', '#F59E0B', '#FBBF24', '#FCD34D', '#FDE68A', '#FEF3C7'],
  ['#7C3AED', '#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE', '#EDE9FE'],
];

// Sample fonts for font selector
const sampleFonts = [
  { name: 'Montserrat', category: 'sans-serif', preview: 'The quick brown fox jumps over the lazy dog' },
  { name: 'Playfair Display', category: 'serif', preview: 'The quick brown fox jumps over the lazy dog' },
  { name: 'Roboto', category: 'sans-serif', preview: 'The quick brown fox jumps over the lazy dog' },
  { name: 'Lora', category: 'serif', preview: 'The quick brown fox jumps over the lazy dog' },
  { name: 'Open Sans', category: 'sans-serif', preview: 'The quick brown fox jumps over the lazy dog' },
];

const initialMessages: Message[] = [
  {
    text: "Hello! I'm your Brand AI Assistant. I can help you with brand strategy, visual identity, content messaging, market trends, social media strategies, and project management. Try asking me specific questions like:\n\n- What should our brand positioning focus on?\n- Show me some logo options\n- Let me pick brand colors\n- Help me choose a font\n- What content strategy would you recommend?",
    sender: 'ai',
    timestamp: new Date(),
  },
];

// AI response generator with aiService
const generateAIResponse = async (message: string): Promise<Message> => {
  try {
    // First, check if this is a request for a UI component
    const lowerMessage = message.toLowerCase();
    
    // Detect requests for logos
    if (lowerMessage.includes('logo') && 
        (lowerMessage.includes('show') || lowerMessage.includes('generate') || 
         lowerMessage.includes('create') || lowerMessage.includes('options'))) {
      return {
        text: "Here are some logo options I've selected. Click any logo to see it in more detail, or click 'Generate More' to see additional options.",
        sender: 'ai',
        timestamp: new Date(),
        uiComponent: {
          type: 'logo-generator',
          props: { logos: sampleLogos }
        }
      };
    }
    
    // Detect requests for color pickers
    if (lowerMessage.includes('color') && 
        (lowerMessage.includes('pick') || lowerMessage.includes('palette') || 
         lowerMessage.includes('scheme') || lowerMessage.includes('choose'))) {
      return {
        text: "Here are some color palette options that might work for your brand. You can click on any color to copy its hex code, or select an entire palette.",
        sender: 'ai',
        timestamp: new Date(),
        uiComponent: {
          type: 'color-picker',
          props: { palettes: colorPalettes }
        }
      };
    }
    
    // Detect requests for font selection
    if (lowerMessage.includes('font') && 
        (lowerMessage.includes('pick') || lowerMessage.includes('select') || 
         lowerMessage.includes('choose') || lowerMessage.includes('typography'))) {
      return {
        text: "Here are some font options that might work well for your brand. You can see previews of each font and how they might look in your content.",
        sender: 'ai',
        timestamp: new Date(),
        uiComponent: {
          type: 'font-selector',
          props: { fonts: sampleFonts }
        }
      };
    }
    
    // Default to regular text response
    const response = await aiService.generateContent({
      prompt: message,
      context: {
        systemPrompt: "You are a helpful AI assistant for a creative agency. Provide concise, helpful responses about brand management and marketing."
      }
    });
    
    return {
      text: response.text,
      sender: 'ai',
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Error generating AI response:', error);
    return {
      text: "Sorry, I encountered an error processing your message. Please try again.",
      sender: 'ai',
      timestamp: new Date()
    };
  }
};

// Component to render logo options in chat
const LogoGenerator = ({ logos, onSelect }: { logos: string[], onSelect?: (logo: string) => void }) => {
  return (
    <div className="mt-4 mb-2">
      <div className="grid grid-cols-3 gap-2">
        {logos.map((logo, index) => (
          <div 
            key={index} 
            className="bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-center justify-center h-24"
            onClick={() => onSelect && onSelect(logo)}
          >
            <img src={logo} alt={`Logo option ${index + 1}`} className="max-w-full max-h-full" />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between">
        <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md">
          Generate More
        </button>
        <button className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-md">
          Download Selected
        </button>
      </div>
    </div>
  );
};

// Component to render color palette picker in chat
const ColorPicker = ({ palettes, onSelect }: { palettes: string[][], onSelect?: (palette: string[]) => void }) => {
  return (
    <div className="mt-4 mb-2">
      <div className="space-y-3">
        {palettes.map((palette, paletteIndex) => (
          <div 
            key={paletteIndex} 
            className="flex rounded-md overflow-hidden hover:ring-2 hover:ring-primary transition-all cursor-pointer"
            onClick={() => onSelect && onSelect(palette)}
          >
            {palette.map((color, colorIndex) => (
              <div 
                key={colorIndex} 
                className="h-10 flex-1" 
                style={{ backgroundColor: color }}
                title={color}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3">
        <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md">
          Generate Custom Palette
        </button>
      </div>
    </div>
  );
};

// Component to render font selection in chat
const FontSelector = ({ fonts, onSelect }: { fonts: any[], onSelect?: (font: any) => void }) => {
  return (
    <div className="mt-4 mb-2">
      <div className="space-y-3">
        {fonts.map((font, index) => (
          <div 
            key={index} 
            className="p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelect && onSelect(font)}
          >
            <div className="text-sm text-muted-foreground mb-1">{font.name} ({font.category})</div>
            <div className="text-base" style={{ fontFamily: font.name }}>
              {font.preview}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md">
          See More Fonts
        </button>
      </div>
    </div>
  );
};

// Component to render the appropriate UI component based on type
const ChatUIComponentRenderer = ({ component, onAction }: { component: ChatUIComponent, onAction?: (action: string, data: any) => void }) => {
  switch (component.type) {
    case 'logo-generator':
      return <LogoGenerator 
        logos={component.props.logos} 
        onSelect={(logo) => onAction && onAction('select-logo', logo)} 
      />;
    case 'color-picker':
      return <ColorPicker 
        palettes={component.props.palettes} 
        onSelect={(palette) => onAction && onAction('select-palette', palette)} 
      />;
    case 'font-selector':
      return <FontSelector 
        fonts={component.props.fonts} 
        onSelect={(font) => onAction && onAction('select-font', font)} 
      />;
    default:
      return null;
  }
};

const AIChatDashboard = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isAITyping, setIsAITyping] = useState(false);
  const [showFallbackMessage, setShowFallbackMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Check if Ollama is available
  useEffect(() => {
    // After a short delay, check if we're using fallback mode
    const checkAiStatus = setTimeout(() => {
      const isUsingFallback = window.localStorage.getItem('ai_using_fallback') === 'true';
      setShowFallbackMessage(isUsingFallback);
    }, 1000);
    
    return () => clearTimeout(checkAiStatus);
  }, []);
  
  // Handle retrying Ollama connection
  const handleRetryConnection = async () => {
    setShowFallbackMessage(false);
    try {
      await import('../services/aiService').then(module => {
        module.checkOllamaStatus().then((available: boolean) => {
          setShowFallbackMessage(!available);
          window.localStorage.setItem('ai_using_fallback', (!available).toString());
        });
      });
    } catch (err) {
      console.error('Failed to retry connection:', err);
      setShowFallbackMessage(true);
    }
  };

  const handleChatUIAction = (action: string, data: any) => {
    // Handle different UI component actions
    switch (action) {
      case 'select-logo':
        // Add user message about selecting this logo
        setMessages(prev => [...prev, {
          text: `I like this logo.`,
          sender: 'user',
          timestamp: new Date()
        }, {
          text: `Great choice! This logo has a clean, professional design. Would you like to make any adjustments to it, or shall we move forward with this option?`,
          sender: 'ai',
          timestamp: new Date()
        }]);
        break;
        
      case 'select-palette':
        // Add user message about selecting this color palette
        const hexCodes = data.join(', ');
        setMessages(prev => [...prev, {
          text: `I like this color palette.`,
          sender: 'user',
          timestamp: new Date()
        }, {
          text: `Excellent choice! This palette (${hexCodes}) provides a good balance between primary and accent colors. Would you like me to suggest some font pairings that would complement these colors?`,
          sender: 'ai',
          timestamp: new Date()
        }]);
        break;
        
      case 'select-font':
        // Add user message about selecting this font
        setMessages(prev => [...prev, {
          text: `I like the ${data.name} font.`,
          sender: 'user',
          timestamp: new Date()
        }, {
          text: `${data.name} is an excellent choice! This ${data.category} font conveys a professional yet approachable feeling. Would you like to see how it looks in different sizes or weights for your headings and body text?`,
          sender: 'ai',
          timestamp: new Date()
        }]);
        break;
        
      default:
        console.log(`Unhandled UI action: ${action}`, data);
    }
  };

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
      const aiMessage = await generateAIResponse(inputMessage);
      
      // Add AI message
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
      <div className="container px-4 py-6">
        {showFallbackMessage && (
          <div className="mb-8">
            <AiFallbackMessage onRetry={handleRetryConnection} />
          </div>
        )}
      
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Dashboard Content */}
          <div className="w-full lg:w-1/2">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {Object.entries(mockStats).map(([key, value]) => (
                <Card key={key}>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                    <p className="text-2xl font-bold">{value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Projects */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Recent Projects</h2>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Projects</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {mockProjects.map(project => (
                      <div key={project.id} className="p-4 flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{project.name}</h4>
                          <p className="text-sm text-muted-foreground">{project.brand}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary" 
                                style={{ width: `${project.completion}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm">{project.completion}%</span>
                          </div>
                          <span className="capitalize px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                            {project.phase}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Brands */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Brands</h2>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Brands</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {mockBrands.map(brand => (
                      <div key={brand.id} className="p-4 flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{brand.name}</h4>
                          <p className="text-sm text-muted-foreground">Last updated: {brand.lastUpdated}</p>
                        </div>
                        <span className={`capitalize px-2 py-1 ${
                          brand.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        } text-xs rounded-md`}>
                          {brand.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* AI Chat Panel */}
          <div className="w-full lg:w-1/2">
            <Card className="h-[calc(100vh-12rem)] flex flex-col">
              <CardHeader className="px-4 py-3 border-b flex justify-between items-center">
                <CardTitle className="text-base font-medium">Brand AI Assistant</CardTitle>
                <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                  Online
                </span>
              </CardHeader>
              
              {/* Messages Container */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] p-3 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p>{message.text}</p>
                      {message.uiComponent && (
                        <ChatUIComponentRenderer 
                          component={message.uiComponent} 
                          onAction={handleChatUIAction}
                        />
                      )}
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                {isAITyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-foreground p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-foreground rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-foreground rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>
              
              {/* Suggested Queries */}
              <div className="p-2 border-t border-b overflow-x-auto">
                <div className="flex space-x-2">
                  {["Show me logo options", "Help me pick colors", "Suggest a font", "Brand strategy ideas", "Content marketing tips"].map((query, index) => (
                    <button
                      key={index}
                      className="whitespace-nowrap px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80"
                      onClick={() => {
                        setInputMessage(query);
                      }}
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Input Form */}
              <div className="p-4 border-t mt-auto">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about your brand or request design options..."
                    className="flex-1 px-3 py-2 bg-background border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
                    disabled={isAITyping}
                  >
                    Send
                  </button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIChatDashboard; 