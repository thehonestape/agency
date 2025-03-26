import React from 'react';
import { BrandProvider } from '@/lib/BrandProvider';
import { BrandConfig, brands, defaultBrand, TypeScale } from '@/lib/brandConfig';
import { HeroSection, HeroSectionProps } from './HeroSection';
import { FeaturesSection, FeaturesSectionProps } from './FeaturesSection';
import { CTASection, CTASectionProps } from './CTASection';

// Import other section components as needed (stub for now, to be implemented)
type TestimonialSectionProps = any;
type PricingSectionProps = any;

// Define base section properties that apply to all sections
export interface BaseSectionProps {
  typescale?: Partial<TypeScale>;
  spacing?: {
    top?: string;
    bottom?: string;
    container?: string;
  };
  className?: string;
  animated?: boolean;
  [key: string]: any;
}

// Define the section types
export type Section = 
  | { type: 'hero', props: HeroSectionProps & BaseSectionProps }
  | { type: 'features', props: FeaturesSectionProps & BaseSectionProps }
  | { type: 'testimonials', props: TestimonialSectionProps & BaseSectionProps }
  | { type: 'cta', props: CTASectionProps & BaseSectionProps }
  | { type: 'pricing', props: PricingSectionProps & BaseSectionProps }
  | { type: 'custom', component: React.ComponentType<any>, props: any & BaseSectionProps };

// Page configuration type
export interface PageConfig {
  brandKey: string;
  customBrandConfig?: Partial<BrandConfig>;
  sections: Section[];
  globalProps?: BaseSectionProps & {
    [key: string]: any;
  };
}

export interface PageBuilderProps extends PageConfig {}

/**
 * PageBuilder component
 * 
 * Builds a complete page using configurable sections and brand settings.
 * Each section can be customized with its own props, and the entire page
 * shares a consistent brand configuration.
 * 
 * @example
 * ```tsx
 * <PageBuilder
 *   brandKey="workhorse"
 *   sections={[
 *     { 
 *       type: 'hero', 
 *       props: { 
 *         title: 'Welcome to our site',
 *         subtitle: 'Build beautiful pages easily',
 *         ctaText: 'Get Started',
 *         typescale: { 
 *           '3xl': '4rem' // Override just the h1 size for this section
 *         }
 *       } 
 *     },
 *     { 
 *       type: 'features', 
 *       props: { 
 *         title: 'Our Features',
 *         features: [/* ... *\/],
 *         typescale: {
 *           base: '1.1rem', // Slightly larger body text in this section
 *           xl: '1.5rem'    // Smaller headings for more compact layout
 *         }
 *       } 
 *     }
 *   ]}
 * />
 * ```
 */
