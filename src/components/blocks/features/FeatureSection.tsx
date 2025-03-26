import React from 'react';
import { BaseComponentProps } from '../../../lib/composition/types';
import { useTheme } from '../../../hooks/useTheme';
import { componentRegistry } from '../../../lib/discovery/ComponentRegistry';
import Container from '../../core/layout/Container';
import FeatureCard from './FeatureCard';

export interface FeatureItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  iconBg?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  imageUrl?: string;
}

export interface FeatureSectionProps extends BaseComponentProps {
  title: string;
  subtitle?: string;
  features: FeatureItem[];
  columns?: 1 | 2 | 3 | 4;
  centered?: boolean;
}

/**
 * Feature Section component for displaying multiple feature cards in a grid
 */
export const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  subtitle,
  features,
  columns = 3,
  centered = false,
  className = '',
  style,
  ...rest
}) => {
  const { theme } = useTheme();
  
  // Get appropriate column class based on screen size
  // In a real app, you'd use Tailwind classes or a CSS-in-JS solution
  const getGridStyle = () => {
    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: theme.spacing.lg,
    };
  };
  
  return (
    <section
      className={`feature-section ${className}`}
      style={{
        padding: `${theme.spacing.xxl} 0`,
        backgroundColor: theme.colors.background,
        ...style,
      }}
      {...rest}
    >
      <Container>
        {/* Section Header */}
        <div style={{ 
          textAlign: centered ? 'center' : 'left',
          marginBottom: theme.spacing.xl,
        }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: theme.colors.text,
          }}>
            {title}
          </h2>
          
          {subtitle && (
            <p style={{ 
              fontSize: '1.25rem',
              color: theme.colors.muted,
              maxWidth: centered ? '800px' : undefined,
              margin: centered ? '0 auto' : undefined,
            }}>
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Features Grid */}
        <div style={getGridStyle()}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              iconBg={feature.iconBg}
              ctaText={feature.ctaText}
              onCtaClick={feature.onCtaClick}
              imageUrl={feature.imageUrl}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

// Register this component with the registry
componentRegistry.register('blocks.feature-section', {
  id: 'blocks.feature-section',
  component: FeatureSection,
  descriptor: {
    type: 'block',
    name: 'FeatureSection',
    tag: 'section',
    props: {
      title: 'Features',
      subtitle: 'Explore our amazing features that set us apart.',
      features: [],
      columns: 3,
      centered: true,
    },
    children: [],
  },
  metadata: {
    name: 'FeatureSection',
    description: 'Section component for displaying multiple feature cards in a grid',
    category: 'blocks.features',
    tags: ['features', 'section', 'grid', 'marketing'],
    created: new Date().toISOString(),
    author: 'Component System',
    version: '1.0.0',
  },
});

export default FeatureSection; 