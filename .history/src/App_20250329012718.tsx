import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThemeProvider from './lib/theme-context';
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
import SimpleDemoPage from './views/SimpleDemoPage';
import FullViewExample from './views/FullViewExample';
import DesignSystem from './pages/DesignSystem';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// App Layout Components
const PublicLayout = lazy(() => import('./layouts/PublicLayout'));

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/design-system" element={<DesignSystem />} />
                <Route path="/theme-demo" element={<ThemeDemoPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/work" element={<div>Work Page</div>} />
                <Route path="/pricing" element={<div>Pricing Page</div>} />
                <Route path="/services" element={<div>Services Page</div>} />
                <Route path="/studio" element={<div>Studio Page</div>} />
                <Route path="/onboarding" element={<div>Onboarding Page</div>} />
                <Route path="/demo" element={<div>Demo Page</div>} />
                <Route path="/components" element={<ComponentExplorer />} />
                <Route path="/design-docs" element={<DesignSystemDocsPage />} />
                <Route path="/view-switcher" element={<ViewSwitcherPage />} />
                <Route path="/view-switcher-demo" element={<ViewSwitcherDemo />} />
                <Route path="/standalone-demo" element={<StandaloneViewDemo />} />
                <Route path="/simple-demo" element={<SimpleDemoPage />} />
                <Route path="/simple-views" element={<SimpleDemoPage />} />
                <Route path="/full-view-demo" element={<FullViewExample />} />
              </Route>

              {/* Dashboard Routes */}
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/profile" element={<div>Profile Page</div>} />
                <Route path="/dashboard/settings" element={<div>Settings Page</div>} />
                <Route path="/dashboard/notifications" element={<div>Notifications Page</div>} />
                <Route path="/dashboard/projects" element={<div>Projects Dashboard</div>} />
                <Route path="/dashboard/team" element={<div>Team Management</div>} />
                <Route path="/dashboard/analytics" element={<div>Analytics Dashboard</div>} />
                <Route path="/dashboard/components" element={<ComponentsPage />} />

                {/* Design System Pages */}
                <Route path="/dashboard/design" element={<DesignSystemPage />} />
                <Route path="/dashboard/design/theme" element={<ThemeDemoPage />} />
                <Route path="/dashboard/design/docs" element={<DesignSystemDocsPage />} />
                <Route path="/dashboard/design/view-switcher" element={<ViewSwitcherDemo />} />

                <Route path="/dashboard/help" element={<div>Help & Support</div>} />
              </Route>

              {/* Design System Pages */}
              <Route path="/design-system/*" element={<DesignSystem />} />

              {/* 404 Page */}
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </ThemeProvider>
  );
}

export default App;
