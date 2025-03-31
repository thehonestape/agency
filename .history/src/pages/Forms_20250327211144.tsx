import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { CreateOrganizationForm } from '../components/patterns/forms/CreateOrganizationForm';
import { CreateProjectForm } from '../components/patterns/forms/CreateProjectForm';
import { CreateAssetForm } from '../components/patterns/forms/CreateAssetForm';

const Forms: React.FC = () => {
  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Form Patterns</h1>
            <p className="text-muted-foreground">Explore our collection of form components and patterns</p>
          </div>
        </div>
      </section>

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
            <CreateProjectForm />
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
    </div>
  );
};

export default Forms; 