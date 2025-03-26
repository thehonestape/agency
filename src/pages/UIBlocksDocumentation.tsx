import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Info, Book, Code, Palette, Layers, ArrowRight } from 'lucide-react';
import Header from '@/components/layouts/Header';

// Documentation tabs
type Tab = 'usage' | 'props' | 'theming' | 'responsive';

// Component documentation data
const components = [
  {
    id: 'hero-basic',
    name: 'Hero Basic',
    description: 'A simple centered hero section with a headline, description, and call-to-action buttons.',
    category: 'Hero Sections',
    usage: `// Import the component
import { HeroBasic } from '@/components/ui-blocks/HeroBasic';

// Use in your page or layout
<HeroBasic />

// The component accepts optional props to customize content
<HeroBasic 
  title="Custom Title" 
  description="Your custom description here."
  primaryCTA="Get Started"
  secondaryCTA="Learn More"
  onPrimaryClick={() => console.log('Primary CTA clicked')}
  onSecondaryClick={() => console.log('Secondary CTA clicked')}
/>`,
    props: [
      { name: 'title', type: 'string', default: '"Deploy to the cloud with confidence"', description: 'The main headline of the hero section' },
      { name: 'description', type: 'string', default: '"Anim aute id magna aliqua..."', description: 'The supporting text below the main headline' },
      { name: 'primaryCTA', type: 'string', default: '"Get started"', description: 'Text for the primary call-to-action button' },
      { name: 'secondaryCTA', type: 'string', default: '"Learn more"', description: 'Text for the secondary call-to-action button' },
      { name: 'onPrimaryClick', type: '() => void', default: 'undefined', description: 'Function called when the primary button is clicked' },
      { name: 'onSecondaryClick', type: '() => void', default: 'undefined', description: 'Function called when the secondary button is clicked' },
    ],
    theming: `// The component uses these Tailwind classes that you can customize
- Background: bg-white
- Text: text-gray-900 (headline), text-gray-600 (description)
- Spacing: py-24, max-w-7xl, max-w-2xl

// You can override these in your own implementation
<div className="bg-primary-50 py-32">
  <HeroBasic />
</div>

// Or modify the component's source code directly`,
    responsive: `// The component is fully responsive by default
- Padding adjusts on small screens: py-24 sm:py-32
- Font sizes adjust: text-4xl sm:text-6xl
- Content width is constrained: max-w-2xl within max-w-7xl

// Default breakpoints
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px`,
  },
  {
    id: 'feature-section',
    name: 'Feature Section',
    description: 'A feature section with a grid layout showcasing multiple features with icons.',
    category: 'Feature Sections',
    usage: `// Import the component
import { FeatureSection } from '@/components/ui-blocks/FeatureSection';

// Use in your page or layout
<FeatureSection />

// The component accepts optional props to customize content
<FeatureSection 
  headline="Everything you need"
  subheadline="No server? No problem."
  description="Your own description here."
  features={customFeatures}
/>`,
    props: [
      { name: 'headline', type: 'string', default: '"Everything you need"', description: 'The small headline above the main title' },
      { name: 'subheadline', type: 'string', default: '"No server? No problem."', description: 'The main title of the feature section' },
      { name: 'description', type: 'string', default: '"Lorem ipsum, dolor sit amet..."', description: 'The supporting text below the titles' },
      { name: 'features', type: 'Feature[]', default: 'Default features array', description: 'Array of features to display in the grid' },
    ],
    theming: `// The component uses these Tailwind classes that you can customize
- Background: bg-white
- Text: text-primary (small headline), text-gray-900 (main title), text-gray-600 (description)
- Icon color: text-primary
- Spacing: py-24, max-w-7xl

// You can customize the icon color
<FeatureSection iconClassName="text-blue-500" />`,
    responsive: `// The component is fully responsive
- Features stack in a single column on mobile: grid-cols-1 lg:grid-cols-3
- Text alignment adjusts: max-w-2xl sm:text-center
- Padding adjusts: py-24 sm:py-32

// The grid layout changes at the 'lg' breakpoint (1024px)`,
  },
  {
    id: 'testimonial-section',
    name: 'Testimonial Section',
    description: 'A testimonial section displaying customer reviews in a responsive grid layout.',
    category: 'Testimonials',
    usage: `// Import the component
import { TestimonialSection } from '@/components/ui-blocks/TestimonialSection';

// Use in your page or layout
<TestimonialSection />

// The component accepts optional props to customize content
<TestimonialSection 
  title="What our clients say"
  description="Hear from our satisfied customers." 
  testimonials={customTestimonials}
/>`,
    props: [
      { name: 'title', type: 'string', default: '"Trusted by thousands of developers worldwide"', description: 'The main headline of the testimonial section' },
      { name: 'description', type: 'string', default: '"Read what our customers have to say..."', description: 'The supporting text below the main headline' },
      { name: 'testimonials', type: 'Testimonial[]', default: 'Default testimonials array', description: 'Array of testimonial objects to display' },
      { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes to apply to the section' },
    ],
    theming: `// The component uses these Tailwind classes that you can customize
- Background: bg-white
- Card background: bg-white
- Card border: ring-1 ring-gray-200
- Text: text-gray-900 (headline), text-gray-600 (description), text-primary/60 (quote icon)
- Spacing: py-24 sm:py-32, gap-8

// You can customize the card appearance
<TestimonialSection 
  className="bg-gray-50"
  cardClassName="bg-white shadow-lg"
/>`,
    responsive: `// The component is fully responsive
- Cards stack in a single column on mobile: grid-cols-1 lg:grid-cols-3
- Text alignment adjusts: max-w-2xl text-center
- Padding adjusts: py-24 sm:py-32

// The grid layout changes at the 'lg' breakpoint (1024px)`,
  },
  {
    id: 'stats-section',
    name: 'Stats Section',
    description: 'A metrics section displaying key performance indicators with trend indicators.',
    category: 'Stats & Metrics',
    usage: `// Import the component
import StatsSection from '@/components/ui-blocks/StatsSection';

// Use in your page or layout
<StatsSection />

// The component accepts optional props to customize content
<StatsSection 
  title="Q3 Performance" 
  description="Key metrics from the previous quarter."
  stats={customStats}
  columns={3}
/>`,
    props: [
      { name: 'title', type: 'string', default: '"Last 30 days"', description: 'The main headline of the stats section' },
      { name: 'description', type: 'string', default: '"Key metrics to help you track performance..."', description: 'The supporting text below the main headline' },
      { name: 'stats', type: 'Stat[]', default: 'Default stats array', description: 'Array of stat objects to display' },
      { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes to apply to the section' },
      { name: 'columns', type: '3 | 4 | 5', default: '4', description: 'Number of columns in the grid on large screens' },
    ],
    theming: `// The component uses these Tailwind classes that you can customize
- Background: bg-white
- Card background: bg-white
- Card border: border border-gray-100
- Text: text-gray-900 (values), text-gray-600 (labels)
- Icons: text-green-600 (positive), text-red-600 (negative)
- Spacing: py-24 sm:py-32, gap-8

// You can customize the appearance
<StatsSection 
  className="bg-gray-50"
/>`,
    responsive: `// The component is fully responsive
- Stats stack in a single column on mobile: grid-cols-1
- Multiple columns on larger screens: lg:grid-cols-4
- Max width constrains on small screens: max-w-2xl
- Padding adjusts: py-24 sm:py-32

// The grid layout changes at the 'lg' breakpoint (1024px)`,
  },
  {
    id: 'pricing-section',
    name: 'Pricing Section',
    description: 'A pricing section with multiple tiers and toggle between monthly and annual billing.',
    category: 'Pricing',
    usage: `// Import the component
import PricingSection from '@/components/ui-blocks/PricingSection';

// Use in your page or layout
<PricingSection />

// The component accepts optional props to customize content
<PricingSection 
  title="Our Plans" 
  description="Find a plan that works for you."
  pricingTiers={customPricingTiers}
  annualBilling={true}
  onBillingChange={(isAnnual) => console.log('Billing changed:', isAnnual)}
/>`,
    props: [
      { name: 'title', type: 'string', default: '"Simple, transparent pricing"', description: 'The main headline of the pricing section' },
      { name: 'description', type: 'string', default: '"Choose the plan that\'s right for your business..."', description: 'The supporting text below the main headline' },
      { name: 'pricingTiers', type: 'PricingTier[]', default: 'Default pricing tiers array', description: 'Array of pricing tier objects to display' },
      { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes to apply to the section' },
      { name: 'annualBilling', type: 'boolean', default: 'true', description: 'Whether to show annual pricing by default' },
      { name: 'onBillingChange', type: '(isAnnual: boolean) => void', default: 'undefined', description: 'Function called when billing period is changed' },
    ],
    theming: `// The component uses these Tailwind classes that you can customize
- Background: bg-white
- Toggle background: bg-gray-100
- Active toggle: bg-white shadow-sm text-gray-900
- Inactive toggle: text-gray-500
- Pricing cards: ring-1 ring-gray-900/10 (popular), border-gray-200 (others)
- Popular badge: bg-primary/10 text-primary ring-primary/20
- Text: text-gray-900 (headings), text-gray-600 (descriptions)
- Button: Default variant for popular tier, outline for others

// You can customize the appearance
<PricingSection 
  className="bg-gray-50"
/>`,
    responsive: `// The component is fully responsive
- Pricing tiers stack in a single column on mobile: grid-cols-1
- Side-by-side on larger screens: lg:grid-cols-3
- Connected card borders on desktop, separate on mobile
- Max width constraints: max-w-lg (mobile), lg:max-w-4xl (desktop)
- Padding adjusts: py-24 sm:py-32

// The layout changes at the 'lg' breakpoint (1024px)`,
  },
  {
    id: 'cta-section',
    name: 'CTA Section',
    description: 'A call-to-action section with a gradient background and centered content.',
    category: 'CTA Sections',
    usage: `// Import the component
import { CTASection } from '@/components/ui-blocks/CTASection';

// Use in your page or layout
<CTASection />

// The component accepts optional props to customize content
<CTASection 
  title="Boost your productivity today."
  description="Your custom description here."
  primaryCTA="Get Started"
  secondaryCTA="Learn More"
  onPrimaryClick={() => console.log('Primary CTA clicked')}
  onSecondaryClick={() => console.log('Secondary CTA clicked')}
/>`,
    props: [
      { name: 'title', type: 'string', default: '"Boost your productivity today."', description: 'The main headline of the CTA section' },
      { name: 'description', type: 'string', default: '"Incididunt sint fugiat pariatur..."', description: 'The supporting text below the main headline' },
      { name: 'primaryCTA', type: 'string', default: '"Get started"', description: 'Text for the primary call-to-action button' },
      { name: 'secondaryCTA', type: 'string', default: '"Learn more"', description: 'Text for the secondary call-to-action button' },
      { name: 'onPrimaryClick', type: '() => void', default: 'undefined', description: 'Function called when the primary button is clicked' },
      { name: 'onSecondaryClick', type: '() => void', default: 'undefined', description: 'Function called when the secondary button is clicked' },
    ],
    theming: `// The component uses these Tailwind classes that you can customize
- Outer background: bg-white
- Inner background: bg-gray-900
- Text: text-white (headline), text-gray-300 (description)
- Gradient: defined in the SVG with stop colors #7775D6 and #E935C1

// You can customize the gradient colors
<CTASection gradientStartColor="#3b82f6" gradientEndColor="#8b5cf6" />`,
    responsive: `// The component is fully responsive
- Inner container gets rounded corners on larger screens: sm:rounded-3xl
- Padding adjusts: py-24 px-6 sm:px-16
- Text sizes adjust: text-3xl sm:text-4xl

// The rounded corners appear at the 'sm' breakpoint (640px)`,
  },
];

export default function UIBlocksDocumentation() {
  const [activeComponent, setActiveComponent] = useState(components[0].id);
  const [activeTab, setActiveTab] = useState<Tab>('usage');

  const component = components.find(c => c.id === activeComponent) || components[0];
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto py-8 px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Button variant="outline" size="sm" asChild className="mr-4">
                <Link to="/ui-blocks">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back to UI Blocks
                </Link>
              </Button>
              <h1 className="text-3xl font-bold">UI Blocks Documentation</h1>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Component Sidebar */}
            <aside className="lg:col-span-3 bg-muted/20 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Components</h2>
              <nav className="space-y-1">
                {components.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => setActiveComponent(comp.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeComponent === comp.id
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{comp.name}</span>
                      {activeComponent === comp.id && (
                        <ArrowRight className="h-3 w-3" />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{comp.category}</div>
                  </button>
                ))}
              </nav>
              <div className="mt-6 pt-4 border-t border-border">
                <h3 className="text-sm font-semibold mb-2">Getting Help</h3>
                <p className="text-xs text-muted-foreground">
                  These documentation pages provide detailed guidance on using and customizing our UI Block components. If you need further assistance, please contact our support team.
                </p>
              </div>
            </aside>
            
            {/* Main Content */}
            <div className="lg:col-span-9">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold">{component.name}</h2>
                  <p className="text-muted-foreground mt-2">{component.description}</p>
                  
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                    <Link to={`/ui-blocks/demo#${component.id}`} className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                      <Layers className="h-4 w-4" />
                      View Demo
                    </Link>
                    <Link to={`/ui-blocks/preview/${component.id}`} className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                      <Info className="h-4 w-4" />
                      Preview in Isolation
                    </Link>
                  </div>
                </div>
                
                {/* Tabs */}
                <div className="border-b mb-6">
                  <div className="flex space-x-8">
                    <button
                      onClick={() => setActiveTab('usage')}
                      className={`pb-2 text-sm font-medium flex items-center gap-1 ${
                        activeTab === 'usage'
                          ? 'border-b-2 border-primary text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Book className="h-4 w-4" />
                      Usage
                    </button>
                    <button
                      onClick={() => setActiveTab('props')}
                      className={`pb-2 text-sm font-medium flex items-center gap-1 ${
                        activeTab === 'props'
                          ? 'border-b-2 border-primary text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Code className="h-4 w-4" />
                      Props
                    </button>
                    <button
                      onClick={() => setActiveTab('theming')}
                      className={`pb-2 text-sm font-medium flex items-center gap-1 ${
                        activeTab === 'theming'
                          ? 'border-b-2 border-primary text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Palette className="h-4 w-4" />
                      Theming
                    </button>
                    <button
                      onClick={() => setActiveTab('responsive')}
                      className={`pb-2 text-sm font-medium flex items-center gap-1 ${
                        activeTab === 'responsive'
                          ? 'border-b-2 border-primary text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Layers className="h-4 w-4" />
                      Responsive
                    </button>
                  </div>
                </div>
                
                {/* Tab Content */}
                <div className="mt-4">
                  {activeTab === 'usage' && (
                    <div>
                      <h3 className="text-lg font-medium mb-4">Usage</h3>
                      <p className="mb-4">Follow these steps to use the {component.name} component in your project:</p>
                      <pre className="bg-gray-950 text-white p-4 rounded-md overflow-auto text-sm">
                        <code>{component.usage}</code>
                      </pre>
                    </div>
                  )}
                  
                  {activeTab === 'props' && (
                    <div>
                      <h3 className="text-lg font-medium mb-4">Props</h3>
                      <p className="mb-4">The {component.name} component accepts the following props:</p>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-muted/50">
                              <th className="border px-4 py-2 text-left">Prop</th>
                              <th className="border px-4 py-2 text-left">Type</th>
                              <th className="border px-4 py-2 text-left">Default</th>
                              <th className="border px-4 py-2 text-left">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {component.props.map((prop) => (
                              <tr key={prop.name} className="border-b hover:bg-muted/20">
                                <td className="border px-4 py-2 font-mono text-sm">{prop.name}</td>
                                <td className="border px-4 py-2 font-mono text-sm text-primary">{prop.type}</td>
                                <td className="border px-4 py-2 font-mono text-sm">{prop.default}</td>
                                <td className="border px-4 py-2 text-sm">{prop.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'theming' && (
                    <div>
                      <h3 className="text-lg font-medium mb-4">Theming & Customization</h3>
                      <p className="mb-4">Learn how to customize the appearance of the {component.name} component:</p>
                      <pre className="bg-gray-950 text-white p-4 rounded-md overflow-auto text-sm">
                        <code>{component.theming}</code>
                      </pre>
                    </div>
                  )}
                  
                  {activeTab === 'responsive' && (
                    <div>
                      <h3 className="text-lg font-medium mb-4">Responsive Behavior</h3>
                      <p className="mb-4">The {component.name} component is designed to work on all screen sizes:</p>
                      <pre className="bg-gray-950 text-white p-4 rounded-md overflow-auto text-sm">
                        <code>{component.responsive}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-8">
                <Button variant="outline" asChild>
                  <Link to="/ui-blocks">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to UI Blocks
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/ui-blocks/demo">
                    View Demo
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 