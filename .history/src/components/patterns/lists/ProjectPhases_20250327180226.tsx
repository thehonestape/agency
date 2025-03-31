import React from 'react';
import { PhaseStatus, ProjectPhase } from '@types/project';
import { FiCheckCircle, FiCircle, FiClock, FiRefreshCw } from 'react-icons/fi';
import { cn } from '@lib/utils';

interface ProjectPhasesProps {
  currentPhase: ProjectPhase;
  phaseStatuses: Record<ProjectPhase, PhaseStatus>;
  onPhaseClick?: (phase: ProjectPhase) => void;
  readOnly?: boolean;
}

export function ProjectPhases({ 
  currentPhase, 
  phaseStatuses, 
  onPhaseClick,
  readOnly = false 
}: ProjectPhasesProps) {
  
  const phases: ProjectPhase[] = ['discovery', 'definition', 'design', 'development'];
  
  const getPhaseIcon = (phase: ProjectPhase) => {
    const status = phaseStatuses[phase];
    
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="w-6 h-6 text-green-500" />;
      case 'in_progress':
        return <FiRefreshCw className="w-6 h-6 text-blue-500 animate-spin-slow" />;
      case 'review':
        return <FiClock className="w-6 h-6 text-amber-500" />;
      case 'not_started':
      default:
        return <FiCircle className="w-6 h-6 text-gray-300" />;
    }
  };
  
  const getPhaseLabel = (phase: ProjectPhase) => {
    switch (phase) {
      case 'discovery':
        return 'Discovery';
      case 'definition':
        return 'Definition';
      case 'design':
        return 'Design';
      case 'development':
        return 'Development';
      default:
        return (phase as string).charAt(0).toUpperCase() + (phase as string).slice(1);
    }
  };
  
  const getPhaseDescription = (phase: ProjectPhase) => {
    switch (phase) {
      case 'discovery':
        return 'Research, brand audits, kickoff meetings, creative briefs';
      case 'definition':
        return 'Brand strategy, user research, information architecture';
      case 'design':
        return 'Visual design, prototyping, design system';
      case 'development':
        return 'Implementation, testing, deployment, training';
      default:
        return '';
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute top-5 left-7 right-7 h-1 bg-gray-200">
          <div 
            className="absolute h-full bg-primary transition-all duration-500"
            style={{ 
              width: phases.indexOf(currentPhase) === 0 ? '0%' : 
                     phases.indexOf(currentPhase) === 1 ? '33.3%' : 
                     phases.indexOf(currentPhase) === 2 ? '66.6%' : '100%' 
            }}
          />
        </div>
        
        <div className="flex justify-between relative z-10">
          {phases.map((phase, index) => (
            <div 
              key={phase} 
              className={cn(
                "flex flex-col items-center cursor-pointer transition-all",
                readOnly ? "opacity-80" : "hover:opacity-100",
                (phaseStatuses[phase] === 'not_started' && phase !== currentPhase) && "opacity-50"
              )}
              onClick={() => !readOnly && onPhaseClick?.(phase)}
            >
              <div className="bg-card rounded-full p-2 mb-2 border">
                {getPhaseIcon(phase)}
              </div>
              <span className="font-medium text-sm">{getPhaseLabel(phase)}</span>
              <div className="text-muted-foreground text-xs text-center mt-1 max-w-32">
                {getPhaseDescription(phase)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 