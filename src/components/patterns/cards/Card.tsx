import React, { ReactNode } from 'react';
import { BaseComponentProps } from '../../../lib/composition/types';
import { useTheme } from '../../../hooks/useTheme';
import { componentRegistry } from '../../../lib/discovery/ComponentRegistry';

export interface CardProps extends BaseComponentProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: string | number;
  header?: ReactNode;
  footer?: ReactNode;
  title?: string;
  description?: string;
}

/**
 * Card component for displaying content in a contained card format
 */
export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = '1.5rem',
  header,
  footer,
  title,
  description,
  className = '',
  style,
  ...rest
}) => {
  const { theme } = useTheme();

  // Determine styles based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: theme.colors.background,
          boxShadow: theme.shadows.lg,
          border: 'none',
        };
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          border: `1px solid ${theme.colors.border}`,
        };
      case 'filled':
        return {
          backgroundColor:
            theme.colors.background === '#ffffff' ? '#f9fafb' : 'rgba(255,255,255,0.05)',
          boxShadow: 'none',
          border: 'none',
        };
      case 'default':
      default:
        return {
          backgroundColor: theme.colors.background,
          boxShadow: theme.shadows.sm,
          border: `1px solid ${theme.colors.border}`,
        };
    }
  };

  // Convert padding to string with units if it's a number
  const paddingValue = typeof padding === 'number' ? `${padding}px` : padding;

  // Combine styles
  const cardStyles = {
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    ...getVariantStyles(),
    ...style,
  };

  // Header styles
  const headerStyles = {
    padding: paddingValue,
    borderBottom: title || description || header ? `1px solid ${theme.colors.border}` : 'none',
  };

  // Content styles
  const contentStyles = {
    padding: paddingValue,
  };

  // Footer styles
  const footerStyles = {
    padding: paddingValue,
    borderTop: footer ? `1px solid ${theme.colors.border}` : 'none',
  };

  return (
    <div className={`card card-${variant} ${className}`} style={cardStyles} {...rest}>
      {/* Render header if provided or if title/description exists */}
      {(header || title || description) && (
        <div className="card-header" style={headerStyles}>
          {header || (
            <>
              {title && <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{title}</h3>}
              {description && <p style={{ color: theme.colors.muted }}>{description}</p>}
            </>
          )}
        </div>
      )}

      {/* Card content */}
      <div className="card-content" style={contentStyles}>
        {children}
      </div>

      {/* Render footer if provided */}
      {footer && (
        <div className="card-footer" style={footerStyles}>
          {footer}
        </div>
      )}
    </div>
  );
};

// Register this component with the registry
componentRegistry.register('patterns.card', {
  id: 'patterns.card',
  component: Card,
  descriptor: {
    type: 'pattern',
    name: 'Card',
    tag: 'div',
    props: {
      variant: 'default',
      padding: '1.5rem',
    },
    children: 'Card Content',
  },
  metadata: {
    name: 'Card',
    description: 'Card component for displaying content in a contained format',
    category: 'patterns.cards',
    tags: ['card', 'container', 'layout', 'pattern'],
    created: new Date().toISOString(),
    author: 'Component System',
    version: '1.0.0',
  },
});

export default Card;
