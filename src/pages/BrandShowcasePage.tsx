import React, { useEffect } from 'react';
import { FiCopy, FiExternalLink, FiInfo, FiCheck } from 'react-icons/fi';
import RootLayout from '../components/layouts/RootLayout';
import { BrandHeading } from '../components/brand/BrandHeading';
import { BrandText } from '../components/brand/BrandText';
import { BrandContainer } from '../components/brand/BrandContainer';
import { BrandGrid } from '../components/brand/BrandGrid';
import { BrandCard, CardContent, CardHeader, CardTitle } from '../components/brand/BrandCard';
import { BrandStyledButton } from '../components/brand/BrandStyledButton';
import { useBrand, useBrandTypography } from '../components/brand/BrandProvider';
import { useBrandMemory, useBrandMemoryVisualIdentity } from '../components/brand/BrandMemoryProvider';
import { Link } from 'react-router-dom';

const BrandShowcasePage = () => {
  const { setBrandBySlug, currentBrand } = useBrand();
  const { selectBrandMemory } = useBrandMemory();
  const typography = useBrandTypography();
  const visualIdentity = useBrandMemoryVisualIdentity('workhorse');

  // Set Workhorse brand
  useEffect(() => {
    setBrandBySlug('workhorse');
    selectBrandMemory('workhorse');
  }, [setBrandBySlug, selectBrandMemory]);

  // Color palette from visual identity
  const colorPalette = visualIdentity?.colorPalette || {
    primary: ["#1A2B5F"], // Deep Navy
    secondary: ["#708090"], // Slate Gray  
    accent: ["#FF6B6B", "#4ECDC4"], // Vibrant Coral, Soft Teal
    neutral: ["#FFFFFF", "#F7F7F7"], // Pure White, Light Gray
    semantic: {
      success: "#4ECDC4", // Soft Teal
      warning: "#FFC65A", // Amber
      error: "#FF6B6B", // Vibrant Coral
      info: "#708090" // Slate Gray
    }
  };

  return (
    <RootLayout>
      <BrandContainer maxWidth="lg" padding="md">
        <div className="mb-16">
          <BrandHeading level={1} className="mb-4">Workhorse Brand Showcase</BrandHeading>
          <BrandText size="lg" color="muted">
            This page showcases all the components and styling available for the Workhorse brand.
            Use these components to ensure consistent branding across the application.
          </BrandText>
          
          <div className="flex gap-4 mt-6">
            <Link to="/studio">
              <BrandStyledButton>
                Back to Studio
              </BrandStyledButton>
            </Link>
            <Link to="/brands/workhorse">
              <BrandStyledButton variant="outline">
                View Brand Memory
              </BrandStyledButton>
            </Link>
          </div>
        </div>

        {/* BRAND COLORS */}
        <section className="mb-16">
          <BrandHeading level={2} className="mb-6">Color Palette</BrandHeading>
          
          <div className="space-y-8">
            <div>
              <BrandHeading level={3} className="mb-4">Primary Colors</BrandHeading>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {colorPalette.primary.map((color, index) => (
                  <ColorCard key={index} name="Deep Navy" value={color} />
                ))}
              </div>
            </div>
            
            <div>
              <BrandHeading level={3} className="mb-4">Secondary Colors</BrandHeading>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {colorPalette.secondary.map((color, index) => (
                  <ColorCard key={index} name="Slate Gray" value={color} />
                ))}
              </div>
            </div>
            
            <div>
              <BrandHeading level={3} className="mb-4">Accent Colors</BrandHeading>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {colorPalette.accent.map((color, index) => (
                  <ColorCard key={index} name={index === 0 ? "Vibrant Coral" : "Soft Teal"} value={color} />
                ))}
              </div>
            </div>
            
            <div>
              <BrandHeading level={3} className="mb-4">Neutral Colors</BrandHeading>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {colorPalette.neutral.map((color, index) => (
                  <ColorCard key={index} name={index === 0 ? "Pure White" : "Light Gray"} value={color} />
                ))}
              </div>
            </div>
            
            <div>
              <BrandHeading level={3} className="mb-4">Semantic Colors</BrandHeading>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <ColorCard name="Success" value={colorPalette.semantic.success} />
                <ColorCard name="Warning" value={colorPalette.semantic.warning} />
                <ColorCard name="Error" value={colorPalette.semantic.error} />
                <ColorCard name="Info" value={colorPalette.semantic.info} />
              </div>
            </div>
          </div>
        </section>

        {/* TYPOGRAPHY */}
        <section className="mb-16">
          <BrandHeading level={2} className="mb-6">Typography</BrandHeading>
          
          <BrandGrid columns={2} gap="md" className="mb-8">
            <BrandCard>
              <CardHeader>
                <CardTitle>
                  <BrandHeading level={3}>Headings</BrandHeading>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <BrandText size="sm" color="muted" className="mb-2">
                      Heading Font: {typography?.headingFont || 'Inter'}
                    </BrandText>
                    <div className="space-y-4">
                      <BrandHeading level={1}>Heading 1</BrandHeading>
                      <BrandHeading level={2}>Heading 2</BrandHeading>
                      <BrandHeading level={3}>Heading 3</BrandHeading>
                      <BrandHeading level={4}>Heading 4</BrandHeading>
                      <BrandHeading level={5}>Heading 5</BrandHeading>
                      <BrandHeading level={6}>Heading 6</BrandHeading>
                    </div>
                  </div>
                </div>
              </CardContent>
            </BrandCard>

            <BrandCard>
              <CardHeader>
                <CardTitle>
                  <BrandHeading level={3}>Text Styles</BrandHeading>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <BrandText size="sm" color="muted" className="mb-2">
                      Body Font: {typography?.bodyFont || 'Inter'}
                    </BrandText>
                    <div className="space-y-4">
                      <BrandText size="xs">Extra Small Text (xs)</BrandText>
                      <BrandText size="sm">Small Text (sm)</BrandText>
                      <BrandText size="base">Base Text (base)</BrandText>
                      <BrandText size="lg">Large Text (lg)</BrandText>
                      <BrandText size="xl">Extra Large Text (xl)</BrandText>
                      <BrandText size="xl">Double XL Text</BrandText>
                    </div>
                  </div>
                </div>
              </CardContent>
            </BrandCard>
          </BrandGrid>

          <BrandGrid columns={2} gap="md">
            <BrandCard>
              <CardHeader>
                <CardTitle>
                  <BrandHeading level={3}>Text Weights</BrandHeading>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <BrandText weight="light">Light Weight Text (300)</BrandText>
                  <BrandText weight="regular">Regular Weight Text (400)</BrandText>
                  <BrandText weight="medium">Medium Weight Text (500)</BrandText>
                  <BrandText weight="semiBold">Semi Bold Weight Text (600)</BrandText>
                  <BrandText weight="bold">Bold Weight Text (700)</BrandText>
                </div>
              </CardContent>
            </BrandCard>

            <BrandCard>
              <CardHeader>
                <CardTitle>
                  <BrandHeading level={3}>Text Colors</BrandHeading>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <BrandText color="default">Default Text Color</BrandText>
                  <BrandText color="primary">Primary Text Color</BrandText>
                  <BrandText color="secondary">Secondary Text Color</BrandText>
                  <BrandText color="accent">Accent Text Color</BrandText>
                  <BrandText color="muted">Muted Text Color</BrandText>
                </div>
              </CardContent>
            </BrandCard>
          </BrandGrid>
        </section>

        {/* BUTTONS */}
        <section className="mb-16">
          <BrandHeading level={2} className="mb-6">Buttons</BrandHeading>
          
          <BrandCard>
            <CardHeader>
              <CardTitle>
                <BrandHeading level={3}>Button Variants</BrandHeading>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <BrandStyledButton>Default Button</BrandStyledButton>
                <BrandStyledButton variant="outline">Outline Button</BrandStyledButton>
                <BrandStyledButton variant="ghost">Ghost Button</BrandStyledButton>
                <BrandStyledButton variant="link">Link Button</BrandStyledButton>
              </div>
            </CardContent>
          </BrandCard>

          <div className="mt-8">
            <BrandCard>
              <CardHeader>
                <CardTitle>
                  <BrandHeading level={3}>Button with Icons</BrandHeading>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <BrandStyledButton>
                    <FiInfo className="mr-2" /> With Info Icon
                  </BrandStyledButton>
                  <BrandStyledButton>
                    <FiCheck className="mr-2" /> With Check Icon
                  </BrandStyledButton>
                  <BrandStyledButton variant="outline">
                    <FiExternalLink className="mr-2" /> External Link
                  </BrandStyledButton>
                  <BrandStyledButton variant="ghost">
                    <FiCopy className="mr-2" /> Copy Text
                  </BrandStyledButton>
                </div>
              </CardContent>
            </BrandCard>
          </div>
        </section>

        {/* CARDS */}
        <section className="mb-16">
          <BrandHeading level={2} className="mb-6">Cards</BrandHeading>
          
          <BrandGrid columns={3} gap="md">
            <BrandCard>
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>
              </CardHeader>
              <CardContent>
                <BrandText>
                  This is a basic card with a header and content.
                </BrandText>
              </CardContent>
            </BrandCard>
            
            <BrandCard>
              <CardHeader>
                <CardTitle>Card with Icon</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-blue-100">
                    <FiInfo className="text-blue-600" />
                  </div>
                  <BrandText>
                    This card includes an icon element.
                  </BrandText>
                </div>
              </CardContent>
            </BrandCard>
            
            <BrandCard>
              <CardHeader>
                <CardTitle>Card with Action</CardTitle>
              </CardHeader>
              <CardContent>
                <BrandText className="mb-4">
                  This card includes a call-to-action button.
                </BrandText>
                <BrandStyledButton size="sm">
                  Take Action
                </BrandStyledButton>
              </CardContent>
            </BrandCard>
          </BrandGrid>
        </section>

        {/* GRIDS & LAYOUTS */}
        <section className="mb-16">
          <BrandHeading level={2} className="mb-6">Grids & Layouts</BrandHeading>
          
          <BrandCard className="mb-8">
            <CardHeader>
              <CardTitle>
                <BrandHeading level={3}>BrandGrid Component</BrandHeading>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BrandText className="mb-4">
                The BrandGrid component allows for flexible grid layouts with responsive options.
              </BrandText>
              
              <BrandGrid columns={4} gap="md">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-gray-100 p-4 rounded-md text-center">
                    Grid Item {item}
                  </div>
                ))}
              </BrandGrid>
            </CardContent>
          </BrandCard>
          
          <BrandCard>
            <CardHeader>
              <CardTitle>
                <BrandHeading level={3}>BrandContainer Component</BrandHeading>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BrandText className="mb-4">
                The BrandContainer component provides consistent container widths and padding.
              </BrandText>
              
              <div className="space-y-4">
                <div className="border border-dashed border-gray-300 p-2">
                  <BrandContainer maxWidth="xs" padding="sm" className="bg-gray-100 p-2 text-center">
                    Extra Small Container
                  </BrandContainer>
                </div>
                
                <div className="border border-dashed border-gray-300 p-2">
                  <BrandContainer maxWidth="sm" padding="sm" className="bg-gray-100 p-2 text-center">
                    Small Container
                  </BrandContainer>
                </div>
                
                <div className="border border-dashed border-gray-300 p-2">
                  <BrandContainer maxWidth="md" padding="sm" className="bg-gray-100 p-2 text-center">
                    Medium Container
                  </BrandContainer>
                </div>
              </div>
            </CardContent>
          </BrandCard>
        </section>
      </BrandContainer>
    </RootLayout>
  );
};

// Helper component for color swatches
const ColorCard = ({ name, value }: { name: string; value: string }) => {
  const textColor = isLightColor(value) ? '#000000' : '#FFFFFF';
  
  return (
    <div className="overflow-hidden rounded-md border border-gray-200">
      <div 
        className="h-24 flex items-center justify-center" 
        style={{ backgroundColor: value, color: textColor }}
      >
        <span className="font-medium">{name}</span>
      </div>
      <div className="p-3 bg-white">
        <div className="flex justify-between items-center">
          <span className="text-sm font-mono">{value}</span>
          <button 
            className="text-gray-500 hover:text-gray-800"
            onClick={() => navigator.clipboard.writeText(value)}
            title="Copy color value"
          >
            <FiCopy size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to determine if a color is light or dark
const isLightColor = (color: string): boolean => {
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return true if light, false if dark
  return luminance > 0.5;
};

export default BrandShowcasePage; 