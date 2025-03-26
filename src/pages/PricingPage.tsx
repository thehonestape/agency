import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/Card';
import { useNavigate } from 'react-router-dom';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}

const PricingPage: React.FC = () => {
  const navigate = useNavigate();

  const tiers: PricingTier[] = [
    {
      name: 'Foundation',
      price: '$5,000',
      description: 'AI-generated branding & instant site launch',
      features: [
        'AI-Assisted Brand Strategy',
        'Visual Identity System',
        'Basic Website Development',
        'Social Media Templates',
        'Brand Guidelines',
        'Email Support'
      ],
      cta: 'Get Started'
    },
    {
      name: 'Growth',
      price: '$15,000',
      description: 'Full AI-powered brand creation with SSOT integration',
      features: [
        'Everything in Foundation',
        'AI Brand Concierge',
        'Advanced Brand Strategy',
        'Custom Web Development',
        'Brand Voice Development',
        'Content Strategy',
        'AI-Powered Analytics',
        'Priority Support'
      ],
      cta: 'Contact Sales',
      highlight: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Ongoing AI-powered brand consulting',
      features: [
        'Everything in Growth',
        'Single Source of Truth (SSOT)',
        'Dedicated Brand Manager',
        'Custom AI Training',
        'API Integration',
        'Live Brand Updates',
        'White-label Options',
        '24/7 Support'
      ],
      cta: 'Contact Sales'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">AI-Enhanced Brand Development</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We don't chase authenticity—it's where we start. Great brands aren't just built; they're crafted, refined, and evolved over time with AI assistance.
          </p>
        </div>

        {/* Guiding Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Be Proactive",
              description: "Take initiative and drive progress. Embrace big moments and meaningful results."
            },
            {
              title: "Be Curious",
              description: "Explore new ideas, collaborate with experts, and blend disciplines to create innovative solutions."
            },
            {
              title: "Be Thoughtful",
              description: "Balance creative exploration with practical refinement. Shape ideas into impactful, well-rounded design."
            }
          ].map((principle, i) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-lg p-6 shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">{principle.title}</h3>
              <p className="text-muted-foreground">{principle.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Pricing Tiers */}
        <h2 className="text-3xl font-bold text-center mb-8">Pricing Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              {tier.highlight && (
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <span className="bg-primary text-white text-sm py-1 px-4 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <Card 
                className={`h-full p-8 flex flex-col ${tier.highlight ? 'border-primary ring-1 ring-primary' : ''}`}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">{tier.name}</h2>
                  <div className="text-4xl font-bold mb-2">{tier.price}</div>
                  <p className="text-muted-foreground">{tier.description}</p>
                </div>

                <ul className="flex-1 space-y-4 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-primary mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${tier.highlight ? 'bg-primary hover:bg-primary/90' : ''}`}
                  onClick={() => {
                    if (tier.name === 'Foundation') {
                      navigate('/onboarding');
                    } else {
                      // Handle contact sales
                      window.location.href = 'mailto:sales@workhorse.ai';
                    }
                  }}
                >
                  {tier.cta}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Process Framework */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">AI-Driven Process Framework</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-3">Discovery</h3>
                <p className="text-muted-foreground mb-3">
                  AI-assisted research, stakeholder interviews, competitive analysis, cultural and institutional insights
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Brand Strategy', 'Research Report', 'Creative Brief', 'Interactive Knowledge Archives'].map(item => (
                    <span key={item} className="bg-muted px-2 py-1 rounded text-sm">{item}</span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3">Definition</h3>
                <p className="text-muted-foreground mb-3">
                  Content architecture, interactive storytelling mapping, brand positioning strategy
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Moodboards', 'UX/UI Wireframes', 'IA Documentation', 'Experience Mapping'].map(item => (
                    <span key={item} className="bg-muted px-2 py-1 rounded text-sm">{item}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-3">Design</h3>
                <p className="text-muted-foreground mb-3">
                  Visual identity systems, generative branding, digital/print/physical design, AI-integrated prototyping
                </p>
                <div className="flex flex-wrap gap-2">
                  {['High-Fidelity Designs', 'Prototypes', 'Adaptive Branding Assets', 'AI-Powered Style Guides'].map(item => (
                    <span key={item} className="bg-muted px-2 py-1 rounded text-sm">{item}</span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3">Development</h3>
                <p className="text-muted-foreground mb-3">
                  System implementation, frontend and backend development, environmental branding, exhibition production
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Live Website', 'AI-Powered Brand API', 'Print & Exhibition Installations', 'AI-Driven Interactive Spaces'].map(item => (
                    <span key={item} className="bg-muted px-2 py-1 rounded text-sm">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Single Source of Truth */}
        <div className="bg-card p-10 rounded-xl shadow-lg mb-16">
          <h2 className="text-3xl font-bold mb-6">The Single Source of Truth (SSOT) & AI Alignment</h2>
          <p className="text-lg mb-6">
            Branding has always been about truth—aligning intention, communication, and execution. The AI-powered Single Source of Truth (SSOT) ensures that branding is not fragmented but strategically cohesive.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>
                <span className="font-semibold">Centralized & Consistent:</span> AI maintains and adapts a dynamic brand system that updates as a single, accessible entity across all platforms.
              </p>
            </div>
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>
                <span className="font-semibold">Strategically Cohesive:</span> AI refines brand positioning by aligning market insights, institutional knowledge, and cultural relevance.
              </p>
            </div>
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>
                <span className="font-semibold">Always True to Intent:</span> Ensures design, messaging, and campaigns all reinforce the brand's foundational story.
              </p>
            </div>
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>
                <span className="font-semibold">AI-Assisted, Human-Led:</span> AI suggests optimizations, but strategic vision remains human-driven and creatively directed.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            With AI as a strategic partner, not a replacement, Workhorse ensures that branding, design, digital execution, and experiential storytelling remain artful, intelligent, and continually evolving.
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/onboarding')}
            className="text-lg px-8 py-6"
          >
            Begin Your Brand Evolution →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage; 