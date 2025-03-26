import { BrandProvider, BrandData } from '@/components/brand/BrandProvider';
import ThemeGenerator from '@/components/theme/ThemeGenerator';
import { workhorseBrand } from '@/data/workhorseBrand';
import React from 'react';

// Layout components - create simplified versions as we don't have the actual components
const AppShell: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div className="min-h-screen flex flex-col">
    <header className="border-b py-4 px-6 bg-background shadow-sm">
      <h1 className="text-xl font-bold">Workhorse Agency</h1>
    </header>
    <main className="flex-1">{children}</main>
    <footer className="border-t py-4 px-6 text-center text-muted-foreground">
      <p>© {new Date().getFullYear()} Workhorse Agency. All rights reserved.</p>
    </footer>
  </div>
);

// Custom BrandProvider wrapper that accepts initialBrand
const BrandProviderWithInitial: React.FC<{
  children: React.ReactNode;
  initialBrand: BrandData;
}> = ({children, initialBrand}) => {
  // In a real implementation, you'd modify the BrandProvider
  // Here we're creating a wrapper component
  
  // Set the brand in local storage so the original provider can find it
  React.useEffect(() => {
    if (initialBrand) {
      localStorage.setItem('current-brand', JSON.stringify(initialBrand));
    }
  }, [initialBrand]);
  
  return <BrandProvider>{children}</BrandProvider>;
};

export default function ThemeBuilderPage() {
  return (
    <AppShell>
      <BrandProviderWithInitial initialBrand={workhorseBrand}>
        <div className="container mx-auto py-8">
          <div className="max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">
              AI Theme Builder
            </h1>
            <p className="text-xl text-muted-foreground">
              Generate accessible and beautiful themes that maintain your brand identity while ensuring proper contrast 
              and WCAG compliance. This tool uses an AI-inspired algorithm to create optimal color relationships.
            </p>
          </div>
          
          <ThemeGenerator />
          
          <div className="max-w-4xl mx-auto mt-16 space-y-6">
            <h2 className="text-2xl font-bold">How It Works</h2>
            <p>
              Our AI-powered theme generator uses a contrast matrix approach inspired by Huemint to create color palettes 
              that maintain proper relationships between UI elements while staying true to your brand colors.
            </p>
            
            <h3 className="text-xl font-semibold mt-8">The Science Behind It</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              <div className="space-y-4">
                <h4 className="font-medium">Contrast Matrix</h4>
                <p className="text-muted-foreground">
                  We define ideal contrast relationships between UI elements (like text-background, button-background) 
                  and generate colors that satisfy these relationships while maintaining your brand identity.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">Accessibility First</h4>
                <p className="text-muted-foreground">
                  Every color combination is evaluated for WCAG compliance, ensuring that your UI is readable for all users.
                  We optimize for AA compliance by default, but can be adjusted to AAA standards.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">Brand Preservation</h4>
                <p className="text-muted-foreground">
                  Your primary brand colors are preserved while generating complementary colors that work harmoniously
                  across both light and dark modes.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">Intelligent Variations</h4>
                <p className="text-muted-foreground">
                  The temperature control lets you adjust how much the algorithm explores beyond your brand colors,
                  similar to how AI models use temperature to control creativity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </BrandProviderWithInitial>
    </AppShell>
  );
} 