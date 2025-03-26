import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiMaximize, FiMinimize, FiX, FiCpu, FiTrash2 } from 'react-icons/fi';
import { generateContent } from '../../services/aiService';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

// Storage key for conversation
const CONVERSATION_STORAGE_KEY = 'workhorse-ai-conversation';

// Message interface
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

// AI Assistant Sidebar props
interface AIAssistantSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function SimpleAIAssistant({ isOpen, onToggle }: AIAssistantSidebarProps) {
  // Initialize messages from localStorage or default
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem(CONVERSATION_STORAGE_KEY);
    if (savedMessages) {
      try {
        // Parse the saved messages and convert timestamp strings back to Date objects
        return JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    }
    
    // Default welcome message
    return [{
      id: '1',
      role: 'assistant',
      content: "Welcome to Workhorse AI. I'm the central intelligence of your creative agency platform, designed to help you manage projects, generate content, and streamline your workflow. What would you like to accomplish today?",
      timestamp: new Date()
    }];
  });
  
  const [inputValue, setInputValue] = useState('');
  const [autocompleteText, setAutocompleteText] = useState('');
  const [isAutocompleting, setIsAutocompleting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const location = useLocation();
  const params = useParams();
  const [currentProject, setCurrentProject] = useState<any>(null);
  
  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(CONVERSATION_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus the input when the sidebar opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Fetch project data when on a project page
  useEffect(() => {
    const fetchProjectData = async () => {
      const projectId = params.id || location.pathname.split('/').find(segment => 
        segment.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/));
      
      if (projectId) {
        try {
          const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', projectId)
            .single();
            
          if (error) {
            console.error('Error fetching project:', error);
            return;
          }
          
          if (data) {
            console.log('Setting current project context:', data.name);
            setCurrentProject(data);
          }
        } catch (error) {
          console.error('Error in project fetch:', error);
        }
      } else {
        setCurrentProject(null);
      }
    };
    
    fetchProjectData();
  }, [location.pathname, params.id]);

  // Get current page context
  const getCurrentContext = () => {
    const path = location.pathname;
    let context: Record<string, any> = { 
      currentPage: path,
      appSection: 'unknown'
    };
    
    // Determine app section
    if (path.includes('dashboard')) {
      context.appSection = 'dashboard';
    } else if (path.includes('projects')) {
      context.appSection = 'projects';
    } else if (path.includes('assets')) {
      context.appSection = 'assets';
    } else if (path.includes('collaboration')) {
      context.appSection = 'collaboration';
    } else if (path.includes('ai-help')) {
      context.appSection = 'ai-help';
    }
    
    // Add project context if available
    if (currentProject) {
      context.project = {
        id: currentProject.id,
        name: currentProject.name,
        description: currentProject.description,
        status: currentProject.status,
        client: currentProject.client_name
      };
    }
    
    // Get URL parameters 
    const projectId = params.id;
    if (projectId) {
      context.projectId = projectId;
    }
    
    return context;
  };

  // Generate autocomplete suggestions as user types
  useEffect(() => {
    if (inputValue.length > 2 && !isTyping) {
      const generateAutocomplete = async () => {
        // Don't generate autocomplete if already completing or while processing a message
        if (isAutocompleting || isTyping) return;
        
        try {
          setIsAutocompleting(true);
          
          // Simple autocomplete context mapping for different input patterns
          let autocompletePrompt = `The user is typing: "${inputValue}". Provide a brief autocomplete suggestion that continues their thought:`;
          
          // Special handling for common prefixes
          if (inputValue.toLowerCase().startsWith("can you")) {
            autocompletePrompt += " Assume this is a capability question and suggest a helpful continuation.";
          } else if (inputValue.toLowerCase().startsWith("how do i")) {
            autocompletePrompt += " Assume this is a how-to question and suggest a helpful continuation.";
          } else if (inputValue.toLowerCase().startsWith("generate")) {
            autocompletePrompt += " Assume this is a content generation request and suggest a specific completion.";
          }
          
          // Use a smaller model and shorter response for autocomplete
          const response = await generateContent({
            prompt: autocompletePrompt,
            model: 'gpt-3.5-turbo', // Use a faster model for autocomplete
            max_tokens: 20, // Short completion
            context: { autocomplete: true }
          });
          
          // Only show autocomplete if we're still typing the same input
          // This prevents showing autocomplete for abandoned inputs
          if (!isTyping) {
            setAutocompleteText(response.text);
          }
        } catch (error) {
          console.log('Autocomplete error:', error);
          setAutocompleteText('');
        } finally {
          setIsAutocompleting(false);
        }
      };
      
      // Use a debounce of 300ms to prevent too many API calls
      const debounceTimer = setTimeout(generateAutocomplete, 300);
      return () => clearTimeout(debounceTimer);
    } else {
      setAutocompleteText('');
    }
  }, [inputValue, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    // Update UI immediately with user message
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setAutocompleteText('');
    setIsTyping(true);

    try {
      console.log('Sending message to AI:', inputValue);
      
      // Create a context object with conversation history and app state
      const appContext = getCurrentContext();
      
      // Get the last 5 messages for context
      const conversationHistory = messages.slice(-5).map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Generate a system prompt based on context
      let systemPrompt = "You are a helpful assistant for the Workhorse creative agency project management system.";
      
      if (appContext.project) {
        systemPrompt += ` You are currently helping with the "${appContext.project.name}" project.`;
        if (appContext.project.description) {
          systemPrompt += ` This project is about: ${appContext.project.description}.`;
        }
        if (appContext.project.client) {
          systemPrompt += ` The client is ${appContext.project.client}.`;
        }
      }
      
      if (appContext.appSection) {
        systemPrompt += ` The user is currently in the ${appContext.appSection} section of the app.`;
      }
      
      // Call the AI service to generate a response with enhanced context
      const aiResponse = await generateContent({
        prompt: inputValue,
        model: 'llama3.2', // Explicitly use llama3.2 model
        context: { 
          conversationHistory,
          appContext,
          messageCount: messages.length,
          systemPrompt
        }
      });

      console.log('Received AI response:', aiResponse);

      // Add AI response to messages
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: aiResponse.text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle Tab for autocomplete acceptance
    if (e.key === 'Tab' && autocompleteText) {
      e.preventDefault();
      setInputValue(inputValue + autocompleteText);
      setAutocompleteText('');
    }
    // Handle normal send on Enter
    else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const acceptAutocomplete = () => {
    if (autocompleteText) {
      setInputValue(inputValue + autocompleteText);
      setAutocompleteText('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    if (autocompleteText && !e.target.value.endsWith(autocompleteText.charAt(0))) {
      setAutocompleteText(''); // Clear autocomplete if typing diverges
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Function to clear conversation history
  const clearConversation = () => {
    // Keep just the welcome message
    const welcomeMessage = {
      id: Date.now().toString(),
      role: 'assistant' as const,
      content: "I've cleared our conversation history. As your Workhorse AI, I'm ready to help you manage projects, generate content, and optimize your creative workflow. What would you like to do next?",
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  };

  // If the assistant is not open, show only the toggle button
  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-xl hover:bg-primary-dark z-50 transition-all duration-300 ease-in-out hover:scale-110"
        aria-label="Open AI Assistant"
      >
        <FiCpu size={32} />
      </button>
    );
  }

  return (
    <div 
      className="fixed right-0 bottom-0 top-0 bg-white dark:bg-gray-900 shadow-xl border-l dark:border-gray-700 flex flex-col z-50 transition-all duration-300 ease-in-out w-[450px]"
    >
      {/* Header */}
      <div className="p-4 flex justify-between items-center bg-primary text-white">
        <div className="flex items-center">
          <FiCpu className="mr-3" size={24} />
          <h3 className="font-semibold text-lg">Workhorse AI</h3>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={clearConversation} 
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Clear conversation"
            title="Clear conversation history"
          >
            <FiTrash2 size={18} />
          </button>
          <button 
            onClick={onToggle} 
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Close"
          >
            <FiX size={20} />
          </button>
        </div>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`px-4 py-3 my-2 rounded-lg ${
              message.role === 'user' 
                ? 'bg-blue-100 dark:bg-blue-900 ml-auto max-w-[85%]' 
                : 'bg-gray-100 dark:bg-gray-800 mr-auto max-w-[85%]'
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-semibold">
                {message.role === 'user' ? 'You' : 'Workhorse AI'}
              </span>
              <span className="text-xs text-gray-500">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="text-sm whitespace-pre-wrap">{message.content}</div>
            {message.role === 'assistant' && (
              <button 
                onClick={() => copyToClipboard(message.content)}
                className="text-xs text-gray-500 hover:text-gray-700 mt-2 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy
              </button>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 my-2 rounded-lg mr-auto max-w-[85%]">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input container */}
      <div className="border-t dark:border-gray-700 p-3">
        <div className="relative">
          <div className="relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="w-full border rounded-lg pl-3 pr-10 py-2 dark:bg-gray-800 dark:border-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={3}
            />
            
            {autocompleteText && (
              <div className="absolute top-0 left-0 pl-3 py-2 pointer-events-none">
                <span className="text-transparent">{inputValue}</span>
                <span className="text-gray-400">{autocompleteText}</span>
              </div>
            )}
            
            {autocompleteText && (
              <div className="absolute top-0 right-12 py-2">
                <button
                  onClick={acceptAutocomplete}
                  className="text-xs text-gray-500 hover:text-gray-700 px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded"
                >
                  Tab
                </button>
              </div>
            )}
            
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-2 bottom-2 text-primary hover:text-primary-dark disabled:text-gray-400"
              aria-label="Send message"
            >
              {isTyping ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                </svg>
              ) : (
                <FiSend size={20} />
              )}
            </button>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-2 flex justify-between">
          <span>Press Enter to send, Shift+Enter for new line</span>
          {autocompleteText && <span>Press Tab to accept suggestion</span>}
        </div>
      </div>
    </div>
  );
} 