import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "../components/layouts/DashboardLayout";
import { BrandProvider, useBrand, useBrandTerminology } from "../components/brand/BrandProvider";
import { BrandHeading } from "../components/brand/BrandHeading";
import { BrandText } from "../components/brand/BrandText";
import { BrandContainer } from "../components/brand/BrandContainer";
import { BrandGrid } from "../components/brand/BrandGrid";
import { BrandCard, CardContent, CardHeader, CardTitle } from "../components/brand/BrandCard";
import { BrandStyledButton } from "../components/brand/BrandStyledButton";
import { BrandInput } from "../components/brand/BrandInput";
import { BrandSelect } from "../components/brand/BrandSelect";
import { BrandImage } from "../components/brand/BrandImage";
import { BrandProjectMetrics } from "../components/brand/BrandProjectMetrics";
import { FiCalendar, FiClock, FiEdit, FiUsers, FiCheckCircle, FiAlertCircle, FiMessageCircle, FiFileText, FiBarChart2 } from "react-icons/fi";
import { getProjectById, Project } from "../data/testData";

// Helper to format date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Helper to get status badge color
function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200";
    case "in-progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "not-started":
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    case "overdue":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  }
}

// Helper to get task icon
function getTaskStatusIcon(status: string) {
  switch (status) {
    case "completed":
      return <FiCheckCircle className="h-4 w-4 text-emerald-500" />;
    case "in-progress":
      return <FiClock className="h-4 w-4 text-blue-500" />;
    case "not-started":
      return <FiEdit className="h-4 w-4 text-gray-400" />;
    case "overdue":
      return <FiAlertCircle className="h-4 w-4 text-red-500" />;
    default:
      return <FiEdit className="h-4 w-4 text-gray-400" />;
  }
}

function ProjectHeader({ project }: { project: Project }) {
  const t = useBrandTerminology();
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <BrandHeading level={1}>{project.name}</BrandHeading>
          <BrandText size="lg" className="mt-2">
            {t.project || "Project"} for {project.client}
          </BrandText>
        </div>
        
        <div className="flex gap-3 flex-wrap justify-end">
          <BrandStyledButton 
            variant="outline" 
            colorVariant="secondary"
            onClick={() => navigate(`/projects/${project.id}/collaborate`)}
          >
            <FiMessageCircle className="mr-2 h-4 w-4" />
            Team Collaboration
          </BrandStyledButton>
          <BrandStyledButton variant="outline" colorVariant="secondary">
            <FiEdit className="mr-2 h-4 w-4" />
            Edit
          </BrandStyledButton>
          <BrandStyledButton colorVariant="primary">
            <FiFileText className="mr-2 h-4 w-4" />
            Share
          </BrandStyledButton>
        </div>
      </div>
      
      <BrandGrid columns={4} gap="md" className="mt-6">
        <BrandCard className="border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                <FiCalendar className="h-5 w-5 text-blue-700 dark:text-blue-300" />
              </div>
              <div className="ml-4">
                <BrandText size="sm" color="muted">Start Date</BrandText>
                <BrandText weight="medium">{formatDate(project.startDate)}</BrandText>
              </div>
            </div>
          </CardContent>
        </BrandCard>
        
        <BrandCard className="border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                <FiCalendar className="h-5 w-5 text-purple-700 dark:text-purple-300" />
              </div>
              <div className="ml-4">
                <BrandText size="sm" color="muted">End Date</BrandText>
                <BrandText weight="medium">{formatDate(project.endDate)}</BrandText>
              </div>
            </div>
          </CardContent>
        </BrandCard>
        
        <BrandCard className="border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900">
                <FiBarChart2 className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
              </div>
              <div className="ml-4">
                <BrandText size="sm" color="muted">Progress</BrandText>
                <div className="flex items-center gap-2">
                  <BrandText weight="medium">{project.progress}%</BrandText>
                  <div className="h-2 w-24 bg-gray-200 rounded-full dark:bg-gray-700">
                    <div 
                      className="h-2 bg-emerald-500 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </BrandCard>
        
        <BrandCard className="border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900">
                <FiUsers className="h-5 w-5 text-amber-700 dark:text-amber-300" />
              </div>
              <div className="ml-4">
                <BrandText size="sm" color="muted">Team Members</BrandText>
                <BrandText weight="medium">{project.team?.length || 0} Members</BrandText>
              </div>
            </div>
          </CardContent>
        </BrandCard>
      </BrandGrid>
    </div>
  );
}

