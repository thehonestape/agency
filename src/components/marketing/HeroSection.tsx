import React from 'react';
import { useBrand, BrandHeading, BrandText, ThemedComponent } from '@/lib/BrandProvider';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// Types for the hero section
export interface HeroSectionProps {
  title: string;
  subtitle: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  image?: string;
  imageAlt?: string;
  align?: 'left' | 'center' | 'right';
  layout?: 'standard' | 'split' | 'fullwidth';
  background?: 'light' | 'dark' | 'gradient' | 'image';
  backgroundImage?: string;
  className?: string;
  contentClassName?: string;
  imageClassName?: string;
  animated?: boolean;
  // Additional props for typography customization
  titleSize?: string; // Override just the title size
  subtitleSize?: string; // Override just the subtitle size
  descriptionSize?: string; // Override just the description size
}

export function HeroSection({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink = '#',
  secondaryCtaText,
  secondaryCtaLink = '#',
  image,
  imageAlt = 'Hero image',
  align = 'left',
  layout = 'standard',
  background = 'light',
  backgroundImage,
  className,
  contentClassName,
  imageClassName,
  animated = true,
  titleSize,
  subtitleSize,
  descriptionSize,
}: HeroSectionProps) {
  const { currentBrand, getTypeSize, applyBrandColor } = useBrand();
  
  // Create dynamic background styles based on the background prop
  const backgroundStyles: React.CSSProperties = {
    backgroundColor: background === 'light' 
      ? applyBrandColor('background') 
      : background === 'dark' 
        ? applyBrandColor('primary') 
        : 'transparent',
    backgroundImage: background === 'gradient' 
      ? `linear-gradient(to right, ${applyBrandColor('primary')}, ${applyBrandColor('secondary')})` 
      : background === 'image' && backgroundImage 
        ? `url(${backgroundImage})` 
        : 'none',
    backgroundSize: background === 'image' ? 'cover' : undefined,
    backgroundPosition: background === 'image' ? 'center' : undefined,
  };
  
  // Text colors based on background
  const textColorClass = background === 'dark' || background === 'gradient' 
    ? 'text-white' 
    : 'text-gray-900';
  
  // Container alignment classes
  const alignmentClass = align === 'center' 
    ? 'text-center items-center' 
    : align === 'right' 
      ? 'text-right items-end' 
      : 'text-left items-start';
  
  // Layout classes
  const layoutClasses = {
    standard: 'flex flex-col md:flex-row items-center gap-12',
    split: 'grid md:grid-cols-2 gap-16 items-center',
    fullwidth: 'flex flex-col max-w-5xl mx-auto',
  };
  
  // Create custom inline styles for direct typography overrides
  const titleStyle: React.CSSProperties = titleSize ? { fontSize: titleSize } : {};
  const subtitleStyle: React.CSSProperties = subtitleSize ? { fontSize: subtitleSize } : {};
  const descriptionStyle: React.CSSProperties = descriptionSize ? { fontSize: descriptionSize } : {};
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  
  // Wrap components with motion if animated
  const MotionWrapper = animated ? motion.div : React.Fragment;
  
  return (
    <section 
      className={cn(
        'py-16 md:py-24 overflow-hidden relative',
        className
      )}
      style={backgroundStyles}
    >
      {/* Optional overlay for image backgrounds */}
      {background === 'image' && (
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      )}
      
      <div 
        className={cn(
          'container mx-auto px-4 relative z-10',
          layoutClasses[layout],
          alignmentClass,
          contentClassName
        )}
      >
        <MotionWrapper
          className={cn(
            "flex flex-col",
            layout === 'fullwidth' ? 'max-w-4xl mx-auto' : 'max-w-2xl'
          )}
          {...(animated ? {
            variants: containerVariants,
            initial: "hidden",
            animate: "visible"
          } : {})}
        >
          {/* Subtitle */}
          {subtitle && (
            <MotionWrapper 
              {...(animated ? { variants: itemVariants } : {})}
              className="mb-3"
            >
              <BrandText 
                variant="label"
                className={cn(
                  'uppercase tracking-wider inline-block',
                  textColorClass,
                  background === 'dark' || background === 'gradient' ? 'opacity-90' : 'opacity-70'
                )}
                style={subtitleStyle}
              >
                {subtitle}
              </BrandText>
            </MotionWrapper>
          )}
          
          {/* Title */}
          <MotionWrapper 
            {...(animated ? { variants: itemVariants } : {})}
            className="mb-6"
          >
            <BrandHeading 
              level={1}
              className={cn(
                textColorClass,
                "leading-tight"
              )}
              style={titleStyle}
            >
              {title}
            </BrandHeading>
          </MotionWrapper>
          
          {/* Description */}
          {description && (
            <MotionWrapper 
              {...(animated ? { variants: itemVariants } : {})}
              className="mb-8"
            >
              <BrandText 
                className={cn(
                  textColorClass,
                  background === 'dark' || background === 'gradient' ? 'opacity-90' : 'opacity-80',
                  'max-w-prose'
                )}
                style={descriptionStyle}
              >
                {description}
              </BrandText>
            </MotionWrapper>
          )}
          
          {/* Call to action buttons */}
          {(ctaText || secondaryCtaText) && (
            <MotionWrapper 
              className="flex flex-wrap gap-4 mt-2"
              {...(animated ? { variants: itemVariants } : {})}
            >
              {ctaText && (
                <ThemedComponent
                  component="Button"
                  size="lg"
                  href={ctaLink}
                  className={cn(
                    "font-medium shadow-lg",
                    background !== 'light' ? 'bg-white text-gray-900 hover:bg-white/90' : undefined
                  )}
                >
                  {ctaText}
                </ThemedComponent>
              )}
              
              {secondaryCtaText && (
                <ThemedComponent
                  component="Button"
                  size="lg"
                  variant="outline"
                  href={secondaryCtaLink}
                  className={cn(
                    "font-medium",
                    background !== 'light' ? 'border-white text-white hover:bg-white/10' : undefined
                  )}
                >
                  {secondaryCtaText}
                </ThemedComponent>
              )}
            </MotionWrapper>
          )}
        </MotionWrapper>
        
        {/* Hero image */}
        {image && layout !== 'fullwidth' && (
          <MotionWrapper
            className={cn(
              layout === 'split' ? 'flex justify-center items-center' : 'flex-1 flex justify-center',
              imageClassName
            )}
            {...(animated ? {
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.5, delay: 0.2 }
            } : {})}
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img 
                src={image} 
                alt={imageAlt}
                className={cn(
                  'w-full h-auto object-cover max-w-full',
                  layout === 'split' ? 'max-h-[500px]' : 'max-h-[400px]'
                )}
              />
              {/* Image overlay gradient for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </MotionWrapper>
        )}
        
        {/* Fullwidth hero image */}
        {image && layout === 'fullwidth' && (
          <MotionWrapper
            className={cn(
              'mt-12 w-full flex justify-center',
              imageClassName
            )}
            {...(animated ? {
              initial: { opacity: 0, y: 40 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.3 }
            } : {})}
          >
            <div className="relative rounded-lg overflow-hidden shadow-xl w-full max-w-5xl">
              <img 
                src={image} 
                alt={imageAlt}
                className="w-full h-auto object-cover"
              />
            </div>
          </MotionWrapper>
        )}
      </div>
    </section>
  );
} 