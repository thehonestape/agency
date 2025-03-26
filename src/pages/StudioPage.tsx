import React from 'react';
import { FiBox, FiCode, FiCpu, FiEdit3, FiGlobe, FiGrid, FiImage, FiLayers, FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import RootLayout from '../components/layouts/RootLayout';

const StudioCard = ({ 
  icon: Icon, 
  title, 
  description, 
  bgColor = 'bg-gray-100',
  linkTo = '#'
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  bgColor?: string;
  linkTo?: string;
}) => (
  <Link to={linkTo} className="block" aria-label={`Open ${title} tool`}>
    <div className="relative group cursor-pointer overflow-hidden rounded-xl transition-all hover:shadow-lg border border-gray-200">
      <div className={`${bgColor} p-8 transition-all group-hover:scale-105`}>
        <Icon className="text-gray-700 mb-4 text-3xl" />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent h-12 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="text-blue-600 font-medium">Open Tool</span>
      </div>
    </div>
  </Link>
);

const StudioPage: React.FC = () => {
  const tools = [
    {
      icon: FiLayers,
      title: "Sitemap Editor",
      description: "Design and organize your site structure visually",
      bgColor: "bg-blue-50",
      linkTo: "/sitemap/editor"
    },
    {
      icon: FiEdit3,
      title: "Content Editor",
      description: "Create and edit content with AI assistance",
      bgColor: "bg-green-50",
      linkTo: "/documents/new"
    },
    {
      icon: FiImage,
      title: "Asset Manager",
      description: "Organize and edit your digital assets",
      bgColor: "bg-purple-50",
      linkTo: "/assets"
    },
    {
      icon: FiGlobe,
      title: "SEO Tools",
      description: "Optimize your content for search engines",
      bgColor: "bg-yellow-50",
      linkTo: "/seo"
    },
    {
      icon: FiGrid,
      title: "Layout Builder",
      description: "Create responsive layouts with drag & drop",
      bgColor: "bg-pink-50",
      linkTo: "/layout"
    },
    {
      icon: FiCode,
      title: "Code Editor",
      description: "Edit code with syntax highlighting and previews",
      bgColor: "bg-indigo-50",
      linkTo: "/code"
    },
    {
      icon: FiBox,
      title: "Component Library",
      description: "Browse and use pre-built UI components",
      bgColor: "bg-red-50",
      linkTo: "/components"
    },
    {
      icon: FiCpu,
      title: "AI Assistant",
      description: "Get AI-powered help with your creative tasks",
      bgColor: "bg-teal-50",
      linkTo: "/ai"
    }
  ];

  return (
    <RootLayout>
      <div className="max-w-7xl mx-auto">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Studio</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Your creative workspace with all the tools you need to build amazing digital experiences.
          </p>
        </section>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Recent Projects</h2>
            <Link to="/projects/new" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
              <FiPlusCircle /> New Project
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Link key={i} to={`/projects/${i}`} className="block">
                <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className={`h-40 bg-gradient-to-r ${i === 1 ? 'from-blue-500 to-purple-500' : i === 2 ? 'from-green-500 to-teal-500' : 'from-orange-500 to-red-500'} flex items-center justify-center`}>
                    <span className="text-white font-medium">Project {i}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">Project {i}</h3>
                    <p className="text-sm text-gray-500 mb-3">Last edited 2 days ago</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-gray-100 rounded-full px-3 py-1">In Progress</span>
                      <span className="text-blue-600 hover:text-blue-800 text-sm">
                        Open
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Creative Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <StudioCard 
                key={index}
                icon={tool.icon}
                title={tool.title}
                description={tool.description}
                bgColor={tool.bgColor}
                linkTo={tool.linkTo}
              />
            ))}
          </div>
        </section>
      </div>
    </RootLayout>
  );
};

export default StudioPage; 