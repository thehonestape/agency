import { Suspense } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import ErrorBoundary from './components/ui/feedback/ErrorBoundary';
import HomePage from './pages/HomePage';
import ComponentExplorer from './pages/ComponentExplorer';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import ComponentsPage from './pages/ComponentsPage';
import DesignSystemPage from './pages/DesignSystemPage';
import ThemeDemoPage from './pages/ThemeDemoPage';
import DesignSystemDocsPage from './pages/DesignSystemDocsPage';
import ViewSwitcherPage from './pages/ViewSwitcherPage';
import ViewSwitcherDemo from './pages/ViewSwitcherDemo';
import StandaloneViewDemo from './pages/StandaloneViewDemo';

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <Routes>
          {/* Public Routes - Marketing/Sales Pages */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<div>Work Page</div>} />
            <Route path="/pricing" element={<div>Pricing Page</div>} />
            <Route path="/services" element={<div>Services Page</div>} />
            <Route path="/studio" element={<div>Studio Page</div>} />
            <Route path="/onboarding" element={<div>Onboarding Page</div>} />
            <Route path="/demo" element={<div>Demo Page</div>} />
            <Route path="/theme" element={<ThemeDemoPage />} />
            <Route path="/components" element={<ComponentExplorer />} />
            <Route path="/design-docs" element={<DesignSystemDocsPage />} />
            <Route path="/view-switcher" element={<ViewSwitcherPage />} />
            <Route path="/view-switcher-demo" element={<ViewSwitcherDemo />} />
            <Route path="/standalone-demo" element={<StandaloneViewDemo />} />
          </Route>

          {/* Dashboard Routes with unified layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/projects" element={<div>Projects Dashboard</div>} />
            <Route path="/dashboard/team" element={<div>Team Management</div>} />
            <Route path="/dashboard/analytics" element={<div>Analytics Dashboard</div>} />
            <Route path="/dashboard/components" element={<ComponentsPage />} />

            {/* Design System Pages */}
            <Route path="/dashboard/design" element={<DesignSystemPage />} />
            <Route path="/dashboard/design/theme" element={<ThemeDemoPage />} />
            <Route path="/dashboard/design/docs" element={<DesignSystemDocsPage />} />
            <Route path="/dashboard/design/view-switcher" element={<ViewSwitcherDemo />} />

            <Route path="/dashboard/settings" element={<div>Settings Page</div>} />
            <Route path="/dashboard/docs" element={<div>Documentation</div>} />
            <Route path="/dashboard/help" element={<div>Help & Support</div>} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
