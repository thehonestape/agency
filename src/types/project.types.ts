export type ProjectPhase = 'discovery' | 'definition' | 'design' | 'development';

export type ProjectStatus = 'active' | 'paused' | 'completed' | 'archived';

export type PhaseStatus = 'not_started' | 'in_progress' | 'review' | 'completed';

export type ArtifactStatus = 'draft' | 'review' | 'approved' | 'archived';

export interface Project {
  id: string;
  name: string;
  clientId: string;
  description?: string;
  currentPhase: ProjectPhase;
  startDate?: Date;
  targetCompletionDate?: Date;
  actualCompletionDate?: Date;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectPhaseData {
  id: string;
  projectId: string;
  phaseType: ProjectPhase;
  startDate?: Date;
  completionDate?: Date;
  status: PhaseStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type ArtifactType = 'document' | 'design' | 'code' | 'other';

export interface Artifact {
  id: string;
  projectId: string;
  phaseId: string;
  artifactType: ArtifactType;
  name: string;
  description?: string;
  version: number;
  status: ArtifactStatus;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
} 