import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell } from '../components/ui/shell/AppShell';

/**
 * MainLayout - The primary layout for public-facing pages
 * Uses the existing AppShell component
 */
const MainLayout: React.FC = () => {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
};

export default MainLayout; 