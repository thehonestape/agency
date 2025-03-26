import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronUp, ChevronDown, ArrowRight } from 'lucide-react';
import UIBlockPreview from '@/components/ui-blocks/UIBlockPreview';
import HeroBasic from '@/components/ui-blocks/HeroBasic';
import FeatureSection from '@/components/ui-blocks/FeatureSection';
import CTASection from '@/components/ui-blocks/CTASection';
import TestimonialSection from '@/components/ui-blocks/TestimonialSection';
import StatsSection from '@/components/ui-blocks/StatsSection';
import PricingSection from '@/components/ui-blocks/PricingSection';
import Header from '@/components/layouts/Header';

// Sample code strings for demonstration
const heroBasicCode = `import React from 'react';
import { Button } from '@/components/ui/button';

export function HeroBasic() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Deploy to the cloud with confidence
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button>Get started</Button>
            <Button variant="link" className="text-sm font-semibold leading-6 text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}`;

const featureSectionCode = `import React from 'react';
import { CheckCircle } from 'lucide-react';

export function FeatureSection() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Everything you need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">No server? No problem.</p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis.
          </p>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="inline font-semibold text-gray-900">
                  <CheckCircle className="absolute left-1 top-1 h-5 w-5 text-primary" aria-hidden="true" />
                  {feature.name}
                </dt>{' '}
                <dd className="inline text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    name: 'Push to deploy',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.',
  },
  {
    name: 'SSL certificates',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt qui irure qui lorem cupidatat.',
  },
  // More features...
];`;

const ctaSectionCode = `import React from 'react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Boost your productivity today.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur
            commodo do ea.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button>
              Get started
            </Button>
            <Button variant="link" className="text-white">
              Learn more <span aria-hidden="true">→</span>
            </Button>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#gradient)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="gradient">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}`;

const testimonialSectionCode = `import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

export function TestimonialSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by thousands of developers worldwide
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Read what our customers have to say about our products and services.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex flex-col justify-between bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-200">
              <div>
                <Quote className="h-6 w-6 text-primary/60 mb-3" />
                <p className="text-lg font-medium leading-8 text-gray-900">
                  "{testimonial.content}"
                </p>
              </div>
              <div className="mt-8 flex items-center gap-x-4">
                <Avatar className="h-12 w-12 rounded-full">
                  <AvatarImage src={testimonial.author.image} alt={testimonial.author.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {testimonial.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author.name}</div>
                  <div className="text-gray-600">{testimonial.author.role}, {testimonial.author.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    id: '1',
    content: "This platform has completely transformed how we build web applications.",
    author: {
      name: 'Sarah Chen',
      role: 'CTO',
      company: 'Nimbus Tech',
      image: '/placeholders/avatar-1.jpg',
    },
  },
  // More testimonials...
];`;

const statsSectionCode = `import React from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, MinusIcon } from '@heroicons/react/24/solid';

export function StatsSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Last 30 days</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Key metrics to help you track performance across your business
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-sm font-medium leading-6 text-gray-600">{stat.name}</p>
              <p className="mt-2 flex items-baseline gap-x-2">
                <span className="text-4xl font-semibold tracking-tight text-gray-900">{stat.value}</span>
              </p>
              <div className="mt-4 flex items-center text-xs">
                {stat.change > 0 ? (
                  <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" aria-hidden="true" />
                ) : (
                  <ArrowTrendingDownIcon className="h-4 w-4 text-red-600" aria-hidden="true" />
                )}
                <span className={\`ml-1 text-sm font-medium \${
                  stat.change > 0 ? 'text-green-600' : 'text-red-600'
                }\`}>
                  {Math.abs(stat.change)}%
                </span>
                <span className="ml-1 text-sm text-gray-500">from last month</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const stats = [
  { id: '1', name: 'Total Revenue', value: '$45,231', change: 12.3 },
  { id: '2', name: 'New Customers', value: '2,463', change: 5.4 },
  { id: '3', name: 'Active Users', value: '18,472', change: 2.8 },
  { id: '4', name: 'Conversion Rate', value: '3.6%', change: -0.4 },
];`;

