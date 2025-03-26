import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/Card';
import { AIAssistant } from '@/components/AIAssistant';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiBarChart, FiPieChart, FiMessageSquare, FiTrendingUp } from 'react-icons/fi';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
}

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    brandName: '',
    industry: '',
    targetAudience: '',
    brandValues: '',
    competitors: '',
    goals: ''
  });

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Workhorse AI-Native Branding',
      description: 'A smarter, continuous approach to building your brand',
      component: (
        <div className="text-center">
          <div className="mx-auto w-16 h-16 mb-6 bg-primary/10 rounded-full flex items-center justify-center">
            <FiBarChart className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">AI-Powered Brand Audit</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Unlike traditional audits that offer a one-time snapshot, Workhorse provides real-time, 
            interconnected brand analysis, ensuring your strategy, identity, and messaging stay ahead of the curve.
          </p>
          <Button onClick={() => setCurrentStep(1)}>Start Your Brand Audit →</Button>
        </div>
      )
    },
    {
      id: 'brand-basics',
      title: 'Brand Fundamentals',
      description: 'Tell us about your brand for AI-powered analysis',
      component: (
        <div className="space-y-6">
          <div className="bg-primary/10 p-4 rounded-lg mb-6">
            <p className="text-sm">
              Our AI will scan your brand assets, messaging, and positioning to provide a comprehensive audit.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Brand Name</label>
            <Input
              value={formData.brandName}
              onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
              placeholder="Enter your brand name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Industry</label>
            <Input
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              placeholder="What industry are you in?"
            />
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(0)}>Back</Button>
            <Button onClick={() => setCurrentStep(2)}>Next →</Button>
          </div>
        </div>
      )
    },
    {
      id: 'brand-audit-components',
      title: 'Brand Audit Components',
      description: 'Select which areas you want to analyze',
      component: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Visual & Design Consistency',
                description: 'Logo usage, typography, color applications, and imagery across all platforms',
                icon: <FiPieChart className="w-5 h-5" />
              },
              {
                title: 'Messaging & Tone of Voice',
                description: 'Brand voice, language consistency, and public perception tracking',
                icon: <FiMessageSquare className="w-5 h-5" />
              },
              {
                title: 'Market Positioning',
                description: 'Competitive mapping, cultural relevance, and brand differentiation analysis',
                icon: <FiBarChart className="w-5 h-5" />
              },
              {
                title: 'Performance & Engagement',
                description: 'Engagement tracking, content effectiveness, and conversion metrics',
                icon: <FiTrendingUp className="w-5 h-5" />
              }
            ].map((component, i) => (
              <div 
                key={component.title} 
                className="flex p-4 border rounded-lg hover:border-primary cursor-pointer"
                onClick={() => {/* Toggle selection logic would go here */}}
              >
                <div className="mr-4 mt-1 text-primary">
                  {component.icon}
                </div>
                <div>
                  <h3 className="font-medium">{component.title}</h3>
                  <p className="text-sm text-muted-foreground">{component.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(1)}>Back</Button>
            <Button onClick={() => setCurrentStep(3)}>Next →</Button>
          </div>
        </div>
      )
    },
    {
      id: 'insights-preview',
      title: 'AI Brand Insights Preview',
      description: 'A glimpse of what your brand audit will provide',
      component: (
        <div className="space-y-6">
          <div className="bg-muted p-5 rounded-lg">
            <h3 className="text-lg font-medium mb-3">What You'll Get From Your Brand Audit:</h3>
            <ul className="space-y-3">
              {[
                'Real-Time Brand Health Dashboard',
                'Brand Evolution Roadmap',
                'AI-Powered Competitor & Trend Reports',
                'Brand Performance Reports',
                'Cross-Platform Brand Alignment Guide'
              ].map((item) => (
                <li key={item} className="flex items-center">
                  <FiCheck className="text-primary mr-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(2)}>Back</Button>
            <Button onClick={() => navigate('/')}>Complete Setup →</Button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-muted rounded-full">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Main Content */}
        <Card className="p-8">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold mb-2">{steps[currentStep].title}</h1>
            <p className="text-muted-foreground mb-8">{steps[currentStep].description}</p>
            {steps[currentStep].component}
          </motion.div>
        </Card>

        {/* AI Assistant */}
        <div className="mt-8">
          <AIAssistant />
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage; 