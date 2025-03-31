import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { OrganizationList } from '../components/patterns/lists/OrganizationList';
import { ProjectList } from '../components/patterns/lists/ProjectList';
import { ProjectPhases } from '../components/patterns/lists/ProjectPhases';
import { ProjectDetails } from '../components/patterns/lists/ProjectDetails';
import { AssetList } from '../components/patterns/lists/AssetList';
import { AssetDetails } from '../components/patterns/lists/AssetDetails';

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

const mockAssets = [
  {
    id: '1',
    project_id: '1',
    type: 'image' as const,
    file_url: 'https://example.com/image.jpg',
    version: 1,
    metadata: { name: 'Sample Image' },
    content: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const Lists: React.FC = () => {
  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">List Patterns</h1>
            <p className="text-muted-foreground">Explore our collection of list components and patterns</p>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Organization List</CardTitle>
            <CardDescription>List of organizations with actions</CardDescription>
          </CardHeader>
          <CardContent>
            <OrganizationList />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project List</CardTitle>
            <CardDescription>List of projects with status</CardDescription>
          </CardHeader>
          <CardContent>
            <ProjectList 
              brandId="brand1"
              onSelectProject={() => {}}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Phases</CardTitle>
            <CardDescription>Project phase tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <ProjectPhases 
              currentPhase="discovery"
              phaseStatuses={{
                discovery: 'in_progress',
                definition: 'not_started',
                design: 'not_started',
                development: 'not_started'
              }}
              onPhaseClick={() => {}}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Detailed project information</CardDescription>
          </CardHeader>
          <CardContent>
            <ProjectDetails 
              project={mockProject}
              artifacts={mockArtifacts}
              onViewArtifact={() => {}}
              onEditArtifact={() => {}}
              onCreateArtifact={() => {}}
              onUpdateArtifactStatus={() => {}}
              onAdvancePhase={() => {}}
              readOnly={false}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Asset List</CardTitle>
            <CardDescription>List of assets with metadata</CardDescription>
          </CardHeader>
          <CardContent>
            <AssetList 
              assets={mockAssets}
              onSelect={() => {}}
              onDelete={() => {}}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Asset Details</CardTitle>
            <CardDescription>Detailed asset information</CardDescription>
          </CardHeader>
          <CardContent>
            <AssetDetails />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Lists; 