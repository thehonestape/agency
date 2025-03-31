import React from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Input } from '../../components/ui/input';
import { Checkbox } from '../../components/ui/checkbox';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';
import { Text } from '../../components/ui/typography';
import { Alert, AlertTitle, AlertDescription } from '../../components/ui/alert';

// Button examples
export const ButtonExamples = () => (
  <div className="flex flex-wrap gap-2">
    <Button>Default</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="destructive">Destructive</Button>
  </div>
);

// Card example
export const CardExample = () => (
  <Card>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card description here</CardDescription>
    </CardHeader>
    <CardContent>
      <Text>This is the main content of the card.</Text>
    </CardContent>
    <CardFooter>
      <Button>Action</Button>
    </CardFooter>
  </Card>
);

// Form field examples
export const InputExample = () => (
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" placeholder="Enter your email" />
  </div>
);

export const CheckboxExample = () => (
  <div className="flex items-center space-x-2">
    <Checkbox id="terms" />
    <Label htmlFor="terms">Accept terms</Label>
  </div>
);

export const SwitchExample = () => (
  <div className="flex items-center space-x-2">
    <Switch id="notifications" />
    <Label htmlFor="notifications">Enable notifications</Label>
  </div>
);

// Tabs example
export const TabsExample = () => (
  <Tabs defaultValue="account">
    <TabsList>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="settings">Settings</TabsTrigger>
    </TabsList>
    <TabsContent value="account" className="p-4">
      <Text>Account settings</Text>
    </TabsContent>
    <TabsContent value="settings" className="p-4">
      <Text>General settings</Text>
    </TabsContent>
  </Tabs>
);

// Badge example
export const BadgeExample = () => (
  <div className="flex flex-wrap gap-2">
    <Badge>Default</Badge>
    <Badge variant="outline">Outline</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="destructive">Destructive</Badge>
  </div>
);

// Avatar example
export const AvatarExample = () => (
  <div className="flex gap-2">
    <Avatar>
      <AvatarImage src="https://avatars.githubusercontent.com/u/1" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>MK</AvatarFallback>
    </Avatar>
  </div>
);

// Alert example
export const AlertExample = () => (
  <Alert>
    <AlertTitle>Information</AlertTitle>
    <AlertDescription>
      This is an informational alert message.
    </AlertDescription>
  </Alert>
);

// Export all examples together
export const ComponentExamples = {
  Button: ButtonExamples,
  Card: CardExample,
  Input: InputExample,
  Checkbox: CheckboxExample,
  Switch: SwitchExample,
  Tabs: TabsExample,
  Badge: BadgeExample,
  Avatar: AvatarExample,
  Alert: AlertExample,
}; 