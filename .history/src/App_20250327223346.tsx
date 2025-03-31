import { Suspense } from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'
import ErrorBoundary from './components/ui/feedback/ErrorBoundary'
import HomePage from './pages/HomePage'
import ComponentExplorer from './pages/ComponentExplorer'
import DashboardLayout from './layouts/DashboardLayout'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import ComponentsPage from './pages/ComponentsPage'
import DesignSystemPage from './pages/DesignSystemPage'

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
            <Route path="/theme" element={<div>Theme Editor</div>} />
            <Route path="/components" element={<ComponentExplorer />} />
          </Route>

          {/* Dashboard Routes with unified layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/projects" element={<div>Projects Dashboard</div>} />
            <Route path="/dashboard/team" element={<div>Team Management</div>} />
            <Route path="/dashboard/analytics" element={<div>Analytics Dashboard</div>} />
            <Route path="/dashboard/components" element={<ComponentsPage />} />
            
            {/* Single Design System Page with anchor links */}
            <Route path="/dashboard/design" element={<DesignSystemPage />} />
            
            <Route path="/dashboard/settings" element={<div>Settings Page</div>} />
            <Route path="/dashboard/docs" element={<div>Documentation</div>} />
            <Route path="/dashboard/help" element={<div>Help & Support</div>} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App 