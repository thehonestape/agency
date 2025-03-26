import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function ThemePreviewPage() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Theme Preview</h1>
        <p className="text-xl text-muted-foreground">See how your theme looks on different components</p>
      </header>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Typography</h2>
        <div className="space-y-4">
          <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Heading Level 1
            </h1>
            <p className="text-muted-foreground text-sm">(text-4xl/text-5xl, font-extrabold)</p>
          </div>
          <div>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Heading Level 2
            </h2>
            <p className="text-muted-foreground text-sm">(text-3xl, font-semibold, border-b)</p>
          </div>
          <div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Heading Level 3
            </h3>
            <p className="text-muted-foreground text-sm">(text-2xl, font-semibold)</p>
          </div>
          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Heading Level 4
            </h4>
            <p className="text-muted-foreground text-sm">(text-xl, font-semibold)</p>
          </div>
          <div>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              This is a paragraph with standard text. The quick brown fox jumps over the lazy dog.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua.
            </p>
          </div>
          <div>
            <blockquote className="mt-6 border-l-2 pl-6 italic">
              "The success of every design system is ultimately measured by how well it helps teams build
              successful products."
            </blockquote>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Colors & Interactive Elements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>This is a card description that explains what this card is about.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is the main content of the card. It contains useful information and might have interactive elements.</p>
              <div className="mt-4 space-x-2">
                <Button>Primary Button</Button>
                <Button variant="outline">Secondary</Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost">Cancel</Button>
              <Button>Save</Button>
            </CardFooter>
          </Card>
          
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="terms" />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>
            
            <Button className="w-full">Submit Form</Button>
          </div>
        </div>
        
        <Tabs defaultValue="tab1" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tab1">Account</TabsTrigger>
            <TabsTrigger value="tab2">Password</TabsTrigger>
            <TabsTrigger value="tab3">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="p-4 border rounded-md mt-2">
            <p>This is the account tab content. Here you would see account related information.</p>
          </TabsContent>
          <TabsContent value="tab2" className="p-4 border rounded-md mt-2">
            <p>This is the password tab content. Here you would manage your password settings.</p>
          </TabsContent>
          <TabsContent value="tab3" className="p-4 border rounded-md mt-2">
            <p>This is the settings tab content. Various application settings would appear here.</p>
          </TabsContent>
        </Tabs>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Layout & Spacing</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((item) => (
            <div 
              key={item}
              className="bg-primary/10 p-4 rounded-md flex items-center justify-center aspect-video"
            >
              Grid Item {item}
            </div>
          ))}
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-md">
            <p>This box demonstrates padding (p-4) and background color.</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
              <div 
                key={size} 
                className="flex items-center justify-center bg-primary text-primary-foreground px-3 py-1 rounded-md"
              >
                {size}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <footer className="pt-8 border-t">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h3 className="font-semibold mb-2">Theme Preview</h3>
            <p className="text-muted-foreground text-sm">Copyright © 2023. All rights reserved.</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Button variant="outline" size="sm">Terms</Button>
            <Button variant="outline" size="sm">Privacy</Button>
            <Button variant="outline" size="sm">Contact</Button>
          </div>
        </div>
      </footer>
    </div>
  );
} 