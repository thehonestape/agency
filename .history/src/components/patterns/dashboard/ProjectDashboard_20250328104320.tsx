import React, { useState, useEffect } from 'react';
import {
  Card,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Tracker,
  Text,
  Metric,
  Flex,
  ProgressBar,
  Grid,
  Title,
  Subtitle,
  Badge,
  BarList,
  DonutChart,
  Legend,
  AreaChart,
  Button,
  Color,
} from '@tremor/react';
import {
  FiCheck,
  FiClock,
  FiEdit3,
  FiArchive,
  FiTrendingUp,
  FiAlertCircle,
  FiBriefcase,
  FiCalendar,
  FiChevronRight,
  FiInfo,
  FiLock,
} from 'react-icons/fi';
import { Project, Artifact, ProjectPhase } from '../../../types/project.types';
import { generateContent } from '../../../services/aiService';
import { getProjectPhaseStatuses } from '../../../services/aiService';

// Define the types for project insights
interface ProjectInsight {
  id: string;
  type: 'risk' | 'opportunity' | 'recommendation';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  aiGenerated: boolean;
}

// Extend the Project type to include dueDate
interface ExtendedProject extends Project {
  dueDate?: Date;
}

interface ProjectDashboardProps {
  projects: Project[];
  selectedProject: Project | null;
  artifacts: Artifact[];
  onSelectProject: (project: Project) => void;
}

