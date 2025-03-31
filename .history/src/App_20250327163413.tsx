import { Suspense } from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'
import { DarkNavWithWhitePageHeader } from './components/ui/shell/stacked/DarkNavWithWhitePageHeader'
import { DarkSidebarWithHeader } from './components/ui/shell/sidebar/DarkSidebarWithHeader'
import ErrorBoundary from './components/ui/feedback/ErrorBoundary'
import HomePage from './pages/HomePage'

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <Routes>
          {/* Root path */}
          <Route path="/" element={<HomePage />} />
          
          {/* Add test route for color system */}
          <Route path="/color-test" element={
            <DarkNavWithWhitePageHeader
              layout={{ type: 'stacked' }}
            >
              <div>Color System Test</div>
            </DarkNavWithWhitePageHeader>
          } />
          
          {/* Component Gallery Routes */}
          <Route path="/component-gallery" element={<div>Component Gallery</div>} />
          <Route path="/gallery" element={<div>Gallery</div>} />
          
          {/* Direct routes to component showcases */}
          <Route path="/demo" element={<div>Demo Page</div>} />
          <Route path="/showcase" element={<div>Showcase</div>} />
          <Route path="/clean-showcase" element={<div>Clean Showcase</div>} />
          <Route path="/app-showcase" element={<div>App Showcase</div>} />
          <Route path="/two-column-showcase" element={<div>Two Column Showcase</div>} />

          {/* Admin Routes - Using DarkSidebarWithHeader */}
          <Route path="/admin" element={
            <div>
              <DarkSidebarWithHeader
                layout={{ type: 'sidebar' }}
              >
                <Outlet />
              </DarkSidebarWithHeader>
            </div>
          }>
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

          {/* Non-Admin Routes - Using DarkNavWithWhitePageHeader */}
          <Route element={
            <DarkNavWithWhitePageHeader
              layout={{ type: 'stacked' }}
            >
              <Outlet />
            </DarkNavWithWhitePageHeader>
          }>
            {/* Marketing/Public Routes */}
            <Route path="/work" element={<div>Work Page</div>} />
            <Route path="/pricing" element={<div>Pricing Page</div>} />
            <Route path="/services" element={<div>Services Page</div>} />
            <Route path="/studio" element={<div>Studio Page</div>} />
            <Route path="/onboarding" element={<div>Onboarding Page</div>} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App 