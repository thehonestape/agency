import React from 'react';
import { Artifact, ArtifactStatus } from '@/types/project.types';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/Card';
import { Badge } from '@ui/badge';
import { FiFile, FiCheck, FiClock, FiAlertCircle } from 'react-icons/fi';

interface PhaseArtifactsProps {
  artifacts: Artifact[];
}

const statusIcons: Record<ArtifactStatus, React.ElementType> = {
  draft: FiAlertCircle,
  review: FiClock,
  approved: FiCheck,
  archived: FiFile,
};

const statusColors: Record<ArtifactStatus, string> = {
  draft: 'bg-yellow-100 text-yellow-800',
  review: 'bg-blue-100 text-blue-800',
  approved: 'bg-green-100 text-green-800',
  archived: 'bg-gray-100 text-gray-800',
};

export const PhaseArtifacts: React.FC<PhaseArtifactsProps> = ({ artifacts }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Artifacts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {artifacts.map((artifact) => {
            const StatusIcon = statusIcons[artifact.status];
            return (
              <div
                key={artifact.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center space-x-3">
                  <FiFile className="h-5 w-5 text-gray-500" />
                  <div>
                    <h4 className="font-medium">{artifact.name}</h4>
                    <p className="text-sm text-gray-500">{artifact.description}</p>
                  </div>
                </div>
                <Badge className={statusColors[artifact.status]}>
                  <StatusIcon className="mr-1 h-4 w-4" />
                  {artifact.status}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
