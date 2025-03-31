import { Suspense } from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'
import { AppShell } from './components/ui/shell/AppShell'
import ErrorBoundary from './components/ui/feedback/ErrorBoundary'
import HomePage from './pages/HomePage'
import ComponentExplorer from './pages/ComponentExplorer'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <Routes>
          {/* Public Routes - Marketing/Sales Pages */}
          <Route element={<AppShell><Outlet /></AppShell>}>
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

          {/* Dashboard Routes - Using your existing components directly */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/projects" element={<DashboardPage />} />
          <Route path="/dashboard/team" element={<DashboardPage />} />
          <Route path="/dashboard/analytics" element={<DashboardPage />} />
          <Route path="/dashboard/settings" element={<DashboardPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App 