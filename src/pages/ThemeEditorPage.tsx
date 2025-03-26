import React from "react";
import { DashboardLayout } from "../components/layouts/DashboardLayout";
import { Heading, Text } from "../components/ui/typography";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/button";
import { 
  FiDroplet as Palette,
  FiType as Typography,
  FiGrid as LayoutGrid,
  FiSave as Save
} from "react-icons/fi";

// Navigation sections
const navigation = [
  {
    name: "Colors",
    href: "/theme/colors",
    icon: Palette,
  },
  {
    name: "Typography",
    href: "/theme/typography",
    icon: Typography,
  },
  {
    name: "Spacing",
    href: "/theme/spacing",
    icon: LayoutGrid,
  }
];

const sections = [
  {
    title: "Actions",
    items: [
      {
        name: "Save Theme",
        href: "#",
        icon: Save,
      }
    ]
  }
];

export default function ThemeEditorPage() {
  return (
    <DashboardLayout
      navigation={navigation}
      sections={sections}
    >
      <div className="space-y-8">
        <section>
          <div className="flex items-center justify-between">
            <div>
              <Heading as="h1" size="h1">Theme Editor</Heading>
              <Text className="text-muted-foreground">Customize your application's theme</Text>
            </div>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
              <CardDescription>Customize your application's color scheme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>Customize your application's typography</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
} 