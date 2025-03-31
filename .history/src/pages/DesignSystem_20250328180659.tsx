import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { SideNav } from '@/components/patterns/navigation/SideNav';
import { TopBar } from '@/components/patterns/navigation/TopBar';
import { FiBell } from 'react-icons/fi';
import { Heading, Text } from '@/components/ui/typography';

// Define the sections that will be in the design system
const sections = [
  // Foundations
  { id: 'foundations-philosophy', label: 'Philosophy', category: 'Foundations' },
  { id: 'foundations-typography', label: 'Typography', category: 'Foundations' },
  { id: 'foundations-colors', label: 'Colors', category: 'Foundations' },
  { id: 'foundations-space', label: 'Space & Scale', category: 'Foundations' },
  { id: 'foundations-visual', label: 'Visual Language', category: 'Foundations' },
  
  // Identity
  { id: 'identity-logo', label: 'Logo', category: 'Identity' },
  { id: 'identity-iconography', label: 'Iconography', category: 'Identity' },
  { id: 'identity-voice', label: 'Voice & Tone', category: 'Identity' },
  { id: 'identity-photography', label: 'Photography', category: 'Identity' },
  
  // Components
  { id: 'components-buttons', label: 'Buttons', category: 'Components' },
  { id: 'components-forms', label: 'Forms', category: 'Components' },
  { id: 'components-cards', label: 'Cards', category: 'Components' },
  { id: 'components-navigation', label: 'Navigation', category: 'Components' },
  { id: 'components-feedback', label: 'Feedback', category: 'Components' },
  
  // Applications
  { id: 'applications-layout', label: 'Layout', category: 'Applications' },
  { id: 'applications-web', label: 'Web', category: 'Applications' },
  { id: 'applications-social', label: 'Social', category: 'Applications' },
  { id: 'applications-print', label: 'Print', category: 'Applications' },
  
  // Resources
  { id: 'resources-templates', label: 'Templates', category: 'Resources' },
  { id: 'resources-downloads', label: 'Downloads', category: 'Resources' },
  { id: 'resources-guides', label: 'Guides', category: 'Resources' },
];

// Convert sections to navigation items for SideNav with categories
const navItems = [
  {
    label: 'Foundations',
    items: sections.filter(section => section.category === 'Foundations').map(section => ({
      label: section.label,
      href: `#${section.id}`,
      active: false
    }))
  },
  {
    label: 'Identity',
    items: sections.filter(section => section.category === 'Identity').map(section => ({
      label: section.label,
      href: `#${section.id}`,
      active: false
    }))
  },
  {
    label: 'Components',
    items: sections.filter(section => section.category === 'Components').map(section => ({
      label: section.label,
      href: `#${section.id}`,
      active: false
    }))
  },
  {
    label: 'Applications',
    items: sections.filter(section => section.category === 'Applications').map(section => ({
      label: section.label,
      href: `#${section.id}`,
      active: false
    }))
  },
  {
    label: 'Resources',
    items: sections.filter(section => section.category === 'Resources').map(section => ({
      label: section.label,
      href: `#${section.id}`,
      active: false
    }))
  }
];

