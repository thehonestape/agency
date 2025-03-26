import React from "react";
import { DashboardLayout } from "../components/layouts/DashboardLayout";
import { BrandHeading } from "../components/brand/BrandHeading";
import { BrandText } from "../components/brand/BrandText";
import { BrandContainer } from "../components/brand/BrandContainer";
import { BrandGrid } from "../components/brand/BrandGrid";
import { BrandCard, CardContent, CardHeader, CardTitle } from "../components/brand/BrandCard";
import { BrandStyledButton } from "../components/brand/BrandStyledButton";
import { BrandSwitcher } from "../components/brand/BrandSwitcher";
import { useBrand, useBrandColors, useBrandTypography } from "../components/brand/BrandProvider";
import { FiInfo, FiPlus, FiCheck, FiAlertTriangle, FiHome, FiUsers, FiSettings, FiFile, FiHelpCircle } from "react-icons/fi";
import { BrandNav } from "../components/brand/BrandNav";

function ColorPalette() {
  const colors = useBrandColors();
  const { currentBrand } = useBrand();

  return (
    <BrandCard>
      <CardHeader>
        <CardTitle>
          <BrandHeading level={3}>Color Palette</BrandHeading>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colors.map(color => (
              <div key={color.name} className="space-y-2">
                <div 
                  className="h-16 w-full rounded-md border" 
                  style={{ backgroundColor: color.value }}
                />
                <div>
                  <BrandText weight="medium" size="sm">{color.name}</BrandText>
                  <BrandText size="xs" color="muted">{color.value}</BrandText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </BrandCard>
  );
}

function TypographyDemo() {
  const typography = useBrandTypography();

  return (
    <BrandCard>
      <CardHeader>
        <CardTitle>
          <BrandHeading level={3}>Typography</BrandHeading>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <BrandText size="sm" color="muted" className="mb-2">Heading Font: {typography?.headingFont || typography?.fontFamily}</BrandText>
            <div className="space-y-4">
              <BrandHeading level={1}>Heading 1</BrandHeading>
              <BrandHeading level={2}>Heading 2</BrandHeading>
              <BrandHeading level={3}>Heading 3</BrandHeading>
              <BrandHeading level={4}>Heading 4</BrandHeading>
              <BrandHeading level={5}>Heading 5</BrandHeading>
              <BrandHeading level={6}>Heading 6</BrandHeading>
            </div>
          </div>
          
          <div>
            <BrandText size="sm" color="muted" className="mb-2">Body Font: {typography?.bodyFont || typography?.fontFamily}</BrandText>
            <div className="space-y-4">
              <BrandText size="xs">Extra Small Text</BrandText>
              <BrandText size="sm">Small Text</BrandText>
              <BrandText size="base">Base Text</BrandText>
              <BrandText size="lg">Large Text</BrandText>
              <BrandText size="xl">Extra Large Text</BrandText>
              <BrandText size="xl">Double XL Text</BrandText>
            </div>
          </div>
          
          <div>
            <BrandText size="sm" color="muted" className="mb-2">Text Weights</BrandText>
            <div className="space-y-2">
              <BrandText weight="light">Light Text Weight</BrandText>
              <BrandText weight="regular">Regular Text Weight</BrandText>
              <BrandText weight="medium">Medium Text Weight</BrandText>
              <BrandText weight="semiBold">SemiBold Text Weight</BrandText>
              <BrandText weight="bold">Bold Text Weight</BrandText>
            </div>
          </div>
        </div>
      </CardContent>
    </BrandCard>
  );
}

function ButtonsDemo() {
  return (
    <BrandCard>
      <CardHeader>
        <CardTitle>
          <BrandHeading level={3}>Buttons</BrandHeading>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <BrandText size="sm" color="muted" className="mb-3">Default Variant</BrandText>
            <div className="flex flex-wrap gap-3">
              <BrandStyledButton colorVariant="primary">Primary</BrandStyledButton>
              <BrandStyledButton colorVariant="secondary">Secondary</BrandStyledButton>
              <BrandStyledButton colorVariant="accent">Accent</BrandStyledButton>
              <BrandStyledButton colorVariant="neutral">Neutral</BrandStyledButton>
            </div>
          </div>
          
          <div>
            <BrandText size="sm" color="muted" className="mb-3">Outline Variant</BrandText>
            <div className="flex flex-wrap gap-3">
              <BrandStyledButton variant="outline" colorVariant="primary">Primary</BrandStyledButton>
              <BrandStyledButton variant="outline" colorVariant="secondary">Secondary</BrandStyledButton>
              <BrandStyledButton variant="outline" colorVariant="accent">Accent</BrandStyledButton>
              <BrandStyledButton variant="outline" colorVariant="neutral">Neutral</BrandStyledButton>
            </div>
          </div>
          
          <div>
            <BrandText size="sm" color="muted" className="mb-3">Rounded & Subtle</BrandText>
            <div className="flex flex-wrap gap-3">
              <BrandStyledButton rounded>Rounded Button</BrandStyledButton>
              <BrandStyledButton subtle>Subtle Button</BrandStyledButton>
              <BrandStyledButton rounded subtle>Rounded & Subtle</BrandStyledButton>
            </div>
          </div>
          
          <div>
            <BrandText size="sm" color="muted" className="mb-3">With Icons</BrandText>
            <div className="flex flex-wrap gap-3">
              <BrandStyledButton>
                <FiPlus className="mr-2 h-4 w-4" />
                Add New
              </BrandStyledButton>
              <BrandStyledButton colorVariant="secondary">
                <FiCheck className="mr-2 h-4 w-4" />
                Confirm
              </BrandStyledButton>
              <BrandStyledButton colorVariant="accent">
                <FiInfo className="mr-2 h-4 w-4" />
                Information
              </BrandStyledButton>
              <BrandStyledButton variant="outline" colorVariant="neutral">
                <FiAlertTriangle className="mr-2 h-4 w-4" />
                Warning
              </BrandStyledButton>
            </div>
          </div>
          
          <div>
            <BrandText size="sm" color="muted" className="mb-3">Button Sizes</BrandText>
            <div className="flex flex-wrap items-center gap-3">
              <BrandStyledButton size="sm">Small</BrandStyledButton>
              <BrandStyledButton size="default">Default</BrandStyledButton>
              <BrandStyledButton size="lg">Large</BrandStyledButton>
            </div>
          </div>
        </div>
      </CardContent>
    </BrandCard>
  );
}

function BrandSwitcherDemo() {
  return (
    <BrandCard>
      <CardHeader>
        <CardTitle>
          <BrandHeading level={3}>Brand Switcher</BrandHeading>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div>
            <BrandText size="sm" color="muted" className="mb-3">Inline Variant (Default)</BrandText>
            <BrandSwitcher variant="inline" />
          </div>
          
          <div>
            <BrandText size="sm" color="muted" className="mb-3">Pills Variant</BrandText>
            <BrandSwitcher variant="pills" label="Choose a Brand" />
          </div>
          
          <div>
            <BrandText size="sm" color="muted" className="mb-3">Dropdown Variant</BrandText>
            <BrandSwitcher variant="dropdown" label="Select Brand" className="max-w-md" />
          </div>
        </div>
      </CardContent>
    </BrandCard>
  );
}

function NavDemo() {
  const demoNavItems = [
    { label: "Home", href: "/brand-demo", icon: <FiHome className="h-4 w-4" />, isActive: true },
    { label: "Projects", href: "/projects", icon: <FiFile className="h-4 w-4" /> },
    { label: "Team", href: "/team", icon: <FiUsers className="h-4 w-4" /> },
    { label: "Settings", href: "/settings", icon: <FiSettings className="h-4 w-4" /> },
    { label: "Help", href: "/help", icon: <FiHelpCircle className="h-4 w-4" /> },
  ];

  return (
    <BrandCard>
      <CardHeader>
        <CardTitle>
          <BrandHeading level={3}>Navigation</BrandHeading>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div>
            <BrandText size="sm" color="muted" className="mb-3">Default Variant</BrandText>
            <BrandNav items={demoNavItems} variant="default" />
          </div>
          
          <div>
            <BrandText size="sm" color="muted" className="mb-3">Pills Variant</BrandText>
            <BrandNav items={demoNavItems} variant="pills" rounded />
          </div>
          
          <div>
            <BrandText size="sm" color="muted" className="mb-3">Tabs Variant</BrandText>
            <BrandNav items={demoNavItems} variant="tabs" />
          </div>
          
          <div>
            <BrandText size="sm" color="muted" className="mb-3">Underline Variant</BrandText>
            <BrandNav items={demoNavItems} variant="underline" />
          </div>
          
          <div>
            <BrandText size="sm" color="muted" className="mb-3">Minimal Variant</BrandText>
            <BrandNav items={demoNavItems} variant="minimal" />
          </div>
          
          <div>
            <BrandText size="sm" color="muted" className="mb-3">Vertical Navigation</BrandText>
            <div className="w-64 border rounded-md p-4">
              <BrandNav 
                items={demoNavItems} 
                direction="vertical"
                variant="minimal"
                fullWidth
              />
            </div>
          </div>
          
          <div>
            <BrandText size="sm" color="muted" className="mb-3">Icon Position</BrandText>
            <div className="space-y-6">
              <BrandNav 
                items={demoNavItems} 
                variant="pills" 
                iconPosition="left" 
                rounded 
                colorScheme="secondary"
              />
              <BrandNav 
                items={demoNavItems} 
                variant="pills" 
                iconPosition="right" 
                rounded 
                colorScheme="accent"
              />
              <BrandNav 
                items={demoNavItems.slice(0, 4)} 
                variant="pills" 
                iconPosition="top" 
                rounded 
                colorScheme="primary"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </BrandCard>
  );
}

function CardDemo() {
  return (
    <BrandCard>
      <CardHeader>
        <CardTitle>
          <BrandHeading level={3}>Cards</BrandHeading>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <BrandText size="sm" color="muted" className="mb-3">Card with Color Accents</BrandText>
            <BrandGrid columns={3} gap="md" responsive>
              <BrandCard colorAccent="primary" accentPosition="top">
                <CardHeader>
                  <CardTitle>Primary Accent (Top)</CardTitle>
                </CardHeader>
                <CardContent>
                  <BrandText>Cards can have color accents based on the brand colors.</BrandText>
                </CardContent>
              </BrandCard>
              
              <BrandCard colorAccent="secondary" accentPosition="left">
                <CardHeader>
                  <CardTitle>Secondary Accent (Left)</CardTitle>
                </CardHeader>
                <CardContent>
                  <BrandText>The accent position can be customized.</BrandText>
                </CardContent>
              </BrandCard>
              
              <BrandCard colorAccent="accent" accentPosition="bottom">
                <CardHeader>
                  <CardTitle>Accent Color (Bottom)</CardTitle>
                </CardHeader>
                <CardContent>
                  <BrandText>Different accent colors for different purposes.</BrandText>
                </CardContent>
              </BrandCard>
            </BrandGrid>
          </div>
          
          <div>
            <BrandText size="sm" color="muted" className="mb-3">Card Elevations</BrandText>
            <BrandGrid columns={3} gap="md" responsive>
              <BrandCard elevation="none">
                <CardHeader>
                  <CardTitle>No Elevation</CardTitle>
                </CardHeader>
                <CardContent>
                  <BrandText>Flat card with no shadow.</BrandText>
                </CardContent>
              </BrandCard>
              
              <BrandCard elevation="low">
                <CardHeader>
                  <CardTitle>Low Elevation</CardTitle>
                </CardHeader>
                <CardContent>
                  <BrandText>Subtle shadow for a slight lift.</BrandText>
                </CardContent>
              </BrandCard>
              
              <BrandCard elevation="high">
                <CardHeader>
                  <CardTitle>High Elevation</CardTitle>
                </CardHeader>
                <CardContent>
                  <BrandText>Pronounced shadow for emphasis.</BrandText>
                </CardContent>
              </BrandCard>
            </BrandGrid>
          </div>
        </div>
      </CardContent>
    </BrandCard>
  );
}

function CurrentBrandInfo() {
  const { currentBrand } = useBrand();
  
  return (
    <BrandCard colorAccent="primary" accentPosition="top" className="mb-8">
      <CardHeader>
        <CardTitle>
          <BrandHeading level={2}>
            {currentBrand?.name} 
            <span className="text-muted-foreground text-lg ml-2">({currentBrand?.client})</span>
          </BrandHeading>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <BrandText className="mb-4">{currentBrand?.description}</BrandText>
        
        <BrandGrid columns={2} gap="md">
          <div>
            <BrandText weight="medium" className="mb-1">Voice Tone</BrandText>
            <BrandText color="muted" className="mb-2">{currentBrand?.voice?.tone}</BrandText>
            
            <BrandText weight="medium" className="mb-1">Voice Characteristics</BrandText>
            <ul className="list-disc ml-5">
              {currentBrand?.voice?.characteristics.map((char, index) => (
                <li key={index}><BrandText size="sm">{char}</BrandText></li>
              ))}
            </ul>
          </div>
          
          <div>
            <BrandText weight="medium" className="mb-1">Brand Terminology</BrandText>
            {currentBrand?.terminology && Object.entries(currentBrand.terminology).length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(currentBrand.terminology).map(([key, value]) => (
                  <div key={key}>
                    <BrandText size="sm" weight="medium">{key}:</BrandText>
                    <BrandText size="sm" color="muted">{value}</BrandText>
                  </div>
                ))}
              </div>
            ) : (
              <BrandText color="muted">No custom terminology defined</BrandText>
            )}
          </div>
        </BrandGrid>
      </CardContent>
    </BrandCard>
  );
}

export function BrandDemoPage() {
  return (
    <DashboardLayout>
      <BrandContainer maxWidth="xl" padding="md">
        <BrandHeading level={1} className="mb-8">Brand System Demo</BrandHeading>
        
        <CurrentBrandInfo />
        
        <BrandGrid columns={1} gap="lg">
          <BrandSwitcherDemo />
          <ColorPalette />
          <TypographyDemo />
          <ButtonsDemo />
          <NavDemo />
          <CardDemo />
        </BrandGrid>
      </BrandContainer>
    </DashboardLayout>
  );
} 