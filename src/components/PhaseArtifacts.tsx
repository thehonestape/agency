import React, { useState } from 'react';
import { 
  Artifact, 
  ArtifactStatus, 
  ProjectPhase 
} from '../types/project.types';
import { 
  FiFile, 
  FiFileText, 
  FiImage, 
  FiPaperclip, 
  FiCheckCircle,
  FiClock,
  FiEdit,
  FiPlus,
  FiRotateCcw,
  FiTrash2,
  FiUpload,
  FiX
} from 'react-icons/fi';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { cn } from '../lib/utils';

const DEFAULT_ARTIFACTS_BY_PHASE: Record<ProjectPhase, { type: string, name: string }[]> = {
  'discovery': [
    { type: 'creative_brief', name: 'Creative Brief' },
    { type: 'brand_audit', name: 'Brand Audit' },
    { type: 'kickoff_notes', name: 'Kickoff Meeting Notes' },
    { type: 'research', name: 'Research Document' }
  ],
  'definition': [
    { type: 'brand_strategy', name: 'Brand Strategy' },
    { type: 'user_research', name: 'User Research' },
    { type: 'information_architecture', name: 'Information Architecture' },
    { type: 'content_plan', name: 'Content Plan' }
  ],
  'design': [
    { type: 'moodboard', name: 'Moodboard' },
    { type: 'concept_directions', name: 'Concept Directions' },
    { type: 'design_system', name: 'Design System' },
    { type: 'prototype', name: 'Interactive Prototype' }
  ],
  'development': [
    { type: 'asset_handoff', name: 'Asset Handoff' },
    { type: 'technical_documentation', name: 'Technical Documentation' },
    { type: 'implementation_plan', name: 'Implementation Plan' },
    { type: 'training_materials', name: 'Training Materials' }
  ]
};

interface PhaseArtifactsProps {
  phaseType: ProjectPhase;
  artifacts: Artifact[];
  onViewArtifact?: (artifact: Artifact) => void;
  onEditArtifact?: (artifact: Artifact) => void;
  onCreateArtifact?: (artifactType: string, name: string) => void;
  onUpdateArtifactStatus?: (artifactId: string, status: ArtifactStatus) => void;
  readOnly?: boolean;
}

