import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiFilter } from 'react-icons/fi';
import RootLayout from '../components/layouts/RootLayout';
import PageTransition from '../components/animation/PageTransition';
import { useLocation } from 'react-router-dom';

// Project type definition
interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  thumbnail: string;
  featured: boolean;
}

// Sample project data
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Brand Redesign',
    client: 'Acme Inc',
    category: 'Branding',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    featured: true
  },
  {
    id: '2',
    title: 'Social Media Campaign',
    client: 'TechStart',
    category: 'Marketing',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    featured: false
  },
  {
    id: '3',
    title: 'E-commerce Website',
    client: 'Fashion Forward',
    category: 'Web Development',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1115&q=80',
    featured: true
  },
  {
    id: '4',
    title: 'Mobile App Design',
    client: 'HealthTrack',
    category: 'UX/UI Design',
    thumbnail: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    featured: false
  },
  {
    id: '5',
    title: 'Product Launch Strategy',
    client: 'NewTech',
    category: 'Marketing',
    thumbnail: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    featured: true
  },
  {
    id: '6',
    title: 'Corporate Identity',
    client: 'Global Finance',
    category: 'Branding',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    featured: false
  }
];

// Categories for filtering
const categories = ['All', 'Branding', 'Marketing', 'Web Development', 'UX/UI Design'];

const WorkPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterOpen, setFilterOpen] = useState(false);
  const location = useLocation();

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'All' 
    ? sampleProjects 
    : sampleProjects.filter(project => project.category === selectedCategory);

  // Featured projects at the top
  const featuredProjects = filteredProjects.filter(project => project.featured);
  const regularProjects = filteredProjects.filter(project => !project.featured);

  return (
    <RootLayout>
      <PageTransition key={location.pathname}>
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="mb-16">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Work
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Explore our portfolio of successful projects where we've helped businesses transform their digital presence and achieve their goals.
            </motion.p>
          </section>

          {/* Filters */}
          <motion.div 
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold">Featured Projects</h2>
            <motion.button 
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiFilter />
              <span>Filter</span>
            </motion.button>
          </motion.div>

          {filterOpen && (
            <motion.div 
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full ${
                    selectedCategory === category 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          )}
            
          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {featuredProjects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  className="group relative overflow-hidden rounded-xl shadow-lg transition-all hover:shadow-xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  whileHover={{ y: -5 }}
                >
                  <div className="aspect-w-16 aspect-h-9 w-full">
                    <motion.img 
                      src={project.thumbnail} 
                      alt={project.title} 
                      className="w-full h-80 object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                    <p className="text-sm font-medium mb-1">{project.client}</p>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm bg-white/20 rounded-full px-3 py-1">{project.category}</span>
                      <motion.button 
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                        aria-label="View project details"
                        title="View project details"
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiArrowRight className="text-white" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Recent Projects Grid */}
          <motion.h2 
            className="text-2xl font-semibold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Recent Projects
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {regularProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                whileHover={{ y: -5 }}
              >
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <motion.img 
                    src={project.thumbnail} 
                    alt={project.title} 
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-1">{project.client}</p>
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-gray-100 rounded-full px-3 py-1">{project.category}</span>
                    <motion.button 
                      className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                      whileHover={{ x: 5 }}
                      whileTap={{ x: 0 }}
                    >
                      View Project <FiArrowRight className="ml-1" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="bg-gray-100 rounded-xl p-8 mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-3">Ready to start your own project?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our team of experts is ready to bring your vision to life. Let's create something amazing together.
            </p>
            <motion.button 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started <FiArrowRight className="ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </PageTransition>
    </RootLayout>
  );
};

export default WorkPage; 