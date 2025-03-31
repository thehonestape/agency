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

            {/* Navigation Section */}
            <section id="components-navigation" className="scroll-mt-16 space-y-6">
              <Heading variant="h3">Navigation</Heading>
              <Text className="text-lg">
                Our navigation components provide consistent ways to move through the application.
              </Text>
              
              <Card>
                <CardHeader>
                  <CardTitle>TopBar Component</CardTitle>
                  <CardDescription>Horizontal navigation for page headers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Text>The TopBar component serves as the primary horizontal navigation, providing a consistent header with customizable title and right content area.</Text>
                  
                  <div className="border rounded-md overflow-hidden">
                    <div className="border-b bg-card">
                      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
                        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
                        <div className="flex items-center space-x-4">
                          <button 
                            className="p-1 rounded-full text-muted-foreground hover:text-foreground"
                            aria-label="View notifications"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                            </svg>
                          </button>
                          <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                            <span className="font-medium text-sm">WH</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-muted/20 h-20 flex items-center justify-center text-muted-foreground">
                      Page Content
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/20 rounded-md space-y-2">
                    <Text size="sm" weight="medium">Usage Guidelines:</Text>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Use the TopBar component on every page that requires global navigation</li>
                      <li>Maintain the same height and spacing across all instances for consistency</li>
                      <li>Only include essential actions in the right content area</li>
                      <li>For mobile, consider which elements can be collapsed into a menu</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>SideNav Component</CardTitle>
                  <CardDescription>Vertical navigation for application structure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Text>The SideNav component provides vertical navigation throughout the application. It supports grouped navigation items and highlights the active section.</Text>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="border rounded-md overflow-hidden lg:col-span-1 min-h-[300px]">
                      <div className="flex flex-shrink-0 items-center px-4 py-2 h-14 border-b">
                        <h1 className="text-foreground text-xl font-bold">Workhorse</h1>
                      </div>
                      <div className="p-4 space-y-6">
                        <div className="space-y-1">
                          <h3 className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
                            Overview
                          </h3>
                          <div className="space-y-1">
                            <div className="group flex items-center rounded-md px-2 py-2 text-sm font-medium bg-primary text-primary-foreground">
                              Dashboard
                            </div>
                            <div className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary">
                              Analytics
                            </div>
                            <div className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary">
                              Reports
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <h3 className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
                            Workspace
                          </h3>
                          <div className="space-y-1">
                            <div className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary">
                              Projects
                            </div>
                            <div className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary">
                              Tasks
                            </div>
                            <div className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary">
                              Calendar
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md overflow-hidden lg:col-span-3 min-h-[300px] flex items-center justify-center text-muted-foreground">
                      Main Content Area
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/20 rounded-md space-y-2">
                    <Text size="sm" weight="medium">Usage Guidelines:</Text>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Group related navigation items together under meaningful categories</li>
                      <li>Highlight the active section to provide clear context to the user</li>
                      <li>Consider collapsible sections for complex navigation structures</li>
                      <li>Use consistent icons to improve visual recognition</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>MainNavbar Component</CardTitle>
                  <CardDescription>Primary navigation for public-facing pages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Text>The MainNavbar component is designed for public-facing pages with branding and primary navigation links.</Text>
                  
                  <div className="border rounded-md overflow-hidden">
                    <div className="w-full border-b bg-background">
                      <div className="container flex h-14 items-center justify-between px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">Workhorse Design</span>
                        </div>
                        <nav className="mx-auto flex items-center space-x-6">
                          <div className="text-sm font-medium transition-colors text-primary border-b-2 border-primary py-1">Home</div>
                          <div className="text-sm font-medium transition-colors hover:text-primary py-1">Design</div>
                          <div className="text-sm font-medium transition-colors hover:text-primary py-1">About</div>
                          <div className="text-sm font-medium transition-colors hover:text-primary py-1">Contact</div>
                        </nav>
                        <div className="flex items-center space-x-3">
                          <Button variant="outline" size="sm">Sign In</Button>
                          <Button size="sm">Get Started</Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-muted/20 h-20 flex items-center justify-center text-muted-foreground">
                      Page Content
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/20 rounded-md space-y-2">
                    <Text size="sm" weight="medium">Usage Guidelines:</Text>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Use for marketing sites, landing pages, and public-facing content</li>
                      <li>Keep navigation simple and focused on key user journeys</li>
                      <li>Ensure responsive behavior that works well on all device sizes</li>
                      <li>Consider using a simpler mobile version with a hamburger menu</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Breadcrumbs Component</CardTitle>
                  <CardDescription>Hierarchical navigation path display</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Text>Breadcrumbs provide contextual navigation by displaying the user's location within the application hierarchy.</Text>
                  
                  <div className="flex items-center">
                    <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">Home</a>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mx-2 text-muted-foreground"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">Projects</a>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mx-2 text-muted-foreground"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    <span className="text-sm font-medium text-foreground">Project Details</span>
                  </div>
                  
                  <div className="p-4 bg-muted/20 rounded-md space-y-2">
                    <Text size="sm" weight="medium">Usage Guidelines:</Text>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Use breadcrumbs in hierarchical applications with multiple levels</li>
                      <li>Ensure all links except the current page are clickable</li>
                      <li>Keep breadcrumb labels concise and descriptive</li>
                      <li>Position at the top of the page, below the main navigation</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>
        
            {/* Feedback Section */}
            <section id="components-feedback" className="scroll-mt-16 space-y-6">
              <Heading variant="h3">Feedback</Heading>
              <Text className="text-lg">
                Our feedback components provide users with clear information about the state of the system.
              </Text>
              
              <Card>
                <CardHeader>
                  <CardTitle>Alerts</CardTitle>
                  <CardDescription>Informational messages for user awareness</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 rounded-md bg-primary/10 border border-primary text-primary">
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mt-0.5 mr-3">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4" />
                          <path d="M12 8h.01" />
                        </svg>
                        <div>
                          <div className="font-medium">Information</div>
                          <div className="text-sm">This is an informational alert message for general communication.</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-md bg-success/10 border border-success text-success">
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mt-0.5 mr-3">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <div>
                          <div className="font-medium">Success</div>
                          <div className="text-sm">Your changes have been saved successfully.</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-md bg-warning/10 border border-warning text-warning">
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mt-0.5 mr-3">
                          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                          <path d="M12 9v4" />
                          <path d="M12 17h.01" />
                        </svg>
                        <div>
                          <div className="font-medium">Warning</div>
                          <div className="text-sm">Please review your information before continuing.</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-md bg-destructive/10 border border-destructive text-destructive">
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mt-0.5 mr-3">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="15" x2="9" y1="9" y2="15" />
                          <line x1="9" x2="15" y1="9" y2="15" />
                        </svg>
                        <div>
                          <div className="font-medium">Error</div>
                          <div className="text-sm">There was a problem processing your request.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/20 rounded-md space-y-2">
                    <Text size="sm" weight="medium">Usage Guidelines:</Text>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Use appropriate colors to communicate the severity and type of message</li>
                      <li>Include clear action steps when applicable</li>
                      <li>Keep messages concise and actionable</li>
                      <li>Position alerts where they are easily noticed but not disruptive</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Toast Notifications</CardTitle>
                  <CardDescription>Temporary notifications for ephemeral feedback</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="relative rounded-lg border bg-background p-4 shadow-lg">
                      <div className="flex items-start gap-4">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                        </div>
                        <div className="grid gap-1">
                          <div className="font-semibold">Success Toast</div>
                          <div className="text-sm text-muted-foreground">Your document has been uploaded.</div>
                        </div>
                        <button className="absolute top-2 right-2 rounded-full p-1 text-foreground/50 opacity-70 hover:opacity-100" aria-label="Close toast">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="pointer-events-auto relative flex w-full max-w-md rounded-lg border bg-background p-6 shadow-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="text-sm font-medium">New message</div>
                          <div className="text-xs rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">Just now</div>
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">You received a new message from Sarah.</div>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" variant="default">View</Button>
                          <Button size="sm" variant="outline">Dismiss</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/20 rounded-md space-y-2">
                    <Text size="sm" weight="medium">Usage Guidelines:</Text>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Use toast notifications for non-critical updates</li>
                      <li>Include a way to dismiss the notification</li>
                      <li>Keep the message brief and clear</li>
                      <li>Position consistently, typically top-right or bottom-right</li>
                      <li>Use appropriate auto-dismiss timing based on content length</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Progress Indicators</CardTitle>
                  <CardDescription>Visual representations of system processing state</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <Text size="sm" weight="medium" className="mb-3">Linear Progress</Text>
                      <div className="space-y-2">
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-3/4 rounded-full"></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>75% complete</span>
                          <span>3 of 4 steps</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Text size="sm" weight="medium" className="mb-3">Spinner</Text>
                      <div className="flex items-center gap-4">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/10 border-t-primary"></div>
                        <div className="h-5 w-5 animate-spin rounded-full border-4 border-primary/10 border-t-primary"></div>
                        <Text size="sm">Loading content...</Text>
                      </div>
                    </div>
                    
                    <div>
                      <Text size="sm" weight="medium" className="mb-3">Skeleton Loading</Text>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-muted animate-pulse"></div>
                          <div className="space-y-2">
                            <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                            <div className="h-3 w-24 bg-muted rounded animate-pulse"></div>
                          </div>
                        </div>
                        <div className="h-3 w-full bg-muted rounded animate-pulse"></div>
                        <div className="h-3 w-11/12 bg-muted rounded animate-pulse"></div>
                        <div className="h-3 w-3/4 bg-muted rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/20 rounded-md space-y-2">
                    <Text size="sm" weight="medium">Usage Guidelines:</Text>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Use progress indicators for operations that take more than a moment</li>
                      <li>Choose appropriate indicator types based on context</li>
                      <li>For known durations, use linear progress bars with percentage</li>
                      <li>For unknown durations, use spinners or indeterminate indicators</li>
                      <li>Use skeleton loading for content that is being fetched</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Applications Layout Section */}
            <section id="applications-layout" className="scroll-mt-16 space-y-6">
              <Heading variant="h3">Layout</Heading>
              <Text className="text-lg">
                Our layout system provides consistent structure and spacing across the application.
              </Text>
              
              <Card>
                <CardHeader>
                  <CardTitle>Grid System</CardTitle>
                  <CardDescription>Flexible grid layouts for responsive content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <Text size="sm" weight="medium" className="mb-3">Basic Grid</Text>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-muted h-20 rounded-md flex items-center justify-center">1</div>
                        <div className="bg-muted h-20 rounded-md flex items-center justify-center">2</div>
                        <div className="bg-muted h-20 rounded-md flex items-center justify-center">3</div>
                        <div className="bg-muted h-20 rounded-md flex items-center justify-center">4</div>
                      </div>
                    </div>
                    
                    <div>
                      <Text size="sm" weight="medium" className="mb-3">Complex Grid</Text>
                      <div className="grid grid-cols-6 gap-4">
                        <div className="col-span-6 md:col-span-4 bg-muted h-24 rounded-md flex items-center justify-center">Main Content</div>
                        <div className="col-span-6 md:col-span-2 bg-muted h-24 rounded-md flex items-center justify-center">Sidebar</div>
                        <div className="col-span-2 bg-muted h-16 rounded-md flex items-center justify-center">A</div>
                        <div className="col-span-2 bg-muted h-16 rounded-md flex items-center justify-center">B</div>
                        <div className="col-span-2 bg-muted h-16 rounded-md flex items-center justify-center">C</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/20 rounded-md space-y-2">
                    <Text size="sm" weight="medium">Usage Guidelines:</Text>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Use the 12-column grid for complex layouts</li>
                      <li>Design responsive layouts that adapt to different screen sizes</li>
                      <li>Maintain consistent gaps between grid items</li>
                      <li>Consider content priority when creating mobile layouts</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Container Sizes</CardTitle>
                  <CardDescription>Standard container widths for consistent layout</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Text size="sm" weight="medium">Default Container</Text>
                      <div className="mx-auto bg-muted p-4 rounded-md max-w-7xl text-center">
                        <Text size="sm">max-w-7xl (1280px)</Text>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Text size="sm" weight="medium">Medium Container</Text>
                      <div className="mx-auto bg-muted p-4 rounded-md max-w-3xl text-center">
                        <Text size="sm">max-w-3xl (768px)</Text>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Text size="sm" weight="medium">Small Container</Text>
                      <div className="mx-auto bg-muted p-4 rounded-md max-w-xl text-center">
                        <Text size="sm">max-w-xl (512px)</Text>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/20 rounded-md space-y-2">
                    <Text size="sm" weight="medium">Usage Guidelines:</Text>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Use appropriate container sizes based on content requirements</li>
                      <li>Default container for main layouts and landing pages</li>
                      <li>Medium container for content-focused pages</li>
                      <li>Small container for forms and focused interactions</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Spacing System</CardTitle>
                  <CardDescription>Consistent spacing scales for layout and components</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Text size="sm" weight="medium">Spacing Scale</Text>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded">
                            <div className="w-0.5 h-0.5 bg-primary rounded-full"></div>
                          </div>
                          <div>
                            <Text size="sm" weight="medium">0.5 - Extra small</Text>
                            <Text size="xs" className="text-muted-foreground">2px - Minimal separation</Text>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded">
                            <div className="w-1 h-1 bg-primary rounded-full"></div>
                          </div>
                          <div>
                            <Text size="sm" weight="medium">1 - Small</Text>
                            <Text size="xs" className="text-muted-foreground">4px - Tight spacing</Text>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <div>
                            <Text size="sm" weight="medium">2 - Medium</Text>
                            <Text size="xs" className="text-muted-foreground">8px - Standard spacing</Text>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded">
                            <div className="w-4 h-4 bg-primary rounded-full"></div>
                          </div>
                          <div>
                            <Text size="sm" weight="medium">4 - Large</Text>
                            <Text size="xs" className="text-muted-foreground">16px - Content separation</Text>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <Text size="sm" weight="medium">Practical Application</Text>
                      <div className="p-4 border rounded-md">
                        <div className="space-y-4">
                          <div className="p-2 border-b">
                            <Text weight="medium">Header Area</Text>
                          </div>
                          <div className="p-4 bg-muted/20 rounded-md mb-4">
                            <Text size="sm">Content with standard padding (16px)</Text>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-2 bg-muted/20 rounded-md">
                              <Text size="xs">Small gap (8px)</Text>
                            </div>
                            <div className="p-2 bg-muted/20 rounded-md">
                              <Text size="xs">Between items</Text>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Applications Web Section */}
            <section id="applications-web" className="scroll-mt-16 space-y-6">
              <Heading variant="h3">Web</Heading>
              <Text className="text-lg">
                Guidelines and best practices for web-based applications and interfaces.
              </Text>
              
              <Card>
                <CardHeader>
                  <CardTitle>Responsive Design</CardTitle>
                  <CardDescription>Adapting interfaces for various screen sizes and devices</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <Text size="sm" weight="medium" className="mb-3">Breakpoint System</Text>
                      <div className="space-y-4">
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-center">
                            <Text size="sm" weight="medium">Small (sm)</Text>
                            <Text size="sm" className="text-muted-foreground">640px</Text>
                          </div>
                          <Text size="xs" className="text-muted-foreground">Mobile devices</Text>
                        </div>
                        
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-center">
                            <Text size="sm" weight="medium">Medium (md)</Text>
                            <Text size="sm" className="text-muted-foreground">768px</Text>
                          </div>
                          <Text size="xs" className="text-muted-foreground">Small tablets and large mobile</Text>
                        </div>
                        
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-center">
                            <Text size="sm" weight="medium">Large (lg)</Text>
                            <Text size="sm" className="text-muted-foreground">1024px</Text>
                          </div>
                          <Text size="xs" className="text-muted-foreground">Tablets and small laptops</Text>
                        </div>
                        
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-center">
                            <Text size="sm" weight="medium">Extra Large (xl)</Text>
                            <Text size="sm" className="text-muted-foreground">1280px</Text>
                          </div>
                          <Text size="xs" className="text-muted-foreground">Laptops and desktops</Text>
                        </div>
                        
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-center">
                            <Text size="sm" weight="medium">2XL (2xl)</Text>
                            <Text size="sm" className="text-muted-foreground">1536px</Text>
                          </div>
                          <Text size="xs" className="text-muted-foreground">Large desktops and monitors</Text>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/20 rounded-md space-y-2">
                    <Text size="sm" weight="medium">Usage Guidelines:</Text>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Design for mobile-first, then enhance for larger screens</li>
                      <li>Test interfaces across multiple devices and screen sizes</li>
                      <li>Use fluid layouts that adapt to different viewport widths</li>
                      <li>Consider different interaction patterns for touch vs mouse input</li>
                      <li>Prioritize content visibility according to screen size constraints</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Performance</CardTitle>
                  <CardDescription>Optimizing web experiences for speed and efficiency</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div className="p-4 border rounded-md">
                      <Text size="sm" weight="medium" className="mb-2">Core Web Vitals</Text>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                        <div className="p-3 bg-muted/20 rounded-md space-y-1">
                          <Text size="sm" weight="medium">LCP</Text>
                          <Text size="xs">Largest Contentful Paint</Text>
                          <div className="mt-2 h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-success w-3/4 rounded-full"></div>
                          </div>
                          <Text size="xs" className="text-success mt-1">Good: &lt; 2.5s</Text>
                        </div>
                        
                        <div className="p-3 bg-muted/20 rounded-md space-y-1">
                          <Text size="sm" weight="medium">FID</Text>
                          <Text size="xs">First Input Delay</Text>
                          <div className="mt-2 h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-success w-5/6 rounded-full"></div>
                          </div>
                          <Text size="xs" className="text-success mt-1">Good: &lt; 100ms</Text>
                        </div>
                        
                        <div className="p-3 bg-muted/20 rounded-md space-y-1">
                          <Text size="sm" weight="medium">CLS</Text>
                          <Text size="xs">Cumulative Layout Shift</Text>
                          <div className="mt-2 h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-warning w-1/2 rounded-full"></div>
                          </div>
                          <Text size="xs" className="text-warning mt-1">Needs Improvement: 0.1-0.25</Text>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/20 rounded-md space-y-2">
                    <Text size="sm" weight="medium">Performance Guidelines:</Text>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Optimize images and media with proper formats and compression</li>
                      <li>Minimize and bundle JavaScript and CSS resources</li>
                      <li>Implement lazy loading for below-the-fold content</li>
                      <li>Use server-side rendering or static generation when appropriate</li>
                      <li>Monitor and optimize Core Web Vitals scores</li>
                      <li>Implement proper caching strategies</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Applications Social Section */}
            <section id="applications-social" className="scroll-mt-16 space-y-6">
              <Heading variant="h3">Social</Heading>
              <Text className="text-lg">
                Guidelines and best practices for social media integration and user engagement.
              </Text>
              
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Icons</CardTitle>
                  <CardDescription>Adding social media icons to your website</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <Text size="sm" weight="medium" className="mb-3">Icon Sizes</Text>
                      <div className="space-y-4">
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-center">
                            <Text size="sm" weight="medium">Small</Text>
                            <Text size="sm" className="text-muted-foreground">24px</Text>
                          </div>
                          <Text size="xs" className="text-muted-foreground">Used for small icons in footer or sidebar</Text>
                        </div>
                        
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-center">
                            <Text size="sm" weight="medium">Medium</Text>
                            <Text size="sm" className="text-muted-foreground">32px</Text>
                          </div>
                          <Text size="xs" className="text-muted-foreground">Used for icons in navigation or header</Text>
                        </div>
                        
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-center">
                            <Text size="sm" weight="medium">Large</Text>
                            <Text size="sm" className="text-muted-foreground">48px</Text>
                          </div>
                          <Text size="xs" className="text-muted-foreground">Used for large icons in hero sections</Text>
                        </div>
                        
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-center">
                            <Text size="sm" weight="medium">Extra Large</Text>
                            <Text size="sm" className="text-muted-foreground">64px</Text>
                          </div>
                          <Text size="xs" className="text-muted-foreground">Used for social media icons in header or footer</Text>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/20 rounded-md space-y-2">
                    <Text size="sm" weight="medium">Usage Guidelines:</Text>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Use social media icons to link to your profiles</li>
                      <li>Ensure icons are consistent in size and style</li>
                      <li>Consider adding hover effects or animations</li>
                      <li>Use icons that are relevant to your brand</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Buttons</CardTitle>
                  <CardDescription>Adding social media buttons for user engagement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <Text size="sm" weight="medium" className="mb-3">Button Sizes</Text>
                      <div className="space-y-4">
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-center">
                            <Text size="sm" weight="medium">Small</Text>
                            <Text size="sm" className="text-muted-foreground">100px x 30px</Text>
                          </div>
                          <Text size="xs" className="text-muted-foreground">Used for small buttons in footer or sidebar</Text>
                        </div>
                        
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-center">
                            <Text size="sm" weight="medium">Medium</Text>
                            <Text size="sm" className="text-muted-foreground">150px x 40px</Text>
                          </div>
                          <Text size="xs" className="text-muted-foreground">Used for medium buttons in navigation or header</Text>
                        </div>
                        
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-center">
                            <Text size="sm" weight="medium">Large</Text>
                            <Text size="sm" className="text-muted-foreground">200px x 50px</Text>
                          </div>
                          <Text size="xs" className="text-muted-foreground">Used for large buttons in hero sections</Text>
                        </div>
                        
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-center">
                            <Text size="sm" weight="medium">Extra Large</Text>
                            <Text size="sm" className="text-muted-foreground">250px x 60px</Text>
                          </div>
                          <Text size="xs" className="text-muted-foreground">Used for social media buttons in header or footer</Text>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/20 rounded-md space-y-2">
                    <Text size="sm" weight="medium">Usage Guidelines:</Text>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Use social media buttons to encourage user interaction</li>
                      <li>Ensure buttons are consistent in size and style</li>
                      <li>Consider adding hover effects or animations</li>
                      <li>Use buttons that are relevant to your brand</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Applications Print Section */}
            <section id="applications-print" className="scroll-mt-16 space-y-6">
              <Heading variant="h3">Print</Heading>
              <Text className="text-lg">
                Guidelines and best practices for print materials and brand collateral.
              </Text>
              
              <Card>
                <CardHeader>
                  <CardTitle>Business Cards</CardTitle>
                  <CardDescription>Standards for business card design and production</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <Text size="sm" weight="medium" className="mb-3">Specifications</Text>
                      <div className="space-y-4">
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-center">
                            <Text size="sm" weight="medium">Size</Text>
                            <Text size="sm" className="text-muted-foreground">3.5" × 2" (US Standard)</Text>
                          </div>
                          <Text size="xs" className="text-muted-foreground">89mm × 51mm</Text>
                        </div>
                        
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-center">
                            <Text size="sm" weight="medium">Bleed</Text>
                            <Text size="sm" className="text-muted-foreground">0.125" (3.2mm)</Text>
                          </div>
                          <Text size="xs" className="text-muted-foreground">Added to all sides to prevent white edges</Text>
                        </div>
                        
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-center">
                            <Text size="sm" weight="medium">Safe Area</Text>
                            <Text size="sm" className="text-muted-foreground">0.25" (6.4mm)</Text>
                          </div>
                          <Text size="xs" className="text-muted-foreground">Margin from edge for important elements</Text>
                        </div>
                        
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-center">
                            <Text size="sm" weight="medium">Paper</Text>
                            <Text size="sm" className="text-muted-foreground">14pt Cardstock</Text>
                          </div>
                          <Text size="xs" className="text-muted-foreground">Premium matte finish</Text>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Text size="sm" weight="medium" className="mb-3">Card Layout</Text>
                      <div className="border rounded-md overflow-hidden">
                        <div className="aspect-[3.5/2] bg-muted/30 relative p-4">
                          <div className="absolute inset-0 border-2 border-dashed border-primary/30 m-2 rounded"></div>
                          <div className="h-6 w-24 bg-primary/20 rounded mb-2"></div>
                          <div className="h-4 w-40 bg-muted rounded mb-4"></div>
                          <div className="space-y-1">
                            <div className="h-3 w-32 bg-muted rounded"></div>
                            <div className="h-3 w-36 bg-muted rounded"></div>
                            <div className="h-3 w-28 bg-muted rounded"></div>
                          </div>
                        </div>
                        <div className="p-2 bg-background">
                          <Text size="xs" className="text-center text-muted-foreground">Front side example with logo, name, and contact details</Text>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/20 rounded-md space-y-2">
                    <Text size="sm" weight="medium">Usage Guidelines:</Text>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Always include the company logo, individual's name, and contact information</li>
                      <li>Maintain adequate white space for legibility</li>
                      <li>Use the brand color palette and typography consistently</li>
                      <li>Keep information concise and focused</li>
                      <li>Consider adding a QR code for digital contact sharing</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Letterhead</CardTitle>
                  <CardDescription>Templates and guidelines for official corporate stationery</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <Text size="sm" weight="medium" className="mb-3">Specifications</Text>
                      <div className="space-y-4">
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-center">
                            <Text size="sm" weight="medium">Size</Text>
                            <Text size="sm" className="text-muted-foreground">8.5" × 11" (US Letter)</Text>
                          </div>
                          <Text size="xs" className="text-muted-foreground">A4 (210mm × 297mm) for international use</Text>
                        </div>
                        
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-center">
                            <Text size="sm" weight="medium">Margins</Text>
                            <Text size="sm" className="text-muted-foreground">1" (25.4mm)</Text>
                          </div>
                          <Text size="xs" className="text-muted-foreground">Standard margins on all sides</Text>
                        </div>
                        
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-center">
                            <Text size="sm" weight="medium">Paper</Text>
                            <Text size="sm" className="text-muted-foreground">24lb Bond</Text>
                          </div>
                          <Text size="xs" className="text-muted-foreground">Premium white paper stock</Text>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Text size="sm" weight="medium" className="mb-3">Letterhead Layout</Text>
                      <div className="border rounded-md overflow-hidden">
                        <div className="aspect-[8.5/11] bg-muted/10 relative p-6 max-h-96">
                          <div className="h-8 w-32 bg-primary/20 rounded mb-6 absolute top-6 left-6"></div>
                          <div className="h-6 w-48 bg-muted/50 rounded absolute top-6 right-6"></div>
                          <div className="absolute bottom-6 left-6 right-6 h-12 bg-muted/30 rounded p-2">
                            <div className="flex justify-between">
                              <div className="h-3 w-36 bg-muted/50 rounded"></div>
                              <div className="h-3 w-36 bg-muted/50 rounded"></div>
                              <div className="h-3 w-36 bg-muted/50 rounded"></div>
                            </div>
                          </div>
                        </div>
                        <div className="p-2 bg-background">
                          <Text size="xs" className="text-center text-muted-foreground">Letterhead with header and footer elements</Text>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/20 rounded-md space-y-2">
                    <Text size="sm" weight="medium">Usage Guidelines:</Text>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Include company logo, address, and contact information</li>
                      <li>Maintain consistent positioning of header and footer elements</li>
                      <li>Ensure ample space for letter content</li>
                      <li>Use the brand color palette sparingly for professional appearance</li>
                      <li>Create digital templates for consistent usage across departments</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Resources Templates Section */}
            <section id="resources-templates" className="scroll-mt-16 space-y-6">
              <Heading variant="h3">Templates</Heading>
              <Text className="text-lg">
                Our template library provides pre-designed layouts for various use cases.
              </Text>
              
              <Card>
                <CardHeader>
                  <CardTitle>Template Variations</CardTitle>
                  <CardDescription>Different templates for various applications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Text size="sm" weight="medium" className="mb-3">Basic Template</Text>
                      <Card>
                        <CardHeader>
                          <CardTitle>Basic Template</CardTitle>
                          <CardDescription>Simple template with standard layout</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Text>This is a standard template used for basic layouts and content blocks.</Text>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <Text size="sm" weight="medium" className="mb-3">Template with Header and Footer</Text>
                      <Card>
                        <CardHeader>
                          <CardTitle>Template with Header and Footer</CardTitle>
                          <CardDescription>Template with customizable header and footer</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Text>This template includes a header and footer section for branding and navigation.</Text>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Template Patterns</CardTitle>
                  <CardDescription>Common template compositions for specific contexts</CardDescription>
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
                        <CardTitle>Media Template</CardTitle>
                        <CardDescription>Template with image or media content</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Text>Templates can include visual media at the top to enhance context.</Text>
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
                            <CardTitle>Feature Template</CardTitle>
                            <CardDescription>Highlighting a specific feature</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Text>Feature templates include an icon and emphasize a particular capability or benefit.</Text>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Stat Template</CardTitle>
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
                  <CardTitle>Interactive Templates</CardTitle>
                  <CardDescription>Templates with interactive elements and states</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Text size="sm" weight="medium" className="mb-3">Selectable Template</Text>
                      <div className="rounded-md border-2 border-primary bg-primary/5 p-1 hover:cursor-pointer">
                        <Card>
                          <CardHeader className="py-4">
                            <div className="flex items-center justify-between">
                              <CardTitle>Selected Template</CardTitle>
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
                      <Text size="sm" weight="medium" className="mb-3">Expandable Template</Text>
                      <Card>
                        <CardHeader className="py-4">
                          <div className="flex items-center justify-between">
                            <CardTitle>Frequently Asked Questions</CardTitle>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-label="Expand template">
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

            {/* Resources Downloads Section */}
            <section id="resources-downloads" className="scroll-mt-16 space-y-6">
              <Heading variant="h3">Downloads</Heading>
              <Text className="text-lg">
                Access and download our design system assets for implementation.
              </Text>
              
              <Card>
                <CardHeader>
                  <CardTitle>Design Files</CardTitle>
                  <CardDescription>Source files for design implementation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded bg-muted flex items-center justify-center text-muted-foreground">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                              <polyline points="14 2 14 8 20 8" />
                            </svg>
                          </div>
                          <div>
                            <Text size="sm" weight="medium">Workhorse-UI-Kit.sketch</Text>
                            <Text size="xs" className="text-muted-foreground">48.2 MB - Last updated April 2023</Text>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" x2="12" y1="15" y2="3" />
                          </svg>
                          Download
                        </Button>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded bg-muted flex items-center justify-center text-muted-foreground">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                              <polyline points="14 2 14 8 20 8" />
                            </svg>
                          </div>
                          <div>
                            <Text size="sm" weight="medium">Workhorse-UI-Kit.fig</Text>
                            <Text size="xs" className="text-muted-foreground">52.7 MB - Last updated May 2023</Text>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" x2="12" y1="15" y2="3" />
                          </svg>
                          Download
                        </Button>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded bg-muted flex items-center justify-center text-muted-foreground">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                              <polyline points="14 2 14 8 20 8" />
                            </svg>
                          </div>
                          <div>
                            <Text size="sm" weight="medium">Workhorse-UI-Kit.xd</Text>
                            <Text size="xs" className="text-muted-foreground">45.9 MB - Last updated March 2023</Text>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" x2="12" y1="15" y2="3" />
                          </svg>
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Code Resources</CardTitle>
                  <CardDescription>Implementation resources for developers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded bg-muted flex items-center justify-center text-muted-foreground">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                              <path d="m18 16 4-4-4-4" />
                              <path d="m6 8-4 4 4 4" />
                              <path d="m14.5 4-5 16" />
                            </svg>
                          </div>
                          <div>
                            <Text size="sm" weight="medium">Workhorse React Component Library</Text>
                            <Text size="xs" className="text-muted-foreground">v1.2.0 - React components implementation</Text>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                              <path d="M9 18c-4.51 2-5-2-7-2" />
                            </svg>
                            GitHub
                          </Button>
                          <Button variant="outline" size="sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" x2="12" y1="15" y2="3" />
                            </svg>
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded bg-muted flex items-center justify-center text-muted-foreground">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                              <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                              <line x1="16" x2="2" y1="8" y2="22" />
                              <line x1="17.5" x2="9" y1="15" y2="15" />
                            </svg>
                          </div>
                          <div>
                            <Text size="sm" weight="medium">Workhorse Tailwind CSS Config</Text>
                            <Text size="xs" className="text-muted-foreground">v4.0.0 - Tailwind configuration for design system</Text>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                              <rect width="4" height="12" x="2" y="9" />
                              <circle cx="4" cy="4" r="2" />
                            </svg>
                            npm
                          </Button>
                          <Button variant="outline" size="sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" x2="12" y1="15" y2="3" />
                            </svg>
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Resources Guides Section */}
            <section id="resources-guides" className="scroll-mt-16 space-y-6">
              <Heading variant="h3">Guides</Heading>
              <Text className="text-lg">
                Comprehensive documentation and best practices for using our design system.
              </Text>
              
              <Card>
                <CardHeader>
                  <CardTitle>Getting Started</CardTitle>
                  <CardDescription>Essential information for new users</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <div className="font-medium text-sm leading-snug mb-2">Introduction to the Design System</div>
                      <div className="mb-4">
                        Our design system provides a comprehensive set of guidelines, components, and patterns 
                        to create consistent and cohesive user experiences across all our products.
                      </div>
                      <div className="rounded-md bg-muted/20 p-4">
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>
                            <div className="font-medium text-sm leading-snug">Get access to our resources</div>
                            <div className="text-sm leading-snug">Contact your design team lead for access to design files and code repositories.</div>
                          </li>
                          <li>
                            <div className="font-medium text-sm leading-snug">Set up your development environment</div>
                            <div className="text-sm leading-snug">Follow our setup guide to configure your environment for working with the design system.</div>
                          </li>
                          <li>
                            <div className="font-medium text-sm leading-snug">Explore components and guidelines</div>
                            <div className="text-sm leading-snug">Familiarize yourself with our system through documentation and examples.</div>
                          </li>
                          <li>
                            <div className="font-medium text-sm leading-snug">Join the community</div>
                            <div className="text-sm leading-snug">Connect with other team members through our Slack channel for questions and feedback.</div>
                          </li>
                        </ol>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Text size="sm" weight="medium">Quick Links</Text>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex gap-2 p-3 rounded-md border hover:border-primary hover:bg-muted/10 cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mt-0.5 text-primary">
                            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                            <path d="M12 3v6" />
                          </svg>
                          <div>
                            <div className="font-medium text-sm leading-snug">Designer Onboarding</div>
                            <div className="text-xs leading-tight text-muted-foreground">Guide for designers joining the system</div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 p-3 rounded-md border hover:border-primary hover:bg-muted/10 cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mt-0.5 text-primary">
                            <path d="m18 16 4-4-4-4" />
                            <path d="m6 8-4 4 4 4" />
                            <path d="m14.5 4-5 16" />
                          </svg>
                          <div>
                            <div className="font-medium text-sm leading-snug">Developer Onboarding</div>
                            <div className="text-xs leading-tight text-muted-foreground">Guide for developers implementing the system</div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 p-3 rounded-md border hover:border-primary hover:bg-muted/10 cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mt-0.5 text-primary">
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" x2="8" y1="13" y2="13" />
                            <line x1="16" x2="8" y1="17" y2="17" />
                            <line x1="10" x2="8" y1="9" y2="9" />
                          </svg>
                          <div>
                            <div className="font-medium text-sm leading-snug">Component Documentation</div>
                            <div className="text-xs leading-tight text-muted-foreground">Detailed specifications for all components</div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 p-3 rounded-md border hover:border-primary hover:bg-muted/10 cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mt-0.5 text-primary">
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 12h.01" />
                          </svg>
                          <div>
                            <div className="font-medium text-sm leading-snug">FAQs</div>
                            <div className="text-xs leading-tight text-muted-foreground">Common questions and their answers</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Implementation Guidelines</CardTitle>
                  <CardDescription>Best practices for design system implementation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <Text size="sm" weight="medium" className="mb-2">Design Principles</Text>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-md bg-muted/10 border space-y-2">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                              <circle cx="12" cy="12" r="10" />
                              <path d="m16.24 7.76-4.24 4.24-4.24-4.24" />
                              <path d="m16.24 16.24-4.24-4.24-4.24 4.24" />
                            </svg>
                          </div>
                          <div className="font-medium text-sm leading-snug">Consistency</div>
                          <div className="text-sm leading-snug">Create predictable experiences through consistent patterns and interactions.</div>
                        </div>
                        
                        <div className="p-4 rounded-md bg-muted/10 border space-y-2">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                            </svg>
                          </div>
                          <div className="font-medium text-sm leading-snug">Efficiency</div>
                          <div className="text-sm leading-snug">Optimize for speed, performance, and user productivity in all interactions.</div>
                        </div>
                        
                        <div className="p-4 rounded-md bg-muted/10 border space-y-2">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                              <path d="M14.05 2a9 9 0 0 1 8 7.94" />
                              <path d="M14.05 6A5 5 0 0 1 18 10" />
                            </svg>
                          </div>
                          <div className="font-medium text-sm leading-snug">Accessibility</div>
                          <div className="text-sm leading-snug">Design for everyone by prioritizing universal access and usability.</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Text size="sm" weight="medium" className="mb-2">Implementation Checklist</Text>
                      <div className="p-4 rounded-md border">
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full border border-primary flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-primary">
                                <path d="m5 12 5 5L20 7" />
                              </svg>
                            </div>
                            <div className="text-sm leading-snug">Use the correct component variants and props</div>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full border border-primary flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-primary">
                                <path d="m5 12 5 5L20 7" />
                              </svg>
                            </div>
                            <div className="text-sm leading-snug">Follow spacing and layout guidelines</div>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full border border-primary flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-primary">
                                <path d="m5 12 5 5L20 7" />
                              </svg>
                            </div>
                            <div className="text-sm leading-snug">Maintain responsive behavior across breakpoints</div>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full border border-primary flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-primary">
                                <path d="m5 12 5 5L20 7" />
                              </svg>
                            </div>
                            <div className="text-sm leading-snug">Ensure all interactive elements are accessible</div>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full border border-primary flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-primary">
                                <path d="m5 12 5 5L20 7" />
                              </svg>
                            </div>
                            <div className="text-sm leading-snug">Test implementation in different environments</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/20 rounded-md space-y-2">
                    <div className="font-medium text-sm leading-snug">Need Help?</div>
                    <div className="text-sm leading-snug">
                      If you need assistance implementing any aspect of the design system,
                      please reach out to the design system team through our support channels.
                    </div>
                    <div className="flex gap-3 mt-3">
                      <Button variant="outline" size="sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        Contact Support
                      </Button>
                      <Button variant="outline" size="sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                          <line x1="12" x2="12.01" y1="17" y2="17" />
                        </svg>
                        FAQ
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}