export function PhaseArtifacts({
  phaseType,
  artifacts,
  onViewArtifact,
  onEditArtifact,
  onCreateArtifact,
  onUpdateArtifactStatus,
  readOnly = false
}: PhaseArtifactsProps) {
  const [isCreating, setIsCreating] = useState(false);

  const getDefaultArtifacts = () => {
    return DEFAULT_ARTIFACTS_BY_PHASE[phaseType];
  };

  const getMissingArtifacts = () => {
    const defaultArtifacts = getDefaultArtifacts();
    const existingTypes = artifacts.map(a => a.artifactType);
    
    return defaultArtifacts.filter(a => !existingTypes.includes(a.type));
  };

  const getArtifactIcon = (artifactType: string) => {
    const icons: Record<string, React.ReactNode> = {
      'creative_brief': <FiFileText className="w-5 h-5" />,
      'brand_audit': <FiFileText className="w-5 h-5" />,
      'research': <FiFileText className="w-5 h-5" />,
      'kickoff_notes': <FiFileText className="w-5 h-5" />,
      'brand_strategy': <FiFileText className="w-5 h-5" />,
      'user_research': <FiFileText className="w-5 h-5" />,
      'information_architecture': <FiFileText className="w-5 h-5" />,
      'content_plan': <FiFileText className="w-5 h-5" />,
      'moodboard': <FiImage className="w-5 h-5" />,
      'concept_directions': <FiImage className="w-5 h-5" />,
      'design_system': <FiFileText className="w-5 h-5" />,
      'prototype': <FiFileText className="w-5 h-5" />,
      'asset_handoff': <FiPaperclip className="w-5 h-5" />,
      'technical_documentation': <FiFileText className="w-5 h-5" />,
      'implementation_plan': <FiFileText className="w-5 h-5" />,
      'training_materials': <FiFileText className="w-5 h-5" />
    };
    
    return icons[artifactType] || <FiFile className="w-5 h-5" />;
  };

  const getStatusColor = (status: ArtifactStatus) => {
    switch (status) {
      case 'draft':
        return 'bg-blue-100 text-blue-800';
      case 'review':
        return 'bg-amber-100 text-amber-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: ArtifactStatus) => {
    switch (status) {
      case 'draft':
        return <FiEdit className="w-4 h-4" />;
      case 'review':
        return <FiClock className="w-4 h-4" />;
      case 'approved':
        return <FiCheckCircle className="w-4 h-4" />;
      case 'archived':
        return <FiX className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleCreateMissingArtifact = (artifactType: string, name: string) => {
    if (onCreateArtifact) {
      onCreateArtifact(artifactType, name);
    }
    setIsCreating(false);
  };

  const handleStatusUpdate = (artifactId: string, status: ArtifactStatus) => {
    if (onUpdateArtifactStatus) {
      onUpdateArtifactStatus(artifactId, status);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Phase Artifacts</h3>
        
        {!readOnly && !isCreating && getMissingArtifacts().length > 0 && (
          <Button
            variant="outline"
            onClick={() => setIsCreating(true)}
            className="flex items-center"
          >
            <FiPlus className="mr-2 w-4 h-4" />
            Add Artifact
          </Button>
        )}
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Artifact</CardTitle>
            <CardDescription>
              Select an artifact type to create
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {getMissingArtifacts().map((artifact) => (
                <div
                  key={artifact.type}
                  onClick={() => handleCreateMissingArtifact(artifact.type, artifact.name)}
                  className="p-3 border rounded-md flex items-center cursor-pointer hover:bg-muted"
                >
                  <div className="mr-3 text-primary">
                    {getArtifactIcon(artifact.type)}
                  </div>
                  <div>
                    <h4 className="font-medium">{artifact.name}</h4>
                    <p className="text-xs text-muted-foreground">Add to this phase</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              variant="ghost"
              onClick={() => setIsCreating(false)}
            >
              Cancel
            </Button>
          </CardFooter>
        </Card>
      )}

      {artifacts.length === 0 && !isCreating ? (
        <div className="text-center p-8 border border-dashed rounded-md">
          <p className="text-muted-foreground mb-4">No artifacts available for this phase</p>
          {!readOnly && (
            <Button
              variant="outline"
              onClick={() => setIsCreating(true)}
              className="flex items-center mx-auto"
            >
              <FiPlus className="mr-2 w-4 h-4" />
              Create Artifact
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {artifacts.map((artifact) => (
            <Card key={artifact.id} className="overflow-hidden">
              <div className={cn(
                "h-2",
                getStatusColor(artifact.status).split(' ')[0]
              )} />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{artifact.name}</CardTitle>
                  <div className={cn(
                    "flex items-center px-2 py-1 rounded-full text-xs",
                    getStatusColor(artifact.status)
                  )}>
                    {getStatusIcon(artifact.status)}
                    <span className="ml-1 capitalize">{artifact.status}</span>
                  </div>
                </div>
                <CardDescription>
                  {artifact.description || 'No description available'}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-0">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Version {artifact.version}</span>
                  <span className="mx-2">•</span>
                  <span>Updated {new Date(artifact.updatedAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-4">
                <div className="flex space-x-2">
                  {!readOnly && artifact.status !== 'approved' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditArtifact?.(artifact)}
                      className="flex items-center"
                    >
                      <FiEdit className="mr-1 w-4 h-4" />
                      Edit
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewArtifact?.(artifact)}
                    className="flex items-center"
                  >
                    <FiFile className="mr-1 w-4 h-4" />
                    View
                  </Button>
                </div>
                
                {!readOnly && (
                  <div className="flex space-x-2">
                    {artifact.status === 'draft' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate(artifact.id, 'review')}
                        className="flex items-center"
                      >
                        <FiUpload className="mr-1 w-4 h-4" />
                        Submit
                      </Button>
                    )}
                    
                    {artifact.status === 'review' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(artifact.id, 'draft')}
                          className="flex items-center"
                        >
                          <FiRotateCcw className="mr-1 w-4 h-4" />
                          Revise
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(artifact.id, 'approved')}
                          className="flex items-center text-green-600"
                        >
                          <FiCheckCircle className="mr-1 w-4 h-4" />
                          Approve
                        </Button>
                      </>
                    )}
                    
                    {artifact.status === 'approved' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate(artifact.id, 'archived')}
                        className="flex items-center"
                      >
                        <FiTrash2 className="mr-1 w-4 h-4" />
                        Archive
                      </Button>
                    )}
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 