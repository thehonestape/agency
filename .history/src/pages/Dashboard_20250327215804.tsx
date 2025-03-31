import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ProjectDashboard } from '../components/patterns/dashboard/ProjectDashboard';
import { AIUsageDashboard } from '../components/patterns/dashboard/AIUsageDashboard';
import { AIAnalyticsDashboard } from '../components/patterns/dashboard/AIAnalyticsDashboard';

// Mock data for the dashboard
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

const mockProjects = [mockProject];

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

/**
 * Dashboard overview page
 * To be used within the DashboardLayout
 */
const Dashboard: React.FC = () => {
  return (
    <div className="grid gap-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Status</CardTitle>
                <CardDescription>Overview of your current projects</CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectDashboard 
                  projects={mockProjects}
                  selectedProject={mockProject}
                  artifacts={mockArtifacts}
                  onSelectProject={() => {}}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>AI Usage</CardTitle>
                <CardDescription>Overview of your AI usage</CardDescription>
              </CardHeader>
              <CardContent>
                <AIUsageDashboard usage={undefined} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Dashboard</CardTitle>
              <CardDescription>Detailed view of your projects</CardDescription>
            </CardHeader>
            <CardContent className="h-[600px]">
              <ProjectDashboard 
                projects={mockProjects}
                selectedProject={mockProject}
                artifacts={mockArtifacts}
                onSelectProject={() => {}}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Analytics</CardTitle>
              <CardDescription>Detailed analytics of your AI usage</CardDescription>
            </CardHeader>
            <CardContent className="h-[600px]">
              <AIAnalyticsDashboard userId="user1" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard; 