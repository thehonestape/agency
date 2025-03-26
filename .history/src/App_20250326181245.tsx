import { useState, Suspense, lazy, useEffect } from 'react'
import { Route, Routes, Navigate, Outlet, Link } from 'react-router-dom'
import { DarkNavWithWhitePageHeader } from './components/application-shells/stacked'
import { DarkSidebarWithHeader } from './components/application-shells/sidebar'
import { OrganizationList } from './components/OrganizationList'
import { CreateOrganizationForm } from './components/CreateOrganizationForm'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/Card'
import { Button } from './components/ui/button'
import { FiPlus } from 'react-icons/fi'
import RootLayout from './components/layouts/RootLayout'
import LoadingState from './components/animation/LoadingState'
import ErrorBoundary from './components/ErrorBoundary'
import { DashboardExample } from './components/dashboard'
import { ThemeToggle } from './components/theme-toggle'
import AIChatDashboard from './pages/AIChatDashboard'
import StyleTilePage from './pages/StyleTilePage'
import UIBlocksPage from './pages/UIBlocksPage'
import UIBlocksDemo from './pages/UIBlocksDemo'
import UIBlocksDocumentation from './pages/UIBlocksDocumentation'
import PreviewImageGenerator from './components/PreviewImageGenerator'
import ThemeEditorPage from './pages/ThemeEditorPage'
import ComponentDemo from './pages/ComponentDemo'
import AdminRoute from './components/auth/AdminRoute'
import DashboardPage from './pages/admin/DashboardPage'
import EditorDemo from './pages/editor/EditorDemo'
import BlockNoteDemo from './pages/editor/BlockNoteDemo'
import { BrainstormShell } from './components/application-shells/brainstorm/BrainstormShell'
import BrainstormHome from './pages/brainstorm/BrainstormHome'
import './App.css'
import SimpleComponentGallery from './SimpleComponentGallery'
import TailwindTest from './pages/TailwindTest'
import WorkingDemo from './pages/working-demo'

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'))
const WorkPage = lazy(() => import('./pages/WorkPage'))
const PricingPage = lazy(() => import('./pages/PricingPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const StudioPage = lazy(() => import('./pages/StudioPage'))
const OnboardingPage = lazy(() => import('./pages/OnboardingPage'))
const DefaultDashboardPage = lazy(() => import('./pages/DefaultDashboardPage'))
const SitemapPage = lazy(() => import('./pages/SitemapPage'))
const SitemapEditorPage = lazy(() => import('./pages/SitemapEditorPage'))
const BlockEditorDemo = lazy(() => import('./pages/BlockEditorDemo'))
const AdvancedBlockEditorDemo = lazy(() => import('./pages/AdvancedBlockEditorDemo'))
const TypographyFlowDemo = lazy(() => import('./pages/TypographyFlowDemo'))
const ThemeShowcasePage = lazy(() => import('./pages/ThemeShowcasePage'))
const DataExplorerPage = lazy(() => import('./pages/DataExplorerPage'))
const DesignerDashboard = lazy(() => import('./pages/DesignerDashboard'))
const ClientDashboard = lazy(() => import('./pages/ClientDashboard'))
const ComponentShowcase = lazy(() => import('./pages/ComponentShowcase'))
const ComponentGenerator = lazy(() => import('./pages/ComponentGenerator'))
const FeatureShowcase = lazy(() => import('./pages/FeatureShowcase'))
const ModernThemeEditor = lazy(() => import('./pages/ModernThemeEditor'))
const DemoPage = lazy(() => import('./pages/demo'))
const StandaloneShowcase = lazy(() => import('./pages/standalone-showcase'))
const CleanComponentShowcase = lazy(() => import('./pages/CleanComponentShowcase'))
const AppShowcase = lazy(() => import('./pages/app-showcase'))
const TwoColumnShowcase = lazy(() => import('./pages/two-column-showcase'))

// Lazy load named exports
const ProjectsPage = lazy(() => 
  import('./pages/ProjectsPage').then(module => ({ default: module.ProjectsPage }))
)
const ProjectManagementPage = lazy(() => 
  import('./pages/ProjectManagementPage').then(module => ({ default: module.ProjectManagementPage }))
)
const ProjectView = lazy(() => 
  import('./pages/ProjectView').then(module => ({ default: module.ProjectView }))
)
const ProjectCollaborationPage = lazy(() => import('./pages/ProjectCollaborationPage'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

// Import the TailwindComponentBrowser and TailwindComponentViewer
const TailwindComponentsPage = lazy(() => 
  import('./components/TailwindComponentBrowser').then(module => ({ default: module.default }))
)
const TailwindComponentViewer = lazy(() => 
  import('./components/TailwindComponentViewer').then(module => ({ default: module.default }))
)

// Lazy load for wrapped version
const ComponentGalleryPage = lazy(() => import('./pages/SimpleComponentGallery'))

// Wrap it with the same layout used for other pages
const WrappedComponentGallery = () => (
  <DarkNavWithWhitePageHeader>
    <ComponentGalleryPage />
  </DarkNavWithWhitePageHeader>
);

// Layout component for the app
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Agency</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/components">Component Gallery</Link></li>
          </ul>
        </nav>
      </header>
      <main className="app-main">
        {children}
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Agency. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Home page component
const Home: React.FC = () => {
  return (
    <div className="home-page">
      <h2>Welcome to Agency</h2>
      <p>This is a demo app showcasing our component library.</p>
      <p>
        <Link to="/components" className="cta-button">
          View Component Gallery
        </Link>
      </p>
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingState />}>
        <Routes>
          {/* Working Demo Route */}
          <Route path="/working-demo" element={<WorkingDemo />} />
          
          {/* Tailwind Test Route */}
          <Route path="/tailwind-test" element={<TailwindTest />} />
          
          {/* Brainstorm Routes - No Auth Required */}
          <Route path="/brainstorm" element={<BrainstormShell><Outlet /></BrainstormShell>}>
            <Route index element={<BrainstormHome />} />
          </Route>

          {/* Component Gallery Routes */}
          <Route path="/component-gallery" element={<SimpleComponentGallery />} />
          <Route path="/gallery" element={<SimpleComponentGallery />} />
          
          {/* Direct routes to component showcases */}
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/showcase" element={<StandaloneShowcase />} />
          <Route path="/clean-showcase" element={<CleanComponentShowcase />} />
          <Route path="/app-showcase" element={<AppShowcase />} />
          <Route path="/two-column-showcase" element={<TwoColumnShowcase />} />
          
          {/* Sitemap Routes */}
          <Route path="/sitemap" element={<SitemapPage />} />
          <Route path="/sitemap/editor" element={<SitemapEditorPage />} />

          {/* Admin Routes - Using DarkSidebarWithHeader */}
          <Route path="/admin" element={
            <AdminRoute>
              <DarkSidebarWithHeader>
                <Outlet />
              </DarkSidebarWithHeader>
            </AdminRoute>
          }>
            <Route index element={<DashboardPage />} />
            <Route path=":brandId">
              <Route path="design" element={<div>Design Page</div>} />
              <Route path="story" element={<div>Story Page</div>} />
              <Route path="digital" element={<div>Digital Page</div>} />
              <Route path="social" element={<div>Social Page</div>} />
              <Route path="business" element={<div>Business Page</div>} />
            </Route>
            <Route path="settings" element={<div>Settings Page</div>} />
          </Route>

          {/* Non-Admin Routes - Using DarkNavWithWhitePageHeader */}
          <Route element={
            <DarkNavWithWhitePageHeader>
              <Outlet />
            </DarkNavWithWhitePageHeader>
          }>
            {/* Marketing/Public Routes */}
            <Route path="/work" element={<WorkPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/studio" element={<StudioPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App 