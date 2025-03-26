import React, { useState } from "react";
import { DashboardLayout } from "../components/layouts/DashboardLayout";
import { BrandContainer } from "../components/brand/BrandContainer";
import { BrandGrid } from "../components/brand/BrandGrid";
import { BrandHeading } from "../components/brand/BrandHeading";
import { BrandText } from "../components/brand/BrandText";
import { BrandCard, CardContent, CardHeader, CardTitle } from "../components/brand/BrandCard";
import { BrandSwitcher } from "../components/brand/BrandSwitcher";
import { useBrand } from "../components/brand/BrandProvider";

// Import our themed UI components
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Banner, BannerTitle, BannerDescription } from "../components/ui/banner";

// Import icons
import { 
  FiInfo, 
  FiAlertCircle, 
  FiCheckCircle, 
  FiAlertTriangle,
  FiPlus,
  FiEdit,
  FiTrash,
  FiDownload,
  FiUpload,
  FiSettings
} from "react-icons/fi";

export function ThemeDemo() {
  const { currentBrand } = useBrand();
  const [showBanner, setShowBanner] = useState(true);

  return (
    <DashboardLayout>
      {showBanner && (
        <Banner 
          variant="marketing" 
          position="top" 
          onClose={() => setShowBanner(false)}
        >
          <div>
            <BannerTitle>Try our new components!</BannerTitle>
            <BannerDescription>We've added new themed components that support both light and dark modes.</BannerDescription>
          </div>
        </Banner>
      )}

      <BrandContainer maxWidth="xl" padding="md">
        <div className="flex justify-between items-center mb-8">
          <div>
            <BrandHeading level={1}>Theme UI Components</BrandHeading>
            <BrandText size="lg" color="muted">
              Modern, customizable UI components with Tailwind theming support
            </BrandText>
          </div>
          <div className="mt-2">
            <BrandSwitcher variant="dropdown" label="Select Brand" />
          </div>
        </div>

        {/* Button Examples */}
        <BrandCard className="mb-8">
          <CardHeader>
            <CardTitle>
              <BrandHeading level={4}>Themed Buttons</BrandHeading>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-6">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link Style</Button>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <Button variant="brand">Brand</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="info">Info</Button>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="default" size="sm">Small</Button>
              <Button variant="default" size="default">Default</Button>
              <Button variant="default" size="lg">Large</Button>
              <Button variant="outline" size="icon"><FiPlus /></Button>
              <Button variant="destructive" size="icon"><FiTrash /></Button>
              <Button variant="ghost" size="icon"><FiEdit /></Button>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <Button variant="default">
                <FiDownload className="mr-2 h-4 w-4" /> Download
              </Button>
              <Button variant="outline">
                <FiUpload className="mr-2 h-4 w-4" /> Upload
              </Button>
              <Button variant="secondary">
                <FiSettings className="mr-2 h-4 w-4" /> Settings
              </Button>
            </div>
          </CardContent>
        </BrandCard>

        {/* Alert Examples */}
        <BrandCard className="mb-8">
          <CardHeader>
            <CardTitle>
              <BrandHeading level={4}>Themed Alerts</BrandHeading>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="default">
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>
                This is a default alert with neutral styling.
              </AlertDescription>
            </Alert>
            
            <Alert variant="info">
              <FiInfo className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This is an informational message with important details.
              </AlertDescription>
            </Alert>
            
            <Alert variant="success">
              <FiCheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your action was completed successfully without any issues.
              </AlertDescription>
            </Alert>
            
            <Alert variant="warning">
              <FiAlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                There are some issues that need your attention before proceeding.
              </AlertDescription>
            </Alert>
            
            <Alert variant="destructive">
              <FiAlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                There was a problem with your submission. Please check the form.
              </AlertDescription>
            </Alert>
            
            <Alert variant="muted">
              <AlertTitle>Note</AlertTitle>
              <AlertDescription>
                This is a subtle notification that doesn't require immediate attention.
              </AlertDescription>
            </Alert>
          </CardContent>
        </BrandCard>

        {/* Badge Examples */}
        <BrandGrid columns={2} gap="md">
          <BrandCard>
            <CardHeader>
              <CardTitle>
                <BrandHeading level={4}>Themed Badges</BrandHeading>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="muted">Muted</Badge>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center">
                  <Badge variant="default" className="mr-1">Badge</Badge>
                  <BrandText>with text</BrandText>
                </div>
                
                <div className="flex items-center">
                  <Badge variant="success" className="mr-1">New</Badge>
                  <BrandText>Feature released</BrandText>
                </div>
                
                <div className="flex items-center">
                  <Badge variant="warning" className="mr-1">24</Badge>
                  <BrandText>Notifications</BrandText>
                </div>
              </div>
            </CardContent>
          </BrandCard>

          {/* Banner Examples */}
          <BrandCard>
            <CardHeader>
              <CardTitle>
                <BrandHeading level={4}>Banner Examples</BrandHeading>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="info" className="mb-4">
                <FiInfo className="h-4 w-4" />
                <AlertDescription className="ml-2">
                  Click on a banner to toggle it at the page top
                </AlertDescription>
              </Alert>
              
              <div 
                className="cursor-pointer"
                onClick={() => {
                  setShowBanner(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <Banner variant="info" className="mb-4">
                  <div>
                    <BannerTitle>Information Banner</BannerTitle>
                    <BannerDescription>System maintenance scheduled for tomorrow.</BannerDescription>
                  </div>
                </Banner>
              </div>
              
              <div 
                className="cursor-pointer"
                onClick={() => {
                  setShowBanner(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <Banner variant="success" className="mb-4">
                  <div>
                    <BannerTitle>Success Banner</BannerTitle>
                    <BannerDescription>Your changes have been saved successfully.</BannerDescription>
                  </div>
                </Banner>
              </div>
              
              <div 
                className="cursor-pointer"
                onClick={() => {
                  setShowBanner(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <Banner variant="warning" className="mb-4">
                  <div>
                    <BannerTitle>Warning Banner</BannerTitle>
                    <BannerDescription>Your subscription will expire in 3 days.</BannerDescription>
                  </div>
                </Banner>
              </div>
              
              <div 
                className="cursor-pointer"
                onClick={() => {
                  setShowBanner(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <Banner variant="error">
                  <div>
                    <BannerTitle>Error Banner</BannerTitle>
                    <BannerDescription>There was a problem processing your payment.</BannerDescription>
                  </div>
                </Banner>
              </div>
            </CardContent>
          </BrandCard>
        </BrandGrid>
      </BrandContainer>
    </DashboardLayout>
  );
} 