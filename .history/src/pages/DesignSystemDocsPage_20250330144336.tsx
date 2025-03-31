import React, { useState, useRef, useEffect, ReactNode, DragEvent } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { UI } from '@/components/ui';
import { Heading, SubHeading, Text, Code, Kbd } from '@/components/ui/typography';
import { Callout } from '@/components/ui/Callout';
import { ColorScale } from '@/components/ui/ColorScale';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui/theme/theme-toggle';
import {
  Bars3Icon,
  XMarkIcon,
  SwatchIcon,
  DocumentTextIcon,
  CubeIcon,
  PaintBrushIcon,
  ViewColumnsIcon,
  CommandLineIcon,
  BellIcon,
  MagnifyingGlassIcon,
  BuildingLibraryIcon,
  ArrowsPointingOutIcon,
  CursorArrowRaysIcon,
  DocumentDuplicateIcon,
  ExclamationTriangleIcon,
  MapIcon,
  WrenchScrewdriverIcon,
  CheckCircleIcon,
  UserGroupIcon,
  BoltIcon,
  ChevronDownIcon,
  PencilIcon,
  ArrowDownTrayIcon,
  GlobeAltIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';

// Destructure UI components for clarity
const {
  Badge,
  Alert,
  AlertTitle,
  AlertDescription,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Button,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Input
} = UI;

// Type definitions for navigation sections
interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
}

// Section container with proper spacing and structure
const Section: React.FC<{
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}> = ({ id, title, description, children }) => {
  return (
    <section id={id} className="pt-4 pb-16 scroll-mt-20">
      <h2 className="text-3xl font-bold mb-3">{title}</h2>
      {description && (
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">{description}</p>
      )}
      {children}
    </section>
  );
};

interface ColorInfo {
  name: string;
  bg: string;
  value: string;
}

