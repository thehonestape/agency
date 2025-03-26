import { supabase } from '../lib/supabase';
import type { Database } from '../types/database.types';
import { projectPhaseService, PhaseType } from './projectPhaseService';
import { projectArtifactService } from './projectArtifactService';
import { Project, ProjectPhase, ProjectStatus, Artifact, ArtifactStatus } from '../types/project.types';
import { v4 as uuidv4 } from 'uuid';

export type Project = Database['public']['Tables']['projects']['Row'];
export type InsertProject = Database['public']['Tables']['projects']['Insert'];
export type UpdateProject = Database['public']['Tables']['projects']['Update'];

// Mock data
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Brand Refresh for Modern Museum',
    clientId: '101',
    description: 'Complete brand refresh including new visual identity, website design, and marketing materials.',
    currentPhase: 'discovery',
    status: 'active',
    startDate: new Date('2024-03-01'),
    targetCompletionDate: new Date('2024-06-30'),
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-03-01')
  },
  {
    id: '2',
    name: 'Wellness App UI/UX Design',
    clientId: '102',
    description: 'Design a modern, intuitive user interface for a wellness and meditation app.',
    currentPhase: 'definition',
    status: 'active',
    startDate: new Date('2024-02-01'),
    targetCompletionDate: new Date('2024-05-15'),
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-01')
  },
  {
    id: '3',
    name: 'E-commerce Website Redesign',
    clientId: '103',
    description: 'Redesign existing e-commerce website to improve user experience and conversion rates.',
    currentPhase: 'design',
    status: 'active',
    startDate: new Date('2024-01-15'),
    targetCompletionDate: new Date('2024-04-30'),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15')
  }
];

const mockArtifacts: Artifact[] = [
  // Discovery phase artifacts for Project 1
  {
    id: '101',
    projectId: '1',
    phaseId: 'discovery-1',
    artifactType: 'creative_brief',
    name: 'Creative Brief',
    description: 'Initial creative brief for the museum brand refresh',
    version: 1,
    status: 'approved',
    createdById: 'user1',
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-10')
  },
  {
    id: '102',
    projectId: '1',
    phaseId: 'discovery-1',
    artifactType: 'brand_audit',
    name: 'Brand Audit',
    description: 'Analysis of current brand assets and positioning',
    version: 2,
    status: 'approved',
    createdById: 'user1',
    createdAt: new Date('2024-03-07'),
    updatedAt: new Date('2024-03-15')
  },
  {
    id: '103',
    projectId: '1',
    phaseId: 'discovery-1',
    artifactType: 'kickoff_notes',
    name: 'Kickoff Meeting Notes',
    description: 'Notes from the initial kickoff meeting with the client',
    version: 1,
    status: 'draft',
    createdById: 'user2',
    createdAt: new Date('2024-03-02'),
    updatedAt: new Date('2024-03-02')
  },
  
  // Definition phase artifacts for Project 2
  {
    id: '201',
    projectId: '2',
    phaseId: 'discovery-2',
    artifactType: 'creative_brief',
    name: 'Creative Brief',
    description: 'Initial creative brief for the wellness app',
    version: 1,
    status: 'approved',
    createdById: 'user1',
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-10')
  },
  {
    id: '202',
    projectId: '2',
    phaseId: 'discovery-2',
    artifactType: 'research',
    name: 'Research Document',
    description: 'User research and market analysis',
    version: 1,
    status: 'approved',
    createdById: 'user3',
    createdAt: new Date('2024-02-07'),
    updatedAt: new Date('2024-02-15')
  },
  {
    id: '203',
    projectId: '2',
    phaseId: 'definition-2',
    artifactType: 'user_research',
    name: 'User Research',
    description: 'Detailed user research including interviews and surveys',
    version: 1,
    status: 'review',
    createdById: 'user3',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-25')
  },
  {
    id: '204',
    projectId: '2',
    phaseId: 'definition-2',
    artifactType: 'information_architecture',
    name: 'Information Architecture',
    description: 'App structure and information flow',
    version: 2,
    status: 'draft',
    createdById: 'user1',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-05')
  },
  
  // Design phase artifacts for Project 3
  {
    id: '301',
    projectId: '3',
    phaseId: 'discovery-3',
    artifactType: 'creative_brief',
    name: 'Creative Brief',
    description: 'Initial creative brief for the e-commerce redesign',
    version: 1,
    status: 'approved',
    createdById: 'user2',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '302',
    projectId: '3',
    phaseId: 'definition-3',
    artifactType: 'brand_strategy',
    name: 'Brand Strategy',
    description: 'Updated brand strategy and positioning',
    version: 1,
    status: 'approved',
    createdById: 'user1',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-10')
  },
  {
    id: '303',
    projectId: '3',
    phaseId: 'design-3',
    artifactType: 'moodboard',
    name: 'Moodboard',
    description: 'Visual direction and inspiration',
    version: 3,
    status: 'approved',
    createdById: 'user3',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-25')
  },
  {
    id: '304',
    projectId: '3',
    phaseId: 'design-3',
    artifactType: 'concept_directions',
    name: 'Concept Directions',
    description: 'Three design direction concepts',
    version: 2,
    status: 'review',
    createdById: 'user3',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-10')
  },
  {
    id: '305',
    projectId: '3',
    phaseId: 'design-3',
    artifactType: 'prototype',
    name: 'Interactive Prototype',
    description: 'Clickable prototype of the final design direction',
    version: 1,
    status: 'draft',
    createdById: 'user1',
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15')
  }
];

