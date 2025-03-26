import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/Card';
import { useNavigate } from 'react-router-dom';

interface ServiceCategory {
  title: string;
  services: string[];
  icon: React.ReactNode;
}

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  const serviceCategories: ServiceCategory[] = [
    {
      title: 'Branding & Identity',
      services: [
        'AI-Enhanced Brand Strategy',
        'Visual Identity Systems',
        'Generative AI Design & Identity',
        'Naming, Messaging & Verbal Identity',
        'AI-Powered Brand Audits'
      ],
      icon: (
        <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: 'Digital & Web',
      services: [
        'Growth-Driven Website Design',
        'E-Commerce & Digital Platforms',
        'UX/UI & Interaction Design',
        'No-Code & AI-Driven Site Development',
        'AI-Powered Content Personalization'
      ],
      icon: (
        <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: 'Print, Packaging & Production',
      services: [
        'Editorial & Print Design',
        'Packaging Design & Product Branding',
        'Exhibition & Environmental Graphics',
        'Fabrication Consulting'
      ],
      icon: (
        <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: 'Placemaking & Experience Design',
      services: [
        'Retail & Branded Spaces',
        'Event & Exhibition Design',
        'Wayfinding & Environmental Systems',
        'Cultural & Public Space Branding'
      ],
      icon: (
        <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: 'AI-Driven Marketing & Campaigns',
      services: [
        'Automated Marketing Execution',
        'Creative Direction & Art Direction',
        'AI-Powered Content & Copywriting',
        'Ad Creative & Social Media Strategy',
        'Performance-Driven Refinements'
      ],
      icon: (
        <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      )
    },
    {
      title: 'Innovation & Future Thinking',
      services: [
        'AI & Human Collaboration Models',
        'Speculative Design & Trend Forecasting',
        'Creative R&D & Emerging Tech Integration',
        'Adaptive Design Systems'
      ],
      icon: (
        <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Positioning Statement */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-muted-foreground">
            Workhorse isn't just another branding agency—it's a strategic, AI-enhanced creative engine where brands evolve in real-time, with precision, artistry, and intelligence.
          </p>
        </div>

        {/* Service Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {serviceCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full p-8">
                <div className="mb-6">
                  <div className="mb-4">{category.icon}</div>
                  <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                </div>

                <ul className="space-y-4 mb-8">
                  {category.services.map((service) => (
                    <li key={service} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-primary mr-2 flex-shrink-0"
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
                      {service}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* AI as a Concierge Section */}
        <div className="bg-card p-10 rounded-xl shadow-lg mb-16">
          <h2 className="text-3xl font-bold mb-6">AI as a Concierge, Not Just a Tool</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg mb-4">
                Workhorse isn't AI replacing humans—it's AI empowering human expertise.
              </p>
              <p className="text-lg mb-4">
                Real-time collaboration where AI, designers, and strategists co-exist to elevate branding.
              </p>
            </div>
            <div>
              <p className="text-lg mb-4">
                AI continuously improves and adapts branding strategies based on live data and user engagement.
              </p>
              <p className="text-lg mb-4">
                We build brands that don't just exist—they adapt, grow, and perform across every touchpoint.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Brand?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Experience the future of branding with our AI-enhanced creative services
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/onboarding')}
            className="text-lg px-8 py-6"
          >
            Start Your Brand Journey →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage; 