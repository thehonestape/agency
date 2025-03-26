import React from 'react';
import { ThemeProvider } from '../themes/providers/ThemeContext';
import { useTheme } from '../hooks/useTheme';
import Container from '../components/core/layout/Container';
import Button from '../components/core/inputs/Button';
import Card from '../components/patterns/cards/Card';
import FeatureCard from '../components/blocks/features/FeatureCard';
import FeatureSection from '../components/blocks/features/FeatureSection';
import { FiLayers, FiPenTool, FiCompass, FiCode, FiZap, FiBarChart2 } from 'react-icons/fi';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <div style={{ marginBottom: '2rem', textAlign: 'right' }}>
      <Button 
        variant="outline" 
        onClick={() => setTheme(theme.name === 'salient' 
          ? require('../themes/protocol/theme.config').default 
          : require('../themes/salient/theme.config').default
        )}
      >
        Switch to {theme.name === 'salient' ? 'Dark' : 'Light'} Theme
      </Button>
    </div>
  );
};

const FeatureShowcase = () => {
  const { theme } = useTheme();
  
  // Sample features data
  const features = [
    {
      title: 'Component Registry',
      description: 'Central registry for component discovery and management with powerful search capabilities.',
      icon: <FiLayers size={24} />,
      iconBg: theme.colors.primary,
      ctaText: 'Explore Registry',
    },
    {
      title: 'Theme System',
      description: 'Robust theming system with token standardization and theme switching capabilities.',
      icon: <FiPenTool size={24} />,
      iconBg: theme.colors.accent,
      ctaText: 'View Themes',
    },
    {
      title: 'AI Generation',
      description: 'Generate components from text descriptions or images using AI assistance.',
      icon: <FiZap size={24} />,
      iconBg: theme.colors.secondary,
      ctaText: 'Try AI Generation',
    },
    {
      title: 'Composition Engine',
      description: 'Combine components into layouts with grid, flex, and stack arrangements.',
      icon: <FiCompass size={24} />,
      iconBg: theme.colors.warning,
      ctaText: 'Learn Composition',
    },
    {
      title: 'Type Safety',
      description: 'Full TypeScript support with interfaces for props, styles, and behaviors.',
      icon: <FiCode size={24} />,
      iconBg: theme.colors.success,
      ctaText: 'View Types',
    },
    {
      title: 'Performance',
      description: 'Optimized for performance with efficient rendering and minimal re-renders.',
      icon: <FiBarChart2 size={24} />,
      iconBg: theme.colors.danger,
      ctaText: 'Performance Guide',
    },
  ];
  
  return (
    <div style={{ 
      backgroundColor: theme.colors.background, 
      color: theme.colors.text,
      minHeight: '100vh',
    }}>
      <Container>
        <ThemeSwitcher />
        
        <section style={{ marginBottom: theme.spacing.xxl }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: theme.colors.primary,
          }}>
            Component System Showcase
          </h1>
          
          <p style={{ 
            fontSize: '1.25rem',
            color: theme.colors.muted,
            marginBottom: theme.spacing.xl,
          }}>
            This page demonstrates the component system in action, showcasing different levels of the hierarchy.
          </p>
          
          {/* Core Components Section */}
          <div style={{ marginBottom: theme.spacing.xl }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold',
              marginBottom: theme.spacing.md,
            }}>
              Core Components
            </h2>
            
            <Card padding={theme.spacing.lg}>
              <h3 style={{ marginBottom: theme.spacing.md }}>Button Variants</h3>
              <div style={{ display: 'flex', gap: theme.spacing.md, flexWrap: 'wrap' }}>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
              
              <h3 style={{ marginTop: theme.spacing.lg, marginBottom: theme.spacing.md }}>Button Sizes</h3>
              <div style={{ display: 'flex', gap: theme.spacing.md, flexWrap: 'wrap', alignItems: 'center' }}>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </Card>
          </div>
          
          {/* Pattern Components Section */}
          <div style={{ marginBottom: theme.spacing.xl }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold',
              marginBottom: theme.spacing.md,
            }}>
              Pattern Components
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: theme.spacing.lg }}>
              <Card 
                variant="default" 
                title="Default Card" 
                description="This is a default card with a border and light shadow."
              >
                <p>Card content goes here.</p>
              </Card>
              
              <Card 
                variant="elevated" 
                title="Elevated Card" 
                description="This card has a stronger shadow for emphasis."
              >
                <p>Card content goes here.</p>
              </Card>
              
              <Card 
                variant="outlined" 
                title="Outlined Card" 
                description="This card has only an outline border."
              >
                <p>Card content goes here.</p>
              </Card>
              
              <Card 
                variant="filled" 
                title="Filled Card" 
                description="This card has a subtle background fill."
              >
                <p>Card content goes here.</p>
              </Card>
            </div>
          </div>
          
          {/* Block Components Section */}
          <div style={{ marginBottom: theme.spacing.xl }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold',
              marginBottom: theme.spacing.md,
            }}>
              Block Components
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: theme.spacing.lg }}>
              <FeatureCard
                title="Feature Card"
                description="This is a standalone feature card component."
                icon={<FiLayers size={24} />}
                ctaText="Learn More"
              />
            </div>
          </div>
        </section>
      </Container>
      
      {/* Full FeatureSection Block */}
      <FeatureSection
        title="Our Amazing Features"
        subtitle="Discover the powerful capabilities of our modular component system."
        features={features}
        columns={3}
        centered={true}
      />
    </div>
  );
};

const FeatureShowcaseWithTheme = () => (
  <ThemeProvider>
    <FeatureShowcase />
  </ThemeProvider>
);

export default FeatureShowcaseWithTheme; 