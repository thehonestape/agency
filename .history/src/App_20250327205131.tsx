import { Suspense } from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'
import { AppShell } from './components/ui/shell/AppShell'
import ErrorBoundary from './components/ui/feedback/ErrorBoundary'
import HomePage from './pages/HomePage'
import ComponentDashboard from './pages/ComponentDashboard'

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <Routes>
          {/* Public Routes */}
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

          {/* Components Route - Without AppShell Header */}
          <Route path="/components" element={<AppShell showHeader={false}><ComponentDashboard /></AppShell>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AppShell><Outlet /></AppShell>}>
            <Route index element={<div>Dashboard</div>} />
            <Route path=":brandId">
              <Route path="design" element={<div>Design Page</div>} />
              <Route path="story" element={<div>Story Page</div>} />
              <Route path="digital" element={<div>Digital Page</div>} />
              <Route path="social" element={<div>Social Page</div>} />
              <Route path="business" element={<div>Business Page</div>} />
            </Route>
            <Route path="settings" element={<div>Settings Page</div>} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App 