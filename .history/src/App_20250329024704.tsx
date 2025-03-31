import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ui/feedback/ErrorBoundary';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import ComponentExplorer from './pages/ComponentExplorer';
import DesignSystemDocsPage from './pages/DesignSystemDocsPage';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import FullViewExample from './views/FullViewExample';
import DesignSystem from './pages/DesignSystem';
import ThemeDemoPage from './pages/ThemeDemoPage';

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <Routes>
          {/* Design System Route */}
          <Route path="/design-system" element={<DesignSystem />} />
          <Route path="/theme-demo" element={<ThemeDemoPage />} />
          <Route path="/design-docs" element={<DesignSystemDocsPage />} />
          
          {/* Public Routes - Marketing/Sales Pages */}
          <Route element={<MainLayout />}>
            {/* Home Page Route (Default) */}
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/work" element={<div>Work Page</div>} />
            <Route path="/about" element={<div>About Page</div>} />
            <Route path="/contact" element={<div>Contact Page</div>} />
            <Route path="/pricing" element={<div>Pricing Page</div>} />
            <Route path="/blog" element={<div>Blog Page</div>} />
            <Route path="/blog/:slug" element={<div>Blog Post Page</div>} />
            <Route path="/resources" element={<div>Resources Page</div>} />
            <Route path="/customers" element={<div>Customers Page</div>} />
            <Route path="/onboarding" element={<div>Onboarding Page</div>} />
            <Route path="/demo" element={<div>Demo Page</div>} />
            <Route path="/components" element={<ComponentExplorer />} />
            
            {/* Authentication Pages */}
            <Route path="/login" element={<div>Login Page</div>} />
            <Route path="/signup" element={<div>Signup Page</div>} />
            <Route path="/forgot-password" element={<div>Forgot Password Page</div>} />
            <Route path="/reset-password" element={<div>Reset Password Page</div>} />
            <Route path="/verify-email" element={<div>Verify Email Page</div>} />

            {/* Documentation Pages */}
            <Route path="/docs" element={<div>Documentation Page</div>} />
            <Route path="/docs/:slug" element={<div>Documentation Topic Page</div>} />
            <Route path="/guides" element={<div>Guides Page</div>} />
            <Route path="/guides/:slug" element={<div>Guide Detail Page</div>} />
            <Route path="/api" element={<div>API Documentation Page</div>} />
            <Route path="/api/:slug" element={<div>API Endpoint Detail Page</div>} />
          </Route>

          {/* Dashboard Routes with unified layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/projects" element={<div>Projects Dashboard</div>} />
            <Route path="/dashboard/team" element={<div>Team Management</div>} />
            <Route path="/dashboard/analytics" element={<div>Analytics Dashboard</div>} />
            <Route path="/dashboard/billing" element={<div>Billing & Subscription</div>} />
            <Route path="/dashboard/account" element={<div>Account Settings</div>} />
            <Route path="/dashboard/notifications" element={<div>Notifications</div>} />
            <Route path="/dashboard/integrations" element={<div>Integrations</div>} />
            <Route path="/dashboard/templates" element={<div>Templates</div>} />
            <Route path="/dashboard/design/overview" element={<FullViewExample />} />
            <Route path="/dashboard/settings" element={<div>Settings Page</div>} />
            <Route path="/dashboard/help" element={<div>Help & Support</div>} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
