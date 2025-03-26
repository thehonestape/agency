import React from 'react';
import { BrandHeading, BrandText, useBrand } from '@/lib/BrandProvider';
import { cn } from '@/lib/utils';

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface FeaturesSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features: Feature[];
  layout?: 'grid' | 'list' | 'alternating';
  background?: 'light' | 'dark' | 'brand' | 'gradient';
  className?: string;
}

/**
 * FeaturesSection component
 * 
 * Displays a list of features in either a grid, list, or alternating layout
 */
export function FeaturesSection({
  title,
  subtitle,
  description,
  features = [],
  layout = 'grid',
  background = 'light',
  className = '',
}: FeaturesSectionProps) {
  const { applyBrandColor } = useBrand();
  
  // Background styling
  const getBgClass = () => {
    switch (background) {
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'brand':
        return 'bg-primary text-primary-foreground';
      case 'gradient':
        return 'bg-gradient-to-br from-primary to-secondary text-primary-foreground';
      case 'light':
      default:
        return 'bg-white text-gray-900';
    }
  };

  // Helper to get icon component
  const getIconComponent = (iconName: string) => {
    // Simple implementation with basic icon names
    switch (iconName) {
      case 'layers':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
        );
      case 'music':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
        );
      case 'clock':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        );
      case 'target':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="6"></circle>
            <circle cx="12" cy="12" r="2"></circle>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M12 5v14"></path>
            <path d="M5 12h14"></path>
          </svg>
        );
    }
  };

  // Render features based on layout
  const renderFeatures = () => {
    if (layout === 'grid') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={cn(
                "flex flex-col items-start p-6 rounded-lg transition-all duration-300",
                background === 'light' 
                  ? "bg-gray-50 hover:bg-gray-100 hover:shadow-md" 
                  : "bg-white/5 hover:bg-white/10"
              )}
            >
              <div className={cn(
                "p-4 rounded-full mb-5",
                background === 'light' 
                  ? "bg-primary/10 text-primary" 
                  : "bg-white/20 text-white"
              )}>
                {getIconComponent(feature.icon)}
              </div>
              <BrandHeading className="text-xl mb-3 font-semibold">{feature.title}</BrandHeading>
              <BrandText className="text-base leading-relaxed opacity-85">{feature.description}</BrandText>
            </div>
          ))}
        </div>
      );
    }

    if (layout === 'list') {
      return (
        <div className="space-y-8 mt-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={cn(
                "flex items-start space-x-5 p-4 rounded-lg transition-all duration-300",
                background === 'light' 
                  ? "hover:bg-gray-50" 
                  : "hover:bg-white/5"
              )}
            >
              <div className={cn(
                "p-4 rounded-full flex-shrink-0",
                background === 'light' 
                  ? "bg-primary/10 text-primary" 
                  : "bg-white/20 text-white"
              )}>
                {getIconComponent(feature.icon)}
              </div>
              <div className="flex-1">
                <BrandHeading className="text-xl mb-2 font-semibold">{feature.title}</BrandHeading>
                <BrandText className="text-base leading-relaxed opacity-85 max-w-prose">{feature.description}</BrandText>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Alternating layout
    return (
      <div className="space-y-20 mt-16">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={cn(
              "flex flex-col md:flex-row items-center gap-10",
              index % 2 ? "md:flex-row-reverse" : ""
            )}
          >
            <div className={cn(
              "p-8 rounded-full flex-shrink-0 transition-all duration-300",
              background === 'light' 
                ? "bg-primary/10 text-primary hover:bg-primary/15" 
                : "bg-white/20 text-white hover:bg-white/25"
            )}>
              <div className="w-12 h-12">
                {getIconComponent(feature.icon)}
              </div>
            </div>
            <div className="flex-1 max-w-xl">
              <BrandHeading className="text-2xl mb-4 font-semibold">{feature.title}</BrandHeading>
              <BrandText className="text-lg leading-relaxed opacity-90">{feature.description}</BrandText>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className={cn(
      "py-20",
      getBgClass(),
      className
    )}>
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          {subtitle && (
            <BrandText className={cn(
              "text-lg uppercase tracking-wide font-medium mb-3",
              background !== 'light' ? "text-white/80" : "text-primary/70"
            )}>
              {subtitle}
            </BrandText>
          )}
          
          {title && (
            <BrandHeading className="text-3xl md:text-4xl mb-6 font-bold">
              {title}
            </BrandHeading>
          )}
          
          {description && (
            <BrandText className="text-xl leading-relaxed opacity-90">
              {description}
            </BrandText>
          )}
        </div>
        {renderFeatures()}
      </div>
    </section>
  );
} 