export function PageBuilder({ 
  brandKey = 'workhorse',
  customBrandConfig,
  sections,
  globalProps = {},
}: PageBuilderProps) {
  // If there's no content, render nothing
  if (!sections || sections.length === 0) {
    return null;
  }
  
  // Create a brand config that will include any custom settings
  const brandConfig = customBrandConfig 
    ? { ...brands[brandKey], ...customBrandConfig }
    : brands[brandKey] || defaultBrand;
  
  // Function to render a section based on its type
  const renderSection = (section: Section, index: number) => {
    // Apply global props to section props, but let section props override
    const combinedProps = {
      ...globalProps,
      ...section.props,
      key: index,
    };
    
    // Create section-specific styles for spacing control
    const sectionStyle: React.CSSProperties = {};
    if (combinedProps.spacing) {
      if (combinedProps.spacing.top) sectionStyle.paddingTop = combinedProps.spacing.top;
      if (combinedProps.spacing.bottom) sectionStyle.paddingBottom = combinedProps.spacing.bottom;
    }
    
    // Create a wrapper that will apply custom typescale if specified
    const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
      // No custom typescale, render directly
      if (!combinedProps.typescale) {
        return (
          <div 
            style={sectionStyle} 
            className="section-wrapper relative"
            data-section-id={`section-${index}`}
          >
            {children}
          </div>
        );
      }
      
      // Custom typescale, create CSS variables for this section only
      const typeScaleStyles: React.CSSProperties = {
        ...sectionStyle,
        position: 'relative',
      };
      
      // Create a ref to access the DOM element directly
      const sectionRef = React.useRef<HTMLDivElement>(null);
      
      // Track when typography changes are applied
      const [typographyUpdated, setTypographyUpdated] = React.useState(false);
      
      // Apply custom CSS properties after render
      React.useEffect(() => {
        if (sectionRef.current && combinedProps.typescale) {
          // Set the CSS variables directly on the DOM element
          Object.entries(combinedProps.typescale).forEach(([size, value]) => {
            // Check if the value is a fluid clamp expression
            if (typeof value === 'string' && value.includes('clamp(')) {
              // Use the clamp value directly
              sectionRef.current?.style.setProperty(`--type-${size}`, value);
            } else {
              // Convert fixed sizes to fluid typography with clamp
              // Only apply fluid scaling for larger text (headings)
              if (size === '3xl' || size === '2xl' || size === 'xl') {
                const fontSize = parseFloat(String(value).replace('rem', ''));
                // Calculate fluid typography with a reasonable viewport range
                // Format: clamp(minSize, preferredValue, maxSize)
                // The preferred value scales with viewport width between 320px and 1200px
                const minSize = Math.max(fontSize * 0.7, 1); // Min size is 70% of target, but never below 1rem
                const maxSize = fontSize;
                // Fluid formula creates a viewport-relative size between min and max
                const fluidValue = `clamp(${minSize}rem, calc(${minSize}rem + ${(maxSize - minSize)}vw * 0.7), ${maxSize}rem)`;
                sectionRef.current?.style.setProperty(`--type-${size}`, fluidValue);
              } else {
                // For body text and smaller headings, use the fixed size
                sectionRef.current?.style.setProperty(`--type-${size}`, value as string);
              }
            }
          });
          
          // Add a subtle animation to show changes were applied
          // We'll add a temporary class and remove it after the animation
          if (!typographyUpdated) {
            sectionRef.current.classList.add('typography-updated');
            
            // Remove the class after animation completes
            setTimeout(() => {
              if (sectionRef.current) {
                sectionRef.current.classList.remove('typography-updated');
                setTypographyUpdated(true);
              }
            }, 600);
          }
        }
      }, [combinedProps.typescale]);
      
      return (
        <div 
          ref={sectionRef}
          style={typeScaleStyles} 
          className="section-wrapper section-custom-typescale relative"
          data-section-id={`section-${index}`}
        >
          {/* Visual indicator for active section with custom styles */}
          <div className="section-indicator absolute -left-3 top-4 h-full w-1 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {children}
        </div>
      );
    };
    
    // Render the section content based on type, wrapped with custom typescale if needed
    const renderSectionContent = () => {
      switch (section.type) {
        case 'hero':
          return <HeroSection {...combinedProps} />;
        case 'features':
          return <FeaturesSection {...combinedProps} />;
        case 'testimonials':
          // Placeholder for future implementation
          return <div>Testimonial Section Placeholder</div>;
        case 'cta':
          return <CTASection {...combinedProps} />;
        case 'pricing':
          // Placeholder for future implementation
          return <div>Pricing Section Placeholder</div>;
        case 'custom':
          // For custom components
          const CustomComponent = section.component;
          return <CustomComponent {...combinedProps} />;
        default:
          return null;
      }
    };
    
    return (
      <div className="section-container group" key={index}>
        <SectionWrapper>
          {renderSectionContent()}
        </SectionWrapper>
      </div>
    );
  };
  
  return (
    <BrandProvider initialBrand={brandKey}>
      <div className="brand-page relative">
        {sections.map((section, index) => renderSection(section, index))}
      </div>
    </BrandProvider>
  );
}

/**
 * Example usage:
 * 
 * const pageConfig = {
 *   brandKey: 'workhorse',
 *   sections: [
 *     { 
 *       type: 'hero',
 *       props: {
 *         title: 'Transform Your Brand Identity',
 *         subtitle: 'Powerful AI-Driven Solutions',
 *         description: 'Create, manage, and evolve your brand with our comprehensive platform.',
 *         ctaText: 'Get Started',
 *         ctaLink: '/signup',
 *         secondaryCtaText: 'Learn More',
 *         secondaryCtaLink: '/about',
 *         image: '/images/hero-image.jpg',
 *         layout: 'split',
 *         background: 'light',
 *         // Section-specific typescale for larger hero text
 *         typescale: {
 *           '3xl': '4rem',
 *           '2xl': '2.5rem',
 *           'base': '1.125rem'
 *         },
 *         // Custom spacing for this section
 *         spacing: {
 *           top: '3rem',
 *           bottom: '6rem'
 *         }
 *       }
 *     },
 *     // ... more sections
 *   ]
 * };
 * 
 * <PageBuilder {...pageConfig} />
 */ 