function ProjectOverview({ project }: { project: Project }) {
  return (
    <BrandCard colorAccent="primary" accentPosition="top" className="mb-8">
      <CardHeader>
        <CardTitle>
          <BrandHeading level={3}>Overview</BrandHeading>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <BrandText>{project.description}</BrandText>
        
        <div className="mt-6">
          <BrandHeading level={4} className="mb-2">Team</BrandHeading>
          <div className="flex flex-wrap gap-4">
            {project.team?.map(member => (
              <div key={member.id} className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full overflow-hidden">
                  <BrandImage 
                    fallbackSrc={member.avatar}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <BrandText size="sm" weight="medium">{member.name}</BrandText>
                  <BrandText size="xs" color="muted">{member.role}</BrandText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </BrandCard>
  );
}

function TaskList({ project }: { project: Project }) {
  const t = useBrandTerminology();
  
  return (
    <BrandCard className="mb-8">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>
            <BrandHeading level={3}>Tasks</BrandHeading>
          </CardTitle>
          <BrandStyledButton size="sm" colorVariant="primary">
            <FiEdit className="mr-1 h-3 w-3" />
            Add Task
          </BrandStyledButton>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-2 font-medium text-muted-foreground">Name</th>
                <th className="pb-2 font-medium text-muted-foreground">Status</th>
                <th className="pb-2 font-medium text-muted-foreground">Assignee</th>
                <th className="pb-2 font-medium text-muted-foreground">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {project.tasks?.map(task => {
                const assignee = project.team?.find(member => member.id === task.assignee);
                
                return (
                  <tr key={task.id} className="border-b last:border-0">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        {getTaskStatusIcon(task.status)}
                        <BrandText>{task.title}</BrandText>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.status.replace("-", " ")}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full overflow-hidden">
                          <BrandImage 
                            fallbackSrc={assignee?.avatar}
                            alt={assignee?.name || ""}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <BrandText size="sm">{assignee?.name}</BrandText>
                      </div>
                    </td>
                    <td className="py-3">
                      <BrandText size="sm">{formatDate(task.dueDate)}</BrandText>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </BrandCard>
  );
}

function UpdatesSection({ project }: { project: Project }) {
  const [newUpdate, setNewUpdate] = useState("");
  
  return (
    <BrandCard>
      <CardHeader>
        <CardTitle>
          <BrandHeading level={3}>Updates</BrandHeading>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <BrandInput
            label="Add an update"
            placeholder="Share the latest progress..."
            value={newUpdate}
            onChange={(e) => setNewUpdate(e.target.value)}
            fullWidth
          />
          <div className="mt-2 flex justify-end">
            <BrandStyledButton size="sm" colorVariant="primary">
              Post Update
            </BrandStyledButton>
          </div>
        </div>
        
        <div className="space-y-4">
          {project.updates?.map(update => {
            const author = project.team?.find(member => member.id === update.author);
            
            return (
              <div key={update.id} className="border-b pb-4 last:border-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-full overflow-hidden">
                    <BrandImage 
                      fallbackSrc={author?.avatar}
                      alt={author?.name || ""}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <BrandText size="sm" weight="medium">{author?.name}</BrandText>
                    <BrandText size="xs" color="muted">{formatDate(update.date)}</BrandText>
                  </div>
                </div>
                <BrandText>{update.content}</BrandText>
              </div>
            );
          })}
        </div>
      </CardContent>
    </BrandCard>
  );
}

function ProjectViewContent() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      if (projectId) {
        const foundProject = getProjectById(projectId);
        if (foundProject) {
          setProject(foundProject);
        } else {
          setError(`Project with id ${projectId} not found`);
        }
      } else {
        setError("No project ID provided");
      }
      setLoading(false);
    }, 500);
  }, [projectId]);

  if (loading) {
    return (
      <BrandContainer maxWidth="xl" padding="md">
        <BrandText>Loading project...</BrandText>
      </BrandContainer>
    );
  }

  if (error || !project) {
    return (
      <BrandContainer maxWidth="xl" padding="md">
        <BrandCard colorAccent="primary" accentPosition="top">
          <CardContent>
            <BrandHeading level={3} className="mb-4">Error</BrandHeading>
            <BrandText>{error || "Failed to load project"}</BrandText>
          </CardContent>
        </BrandCard>
      </BrandContainer>
    );
  }

  return (
    <BrandContainer maxWidth="xl" padding="md">
      <ProjectHeader project={project} />
      
      <BrandGrid columns={12} gap="md">
        <div className="col-span-12 md:col-span-7">
          <TaskList project={project} />
          <UpdatesSection project={project} />
        </div>
        <div className="col-span-12 md:col-span-5">
          <ProjectOverview project={project} />
          
          {/* Add Project Metrics */}
          {(project.viewCount || project.engagement || project.conversionRate || project.roi || project.budget) && (
            <div className="mt-8">
              <BrandProjectMetrics project={project} />
            </div>
          )}
        </div>
      </BrandGrid>
    </BrandContainer>
  );
}

export function ProjectView() {
  return (
    <DashboardLayout>
      <ProjectViewContent />
    </DashboardLayout>
  );
} 