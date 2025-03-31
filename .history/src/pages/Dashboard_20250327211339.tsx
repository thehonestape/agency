import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/button';
import { 
  FiLayout as Layout,
  FiFileText as FormInput,
  FiList as List,
  FiGrid as Grid,
  FiBox as Box,
  FiSettings as Settings
} from 'react-icons/fi';

const Dashboard: React.FC = () => {
  const quickLinks = [
    {
      name: 'Components',
      description: 'Browse our collection of UI components',
      href: '/components',
      icon: Box
    },
    {
      name: 'Forms',
      description: 'View form patterns and components',
      href: '/forms',
      icon: FormInput
    },
    {
      name: 'Lists',
      description: 'Explore list patterns and components',
      href: '/lists',
      icon: List
    },
    {
      name: 'Grids',
      description: 'Check out grid layouts and dashboards',
      href: '/grids',
      icon: Grid
    },
    {
      name: 'Settings',
      description: 'Configure your application settings',
      href: '/settings',
      icon: Settings
    }
  ];

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome to Agency</h1>
            <p className="text-muted-foreground">Your modern UI component library</p>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Card key={link.name} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Icon className="h-6 w-6 text-primary" />
                  <CardTitle>{link.name}</CardTitle>
                </div>
                <CardDescription>{link.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href={link.href}>View {link.name}</a>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard; 