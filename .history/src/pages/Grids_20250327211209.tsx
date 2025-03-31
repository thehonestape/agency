import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { ProjectDashboard } from '../components/patterns/dashboard/ProjectDashboard';
import { AIUsageDashboard } from '../components/patterns/dashboard/AIUsageDashboard';
import { AIAnalyticsDashboard } from '../components/patterns/dashboard/AIAnalyticsDashboard';

// Mock data for demonstration
const mockProject = {
  id: '1',
  name: 'Sample Project',
  clientId: 'client1',
  description: 'A sample project for demonstration',
  currentPhase: 'discovery' as const,
  startDate: new Date(),
  targetCompletionDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  status: 'active' as const,
  createdAt: new Date(),
  updatedAt: new Date()
};

const mockArtifacts = [
  {
    id: '1',
    phaseId: 'discovery-1',
    name: 'Project Brief',
    status: 'approved' as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    projectId: '1',
    artifactType: 'document' as const,
    version: 1,
    createdById: 'user1'
  }
];

const Grids: React.FC = () => {
  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Grid Patterns</h1>
            <p className="text-muted-foreground">Explore our collection of grid layouts and dashboard patterns</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Dashboard</CardTitle>
            <CardDescription>Project overview with metrics and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <ProjectDashboard 
              projects={[mockProject]}
              selectedProject={mockProject}
              artifacts={mockArtifacts}
              onSelectProject={() => {}}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Usage Dashboard</CardTitle>
            <CardDescription>AI service usage analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <AIUsageDashboard />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Analytics Dashboard</CardTitle>
            <CardDescription>AI performance and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <AIAnalyticsDashboard />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Grids; 