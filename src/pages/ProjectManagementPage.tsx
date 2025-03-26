import React, { useState, useEffect } from 'react';
import { mockProjectService } from '../services/mockProjectService';
import { Project, Artifact, ProjectPhase, ArtifactStatus } from '../types/project.types';
import { ProjectDetails } from '../components/ProjectDetails';
import { ProjectDashboard } from '../components/ProjectDashboard';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react';
import { Title, Text } from '@tremor/react';

export function ProjectManagementPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectArtifacts, setProjectArtifacts] = useState<Artifact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'dashboard' | 'details'>('dashboard');
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true);
        const data = await mockProjectService.getProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      fetchProjectArtifacts(selectedProject.id);
    }
  }, [selectedProject]);

  async function fetchProjectArtifacts(projectId: string) {
    try {
      const artifacts = await mockProjectService.getProjectArtifacts(projectId);
      setProjectArtifacts(artifacts);
    } catch (err) {
      console.error('Failed to fetch project artifacts:', err);
      setError('Failed to load project artifacts.');
    }
  }

  async function handleViewProject(project: Project) {
    setSelectedProject(project);
    setActiveView('details');
    setActiveTab(1);
  }

  async function handleViewDashboard() {
    setActiveView('dashboard');
    setActiveTab(0);
  }

  async function handleBackToProjects() {
    setSelectedProject(null);
  }

  async function handleAdvancePhase(newPhase: ProjectPhase) {
    if (!selectedProject) return;

    try {
      const updatedProject = await mockProjectService.advanceProjectPhase(selectedProject.id, newPhase);
      setSelectedProject(updatedProject);
      setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
    } catch (err) {
      console.error('Failed to advance project phase:', err);
      setError('Failed to advance project phase.');
    }
  }

  async function handleCreateArtifact(phaseType: ProjectPhase, artifactType: string, name: string) {
    if (!selectedProject) return;

    try {
      const newArtifact = await mockProjectService.createArtifact({
        projectId: selectedProject.id,
        phaseId: `${phaseType}-${selectedProject.id}`,
        artifactType,
        name,
        status: 'draft',
        description: `${name} for ${selectedProject.name}`,
        createdById: 'current-user'
      });

      setProjectArtifacts([...projectArtifacts, newArtifact]);
    } catch (err) {
      console.error('Failed to create artifact:', err);
      setError('Failed to create artifact.');
    }
  }

  async function handleUpdateArtifactStatus(artifactId: string, status: ArtifactStatus) {
    try {
      const updatedArtifact = await mockProjectService.updateArtifactStatus(artifactId, status);
      setProjectArtifacts(projectArtifacts.map(a => a.id === updatedArtifact.id ? updatedArtifact : a));
    } catch (err) {
      console.error('Failed to update artifact status:', err);
      setError('Failed to update artifact status.');
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Project Management</h1>
          <p className="text-muted-foreground">
            Manage your organization's projects using the four-phase workflow
          </p>
        </div>
        
        <div className="flex gap-2">
          {selectedProject && activeView === 'details' && (
            <Button 
              variant="outline" 
              onClick={handleViewDashboard}
              className="flex items-center"
            >
              <FiArrowLeft className="mr-2" />
              Back to Dashboard
            </Button>
          )}
          <Button className="flex items-center">
            <FiPlus className="mr-2" /> Create Project
          </Button>
        </div>
      </div>
      
      {projects.length === 0 ? (
        <div className="text-center p-12 border border-dashed rounded-md">
          <p className="text-muted-foreground mb-4">No projects found</p>
          <Button className="flex items-center mx-auto">
            <FiPlus className="mr-2" /> Create Your First Project
          </Button>
        </div>
      ) : (
        <TabGroup index={activeTab} onIndexChange={setActiveTab}>
          <TabList className="mb-6">
            <Tab>Dashboard</Tab>
            <Tab>Project Details</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel>
              <ProjectDashboard 
                projects={projects}
                selectedProject={selectedProject}
                artifacts={projectArtifacts}
                onSelectProject={handleViewProject}
              />
            </TabPanel>
            
            <TabPanel>
              {selectedProject ? (
                <ProjectDetails 
                  project={selectedProject}
                  artifacts={projectArtifacts}
                  onAdvancePhase={handleAdvancePhase}
                  onCreateArtifact={handleCreateArtifact}
                  onUpdateArtifactStatus={handleUpdateArtifactStatus}
                />
              ) : (
                <Card>
                  <div className="text-center p-6">
                    <Title>No Project Selected</Title>
                    <Text className="mt-2">Please select a project from the Dashboard tab</Text>
                  </div>
                </Card>
              )}
            </TabPanel>
          </TabPanels>
        </TabGroup>
      )}
    </div>
  );
}

function getPhaseColor(phase: ProjectPhase): string {
  switch (phase) {
    case 'discovery':
      return 'bg-blue-500';
    case 'definition':
      return 'bg-purple-500';
    case 'design':
      return 'bg-amber-500';
    case 'development':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
} 