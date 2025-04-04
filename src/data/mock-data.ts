import { Project, Artifact, ProjectPhase } from '../types/project.types';

// Mock Projects Data
export const projects: Project[] = [
  {
    id: 'p1',
    name: 'Website Redesign',
    clientId: 'c1',
    description: 'Complete overhaul of the client website with modern design and improved UX',
    currentPhase: 'design' as ProjectPhase,
    startDate: new Date('2023-10-15'),
    targetCompletionDate: new Date('2024-04-15'),
    status: 'active',
    createdAt: new Date('2023-10-10'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    id: 'p2',
    name: 'Brand Identity',
    clientId: 'c2',
    description: 'Development of new brand identity including logo, style guide, and brand voice',
    currentPhase: 'discovery' as ProjectPhase,
    startDate: new Date('2024-01-20'),
    targetCompletionDate: new Date('2024-05-30'),
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: 'p3',
    name: 'Marketing Campaign',
    clientId: 'c1',
    description: 'Q2 marketing campaign for new product launch',
    currentPhase: 'definition' as ProjectPhase,
    startDate: new Date('2024-02-01'),
    targetCompletionDate: new Date('2024-04-01'),
    status: 'active',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-02-05'),
  },
  {
    id: 'p4',
    name: 'Mobile App Development',
    clientId: 'c3',
    description: 'iOS and Android app for customer engagement and loyalty',
    currentPhase: 'development' as ProjectPhase,
    startDate: new Date('2023-08-15'),
    targetCompletionDate: new Date('2024-03-15'),
    status: 'active',
    createdAt: new Date('2023-08-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: 'p5',
    name: 'SEO Optimization',
    clientId: 'c2',
    description: 'Technical and content SEO to improve organic search rankings',
    currentPhase: 'design' as ProjectPhase,
    startDate: new Date('2023-12-01'),
    status: 'paused',
    createdAt: new Date('2023-11-25'),
    updatedAt: new Date('2024-01-15'),
  },
];

// Mock Artifacts Data
export const artifacts: Artifact[] = [
  // Website Redesign Artifacts
  {
    id: 'a1',
    projectId: 'p1',
    phaseId: 'discovery-p1',
    artifactType: 'document',
    name: 'User Research Report',
    description: 'Findings from user interviews and surveys',
    version: 1,
    status: 'approved',
    createdById: 'u1',
    createdAt: new Date('2023-10-20'),
    updatedAt: new Date('2023-11-05'),
  },
  {
    id: 'a2',
    projectId: 'p1',
    phaseId: 'discovery-p1',
    artifactType: 'document',
    name: 'Competitive Analysis',
    description: 'Analysis of competitor websites and features',
    version: 2,
    status: 'approved',
    createdById: 'u2',
    createdAt: new Date('2023-10-25'),
    updatedAt: new Date('2023-11-10'),
  },
  {
    id: 'a3',
    projectId: 'p1',
    phaseId: 'definition-p1',
    artifactType: 'document',
    name: 'Sitemap',
    description: 'Proposed site architecture and navigation',
    version: 3,
    status: 'approved',
    createdById: 'u1',
    createdAt: new Date('2023-11-15'),
    updatedAt: new Date('2023-11-30'),
  },
  {
    id: 'a4',
    projectId: 'p1',
    phaseId: 'definition-p1',
    artifactType: 'document',
    name: 'User Stories',
    description: 'Detailed user stories for key personas',
    version: 1,
    status: 'approved',
    createdById: 'u3',
    createdAt: new Date('2023-11-20'),
    updatedAt: new Date('2023-12-05'),
  },
  {
    id: 'a5',
    projectId: 'p1',
    phaseId: 'design-p1',
    artifactType: 'design',
    name: 'Wireframes',
    description: 'Low-fidelity wireframes for key pages',
    version: 2,
    status: 'approved',
    createdById: 'u2',
    createdAt: new Date('2023-12-10'),
    updatedAt: new Date('2023-12-20'),
  },
  {
    id: 'a6',
    projectId: 'p1',
    phaseId: 'design-p1',
    artifactType: 'design',
    name: 'Visual Design System',
    description: 'Color palette, typography, and UI elements',
    version: 1,
    status: 'review',
    createdById: 'u2',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: 'a7',
    projectId: 'p1',
    phaseId: 'design-p1',
    artifactType: 'design',
    name: 'Homepage Mockup',
    description: 'High-fidelity mockup of the homepage',
    version: 1,
    status: 'draft',
    createdById: 'u2',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  
  // Brand Identity Artifacts
  {
    id: 'a8',
    projectId: 'p2',
    phaseId: 'discovery-p2',
    artifactType: 'document',
    name: 'Brand Audit',
    description: 'Analysis of current brand position and assets',
    version: 1,
    status: 'review',
    createdById: 'u1',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-30'),
  },
  {
    id: 'a9',
    projectId: 'p2',
    phaseId: 'discovery-p2',
    artifactType: 'document',
    name: 'Stakeholder Interview Notes',
    description: 'Compiled notes from stakeholder interviews',
    version: 1,
    status: 'draft',
    createdById: 'u3',
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-01-28'),
  },
  
  // Marketing Campaign Artifacts
  {
    id: 'a10',
    projectId: 'p3',
    phaseId: 'discovery-p3',
    artifactType: 'document',
    name: 'Campaign Research',
    description: 'Market research for product launch campaign',
    version: 1,
    status: 'approved',
    createdById: 'u1',
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    id: 'a11',
    projectId: 'p3',
    phaseId: 'definition-p3',
    artifactType: 'document',
    name: 'Campaign Strategy',
    description: 'Strategic approach and channel selection',
    version: 1,
    status: 'review',
    createdById: 'u1',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-20'),
  },
  
  // Mobile App Development Artifacts
  {
    id: 'a12',
    projectId: 'p4',
    phaseId: 'discovery-p4',
    artifactType: 'document',
    name: 'App Requirements',
    description: 'Functional and technical requirements',
    version: 2,
    status: 'approved',
    createdById: 'u3',
    createdAt: new Date('2023-08-20'),
    updatedAt: new Date('2023-09-10'),
  },
  {
    id: 'a13',
    projectId: 'p4',
    phaseId: 'definition-p4',
    artifactType: 'document',
    name: 'User Flows',
    description: 'Key user flows for core features',
    version: 1,
    status: 'approved',
    createdById: 'u2',
    createdAt: new Date('2023-09-15'),
    updatedAt: new Date('2023-09-30'),
  },
  {
    id: 'a14',
    projectId: 'p4',
    phaseId: 'design-p4',
    artifactType: 'design',
    name: 'UI Design System',
    description: 'Comprehensive UI kit for the mobile app',
    version: 3,
    status: 'approved',
    createdById: 'u2',
    createdAt: new Date('2023-10-05'),
    updatedAt: new Date('2023-11-15'),
  },
  {
    id: 'a15',
    projectId: 'p4',
    phaseId: 'development-p4',
    artifactType: 'code',
    name: 'Alpha Build',
    description: 'First testable version with core functionality',
    version: 1,
    status: 'review',
    createdById: 'u3',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-25'),
  },
  
  // SEO Optimization Artifacts
  {
    id: 'a16',
    projectId: 'p5',
    phaseId: 'discovery-p5',
    artifactType: 'document',
    name: 'SEO Audit',
    description: 'Technical and content SEO audit',
    version: 1,
    status: 'approved',
    createdById: 'u1',
    createdAt: new Date('2023-12-05'),
    updatedAt: new Date('2023-12-15'),
  },
  {
    id: 'a17',
    projectId: 'p5',
    phaseId: 'definition-p5',
    artifactType: 'document',
    name: 'Keyword Strategy',
    description: 'Prioritized keyword targets by page',
    version: 1,
    status: 'approved',
    createdById: 'u1',
    createdAt: new Date('2023-12-20'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    id: 'a18',
    projectId: 'p5',
    phaseId: 'design-p5',
    artifactType: 'document',
    name: 'Content Plan',
    description: 'Editorial calendar and content briefs',
    version: 1,
    status: 'draft',
    createdById: 'u3',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
]; 