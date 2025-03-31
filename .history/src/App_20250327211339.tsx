import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import ComponentDashboard from './pages/ComponentDashboard';
import Forms from './pages/Forms';
import Lists from './pages/Lists';
import Grids from './pages/Grids';
import Settings from './pages/Settings';

const App: React.FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/components" element={<ComponentDashboard />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/grids" element={<Grids />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </MainLayout>
  );
};

export default App; 