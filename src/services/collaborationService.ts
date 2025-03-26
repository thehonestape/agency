import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import {
  Team,
  TeamMember,
  Workspace,
  Channel,
  Thread,
  Message,
  Attachment,
  AIAgentMember,
  AIAgentAssignment,
  CollaborationStatus,
  GenerationMetadata,
  CollaborationType,
  CollaborationRole,
  CollaborationSpace as CollaborationSpaceType,
  ThreadParticipant,
  CollaborationUser,
  AI_ROLES
} from '../types/collaboration.types';
import { generateContent, AIPrompt } from './aiService';

// Utility function for API delay simulation
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Collaboration Service
 * 
 * Manages team-based collaboration with human and AI agents
 * Supports real-time interactions and generative content
 */

// Mock data for development
const mockActiveCollaborations: Record<string, CollaborationStatus> = {};

// Create a new workspace
export async function createWorkspace(projectId: string, name: string, description?: string): Promise<Workspace | null> {
  try {
    const workspaceId = uuidv4();
    const now = new Date();
    
    const newWorkspace: Workspace = {
      id: workspaceId,
      name,
      description,
      projectId,
      teams: [],
      channels: [],
      createdAt: now,
      updatedAt: now,
      settings: {
        defaultPermissions: {
          studio: ['view_workspace', 'manage_workspace', 'create_channel', 'generate_content', 'pin_thread'],
          client: ['view_workspace', 'join_channel', 'create_thread', 'send_message'],
          agent: ['view_workspace', 'send_message', 'generate_content', 'generate_ui']
        },
        aiAssistanceEnabled: true,
        liveCollaborationEnabled: true,
        historyRetentionDays: 90,
        notificationsEnabled: true,
        integrations: []
      }
    };
    
    // Create default General channel
    const generalChannel: Channel = {
      id: uuidv4(),
      workspaceId: workspaceId,
      name: 'general',
      description: 'General discussion for all team members',
      type: 'general',
      isPrivate: false,
      members: [],
      pinnedThreads: [],
      createdAt: now,
      updatedAt: now,
      aiAgents: []
    };
    
    newWorkspace.channels = [generalChannel];
    
    // Store in Supabase or local mock
    if (supabase) {
      const { data, error } = await supabase.from('workspaces').insert(newWorkspace).select();
      
      if (error) {
        console.error('Error creating workspace:', error);
        return null;
      }
      
      return data[0] as Workspace;
    } else {
      // Return mock data for development
      return newWorkspace;
    }
  } catch (error) {
    console.error('Error in createWorkspace:', error);
    return null;
  }
}

// Create a new team
export async function createTeam(workspaceId: string, teamData: Partial<Team>): Promise<Team | null> {
  try {
    const teamId = uuidv4();
    const now = new Date();
    
    const newTeam: Team = {
      id: teamId,
      name: teamData.name || 'New Team',
      type: teamData.type || 'studio',
      description: teamData.description || '',
      logoUrl: teamData.logoUrl,
      members: [],
      createdAt: now,
      updatedAt: now
    };
    
    if (supabase) {
      const { data, error } = await supabase.from('teams').insert(newTeam).select();
      
      if (error) {
        console.error('Error creating team:', error);
        return null;
      }
      
      return data[0] as Team;
    } else {
      // Return mock data for development
      return newTeam;
    }
  } catch (error) {
    console.error('Error in createTeam:', error);
    return null;
  }
}

// Add a member to a team
export async function addTeamMember(teamId: string, memberData: Partial<TeamMember>): Promise<TeamMember | null> {
  try {
    const memberId = uuidv4();
    const now = new Date();
    
    const newMember: TeamMember = {
      id: memberId,
      teamId,
      userId: memberData.userId || memberId,
      name: memberData.name || 'New Member',
      email: memberData.email || '',
      role: memberData.role || 'member',
      avatar: memberData.avatar,
      isActive: true,
      isAdmin: memberData.isAdmin || false,
      joinedAt: now,
      lastActiveAt: now
    };
    
    if (supabase) {
      const { data, error } = await supabase.from('team_members').insert(newMember).select();
      
      if (error) {
        console.error('Error adding team member:', error);
        return null;
      }
      
      return data[0] as TeamMember;
    } else {
      // Return mock data for development
      return newMember;
    }
  } catch (error) {
    console.error('Error in addTeamMember:', error);
    return null;
  }
}

