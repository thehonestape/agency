import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { SideNav } from '@/components/patterns/navigation/SideNav';
import { TopBar } from '@/components/patterns/navigation/TopBar';
import { FiBell } from 'react-icons/fi';
import { Heading } from '@/components/ui/typography';
import { Text } from '@/components/ui/typography';

// Define the sections for the design system
const sections = [
  { id: 'foundations', label: 'Foundations', items: [
    { id: 'philosophy', label: 'Philosophy' },
    { id: 'typography', label: 'Typography' },
    { id: 'color', label: 'Color' },
    { id: 'space', label: 'Space & Scale' },
    { id: 'visual', label: 'Visual Language' }
  ]},
  { id: 'identity', label: 'Identity', items: [
    { id: 'logo', label: 'Logo' },
    { id: 'voice', label: 'Voice & Tone' },
    { id: 'composition', label: 'Composition' },
    { id: 'motion', label: 'Motion' }
  ]},
  { id: 'components', label: 'Components', items: [
    { id: 'global', label: 'Global Elements' },
    { id: 'navigation', label: 'Navigation' },
    { id: 'content', label: 'Content' },
    { id: 'controls', label: 'Controls' },
    { id: 'feedback', label: 'Feedback' }
  ]},
  { id: 'applications', label: 'Applications', items: [
    { id: 'digital', label: 'Digital' },
    { id: 'environmental', label: 'Environmental' },
    { id: 'communication', label: 'Communication' },
    { id: 'multi-channel', label: 'Multi-Channel' }
  ]},
  { id: 'resources', label: 'Resources', items: [
    { id: 'design', label: 'Design' },
    { id: 'development', label: 'Development' },
    { id: 'content-creation', label: 'Content' },
    { id: 'evolution', label: 'Evolution' }
  ]}
];

// Convert sections to navigation items for SideNav
const navItems = sections.map(section => ({
  label: section.label,
  items: section.items.map(item => ({
    label: item.label,
    href: `#${section.id}-${item.id}`,
    active: false
  }))
}));

