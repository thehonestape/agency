import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';
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
import { ScrollArea as ScrollAreaComponent } from '../components/ui/scroll-area';
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
import { FormDisabled, FormLoading, FormReadonly, FormError, FormSuccess, FormWarning } from '../components/ui/form';
import { AIAssistant } from '../components/ui/feedback/AIAssistant';
import { ErrorBoundary } from '../components/ui/feedback/ErrorBoundary';
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
              <Card>
                <CardHeader>
                  <CardTitle>Primary Colors</CardTitle>
                  <CardDescription>Main brand colors</CardDescription>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Neutral Colors</CardTitle>
                  <CardDescription>Background and text colors</CardDescription>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Form Components */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Form Components</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Inputs</CardTitle>
                  <CardDescription>Text input and textarea examples</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" placeholder="Tell us about yourself" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Advanced Inputs</CardTitle>
                  <CardDescription>Specialized input components</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Date & Time</CardTitle>
                  <CardDescription>Date and time selection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Form States</CardTitle>
                  <CardDescription>Different form input states</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormDisabled />
                  <FormLoading />
                  <FormReadonly />
                  <FormError />
                  <FormSuccess />
                  <FormWarning />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Feedback Components */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Feedback Components</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alerts & Toasts</CardTitle>
                  <CardDescription>Status and feedback messages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>Your changes have been saved.</AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>Something went wrong. Please try again.</AlertDescription>
                  </Alert>
                  <Toast />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Assistant</CardTitle>
                  <CardDescription>AI-powered feedback and assistance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AIAssistant />
                  <AiFallbackMessage />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Data Display */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Display</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Interface</CardTitle>
                  <CardDescription>User profile and navigation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <Tabs defaultValue="account">
                    <TabsList>
                      <TabsTrigger value="account">Account</TabsTrigger>
                      <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">Account settings</TabsContent>
                    <TabsContent value="password">Password settings</TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Loading States</CardTitle>
                  <CardDescription>Loading and skeleton states</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[300px]" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ComponentDashboard; 