const pricingSectionCode = `import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckIcon } from 'lucide-react';

export function PricingSection() {
  const [isAnnual, setIsAnnual] = React.useState(true);

  const handleBillingToggle = () => {
    setIsAnnual(!isAnnual);
  };

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose the plan that's right for your business. All plans include a 14-day free trial.
          </p>
        </div>
        
        {/* Billing toggle */}
        <div className="mt-12 flex justify-center">
          <div className="relative flex items-center rounded-full p-1 bg-gray-100">
            <button
              type="button"
              className={\`flex items-center rounded-full py-2 px-6 text-sm font-medium \${
                !isAnnual 
                  ? 'bg-white shadow-sm text-gray-900' 
                  : 'text-gray-500 hover:text-gray-700'
              }\`}
              onClick={handleBillingToggle}
            >
              Monthly
            </button>
            <button
              type="button"
              className={\`flex items-center rounded-full py-2 px-6 text-sm font-medium \${
                isAnnual 
                  ? 'bg-white shadow-sm text-gray-900' 
                  : 'text-gray-500 hover:text-gray-700'
              }\`}
              onClick={handleBillingToggle}
            >
              Annually<span className="ml-2 text-primary text-xs font-bold">Save 20%</span>
            </button>
          </div>
        </div>
        
        {/* Pricing tiers */}
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
          {pricingTiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={\`flex flex-col rounded-3xl p-8 \${
                tier.popular
                  ? 'z-10 ring-1 ring-gray-900/10 lg:bg-gray-50 lg:shadow-md'
                  : 'border-t border-gray-200 lg:border-t-0 lg:border-l lg:border-r lg:border-gray-200'
              } \${
                tierIdx === 0 ? 'lg:rounded-l-3xl lg:rounded-r-none' : ''
              } \${
                tierIdx === pricingTiers.length - 1 ? 'lg:rounded-r-3xl lg:rounded-l-none' : ''
              }\`}
            >
              {tier.popular && (
                <div className="absolute inset-x-8 -top-3 flex justify-center">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                    Most popular
                  </span>
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-semibold leading-8 text-gray-900">{tier.name}</h3>
                <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {isAnnual ? tier.price.annually : tier.price.monthly}
                  </span>
                  <span className="ml-1 text-sm font-semibold leading-6 text-gray-600">
                    {isAnnual ? '/year' : '/month'}
                  </span>
                </p>
                <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex gap-x-3">
                      {feature.included ? (
                        <CheckIcon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                      ) : (
                        <div className="h-5 w-5 flex-none" />
                      )}
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                variant={tier.popular ? 'default' : 'outline'}
                className="mt-8 w-full"
              >
                {tier.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const pricingTiers = [
  {
    id: 'starter',
    name: 'Starter',
    price: {
      monthly: '$15',
      annually: '$144',
    },
    description: 'Everything you need to get started.',
    features: [
      { included: true, text: 'Up to 5 projects' },
      { included: true, text: '1 team member' },
      { included: true, text: '5GB storage' },
      { included: false, text: 'Advanced analytics' },
      { included: false, text: 'Priority support' },
    ],
    buttonText: 'Get started',
  },
  {
    id: 'professional',
    name: 'Professional',
    price: {
      monthly: '$49',
      annually: '$468',
    },
    description: 'Perfect for small teams.',
    features: [
      { included: true, text: 'Unlimited projects' },
      { included: true, text: 'Up to 10 team members' },
      { included: true, text: '50GB storage' },
      { included: true, text: 'Advanced analytics' },
      { included: false, text: 'Priority support' },
    ],
    buttonText: 'Get started',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: {
      monthly: '$99',
      annually: '$948',
    },
    description: 'For larger organizations.',
    features: [
      { included: true, text: 'Unlimited projects' },
      { included: true, text: 'Unlimited team members' },
      { included: true, text: '500GB storage' },
      { included: true, text: 'Advanced analytics' },
      { included: true, text: 'Priority support' },
    ],
    buttonText: 'Contact sales',
  },
];`;

// Define sections for easier navigation
const sections = [
  { id: 'hero-sections', title: 'Hero Sections', component: HeroBasic, code: heroBasicCode, description: 'A simple centered hero section with a headline, description, and call-to-action buttons.', name: 'Basic Hero' },
  { id: 'feature-sections', title: 'Feature Sections', component: FeatureSection, code: featureSectionCode, description: 'A feature section with a grid layout showcasing multiple features with icons.', name: 'Feature Grid' },
  { id: 'testimonial-sections', title: 'Testimonial Sections', component: TestimonialSection, code: testimonialSectionCode, description: 'A testimonial section displaying customer reviews in a responsive grid layout.', name: 'Testimonial Section' },
  { id: 'cta-sections', title: 'CTA Sections', component: CTASection, code: ctaSectionCode, description: 'A call-to-action section with a gradient background and centered content.', name: 'Gradient CTA' },
  { id: 'stats-sections', title: 'Stats Sections', component: StatsSection, code: statsSectionCode, description: 'A metrics section displaying key performance indicators with trend indicators.', name: 'Stats Section' },
  { id: 'pricing-sections', title: 'Pricing Sections', component: PricingSection, code: pricingSectionCode, description: 'A pricing section with multiple tiers and toggle between monthly and annual billing.', name: 'Pricing Section' },
];

export default function UIBlocksDemo() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [showTableOfContents, setShowTableOfContents] = useState(true);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    // Initialize section refs
    sections.forEach(section => {
      sectionRefs.current[section.id] = document.getElementById(section.id);
    });

    // Update active section on scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = sectionRefs.current[section.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

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
              <h1 className="text-3xl font-bold">UI Blocks Demo</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link to="/ui-blocks/documentation">
                  View Documentation
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowTableOfContents(!showTableOfContents)}
                className="flex items-center gap-1"
              >
                {showTableOfContents ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                {showTableOfContents ? 'Hide' : 'Show'} Table of Contents
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Table of Contents - Desktop sidebar, Mobile dropdown */}
            {showTableOfContents && (
              <aside className="lg:col-span-3 bg-muted/20 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        activeSection === section.id
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      {section.title}
                      {activeSection === section.id && <ArrowRight className="inline-block h-3 w-3 ml-2" />}
                    </button>
                  ))}
                </nav>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    These UI blocks are fully responsive and customizable. You can copy the code or preview them at different screen sizes.
                  </p>
                </div>
              </aside>
            )}
            
            {/* Main Content */}
            <div className={`${showTableOfContents ? 'lg:col-span-9' : 'lg:col-span-12'}`}>
              <p className="text-muted-foreground mb-8">
                This page demonstrates the UI blocks we've implemented. You can view the live preview and inspect the code for each component.
              </p>
              
              <div className="space-y-16">
                {sections.map((section) => {
                  const Component = section.component;
                  return (
                    <section key={section.id} id={section.id} ref={el => sectionRefs.current[section.id] = el}>
                      <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
                      <UIBlockPreview 
                        title={section.name} 
                        description={section.description}
                        codeString={section.code}
                      >
                        <Component />
                      </UIBlockPreview>
                    </section>
                  );
                })}
              </div>
              
              <div className="flex justify-between items-center mt-12 pt-8 border-t">
                <Button variant="outline" asChild>
                  <Link to="/ui-blocks">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to All UI Blocks
                  </Link>
                </Button>
                <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Back to Top
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 