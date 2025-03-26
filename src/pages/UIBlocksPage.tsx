import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { 
  Card, 
  CardContent,
} from '@/components/ui/Card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import marketingData from '@/data/tailwind-plus/marketing.json'
import applicationUiData from '@/data/tailwind-plus/application-ui.json'
import ecommerceData from '@/data/tailwind-plus/ecommerce.json'
import RootLayout from '@/components/layouts/RootLayout'

type ComponentData = {
  section: string;
  name: string;
  href: string;
  count: string;
}

export default function UIBlocksPage() {
  const [activeCategory, setActiveCategory] = useState('marketing');
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [sections, setSections] = useState<string[]>([]);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load component data based on the active category
    let data: ComponentData[] = [];
    
    if (activeCategory === 'marketing') {
      data = marketingData.components;
    } else if (activeCategory === 'application-ui') {
      data = applicationUiData.components;
    } else if (activeCategory === 'ecommerce') {
      data = ecommerceData.components;
    }
    
    setComponents(data);
    
    // Extract unique sections
    const uniqueSections = Array.from(new Set(data.map(item => item.section)));
    setSections(uniqueSections);
    
    // Scroll to top when category changes
    window.scrollTo(0, 0);
  }, [activeCategory]);

  // Convert a section name to a URL-friendly ID
  const getSectionId = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  // Extract component count from the string or default to 0
  const getComponentCount = (countText: string) => {
    const match = countText.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  // Scroll to section when sidebar item is clicked
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Helper function for getting components by section
  const getComponentsForSection = (sectionName: string) => {
    return components.filter(component => component.section === sectionName);
  };

  return (
    <RootLayout>
      <div className="min-h-screen flex flex-col bg-background">
        {/* Full-height sidebar layout */}
        <div className="flex h-screen overflow-hidden">
          {/* Left Sidebar - Permanently visible */}
          <aside className="w-72 flex-shrink-0 border-r border-border h-screen overflow-y-auto bg-background">
            <div className="py-8 px-5">
              <div className="flex items-center px-2 mb-10">
                <h1 className="text-2xl font-bold">UI Blocks</h1>
              </div>

              <div className="space-y-10">
                <div>
                  <h2 className="font-semibold px-2 text-sm mb-4 text-muted-foreground uppercase tracking-wider">Categories</h2>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => setActiveCategory('marketing')}
                      className={`text-left px-4 py-2.5 rounded-md text-sm font-medium ${activeCategory === 'marketing' ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'}`}
                    >
                      Marketing
                    </button>
                    <button 
                      onClick={() => setActiveCategory('application-ui')}
                      className={`text-left px-4 py-2.5 rounded-md text-sm font-medium ${activeCategory === 'application-ui' ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'}`}
                    >
                      Application UI
                    </button>
                    <button 
                      onClick={() => setActiveCategory('ecommerce')}
                      className={`text-left px-4 py-2.5 rounded-md text-sm font-medium ${activeCategory === 'ecommerce' ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'}`}
                    >
                      Ecommerce
                    </button>
                    <button 
                      onClick={() => setActiveCategory('docs')}
                      className={`text-left px-4 py-2.5 rounded-md text-sm font-medium ${activeCategory === 'docs' ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'}`}
                    >
                      Documentation
                    </button>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <h2 className="font-semibold px-2 text-sm mb-4 text-muted-foreground uppercase tracking-wider">Components</h2>
                  {sections.map((section) => (
                    <div key={section} className="mb-6">
                      <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground px-2 mb-3">{section}</h3>
                      <ul className="space-y-2">
                        {getComponentsForSection(section).map((component) => (
                          <SidebarItem 
                            key={component.name}
                            title={component.name} 
                            sectionId={getSectionId(component.name)}
                            onClick={() => scrollToSection(getSectionId(component.name))} 
                          />
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main content area with header */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-2xl font-semibold">Browse UI Components</h2>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/theme-editor">Edit Theme</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/ui-blocks/documentation">View Documentation</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/ui-blocks/demo">View Demo Blocks</Link>
                </Button>
              </div>
            </div>
            
            {components.length > 0 ? (
              <div className="space-y-20">
                {sections.map((section) => (
                  <div key={section} className="mb-16">
                    <h2 className="text-2xl font-bold tracking-tight mb-8 pb-3 border-b border-gray-200">{section}</h2>
                    
                    {getComponentsForSection(section).map((component) => (
                      <section 
                        key={component.name} 
                        id={getSectionId(component.name)} 
                        className="mb-16 scroll-mt-24"
                      >
                        <div className="mb-10">
                          <h3 className="text-2xl font-bold tracking-tight mb-4">{component.name}</h3>
                          <p className="text-muted-foreground max-w-3xl text-lg">
                            Below you'll find a collection of {component.name.toLowerCase()} 
                            that you can use to build beautiful and responsive user interfaces.
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                          {Array.from({ length: Math.min(getComponentCount(component.count) || 6, 12) }).map((_, index) => (
                            <PreviewCard
                              key={index}
                              title={`${component.name} ${index + 1}`}
                              description={`${component.name} description`}
                              demoPath={component.href}
                              requiredJs={index % 3 === 0} // Just for demo purposes
                            />
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg border shadow-sm">
                <div className="text-center max-w-md px-6">
                  <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
                  <p className="text-muted-foreground text-lg mx-auto mb-8">
                    This section is currently under development. Check back soon to see the components.
                  </p>
                  <Button 
                    onClick={() => {
                      setActiveCategory('marketing');
                    }}
                  >
                    View Available Components
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </RootLayout>
  )
}

function SidebarItem({ title, sectionId, onClick }: { title: string; sectionId: string; onClick: () => void }) {
  // Check if the section is currently in view (for active state)
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top <= 120 && rect.bottom >= 100;
        setIsActive(isInView);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initially
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionId]);

  return (
    <li>
      <button
        onClick={onClick}
        className={`w-full text-left text-sm py-2.5 px-4 rounded-md transition-all duration-200 ${
          isActive 
            ? 'bg-primary/10 text-primary font-medium' 
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
        }`}
      >
        {title}
      </button>
    </li>
  )
}

function PreviewCard({
  title,
  description,
  demoPath,
  requiredJs,
}: {
  title: string;
  description: string;
  demoPath?: string;
  requiredJs?: boolean;
}) {
  // Directly map component titles to their corresponding SVG file names
  let imageName = '';
  const normalizedTitle = title.toLowerCase();
  
  if (normalizedTitle.includes('feature')) {
    imageName = 'feature-section-preview.svg';
  } else if (normalizedTitle.includes('hero')) {
    imageName = 'hero-basic-preview.svg';
  } else if (normalizedTitle.includes('pricing')) {
    imageName = 'pricing-section-preview.svg';
  } else if (normalizedTitle.includes('stats')) {
    imageName = 'stats-section-preview.svg';
  } else if (normalizedTitle.includes('cta')) {
    imageName = 'cta-section-preview.svg';
  } else {
    // Fallback for any other component types
    imageName = 'feature-section-preview.svg';
  }
  
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-200 group">
      <div className="relative aspect-video bg-gray-50">
        <img
          src={`/previews/${imageName}`}
          alt={`Preview of ${title}`}
          className="w-full h-full object-cover group-hover:opacity-95 transition-opacity"
          onError={(e) => {
            console.error(`Failed to load image: ${e.currentTarget.src}`);
            e.currentTarget.src = 'https://placehold.co/600x400?text=Preview';
            e.currentTarget.onerror = null;
          }}
        />
        {requiredJs && (
          <div className="absolute top-3 right-3 bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-medium">
            Requires JS
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-muted-foreground mt-2 text-sm">{description}</p>
        {demoPath && (
          <div className="mt-5">
            <Link
              to={demoPath}
              className="text-primary hover:text-primary/80 text-sm font-medium flex items-center group-hover:underline"
            >
              View demo
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 