import { useState, useEffect } from 'react';
import { projectsService } from '@services/api';
import { ProjectDetails } from './ProjectDetails';

interface ProjectListProps {
  brandId: string;
  onSelectProject?: (project: Project) => void;
}

export function ProjectList({ brandId, onSelectProject }: ProjectListProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const data = await projectsService.getByBrandId(brandId);
      setProjects(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setError('Failed to load projects. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (brandId) {
      fetchProjects();
    }
  }, [brandId]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsService.delete(id);
        setProjects(projects.filter(project => project.id !== id));
      } catch (err) {
        console.error('Failed to delete project:', err);
        alert('Failed to delete project. Please try again.');
      }
    }
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProjectId(project.id);
    if (onSelectProject) {
      onSelectProject(project);
    }
  };

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
    return <div className="text-center py-8">Loading projects...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No projects found for this brand. Create a new project to get started.
      </div>
    );
  }

  if (selectedProjectId) {
    return (
      <ProjectDetails 
        projectId={selectedProjectId} 
        onClose={() => setSelectedProjectId(null)} 
        onUpdate={fetchProjects}
      />
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleSelectProject(project)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <p className="text-gray-600 mt-1">{project.description || 'No description'}</p>
                <div className="flex mt-2 items-center">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClass(project.status)}`}>
                    {project.status || 'No status'}
                  </span>
                  {project.start_date && (
                    <span className="text-xs text-gray-500 ml-2">
                      Start: {new Date(project.start_date).toLocaleDateString()}
                    </span>
                  )}
                  {project.due_date && (
                    <span className="text-xs text-gray-500 ml-2">
                      Due: {new Date(project.due_date).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <button 
                className="text-red-500 hover:text-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(project.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 