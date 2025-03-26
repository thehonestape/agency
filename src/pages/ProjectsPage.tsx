import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BrandProvider, useBrand, useBrandTerminology } from "../components/brand/BrandProvider";
import { BrandHeading } from "../components/brand/BrandHeading";
import { BrandText } from "../components/brand/BrandText";
import { BrandContainer } from "../components/brand/BrandContainer";
import { BrandGrid } from "../components/brand/BrandGrid";
import { BrandCard, CardContent, CardHeader, CardTitle } from "../components/brand/BrandCard";
import { BrandStyledButton } from "../components/brand/BrandStyledButton";
import { FiPlus, FiClock, FiCalendar, FiUsers } from "react-icons/fi";
import { DashboardLayout } from "../components/layouts/DashboardLayout";
import { testProjects } from "../data/testData";
import { AIQuickAccessButton } from "../components/ai/AIQuickAccessButton";

// Helper to format date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function ProjectCard({ project }: { project: typeof testProjects[0] }) {
  return (
    <Link to={`/projects/${project.id}`} className="block">
      <BrandCard 
        elevation="low" 
        colorAccent={project.progress > 75 ? "primary" : project.progress > 50 ? "secondary" : "accent"}
        accentPosition="top"
        className="h-full transition-all hover:shadow-md"
      >
        <CardHeader>
          <CardTitle>
            <BrandHeading level={4}>{project.name}</BrandHeading>
          </CardTitle>
          <BrandText size="sm" color="muted">{project.client}</BrandText>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <BrandText size="sm">Progress</BrandText>
                <BrandText size="sm" weight="medium">{project.progress}%</BrandText>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                <FiClock className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                <BrandText size="sm">{project.status}</BrandText>
              </div>
              <div className="flex items-center">
                <FiCalendar className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                <BrandText size="sm">{formatDate(project.endDate)}</BrandText>
              </div>
              {project.team && (
                <div className="flex items-center col-span-2">
                  <FiUsers className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                  <BrandText size="sm">{project.team.map(member => member.name).join(', ')}</BrandText>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </BrandCard>
    </Link>
  );
}

function ProjectsPageContent() {
  const { brandTerm } = useBrandTerminology();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(testProjects);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProjects(testProjects);
    } else {
      const filtered = testProjects.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        project.client.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [searchTerm]);

  return (
    <DashboardLayout>
      <BrandContainer>
        <div className="flex justify-between items-center mb-6">
          <div>
            <BrandHeading level={1}>Projects</BrandHeading>
            <BrandText>Manage all your projects</BrandText>
          </div>
          <div className="flex items-center gap-3">
            <AIQuickAccessButton variant="text" />
            <BrandStyledButton>
              <FiPlus className="mr-2" /> New Project
            </BrandStyledButton>
          </div>
        </div>

        {/* Search and filters */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Grid of project cards */}
        <BrandGrid columns={3} gap="md" className="mt-8">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </BrandGrid>
        
        {/* AI Assistant (Floating version) */}
        <AIQuickAccessButton position="floating" />
      </BrandContainer>
    </DashboardLayout>
  );
}

export function ProjectsPage() {
  return (
    <BrandProvider>
      <ProjectsPageContent />
    </BrandProvider>
  );
} 