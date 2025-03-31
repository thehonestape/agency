import React, { useState } from 'react';
import { Project, ProjectPhase, PhaseStatus, Artifact, ArtifactStatus } from '@types/project.types';
import { ProjectPhases } from '@patterns/lists/ProjectPhases';
import { PhaseArtifacts } from '@patterns/lists/PhaseArtifacts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/Card';
import { Button } from '@ui/button';
import { FiArrowRight, FiCalendar, FiClock, FiInfo } from 'react-icons/fi';

interface ProjectDetailsProps {
  project: Project;
  artifacts: Artifact[];
  onViewArtifact?: (artifact: Artifact) => void;
  onEditArtifact?: (artifact: Artifact) => void;
  onCreateArtifact?: (phaseType: ProjectPhase, artifactType: string, name: string) => void;
  onUpdateArtifactStatus?: (artifactId: string, status: ArtifactStatus) => void;
  onAdvancePhase?: (phase: ProjectPhase) => void;
  readOnly?: boolean;
}

export function ProjectDetails({
  project,
  artifacts,
  onViewArtifact,
  onEditArtifact,
  onCreateArtifact,
  onUpdateArtifactStatus,
  onAdvancePhase,
  readOnly = false
}: ProjectDetailsProps) {
  const [selectedPhase, setSelectedPhase] = useState<ProjectPhase>(project.currentPhase);

  const phaseStatuses: Record<ProjectPhase, PhaseStatus> = {
    'discovery': getPhaseStatus('discovery'),
    'definition': getPhaseStatus('definition'),
    'design': getPhaseStatus('design'),
    'development': getPhaseStatus('development')
  };

  function getPhaseStatus(phase: ProjectPhase): PhaseStatus {
    const phaseOrder = ['discovery', 'definition', 'design', 'development'];
    const currentPhaseIndex = phaseOrder.indexOf(project.currentPhase);
    const phaseIndex = phaseOrder.indexOf(phase);

    if (phaseIndex < currentPhaseIndex) {
      return 'completed';
    } else if (phaseIndex === currentPhaseIndex) {
      return 'in_progress';
    } else {
      return 'not_started';
    }
  }

  function getPhaseArtifacts(phase: ProjectPhase): Artifact[] {
    return artifacts.filter(artifact => {
      // We're simplifying here - in a real app, you'd have a proper phase ID reference
      const artifactPhase = artifact.phaseId.split('-')[0] as ProjectPhase;
      return artifactPhase === phase;
    });
  }

  function handlePhaseClick(phase: ProjectPhase) {
    setSelectedPhase(phase);
  }

  function handleCreateArtifact(artifactType: string, name: string) {
    if (onCreateArtifact) {
      onCreateArtifact(selectedPhase, artifactType, name);
    }
  }

  function handleAdvanceToNextPhase() {
    const phaseOrder = ['discovery', 'definition', 'design', 'development'];
    const currentPhaseIndex = phaseOrder.indexOf(project.currentPhase);
    
    if (currentPhaseIndex < phaseOrder.length - 1) {
      const nextPhase = phaseOrder[currentPhaseIndex + 1] as ProjectPhase;
      if (onAdvancePhase) {
        onAdvancePhase(nextPhase);
      }
    }
  }

  const canAdvancePhase = (): boolean => {
    if (project.currentPhase === 'development') {
      return false; // Already at the final phase
    }

    // Check if all required artifacts for the current phase are approved
    const currentPhaseArtifacts = getPhaseArtifacts(project.currentPhase);
    const allRequiredArtifactsApproved = currentPhaseArtifacts.length > 0 && 
      currentPhaseArtifacts.every(artifact => artifact.status === 'approved');
    
    return allRequiredArtifactsApproved;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description || 'No description provided'}</CardDescription>
            </div>
            
            {!readOnly && canAdvancePhase() && (
              <Button onClick={handleAdvanceToNextPhase} className="flex items-center">
                <FiArrowRight className="mr-2" />
                Advance to Next Phase
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center">
              <FiInfo className="mr-1" />
              <span>Status: <span className="font-medium capitalize">{project.status}</span></span>
            </div>
            {project.startDate && (
              <div className="flex items-center">
                <FiCalendar className="mr-1" />
                <span>Started: <span className="font-medium">{new Date(project.startDate).toLocaleDateString()}</span></span>
              </div>
            )}
            {project.targetCompletionDate && (
              <div className="flex items-center">
                <FiClock className="mr-1" />
                <span>Target Completion: <span className="font-medium">{new Date(project.targetCompletionDate).toLocaleDateString()}</span></span>
              </div>
            )}
          </div>
          
          <ProjectPhases
            currentPhase={project.currentPhase}
            phaseStatuses={phaseStatuses}
            onPhaseClick={handlePhaseClick}
            readOnly={readOnly}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="capitalize">{selectedPhase} Phase</CardTitle>
          <CardDescription>Manage deliverables for this phase of the project</CardDescription>
        </CardHeader>
        <CardContent>
          <PhaseArtifacts 
            phaseType={selectedPhase}
            artifacts={getPhaseArtifacts(selectedPhase)}
            onViewArtifact={onViewArtifact}
            onEditArtifact={onEditArtifact}
            onCreateArtifact={handleCreateArtifact}
            onUpdateArtifactStatus={onUpdateArtifactStatus}
            readOnly={readOnly || phaseStatuses[selectedPhase] === 'not_started'}
          />
        </CardContent>
      </Card>
    </div>
  );
} 