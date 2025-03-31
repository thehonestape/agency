import React from 'react';
import { Card } from '../components/patterns/cards/Card';
import Button from '../components/protocol/Button';
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
    updatedAt: new Date()
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-[80px]">
            <h2 className="text-lg font-semibold mb-4">Components</h2>
            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">Form Patterns</Button>
              <Button variant="ghost" className="w-full justify-start">List Patterns</Button>
              <Button variant="ghost" className="w-full justify-start">Dashboard Patterns</Button>
              <Button variant="ghost" className="w-full justify-start">UI Components</Button>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Component Library</h1>
            <p className="text-lg text-muted-foreground">
              Explore our collection of semantic UI components and patterns
            </p>
          </div>

          {/* Form Patterns */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Form Patterns</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card title="Create Organization" description="Form for creating a new organization">
                <CreateOrganizationForm />
              </Card>

              <Card title="Create Project" description="Form for creating a new project">
                <div className="p-4 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">
                    This form requires a valid brand ID and proper service configuration to function.
                  </p>
                </div>
              </Card>

              <Card title="Create Asset" description="Form for creating a new asset">
                <CreateAssetForm 
                  projectId="project1"
                  onAssetCreated={() => {}}
                  onCancel={() => {}}
                />
              </Card>
            </div>
          </section>

          {/* List Patterns */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">List Patterns</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card title="Organization List" description="List of organizations with actions">
                <OrganizationList />
              </Card>

              <Card title="Project List" description="List of projects with status">
                <ProjectList 
                  brandId="brand1"
                  onSelectProject={() => {}}
                />
              </Card>

              <Card title="Project Phases" description="Project phase tracking">
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
              </Card>

              <Card title="Project Details" description="Detailed project information">
                <ProjectDetails 
                  project={mockProject}
                  artifacts={mockArtifacts}
                  onAdvancePhase={() => {}}
                  onCreateArtifact={() => {}}
                  onUpdateArtifactStatus={() => {}}
                />
              </Card>

              <Card title="Asset List" description="List of assets with metadata">
                <AssetList 
                  assets={mockAssets}
                  onSelect={() => {}}
                  onDelete={() => {}}
                />
              </Card>

              <Card title="Asset Details" description="Detailed asset information">
                <AssetDetails />
              </Card>
            </div>
          </section>

          {/* Dashboard Patterns */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Dashboard Patterns</h2>
            <div className="grid gap-6">
              <Card title="Project Dashboard" description="Project overview with metrics and insights">
                <ProjectDashboard 
                  projects={[mockProject]}
                  selectedProject={mockProject}
                  artifacts={mockArtifacts}
                  onSelectProject={() => {}}
                />
              </Card>

              <Card title="AI Usage Dashboard" description="AI service usage analytics">
                <AIUsageDashboard />
              </Card>

              <Card title="AI Analytics Dashboard" description="AI performance and insights">
                <AIAnalyticsDashboard />
              </Card>
            </div>
          </section>

          {/* UI Components */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">UI Components</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card title="Form Elements" description="Basic form input components">
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
              </Card>

              <Card title="Date & Time" description="Date and time selection">
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
              </Card>

              <Card title="Form States" description="Different form input states">
                <div className="space-y-4">
                  <FormDisabled />
                  <FormLoading />
                  <FormReadOnly />
                  <FormError message="This field is required" />
                  <FormSuccess message="Changes saved successfully" />
                  <FormWarning message="Please review your changes" />
                </div>
              </Card>

              <Card title="Feedback" description="Status and feedback messages">
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
              </Card>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ComponentDashboard; 