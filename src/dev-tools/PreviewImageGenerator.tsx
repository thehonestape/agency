import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { HeroBasic } from "@/components/blocks/hero";
import { FeatureSection } from "@/components/blocks/features";
import { CTASection } from "@/components/blocks/cta";
import { TestimonialSection } from "@/components/blocks/testimonials";
import { StatsSection } from "@/components/blocks/stats";
import { PricingSection } from "@/components/blocks/pricing";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import './PreviewImageGenerator.css';

/**
 * This component is used to generate preview images for UI blocks.
 * It renders each UI block in a small viewport and captures it as an image.
 * The generated images can then be used as previews on the UI blocks page.
 */
export default function PreviewImageGenerator() {
  const [previews, setPreviews] = useState<Array<{ name: string; url: string }>>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const generatePreviews = async () => {
    setIsGenerating(true);
    const newPreviews = [];

    try {
      if (heroRef.current) {
        const heroUrl = await toPng(heroRef.current);
        newPreviews.push({ name: 'Hero Basic', url: heroUrl });
      }

      if (featureRef.current) {
        const featureUrl = await toPng(featureRef.current);
        newPreviews.push({ name: 'Feature Section', url: featureUrl });
      }

      if (ctaRef.current) {
        const ctaUrl = await toPng(ctaRef.current);
        newPreviews.push({ name: 'CTA Section', url: ctaUrl });
      }

      if (testimonialRef.current) {
        const testimonialUrl = await toPng(testimonialRef.current);
        newPreviews.push({ name: 'Testimonial Section', url: testimonialUrl });
      }

      if (statsRef.current) {
        const statsUrl = await toPng(statsRef.current);
        newPreviews.push({ name: 'Stats Section', url: statsUrl });
      }

      if (pricingRef.current) {
        const pricingUrl = await toPng(pricingRef.current);
        newPreviews.push({ name: 'Pricing Section', url: pricingUrl });
      }

      setPreviews(newPreviews);
    } catch (error) {
      console.error('Error generating previews:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">UI Block Preview Generator</h1>
        <Button onClick={generatePreviews} disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate Previews'}
        </Button>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {previews.map(({ name, url }) => (
            <Card key={name}>
              <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>Preview of the {name} component</CardDescription>
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
}