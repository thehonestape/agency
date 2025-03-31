import { Suspense } from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'
import { AppShell } from './components/ui/shell/AppShell'
import { DashboardLayout } from './components/layouts/DashboardLayout'
import ErrorBoundary from './components/ui/feedback/ErrorBoundary'
import HomePage from './pages/HomePage'

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
          </Route>

          {/* Dashboard Routes - Protected/Logged In Pages */}
          <Route element={<DashboardLayout><Outlet /></DashboardLayout>}>
            <Route path="/dashboard" element={<div>Dashboard Overview</div>} />
            <Route path="/dashboard/projects" element={<div>Projects</div>} />
            <Route path="/dashboard/team" element={<div>Team</div>} />
            <Route path="/dashboard/analytics" element={<div>Analytics</div>} />
            <Route path="/dashboard/settings" element={<div>Settings</div>} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App 