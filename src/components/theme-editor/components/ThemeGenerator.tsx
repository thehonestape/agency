'use client';

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../ui/Card";
import { Button } from "../../ui/button";
import { Text } from "../../ui/typography";
import { 
  FiDroplet as Palette,
  FiType as Typography,
  FiGrid as LayoutGrid,
  FiSave as Save
} from "react-icons/fi";

export default function ThemeGenerator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Generator</CardTitle>
        <CardDescription>Generate and customize your theme</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <section>
            <div className="flex items-center justify-between">
              <div>
                <Text className="font-medium">Color Palette</Text>
                <Text className="text-sm text-muted-foreground">Customize your color scheme</Text>
              </div>
              <Button>
                <Palette className="mr-2 h-4 w-4" />
                Generate Colors
              </Button>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="h-24 rounded-md bg-primary mb-2" />
                <Text className="font-medium">Primary</Text>
                <Text className="text-sm text-muted-foreground">Main brand color</Text>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="h-24 rounded-md bg-secondary mb-2" />
                <Text className="font-medium">Secondary</Text>
                <Text className="text-sm text-muted-foreground">Complementary color</Text>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="h-24 rounded-md bg-accent mb-2" />
                <Text className="font-medium">Accent</Text>
                <Text className="text-sm text-muted-foreground">Highlight color</Text>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between">
              <div>
                <Text className="font-medium">Typography</Text>
                <Text className="text-sm text-muted-foreground">Configure text styles</Text>
              </div>
              <Button>
                <Typography className="mr-2 h-4 w-4" />
                Generate Typography
              </Button>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <Text className="font-medium">Font Family</Text>
                <Text className="text-sm text-muted-foreground">Inter</Text>
              </div>
              <div>
                <Text className="font-medium">Base Size</Text>
                <Text className="text-sm text-muted-foreground">16px</Text>
              </div>
              <div>
                <Text className="font-medium">Line Height</Text>
                <Text className="text-sm text-muted-foreground">1.5</Text>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between">
              <div>
                <Text className="font-medium">Spacing</Text>
                <Text className="text-sm text-muted-foreground">Configure layout spacing</Text>
              </div>
              <Button>
                <LayoutGrid className="mr-2 h-4 w-4" />
                Generate Spacing
              </Button>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <Text className="font-medium">Base Unit</Text>
                <Text className="text-sm text-muted-foreground">4px</Text>
              </div>
              <div>
                <Text className="font-medium">Scale</Text>
                <Text className="text-sm text-muted-foreground">1.25</Text>
              </div>
            </div>
          </section>

          <div className="flex justify-end">
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Theme
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 