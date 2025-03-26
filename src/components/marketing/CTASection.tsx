import React from 'react';
import { BrandHeading, BrandText, ThemedComponent, useBrand } from '@/lib/BrandProvider';
import { cn } from '@/lib/utils';

export interface CTASectionProps {
  title: string;
  description?: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  background?: 'light' | 'dark' | 'brand' | 'gradient';
  align?: 'left' | 'center' | 'right';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

/**
 * CTASection component
 * 
 * Displays a call to action section with title, description, and buttons
 */
export function CTASection({
  title,
  description,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  background = 'light',
  align = 'center',
  size = 'medium',
  className = '',
}: CTASectionProps) {
  const { applyBrandColor } = useBrand();
  
  // Background styling
  const getBgClass = () => {
    switch (background) {
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'brand':
        return 'bg-primary text-primary-foreground';
      case 'gradient':
        return 'bg-gradient-to-r from-primary to-secondary text-primary-foreground';
      case 'light':
      default:
        return 'bg-white text-gray-900';
    }
  };
  
  // Size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'py-12';
      case 'large':
        return 'py-24';
      case 'medium':
      default:
        return 'py-16';
    }
  };
  
  // Alignment classes
  const getAlignmentClasses = () => {
    switch (align) {
      case 'left':
        return 'text-left';
      case 'right':
        return 'text-right';
      case 'center':
      default:
        return 'text-center';
    }
  };

  // Get container width based on size
  const getContainerClasses = () => {
    switch (size) {
      case 'small':
        return 'max-w-3xl';
      case 'large':
        return 'max-w-5xl';
      case 'medium':
      default:
        return 'max-w-4xl';
    }
  };

  // Get heading size based on size
  const getHeadingClasses = () => {
    switch (size) {
      case 'small':
        return 'text-2xl md:text-3xl';
      case 'large':
        return 'text-3xl md:text-5xl';
      case 'medium':
      default:
        return 'text-3xl md:text-4xl';
    }
  };

  return (
    <section className={cn(
      getSizeClasses(),
      getBgClass(),
      "relative overflow-hidden",
      className
    )}>
      {/* Optional decorative background elements */}
      {background === 'gradient' && (
        <>
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-black/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        </>
      )}
      
      <div className={cn(
        "container mx-auto px-6 relative z-10",
        getContainerClasses()
      )}>
        <div className={cn(
          "mx-auto",
          getAlignmentClasses(),
          align === 'center' ? 'max-w-2xl mx-auto' : ''
        )}>
          <BrandHeading className={cn(
            "mb-5 font-bold leading-tight",
            getHeadingClasses()
          )}>
            {title}
          </BrandHeading>
          
          {description && (
            <BrandText className={cn(
              "mb-8 text-lg md:text-xl opacity-90",
              align === 'center' ? 'max-w-prose mx-auto' : 'max-w-prose'
            )}>
              {description}
            </BrandText>
          )}
          
          <div className={cn(
            "flex flex-wrap gap-5 mt-8", 
            align === 'center' ? 'justify-center' : 
            align === 'right' ? 'justify-end' : 'justify-start'
          )}>
            <ThemedComponent
              component="Button"
              size="lg"
              href={ctaLink}
              className={cn(
                "font-medium shadow-md px-8 py-3 text-base",
                background !== 'light' ? 'bg-white text-gray-900 hover:bg-white/90' : undefined
              )}
            >
              {ctaText}
            </ThemedComponent>
            
            {secondaryCtaText && secondaryCtaLink && (
              <ThemedComponent
                component="Button"
                variant="outline"
                size="lg"
                href={secondaryCtaLink}
                className={cn(
                  "font-medium px-8 py-3 text-base",
                  background !== 'light' ? 'border-white text-white hover:bg-white/10' : undefined
                )}
              >
                {secondaryCtaText}
              </ThemedComponent>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 