// Mock API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const projectService = {
  // Get all projects
  async getAll(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
    
    return data || [];
  },
  
  // Get projects by brand ID
  async getByBrandId(brandId: string): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('brand_id', brandId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching projects for brand ${brandId}:`, error);
      throw error;
    }
    
    return data || [];
  },
  
  // Get project by ID
  async getById(id: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching project with ID ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  // Create a new project with all phases initialized
  async create(project: InsertProject): Promise<Project> {
    const newProject: InsertProject = {
      ...project,
      current_phase: 'discovery',
      discovery_complete: false,
      definition_complete: false,
      design_complete: false,
      development_complete: false,
      status: 'active'
    };

    const { data, error } = await supabase
      .from('projects')
      .insert(newProject)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating project:', error);
      throw error;
    }
    
    // Initialize project phases
    try {
      await projectPhaseService.initializeProjectPhases(data.id);
      
      // Initialize default artifacts for the discovery phase
      await projectArtifactService.initializePhaseArtifacts(data.id, 'discovery');
    } catch (phaseError) {
      console.error('Error initializing project phases:', phaseError);
      // Consider adding cleanup if phase initialization fails
    }
    
    return data;
  },
  
  // Update a project
  async update(id: string, updates: UpdateProject): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating project with ID ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  // Change project status
  async updateStatus(id: string, status: ProjectStatus): Promise<Project> {
    return this.update(id, { status });
  },
  
  // Delete a project
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting project with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Advance project to next phase
  async advancePhase(id: string): Promise<void> {
    const project = await this.getById(id);
    if (!project) {
      throw new Error(`Project with ID ${id} not found`);
    }

    const currentPhase = project.current_phase as PhaseType;
    await projectPhaseService.completePhase(id, currentPhase);
  },
  
  // Get project with all related phases and artifacts
  async getProjectWithDetails(id: string): Promise<{
    project: Project;
    phases: any[];
    artifacts: any[];
  }> {
    const project = await this.getById(id);
    if (!project) {
      throw new Error(`Project with ID ${id} not found`);
    }
    
    const phases = await projectPhaseService.getProjectPhases(id);
    const artifacts = await projectArtifactService.getProjectArtifacts(id);
    
    return {
      project,
      phases,
      artifacts
    };
  },
  
  // Get all projects
  async getProjects(): Promise<Project[]> {
    await delay(500); // Simulate API delay
    return [...mockProjects];
  },
  
  // Get a single project by ID
  async getProject(id: string): Promise<Project | undefined> {
    await delay(300);
    return mockProjects.find(project => project.id === id);
  },
  
  // Get artifacts for a project
  async getProjectArtifacts(projectId: string): Promise<Artifact[]> {
    await delay(400);
    return mockArtifacts.filter(artifact => artifact.projectId === projectId);
  },
  
  // Create a new project
  async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    await delay(600);
    
    const newProject: Project = {
      ...project,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    mockProjects.push(newProject);
    return newProject;
  },
  
  // Update a project
  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    await delay(500);
    
    const index = mockProjects.findIndex(project => project.id === id);
    if (index === -1) {
      throw new Error('Project not found');
    }
    
    const updatedProject = {
      ...mockProjects[index],
      ...updates,
      updatedAt: new Date()
    };
    
    mockProjects[index] = updatedProject;
    return updatedProject;
  },
  
  // Advance a project to the next phase
  async advanceProjectPhase(id: string, newPhase: ProjectPhase): Promise<Project> {
    await delay(700);
    
    const index = mockProjects.findIndex(project => project.id === id);
    if (index === -1) {
      throw new Error('Project not found');
    }
    
    const updatedProject = {
      ...mockProjects[index],
      currentPhase: newPhase,
      updatedAt: new Date()
    };
    
    mockProjects[index] = updatedProject;
    return updatedProject;
  },
  
  // Create a new artifact
  async createArtifact(artifact: Omit<Artifact, 'id' | 'version' | 'createdAt' | 'updatedAt'>): Promise<Artifact> {
    await delay(600);
    
    const newArtifact: Artifact = {
      ...artifact,
      id: uuidv4(),
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    mockArtifacts.push(newArtifact);
    return newArtifact;
  },
  
  // Update an artifact
  async updateArtifact(id: string, updates: Partial<Artifact>): Promise<Artifact> {
    await delay(500);
    
    const index = mockArtifacts.findIndex(artifact => artifact.id === id);
    if (index === -1) {
      throw new Error('Artifact not found');
    }
    
    const updatedArtifact = {
      ...mockArtifacts[index],
      ...updates,
      updatedAt: new Date()
    };
    
    if (updates.content || updates.fileUrl) {
      updatedArtifact.version = (mockArtifacts[index].version || 0) + 1;
    }
    
    mockArtifacts[index] = updatedArtifact;
    return updatedArtifact;
  },
  
  // Update an artifact's status
  async updateArtifactStatus(id: string, status: ArtifactStatus): Promise<Artifact> {
    await delay(400);
    
    const index = mockArtifacts.findIndex(artifact => artifact.id === id);
    if (index === -1) {
      throw new Error('Artifact not found');
    }
    
    const updatedArtifact = {
      ...mockArtifacts[index],
      status,
      updatedAt: new Date()
    };
    
    mockArtifacts[index] = updatedArtifact;
    return updatedArtifact;
  }
}; 