// Create an AI agent member
export async function createAIAgent(teamId: string, agentData: Partial<AIAgentMember>): Promise<AIAgentMember | null> {
  try {
    const agentId = uuidv4();
    const now = new Date();
    
    const newAgent: AIAgentMember = {
      id: agentId,
      teamId,
      userId: agentData.userId || agentId,
      name: agentData.name || 'AI Assistant',
      email: `ai-${agentId.substring(0, 8)}@workhorse.ai`,
      role: agentData.role || 'assistant',
      avatar: agentData.avatar || '/ai-avatar.png',
      isActive: true,
      isAdmin: false,
      joinedAt: now,
      lastActiveAt: now,
      agentType: agentData.agentType || 'general',
      capabilities: agentData.capabilities || ['answer_questions', 'generate_content'],
      model: agentData.model || 'gpt-4o',
      isAutonomous: agentData.isAutonomous ?? false,
      promptTemplate: agentData.promptTemplate,
      customInstructions: agentData.customInstructions
    };
    
    if (supabase) {
      const { data, error } = await supabase.from('ai_agents').insert(newAgent).select();
      
      if (error) {
        console.error('Error creating AI agent:', error);
        return null;
      }
      
      return data[0] as AIAgentMember;
    } else {
      // Return mock data for development
      return newAgent;
    }
  } catch (error) {
    console.error('Error in createAIAgent:', error);
    return null;
  }
}

// Assign AI agent to a channel
export async function assignAgentToChannel(channelId: string, agentId: string, role: string, assignedById: string): Promise<AIAgentAssignment | null> {
  try {
    const assignmentId = uuidv4();
    const now = new Date();
    
    const assignment: AIAgentAssignment = {
      id: assignmentId,
      channelId,
      agentId,
      role,
      isActive: true,
      assignedAt: now,
      assignedById
    };
    
    if (supabase) {
      const { data, error } = await supabase.from('agent_assignments').insert(assignment).select();
      
      if (error) {
        console.error('Error assigning agent to channel:', error);
        return null;
      }
      
      return data[0] as AIAgentAssignment;
    } else {
      // Return mock data for development
      return assignment;
    }
  } catch (error) {
    console.error('Error in assignAgentToChannel:', error);
    return null;
  }
}

// Create a new channel
export async function createChannel(workspaceId: string, channelData: Partial<Channel>): Promise<Channel | null> {
  try {
    const channelId = uuidv4();
    const now = new Date();
    
    const newChannel: Channel = {
      id: channelId,
      workspaceId,
      name: channelData.name || 'new-channel',
      description: channelData.description || '',
      type: channelData.type || 'general',
      isPrivate: channelData.isPrivate || false,
      members: channelData.members || [],
      pinnedThreads: [],
      createdAt: now,
      updatedAt: now,
      aiAgents: []
    };
    
    if (supabase) {
      const { data, error } = await supabase.from('channels').insert(newChannel).select();
      
      if (error) {
        console.error('Error creating channel:', error);
        return null;
      }
      
      return data[0] as Channel;
    } else {
      // Return mock data for development
      return newChannel;
    }
  } catch (error) {
    console.error('Error in createChannel:', error);
    return null;
  }
}

