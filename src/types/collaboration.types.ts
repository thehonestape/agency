/**
 * Team-Based Collaboration System Types
 * 
 * This file defines types for a flexible team-based collaboration system
 * that enables live human-to-human collaboration enhanced by AI agents.
 */

// Team Types
export type TeamType = 'studio' | 'client' | 'agent';

export interface Team {
  id: string;
  name: string;
  type: TeamType;
  description?: string;
  logoUrl?: string;
  members: TeamMember[];
  createdAt: Date;
  updatedAt: Date;
}

// Team Member Types
export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  isActive: boolean;
  isAdmin: boolean; 
  joinedAt: Date;
  lastActiveAt: Date;
}

// AI Agent Member (extends TeamMember)
export interface AIAgentMember extends TeamMember {
  agentType: string;
  capabilities: string[];
  model: string;
  isAutonomous: boolean;
  promptTemplate?: string;
  customInstructions?: string;
}

// Workspace (project-level collaboration space)
export interface Workspace {
  id: string;
  name: string;
  description?: string;
  projectId: string;
  teams: Team[];
  channels: Channel[];
  createdAt: Date;
  updatedAt: Date;
  settings: WorkspaceSettings;
}

// Workspace Settings
export interface WorkspaceSettings {
  defaultPermissions: Record<TeamType, Permission[]>;
  aiAssistanceEnabled: boolean;
  liveCollaborationEnabled: boolean;
  historyRetentionDays: number;
  notificationsEnabled: boolean;
  integrations: WorkspaceIntegration[];
}

// Workspace Integration
export interface WorkspaceIntegration {
  id: string;
  type: 'slack' | 'discord' | 'teams' | 'jira' | 'figma' | 'custom';
  name: string;
  isEnabled: boolean;
  config: Record<string, any>;
}

// Channel (topical conversation space)
export interface Channel {
  id: string;
  workspaceId: string;
  name: string;
  description?: string;
  type: 'general' | 'design' | 'content' | 'development' | 'strategy' | 'feedback' | 'custom';
  isPrivate: boolean;
  members: string[]; // User IDs
  pinnedThreads: string[]; // Thread IDs
  createdAt: Date;
  updatedAt: Date;
  aiAgents: AIAgentAssignment[];
}

// AI Agent Assignment to Channel
export interface AIAgentAssignment {
  id: string;
  channelId: string;
  agentId: string;
  role: string;
  isActive: boolean;
  assignedAt: Date;
  assignedById: string;
}

// Thread within a Channel
export interface Thread {
  id: string;
  channelId: string;
  title: string;
  status: 'active' | 'resolved' | 'archived';
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt: Date;
  isPinned: boolean;
  tags: string[];
  participantIds: string[];
}

// Message within a Thread
export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  senderType: 'human' | 'ai';
  content: string;
  contentType: 'text' | 'markdown' | 'rich_text' | 'code';
  attachments: Attachment[];
  mentions: Mention[];
  reactions: Reaction[];
  createdAt: Date;
  editedAt?: Date;
  replyToId?: string;
  isGenerating?: boolean;
  generationMetadata?: GenerationMetadata;
}

// Real-time collaboration status
export interface CollaborationStatus {
  threadId: string;
  activeParticipants: {
    userId: string;
    name: string;
    avatar?: string;
    isTyping: boolean;
    lastActivity: Date;
    currentViewingMessageId?: string;
  }[];
  currentlyTyping: string[]; // User IDs
  unreadCount: Record<string, number>; // User ID to unread count
}

// Generation metadata for AI-generated content
export interface GenerationMetadata {
  model: string;
  promptTokens: number;
  completionTokens: number;
  temperature: number;
  prompt?: string;
  iterations?: number;
  generationTime: number;
  confidence?: number;
}

// Attachment in messages
export interface Attachment {
  id: string;
  messageId: string;
  type: 'image' | 'file' | 'link' | 'artifact' | 'embed' | 'generative_ui';
  name: string;
  url: string;
  thumbnailUrl?: string;
  size?: number;
  mimeType?: string;
  metadata?: Record<string, any>;
  
  // For generative UI attachments
  uiSpecification?: {
    componentType: string;
    props: Record<string, any>;
    children?: any[];
    style?: Record<string, any>;
    interactionHandlers?: Record<string, any>;
  };
}

// Mentions in messages
export interface Mention {
  id: string;
  messageId: string;
  userId: string;
  userType: 'human' | 'ai';
  range: [number, number]; // Start and end indices in the message
}

// Reactions to messages
export interface Reaction {
  id: string;
  messageId: string;
  userId: string;
  emoji: string;
  createdAt: Date;
}

// Permission Types for workspace/channel access
export type Permission =
  | 'view_workspace'
  | 'manage_workspace'
  | 'create_channel'
  | 'join_channel'
  | 'create_thread'
  | 'send_message'
  | 'edit_own_message'
  | 'edit_any_message'
  | 'delete_own_message'
  | 'delete_any_message'
  | 'pin_thread'
  | 'assign_ai_agent'
  | 'upload_file'
  | 'generate_content'
  | 'generate_ui'
  | 'export_content'
  | 'invite_members'
  | 'view_analytics';

// Proposal Types
export interface Proposal {
  id: string;
  workspaceId: string;
  title: string;
  status: 'draft' | 'review' | 'sent' | 'accepted' | 'declined';
  createdById: string;
  assignedToId?: string;
  clientTeamId: string;
  createdAt: Date;
  updatedAt: Date;
  sentAt?: Date;
  expiresAt?: Date;
  respondedAt?: Date;
  sections: ProposalSection[];
  totalValue: number;
  currency: string;
  termsAccepted: boolean;
  notes?: string;
  generatedBy: 'human' | 'ai' | 'hybrid';
  threadId?: string; // Optional reference to discussion thread
  aiGenerationParams?: {
    style: string;
    tone: string;
    length: string;
    focusAreas: string[];
    competitiveStrength: string;
    additionalContext?: string;
  };
}

// Section within a Proposal
export interface ProposalSection {
  id: string;
  proposalId: string;
  title: string;
  content: string;
  order: number;
  type: 'introduction' | 'scope' | 'timeline' | 'pricing' | 'terms' | 'team' | 'portfolio' | 'custom';
  isRequired: boolean;
  isVisible: boolean;
  generatedBy: 'human' | 'ai' | 'hybrid';
  lastEditedById: string;
  lastEditedAt: Date;
  approvedById?: string;
  approvedAt?: Date;
  comments: ProposalComment[];
}

// Comments on proposal sections
export interface ProposalComment {
  id: string;
  sectionId: string;
  userId: string;
  userType: 'human' | 'ai';
  content: string;
  createdAt: Date;
  resolvedAt?: Date;
  resolvedById?: string;
} 