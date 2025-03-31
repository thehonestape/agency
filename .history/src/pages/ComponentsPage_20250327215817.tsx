import React from 'react';
import ComponentView from '../components/ui/ComponentView';

/**
 * ComponentsPage - A page for the component explorer
 * This uses our reusable ComponentView component
 * To be used within the DashboardLayout
 */
const ComponentsPage: React.FC = () => {
  return (
    <ComponentView 
      title="Component Library"
      description="Browse and explore our UI component system" 
      initialTab="registry"
      showRegistryTab={true}
    />
  );
};

export default ComponentsPage; 