// Create a new thread in a channel
export async function createThread(channelId: string, title: string, createdById: string): Promise<Thread | null> {
  try {
    const threadId = uuidv4();
    const now = new Date();
    
    const newThread: Thread = {
      id: threadId,
      channelId,
      title,
      status: 'active',
      createdById,
      createdAt: now,
      updatedAt: now,
      lastMessageAt: now,
      isPinned: false,
      tags: [],
      participantIds: [createdById]
    };
    
    if (supabase) {
      const { data, error } = await supabase.from('threads').insert(newThread).select();
      
      if (error) {
        console.error('Error creating thread:', error);
        return null;
      }
      
      return data[0] as Thread;
    } else {
      // Return mock data for development
      return newThread;
    }
  } catch (error) {
    console.error('Error in createThread:', error);
    return null;
  }
}

// Send a message in a thread
export async function sendMessage(threadId: string, content: string, senderId: string, senderType: 'human' | 'ai' = 'human'): Promise<Message | null> {
  try {
    const messageId = uuidv4();
    const now = new Date();
    
    const newMessage: Message = {
      id: messageId,
      threadId,
      senderId,
      senderType,
      content,
      contentType: 'markdown',
      attachments: [],
      mentions: [],
      reactions: [],
      createdAt: now,
      editedAt: undefined,
      replyToId: undefined
    };
    
    if (supabase) {
      const { data, error } = await supabase.from('messages').insert(newMessage).select();
      
      if (error) {
        console.error('Error sending message:', error);
        return null;
      }
      
      // Update last_message_at in thread
      await supabase
        .from('threads')
        .update({ lastMessageAt: now, updatedAt: now })
        .eq('id', threadId);
      
      return data[0] as Message;
    } else {
      // Return mock data for development
      return newMessage;
    }
  } catch (error) {
    console.error('Error in sendMessage:', error);
    return null;
  }
}

// Generate content with AI and send as message
export async function generateAIMessage(
  threadId: string,
  prompt: string,
  agentId: string,
  senderName: string = 'AI Assistant'
): Promise<Message | null> {
  try {
    // First create a placeholder message showing generation in progress
    const messageId = uuidv4();
    const now = new Date();
    
    const placeholderMessage: Message = {
      id: messageId,
      threadId,
      senderId: agentId,
      senderType: 'ai',
      content: 'Generating response...',
      contentType: 'markdown',
      attachments: [],
      mentions: [],
      reactions: [],
      createdAt: now,
      isGenerating: true
    };
    
    // Store placeholder message
    let storedMessage: Message | null = null;
    
    if (supabase) {
      const { data, error } = await supabase.from('messages').insert(placeholderMessage).select();
      
      if (error) {
        console.error('Error creating placeholder message:', error);
        return null;
      }
      
      storedMessage = data[0] as Message;
    } else {
      storedMessage = placeholderMessage;
    }
    
    // Generate AI content
    const startTime = Date.now();
    const aiPrompt: AIPrompt = {
      prompt,
      model: 'gpt-4o',
      max_tokens: 1000
    };
    
    const aiResponse = await generateContent(aiPrompt);
    const generationTime = Date.now() - startTime;
    
    // Create generation metadata
    const generationMetadata: GenerationMetadata = {
      model: aiResponse.model || 'gpt-4o',
      promptTokens: aiResponse.usage?.prompt_tokens || 0,
      completionTokens: aiResponse.usage?.completion_tokens || 0,
      temperature: 0.7,
      prompt: prompt,
      generationTime,
      confidence: 0.95
    };
    
    // Update message with generated content
    const updatedMessage: Partial<Message> = {
      content: aiResponse.text,
      isGenerating: false,
      generationMetadata,
      editedAt: new Date()
    };
    
    if (supabase) {
      const { data, error } = await supabase
        .from('messages')
        .update(updatedMessage)
        .eq('id', messageId)
        .select();
      
      if (error) {
        console.error('Error updating message with AI content:', error);
        return storedMessage;
      }
      
      // Update last_message_at in thread
      await supabase
        .from('threads')
        .update({ lastMessageAt: new Date(), updatedAt: new Date() })
        .eq('id', threadId);
      
      return data[0] as Message;
    } else {
      // For mock data just return combined object
      return { ...storedMessage, ...updatedMessage } as Message;
    }
  } catch (error) {
    console.error('Error in generateAIMessage:', error);
    return null;
  }
}