export default function DesignSystem() {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const [navigationItems, setNavigationItems] = useState(navItems);

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Update active state in navigation
    const updatedNavItems = navItems.map(group => ({
      ...group,
      items: group.items.map(item => ({
        ...item,
        active: item.href === `#${sectionId}`
      }))
    }));
    setNavigationItems(updatedNavItems);
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Update URL hash without causing a page reload
    window.history.pushState(null, '', `#${sectionId}`);
  };

  // Set the active section based on the URL hash on initial load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && sections.some(section => section.id === hash)) {
      setActiveSection(hash);
      
      // Update active state in navigation
      const updatedNavItems = navItems.map(group => ({
        ...group,
        items: group.items.map(item => ({
          ...item,
          active: item.href === `#${hash}`
        }))
      }));
      setNavigationItems(updatedNavItems);
      
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // User profile section for the top bar
  const userProfile = (
    <div className="flex items-center space-x-4">
      <button 
        className="p-1 rounded-full text-muted-foreground hover:text-foreground"
        aria-label="View notifications"
      >
        <FiBell className="w-6 h-6" />
      </button>
      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
        <span className="font-medium text-sm text-foreground">AB</span>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <SideNav items={navigationItems} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar title="Workhorse Design System" rightContent={userProfile} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="px-8 py-8 space-y-16">
            {/* Introduction */}
            <section className="mb-12">
              <h1 className="text-4xl font-bold mb-4">Workhorse Design</h1>
              <h2 className="text-2xl font-semibold mb-6">Design System</h2>
              <p className="text-lg text-muted-foreground">
                Our design system provides a comprehensive set of guidelines, components, and patterns 
                to create consistent and cohesive user experiences across all our products.
              </p>
            </section>

            {/* Typography */}
            <section id="foundations-typography" className="scroll-mt-16 space-y-6">
              <Heading variant="h3">Typography</Heading>
              <Text className="text-lg">
                Our voice made visible through typeface, hierarchy, and expression.
              </Text>
              
              <Card>
                <CardHeader>
                  <CardTitle>Heading System</CardTitle>
                  <CardDescription>Complete set of heading components for building clear hierarchies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Heading variant="h1" className="mb-2">Heading 1 (h1)</Heading>
                    <Text className="text-sm text-muted-foreground">Used for page titles and major sections - 4xl size, bold, tight leading</Text>
                  </div>
                  <div>
                    <Heading variant="h2" className="mb-2">Heading 2 (h2)</Heading>
                    <Text className="text-sm text-muted-foreground">Used for section headers - 3xl size, semibold, snug leading</Text>
                  </div>
                  <div>
                    <Heading variant="h3" className="mb-2">Heading 3 (h3)</Heading>
                    <Text className="text-sm text-muted-foreground">Used for subsection titles - 2xl size, semibold, snug leading</Text>
                  </div>
                  <div>
                    <Heading variant="h4" className="mb-2">Heading 4 (h4)</Heading>
                    <Text className="text-sm text-muted-foreground">Used for card titles and smaller sections - xl size, medium, normal leading</Text>
                  </div>
                  <div>
                    <Heading variant="h5" className="mb-2">Heading 5 (h5)</Heading>
                    <Text className="text-sm text-muted-foreground">Used for labels and minor headings - lg size, medium, normal leading</Text>
                  </div>
                  <div>
                    <Heading variant="h6" className="mb-2">Heading 6 (h6)</Heading>
                    <Text className="text-sm text-muted-foreground">Used for small sections and labels - base size, medium, normal leading</Text>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Custom Heading Sizes</CardTitle>
                  <CardDescription>Flexible sizing options independent of semantic level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Heading variant="h2" size="4xl" className="mb-2">Oversized Heading</Heading>
                      <Text className="text-sm text-muted-foreground">Using h2 with 4xl size for hero sections</Text>
                    </div>
                    <div>
                      <Heading variant="h3" size="2xl" className="mb-2">Balanced Heading</Heading>
                      <Text className="text-sm text-muted-foreground">Using h3 with 2xl size for balanced hierarchy</Text>
                    </div>
                    <div>
                      <Heading variant="h4" size="lg" className="mb-2">Subtle Heading</Heading>
                      <Text className="text-sm text-muted-foreground">Using h4 with lg size for subtle hierarchy</Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Text Component</CardTitle>
                  <CardDescription>Flexible text components for body content with multiple variations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <Text size="xl" className="mb-2">Extra Large Text</Text>
                    <Text className="text-sm text-muted-foreground">Used for featured quotes and highlighted content</Text>
                    <div className="mt-2 p-4 bg-muted/20 rounded-md">
                      <Text size="xl">This is extra large text for impactful statements and featured content that needs to stand out from regular body text.</Text>
                    </div>
                  </div>
                  
                  <div>
                    <Text size="lg" className="mb-2">Large Text</Text>
                    <Text className="text-sm text-muted-foreground">Used for introductory paragraphs and lead-ins</Text>
                    <div className="mt-2 p-4 bg-muted/20 rounded-md">
                      <Text size="lg">This is large text used for introductory sections, hero descriptions, or anywhere you need slightly emphasized body copy.</Text>
                    </div>
                  </div>
                  
                  <div>
                    <Text className="font-medium mb-2">Regular Text (Base)</Text>
                    <Text className="text-sm text-muted-foreground">Default paragraph size for most content</Text>
                    <div className="mt-2 p-4 bg-muted/20 rounded-md">
                      <Text>This is the standard paragraph text used throughout the application for most content blocks. It provides good readability for longer form content.</Text>
                    </div>
                  </div>
                  
                  <div>
                    <Text size="sm" className="font-medium mb-2">Small Text</Text>
                    <Text className="text-sm text-muted-foreground">Used for secondary information</Text>
                    <div className="mt-2 p-4 bg-muted/20 rounded-md">
                      <Text size="sm">This smaller text is used for secondary information, metadata, captions, and supporting context.</Text>
                    </div>
                  </div>
                  
                  <div>
                    <Text size="xs" className="font-medium mb-2">Extra Small Text</Text>
                    <Text className="text-sm text-muted-foreground">Used for fine print and minimal UI elements</Text>
                    <div className="mt-2 p-4 bg-muted/20 rounded-md">
                      <Text size="xs">This extra small text is used for legal text, footnotes, and minimal UI elements where space is limited.</Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Text Variants</CardTitle>
                  <CardDescription>Semantic variations for different content purposes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/20 rounded-md">
                      <Text variant="default">Default: Standard text appearance</Text>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-md">
                      <Text variant="muted">Muted: Subdued text for secondary content</Text>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-md">
                      <Text variant="error">Error: Used for error messages and warnings</Text>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-md">
                      <Text variant="success">Success: Used for success confirmations</Text>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-md">
                      <Text variant="warning">Warning: For cautionary information</Text>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-md">
                      <Text variant="info">Info: For informational messages</Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Font Weights</CardTitle>
                  <CardDescription>Weight variations to establish hierarchy and emphasis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/20 rounded-md">
                      <Text weight="regular">Regular (400): Primary body text weight</Text>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-md">
                      <Text weight="medium">Medium (500): Subtle emphasis and UI labels</Text>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-md">
                      <Text weight="semibold">Semibold (600): Strong emphasis and subheadings</Text>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-md">
                      <Text weight="bold">Bold (700): Maximum emphasis for important content</Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Special Typography</CardTitle>
                  <CardDescription>Specialized typography components for specific use cases</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <Heading variant="h5" className="mb-3">Code</Heading>
                      <div className="p-4 bg-muted/20 rounded-md space-y-3">
                        <div>
                          <Text className="mb-1 text-sm">Default Code:</Text>
                          <code className="font-mono rounded px-[0.3em] py-[0.2em] text-[0.9em] bg-muted text-foreground">
                            npm install @workhorse/ui
                          </code>
                        </div>
                        <div>
                          <Text className="mb-1 text-sm">Accent Code:</Text>
                          <code className="font-mono rounded px-[0.3em] py-[0.2em] text-[0.9em] bg-primary/10 text-primary">
                            const theme = createTheme()
                          </code>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Heading variant="h5" className="mb-3">Keyboard</Heading>
                      <div className="p-4 bg-muted/20 rounded-md space-y-3">
                        <div>
                          <Text className="mb-1 text-sm">Default Keyboard:</Text>
                          <div className="inline-flex">
                            <kbd className="font-mono inline-flex h-5 items-center justify-center rounded-[0.2em] border border-b-2 px-1.5 text-[0.85em] font-medium border-border bg-muted shadow-[inset_0_-1px_0_1px_var(--border)]">Ctrl</kbd>
                            <span className="mx-1">+</span>
                            <kbd className="font-mono inline-flex h-5 items-center justify-center rounded-[0.2em] border border-b-2 px-1.5 text-[0.85em] font-medium border-border bg-muted shadow-[inset_0_-1px_0_1px_var(--border)]">K</kbd>
                          </div>
                        </div>
                        <div>
                          <Text className="mb-1 text-sm">Accent Keyboard:</Text>
                          <div className="inline-flex">
                            <kbd className="font-mono inline-flex h-5 items-center justify-center rounded-[0.2em] border border-b-2 px-1.5 text-[0.85em] font-medium border-primary/20 bg-primary/10 text-primary shadow-[inset_0_-1px_0_1px_var(--primary)/40]">⌘</kbd>
                            <span className="mx-1">+</span>
                            <kbd className="font-mono inline-flex h-5 items-center justify-center rounded-[0.2em] border border-b-2 px-1.5 text-[0.85em] font-medium border-primary/20 bg-primary/10 text-primary shadow-[inset_0_-1px_0_1px_var(--primary)/40]">S</kbd>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Colors Section */}
            <section id="foundations-colors" className="scroll-mt-16 space-y-6">
              <Heading variant="h3">Colors</Heading>
              <Text className="text-lg">
                Our color system provides a thoughtful palette that communicates our brand and enhances usability.
              </Text>
              
              <Card>
                <CardHeader>
                  <CardTitle>Primary Colors</CardTitle>
                  <CardDescription>Core brand colors that define our visual identity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-3">
                      <div className="h-24 bg-primary rounded-md shadow-sm flex items-end">
                        <div className="w-full p-2 bg-white/20 backdrop-blur-sm rounded-b-md">
                          <Text weight="medium" className="text-primary-foreground">Primary</Text>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Text size="sm" weight="medium">Primary</Text>
                        <Text size="xs" className="text-muted-foreground">Used for primary actions, key UI elements, and brand emphasis</Text>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="h-24 bg-secondary rounded-md shadow-sm flex items-end">
                        <div className="w-full p-2 bg-white/20 backdrop-blur-sm rounded-b-md">
                          <Text weight="medium" className="text-secondary-foreground">Secondary</Text>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Text size="sm" weight="medium">Secondary</Text>
                        <Text size="xs" className="text-muted-foreground">Used for secondary actions and supporting UI elements</Text>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="h-24 bg-accent rounded-md shadow-sm flex items-end">
                        <div className="w-full p-2 bg-white/20 backdrop-blur-sm rounded-b-md">
                          <Text weight="medium" className="text-accent-foreground">Accent</Text>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Text size="sm" weight="medium">Accent</Text>
                        <Text size="xs" className="text-muted-foreground">Used for accents, highlights, and active states</Text>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="h-24 bg-muted rounded-md shadow-sm flex items-end">
                        <div className="w-full p-2 bg-white/20 backdrop-blur-sm rounded-b-md">
                          <Text weight="medium" className="text-muted-foreground">Muted</Text>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Text size="sm" weight="medium">Muted</Text>
                        <Text size="xs" className="text-muted-foreground">Used for subtle backgrounds, disabled states, and supplementary content</Text>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Semantic Colors</CardTitle>
                  <CardDescription>Functional colors that communicate meaning and state</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-3">
                      <div className="h-24 bg-destructive rounded-md shadow-sm flex items-end">
                        <div className="w-full p-2 bg-white/20 backdrop-blur-sm rounded-b-md">
                          <Text weight="medium" className="text-destructive-foreground">Destructive</Text>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Text size="sm" weight="medium">Destructive</Text>
                        <Text size="xs" className="text-muted-foreground">Used for error states, critical alerts, and destructive actions</Text>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="h-24 bg-success rounded-md shadow-sm flex items-end">
                        <div className="w-full p-2 bg-white/20 backdrop-blur-sm rounded-b-md">
                          <Text weight="medium" className="text-success-foreground">Success</Text>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Text size="sm" weight="medium">Success</Text>
                        <Text size="xs" className="text-muted-foreground">Used for success states, confirmations, and positive feedback</Text>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="h-24 bg-warning rounded-md shadow-sm flex items-end">
                        <div className="w-full p-2 bg-white/20 backdrop-blur-sm rounded-b-md">
                          <Text weight="medium" className="text-warning-foreground">Warning</Text>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Text size="sm" weight="medium">Warning</Text>
                        <Text size="xs" className="text-muted-foreground">Used for warning states, alerts requiring attention, and cautionary messages</Text>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="h-24 bg-info rounded-md shadow-sm flex items-end">
                        <div className="w-full p-2 bg-white/20 backdrop-blur-sm rounded-b-md">
                          <Text weight="medium" className="text-info-foreground">Info</Text>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Text size="sm" weight="medium">Info</Text>
                        <Text size="xs" className="text-muted-foreground">Used for informational messages, tips, and neutral notifications</Text>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Interface Colors</CardTitle>
                  <CardDescription>Structural colors for UI elements and container states</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="h-16 bg-background rounded-md border flex items-center justify-center">
                          <Text weight="medium">Background</Text>
                        </div>
                        <div className="mt-2">
                          <Text size="sm" weight="medium">Background</Text>
                          <Text size="xs" className="text-muted-foreground">Primary application background</Text>
                        </div>
                      </div>
                      
                      <div>
                        <div className="h-16 bg-foreground rounded-md flex items-center justify-center">
                          <Text weight="medium" className="text-background">Foreground</Text>
                        </div>
                        <div className="mt-2">
                          <Text size="sm" weight="medium">Foreground</Text>
                          <Text size="xs" className="text-muted-foreground">Primary content color</Text>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="h-16 bg-card rounded-md border flex items-center justify-center">
                          <Text weight="medium" className="text-card-foreground">Card</Text>
                        </div>
                        <div className="mt-2">
                          <Text size="sm" weight="medium">Card</Text>
                          <Text size="xs" className="text-muted-foreground">Card background color</Text>
                        </div>
                      </div>
                      
                      <div>
                        <div className="h-16 bg-popover rounded-md border shadow-sm flex items-center justify-center">
                          <Text weight="medium" className="text-popover-foreground">Popover</Text>
                        </div>
                        <div className="mt-2">
                          <Text size="sm" weight="medium">Popover</Text>
                          <Text size="xs" className="text-muted-foreground">Popover and dropdown background</Text>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="h-16 bg-border rounded-md flex items-center justify-center">
                          <Text weight="medium" className="text-background">Border</Text>
                        </div>
                        <div className="mt-2">
                          <Text size="sm" weight="medium">Border</Text>
                          <Text size="xs" className="text-muted-foreground">Border and divider color</Text>
                        </div>
                      </div>
                      
                      <div>
                        <div className="h-16 bg-input rounded-md border flex items-center justify-center">
                          <Text weight="medium">Input</Text>
                        </div>
                        <div className="mt-2">
                          <Text size="sm" weight="medium">Input</Text>
                          <Text size="xs" className="text-muted-foreground">Form input background</Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Opacity Variants</CardTitle>
                  <CardDescription>Color opacity variations for creating depth and emphasis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Text weight="medium" className="mb-3">Primary with Opacity</Text>
                      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                        <div className="h-12 bg-primary/5 rounded"></div>
                        <div className="h-12 bg-primary/10 rounded"></div>
                        <div className="h-12 bg-primary/20 rounded"></div>
                        <div className="h-12 bg-primary/30 rounded"></div>
                        <div className="h-12 bg-primary/40 rounded"></div>
                        <div className="h-12 bg-primary/50 rounded"></div>
                        <div className="h-12 bg-primary/75 rounded"></div>
                        <div className="h-12 bg-primary rounded"></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <Text size="xs">5%</Text>
                        <Text size="xs">100%</Text>
                      </div>
                    </div>
                    
                    <div>
                      <Text weight="medium" className="mb-3">Muted with Opacity</Text>
                      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                        <div className="h-12 bg-muted/5 rounded border"></div>
                        <div className="h-12 bg-muted/10 rounded border"></div>
                        <div className="h-12 bg-muted/20 rounded border"></div>
                        <div className="h-12 bg-muted/30 rounded border"></div>
                        <div className="h-12 bg-muted/40 rounded border"></div>
                        <div className="h-12 bg-muted/50 rounded border"></div>
                        <div className="h-12 bg-muted/75 rounded border"></div>
                        <div className="h-12 bg-muted rounded border"></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <Text size="xs">5%</Text>
                        <Text size="xs">100%</Text>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Buttons Section */}
            <section id="components-buttons" className="scroll-mt-16 space-y-6">
              <Heading variant="h3">Buttons</Heading>
              <Text className="text-lg">
                Our button system provides consistent interactive elements that communicate actions.
              </Text>
              
              <Card>
                <CardHeader>
                  <CardTitle>Button Variants</CardTitle>
                  <CardDescription>Different styles to indicate importance and purpose</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <Button variant="default">Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                      <Button variant="destructive">Destructive</Button>
                    </div>
                    <div className="pt-2 border-t">
                      <Text size="sm" className="text-muted-foreground">
                        Choose appropriate variants based on action importance: <Text size="sm" weight="medium" variant="default" className="inline">Default</Text> for primary actions, <Text size="sm" weight="medium" variant="default" className="inline">Secondary</Text> for secondary actions, <Text size="sm" weight="medium" variant="default" className="inline">Outline</Text> for tertiary actions, <Text size="sm" weight="medium" variant="default" className="inline">Ghost</Text> for subtle actions in dense UIs, <Text size="sm" weight="medium" variant="default" className="inline">Link</Text> for navigation-style actions, and <Text size="sm" weight="medium" variant="default" className="inline">Destructive</Text> for dangerous operations.
                      </Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Button Sizes</CardTitle>
                  <CardDescription>Size variations for different contexts and prominence</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-end gap-4">
                      <div className="space-y-2">
                        <Text size="sm" weight="medium">Small</Text>
                        <Button size="sm">Small Button</Button>
                      </div>
                      <div className="space-y-2">
                        <Text size="sm" weight="medium">Default</Text>
                        <Button size="default">Default Button</Button>
                      </div>
                      <div className="space-y-2">
                        <Text size="sm" weight="medium">Large</Text>
                        <Button size="lg">Large Button</Button>
                      </div>
                      <div className="space-y-2">
                        <Text size="sm" weight="medium">Icon</Text>
                        <Button size="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <div className="pt-2 border-t">
                      <Text size="sm" className="text-muted-foreground">
                        Choose appropriate sizes based on context: <Text size="sm" weight="medium" variant="default" className="inline">Small</Text> for compact UIs, <Text size="sm" weight="medium" variant="default" className="inline">Default</Text> for most standard cases, <Text size="sm" weight="medium" variant="default" className="inline">Large</Text> for prominent actions, and <Text size="sm" weight="medium" variant="default" className="inline">Icon</Text> for square buttons with only an icon.
                      </Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Button States</CardTitle>
                  <CardDescription>Interactive states to provide user feedback</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-3">
                      <Text size="sm" weight="medium">Normal</Text>
                      <div className="flex flex-col gap-3">
                        <Button variant="default">Default Button</Button>
                        <Button variant="outline">Outline Button</Button>
                        <Button variant="ghost">Ghost Button</Button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Text size="sm" weight="medium">Disabled</Text>
                      <div className="flex flex-col gap-3">
                        <Button variant="default" disabled>Default Button</Button>
                        <Button variant="outline" disabled>Outline Button</Button>
                        <Button variant="ghost" disabled>Ghost Button</Button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Text size="sm" weight="medium">Loading</Text>
                      <div className="flex flex-col gap-3">
                        <Button variant="default" disabled className="relative">
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading...
                        </Button>
                        <Button variant="outline" disabled className="relative">
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading...
                        </Button>
                        <Button variant="ghost" disabled className="relative">
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading...
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Button with Icons</CardTitle>
                  <CardDescription>Combining icons with text for enhanced clarity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="flex flex-wrap gap-4">
                    <Button>
                      <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Create New
                    </Button>
                    
                    <Button variant="outline">
                      <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                      Upload
                    </Button>
                    
                    <Button variant="secondary">
                      Settings
                      <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </Button>
                    
                    <Button variant="destructive">
                      <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Button Groups</CardTitle>
                  <CardDescription>Related buttons grouped together for cohesive actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Text size="sm" weight="medium" className="mb-3">Outline Group</Text>
                      <div className="inline-flex rounded-md shadow-sm">
                        <Button variant="outline" className="rounded-r-none">Day</Button>
                        <Button variant="outline" className="rounded-none border-x-0">Week</Button>
                        <Button variant="outline" className="rounded-l-none">Month</Button>
                      </div>
                    </div>
                    
                    <div>
                      <Text size="sm" weight="medium" className="mb-3">Icon Group</Text>
                      <div className="inline-flex rounded-md shadow-sm">
                        <Button variant="outline" size="icon" className="rounded-r-none">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M2 3.75A.75.75 0 012.75 3h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 3.75zm0 4.167a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zm0 4.166a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zm0 4.167a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                          </svg>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-none border-x-0">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" clipRule="evenodd" />
                          </svg>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-l-none">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path d="M3.75 3A1.75 1.75 0 002 4.75v3.26a3.235 3.235 0 011.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0016.25 5h-4.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H3.75zM2 10.75v4.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0018 15.25v-4.5A1.75 1.75 0 0016.25 9H3.75A1.75 1.75 0 002 10.75z" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Forms Section */}
            <section id="components-forms" className="scroll-mt-16 space-y-6">
              <Heading variant="h3">Forms</Heading>
              <Text className="text-lg">
                Our form components provide consistent user input elements with appropriate styling and feedback.
              </Text>
              
              <Card>
                <CardHeader>
                  <CardTitle>Input Fields</CardTitle>
                  <CardDescription>Basic text input components for collecting user data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="default-input" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Default Input
                      </label>
                      <input
                        id="default-input"
                        type="text"
                        placeholder="Enter text here"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <Text size="sm" className="text-muted-foreground">Standard input field for text entry</Text>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="disabled-input" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Disabled Input
                      </label>
                      <input
                        id="disabled-input"
                        type="text"
                        placeholder="Disabled input"
                        disabled
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <Text size="sm" className="text-muted-foreground">Input field in disabled state</Text>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="with-icon" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Input with Icon
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-muted-foreground">
                            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input
                          id="with-icon"
                          type="text"
                          placeholder="Search..."
                          className="flex h-10 w-full rounded-md border border-input bg-background pl-10 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                      <Text size="sm" className="text-muted-foreground">Input with leading icon for contextual clarity</Text>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="validation-error" className="text-sm font-medium leading-none text-destructive">
                        Error State
                      </label>
                      <input
                        id="validation-error"
                        type="text"
                        placeholder="Invalid input"
                        className="flex h-10 w-full rounded-md border border-destructive bg-destructive/5 px-3 py-2 text-sm text-destructive ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-destructive/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <Text size="sm" className="text-destructive">Please enter a valid value</Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Selection Controls</CardTitle>
                  <CardDescription>Components for selecting from predefined options</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <Text size="sm" weight="medium">Checkbox Controls</Text>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              id="terms"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Accept terms and conditions
                            </label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <input
                              id="newsletters"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="newsletters" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Subscribe to newsletter
                            </label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <input
                              id="disabled-checkbox"
                              type="checkbox"
                              disabled
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50"
                            />
                            <label htmlFor="disabled-checkbox" className="text-sm font-medium leading-none text-muted-foreground">
                              Disabled option
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <Text size="sm" weight="medium">Radio Controls</Text>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              id="option-1"
                              name="radio-group"
                              type="radio"
                              defaultChecked
                              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="option-1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Option 1
                            </label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <input
                              id="option-2"
                              name="radio-group"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="option-2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Option 2
                            </label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <input
                              id="disabled-radio"
                              name="radio-group"
                              type="radio"
                              disabled
                              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary disabled:opacity-50"
                            />
                            <label htmlFor="disabled-radio" className="text-sm font-medium leading-none text-muted-foreground">
                              Disabled option
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <Text size="sm" weight="medium">Toggle Switch</Text>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            role="switch"
                            aria-checked="true"
                            data-state="checked"
                            aria-label="Toggle enabled setting"
                            className="peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-input"
                          >
                            <span data-state="checked" className="pointer-events-none block h-5 w-5 translate-x-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0" />
                          </button>
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Enabled setting
                          </label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            role="switch"
                            aria-checked="false"
                            data-state="unchecked"
                            aria-label="Toggle disabled setting"
                            className="peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 bg-input"
                          >
                            <span data-state="unchecked" className="pointer-events-none block h-5 w-5 translate-x-0 rounded-full bg-background shadow-lg ring-0 transition-transform" />
                          </button>
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Disabled setting
                          </label>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <Text size="sm" weight="medium">Select Dropdown</Text>
                        <div className="space-y-2">
                          <label htmlFor="country" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Country
                          </label>
                          <select
                            id="country"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="" disabled>Select a country</option>
                            <option value="us">United States</option>
                            <option value="ca">Canada</option>
                            <option value="uk">United Kingdom</option>
                            <option value="au">Australia</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Form Layout</CardTitle>
                  <CardDescription>Example of a complete form with various controls</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="first-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          First name
                        </label>
                        <input
                          id="first-name"
                          type="text"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="last-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Last name
                        </label>
                        <input
                          id="last-name"
                          type="text"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="bio" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        rows={4}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      ></textarea>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        id="marketing"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="marketing" className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Receive marketing emails
                      </label>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Submit</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </section>

            {/* Cards Section */}
            <section id="components-cards" className="scroll-mt-16 space-y-6">
              <Heading variant="h3">Cards</Heading>
              <Text className="text-lg">
                Our card components provide versatile containers for organizing and presenting content.
              </Text>
              
              <Card>
                <CardHeader>
                  <CardTitle>Card Variations</CardTitle>
                  <CardDescription>Different card styles for various use cases</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Text size="sm" weight="medium" className="mb-3">Basic Card</Text>
                      <Card>
                        <CardHeader>
                          <CardTitle>Basic Card</CardTitle>
                          <CardDescription>Simple card with title and description</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Text>This is a standard card component used for displaying content in a contained format.</Text>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <Text size="sm" weight="medium" className="mb-3">Card with Footer</Text>
                      <Card>
                        <CardHeader>
                          <CardTitle>Card with Footer</CardTitle>
                          <CardDescription>Card with actions in the footer</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Text>This card includes a footer with action buttons for user interaction.</Text>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">Cancel</Button>
                          <Button size="sm">Save</Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Card Patterns</CardTitle>
                  <CardDescription>Common card compositions for specific contexts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <div className="aspect-video w-full bg-muted/30 rounded-t-md flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-muted-foreground/50">
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                          <circle cx="9" cy="9" r="2" />
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                      </div>
                      <CardHeader>
                        <CardTitle>Media Card</CardTitle>
                        <CardDescription>Card with image or media content</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Text>Cards can include visual media at the top to enhance context.</Text>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                            </svg>
                          </div>
                          <div>
                            <CardTitle>Feature Card</CardTitle>
                            <CardDescription>Highlighting a specific feature</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Text>Feature cards include an icon and emphasize a particular capability or benefit.</Text>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Stat Card</CardTitle>
                        <CardDescription>Displaying important metrics</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="text-4xl font-bold">8,642</div>
                        <div className="flex items-center text-sm text-success">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1">
                            <path d="m18 15-6-6-6 6" />
                          </svg>
                          <span>12.5% increase</span>
                        </div>
                        <Text size="sm" variant="muted">Compared to previous period</Text>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Interactive Cards</CardTitle>
                  <CardDescription>Cards with interactive elements and states</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Text size="sm" weight="medium" className="mb-3">Selectable Card</Text>
                      <div className="rounded-md border-2 border-primary bg-primary/5 p-1 hover:cursor-pointer">
                        <Card>
                          <CardHeader className="py-4">
                            <div className="flex items-center justify-between">
                              <CardTitle>Selected Plan</CardTitle>
                              <div className="h-5 w-5 rounded-full border-2 border-primary bg-primary flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white">
                                  <path d="m5 12 5 5L20 7" />
                                </svg>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-4">
                            <div className="flex items-baseline gap-1">
                              <span className="text-3xl font-bold">$19</span>
                              <span className="text-muted-foreground">/month</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    <div>
                      <Text size="sm" weight="medium" className="mb-3">Expandable Card</Text>
                      <Card>
                        <CardHeader className="py-4">
                          <div className="flex items-center justify-between">
                            <CardTitle>Frequently Asked Questions</CardTitle>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-label="Expand card">
                                <path d="m18 15-6-6-6 6" />
                              </svg>
                            </Button>
                          </div>
                          <CardDescription>Click to expand for more information</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <div className="rounded-md bg-muted/50 p-3">
                            <Text>Hidden content that can be toggled to show or hide.</Text>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Navigation Section - special focus on your UI components */}
            <section id="navigation" className="scroll-mt-16">
              <h3 className="text-2xl font-semibold mb-6 pb-2 border-b">Navigation</h3>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-medium mb-4">SideNav Component</h4>
                  <p className="mb-4">The SideNav component provides consistent navigation throughout the application. It supports grouped navigation items and highlights the active section.</p>
                  <div className="bg-card p-6 rounded-lg border max-w-md">
                    <div className="border-border bg-background border rounded-md w-full p-4">
                      <div className="flex flex-shrink-0 items-center px-4 py-2 border-b border-muted mb-4">
                        <h1 className="text-foreground text-xl font-bold">Workhorse</h1>
                      </div>
                      <div className="space-y-4 px-4">
                        <div className="space-y-2">
                          <h3 className="text-muted-foreground flex items-center text-xs font-semibold tracking-widest uppercase">
                            Design System
                          </h3>
                          <div className="space-y-1">
                            <div className="group flex items-center rounded-md px-2 py-2 text-sm font-medium bg-primary text-primary-foreground">
                              Typography
                            </div>
                            <div className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary">
                              Colors
                            </div>
                            <div className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary">
                              Buttons
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-4">TopBar Component</h4>
                  <p className="mb-4">The TopBar component provides a consistent header with customizable title and right content area.</p>
                  <div className="bg-card p-6 rounded-lg border">
                    <div className="border-b border-border bg-card rounded-t-md">
                      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
                        <h1 className="text-xl font-semibold text-foreground">Page Title</h1>
                        <div className="flex items-center space-x-4">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                            <span className="font-medium text-sm text-foreground">AB</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-b-md">
                      <p className="text-center text-muted-foreground text-sm">Page Content</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-4">MainNavbar Component</h4>
                  <p className="mb-4">The MainNavbar component is used for public-facing pages with branding and navigation links.</p>
                  <div className="bg-card p-6 rounded-lg border">
                    <div className="w-full border-b bg-background rounded-md p-2">
                      <div className="container flex h-12 items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">Workhorse Design</span>
                        </div>
                        <nav className="mx-auto flex items-center space-x-4">
                          <div className="text-sm font-medium transition-colors hover:text-primary">Design</div>
                          <div className="text-sm font-medium transition-colors hover:text-primary">About</div>
                        </nav>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">Contact</Button>
                          <Button size="sm">Login</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        
            {/* Feedback Section */}
            <section id="feedback" className="scroll-mt-16">
              <h3 className="text-2xl font-semibold mb-6 pb-2 border-b">Feedback</h3>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-medium mb-4">Alert Examples</h4>
                  <div className="space-y-4">
                    <div className="p-4 rounded-md bg-primary/10 border border-primary text-primary">
                      <div className="font-medium">Information</div>
                      <div className="text-sm">This is an informational alert message.</div>
                    </div>
                    <div className="p-4 rounded-md bg-success/10 border border-success text-success">
                      <div className="font-medium">Success</div>
                      <div className="text-sm">Your changes have been saved successfully.</div>
                    </div>
                    <div className="p-4 rounded-md bg-warning/10 border border-warning text-warning">
                      <div className="font-medium">Warning</div>
                      <div className="text-sm">Please review your information before continuing.</div>
                    </div>
                    <div className="p-4 rounded-md bg-destructive/10 border border-destructive text-destructive">
                      <div className="font-medium">Error</div>
                      <div className="text-sm">There was a problem processing your request.</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Layout Section */}
            <section id="layout" className="scroll-mt-16">
              <h3 className="text-2xl font-semibold mb-6 pb-2 border-b">Layout</h3>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-medium mb-4">Grid Layout</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted h-20 rounded-md flex items-center justify-center">1</div>
                    <div className="bg-muted h-20 rounded-md flex items-center justify-center">2</div>
                    <div className="bg-muted h-20 rounded-md flex items-center justify-center">3</div>
                    <div className="bg-muted h-20 rounded-md flex items-center justify-center">4</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-4">Container Widths</h4>
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-md">
                      <p className="text-center">Default Container</p>
                    </div>
                    <div className="bg-muted p-4 rounded-md max-w-md mx-auto">
                      <p className="text-center">Max Width Medium (28rem)</p>
                    </div>
                    <div className="bg-muted p-4 rounded-md max-w-sm mx-auto">
                      <p className="text-center">Max Width Small (24rem)</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
} 