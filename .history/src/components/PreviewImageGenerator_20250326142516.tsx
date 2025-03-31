import React, { useRef, useEffect, useState } from 'react';
import { toPng } from 'html-to-image';
import { Button } from './ui/button';
import { HeroBasic } from './ui-blocks/HeroBasic';
import { FeatureSection } from './ui-blocks/FeatureSection';
import { CTASection } from './ui-blocks/CTASection';
import TestimonialSection from './ui-blocks/TestimonialSection';
import StatsSection from './ui-blocks/StatsSection';
import PricingSection from './ui-blocks/PricingSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import './PreviewImageGenerator.css';

/**
 * This component is used to generate preview images for UI blocks.
 * It renders each UI block in a small viewport and captures it as an image.
 * The generated images can then be used as previews on the UI blocks page.
 */
const PreviewImageGenerator: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePreview = async (ref: React.RefObject<HTMLDivElement>, name: string) => {
    if (ref.current) {
      try {
        const dataUrl = await toPng(ref.current, { 
          quality: 0.95,
          width: 600,
          height: 400,
          style: {
            transform: 'scale(0.5)',
            transformOrigin: 'top left',
            width: '1200px',
            height: '800px'
          }
        });
        
        setPreviewUrls(prev => ({
          ...prev,
          [name]: dataUrl
        }));
        
        console.log(`Generated preview for ${name}`);
        return dataUrl;
      } catch (error) {
        console.error(`Error generating preview for ${name}:`, error);
      }
    }
  };

  const generateAllPreviews = async () => {
    setIsGenerating(true);
    
    await Promise.all([
      generatePreview(heroRef, 'hero-basic'),
      generatePreview(featureRef, 'feature-section'),
      generatePreview(ctaRef, 'cta-section'),
      generatePreview(testimonialRef, 'testimonial-section'),
      generatePreview(statsRef, 'stats-section'),
      generatePreview(pricingRef, 'pricing-section')
    ]);
    
    setIsGenerating(false);
  };

  const downloadAllPreviews = () => {
    Object.entries(previewUrls).forEach(([name, url]) => {
      const link = document.createElement('a');
      link.download = `${name}-preview.jpg`;
      link.href = url;
      link.click();
    });
  };
  
  return (
    <div className="container mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">UI Block Preview Generator</h1>
        <p className="text-gray-600 mb-4">This page generates preview images for UI blocks that can be used in the UI Blocks Page.</p>
        
        <div className="flex gap-4 mb-8">
          <Button 
            onClick={generateAllPreviews} 
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate All Previews'}
          </Button>
          
          <Button 
            onClick={downloadAllPreviews} 
            variant="outline" 
            disabled={Object.keys(previewUrls).length === 0}
          >
            Download All Previews
          </Button>
        </div>
        
        {Object.keys(previewUrls).length > 0 && (
          <div className="grid grid-cols-2 gap-6 my-8">
            {Object.entries(previewUrls).map(([name, url]) => (
              <Card key={name} className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="capitalize">{name.replace(/-/g, ' ')}</CardTitle>
                  <CardDescription>Preview Image</CardDescription>
                </CardHeader>
                <CardContent>
                  <img 
                    src={url} 
                    alt={`${name} preview`} 
                    className="w-full h-auto border rounded"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="hidden">
        {/* These components are rendered off-screen for preview generation */}
        <div ref={heroRef} className="preview-container">
          <HeroBasic />
        </div>
        
        <div ref={featureRef} className="preview-container">
          <FeatureSection />
        </div>
        
        <div ref={ctaRef} className="preview-container">
          <CTASection />
        </div>
        
        <div ref={testimonialRef} className="preview-container">
          <TestimonialSection />
        </div>
        
        <div ref={statsRef} className="preview-container">
          <StatsSection />
        </div>
        
        <div ref={pricingRef} className="preview-container">
          <PricingSection />
        </div>
      </div>
    </div>
  );
};

export default PreviewImageGenerator; 