// Generate UI component and attach to message
export async function generateUIComponent(
  threadId: string,
  senderId: string,
  uiType: string,
  parameters: Record<string, any>
): Promise<Attachment | null> {
  try {
    // Generate UI specification based on type and parameters
    // This is where you'd use AI to generate UI components
    
    const uiPrompt = `Generate a ${uiType} UI component with the following parameters: ${JSON.stringify(parameters)}`;
    
    const aiPrompt: AIPrompt = {
      prompt: uiPrompt,
      model: 'gpt-4o',
      max_tokens: 1000
    };
    
    const aiResponse = await generateContent(aiPrompt);
    
    // Parse the response as JSON if possible
    let uiSpecification;
    try {
      // Look for JSON in the AI response
      const jsonMatch = aiResponse.text.match(/```json\n([\s\S]*?)\n```/) || 
                       aiResponse.text.match(/```\n([\s\S]*?)\n```/) ||
                       aiResponse.text.match(/{[\s\S]*}/);
      
      const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : aiResponse.text;
      uiSpecification = JSON.parse(jsonString);
    } catch (e) {
      console.error('Failed to parse UI specification JSON:', e);
      
      // Create a simplified fallback UI spec
      uiSpecification = {
        componentType: uiType,
        props: parameters,
        style: {}
      };
    }
    
    // Create attachment with UI specification
    const attachment: Attachment = {
      id: uuidv4(),
      messageId: '', // Will be filled in when attached to a message
      type: 'generative_ui',
      name: `${uiType} Component`,
      url: '', // For UI components this is not used
      uiSpecification
    };
    
    return attachment;
  } catch (error) {
    console.error('Error in generateUIComponent:', error);
    return null;
  }
}

// Update real-time collaboration status
export function updateCollaborationStatus(
  threadId: string, 
  userId: string,
  name: string,
  isTyping: boolean = false,
  currentViewingMessageId?: string
): CollaborationStatus {
  const now = new Date();
  
  // Get or initialize collaboration status for this thread
  if (!mockActiveCollaborations[threadId]) {
    mockActiveCollaborations[threadId] = {
      threadId,
      activeParticipants: [],
      currentlyTyping: [],
      unreadCount: {}
    };
  }
  
  const status = mockActiveCollaborations[threadId];
  
  // Update or add participant
  const existingParticipantIndex = status.activeParticipants.findIndex(p => p.userId === userId);
  
  if (existingParticipantIndex >= 0) {
    // Update existing participant
    status.activeParticipants[existingParticipantIndex] = {
      ...status.activeParticipants[existingParticipantIndex],
      isTyping,
      lastActivity: now,
      currentViewingMessageId
    };
  } else {
    // Add new participant
    status.activeParticipants.push({
      userId,
      name,
      isTyping,
      lastActivity: now,
      currentViewingMessageId
    });
  }
  
  // Update typing status
  if (isTyping && !status.currentlyTyping.includes(userId)) {
    status.currentlyTyping.push(userId);
  } else if (!isTyping && status.currentlyTyping.includes(userId)) {
    status.currentlyTyping = status.currentlyTyping.filter(id => id !== userId);
  }
  
  // Clean up inactive participants (inactive for more than 5 minutes)
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
  status.activeParticipants = status.activeParticipants.filter(
    p => p.lastActivity > fiveMinutesAgo
  );
  
  // Store updated status
  mockActiveCollaborations[threadId] = status;
  
  return status;
}

// Get active collaboration status for a thread
export function getCollaborationStatus(threadId: string): CollaborationStatus | null {
  return mockActiveCollaborations[threadId] || null;
}

// Export the service
export const collaborationService = {
  createWorkspace,
  createTeam,
  addTeamMember,
  createAIAgent,
  assignAgentToChannel,
  createChannel,
  createThread,
  sendMessage,
  generateAIMessage,
  generateUIComponent,
  updateCollaborationStatus,
  getCollaborationStatus
};

