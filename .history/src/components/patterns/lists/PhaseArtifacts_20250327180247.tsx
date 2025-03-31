import React from "react";
import { Artifact, ArtifactStatus } from "@types/project.types";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/Card";
import { Badge } from "@ui/badge";
import { FiFile, FiCheck, FiClock, FiAlertCircle } from "react-icons/fi";

interface PhaseArtifactsProps {
  artifacts: Artifact[];
}

const statusIcons = {
  [ArtifactStatus.COMPLETED]: FiCheck,
  [ArtifactStatus.IN_PROGRESS]: FiClock,
  [ArtifactStatus.PENDING]: FiAlertCircle,
};

const statusColors = {
  [ArtifactStatus.COMPLETED]: "bg-green-100 text-green-800",
  [ArtifactStatus.IN_PROGRESS]: "bg-blue-100 text-blue-800",
  [ArtifactStatus.PENDING]: "bg-yellow-100 text-yellow-800",
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
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <FiFile className="w-5 h-5 text-gray-500" />
                  <div>
                    <h4 className="font-medium">{artifact.name}</h4>
                    <p className="text-sm text-gray-500">{artifact.description}</p>
                  </div>
                </div>
                <Badge className={statusColors[artifact.status]}>
                  <StatusIcon className="w-4 h-4 mr-1" />
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