// Color presentation component
const ColorPalette: React.FC<{
  title: string;
  colors: ColorInfo[];
}> = ({ title, colors }) => {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {colors.map((color) => (
          <Card key={color.name} className="overflow-hidden">
            <div 
              className={`h-24 ${color.bg}`} 
            />
            <CardContent className="pt-3">
              <div className="font-medium">{color.name}</div>
              <div className="text-sm text-muted-foreground">{color.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Typography component
const TypographyExample: React.FC<{
  name: string;
  className: string;
  children: ReactNode;
}> = ({ name, className, children }) => {
  return (
    <Card className="mb-6 overflow-hidden">
      <CardContent className="pt-6">
        <div className={`${className} mb-4`}>{children}</div>
      </CardContent>
      <div className="flex justify-between text-sm bg-muted px-4 py-2 border-t">
        <Badge variant="outline">{name}</Badge>
        <code className="text-xs bg-muted-foreground/20 px-1 py-0.5 rounded">{className}</code>
      </div>
    </Card>
  );
};

// Component Preview
const ComponentPreview: React.FC<{
  title: string;
  description?: string;
  children: ReactNode;
}> = ({ title, description, children }) => {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <p className="text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent className="p-6 bg-card rounded-lg border-t">
        {children}
      </CardContent>
    </Card>
  );
};

// Main Design System Documentation component
const DesignSystemDocsPage = (): React.ReactNode => {
  const [activeSection, setActiveSection] = useState("intro");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [channels, setChannels] = useState([
    { id: 1, name: "Website", active: true },
    { id: 2, name: "Mobile App", active: false },
    { id: 3, name: "Print Materials", active: false },
    { id: 4, name: "Social Media", active: false },
    { id: 5, name: "Presentations", active: false },
    { id: 6, name: "Email", active: false },
  ]);
  const [draggedChannel, setDraggedChannel] = useState<number | null>(null);
  const [fontCombination, setFontCombination] = useState(1);
  
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Handle channel drag
  const handleDragStart = (e: DragEvent<HTMLDivElement>, id: number) => {
    setDraggedChannel(id);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();
    if (draggedChannel === null) return;
    
    // Reorder channels
    const updatedChannels = [...channels];
    const draggedItem = updatedChannels.find(ch => ch.id === draggedChannel);
    const dropIndex = updatedChannels.findIndex(ch => ch.id === id);
    
    if (draggedItem && dropIndex !== -1) {
      // Remove the dragged item
      const filteredChannels = updatedChannels.filter(ch => ch.id !== draggedChannel);
      // Insert at new position
      filteredChannels.splice(dropIndex, 0, draggedItem);
      setChannels(filteredChannels);
    }
    
    setDraggedChannel(null);
  };

  // Toggle channel selection
  const toggleChannel = (id: number) => {
    setChannels(channels.map(channel => 
      channel.id === id ? { ...channel, active: !channel.active } : channel
    ));
  };

  // Shuffle font combinations
  const shuffleFontCombinations = () => {
    const combinations = 3;
    const nextCombination = (fontCombination % combinations) + 1;
    setFontCombination(nextCombination);
  };

  // Define documentation sections with icons
  const sections = [
    { id: "intro", title: "Introduction", icon: DocumentTextIcon },
    { id: "typography", title: "Typography", icon: DocumentTextIcon },
    { id: "colors", title: "Colors", icon: SwatchIcon },
    { id: "spacing", title: "Spacing & Layout", icon: ArrowsPointingOutIcon },
    { id: "buttons", title: "Buttons", icon: CursorArrowRaysIcon },
    { id: "inputs", title: "Form Controls", icon: DocumentDuplicateIcon },
    { id: "select", title: "Select & Dropdown", icon: CommandLineIcon },
    { id: "feedback", title: "Feedback", icon: ExclamationTriangleIcon },
    { id: "dialogs", title: "Dialogs & Overlays", icon: ViewColumnsIcon },
    { id: "navigation", title: "Navigation", icon: MapIcon },
    { id: "display", title: "Data Display", icon: CubeIcon },
    { id: "utilities", title: "Utilities", icon: WrenchScrewdriverIcon },
    { id: "themes", title: "Theming", icon: PaintBrushIcon },
  ];

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    sectionRefs.current[sectionId]?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  };

  // Setup intersection observer to update active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [sectionRefs.current]);

  // Section component for consistent styling and ref registration
  const Section: React.FC<{
    id: string;
    title: string;
    description?: string;
    children: React.ReactNode;
  }> = ({ id, title, description, children }): React.ReactElement => {
    return (
      <section
        id={id}
        ref={(el) => {
          sectionRefs.current[id] = el;
          return undefined;
        }}
        className="mb-16"
      >
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {children}
      </section>
    );
  };

  // Component preview card for displaying examples
  const ComponentPreview: React.FC<{
    title: string;
    description?: string;
    children: React.ReactNode;
  }> = ({ title, description, children }): React.ReactElement => {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        {description && (
          <p className="text-muted-foreground mb-4">{description}</p>
        )}
        <Card className="overflow-hidden">
          <div className="p-6 border-b">{children}</div>
        </Card>
      </div>
    );
  };

  // Main content sections for the documentation
  const mainContent = (
    <div className="space-y-12">
      {/* Intro Row - Two-Column Layout */}
      <section
        id="intro"
        ref={(el) => {
          sectionRefs.current["intro"] = el;
          return undefined;
        }}
        className="grid grid-cols-1 md:grid-cols-12 gap-6"
      >
        {/* Left Column - 5/12 */}
        <div className="md:col-span-5 space-y-6">
          <div>
            <h1 className="text-4xl font-bold">Workhorse Design System</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">v1.0</span>
              <span className="text-muted-foreground text-sm">Last updated: June 2023</span>
            </div>
          </div>
          <div className="prose dark:prose-invert">
            <p>
              Our design system represents the visual language of Workhorse. It's built to create compelling, meaningful, and beautiful experiences for science, art, culture, and commerce.
            </p>
            <p>
              This system brings together the world's best creative minds and advanced design practices to craft brand experiences that inspire and engage.
            </p>
          </div>
        </div>
        
        {/* Right Column - 7/12 */}
        <div className="md:col-span-7">
          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="space-y-2 text-center p-4 hover:bg-background rounded-md transition-colors">
                  <DocumentTextIcon className="h-8 w-8 mx-auto text-primary" />
                  <p className="font-medium">Typography</p>
                </div>
                <div className="space-y-2 text-center p-4 hover:bg-background rounded-md transition-colors">
                  <SwatchIcon className="h-8 w-8 mx-auto text-primary" />
                  <p className="font-medium">Colors</p>
                </div>
                <div className="space-y-2 text-center p-4 hover:bg-background rounded-md transition-colors">
                  <ArrowsPointingOutIcon className="h-8 w-8 mx-auto text-primary" />
                  <p className="font-medium">Spacing</p>
                </div>
                <div className="space-y-2 text-center p-4 hover:bg-background rounded-md transition-colors">
                  <CursorArrowRaysIcon className="h-8 w-8 mx-auto text-primary" />
                  <p className="font-medium">Components</p>
                </div>
                <div className="space-y-2 text-center p-4 hover:bg-background rounded-md transition-colors">
                  <PaintBrushIcon className="h-8 w-8 mx-auto text-primary" />
                  <p className="font-medium">Theming</p>
                </div>
                <div className="space-y-2 text-center p-4 hover:bg-background rounded-md transition-colors">
                  <WrenchScrewdriverIcon className="h-8 w-8 mx-auto text-primary" />
                  <p className="font-medium">Utilities</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Typography Section - Two-Column Layout */}
      <Section
        id="typography"
        title="Typography"
        description=""
      >
        {/* Fonts Card - Full Width */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Fonts</span>
              <Button variant="ghost" size="sm" className="opacity-0">
                <PencilIcon className="h-4 w-4" />
              </Button>
            </CardTitle>
            <CardDescription>Core typographic families for effective design systems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg">
                A strong typography system is built on foundational font categories that serve distinct purposes across all design contexts.
              </p>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="rounded-lg overflow-hidden border">
                  <div className="p-6 bg-primary/10">
                    <h3 className="text-2xl mb-2">Serif</h3>
                    <p className="text-base">
                      <span className="text-muted-foreground mt-2 block">Fonts with small strokes at the end of characters that create a sense of formality and tradition.</span>
                    </p>
                  </div>
                  <div className="p-6 border-t">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">+</div>
                        <span>Conveys authority, reliability, and heritage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">+</div>
                        <span>Ideal for long-form content and editorial</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">+</div>
                        <span>Examples: Georgia, Times New Roman, Garamond</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="rounded-lg overflow-hidden border">
                  <div className="p-6 bg-primary/10">
                    <h3 className="text-2xl mb-2">Sans Serif</h3>
                    <p className="text-base">
                      <span className="text-muted-foreground mt-2 block">Fonts without decorative strokes, creating clean, modern, and accessible text.</span>
                    </p>
                  </div>
                  <div className="p-6 border-t">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">+</div>
                        <span>Conveys clarity, efficiency, and modernity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">+</div>
                        <span>Perfect for interfaces, navigation, and content</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">+</div>
                        <span>Examples: Inter, Helvetica, Arial, system-ui</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="rounded-lg overflow-hidden border">
                  <div className="p-6 bg-primary/10">
                    <h3 className="text-2xl mb-2">Monospace</h3>
                    <p className="text-base">
                      <span className="text-muted-foreground mt-2 block">Fonts where each character occupies the same width, creating a technical rhythm.</span>
                    </p>
                  </div>
                  <div className="p-6 border-t">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">+</div>
                        <span>Conveys precision, functionality, and technology</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">+</div>
                        <span>Used for code, technical data, and commands</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">+</div>
                        <span>Examples: Consolas, Monaco, Courier</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="rounded-lg overflow-hidden border">
                  <div className="p-6 bg-primary/10">
                    <h3 className="text-2xl mb-2">Display</h3>
                    <p className="text-base">
                      <span className="text-muted-foreground mt-2 block">Decorative fonts designed for headlines and attention-grabbing elements.</span>
                    </p>
                  </div>
                  <div className="p-6 border-t">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">+</div>
                        <span>Creates distinctive voice and personality</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">+</div>
                        <span>Best for large headlines and limited text</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">+</div>
                        <span>Examples: Playfair Display, Montserrat, Oswald</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-medium mb-4">Font Combination Principles</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-base font-medium mb-3">Creating Effective Pairings</h4>
                    <ul className="space-y-4 text-sm">
                      <li className="flex gap-3">
                        <div className="mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">1</div>
                        <div>
                          <strong className="block text-base">Establish Hierarchy</strong>
                          <span className="text-muted-foreground">Use different font weights and sizes to create clear visual hierarchy. Headings should command attention while body text remains readable.</span>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">2</div>
                        <div>
                          <strong className="block text-base">Create Contrast</strong>
                          <span className="text-muted-foreground">Pair fonts with different characteristics (serif with sans-serif) to create visual interest and clear distinction between elements.</span>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">3</div>
                        <div>
                          <strong className="block text-base">Maintain Consistency</strong>
                          <span className="text-muted-foreground">Use the same font combinations across all channels and materials to strengthen brand recognition and cohesion.</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/20 p-6 rounded-lg border">
                    <h4 className="text-base font-medium mb-4">Common Combination Patterns</h4>
                    <div className="space-y-4 text-sm">
                      <div className="pb-3 border-b">
                        <div className="text-lg font-semibold mb-1">Serif Headlines + Sans-Serif Body</div>
                        <p className="text-muted-foreground">Classic combination that balances traditional authority with modern readability. Ideal for editorial and professional contexts.</p>
                      </div>
                      <div className="pb-3 border-b">
                        <div className="text-lg font-semibold mb-1">Sans-Serif Headlines + Serif Body</div>
                        <p className="text-muted-foreground">Modern approach that uses clean headlines with a more readable body text. Works well for digital magazines and blogs.</p>
                      </div>
                      <div className="pb-3 border-b">
                        <div className="text-lg font-semibold mb-1">Sans-Serif + Monospace</div>
                        <p className="text-muted-foreground">Technical combination that pairs clean interfaces with code examples. Perfect for documentation and technical products.</p>
                      </div>
                      <div>
                        <div className="text-lg font-semibold mb-1">Display + Sans-Serif</div>
                        <p className="text-muted-foreground">High-contrast pairing that uses distinctive headlines with highly readable body text. Great for marketing and campaigns.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-base text-muted-foreground mt-6">
                  <p>When selecting fonts for your design system, focus on versatility, accessibility, and how well they express your brand's personality. The most effective typography systems use a limited set of carefully chosen fonts with clear roles.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dynamic Type Control - Full Width */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Dynamic Type Control</span>
              <Button variant="ghost" size="sm" className="opacity-0">
                <PencilIcon className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-md bg-muted/20 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="base-size" className="mb-2 block text-xs uppercase tracking-wider font-medium text-muted-foreground">
                    Base Size (rem)
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input 
                      id="base-size" 
                      type="number" 
                      defaultValue="1" 
                      min="0.75" 
                      max="1.25" 
                      step="0.05" 
                      className="w-24"
                    />
                    <div className="text-sm text-muted-foreground">Root size</div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="scale-ratio" className="mb-2 block text-xs uppercase tracking-wider font-medium text-muted-foreground">
                    Scale Ratio
                  </Label>
                  <div className="flex items-center gap-4">
                    <Select defaultValue="1.2">
                      <SelectTrigger id="scale-ratio" className="w-24">
                        <SelectValue placeholder="Ratio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1.125">Minor Third (1.125)</SelectItem>
                        <SelectItem value="1.2">Major Third (1.2)</SelectItem>
                        <SelectItem value="1.25">Perfect Fourth (1.25)</SelectItem>
                        <SelectItem value="1.333">Perfect Fifth (1.333)</SelectItem>
                        <SelectItem value="1.414">Augmented Fifth (1.414)</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="text-sm text-muted-foreground">Size progression</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-start">
                <Button size="sm" className="mr-2">Apply Changes</Button>
                <Button size="sm" variant="outline">Reset Defaults</Button>
              </div>
            </div>
              
            <div className="text-sm text-muted-foreground mb-4">
              <p>Adjust the base size and scale ratio to see how changes propagate through all three typography systems. Our dynamic approach allows for coordinated adjustments across all scales while maintaining proportional relationships.</p>
            </div>
          </CardContent>
        </Card>

        {/* Type Scales Section - Full Width */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Type Scales</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Semantic Scale</CardTitle>
                <CardDescription>Purpose-driven, focused on content role</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-3">
                    <div className="text-4xl font-bold">Display</div>
                    <p className="text-sm text-muted-foreground mt-1">Hero sections, major headlines</p>
                  </div>
                  <div className="border-b pb-3">
                    <div className="text-3xl font-semibold">Title</div>
                    <p className="text-sm text-muted-foreground mt-1">Page headers, section dividers</p>
                  </div>
                  <div className="border-b pb-3">
                    <div className="text-2xl font-semibold">Heading</div>
                    <p className="text-sm text-muted-foreground mt-1">Content section headers</p>
                  </div>
                  <div className="border-b pb-3">
                    <div className="text-xl font-medium">Subheading</div>
                    <p className="text-sm text-muted-foreground mt-1">Subsection headers, card titles</p>
                  </div>
                  <div className="border-b pb-3">
                    <div className="text-base">Body</div>
                    <p className="text-sm text-muted-foreground mt-1">Primary content text</p>
                  </div>
                  <div className="border-b pb-3">
                    <div className="text-sm">Caption</div>
                    <p className="text-sm text-muted-foreground mt-1">Helper text, metadata, labels</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">HTML Elements</CardTitle>
                <CardDescription>Semantic HTML foundation for interfaces</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <h1 className="text-4xl font-bold">Heading 1</h1>
                    <p className="text-sm text-muted-foreground mt-1">4xl / Bold / 2.25rem</p>
                  </div>
                  <div className="border-b pb-2">
                    <h2 className="text-3xl font-bold">Heading 2</h2>
                    <p className="text-sm text-muted-foreground mt-1">3xl / Bold / 1.875rem</p>
                  </div>
                  <div className="border-b pb-2">
                    <h3 className="text-2xl font-bold">Heading 3</h3>
                    <p className="text-sm text-muted-foreground mt-1">2xl / Bold / 1.5rem</p>
                  </div>
                  <div className="border-b pb-2">
                    <h4 className="text-xl font-semibold">Heading 4</h4>
                    <p className="text-sm text-muted-foreground mt-1">xl / Semibold / 1.25rem</p>
                  </div>
                  <div className="border-b pb-2">
                    <h5 className="text-lg font-semibold">Heading 5</h5>
                    <p className="text-sm text-muted-foreground mt-1">lg / Semibold / 1.125rem</p>
                  </div>
                  <div className="border-b pb-2">
                    <h6 className="text-base font-semibold">Heading 6</h6>
                    <p className="text-sm text-muted-foreground mt-1">base / Semibold / 1rem</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Content Scale</CardTitle>
                <CardDescription>Marketing & editorial typography</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-3">
                    <div className="text-5xl font-bold">Headline XL</div>
                    <p className="text-sm text-muted-foreground mt-1">Landing page heroes</p>
                  </div>
                  <div className="border-b pb-3">
                    <div className="text-4xl font-bold">Headline L</div>
                    <p className="text-sm text-muted-foreground mt-1">Article headlines</p>
                  </div>
                  <div className="border-b pb-3">
                    <div className="text-3xl font-semibold">Headline M</div>
                    <p className="text-sm text-muted-foreground mt-1">Section headers</p>
                  </div>
                  <div className="border-b pb-3">
                    <div className="text-2xl font-semibold">Headline S</div>
                    <p className="text-sm text-muted-foreground mt-1">Content headers</p>
                  </div>
                  <div className="border-b pb-3">
                    <div className="text-xl font-medium">Subheadline L</div>
                    <p className="text-sm text-muted-foreground mt-1">Support text</p>
                  </div>
                  <div className="border-b pb-3">
                    <div className="text-lg font-medium">Subheadline M</div>
                    <p className="text-sm text-muted-foreground mt-1">Secondary headers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-muted/30 p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">Typography System Integration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-base font-medium mb-3">System Interrelationships</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Our three typography scales work together as an integrated system:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">1</div>
                    <span><strong>Semantic Scale</strong> defines purpose, determining how text elements should function in the interface</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">2</div>
                    <span><strong>HTML Elements</strong> provide semantic meaning and accessibility for product interfaces</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">3</div>
                    <span><strong>Content Scale</strong> adds visual distinction for marketing materials and branded experiences</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-base font-medium mb-3">Mathematical Foundation</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  All three scales are built on the same mathematical foundation:
                </p>
                <pre className="bg-muted p-3 rounded-md text-xs mb-2">
{`// Example scale calculation
base = 1rem
ratio = 1.2 (major third)
h6 = base × ratio⁰ = 1rem
h5 = base × ratio¹ = 1.2rem
h4 = base × ratio² = 1.44rem
...and so on`}
                </pre>
                <p className="text-sm text-muted-foreground">
                  This mathematical approach ensures consistent proportions across all our typography systems while allowing for dynamic adjustments through the scale controls.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Colors Section - Two-Column Layout */}
      <section
        id="colors"
        ref={(el) => {
          sectionRefs.current["colors"] = el;
          return undefined;
        }}
        className="mb-16"
      >
        <div className="flex items-center gap-2 mb-8">
          <SwatchIcon className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Colors</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column - 5/12 */}
          <div className="md:col-span-5">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Color System</span>
                  <Button variant="ghost" size="sm" className="opacity-0">
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert">
                  <p>
                    Our color system uses Tailwind v4's RGB format for consistent theming across light and dark modes. Colors are defined as CSS variables with space-separated RGB values:
                  </p>
                  <pre className="bg-muted p-4 rounded-md text-sm">
                    {`:root {
  --primary: 222 80% 50%;  /* hsl(222, 80%, 50%) */
  --background: 0 0% 98%;  /* hsl(0, 0%, 98%) */
}

.text-primary {
  color: rgb(var(--primary));
}

/* With opacity */
.bg-primary-50 {
  background-color: rgb(var(--primary) / 0.5);
}`}
                  </pre>
                  <p>
                    This approach allows for seamless theme switching and opacity modifications while maintaining a consistent visual language.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - 7/12 */}
          <div className="md:col-span-7">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Color Palette</span>
                  <Button variant="ghost" size="sm" className="opacity-0">
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Theme Colors</h3>
                      <ul className="space-y-2">
                        <li className="grid grid-cols-[1fr_auto]">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded bg-background"></div>
                            <span>Background</span>
                          </div>
                          <code className="text-xs bg-muted px-2 py-1 rounded">var(--background)</code>
                        </li>
                        <li className="grid grid-cols-[1fr_auto]">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded bg-foreground"></div>
                            <span>Foreground</span>
                          </div>
                          <code className="text-xs bg-muted px-2 py-1 rounded">var(--foreground)</code>
                        </li>
                        <li className="grid grid-cols-[1fr_auto]">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded bg-primary"></div>
                            <span>Primary</span>
                          </div>
                          <code className="text-xs bg-muted px-2 py-1 rounded">var(--primary)</code>
                        </li>
                        <li className="grid grid-cols-[1fr_auto]">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded bg-secondary"></div>
                            <span>Secondary</span>
                          </div>
                          <code className="text-xs bg-muted px-2 py-1 rounded">var(--secondary)</code>
                        </li>
                        <li className="grid grid-cols-[1fr_auto]">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded bg-muted"></div>
                            <span>Muted</span>
                          </div>
                          <code className="text-xs bg-muted px-2 py-1 rounded">var(--muted)</code>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-3">UI Colors</h3>
                      <ul className="space-y-2">
                        <li className="grid grid-cols-[1fr_auto]">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded bg-card"></div>
                            <span>Card</span>
                          </div>
                          <code className="text-xs bg-muted px-2 py-1 rounded">var(--card)</code>
                        </li>
                        <li className="grid grid-cols-[1fr_auto]">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded bg-destructive"></div>
                            <span>Destructive</span>
                          </div>
                          <code className="text-xs bg-muted px-2 py-1 rounded">var(--destructive)</code>
                        </li>
                        <li className="grid grid-cols-[1fr_auto]">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded bg-border"></div>
                            <span>Border</span>
                          </div>
                          <code className="text-xs bg-muted px-2 py-1 rounded">var(--border)</code>
                        </li>
                        <li className="grid grid-cols-[1fr_auto]">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded bg-accent"></div>
                            <span>Accent</span>
                          </div>
                          <code className="text-xs bg-muted px-2 py-1 rounded">var(--accent)</code>
                        </li>
                        <li className="grid grid-cols-[1fr_auto]">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded bg-primary-foreground"></div>
                            <span>Primary Text</span>
                          </div>
                          <code className="text-xs bg-muted px-2 py-1 rounded">var(--primary-foreground)</code>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Color Scale</h3>
                    <div className="flex">
                      {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((weight) => (
                        <div 
                          key={weight} 
                          className="flex-1"
                          style={{
                            backgroundColor: `rgb(var(--primary) / ${weight === 500 ? 1 : weight / 1000})`,
                            height: "2.5rem",
                          }}
                        >
                          <div className="text-center text-xs text-primary-foreground mt-2">{weight}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional sections with similar two-column layout structure */}
      {/* ... existing code for other sections ... */}
    </div>
  );

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header bar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="flex h-14 items-center px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <CubeIcon className="h-5 w-5 text-primary" />
            Workhorse Design System
          </Link>
          <button
            className="ml-auto md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </button>
          
          {/* Add theme toggle and version in header */}
          <div className="hidden md:flex items-center ml-auto gap-2">
            <span className="text-sm text-muted-foreground">v1.0</span>
            <UI.ThemeSwitcher />
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background md:hidden">
          <div className="flex flex-col h-full p-4 pt-20">
            <nav className="mb-8">
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={cn(
                        "flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                        activeSection === section.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      )}
                    >
                      <section.icon className="h-5 w-5" />
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Main layout - 2 column grid */}
      <div className="grid md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="hidden md:block border-r border-border h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto p-4 bg-background">
          <nav>
            {/* Section navigation with visual indicators */}
            <div className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "flex items-center w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <section.icon className="h-4 w-4 mr-2" />
                  {section.title}
                </button>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-border">
              <div className="px-3 mb-2 text-xs uppercase text-muted-foreground font-medium tracking-wider">Resources</div>
              <div className="space-y-1">
                <button className="flex items-center w-full text-left px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Download
                </button>
                <button className="flex items-center w-full text-left px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <GlobeAltIcon className="h-4 w-4 mr-2" />
                  Repository
                </button>
                <button className="flex items-center w-full text-left px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <QuestionMarkCircleIcon className="h-4 w-4 mr-2" />
                  Support
                </button>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="p-6 lg:p-8 xl:p-10">
          {mainContent}
        </main>
      </div>
    </div>
  );
};

export default DesignSystemDocsPage; 