export function ProjectDashboard({
  projects,
  selectedProject,
  artifacts,
  onSelectProject,
}: ProjectDashboardProps) {
  const [selectedView, setSelectedView] = useState<number>(0);
  const [projectInsights, setProjectInsights] = useState<ProjectInsight[]>([]);
  const [isLoadingInsights, setIsLoadingInsights] = useState<boolean>(false);
  const [artifactTrend, setArtifactTrend] = useState<any[]>([]);
  const [phaseProgress, setPhaseProgress] = useState<any[]>([]);

  // Calculate project metrics
  const projectsByPhase = projects.reduce(
    (acc, project) => {
      acc[project.currentPhase] = (acc[project.currentPhase] || 0) + 1;
      return acc;
    },
    {} as Record<ProjectPhase, number>
  );

  const phaseData = [
    { name: 'Discovery', value: projectsByPhase.discovery || 0 },
    { name: 'Definition', value: projectsByPhase.definition || 0 },
    { name: 'Design', value: projectsByPhase.design || 0 },
    { name: 'Development', value: projectsByPhase.development || 0 },
  ];

  // Artifact status metrics
  const artifactsByStatus = artifacts.reduce(
    (acc, artifact) => {
      acc[artifact.status] = (acc[artifact.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const artifactStatusData = [
    { name: 'Draft', value: artifactsByStatus.draft || 0, icon: FiEdit3, color: 'blue' },
    { name: 'Review', value: artifactsByStatus.review || 0, icon: FiClock, color: 'amber' },
    { name: 'Approved', value: artifactsByStatus.approved || 0, icon: FiCheck, color: 'green' },
    { name: 'Archived', value: artifactsByStatus.archived || 0, icon: FiArchive, color: 'gray' },
  ];

  // Phase completion tracker for selected project
  const getPhaseStatus = (phase: ProjectPhase): 'completed' | 'current' | 'upcoming' => {
    if (!selectedProject) return 'upcoming';

    const phaseOrder = ['discovery', 'definition', 'design', 'development'];
    const currentPhaseIndex = phaseOrder.indexOf(selectedProject.currentPhase);
    const phaseIndex = phaseOrder.indexOf(phase);

    if (phaseIndex < currentPhaseIndex) {
      return 'completed';
    } else if (phaseIndex === currentPhaseIndex) {
      return 'current';
    } else {
      return 'upcoming';
    }
  };

  // Calculate artifact completion for the selected project
  const getPhaseCompletion = (phase: ProjectPhase): number => {
    if (!selectedProject) return 0;

    const phaseArtifacts = artifacts.filter((artifact) => {
      // We're simplifying here - in a real app, you'd have a proper phase ID reference
      const artifactPhase = artifact.phaseId.split('-')[0] as ProjectPhase;
      return artifactPhase === phase;
    });

    if (phaseArtifacts.length === 0) return 0;

    const approvedCount = phaseArtifacts.filter((a) => a.status === 'approved').length;
    return Math.round((approvedCount / phaseArtifacts.length) * 100);
  };

  // Generate mock artifact trend data
  useEffect(() => {
    if (selectedProject) {
      // Mock data for artifact creation over time
      const startDate = new Date(selectedProject.startDate || new Date());
      const now = new Date();
      const daysBetween = Math.round((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

      const trendData = Array.from({ length: daysBetween > 0 ? daysBetween : 7 }, (_, i) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        return {
          date: date.toISOString().split('T')[0],
          Draft: Math.floor(Math.random() * 3),
          Review: Math.floor(Math.random() * 2),
          Approved: Math.floor(Math.random() * 2),
        };
      });

      setArtifactTrend(trendData);

      // Generate phase progress data
      const phases: ProjectPhase[] = ['discovery', 'definition', 'design', 'development'];
      const progressData = phases.map((phase) => {
        return {
          phase: phase.charAt(0).toUpperCase() + phase.slice(1),
          progress: getPhaseCompletion(phase),
          status: getPhaseStatus(phase),
        };
      });

      setPhaseProgress(progressData);

      // Pre-populate project insights if none exist
      if (projectInsights.length === 0 && !isLoadingInsights) {
        generateProjectInsights();
      }
    }
  }, [selectedProject, artifacts]);

  // Generate AI insights for the selected project
  const generateProjectInsights = async () => {
    if (!selectedProject) return;

    setIsLoadingInsights(true);

    try {
      // Get project phase data
      const phaseStatuses = await getProjectPhaseStatuses(selectedProject.id);

      // Generate insights using AI
      const response = await generateContent({
        prompt: `Analyze this project and provide 3 strategic insights:
        Project: ${selectedProject.name}
        Description: ${selectedProject.description}
        Current Phase: ${selectedProject.currentPhase}
        Phase Statuses: ${JSON.stringify(phaseStatuses)}
        
        Format your response as JSON with this structure:
        [
          {
            "type": "risk" | "opportunity" | "recommendation",
            "title": "Brief title",
            "description": "Detailed explanation",
            "impact": "low" | "medium" | "high"
          }
        ]`,
        model: 'gpt-4o',
        max_tokens: 500,
      });

      // Parse the AI response
      let insights: ProjectInsight[] = [];
      try {
        // Extract JSON from the response text
        const jsonStr = response.text.match(/\[\s*\{.*\}\s*\]/s)?.[0] || '';
        insights = JSON.parse(jsonStr).map((insight: any) => ({
          ...insight,
          id: Math.random().toString(36).substring(2),
          aiGenerated: true,
        }));
      } catch (error) {
        console.error('Failed to parse AI insights:', error);
        // Fallback with demo insights
        insights = [
          {
            id: '1',
            type: 'risk',
            title: 'Timeline Risk',
            description:
              'The current approval rate of artifacts suggests a potential delay in the project timeline.',
            impact: 'medium',
            aiGenerated: true,
          },
          {
            id: '2',
            type: 'opportunity',
            title: 'Client Collaboration',
            description:
              'Increased client engagement in the review process could accelerate approvals.',
            impact: 'high',
            aiGenerated: true,
          },
          {
            id: '3',
            type: 'recommendation',
            title: 'Resource Allocation',
            description:
              'Consider allocating additional design resources to accelerate the current phase.',
            impact: 'medium',
            aiGenerated: true,
          },
        ];
      }

      setProjectInsights(insights);
    } catch (error) {
      console.error('Error generating insights:', error);
      // Set fallback insights
      setProjectInsights([
        {
          id: '1',
          type: 'risk',
          title: 'Timeline Risk',
          description:
            'The current approval rate of artifacts suggests a potential delay in the project timeline.',
          impact: 'medium',
          aiGenerated: true,
        },
        {
          id: '2',
          type: 'recommendation',
          title: 'Resource Allocation',
          description:
            'Consider allocating additional design resources to accelerate the current phase.',
          impact: 'medium',
          aiGenerated: true,
        },
      ]);
    } finally {
      setIsLoadingInsights(false);
    }
  };

  // Helper functions for UI elements
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'risk':
        return <FiAlertCircle className="h-5 w-5 text-red-500" />;
      case 'opportunity':
        return <FiTrendingUp className="h-5 w-5 text-emerald-500" />;
      case 'recommendation':
        return <FiInfo className="h-5 w-5 text-blue-500" />;
      default:
        return <FiInfo className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getImpactColor = (impact: string): Color => {
    switch (impact) {
      case 'high':
        return 'rose';
      case 'medium':
        return 'amber';
      case 'low':
        return 'emerald';
      default:
        return 'gray';
    }
  };

  // Fix value formatter types across all charts
  const valueFormatterNumber = (value: number): string => `${value}`;
  const projectValueFormatter = (value: number): string => `${value} projects`;
  const artifactValueFormatter = (value: number): string => `${value} artifacts`;

  // Optimize the rendering based on selectedProject presence
  if (!selectedProject) {
    return (
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <Title>Projects Overview</Title>
          <Button size="sm" variant="secondary" icon={FiBriefcase}>
            New Project
          </Button>
        </div>

        <Card className="overflow-hidden p-0">
          <div className="border-b border-border p-6">
            <Title>Select a Project</Title>
            <Text>Choose a project from the list to view its dashboard</Text>
          </div>

          <div className="divide-y divide-border">
            {projects.slice(0, 5).map((project) => (
              <button
                key={project.id}
                className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-muted"
                onClick={() => onSelectProject(project)}
              >
                <div className="flex items-center">
                  <div
                    className={`mr-3 h-2 w-2 rounded-full ${
                      project.currentPhase === 'discovery'
                        ? 'bg-blue-500'
                        : project.currentPhase === 'definition'
                          ? 'bg-amber-500'
                          : project.currentPhase === 'design'
                            ? 'bg-emerald-500'
                            : 'bg-purple-500'
                    }`}
                  />
                  <div>
                    <Text className="font-medium">{project.name}</Text>
                    <Text className="text-xs text-muted-foreground">
                      {project.currentPhase.charAt(0).toUpperCase() + project.currentPhase.slice(1)}{' '}
                      Phase
                    </Text>
                  </div>
                </div>
                <FiChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            ))}
          </div>

          {projects.length > 5 && (
            <div className="border-t border-border p-4 text-center">
              <Button variant="light" size="xs">
                View All Projects
              </Button>
            </div>
          )}
        </Card>

        <Grid numItemsMd={2} numItemsLg={2} className="gap-6">
          <Card>
            <Title>Projects by Phase</Title>
            <DonutChart
              className="mt-6"
              data={phaseData}
              category="value"
              index="name"
              colors={['blue', 'amber', 'emerald', 'violet']}
              valueFormatter={projectValueFormatter}
            />
            <Legend
              className="mt-6"
              categories={['Discovery', 'Definition', 'Design', 'Development']}
              colors={['blue', 'amber', 'emerald', 'violet']}
            />
          </Card>

          <Card>
            <Flex>
              <Title>Artifact Status</Title>
              <Badge icon={FiCalendar}>All Time</Badge>
            </Flex>

            <BarList
              className="mt-6"
              data={artifactStatusData}
              color="blue"
              valueFormatter={artifactValueFormatter}
            />
          </Card>
        </Grid>
      </div>
    );
  }

  // Cast selectedProject to ExtendedProject to support dueDate
  const extendedProject = selectedProject as ExtendedProject;

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <Title>{selectedProject.name}</Title>
            <Badge
              color={
                selectedProject.currentPhase === 'discovery'
                  ? 'blue'
                  : selectedProject.currentPhase === 'definition'
                    ? 'amber'
                    : selectedProject.currentPhase === 'design'
                      ? 'emerald'
                      : 'violet'
              }
            >
              {selectedProject.currentPhase.charAt(0).toUpperCase() +
                selectedProject.currentPhase.slice(1)}{' '}
              Phase
            </Badge>
          </div>
          <Text className="mt-1 text-muted-foreground">{selectedProject.description}</Text>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="light" icon={FiClock}>
            {extendedProject.dueDate
              ? new Date(extendedProject.dueDate).toLocaleDateString()
              : 'Set Due Date'}
          </Button>
          <Button size="sm" variant="secondary" icon={FiEdit3}>
            Edit Project
          </Button>
        </div>
      </div>

      <TabGroup index={selectedView} onIndexChange={setSelectedView}>
        <TabList color="gray" variant="solid" className="mt-2">
          <Tab>Overview</Tab>
          <Tab>Phases</Tab>
          <Tab>Activities</Tab>
          <Tab>Insights</Tab>
        </TabList>

        <TabPanels>
          {/* Overview Tab */}
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-6">
              {/* Project Progress Card */}
              <Card className="col-span-1 overflow-hidden md:col-span-2 lg:col-span-1">
                <div className="flex h-full flex-col p-6">
                  <Title>Project Progress</Title>
                  <Text className="mt-2">Completion status by phase</Text>

                  <div className="mt-6 flex flex-1 flex-col justify-between">
                    <div className="space-y-6">
                      {phaseProgress.map((phase) => (
                        <div key={phase.phase} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Text className="font-medium">{phase.phase}</Text>
                            <Badge
                              color={
                                phase.status === 'completed'
                                  ? 'emerald'
                                  : phase.status === 'current'
                                    ? 'blue'
                                    : 'gray'
                              }
                            >
                              {phase.status === 'completed'
                                ? 'Completed'
                                : phase.status === 'current'
                                  ? 'In Progress'
                                  : 'Upcoming'}
                            </Badge>
                          </div>
                          <ProgressBar
                            value={phase.progress}
                            color={
                              phase.status === 'completed'
                                ? 'emerald'
                                : phase.status === 'current'
                                  ? 'blue'
                                  : 'gray'
                            }
                            tooltip={`${phase.progress}% complete`}
                          />
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{phase.progress}% complete</span>
                            {phase.status === 'upcoming' && (
                              <div className="flex items-center">
                                <FiLock className="mr-1 h-3 w-3" />
                                <span>Locked</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 border-t border-border pt-4">
                      <Tracker
                        data={[
                          { color: 'emerald', tooltip: 'Discovery' },
                          { color: 'emerald', tooltip: 'Definition' },
                          { color: 'blue', tooltip: 'Design - In Progress' },
                          { color: 'gray', tooltip: 'Development' },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Artifacts Stats Card */}
              <Card className="col-span-1">
                <Title>Artifacts</Title>
                <Text className="mt-2">Status breakdown</Text>

                <DonutChart
                  className="mt-6"
                  data={artifactStatusData}
                  category="value"
                  index="name"
                  valueFormatter={artifactValueFormatter}
                  colors={['blue', 'amber', 'emerald', 'gray']}
                />

                <Legend
                  className="mt-6"
                  categories={artifactStatusData.map((item) => item.name)}
                  colors={['blue', 'amber', 'emerald', 'gray']}
                />
              </Card>

              {/* AI Generated Insights */}
              <Card className="col-span-1 md:col-span-2 lg:col-span-1">
                <Flex>
                  <Title>AI Insights</Title>
                  <Button
                    icon={FiRefreshIcon}
                    variant="light"
                    size="xs"
                    onClick={generateProjectInsights}
                    loading={isLoadingInsights}
                    disabled={isLoadingInsights}
                  >
                    Refresh
                  </Button>
                </Flex>

                <div className="mt-4 space-y-4">
                  {isLoadingInsights ? (
                    <div className="animate-pulse space-y-3 py-3">
                      <div className="h-6 w-3/4 rounded bg-muted"></div>
                      <div className="h-4 w-full rounded bg-muted"></div>
                      <div className="h-4 w-5/6 rounded bg-muted"></div>
                      <div className="h-4 w-full rounded bg-muted"></div>
                    </div>
                  ) : projectInsights.length > 0 ? (
                    projectInsights.slice(0, 3).map((insight) => (
                      <div
                        key={insight.id}
                        className="rounded-lg border border-border p-3"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">{getInsightIcon(insight.type)}</div>
                          <div>
                            <div className="mb-1 flex items-center gap-2">
                              <Text className="font-medium">{insight.title}</Text>
                              <Badge color={getImpactColor(insight.impact)}>
                                {insight.impact.charAt(0).toUpperCase() + insight.impact.slice(1)}
                              </Badge>
                            </div>
                            <Text className="text-sm text-muted-foreground">
                              {insight.description}
                            </Text>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                      <FiInfo className="mb-3 h-10 w-10 text-muted-foreground" />
                      <Text>No insights available</Text>
                      <Button variant="secondary" onClick={generateProjectInsights}>
                        Generate Insights
                      </Button>
                    </div>
                  )}

                  {projectInsights.length > 0 && (
                    <div className="mt-2 border-t border-border pt-3 text-center">
                      <Button
                        variant="light"
                        size="xs"
                        className="w-full"
                        onClick={() => setSelectedView(3)}
                      >
                        View All Insights
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </Grid>

            {/* Artifact Trend Chart */}
            <Card className="mt-6">
              <Title>Artifact Activity</Title>
              <Text className="mt-2">Artifacts created over time</Text>

              <AreaChart
                className="mt-6 h-72"
                data={artifactTrend}
                index="date"
                categories={['Draft', 'Review', 'Approved']}
                colors={['blue', 'amber', 'emerald']}
                valueFormatter={valueFormatterNumber}
                showLegend
                showAnimation
              />
            </Card>
          </TabPanel>

          {/* Phases Tab */}
          <TabPanel>
            <div className="mt-6 space-y-6">
              <Card>
                <Title>Phase Timeline</Title>
                <div className="mt-6">
                  {/* Phase details content would go here */}
                  <Text>Phase content coming soon...</Text>
                </div>
              </Card>
            </div>
          </TabPanel>

          {/* Activities Tab */}
          <TabPanel>
            <div className="mt-6 space-y-6">
              <Card>
                <Title>Recent Activities</Title>
                <div className="mt-6">
                  {/* Recent activities content would go here */}
                  <Text>Activity content coming soon...</Text>
                </div>
              </Card>
            </div>
          </TabPanel>

          {/* Insights Tab */}
          <TabPanel>
            <div className="mt-6 space-y-6">
              <Card>
                <Flex>
                  <Title>AI-Generated Insights</Title>
                  <Button
                    icon={FiRefreshIcon}
                    variant="secondary"
                    size="sm"
                    onClick={generateProjectInsights}
                    loading={isLoadingInsights}
                    disabled={isLoadingInsights}
                  >
                    Generate New Insights
                  </Button>
                </Flex>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  {isLoadingInsights ? (
                    // Show skeleton loader for insights
                    Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className="animate-pulse rounded-lg border border-border p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-muted"></div>
                          <div className="w-full">
                            <div className="mb-3 h-5 w-3/4 rounded bg-muted"></div>
                            <div className="mb-2 h-4 w-full rounded bg-muted"></div>
                            <div className="h-4 w-5/6 rounded bg-muted"></div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : projectInsights.length > 0 ? (
                    projectInsights.map((insight) => (
                      <div
                        key={insight.id}
                        className="rounded-lg border border-border p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">{getInsightIcon(insight.type)}</div>
                          <div>
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <Text className="font-medium">{insight.title}</Text>
                              <Badge color={getImpactColor(insight.impact)}>
                                {insight.impact.charAt(0).toUpperCase() + insight.impact.slice(1)}{' '}
                                Impact
                              </Badge>

                              <Badge color="gray" className="ml-auto">
                                {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                              </Badge>
                            </div>
                            <Text className="text-sm text-muted-foreground">
                              {insight.description}
                            </Text>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                      <FiInfo className="mb-4 h-12 w-12 text-muted-foreground" />
                      <Text className="mb-2 text-lg font-medium">No insights available</Text>
                      <Text className="mb-4 max-w-md">
                        Generate AI insights based on your project's current status, timeline, and
                        artifacts.
                      </Text>
                      <Button variant="secondary" onClick={generateProjectInsights}>
                        Generate Insights
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}

// Helper icon when we need a custom icon that's not in FI
const FiRefreshIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
  </svg>
);
