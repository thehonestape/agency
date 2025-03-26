import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Heading, Text } from '../ui/typography';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/button';
import { 
  FiLayout as Layout,
  FiUsers as Users,
  FiSettings as Settings,
  FiActivity as Activity,
  FiBarChart as BarChart,
  FiCalendar as Calendar,
  FiBell as Bell,
  FiMail as Mail,
  FiDownload as Download
} from "react-icons/fi";

// Navigation sections
const navigation = [
  {
    name: "Overview",
    href: "/sitemap",
    icon: Layout,
  },
  {
    name: "Editor",
    href: "/sitemap/editor",
    icon: Activity,
  },
  {
    name: "Generator",
    href: "/sitemap/generator",
    icon: BarChart,
  }
];

const sections = [
  {
    title: "Notifications",
    items: [
      {
        name: "Messages",
        href: "#",
        icon: Mail,
      },
      {
        name: "Alerts",
        href: "#",
        icon: Bell,
      }
    ]
  }
];

interface SiteStructure {
  name: string;
  path: string;
  children: {
    name: string;
    children?: {
      name: string;
      path: string;
    }[];
  }[];
}

interface SitemapGeneratorProps {
  customSiteStructure?: SiteStructure;
}

const defaultSiteStructure: SiteStructure = {
  name: "Home",
  path: "/",
  children: [
    {
      name: "About",
      children: [
        { name: "Our Story", path: "/about/story" },
        { name: "Team", path: "/about/team" },
        { name: "Careers", path: "/about/careers" }
      ]
    },
    {
      name: "Services",
      children: [
        { name: "Web Development", path: "/services/web" },
        { name: "Mobile Apps", path: "/services/mobile" },
        { name: "Design", path: "/services/design" }
      ]
    },
    {
      name: "Contact",
      children: [
        { name: "Get in Touch", path: "/contact" },
        { name: "Support", path: "/contact/support" }
      ]
    }
  ]
};

export function SitemapGenerator({ customSiteStructure }: SitemapGeneratorProps) {
  const siteStructure = customSiteStructure || defaultSiteStructure;

  const downloadSitemapJSON = () => {
    const jsonString = JSON.stringify(siteStructure, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout
      navigation={navigation}
      sections={sections}
    >
      <div className="space-y-8">
        <section>
          <div className="flex items-center justify-between">
            <div>
              <Heading as="h1" size="h1">Sitemap Generator</Heading>
              <Text className="text-muted-foreground">Generate and export your sitemap</Text>
            </div>
            <Button onClick={downloadSitemapJSON}>
              <Download className="mr-2 h-4 w-4" />
              Export JSON
            </Button>
          </div>
        </section>

        <section>
          <Card className="overflow-x-auto">
            <CardHeader>
              <CardTitle>Generated Sitemap</CardTitle>
              <CardDescription>XML format for search engines</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
                {`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${window.location.origin}${siteStructure.path}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${siteStructure.children.map(category => 
  category.children?.map(page => `
  <url>
    <loc>${window.location.origin}${page.path}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  ).join('')
).join('')}
</urlset>`}
              </pre>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Site Structure</CardTitle>
              <CardDescription>Visual representation of your website organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {siteStructure.children.map(category => (
                  <div key={category.name} className="border rounded-lg p-4">
                    <Text className="font-medium mb-2">{category.name}</Text>
                    <div className="space-y-2 ml-4">
                      {category.children?.map(page => (
                        <div key={page.path}>
                          <Text>{page.name}</Text>
                          <Text className="text-sm text-muted-foreground">{page.path}</Text>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
}

export { defaultSiteStructure };
export type { SiteStructure }; 