export interface ProposalOptions {
  projectId: string;
  title: string;
  description: string;
  deliverables?: string[];
  budget?: number;
  timeline?: string;
  teamMembers?: TeamMember[];
  templateType?: 'standard' | 'detailed' | 'executive';
}

export interface Proposal {
  id: string;
  projectId: string;
  title: string;
  description: string;
  content: {
    executiveSummary: string;
    scope: string;
    approach: string;
    deliverables: string[];
    timeline: string;
    budget: {
      total: number;
      breakdown: Array<{category: string, amount: number}>;
    };
    team: Array<{role: string, responsibilities: string[]}>;
  };
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'review' | 'approved' | 'rejected';
  comments: ProposalComment[];
  version: number;
}

export interface ProposalComment {
  id: string;
  content: string;
  createdBy: string;
  createdAt: Date;
  section?: string;
}

const mockProposals: Proposal[] = [];

// Generate a proposal using AI based on project information
export async function generateProposal(options: ProposalOptions): Promise<Proposal> {
  await delay(1500); // Simulate AI processing time
  
  const id = `prop-${Date.now()}`;
  const templateType = options.templateType || 'standard';
  
  // In a real implementation, this would call an AI service
  // For now, we'll use template-based generation with some randomization
  const executiveSummary = generateExecutiveSummary(options);
  const scope = generateScope(options);
  const approach = generateApproach(options, templateType);
  const deliverables = generateDeliverables(options);
  const timeline = generateTimeline(options);
  const budget = generateBudget(options);
  const team = generateTeam(options);
  
  const proposal: Proposal = {
    id,
    projectId: options.projectId,
    title: options.title,
    description: options.description,
    content: {
      executiveSummary,
      scope,
      approach,
      deliverables,
      timeline,
      budget,
      team
    },
    createdBy: 'ai-assistant',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'draft',
    comments: [],
    version: 1
  };
  
  mockProposals.push(proposal);
  return proposal;
}

// Get a proposal by ID
export async function getProposal(id: string): Promise<Proposal | null> {
  await delay(300);
  return mockProposals.find(p => p.id === id) || null;
}

// Get all proposals for a project
export async function getProjectProposals(projectId: string): Promise<Proposal[]> {
  await delay(300);
  return mockProposals.filter(p => p.projectId === projectId);
}

// Update a proposal
export async function updateProposal(id: string, updates: Partial<Proposal>): Promise<Proposal | null> {
  await delay(500);
  
  const proposalIndex = mockProposals.findIndex(p => p.id === id);
  if (proposalIndex === -1) return null;
  
  const updatedProposal = {
    ...mockProposals[proposalIndex],
    ...updates,
    updatedAt: new Date(),
    version: mockProposals[proposalIndex].version + 1
  };
  
  mockProposals[proposalIndex] = updatedProposal;
  return updatedProposal;
}

// Add a comment to a proposal
export async function addProposalComment(proposalId: string, comment: Omit<ProposalComment, 'id' | 'createdAt'>): Promise<ProposalComment> {
  await delay(300);
  
  const proposalIndex = mockProposals.findIndex(p => p.id === proposalId);
  if (proposalIndex === -1) throw new Error('Proposal not found');
  
  const newComment: ProposalComment = {
    id: `comment-${Date.now()}`,
    ...comment,
    createdAt: new Date()
  };
  
  mockProposals[proposalIndex].comments.push(newComment);
  return newComment;
}

// Helper functions for proposal generation
function generateExecutiveSummary(options: ProposalOptions): string {
  return `This proposal outlines our approach for the ${options.title} project. 
  Based on our understanding of your requirements, we propose a comprehensive solution 
  that addresses your core business needs while maintaining flexibility for future growth.
  
  Our team brings extensive experience in this domain and is committed to delivering 
  high-quality results within the established timeline and budget constraints.`;
}

