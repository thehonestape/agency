import React from "react";
import { DashboardLayout } from "../components/layouts/DashboardLayout";
import { BrandContainer } from "../components/brand/BrandContainer";
import { BrandGrid } from "../components/brand/BrandGrid";
import { BrandHeading } from "../components/brand/BrandHeading";
import { BrandText } from "../components/brand/BrandText";
import { BrandCard, CardContent, CardHeader, CardTitle } from "../components/brand/BrandCard";
import { BrandSwitcher } from "../components/brand/BrandSwitcher";
import { useBrand } from "../components/brand/BrandProvider";

// Import directly from catalyst components to avoid type issues
import { Button } from "../components/catalyst/button";
import { Badge } from "../components/catalyst/badge";
import { Avatar } from "../components/catalyst/avatar";
import { Divider } from "../components/catalyst/divider";

// Import our new Alert component
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";

// Import icons for alerts
import { 
  FiInfo, 
  FiAlertCircle, 
  FiCheckCircle, 
  FiAlertTriangle 
} from "react-icons/fi";

export function CatalystDemo() {
  const { currentBrand } = useBrand();

  return (
    <DashboardLayout>
      <BrandContainer maxWidth="xl" padding="md">
        <div className="flex justify-between items-center mb-8">
          <div>
            <BrandHeading level={1}>Catalyst UI Demo</BrandHeading>
            <BrandText size="lg" color="muted">
              Showing integration of Catalyst UI with the {currentBrand?.name || "brand"} system
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
              <BrandHeading level={4}>Catalyst Buttons</BrandHeading>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button>Default Button</Button>
            <Button color="blue">Blue Button</Button>
            <Button color="green">Green Button</Button>
            <Button color="red">Red Button</Button>
            <Button color="amber">Amber Button</Button>
            <Button outline>Outline Button</Button>
            <Button plain>Plain Button</Button>
          </CardContent>
        </BrandCard>

        {/* Alert Examples */}
        <BrandCard className="mb-8">
          <CardHeader>
            <CardTitle>
              <BrandHeading level={4}>Alert Components</BrandHeading>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
                <BrandHeading level={4}>Catalyst Badges</BrandHeading>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge color="blue">Blue</Badge>
              <Badge color="green">Green</Badge>
              <Badge color="red">Red</Badge>
              <Badge color="yellow">Yellow</Badge>
              <Badge color="purple">Purple</Badge>
            </CardContent>
          </BrandCard>

          {/* Avatar Examples */}
          <BrandCard>
            <CardHeader>
              <CardTitle>
                <BrandHeading level={4}>Catalyst Avatars</BrandHeading>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Avatar
                src="https://placehold.co/100x100/1A365D/FFFFFF?text=AB"
                alt="User AB"
              />
              <Avatar
                src="https://placehold.co/100x100/74C69D/FFFFFF?text=CD"
                alt="User CD"
              />
              <Avatar
                src="https://placehold.co/100x100/0072CE/FFFFFF?text=EF"
                alt="User EF"
              />
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white">
                JD
              </div>
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-white">
                KL
              </div>
            </CardContent>
          </BrandCard>
        </BrandGrid>

        <Divider className="my-8" />

        <BrandText>
          This page demonstrates the integration of Catalyst UI components with our brand system.
          The components adapt to the current brand's styling when possible, making it easy to
          build consistent user interfaces across different brands.
        </BrandText>
      </BrandContainer>
    </DashboardLayout>
  );
} 