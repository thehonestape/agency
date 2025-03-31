import { useState, useEffect } from 'react';
import { projectsService } from '@services/api';
import { Project, Artifact } from '@/types/project.types';
import { ProjectDetails } from './ProjectDetails';

interface ProjectListProps {
  brandId: string;
  onSelectProject: (project: Project) => void;
}

export function ProjectList({ brandId, onSelectProject }: ProjectListProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setIsLoading(true);
        const data = (await projectsService.getByBrandId(brandId)) as Project[];
        setProjects(data);
        setError(null);
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error loading projects:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadProjects();
  }, [brandId]);

  async function handleDelete(id: string) {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsService.delete(id);
        setProjects(projects.filter((project) => project.id !== id));
      } catch (err) {
        console.error('Error deleting project:', err);
        alert('Failed to delete project. Please try again later.');
      }
    }
  }

  const getStatusBadgeClass = (status: string | null) => {
    if (!status) return 'bg-gray-100 text-gray-600';

    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  if (isLoading) {
    return <div className="py-8 text-center">Loading projects...</div>;
  }

  if (error) {
    return <div className="py-8 text-center text-red-500">{error}</div>;
  }

  if (projects.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        No projects found for this brand. Create a new project to get started.
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4">
        <h2 className="mb-4 text-2xl font-bold">Projects</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="cursor-pointer rounded-lg bg-white p-4 shadow transition-shadow hover:shadow-md"
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <p className="mt-1 text-gray-600">{project.description}</p>
                  <div className="mt-2 flex items-center">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${getStatusBadgeClass(project.status)}`}
                    >
                      {project.status || 'No status'}
                    </span>
                    {project.startDate && (
                      <span className="ml-2 text-xs text-gray-500">
                        Start Date: {new Date(project.startDate).toLocaleDateString()}
                      </span>
                    )}
                    {project.targetCompletionDate && (
                      <span className="ml-2 text-xs text-gray-500">
                        Target Completion:{' '}
                        {new Date(project.targetCompletionDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject(project);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(project.id);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          artifacts={artifacts}
          onViewArtifact={(artifact) => {
            // Handle viewing artifact
          }}
          onEditArtifact={(artifact) => {
            // Handle editing artifact
          }}
          onCreateArtifact={(phaseType, artifactType, name) => {
            // Handle creating artifact
          }}
          onUpdateArtifactStatus={(artifactId, status) => {
            // Handle updating artifact status
          }}
          onAdvancePhase={(phase) => {
            // Handle advancing phase
          }}
        />
      )}
    </div>
  );
}
