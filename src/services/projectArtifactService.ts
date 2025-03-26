import { supabase } from '../lib/supabase';
import type { Database } from '../types/database.types';
import { PhaseType } from './projectPhaseService';

export type ProjectArtifact = Database['public']['Tables']['project_artifacts']['Row'];
export type InsertProjectArtifact = Database['public']['Tables']['project_artifacts']['Insert'];
export type UpdateProjectArtifact = Database['public']['Tables']['project_artifacts']['Update'];

export type ArtifactStatus = 'draft' | 'review' | 'approved' | 'archived';

// Define artifact types by phase
export const phaseArtifactTypes: Record<PhaseType, string[]> = {
  'discovery': ['creative_brief', 'brand_inventory', 'competitive_analysis', 'user_research'],
  'definition': ['brand_strategy', 'user_personas', 'information_architecture', 'content_plan', 'wireframes'],
  'design': ['brand_identity', 'visual_design', 'prototype', 'design_system'],
  'development': ['asset_handoff', 'implementation_guide', 'deployment_plan', 'training_materials']
};

export const projectArtifactService = {
  // Create a new artifact
  async createArtifact(artifact: InsertProjectArtifact): Promise<ProjectArtifact> {
    const { data, error } = await supabase
      .from('project_artifacts')
      .insert(artifact)
      .select()
      .single();

    if (error) {
      console.error('Error creating artifact:', error);
      throw error;
    }

    return data;
  },

  // Get all artifacts for a project
  async getProjectArtifacts(projectId: string): Promise<ProjectArtifact[]> {
    const { data, error } = await supabase
      .from('project_artifacts')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`Error fetching artifacts for project ${projectId}:`, error);
      throw error;
    }

    return data || [];
  },

  // Get artifacts for a specific phase
  async getPhaseArtifacts(projectId: string, phase: PhaseType): Promise<ProjectArtifact[]> {
    const { data, error } = await supabase
      .from('project_artifacts')
      .select('*')
      .eq('project_id', projectId)
      .eq('phase', phase)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`Error fetching ${phase} artifacts for project ${projectId}:`, error);
      throw error;
    }

    return data || [];
  },

  // Get a specific artifact
  async getArtifact(artifactId: string): Promise<ProjectArtifact> {
    const { data, error } = await supabase
      .from('project_artifacts')
      .select('*')
      .eq('id', artifactId)
      .single();

    if (error) {
      console.error(`Error fetching artifact ${artifactId}:`, error);
      throw error;
    }

    return data;
  },

  // Update an artifact
  async updateArtifact(artifactId: string, updates: UpdateProjectArtifact): Promise<ProjectArtifact> {
    const { data, error } = await supabase
      .from('project_artifacts')
      .update(updates)
      .eq('id', artifactId)
      .select()
      .single();

    if (error) {
      console.error(`Error updating artifact ${artifactId}:`, error);
      throw error;
    }

    return data;
  },

  // Update artifact status
  async updateArtifactStatus(artifactId: string, status: ArtifactStatus): Promise<ProjectArtifact> {
    return this.updateArtifact(artifactId, { status });
  },

  // Delete an artifact
  async deleteArtifact(artifactId: string): Promise<void> {
    const { error } = await supabase
      .from('project_artifacts')
      .delete()
      .eq('id', artifactId);

    if (error) {
      console.error(`Error deleting artifact ${artifactId}:`, error);
      throw error;
    }
  },

  // Initialize default artifacts for a phase
  async initializePhaseArtifacts(projectId: string, phase: PhaseType): Promise<ProjectArtifact[]> {
    const artifactTypes = phaseArtifactTypes[phase];
    
    const artifacts: InsertProjectArtifact[] = artifactTypes.map(type => ({
      project_id: projectId,
      phase,
      artifact_type: type,
      status: 'draft',
      content: {}
    }));

    const { data, error } = await supabase
      .from('project_artifacts')
      .insert(artifacts)
      .select();

    if (error) {
      console.error(`Error initializing artifacts for ${phase} phase:`, error);
      throw error;
    }

    return data || [];
  },

  // Get the default content template for an artifact type
  getDefaultContent(artifactType: string): Record<string, any> {
    const templates: Record<string, Record<string, any>> = {
      creative_brief: {
        projectObjectives: '',
        targetAudience: '',
        keyMessages: [],
        brandGuidelines: '',
        deliverables: [],
        timeline: { milestones: [] }
      },
      brand_strategy: {
        brandStory: '',
        brandPersonality: [],
        brandVoice: '',
        brandPromise: '',
        competitiveAnalysis: { competitors: [] }
      },
      wireframes: {
        screens: []
      },
      visual_design: {
        designDirection: '',
        colorPalette: [],
        typography: {
          primary: '',
          secondary: '',
          usageGuidelines: ''
        },
        compositions: []
      },
      design_system: {
        components: [],
        patterns: []
      }
      // Add more templates as needed
    };

    return templates[artifactType] || {};
  }
}; 