export default function DesignSystem() {
  const [activeSection, setActiveSection] = useState<string>('foundations-philosophy');
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
    if (hash) {
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
              <Heading variant="h1" className="mb-4">Workhorse Design System</Heading>
              <Text className="text-lg text-muted-foreground">
                A single source of truth for our entire brand experience — digital, environmental, and beyond.
              </Text>
            </section>

            {/* Foundations Section */}
            <section id="foundations" className="scroll-mt-16 space-y-12">
              <Heading variant="h2" className="pb-2 border-b">Foundations</Heading>
              
              {/* Philosophy */}
              <section id="foundations-philosophy" className="scroll-mt-16 space-y-6">
                <Heading variant="h3">Philosophy</Heading>
                <Text className="text-lg">
                  Creating the compelling, meaningful, and beautiful across all touchpoints.
                </Text>
                <Card>
                  <CardHeader>
                    <CardTitle>Design Principles</CardTitle>
                    <CardDescription>The guiding beliefs that shape our approach</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Heading variant="h4" className="mb-2">Compelling</Heading>
                      <Text>A compelling brand enshrines its beliefs and dreams in a story that influences and inspires.</Text>
                    </div>
                    <div>
                      <Heading variant="h4" className="mb-2">Meaningful</Heading>
                      <Text>A meaningful brand distills the ethereal and mystical down to the real and material.</Text>
                    </div>
                    <div>
                      <Heading variant="h4" className="mb-2">Beautiful</Heading>
                      <Text>A beautiful brand is a complete, whole, and universal truth.</Text>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Typography */}
              <section id="foundations-typography" className="scroll-mt-16 space-y-6">
                <Heading variant="h3">Typography</Heading>
                <Text className="text-lg">
                  Our voice made visible through typeface, hierarchy, and expression.
                </Text>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Headings</CardTitle>
                    <CardDescription>Typography used for titles and section headers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Heading variant="h1" className="mb-2">Heading 1</Heading>
                      <Text className="text-sm text-muted-foreground">Used for page titles and major sections</Text>
                    </div>
                    <div>
                      <Heading variant="h2" className="mb-2">Heading 2</Heading>
                      <Text className="text-sm text-muted-foreground">Used for section headers</Text>
                    </div>
                    <div>
                      <Heading variant="h3" className="mb-2">Heading 3</Heading>
                      <Text className="text-sm text-muted-foreground">Used for subsection titles</Text>
                    </div>
                    <div>
                      <Heading variant="h4" className="mb-2">Heading 4</Heading>
                      <Text className="text-sm text-muted-foreground">Used for card titles and smaller sections</Text>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Body Text</CardTitle>
                    <CardDescription>Text components for body content and descriptions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Text className="text-lg mb-2">Large Text</Text>
                      <Text className="text-sm text-muted-foreground">Used for introductory paragraphs</Text>
                      <div className="mt-2 p-4 bg-muted/20 rounded-md">
                        <Text className="text-lg">This is a large paragraph text meant for introductory sections, hero areas, or anywhere you need to emphasize body text.</Text>
                      </div>
                    </div>
                    
                    <div>
                      <Text className="font-medium mb-2">Regular Text</Text>
                      <Text className="text-sm text-muted-foreground">Default paragraph size</Text>
                      <div className="mt-2 p-4 bg-muted/20 rounded-md">
                        <Text>This is the standard paragraph text used throughout the application for most content blocks. It provides good readability for longer form content.</Text>
                      </div>
                    </div>
                    
                    <div>
                      <Text className="font-medium mb-2">Small Text</Text>
                      <Text className="text-sm text-muted-foreground">Used for secondary information</Text>
                      <div className="mt-2 p-4 bg-muted/20 rounded-md">
                        <Text className="text-sm">This smaller text is used for secondary information, metadata, captions, and footer content.</Text>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Color */}
              <section id="foundations-color" className="scroll-mt-16 space-y-6">
                <Heading variant="h3">Color</Heading>
                <Text className="text-lg">
                  Strategic use of color to evoke emotion and meaning.
                </Text>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Primary Colors</CardTitle>
                    <CardDescription>Core brand colors that form the foundation of our palette</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <div className="h-20 bg-primary rounded-lg"></div>
                        <Text className="font-medium">Primary</Text>
                        <Text className="text-xs text-muted-foreground">Used for main actions and emphasis</Text>
                      </div>
                      <div className="space-y-2">
                        <div className="h-20 bg-secondary rounded-lg"></div>
                        <Text className="font-medium">Secondary</Text>
                        <Text className="text-xs text-muted-foreground">Used for secondary actions</Text>
                      </div>
                      <div className="space-y-2">
                        <div className="h-20 bg-accent rounded-lg"></div>
                        <Text className="font-medium">Accent</Text>
                        <Text className="text-xs text-muted-foreground">Used for accents and highlights</Text>
                      </div>
                      <div className="space-y-2">
                        <div className="h-20 bg-muted rounded-lg"></div>
                        <Text className="font-medium">Muted</Text>
                        <Text className="text-xs text-muted-foreground">Used for backgrounds and subtle elements</Text>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Semantic Colors</CardTitle>
                    <CardDescription>Colors that convey specific meanings and states</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <div className="h-20 bg-destructive rounded-lg"></div>
                        <Text className="font-medium">Destructive</Text>
                        <Text className="text-xs text-muted-foreground">Used for error states and destructive actions</Text>
                      </div>
                      <div className="space-y-2">
                        <div className="h-20 bg-success rounded-lg"></div>
                        <Text className="font-medium">Success</Text>
                        <Text className="text-xs text-muted-foreground">Used for success states and confirmations</Text>
                      </div>
                      <div className="space-y-2">
                        <div className="h-20 bg-warning rounded-lg"></div>
                        <Text className="font-medium">Warning</Text>
                        <Text className="text-xs text-muted-foreground">Used for warning states and cautionary actions</Text>
                      </div>
                      <div className="space-y-2">
                        <div className="h-20 bg-info rounded-lg"></div>
                        <Text className="font-medium">Info</Text>
                        <Text className="text-xs text-muted-foreground">Used for informational states and messaging</Text>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Space & Scale */}
              <section id="foundations-space" className="scroll-mt-16 space-y-6">
                <Heading variant="h3">Space & Scale</Heading>
                <Text className="text-lg">
                  Creating rhythm, balance, and focus through spatial relationships.
                </Text>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Spacing Scale</CardTitle>
                    <CardDescription>Consistent spacing units used throughout the system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-end gap-2">
                        <div className="bg-primary w-4 h-4"></div>
                        <Text>4px - Extra small (xs)</Text>
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="bg-primary w-8 h-8"></div>
                        <Text>8px - Small (sm)</Text>
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="bg-primary w-16 h-16"></div>
                        <Text>16px - Medium (md)</Text>
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="bg-primary w-24 h-24"></div>
                        <Text>24px - Large (lg)</Text>
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="bg-primary w-32 h-32"></div>
                        <Text>32px - Extra large (xl)</Text>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Visual Language */}
              <section id="foundations-visual" className="scroll-mt-16 space-y-6">
                <Heading variant="h3">Visual Language</Heading>
                <Text className="text-lg">
                  Imagery, iconography, and visual expression.
                </Text>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Imagery</CardTitle>
                    <CardDescription>Guidelines for photography and illustration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-muted aspect-video rounded-lg flex items-center justify-center">
                        <Text className="text-muted-foreground">Photography example</Text>
                      </div>
                      <div className="bg-muted aspect-video rounded-lg flex items-center justify-center">
                        <Text className="text-muted-foreground">Illustration example</Text>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </section>

            {/* More sections to be added for: Identity, Components, Applications, and Resources */}
            
            {/* Identity Section Placeholder */}
            <section id="identity" className="scroll-mt-16 space-y-12">
              <Heading variant="h2" className="pb-2 border-b">Identity</Heading>
              <Text className="text-lg text-muted-foreground">
                Our brand identity system including logo, voice and tone, composition, and motion.
              </Text>
              {/* Will be expanded in future updates */}
            </section>
            
            {/* Components Section Placeholder */}
            <section id="components" className="scroll-mt-16 space-y-12">
              <Heading variant="h2" className="pb-2 border-b">Components</Heading>
              <Text className="text-lg text-muted-foreground">
                The building blocks of our interfaces including global elements, navigation, content patterns, controls, and feedback mechanisms.
              </Text>
              {/* Will be expanded in future updates */}
            </section>
            
            {/* Applications Section Placeholder */}
            <section id="applications" className="scroll-mt-16 space-y-12">
              <Heading variant="h2" className="pb-2 border-b">Applications</Heading>
              <Text className="text-lg text-muted-foreground">
                How our design system is applied across digital, environmental, communication, and multi-channel experiences.
              </Text>
              {/* Will be expanded in future updates */}
            </section>
            
            {/* Resources Section Placeholder */}
            <section id="resources" className="scroll-mt-16 space-y-12">
              <Heading variant="h2" className="pb-2 border-b">Resources</Heading>
              <Text className="text-lg text-muted-foreground">
                Tools and guidelines for designers, developers, and content creators.
              </Text>
              {/* Will be expanded in future updates */}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
} 