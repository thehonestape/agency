import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { Project } from '../types/project.types';
import { 
  Flex, 
  TabList, 
  Tab, 
  TabGroup, 
  TabPanels, 
  TabPanel,
  Title,
  Text,
  Grid,
  Card,
  Metric,
  Subtitle,
  Badge,
  Button
} from '@tremor/react';
import { CollaborationSpace, CollaborationDebug } from '../components/collaboration/CollaborationSpace';
import { ProposalGenerator } from '../components/collaboration/ProposalGenerator';
import { FiArrowLeft, FiUsers, FiMessageSquare, FiFileText, FiCpu } from 'react-icons/fi';

export default function ProjectCollaborationPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function loadProject() {
      if (!projectId) return;
      
      setIsLoading(true);
      try {
        const projectData = await projectService.getProject(projectId);
        setProject(projectData || null);
      } catch (error) {
        console.error('Error loading project:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadProject();
  }, [projectId]);
  
  const handleBack = () => {
    navigate('/projects');
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading loading-spinner text-primary"></div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="p-4">
        <Text>Project not found, but routing works!</Text>
        <CollaborationDebug projectId={projectId || 'unknown'} />
        <Button onClick={handleBack} className="mt-4" icon={FiArrowLeft}>
          Back to Projects
        </Button>
      </div>
    );
  }

  // Format dates safely
  const formatDate = (date: Date | undefined | string) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };
  
  return (
    <div className="p-6">
      <Flex justifyContent="between" alignItems="center" className="mb-6">
        <div>
          <Button 
            variant="light" 
            icon={FiArrowLeft}
            onClick={handleBack}
            className="mb-2"
          >
            Back
          </Button>
          <Title>{project.name}</Title>
          <Subtitle>{project.description}</Subtitle>
        </div>
        
        <div className="flex gap-2">
          <Badge color="blue" icon={FiUsers}>Studio Team</Badge>
          <Badge color="emerald" icon={FiUsers}>Client Team</Badge>
          <Badge color="violet" icon={FiCpu}>AI Agents</Badge>
        </div>
      </Flex>
      
      <Card className="mb-6">
        <Grid numItems={3} className="gap-4">
          <div className="col-span-1">
            <Text>Current Phase</Text>
            <Metric>{project.currentPhase.charAt(0).toUpperCase() + project.currentPhase.slice(1)}</Metric>
          </div>
          
          <div className="col-span-1">
            <Text>Status</Text>
            <Metric>{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</Metric>
          </div>
          
          <div className="col-span-1">
            <Text>Timeline</Text>
            <Metric>
              {formatDate(project.startDate)} - {formatDate(project.targetCompletionDate)}
            </Metric>
          </div>
        </Grid>
      </Card>
      
      <TabGroup>
        <TabList className="mb-4">
          <Tab icon={FiMessageSquare}>Team Collaboration</Tab>
          <Tab icon={FiFileText}>Project Artifacts</Tab>
          <Tab icon={FiCpu}>AI Insights</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            <div className="h-[calc(100vh-300px)]">
              <CollaborationSpace projectId={projectId || ''} />
            </div>
          </TabPanel>
          
          <TabPanel>
            <Card>
              <Title>Project Artifacts</Title>
              <Subtitle>Documents, designs, and deliverables for this project</Subtitle>
              
              <div className="mt-4 p-8 text-center">
                <Text>Artifacts integration coming soon</Text>
                <p className="text-gray-500 mt-2">
                  This section will display project deliverables with AI-powered 
                  suggestions and collaborative feedback.
                </p>
              </div>
            </Card>
          </TabPanel>
          
          <TabPanel>
            <Card className="mb-6">
              <Title>AI Project Insights</Title>
              <Subtitle>AI-powered analytics and recommendations for your project</Subtitle>
            </Card>
            
            <ProposalGenerator 
              projectId={projectId || ''}
              project={project}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
} 