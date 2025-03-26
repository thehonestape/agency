import { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Label,
} from '@/components/ui';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import { PageBuilder, Section } from '@/components/marketing/PageBuilder';
import { debounce } from 'lodash'; // Add debounce to prevent rapid re-renders

// Define TypeScript interfaces for the typescale and spacing
interface TypeScale {
  [key: string]: string;
}

interface SpacingValues {
  top: string;
  bottom: string;
}

const TypographyFlowDemo = () => {
  // Selected pattern preset
  const [selectedPreset, setSelectedPreset] = useState('magazine');
  
  // Show comparison
  const [showComparison, setShowComparison] = useState(false);
  
  // Typography scale settings for each section
  const [section1Typescale, setSection1Typescale] = useState<TypeScale>({
    '3xl': '5rem',    // Feature headline
    '2xl': '3rem',    // Article title
    'base': '1.1rem', // Body text
  });
  
  const [section1Spacing, setSection1Spacing] = useState<SpacingValues>({
    top: '5rem',
    bottom: '5rem',
  });
  
  const [section2Typescale, setSection2Typescale] = useState<TypeScale>({
    '2xl': '2.25rem', // Article title
    'xl': '1.5rem',   // Section heading
    'base': '1.1rem', // Body text
  });
  
  const [section2Spacing, setSection2Spacing] = useState<SpacingValues>({
    top: '3rem',
    bottom: '3rem',
  });
  
  const [section3Typescale, setSection3Typescale] = useState<TypeScale>({
    '2xl': '3rem',   // Article title
    'base': '1.1rem', // Body text
  });
  
  const [section3Spacing, setSection3Spacing] = useState<SpacingValues>({
    top: '4rem',
    bottom: '6rem',
  });

  // Create debounced setters to prevent excessive re-rendering
  const debouncedSetSection1Typescale = useCallback(
    debounce((newValue: TypeScale) => setSection1Typescale(newValue), 100),
    []
  );

  const debouncedSetSection2Typescale = useCallback(
    debounce((newValue: TypeScale) => setSection2Typescale(newValue), 100),
    []
  );

  const debouncedSetSection3Typescale = useCallback(
    debounce((newValue: TypeScale) => setSection3Typescale(newValue), 100),
    []
  );

  const debouncedSetSection1Spacing = useCallback(
    debounce((newValue: SpacingValues) => setSection1Spacing(newValue), 100),
    []
  );

  const debouncedSetSection2Spacing = useCallback(
    debounce((newValue: SpacingValues) => setSection2Spacing(newValue), 100),
    []
  );

  const debouncedSetSection3Spacing = useCallback(
    debounce((newValue: SpacingValues) => setSection3Spacing(newValue), 100),
    []
  );

  // Clean up debounce functions on unmount
  useEffect(() => {
    return () => {
      debouncedSetSection1Typescale.cancel();
      debouncedSetSection2Typescale.cancel();
      debouncedSetSection3Typescale.cancel();
      debouncedSetSection1Spacing.cancel();
      debouncedSetSection2Spacing.cancel();
      debouncedSetSection3Spacing.cancel();
    };
  }, [
    debouncedSetSection1Typescale, 
    debouncedSetSection2Typescale, 
    debouncedSetSection3Typescale,
    debouncedSetSection1Spacing, 
    debouncedSetSection2Spacing, 
    debouncedSetSection3Spacing
  ]);

  const createSections = (useSectionTypescale: boolean): Section[] => {
    // Create the sections with appropriate typescale and spacing
    return [
      {
        type: 'hero' as const,
        props: {
          title: 'Typography Creates Narrative Flow',
          subtitle: 'Visual Rhythm & Pacing',
          description: 'Type size and spacing establish the reading experience, guiding the reader through your content like a well-composed story. Varied scale creates moments of emphasis, rest, and transition.',
          ctaText: 'Explore More',
          ctaLink: '#',
          layout: 'split',
          background: 'light',
          image: 'https://images.unsplash.com/photo-1618004652321-13a63e576b80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1700&q=80',
          className: useSectionTypescale ? "custom-section-1" : "",
          ...(useSectionTypescale && {
            typescale: section1Typescale,
            spacing: section1Spacing,
          }),
        }
      },
      {
        type: 'features' as const,
        props: {
          title: 'Design Principles for Content Flow',
          subtitle: 'Structure the Reading Experience',
          description: 'Notice how this section uses different type proportions than the hero above, creating a natural progression as you read down the page.',
          features: [
            {
              title: 'Establish Hierarchy',
              description: 'Create clear visual importance through size contrast',
              icon: 'layers'
            },
            {
              title: 'Create Rhythm',
              description: 'Alternate scales to establish a visual cadence that guides the eye',
              icon: 'music'
            },
            {
              title: 'Control Pacing',
              description: 'Use spacing to control the tempo of reading and content consumption',
              icon: 'clock'
            },
            {
              title: 'Direct Attention',
              description: 'Lead the reader to key points with deliberate scale choices',
              icon: 'target'
            }
          ],
          layout: 'grid',
          background: 'light',
          className: useSectionTypescale ? "custom-section-2" : "",
          ...(useSectionTypescale && {
            typescale: section2Typescale,
            spacing: section2Spacing,
          }),
        }
      },
      {
        type: 'cta' as const,
        props: {
          title: 'Craft Your Visual Narrative',
          description: 'Typography is storytelling. Understanding typographic rhythm and flow lets you create content that engages, informs, and guides readers through your narrative.',
          ctaText: 'Get Started',
          ctaLink: '#',
          background: 'gradient',
          className: useSectionTypescale ? "custom-section-3" : "",
          ...(useSectionTypescale && {
            typescale: section3Typescale,
            spacing: section3Spacing,
          }),
        }
      }
    ];
  };

  // Apply preset typography patterns
  const applyPreset = (preset: string) => {
    setSelectedPreset(preset);
    
    switch (preset) {
      case 'magazine':
        // Magazine style with strong headlines and comfortable body
        setSection1Typescale({ '3xl': '5rem', '2xl': '3rem', 'base': '1.1rem' });
        setSection2Typescale({ '2xl': '2.25rem', 'xl': '1.5rem', 'base': '1.1rem' });
        setSection3Typescale({ '2xl': '3rem', 'base': '1.1rem' });
        setSection1Spacing({ top: '5rem', bottom: '5rem' });
        setSection2Spacing({ top: '3rem', bottom: '3rem' });
        setSection3Spacing({ top: '4rem', bottom: '6rem' });
        break;
        
      case 'editorial':
        // Editorial style with refined proportions
        setSection1Typescale({ '3xl': '4rem', '2xl': '2.5rem', 'base': '1.05rem' });
        setSection2Typescale({ '2xl': '2rem', 'xl': '1.4rem', 'base': '1.05rem' });
        setSection3Typescale({ '2xl': '2.5rem', 'base': '1.05rem' });
        setSection1Spacing({ top: '4rem', bottom: '4rem' });
        setSection2Spacing({ top: '2rem', bottom: '3rem' });
        setSection3Spacing({ top: '3rem', bottom: '5rem' });
        break;
        
      case 'dramatic':
        // Dramatic contrast for impact
        setSection1Typescale({ '3xl': '6rem', '2xl': '3rem', 'base': '1rem' });
        setSection2Typescale({ '2xl': '1.8rem', 'xl': '1.3rem', 'base': '0.95rem' });
        setSection3Typescale({ '2xl': '4rem', 'base': '1.05rem' });
        setSection1Spacing({ top: '6rem', bottom: '4rem' });
        setSection2Spacing({ top: '2rem', bottom: '2rem' });
        setSection3Spacing({ top: '5rem', bottom: '7rem' });
        break;
        
      case 'compact':
        // Tighter spacing for information density
        setSection1Typescale({ '3xl': '3.5rem', '2xl': '2.25rem', 'base': '0.95rem' });
        setSection2Typescale({ '2xl': '1.8rem', 'xl': '1.25rem', 'base': '0.9rem' });
        setSection3Typescale({ '2xl': '2.25rem', 'base': '0.95rem' });
        setSection1Spacing({ top: '3rem', bottom: '3rem' });
        setSection2Spacing({ top: '1.5rem', bottom: '2rem' });
        setSection3Spacing({ top: '2rem', bottom: '4rem' });
        break;
        
      case 'minimal':
        // Understated with subtle hierarchy
        setSection1Typescale({ '3xl': '3rem', '2xl': '2rem', 'base': '1rem' });
        setSection2Typescale({ '2xl': '1.75rem', 'xl': '1.25rem', 'base': '1rem' });
        setSection3Typescale({ '2xl': '2rem', 'base': '1rem' });
        setSection1Spacing({ top: '4rem', bottom: '3rem' });
        setSection2Spacing({ top: '2rem', bottom: '2rem' });
        setSection3Spacing({ top: '3rem', bottom: '5rem' });
        break;
    }
  };

  // Create dynamic styles to apply typography changes immediately
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      .custom-section-1 h1 { font-size: ${section1Typescale['3xl']} !important; }
      .custom-section-1 h2 { font-size: ${section1Typescale['2xl']} !important; }
      .custom-section-1 p { font-size: ${section1Typescale['base']} !important; }
      .custom-section-1 { padding-top: ${section1Spacing.top} !important; padding-bottom: ${section1Spacing.bottom} !important; }
      
      .custom-section-2 h2 { font-size: ${section2Typescale['2xl']} !important; }
      .custom-section-2 h3 { font-size: ${section2Typescale['xl']} !important; }
      .custom-section-2 p { font-size: ${section2Typescale['base']} !important; }
      .custom-section-2 { padding-top: ${section2Spacing.top} !important; padding-bottom: ${section2Spacing.bottom} !important; }
      
      .custom-section-3 h2 { font-size: ${section3Typescale['2xl']} !important; }
      .custom-section-3 p { font-size: ${section3Typescale['base']} !important; }
      .custom-section-3 { padding-top: ${section3Spacing.top} !important; padding-bottom: ${section3Spacing.bottom} !important; }
    `;
    
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, [
    section1Typescale, section1Spacing,
    section2Typescale, section2Spacing,
    section3Typescale, section3Spacing
  ]);

  // Helper function to update typography sizes with less re-rendering
  const updateTypescale = (section: number, key: string, value: number) => {
    if (section === 1) {
      debouncedSetSection1Typescale({
        ...section1Typescale,
        [key]: `${value}rem`
      });
    } else if (section === 2) {
      debouncedSetSection2Typescale({
        ...section2Typescale,
        [key]: `${value}rem`
      });
    } else if (section === 3) {
      debouncedSetSection3Typescale({
        ...section3Typescale,
        [key]: `${value}rem`
      });
    }
  };

  // Helper function to update spacing with less re-rendering
  const updateSpacing = (section: number, property: string, value: number) => {
    if (section === 1) {
      if (property === 'both') {
        debouncedSetSection1Spacing({
          top: `${value}rem`,
          bottom: `${value}rem`
        });
      } else {
        debouncedSetSection1Spacing({
          ...section1Spacing,
          [property]: `${value}rem`
        });
      }
    } else if (section === 2) {
      if (property === 'both') {
        debouncedSetSection2Spacing({
          top: `${value}rem`,
          bottom: `${value}rem`
        });
      } else {
        debouncedSetSection2Spacing({
          ...section2Spacing,
          [property]: `${value}rem`
        });
      }
    } else if (section === 3) {
      if (property === 'both') {
        debouncedSetSection3Spacing({
          top: `${value}rem`,
          bottom: `${value}rem`
        });
      } else {
        debouncedSetSection3Spacing({
          ...section3Spacing,
          [property]: `${value}rem`
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col space-y-6 mb-8">
          <div>
            <h1 className="fluid-text-3xl font-bold">Typography in Layout Design</h1>
            <p className="fluid-text-lg text-gray-600 mt-2">
              Control content flow, pacing, and narrative with type scale
            </p>
          </div>
          
          <Card className="overflow-hidden border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 h-[800px]">
              {/* Left column: Controls */}
              <div className="p-6 border-r border-gray-200 bg-gray-50 overflow-y-auto">
                <h2 className="text-lg font-medium mb-6">Layout Style</h2>
                
                <div className="space-y-6">
                  <div>
                    <Label className="mb-2 block">Design Pattern</Label>
                    <Select value={selectedPreset} onValueChange={applyPreset}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a layout style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="magazine">Magazine</SelectItem>
                        <SelectItem value="editorial">Editorial</SelectItem>
                        <SelectItem value="dramatic">Dramatic</SelectItem>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="mt-3 text-sm text-gray-500">
                      {selectedPreset === 'magazine' && 
                        "Bold headlines with generous white space like a feature magazine"
                      }
                      {selectedPreset === 'editorial' && 
                        "Refined proportions with clarity and elegance of editorial content"
                      }
                      {selectedPreset === 'dramatic' && 
                        "High contrast for emotional impact and dramatic storytelling"
                      }
                      {selectedPreset === 'compact' && 
                        "Tighter spacing for information-rich content presentation"
                      }
                      {selectedPreset === 'minimal' && 
                        "Subtle hierarchy with understated elegance for content focus"
                      }
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <Label htmlFor="comparison">Compare layout styles</Label>
                    <Switch 
                      id="comparison" 
                      checked={showComparison} 
                      onCheckedChange={setShowComparison}
                    />
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200">
                    <h3 className="text-sm font-medium mb-4">Cover / Hero</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <Label className="text-xs">Headline Size</Label>
                          <span className="text-xs">{section1Typescale['3xl']}</span>
                        </div>
                        <Slider 
                          value={[parseFloat(section1Typescale['3xl'])]} 
                          min={2} 
                          max={7} 
                          step={0.5}
                          onValueChange={(value: number[]) => updateTypescale(1, '3xl', value[0])}
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <Label className="text-xs">Subtitle Size</Label>
                          <span className="text-xs">{section1Typescale['2xl']}</span>
                        </div>
                        <Slider 
                          value={[parseFloat(section1Typescale['2xl'])]} 
                          min={1.5} 
                          max={4} 
                          step={0.25}
                          onValueChange={(value: number[]) => updateTypescale(1, '2xl', value[0])}
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <Label className="text-xs">Vertical Spacing</Label>
                          <span className="text-xs">{section1Spacing.top}</span>
                        </div>
                        <Slider 
                          value={[parseInt(section1Spacing.top.replace('rem', ''))]} 
                          min={2} 
                          max={8} 
                          step={1}
                          onValueChange={(value: number[]) => updateSpacing(1, 'both', value[0])}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200">
                    <h3 className="text-sm font-medium mb-4">Content Section</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <Label className="text-xs">Heading Size</Label>
                          <span className="text-xs">{section2Typescale['2xl']}</span>
                        </div>
                        <Slider 
                          value={[parseFloat(section2Typescale['2xl'])]} 
                          min={1.5} 
                          max={3} 
                          step={0.25}
                          onValueChange={(value: number[]) => updateTypescale(2, '2xl', value[0])}
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <Label className="text-xs">Subheading Size</Label>
                          <span className="text-xs">{section2Typescale['xl']}</span>
                        </div>
                        <Slider 
                          value={[parseFloat(section2Typescale['xl'])]} 
                          min={1} 
                          max={2} 
                          step={0.25}
                          onValueChange={(value: number[]) => updateTypescale(2, 'xl', value[0])}
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <Label className="text-xs">Content Density</Label>
                          <span className="text-xs">{section2Spacing.top}</span>
                        </div>
                        <Slider 
                          value={[parseInt(section2Spacing.top.replace('rem', ''))]} 
                          min={1} 
                          max={6} 
                          step={0.5}
                          onValueChange={(value: number[]) => updateSpacing(2, 'both', value[0])}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200">
                    <h3 className="text-sm font-medium mb-4">Conclusion</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <Label className="text-xs">Headline Size</Label>
                          <span className="text-xs">{section3Typescale['2xl']}</span>
                        </div>
                        <Slider 
                          value={[parseFloat(section3Typescale['2xl'])]} 
                          min={1.5} 
                          max={5} 
                          step={0.5}
                          onValueChange={(value: number[]) => updateTypescale(3, '2xl', value[0])}
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <Label className="text-xs">Margin Spacing</Label>
                          <span className="text-xs">{section3Spacing.bottom}</span>
                        </div>
                        <Slider 
                          value={[parseInt(section3Spacing.bottom.replace('rem', ''))]} 
                          min={2} 
                          max={8} 
                          step={1}
                          onValueChange={(value: number[]) => updateSpacing(3, 'bottom', value[0])}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right column: Preview */}
              <div className="lg:col-span-2 overflow-y-auto">
                {!showComparison ? (
                  <div className="h-full">
                    <PageBuilder
                      brandKey="workhorse"
                      sections={createSections(true)}
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                    <div className="border-r border-gray-200">
                      <div className="py-1 px-2 bg-gray-100 border-b text-center text-xs font-medium">
                        Custom Layout Style
                      </div>
                      <PageBuilder
                        brandKey="workhorse"
                        sections={createSections(true)}
                      />
                    </div>
                    <div>
                      <div className="py-1 px-2 bg-gray-100 border-b text-center text-xs font-medium">
                        Default Style
                      </div>
                      <PageBuilder
                        brandKey="workhorse"
                        sections={createSections(false)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
          
          {/* Design principles card */}
          <Card className="p-6 border border-gray-200">
            <h2 className="fluid-text-xl font-medium mb-4">Editorial Design Principles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-base font-medium mb-2 text-blue-700">Visual Rhythm</h3>
                <p className="text-sm text-gray-600">
                  Typography creates a cadence that guides the reader through content, 
                  setting a pace for information consumption. Like music, varied type scales 
                  establish patterns that create moments of emphasis and rest.
                </p>
              </div>
              
              <div>
                <h3 className="text-base font-medium mb-2 text-blue-700">Content Hierarchy</h3>
                <p className="text-sm text-gray-600">
                  The relative size and weight of text elements create an intuitive understanding 
                  of content structure. Larger elements demand attention first, establishing the 
                  narrative flow of the page.
                </p>
              </div>
              
              <div>
                <h3 className="text-base font-medium mb-2 text-blue-700">Narrative Pacing</h3>
                <p className="text-sm text-gray-600">
                  Spacing and scale work together to control how quickly a reader moves through content. 
                  Strategic typographic choices can slow down for important information or speed up for 
                  transitional content.
                </p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="text-base font-medium mb-2">Layout Styles Explained</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex gap-2">
                  <div className="font-bold text-blue-700 min-w-[80px]">Magazine:</div>
                  <div className="text-gray-600">Bold headlines and generous white space create an impactful introduction followed by well-paced content sections.</div>
                </div>
                <div className="flex gap-2">
                  <div className="font-bold text-blue-700 min-w-[80px]">Editorial:</div>
                  <div className="text-gray-600">Refined proportions with elegant spacing create a sophisticated reading experience for long-form content.</div>
                </div>
                <div className="flex gap-2">
                  <div className="font-bold text-blue-700 min-w-[80px]">Dramatic:</div>
                  <div className="text-gray-600">High contrast between headline and body sizes creates emotional impact and establishes strong narrative arcs.</div>
                </div>
                <div className="flex gap-2">
                  <div className="font-bold text-blue-700 min-w-[80px]">Compact:</div>
                  <div className="text-gray-600">Tighter spacing and more efficient scale for information-dense content that prioritizes scanning and comprehension.</div>
                </div>
                <div className="flex gap-2">
                  <div className="font-bold text-blue-700 min-w-[80px]">Minimal:</div>
                  <div className="text-gray-600">Subtle hierarchy with understated proportions that let the content itself take center stage without typographic distraction.</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TypographyFlowDemo;
 