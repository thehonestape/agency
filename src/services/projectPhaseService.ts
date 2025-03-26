import { supabase } from '../lib/supabase';
import type { Database } from '../types/database.types';

export type ProjectPhase = Database['public']['Tables']['project_phases']['Row'];
export type InsertProjectPhase = Database['public']['Tables']['project_phases']['Insert'];
export type UpdateProjectPhase = Database['public']['Tables']['project_phases']['Update'];

export type PhaseType = 'discovery' | 'definition' | 'design' | 'development';
export type PhaseStatus = 'not_started' | 'in_progress' | 'review' | 'completed';

export const projectPhaseService = {
  // Initialize phases for a new project
  async initializeProjectPhases(projectId: string): Promise<ProjectPhase[]> {
    const phases: InsertProjectPhase[] = [
      {
        project_id: projectId,
        phase_type: 'discovery',
        status: 'not_started',
      },
      {
        project_id: projectId,
        phase_type: 'definition',
        status: 'not_started',
      },
      {
        project_id: projectId,
        phase_type: 'design',
        status: 'not_started',
      },
      {
        project_id: projectId,
        phase_type: 'development',
        status: 'not_started',
      },
    ];

    const { data, error } = await supabase
      .from('project_phases')
      .insert(phases)
      .select();

    if (error) {
      console.error('Error initializing project phases:', error);
      throw error;
    }

    // Set the first phase (discovery) to in_progress
    await this.startPhase(projectId, 'discovery');

    return data || [];
  },

  // Get all phases for a project
  async getProjectPhases(projectId: string): Promise<ProjectPhase[]> {
    const { data, error } = await supabase
      .from('project_phases')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error(`Error fetching phases for project ${projectId}:`, error);
      throw error;
    }

    return data || [];
  },

  // Get a specific phase
  async getPhase(phaseId: string): Promise<ProjectPhase> {
    const { data, error } = await supabase
      .from('project_phases')
      .select('*')
      .eq('id', phaseId)
      .single();

    if (error) {
      console.error(`Error fetching phase ${phaseId}:`, error);
      throw error;
    }

    return data;
  },

  // Update a phase
  async updatePhase(phaseId: string, updates: UpdateProjectPhase): Promise<ProjectPhase> {
    const { data, error } = await supabase
      .from('project_phases')
      .update(updates)
      .eq('id', phaseId)
      .select()
      .single();

    if (error) {
      console.error(`Error updating phase ${phaseId}:`, error);
      throw error;
    }

    return data;
  },

  // Start a specific phase
  async startPhase(projectId: string, phaseType: PhaseType): Promise<void> {
    // Update the current phase in the project
    const { error: projectError } = await supabase
      .from('projects')
      .update({ current_phase: phaseType })
      .eq('id', projectId);

    if (projectError) {
      console.error(`Error updating project ${projectId} current phase:`, projectError);
      throw projectError;
    }

    // Update the phase status to in_progress and set the start date
    const { error: phaseError } = await supabase
      .from('project_phases')
      .update({
        status: 'in_progress',
        start_date: new Date().toISOString(),
      })
      .eq('project_id', projectId)
      .eq('phase_type', phaseType);

    if (phaseError) {
      console.error(`Error starting phase ${phaseType} for project ${projectId}:`, phaseError);
      throw phaseError;
    }
  },

  // Complete a phase
  async completePhase(projectId: string, phaseType: PhaseType): Promise<void> {
    const nextPhaseMap: Record<PhaseType, PhaseType | null> = {
      'discovery': 'definition',
      'definition': 'design',
      'design': 'development',
      'development': null,
    };

    // Mark the current phase as completed
    const { error: phaseError } = await supabase
      .from('project_phases')
      .update({
        status: 'completed',
        completion_date: new Date().toISOString(),
      })
      .eq('project_id', projectId)
      .eq('phase_type', phaseType);

    if (phaseError) {
      console.error(`Error completing phase ${phaseType} for project ${projectId}:`, phaseError);
      throw phaseError;
    }

    // Update the project to mark this phase as complete
    const phaseCompleteField = `${phaseType}_complete`;
    const { error: projectError } = await supabase
      .from('projects')
      .update({ [phaseCompleteField]: true })
      .eq('id', projectId);

    if (projectError) {
      console.error(`Error updating project ${projectId} phase completion:`, projectError);
      throw projectError;
    }

    // Start the next phase if there is one
    const nextPhase = nextPhaseMap[phaseType];
    if (nextPhase) {
      await this.startPhase(projectId, nextPhase);
    } else {
      // If this was the last phase, mark the project as completed
      const { error: completeError } = await supabase
        .from('projects')
        .update({ status: 'completed' })
        .eq('id', projectId);

      if (completeError) {
        console.error(`Error marking project ${projectId} as completed:`, completeError);
        throw completeError;
      }
    }
  },
}; 