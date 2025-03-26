import React, { useState, useEffect, useRef } from 'react';
import { 
  Card, 
  Title, 
  Tab, 
  TabGroup, 
  TabList, 
  TabPanel, 
  TabPanels,
  Divider,
  Button,
  TextInput,
  Badge,
  Flex,
  Grid,
  Text,
  Subtitle
} from '@tremor/react';
import { FiSend, FiPlus, FiMessageSquare, FiUsers, FiCpu, FiEdit, FiClock } from 'react-icons/fi';
import { 
  collaborationService,
  createWorkspace, 
  createTeam,
  addTeamMember,
  createAIAgent,
  createChannel, 
  createThread,
  sendMessage,
  generateAIMessage,
  updateCollaborationStatus,
  getCollaborationStatus
} from '../../services/collaborationService';
import { Thread, Message, CollaborationStatus, Workspace } from '../../types/collaboration.types';

// Mock user data
const currentUser = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  role: 'Designer',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
};

interface CollaborationSpaceProps {
  projectId: string;
}

export function CollaborationSpace({ projectId }: CollaborationSpaceProps) {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [collaborationStatus, setCollaborationStatus] = useState<CollaborationStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize workspace and teams
  useEffect(() => {
    async function initializeWorkspace() {
      setIsLoading(true);
      
      // Try to create or get workspace
      let workspace = await createWorkspace(
        projectId, 
        'Project Collaboration Space',
        'Collaborative workspace for project communication and coordination'
      );
      
      if (!workspace) {
        console.error('Failed to create workspace');
        setIsLoading(false);
        return;
      }
      
      // Create studio team if it doesn't exist
      if (!workspace.teams.some(team => team.type === 'studio')) {
        const studioTeam = await createTeam(workspace.id, {
          name: 'Studio Team',
          type: 'studio',
          description: 'Internal creative team'
        });
        
        if (studioTeam) {
          // Add current user to studio team
          await addTeamMember(studioTeam.id, {
            userId: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
            role: currentUser.role,
            avatar: currentUser.avatar,
            isAdmin: true
          });
          
          workspace.teams.push(studioTeam);
        }
      }
      
      // Create client team if it doesn't exist
      if (!workspace.teams.some(team => team.type === 'client')) {
        const clientTeam = await createTeam(workspace.id, {
          name: 'Client Team',
          type: 'client',
          description: 'Client representatives'
        });
        
        if (clientTeam) {
          workspace.teams.push(clientTeam);
        }
      }
      
      // Create AI agent team if it doesn't exist
      if (!workspace.teams.some(team => team.type === 'agent')) {
        const agentTeam = await createTeam(workspace.id, {
          name: 'AI Assistance',
          type: 'agent',
          description: 'AI agents to assist the project'
        });
        
        if (agentTeam) {
          // Add assistant agent to the team
          await createAIAgent(agentTeam.id, {
            name: 'Project Assistant',
            agentType: 'project_manager',
            capabilities: ['answer_questions', 'generate_content', 'provide_suggestions'],
            model: 'gpt-4o',
            isAutonomous: false,
            customInstructions: 'You are a helpful project assistant that helps the team stay organized and on track.'
          });
          
          workspace.teams.push(agentTeam);
        }
      }
      
      setWorkspace(workspace);
      
      // Get or create a thread in the general channel
      const generalChannel = workspace.channels[0];
      if (generalChannel) {
        const defaultThread = await createThread(
          generalChannel.id,
          'Welcome to the Collaboration Space',
          currentUser.id
        );
        
        if (defaultThread) {
          setThreads([defaultThread]);
          setSelectedThreadId(defaultThread.id);
          
          // Add a welcome message from the AI
          const assistantId = 'ai-assistant'; // This would be the actual AI agent ID in production
          await generateAIMessage(
            defaultThread.id,
            'Welcome to the Collaboration Space! This is where the studio team, client team, and AI assistants can work together on the project. How can I help you today?',
            assistantId,
            'Project Assistant'
          );
        }
      }
      
      setIsLoading(false);
    }
    
    initializeWorkspace();
  }, [projectId]);
  
  // Load messages when a thread is selected
  useEffect(() => {
    if (selectedThreadId) {
      // In a real implementation, this would fetch messages from Supabase
      // For now, we'll use mock data
      const mockMessages: Message[] = [
        {
          id: 'msg-1',
          threadId: selectedThreadId,
          senderId: 'ai-assistant',
          senderType: 'ai',
          content: 'Welcome to the Collaboration Space! This is where the studio team, client team, and AI assistants can work together on the project. How can I help you today?',
          contentType: 'markdown',
          attachments: [],
          mentions: [],
          reactions: [],
          createdAt: new Date(Date.now() - 3600000) // 1 hour ago
        }
      ];
      
      setMessages(mockMessages);
      
      // Initialize collaboration status for this thread
      const status = updateCollaborationStatus(
        selectedThreadId,
        currentUser.id,
        currentUser.name,
        false
      );
      
      setCollaborationStatus(status);
    }
  }, [selectedThreadId]);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Update typing status
  useEffect(() => {
    if (!selectedThreadId) return;
    
    const typingStatus = updateCollaborationStatus(
      selectedThreadId,
      currentUser.id,
      currentUser.name,
      isTyping
    );
    
    setCollaborationStatus(typingStatus);
  }, [isTyping, selectedThreadId]);
  
  // Typing indicator logic
  const typingTimer = useRef<NodeJS.Timeout | null>(null);
  
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    
    // Update typing status
    if (!isTyping) {
      setIsTyping(true);
    }
    
    // Reset the timer
    if (typingTimer.current) {
      clearTimeout(typingTimer.current);
    }
    
    // Set a new timer to stop typing indicator after 2 seconds of inactivity
    typingTimer.current = setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };
  
  // Send a message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedThreadId) return;
    
    // Send the user message
    const sentMessage = await sendMessage(
      selectedThreadId,
      newMessage,
      currentUser.id,
      'human'
    );
    
    if (sentMessage) {
      // Add message to the local state for immediate display
      setMessages(prev => [...prev, sentMessage]);
      
      // Clear input and typing status
      setNewMessage('');
      setIsTyping(false);
      
      // Generate AI response
      const aiMessage = await generateAIMessage(
        selectedThreadId,
        `Respond to: ${newMessage}`,
        'ai-assistant',
        'Project Assistant'
      );
      
      if (aiMessage) {
        // Add AI message to the local state
        setMessages(prev => [...prev, aiMessage]);
      }
    }
  };
  
  // Create a new thread
  const handleCreateThread = async () => {
    if (!newThreadTitle.trim() || !workspace) return;
    
    const generalChannel = workspace.channels[0];
    if (!generalChannel) return;
    
    const newThread = await createThread(
      generalChannel.id,
      newThreadTitle,
      currentUser.id
    );
    
    if (newThread) {
      setThreads(prev => [...prev, newThread]);
      setSelectedThreadId(newThread.id);
      setNewThreadTitle('');
    }
  };
  
  // Render typing indicators
  const renderTypingIndicators = () => {
    if (!collaborationStatus || collaborationStatus.currentlyTyping.length === 0) {
      return null;
    }
    
    // Get names of people typing, excluding current user
    const typingUsers = collaborationStatus.activeParticipants
      .filter(p => p.isTyping && p.userId !== currentUser.id)
      .map(p => p.name);
    
    if (typingUsers.length === 0) return null;
    
    let typingText = '';
    if (typingUsers.length === 1) {
      typingText = `${typingUsers[0]} is typing...`;
    } else if (typingUsers.length === 2) {
      typingText = `${typingUsers[0]} and ${typingUsers[1]} are typing...`;
    } else {
      typingText = 'Several people are typing...';
    }
    
    return (
      <div className="text-xs text-gray-500 italic flex items-center">
        <FiEdit className="mr-1 animate-pulse" />
        {typingText}
      </div>
    );
  };
  
  if (isLoading) {
    return (
      <Card className="h-full">
        <div className="flex items-center justify-center h-64">
          <div className="loading loading-spinner text-primary"></div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="h-full">
      <Title>Team Collaboration</Title>
      <Subtitle>Live collaboration between studio, client, and AI</Subtitle>
      
      <Grid numItems={12} className="gap-4 mt-4 h-[calc(100vh-220px)]">
        {/* Thread List Sidebar */}
        <div className="col-span-3 border-r pr-4 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Threads</h3>
            <Button
              size="sm"
              icon={FiPlus}
              variant="light"
              onClick={() => {
                const modalElem = document.getElementById('new-thread-modal');
                if (modalElem) {
                  (modalElem as any).showModal();
                }
              }}
            >
              New
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {threads.map(thread => (
              <div
                key={thread.id}
                className={`p-3 rounded-md cursor-pointer mb-2 ${
                  thread.id === selectedThreadId ? 'bg-blue-50 dark:bg-blue-900/30' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
                onClick={() => setSelectedThreadId(thread.id)}
              >
                <div className="flex justify-between">
                  <h4 className="font-medium">{thread.title}</h4>
                  {thread.isPinned && <Badge size="sm">Pinned</Badge>}
                </div>
                <div className="text-xs text-gray-500 mt-1 flex items-center">
                  <FiClock className="mr-1" />
                  {new Date(thread.lastMessageAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <Title className="text-sm mb-2">Workspace Members</Title>
            <div className="flex flex-wrap gap-2">
              <Badge icon={FiUsers} color="blue">Studio Team: 1</Badge>
              <Badge icon={FiUsers} color="green">Client Team: 0</Badge>
              <Badge icon={FiCpu} color="purple">AI Agents: 1</Badge>
            </div>
          </div>
        </div>
        
        {/* Messages Area */}
        <div className="col-span-9 flex flex-col h-full">
          {selectedThreadId ? (
            <>
              <div className="flex-1 overflow-y-auto p-2">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`mb-4 ${
                      message.senderType === 'ai' ? 'pl-2' : 'pl-0'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                        message.senderType === 'ai' ? 'bg-purple-100' : 'bg-blue-100'
                      }`}>
                        {message.senderType === 'ai' ? (
                          <FiCpu className="text-purple-600" />
                        ) : (
                          <div className="text-sm text-blue-600 font-bold">
                            {currentUser.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="font-semibold">
                            {message.senderType === 'ai' ? 'Project Assistant' : currentUser.name}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            {new Date(message.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className={`p-3 rounded-lg mt-1 ${
                          message.senderType === 'ai' 
                            ? 'bg-purple-50 dark:bg-purple-900/20' 
                            : 'bg-blue-50 dark:bg-blue-900/20'
                        }`}>
                          {message.isGenerating ? (
                            <div className="flex items-center">
                              <span className="mr-2">Generating response</span>
                              <div className="loading loading-dots loading-xs"></div>
                            </div>
                          ) : (
                            <div className="whitespace-pre-wrap">{message.content}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="mt-4">
                {renderTypingIndicators()}
                <div className="flex items-center">
                  <TextInput
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={handleMessageChange}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button
                    className="ml-2"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    icon={FiSend}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <FiMessageSquare className="mx-auto text-4xl text-gray-400 mb-2" />
                <p>Select a thread to start collaborating</p>
              </div>
            </div>
          )}
        </div>
      </Grid>
      
      {/* New Thread Modal */}
      <dialog id="new-thread-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Create New Thread</h3>
          <TextInput
            placeholder="Thread title"
            value={newThreadTitle}
            onChange={e => setNewThreadTitle(e.target.value)}
            className="mb-4"
          />
          <div className="modal-action">
            <form method="dialog">
              <Button variant="light" className="mr-2">Cancel</Button>
              <Button 
                onClick={() => {
                  handleCreateThread();
                  const modalElem = document.getElementById('new-thread-modal');
                  if (modalElem) {
                    (modalElem as any).close();
                  }
                }}
                disabled={!newThreadTitle.trim()}
              >
                Create Thread
              </Button>
            </form>
          </div>
        </div>
      </dialog>
    </Card>
  );
}

// Add this debug component at the top of the file
export function CollaborationDebug({ projectId }: { projectId: string }) {
  return (
    <Card className="mb-4">
      <Title>Collaboration Debug Info</Title>
      <div className="mt-4 p-4 bg-blue-50 rounded-md">
        <p>Component loaded successfully for Project ID: {projectId}</p>
        <p>This component helps verify that routing is working correctly.</p>
        <p className="mt-2 text-sm">If you can see this message, the collaboration component is being correctly rendered.</p>
      </div>
    </Card>
  );
} 