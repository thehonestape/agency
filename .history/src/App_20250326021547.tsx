import { useState, Suspense, lazy, useEffect } from 'react'
import { Route, Routes, Navigate, Outlet, Link } from 'react-router-dom'
import { DarkNavWithWhitePageHeader } from './components/application-shells/stacked'
import { BrandSidebarWithHeader } from './components/application-shells/sidebar'
import { OrganizationList } from './components/OrganizationList'
import { CreateOrganizationForm } from './components/CreateOrganizationForm'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/Card'
import { Button } from './components/ui/button'
import { FiPlus } from 'react-icons/fi'
import RootLayout from './components/layouts/RootLayout'
import LoadingState from './components/animation/LoadingState'
import ErrorBoundary from './components/ErrorBoundary'
import { DashboardExample } from './components/dashboard'
import { ThemeProvider } from './components/theme-provider'
import { ThemeToggle } from './components/theme-toggle'
import AIChatDashboard from './pages/AIChatDashboard'
import { BrandProvider } from './components/brand/BrandProvider'
import StyleTilePage from './pages/StyleTilePage'
import UIBlocksPage from './pages/UIBlocksPage'
import UIBlocksDemo from './pages/UIBlocksDemo'
import UIBlocksDocumentation from './pages/UIBlocksDocumentation'
import PreviewImageGenerator from './components/PreviewImageGenerator'
import ThemeEditorPage from './pages/ThemeEditorPage'
import ComponentDemo from './pages/ComponentDemo'
import BrandBuilder from './pages/brand/BrandBuilder'
import AdminRoute from './components/auth/AdminRoute'
import DashboardPage from './pages/admin/DashboardPage'
import { BrandMemoryPage } from './pages/admin/BrandMemoryPage'
import BrainDumpPage from './pages/admin/[brandId]/memory/brain-dump'
import EditorDemo from './pages/editor/EditorDemo'
import BlockNoteDemo from './pages/editor/BlockNoteDemo'
import { BrainstormShell } from './components/application-shells/brainstorm/BrainstormShell'
import BrainstormHome from './pages/brainstorm/BrainstormHome'
import './App.css'
import SimpleComponentGallery from './SimpleComponentGallery'

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
const BrandedPageDemo = lazy(() => import('./pages/BrandedPageDemo'))
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
const BrandDemoPage = lazy(() => 
  import('./pages/BrandDemoPage').then(module => ({ default: module.BrandDemoPage }))
)
const WorkhorseBrandPage = lazy(() => 
  import('./pages/WorkhorseBrandPage').then(module => ({ default: module.WorkhorseBrandPage }))
)
const BrandAnalyticsPage = lazy(() => 
  import('./pages/BrandAnalyticsPage').then(module => ({ default: module.BrandAnalyticsPage }))
)
const BrandShowcasePage = lazy(() => import('./pages/BrandShowcasePage'))

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
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <BrandProvider>
        <ErrorBoundary>
          <Suspense fallback={<LoadingState />}>
            <Routes>
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

              {/* Admin Routes - Using BrandSidebarWithHeader */}
              <Route path="/admin" element={
                <AdminRoute>
                  <BrandSidebarWithHeader>
                    <Outlet />
                  </BrandSidebarWithHeader>
                </AdminRoute>
              }>
                <Route index element={<DashboardPage />} />
                <Route path=":brandId">
                  <Route path="memory">
                    <Route index element={<BrandMemoryPage />} />
                    <Route path="brain-dump" element={<BrainDumpPage />} />
                  </Route>
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
                
                {/* Dashboard routes */}
                <Route path="/dashboard">
                  <Route path="default" element={<DefaultDashboardPage />} />
                  <Route path="ai" element={<AIChatDashboard />} />
                  <Route path="designer" element={<DesignerDashboard />} />
                  <Route path="client" element={<ClientDashboard />} />
                  <Route index element={<Navigate to="/dashboard/default" replace />} />
                </Route>
                
                {/* Projects routes */}
                <Route path="/projects">
                  <Route index element={<ProjectsPage />} />
                  <Route path="manage" element={<ProjectManagementPage />} />
                  <Route path=":id" element={<ProjectView />} />
                  <Route path="collaborate" element={<ProjectCollaborationPage />} />
                </Route>
              </Route>

              {/* Root route with its own layout */}
              <Route path="/" element={<Layout><Home /></Layout>} />

              {/* Catch all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />

              {/* Brand routes */}
              <Route path="/brands">
                <Route path="demo" element={<BrandDemoPage />} />
                <Route path="workhorse" element={<WorkhorseBrandPage />} />
                <Route path="analytics" element={<BrandAnalyticsPage />} />
                <Route path="showcase" element={<BrandShowcasePage />} />
                <Route path="builder" element={<BrandBuilder />} />
              </Route>
              
              {/* Component demos */}
              <Route path="/components">
                <Route path="showcase" element={<ComponentShowcase />} />
                <Route index element={<SimpleComponentGallery />} />
                <Route path=":id" element={<TailwindComponentViewer />} />
              </Route>
              <Route path="/component-system-demo" element={<ComponentDemo />} />
              <Route path="/feature-showcase" element={<FeatureShowcase />} />
              <Route path="/modern-theme-editor" element={<ModernThemeEditor />} />
              
              {/* Other demos */}
              <Route path="/demos">
                <Route path="sitemap" element={<SitemapPage />} />
                <Route path="sitemap-editor" element={<SitemapEditorPage />} />
                <Route path="block-editor" element={<BlockEditorDemo />} />
                <Route path="advanced-block-editor" element={<AdvancedBlockEditorDemo />} />
                <Route path="branded-page" element={<BrandedPageDemo />} />
                <Route path="typography" element={<TypographyFlowDemo />} />
                <Route path="theme" element={<ThemeShowcasePage />} />
                <Route path="data" element={<DataExplorerPage />} />
              </Route>
              <Route path="/style-tile" element={<StyleTilePage />} />
              <Route path="/ui-blocks">
                <Route index element={<UIBlocksPage />} />
                <Route path="demo" element={<UIBlocksDemo />} />
                <Route path="documentation" element={<UIBlocksDocumentation />} />
                <Route path="preview-generator" element={<PreviewImageGenerator />} />
              </Route>
              <Route path="/theme-editor" element={<ModernThemeEditor />} />
              <Route path="/component-generator" element={<ComponentGenerator />} />
              <Route path="/editor">
                <Route path="demo" element={<EditorDemo />} />
                <Route path="block" element={<BlockEditorDemo />} />
              </Route>
              <Route path="/editor/blocknote" element={<BlockNoteDemo />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrandProvider>
    </ThemeProvider>
  );
}

export default App 