function generateScope(options: ProposalOptions): string {
  return `The scope of the ${options.title} project encompasses the following key areas:
  
  1. Initial discovery and requirements gathering
  2. Strategic planning and architecture design
  3. Implementation of core functionalities
  4. Quality assurance and testing
  5. Deployment and integration
  6. Post-launch support and maintenance
  
  ${options.description}`;
}

function generateApproach(options: ProposalOptions, templateType: string): string {
  if (templateType === 'detailed') {
    return `Our approach to the ${options.title} project follows a proven methodology:
    
    **Phase 1: Discovery & Analysis**
    - Stakeholder interviews and requirements gathering
    - Competitive analysis and market research
    - Technical feasibility assessment
    
    **Phase 2: Strategy & Planning**
    - Solution architecture design
    - Project roadmap development
    - Resource allocation and timeline planning
    
    **Phase 3: Execution & Implementation**
    - Iterative development cycles
    - Regular client reviews and feedback integration
    - Continuous quality assurance
    
    **Phase 4: Deployment & Support**
    - Controlled release strategy
    - Knowledge transfer and documentation
    - Ongoing maintenance and support`;
  }
  
  return `Our approach to the ${options.title} project combines agile methodology with 
  strategic planning to ensure both flexibility and direction. We'll work closely with your 
  team throughout the process, maintaining transparent communication and regular progress updates.`;
}

function generateDeliverables(options: ProposalOptions): string[] {
  if (options.deliverables && options.deliverables.length > 0) {
    return options.deliverables;
  }
  
  return [
    'Project plan and schedule',
    'Design documentation',
    'Development specifications',
    'Implementation of requested features',
    'Testing and quality assurance reports',
    'User documentation and training materials',
    'Source code and asset delivery',
    'Post-launch support'
  ];
}

function generateTimeline(options: ProposalOptions): string {
  if (options.timeline) {
    return options.timeline;
  }
  
  return `The estimated timeline for this project is 12 weeks, divided into the following phases:
  
  - Discovery & Planning: Weeks 1-2
  - Design & Architecture: Weeks 3-4
  - Implementation: Weeks 5-9
  - Testing & Quality Assurance: Weeks 10-11
  - Deployment & Handover: Week 12`;
}

function generateBudget(options: ProposalOptions): { total: number, breakdown: Array<{category: string, amount: number}> } {
  const baseAmount = options.budget || 50000;
  
  return {
    total: baseAmount,
    breakdown: [
      { category: 'Discovery & Planning', amount: baseAmount * 0.15 },
      { category: 'Design & Architecture', amount: baseAmount * 0.20 },
      { category: 'Development & Implementation', amount: baseAmount * 0.40 },
      { category: 'Testing & Quality Assurance', amount: baseAmount * 0.15 },
      { category: 'Deployment & Support', amount: baseAmount * 0.10 }
    ]
  };
}

function generateTeam(options: ProposalOptions): Array<{role: string, responsibilities: string[]}> {
  if (options.teamMembers && options.teamMembers.length > 0) {
    return options.teamMembers.map(member => ({
      role: member.role || 'Team Member',
      responsibilities: [
        'Contribute to project implementation',
        'Collaborate with team members',
        'Ensure quality deliverables'
      ]
    }));
  }
  
  return [
    {
      role: 'Project Manager',
      responsibilities: [
        'Overall project coordination',
        'Client communication',
        'Timeline and budget management'
      ]
    },
    {
      role: 'Designer',
      responsibilities: [
        'Visual design creation',
        'User experience design',
        'Design system implementation'
      ]
    },
    {
      role: 'Developer',
      responsibilities: [
        'Frontend and backend development',
        'Integration of systems',
        'Technical problem-solving'
      ]
    },
    {
      role: 'QA Specialist',
      responsibilities: [
        'Quality assurance testing',
        'Bug identification and tracking',
        'Performance optimization'
      ]
    }
  ];
} 