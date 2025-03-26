import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Input,
} from '@/components/ui';
import { 
  Search, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff 
} from 'lucide-react';

export function BasicComponentsExample() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Button Components</CardTitle>
          <CardDescription>
            Various button variants and sizes available in the design system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Button Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="brand">Brand</Button>
                <Button variant="success">Success</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="info">Info</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Button Sizes</h3>
              <div className="flex items-center flex-wrap gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon"><Search className="h-4 w-4" /></Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Button States</h3>
              <div className="flex flex-wrap gap-3">
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
                <Button fullWidth>Full Width</Button>
                <Button elevation="raised">Raised</Button>
                <Button elevation="elevated">Elevated</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Input Components</CardTitle>
          <CardDescription>
            Various input fields and form controls available in the design system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Basic Inputs</h3>
              <div className="space-y-3">
                <Input 
                  placeholder="Default input" 
                />
                <Input 
                  placeholder="With helper text" 
                  helperText="This is a helper text"
                />
                <Input 
                  placeholder="Error state" 
                  state="error" 
                  helperText="This field is required"
                />
                <Input 
                  placeholder="Success state" 
                  state="success" 
                  helperText="Looks good!"
                />
                <Input 
                  placeholder="Warning state" 
                  state="warning" 
                  helperText="Almost there..."
                />
                <Input 
                  placeholder="Disabled input" 
                  disabled
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Input Sizes</h3>
              <div className="space-y-3">
                <Input 
                  placeholder="Small input" 
                  size="sm"
                />
                <Input 
                  placeholder="Default input" 
                />
                <Input 
                  placeholder="Large input" 
                  size="lg"
                />
                <Input 
                  placeholder="Extra large input" 
                  size="xl"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Inputs with Icons</h3>
              <div className="space-y-3">
                <Input 
                  placeholder="Search..." 
                  leftIcon={<Search className="h-4 w-4 text-muted-foreground" />}
                />
                <Input 
                  placeholder="Email address" 
                  type="email" 
                  leftIcon={<Mail className="h-4 w-4 text-muted-foreground" />}
                />
                <Input 
                  placeholder="Password" 
                  type={passwordVisible ? "text" : "password"} 
                  leftIcon={<Lock className="h-4 w-4 text-muted-foreground" />}
                  rightIcon={
                    passwordVisible ? 
                    <Eye className="h-4 w-4 text-muted-foreground cursor-pointer" onClick={() => setPasswordVisible(false)} /> : 
                    <EyeOff className="h-4 w-4 text-muted-foreground cursor-pointer" onClick={() => setPasswordVisible(true)} />
                  }
                />
                <Input 
                  placeholder="Loading state" 
                  loading
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Width Variants</h3>
              <div className="space-y-3">
                <Input 
                  placeholder="Auto width" 
                  width="auto"
                />
                <Input 
                  placeholder="Small width" 
                  width="sm"
                />
                <Input 
                  placeholder="Medium width" 
                  width="md"
                />
                <Input 
                  placeholder="Large width" 
                  width="lg"
                />
                <Input 
                  placeholder="Full width (default)" 
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Form Example</h3>
              <div className="space-y-4">
                <Input 
                  placeholder="Email address" 
                  type="email" 
                  leftIcon={<Mail className="h-4 w-4 text-muted-foreground" />}
                  required
                />
                <Input 
                  placeholder="Password" 
                  type={passwordVisible ? "text" : "password"} 
                  leftIcon={<Lock className="h-4 w-4 text-muted-foreground" />}
                  rightIcon={
                    passwordVisible ? 
                    <Eye className="h-4 w-4 text-muted-foreground cursor-pointer" onClick={() => setPasswordVisible(false)} /> : 
                    <EyeOff className="h-4 w-4 text-muted-foreground cursor-pointer" onClick={() => setPasswordVisible(true)} />
                  }
                  required
                />
                <Button 
                  type="submit" 
                  fullWidth 
                  loading={loading}
                >
                  Sign In
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default BasicComponentsExample; 