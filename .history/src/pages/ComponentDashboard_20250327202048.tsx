import React from 'react';
import { BrandSidebarWithHeader } from '../layouts/application/sidebar/BrandSidebarWithHeader';
import { Card } from '../components/patterns/cards/Card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { RadioGroup } from '../components/ui/radio';
import { Switch } from '../components/ui/switch';
import { Slider } from '../components/ui/slider';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ScrollArea } from '../components/ui/scroll-area';
import { Skeleton } from '../components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { Combobox } from '../components/ui/combobox';
import { Toast } from '../components/ui/toast';
import { DatePicker } from '../components/ui/form/date-picker';
import { TimePicker } from '../components/ui/form/time-picker';
import { MonthPicker } from '../components/ui/form/month-picker';
import { DateTimePicker } from '../components/ui/form/date-time-picker';
import { ColorPicker } from '../components/ui/form/color-picker';
import { PasswordInput } from '../components/ui/form/password-input';
import { RangeInput } from '../components/ui/form/range-input';
import { RatingInput } from '../components/ui/form/rating-input';
import { TagInput } from '../components/ui/form/tag-input';
import { FormGrid, FormRow, FormSection, FormGroup } from '../components/ui/form';
import { FormDisabled, FormLoading, FormReadOnly, FormError, FormSuccess, FormWarning } from '../components/ui/form';
import { AIAssistant } from '../components/ui/feedback/AIAssistant';
import ErrorBoundary from '../components/ui/feedback/ErrorBoundary';
import { AiFallbackMessage } from '../components/ui/feedback/AiFallbackMessage';
import { Heading, Text } from '../components/ui/typography';
import { CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/button';
import { 
  FiLayout as Layout,
  FiFileText as FormInput,
  FiList as List,
  FiGrid as Grid,
  FiBox as Box,
  FiSettings as Settings,
  FiBell as Bell,
  FiMail as Mail
} from 'react-icons/fi';

// Import semantic components
import { CreateOrganizationForm } from '../components/patterns/forms/CreateOrganizationForm';
import { CreateProjectForm } from '../components/patterns/forms/CreateProjectForm';
import { CreateAssetForm } from '../components/patterns/forms/CreateAssetForm';
import { OrganizationList } from '../components/patterns/lists/OrganizationList';
import { ProjectList } from '../components/patterns/lists/ProjectList';
import { ProjectPhases } from '../components/patterns/lists/ProjectPhases';
import { ProjectDetails } from '../components/patterns/lists/ProjectDetails';
import { AssetList } from '../components/patterns/lists/AssetList';
import { AssetDetails } from '../components/patterns/lists/AssetDetails';
import { ProjectDashboard } from '../components/patterns/dashboard/ProjectDashboard';
import { AIUsageDashboard } from '../components/patterns/dashboard/AIUsageDashboard';
import { AIAnalyticsDashboard } from '../components/patterns/dashboard/AIAnalyticsDashboard';

// Mock data for components
const mockProject = {
  id: '1',
  name: 'Sample Project',
  clientId: 'client1',
  description: 'A sample project for demonstration',
  currentPhase: 'discovery' as const,
  startDate: new Date(),
  targetCompletionDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  status: 'active' as const,
  createdAt: new Date(),
  updatedAt: new Date()
};

const mockArtifacts = [
  {
    id: '1',
    phaseId: 'discovery-1',
    name: 'Project Brief',
    status: 'approved' as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    projectId: '1',
    artifactType: 'document' as const,
    version: 1,
    createdById: 'user1'
  }
];

const mockAssets = [
  {
    id: '1',
    project_id: '1',
    type: 'image' as const,
    file_url: 'https://example.com/image.jpg',
    version: 1,
    metadata: { name: 'Sample Image' },
    content: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const ComponentDashboard = () => {
  return (
    <BrandSidebarWithHeader>
      <div className="px-4 py-8">
        <div className="space-y-8">
          <section>
            <div className="flex items-center justify-between">
              <div>
                <Heading variant="h1" size="3xl">Component Library</Heading>
                <Text className="text-muted-foreground">Explore our collection of semantic UI components and patterns</Text>
              </div>
            </div>
          </section>

          {/* Form Patterns */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <Heading variant="h2" size="2xl">Form Patterns</Heading>
              <Button variant="outline" size="sm">
                View All Forms
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create Organization</CardTitle>
                  <CardDescription>Form for creating a new organization</CardDescription>
                </CardHeader>
                <CardContent>
                  <CreateOrganizationForm />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Create Project</CardTitle>
                  <CardDescription>Form for creating a new project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground">
                      This form requires a valid brand ID and proper service configuration to function.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Create Asset</CardTitle>
                  <CardDescription>Form for creating a new asset</CardDescription>
                </CardHeader>
                <CardContent>
                  <CreateAssetForm 
                    projectId="project1"
                    onAssetCreated={() => {}}
                    onCancel={() => {}}
                  />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* List Patterns */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <Heading variant="h2" size="2xl">List Patterns</Heading>
              <Button variant="outline" size="sm">
                View All Lists
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Organization List</CardTitle>
                  <CardDescription>List of organizations with actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <OrganizationList />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Project List</CardTitle>
                  <CardDescription>List of projects with status</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProjectList 
                    brandId="brand1"
                    onSelectProject={() => {}}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Project Phases</CardTitle>
                  <CardDescription>Project phase tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProjectPhases 
                    currentPhase="discovery"
                    phaseStatuses={{
                      discovery: 'in_progress',
                      definition: 'not_started',
                      design: 'not_started',
                      development: 'not_started'
                    }}
                    onPhaseClick={() => {}}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                  <CardDescription>Detailed project information</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProjectDetails 
                    project={mockProject}
                    artifacts={mockArtifacts}
                    onViewArtifact={() => {}}
                    onEditArtifact={() => {}}
                    onCreateArtifact={() => {}}
                    onUpdateArtifactStatus={() => {}}
                    onAdvancePhase={() => {}}
                    readOnly={false}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Asset List</CardTitle>
                  <CardDescription>List of assets with metadata</CardDescription>
                </CardHeader>
                <CardContent>
                  <AssetList 
                    assets={mockAssets}
                    onSelect={() => {}}
                    onDelete={() => {}}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Asset Details</CardTitle>
                  <CardDescription>Detailed asset information</CardDescription>
                </CardHeader>
                <CardContent>
                  <AssetDetails />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Dashboard Patterns */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <Heading variant="h2" size="2xl">Dashboard Patterns</Heading>
              <Button variant="outline" size="sm">
                View All Dashboards
              </Button>
            </div>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Dashboard</CardTitle>
                  <CardDescription>Project overview with metrics and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProjectDashboard 
                    projects={[mockProject]}
                    selectedProject={mockProject}
                    artifacts={mockArtifacts}
                    onSelectProject={() => {}}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Usage Dashboard</CardTitle>
                  <CardDescription>AI service usage analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <AIUsageDashboard />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Analytics Dashboard</CardTitle>
                  <CardDescription>AI performance and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <AIAnalyticsDashboard />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* UI Components */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <Heading variant="h2" size="2xl">UI Components</Heading>
              <Button variant="outline" size="sm">
                View All Components
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Form Elements</CardTitle>
                  <CardDescription>Basic form input components</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" placeholder="Tell us about yourself" />
                    </div>
                    <div className="space-y-2">
                      <Label>Password</Label>
                      <PasswordInput />
                    </div>
                    <div className="space-y-2">
                      <Label>Color</Label>
                      <ColorPicker />
                    </div>
                    <div className="space-y-2">
                      <Label>Rating</Label>
                      <RatingInput />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Date & Time</CardTitle>
                  <CardDescription>Date and time selection</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <DatePicker />
                    </div>
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <TimePicker />
                    </div>
                    <div className="space-y-2">
                      <Label>Month</Label>
                      <MonthPicker />
                    </div>
                    <div className="space-y-2">
                      <Label>Date & Time</Label>
                      <DateTimePicker />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Form States</CardTitle>
                  <CardDescription>Different form input states</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <FormDisabled />
                    <FormLoading />
                    <FormReadOnly />
                    <FormError message="This field is required" />
                    <FormSuccess message="Changes saved successfully" />
                    <FormWarning message="Please review your changes" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Feedback</CardTitle>
                  <CardDescription>Status and feedback messages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <AlertTitle>Success</AlertTitle>
                      <AlertDescription>Your changes have been saved.</AlertDescription>
                    </Alert>
                    <Alert variant="destructive">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>Something went wrong. Please try again.</AlertDescription>
                    </Alert>
                    <Toast />
                    <AIAssistant />
                    <AiFallbackMessage />
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </BrandSidebarWithHeader>
  );
};

export default ComponentDashboard; 