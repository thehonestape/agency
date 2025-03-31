import React from 'react';
import { useTheme } from './lib/theme-context';
import './SimpleComponentGallery.css';

// Import Agency UI components
import {
  Card,
  ScrollArea,
  Tabs, TabsContent, TabsList, TabsTrigger,
  Input,
  Textarea, 
  Label,
  Button,
  Badge,
  Avatar,
  Alert, AlertDescription, AlertTitle,
  Banner,
  ThemeSwitcher
} from './components/ui';

// Import Application Shells
import { DarkNavWithWhitePageHeader } from './components/application-shells/stacked';

// Import headings
import { SimpleWithActions } from './components/headings/page-headings';

// Import data display components
import { SimpleCards } from './components/data-display/stats';
import { MonthView } from './components/data-display/calendars';

/**
 * Agency Component Gallery - showcasing actual components from the agency codebase
 */
const SimpleComponentGallery: React.FC = () => {
  // Use the new theme hook
  const { currentTheme, currentThemeId, setCurrentThemeId } = useTheme();
  
  return (
    <div id="top" className="gallery-container">
      <h1 className="gallery-title">Agency Component Gallery</h1>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <p>
          Current theme: <strong>{currentThemeId || 'Default'}</strong>
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }}>
          <Button onClick={() => setCurrentThemeId(currentThemeId === 'salient' ? 'protocol' : 'salient')}>
            Toggle Theme
          </Button>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="toc-container" style={{ marginBottom: '2rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1rem' }}>
        <h2 className="text-lg font-bold mb-2">Table of Contents</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}><a href="#app-shells" className="text-blue-600 hover:text-blue-800">Application Shells</a></li>
          <li style={{ marginBottom: '0.5rem' }}><a href="#page-headings" className="text-blue-600 hover:text-blue-800">Page Headings</a></li>
          <li style={{ marginBottom: '0.5rem' }}><a href="#data-display" className="text-blue-600 hover:text-blue-800">Data Display</a></li>
          <li style={{ marginBottom: '0.5rem' }}><a href="#ui-components" className="text-blue-600 hover:text-blue-800">UI Components</a></li>
          <li style={{ marginBottom: '0.5rem' }}><a href="#form-elements" className="text-blue-600 hover:text-blue-800">Form Elements</a></li>
          <li style={{ marginBottom: '0.5rem' }}><a href="#feedback" className="text-blue-600 hover:text-blue-800">Feedback Components</a></li>
          <li style={{ marginBottom: '0.5rem' }}><a href="#display" className="text-blue-600 hover:text-blue-800">Display Components</a></li>
          <li><a href="#utility" className="text-blue-600 hover:text-blue-800">Utility Components</a></li>
        </ul>
      </div>

      <section id="app-shells" className="component-section">
        <h2 className="section-title">Application Shells</h2>
        <div className="component-container">
          <h3 className="component-example-title">Dark Nav with White Page Header</h3>
          <p className="component-example-description">A stacked layout with dark navigation and white page header</p>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: 0, overflow: 'hidden', height: '400px' }}>
            <DarkNavWithWhitePageHeader>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Page Content</h2>
                <p>This is the main content area of the page.</p>
              </div>
            </DarkNavWithWhitePageHeader>
          </div>
        </div>
      </section>
      
      <section id="page-headings" className="component-section">
        <h2 className="section-title">Page Headings</h2>
        <div className="component-container">
          <h3 className="component-example-title">Simple With Actions</h3>
          <p className="component-example-description">Page heading with action buttons</p>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1rem', overflow: 'hidden' }}>
            <SimpleWithActions
              title="Projects"
              actions={
                <>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                  >
                    New Project
                  </button>
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Import
                  </button>
                </>
              }
            />
          </div>
        </div>
      </section>

      <section id="data-display" className="component-section">
        <h2 className="section-title">Data Display</h2>
        
        <div className="component-container">
          <h3 className="component-example-title">Simple Cards (Stats)</h3>
          <p className="component-example-description">Display statistics in simple card format</p>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1rem', overflow: 'hidden' }}>
            <SimpleCards 
              stats={[
                { 
                  name: 'Total Subscribers', 
                  value: '71,897', 
                  change: { value: '+2.4%', trend: 'up' } 
                },
                { 
                  name: 'Avg. Open Rate', 
                  value: '56.16%', 
                  change: { value: '-3.1%', trend: 'down' } 
                },
                { 
                  name: 'Avg. Click Rate', 
                  value: '12.43%', 
                  change: { value: '+4.2%', trend: 'up' } 
                }
              ]}
            />
          </div>
        </div>
        
        <div className="component-container">
          <h3 className="component-example-title">Month View Calendar</h3>
          <p className="component-example-description">Calendar component showing a month view</p>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1rem', overflow: 'hidden' }}>
            <MonthView 
              initialDate={new Date(2023, 3, 1)} // April 2023
              events={[
                { 
                  id: '1',
                  name: 'Team Meeting',
                  time: '10:00 AM',
                  datetime: '2023-04-12T10:00:00',
                  href: '#'
                },
                { 
                  id: '2',
                  name: 'Product Launch', 
                  time: '2:00 PM',
                  datetime: '2023-04-15T14:00:00',
                  href: '#'
                },
                { 
                  id: '3',
                  name: 'Client Call',
                  time: '11:30 AM',
                  datetime: '2023-04-22T11:30:00',
                  href: '#'
                }
              ]}
            />
          </div>
        </div>
      </section>

      <section id="ui-components" className="component-section">
        <h2 className="section-title">UI Components</h2>
        
        <div className="component-container">
          <h3 className="component-example-title">Card</h3>
          <p className="component-example-description">Flexible card container</p>
          <Card className="p-4 max-w-md">
            <h3 className="text-lg font-semibold mb-2">Card Title</h3>
            <p>This is a basic card component that can be used to display content in a contained area.</p>
          </Card>
        </div>
        
        <div className="component-container">
          <h3 className="component-example-title">Tabs</h3>
          <p className="component-example-description">Tabbed interface for switching between views</p>
          <Tabs defaultValue="account" className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="p-4 border rounded-md mt-2">
              Account settings content goes here.
            </TabsContent>
            <TabsContent value="password" className="p-4 border rounded-md mt-2">
              Password change form goes here.
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <section id="form-elements" className="component-section">
        <h2 className="section-title">Form Elements</h2>
        
        <div className="component-container">
          <h3 className="component-example-title">Button</h3>
          <p className="component-example-description">Standard button component with variants</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button>Default Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="destructive">Destructive Button</Button>
          </div>
        </div>
        
        <div className="component-container">
          <h3 className="component-example-title">Input Field</h3>
          <p className="component-example-description">Text input field</p>
          <div style={{ maxWidth: '300px' }}>
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" />
          </div>
        </div>
        
        <div className="component-container">
          <h3 className="component-example-title">Textarea</h3>
          <p className="component-example-description">Multi-line text input</p>
          <div style={{ maxWidth: '300px' }}>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Type your message here" />
          </div>
        </div>
      </section>
      
      <section id="feedback" className="component-section">
        <h2 className="section-title">Feedback Components</h2>
        
        <div className="component-container">
          <h3 className="component-example-title">Alert</h3>
          <p className="component-example-description">Used to display important messages</p>
          <Alert className="max-w-md">
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>
              This is an informational alert with important details for the user.
            </AlertDescription>
          </Alert>
        </div>
        
        <div className="component-container">
          <h3 className="component-example-title">Banner</h3>
          <p className="component-example-description">Top-level alert banner</p>
          <Banner>This is an important message that appears at the top of the page.</Banner>
        </div>
      </section>

      <section id="display" className="component-section">
        <h2 className="section-title">Display Components</h2>
        
        <div className="component-container">
          <h3 className="component-example-title">Badge</h3>
          <p className="component-example-description">Status indicators or labels</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Badge>Default</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="secondary">Secondary</Badge>
          </div>
        </div>
        
        <div className="component-container">
          <h3 className="component-example-title">Avatar</h3>
          <p className="component-example-description">User profile image</p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Avatar>
              <img src="https://github.com/shadcn.png" alt="User" />
            </Avatar>
            <Avatar>
              <span>JD</span>
            </Avatar>
          </div>
        </div>
      </section>
      
      <section id="utility" className="component-section">
        <h2 className="section-title">Utility Components</h2>
        
        <div className="component-container">
          <h3 className="component-example-title">Theme Switcher</h3>
          <p className="component-example-description">Toggle between light and dark mode</p>
          <ThemeSwitcher />
        </div>
        
        <div className="component-container">
          <h3 className="component-example-title">Scroll Area</h3>
          <p className="component-example-description">Scrollable container with custom scrollbar</p>
          <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
            {Array.from({ length: 50 }).map((_, i) => (
              <div key={i} className="text-sm mb-2">
                Tag {i + 1}
              </div>
            ))}
          </ScrollArea>
        </div>
      </section>
      
      <section className="component-section">
        <h2 className="section-title">Theme Tokens</h2>
        
        <div className="component-container">
          <h3 className="component-example-title">Theme Colors</h3>
          <p className="component-example-description">Color palette from the current theme</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1rem' }}>
            {currentTheme && currentTheme.tokens && Object.entries(currentTheme.tokens.colors).map(([name, value]) => (
              <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div 
                  style={{ 
                    width: '3rem', 
                    height: '3rem', 
                    backgroundColor: value as string, 
                    borderRadius: '0.375rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }} 
                />
                <span style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="component-container">
          <h3 className="component-example-title">Border Radius</h3>
          <p className="component-example-description">Border radius values in the current theme</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1rem' }}>
            {currentTheme && currentTheme.tokens && Object.entries(currentTheme.tokens.borderRadius || {}).map(([name, value]) => (
              <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div 
                  style={{ 
                    width: '3rem', 
                    height: '3rem', 
                    backgroundColor: currentTheme.tokens.colors.primary as string, 
                    borderRadius: value as string,
                  }} 
                />
                <span style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="footer">
        <p>Explore the complete Agency UI with dedicated viewers:</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
          <a href="/components/showcase" className="back-link">Component Showcase</a>
          <a href="/style-tile" className="back-link">Style Tile</a>
          <a href="/ui-blocks" className="back-link">UI Blocks</a>
          <a href="/brainstorm" className="back-link">Brainstorm Shell</a>
          <a href="/" className="back-link">Back to Home</a>
        </div>
        
        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f9ff', borderRadius: '0.5rem', border: '1px solid #bae6fd' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#0369a1' }}>Looking for more?</h3>
          <p style={{ margin: '0 0 1rem 0', color: '#0c4a6e' }}>
            This gallery contains a selection of the components available in Agency. 
            For a comprehensive view of all Tailwind UI components and application shells, 
            check out the complete component showcase.
          </p>
          <Button>
            <a href="/components/showcase" style={{ color: 'inherit', textDecoration: 'none' }}>
              View Full Component Library
            </a>
          </Button>
        </div>
      </div>

      {/* Back to Top button */}
      <div style={{ textAlign: 'center', margin: '3rem 0 1rem' }}>
        <a 
          href="#top" 
          className="back-to-top"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.5rem 1rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            borderRadius: '0.375rem',
            fontWeight: '500',
            textDecoration: 'none',
            transition: 'background-color 0.2s'
          }}
        >
          Back to Top
        </a>
      </div>
    </div>
  );
};

export default SimpleComponentGallery; 