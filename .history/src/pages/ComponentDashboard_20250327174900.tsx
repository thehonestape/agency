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

const ComponentDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-[80px]">
            <h2 className="text-lg font-semibold mb-4">Components</h2>
            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">Typography</Button>
              <Button variant="ghost" className="w-full justify-start">Colors</Button>
              <Button variant="ghost" className="w-full justify-start">Layout</Button>
              <Button variant="ghost" className="w-full justify-start">Forms</Button>
              <Button variant="ghost" className="w-full justify-start">Feedback</Button>
              <Button variant="ghost" className="w-full justify-start">Navigation</Button>
              <Button variant="ghost" className="w-full justify-start">Data Display</Button>
              <Button variant="ghost" className="w-full justify-start">Marketing</Button>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Component Library</h1>
            <p className="text-lg text-muted-foreground">
              Explore our collection of semantic UI components
            </p>
          </div>

          {/* Color System */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Color System</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card title="Primary Colors" description="Main brand colors">
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-2">
                    <div className="h-10 rounded-md bg-primary" />
                    <div className="h-10 rounded-md bg-primary/80" />
                    <div className="h-10 rounded-md bg-primary/60" />
                    <div className="h-10 rounded-md bg-primary/40" />
                    <div className="h-10 rounded-md bg-primary/20" />
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="h-10 rounded-md bg-primary-foreground" />
                    <div className="h-10 rounded-md bg-primary-foreground/80" />
                    <div className="h-10 rounded-md bg-primary-foreground/60" />
                    <div className="h-10 rounded-md bg-primary-foreground/40" />
                    <div className="h-10 rounded-md bg-primary-foreground/20" />
                  </div>
                </div>
              </Card>

              <Card title="Neutral Colors" description="Background and text colors">
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-2">
                    <div className="h-10 rounded-md bg-background" />
                    <div className="h-10 rounded-md bg-card" />
                    <div className="h-10 rounded-md bg-muted" />
                    <div className="h-10 rounded-md bg-border" />
                    <div className="h-10 rounded-md bg-input" />
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="h-10 rounded-md bg-foreground" />
                    <div className="h-10 rounded-md bg-card-foreground" />
                    <div className="h-10 rounded-md bg-muted-foreground" />
                    <div className="h-10 rounded-md bg-secondary-foreground" />
                    <div className="h-10 rounded-md bg-accent-foreground" />
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Form Components */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Form Components</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card title="Basic Inputs" description="Text input and textarea examples">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" placeholder="Tell us about yourself" />
                  </div>
                </div>
              </Card>

              <Card title="Advanced Inputs" description="Specialized input components">
                <div className="space-y-4">
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
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
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
            </div>
          </section>

          {/* Feedback Components */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Feedback Components</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card title="Alerts & Toasts" description="Status and feedback messages">
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
                </div>
              </Card>

              <Card title="AI Assistant" description="AI-powered feedback and assistance">
                <div className="space-y-4">
                  <AIAssistant />
                  <AiFallbackMessage />
                </div>
              </Card>
            </div>
          </section>

          {/* Data Display */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Display</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card title="Tables & Lists" description="Data presentation components">
                <div className="space-y-4">
                  {/* Add your table/list components here */}
                </div>
              </Card>

              <Card title="Charts & Graphs" description="Data visualization components">
                <div className="space-y-4">
                  {/* Add your chart components here */}
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