import React, { ReactNode } from 'react';
import { BaseComponentProps } from '../../../lib/composition/types';
import { useTheme } from '../../../hooks/useTheme';
import { componentRegistry } from '../../../lib/discovery/ComponentRegistry';
import Card from '../../patterns/cards/Card';
import Button from '../../core/inputs/Button';

export interface FeatureCardProps extends BaseComponentProps {
  title: string;
  description: string;
  icon?: ReactNode;
  iconBg?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  imageUrl?: string;
  imageAlt?: string;
}

/**
 * Feature Card component for highlighting features in marketing sections
 */
export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  iconBg,
  ctaText,
  onCtaClick,
  imageUrl,
  imageAlt = 'Feature illustration',
  className = '',
  style,
  ...rest
}) => {
  const { theme } = useTheme();
  
  // Render icon with background if provided
  const renderIcon = () => {
    if (!icon) return null;
    
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: iconBg || theme.colors.primary,
          color: 'white',
          borderRadius: theme.radius.md,
          width: '3rem',
          height: '3rem',
          marginBottom: '1rem',
        }}
      >
        {icon}
      </div>
    );
  };
  
  // Render feature image if provided
  const renderImage = () => {
    if (!imageUrl) return null;
    
    return (
      <div style={{ marginBottom: '1.5rem' }}>
        <img 
          src={imageUrl} 
          alt={imageAlt}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: theme.radius.md,
            objectFit: 'cover',
          }}
        />
      </div>
    );
  };
  
  // Render CTA button if text is provided
  const renderCta = () => {
    if (!ctaText) return null;
    
    return (
      <div style={{ marginTop: '1.5rem' }}>
        <Button 
          variant="primary" 
          size="md" 
          onClick={onCtaClick}
        >
          {ctaText}
        </Button>
      </div>
    );
  };
  
  // Card footer with CTA
  const cardFooter = ctaText ? renderCta() : undefined;
  
  // Explicitly use the correct variant type
  const cardVariant: 'default' | 'elevated' | 'outlined' | 'filled' = 'elevated';
  
  return (
    <Card
      variant={cardVariant}
      className={`feature-card ${className}`}
      style={style}
      {...rest}
    >
      {renderIcon()}
      {renderImage()}
      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: 'bold', 
        marginBottom: '0.75rem',
        color: theme.colors.text,
      }}>
        {title}
      </h3>
      <p style={{ 
        color: theme.colors.muted, 
        lineHeight: 1.6,
        marginBottom: cardFooter ? '0' : '1rem',
      }}>
        {description}
      </p>
      {cardFooter}
    </Card>
  );
};

// Register this component with the registry
componentRegistry.register('blocks.feature-card', {
  id: 'blocks.feature-card',
  component: FeatureCard,
  descriptor: {
    type: 'block',
    name: 'FeatureCard',
    tag: 'div',
    props: {
      title: 'Feature Title',
      description: 'Feature description goes here, explaining the benefits and functionality.',
      ctaText: 'Learn More',
    },
    children: [],
  },
  metadata: {
    name: 'FeatureCard',
    description: 'Card component for highlighting features in marketing sections',
    category: 'blocks.features',
    tags: ['feature', 'card', 'marketing', 'cta'],
    created: new Date().toISOString(),
    author: 'Component System',
    version: '1.0.0',
  },
});

export default FeatureCard; 