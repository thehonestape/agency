import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Heading, Text } from '../ui/typography';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  FiLayout as Layout,
  FiUsers as Users,
  FiSettings as Settings,
  FiActivity as Activity,
  FiBarChart as BarChart,
  FiCalendar as Calendar,
  FiBell as Bell,
  FiMail as Mail,
  FiPlus as Plus,
  FiTrash2 as Trash,
  FiEdit2 as Edit
} from "react-icons/fi";
import { SitemapGenerator, SiteStructure } from './SitemapGenerator';
import { defaultSiteStructure } from './defaultSiteStructure';

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

interface Category {
  id: string;
  name: string;
  pages: Page[];
}

interface Page {
  id: string;
  name: string;
  path: string;
}

export default function SitemapEditor() {
  const [siteStructure, setSiteStructure] = useState<SiteStructure>(defaultSiteStructure);
  const [previewMode, setPreviewMode] = useState(false);
  const [editingCategory, setEditingCategory] = useState<number | null>(null);
  const [editingPage, setEditingPage] = useState<{ categoryIndex: number; pageIndex: number } | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newPageName, setNewPageName] = useState('');
  const [newPagePath, setNewPagePath] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Load saved sitemap from localStorage if available
  useEffect(() => {
    const savedSitemap = localStorage.getItem('workhorse_sitemap');
    if (savedSitemap) {
      try {
        setSiteStructure(JSON.parse(savedSitemap));
      } catch (e) {
        console.error('Failed to parse saved sitemap', e);
      }
    }
  }, []);

  // Save sitemap to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('workhorse_sitemap', JSON.stringify(siteStructure));
  }, [siteStructure]);

  const addCategory = () => {
    if (newCategoryName.trim()) {
      setCategories([
        ...categories,
        {
          id: Date.now().toString(),
          name: newCategoryName,
          pages: []
        }
      ]);
      setNewCategoryName('');
    }
  };

  const deleteCategory = (categoryId: string) => {
    setCategories(categories.filter(category => category.id !== categoryId));
  };

  const startEditingCategory = (index: number) => {
    setEditingCategory(index);
    setNewCategoryName(siteStructure.children[index].name);
  };

  const saveEditingCategory = () => {
    if (editingCategory === null) return;
    
    setSiteStructure(prev => {
      const newChildren = [...prev.children];
      newChildren[editingCategory] = {
        ...newChildren[editingCategory],
        name: newCategoryName
      };
      
      return {
        ...prev,
        children: newChildren
      };
    });
    
    setEditingCategory(null);
    setNewCategoryName('');
  };

  const addPage = () => {
    if (selectedCategory && newPageName.trim() && newPagePath.trim()) {
      setCategories(categories.map(category => {
        if (category.id === selectedCategory.id) {
          return {
            ...category,
            pages: [
              ...category.pages,
              {
                id: Date.now().toString(),
                name: newPageName,
                path: newPagePath
              }
            ]
          };
        }
        return category;
      }));
      setNewPageName('');
      setNewPagePath('');
    }
  };

  const deletePage = (categoryId: string, pageId: string) => {
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          pages: category.pages.filter(page => page.id !== pageId)
        };
      }
      return category;
    }));
  };

  const startEditingPage = (categoryIndex: number, pageIndex: number) => {
    setEditingPage({ categoryIndex, pageIndex });
    const page = siteStructure.children[categoryIndex].children?.[pageIndex];
    if (page) {
      setNewPageName(page.name);
      setNewPagePath(page.path || '');
    }
  };

  const saveEditingPage = () => {
    if (!editingPage) return;
    
    setSiteStructure(prev => {
      const newChildren = [...prev.children];
      const category = {...newChildren[editingPage.categoryIndex]};
      const pages = [...(category.children || [])];
      
      pages[editingPage.pageIndex] = {
        name: newPageName,
        path: newPagePath
      };
      
      category.children = pages;
      newChildren[editingPage.categoryIndex] = category;
      
      return {
        ...prev,
        children: newChildren
      };
    });
    
    setEditingPage(null);
    setNewPageName('');
    setNewPagePath('');
  };

  const downloadSitemapJSON = () => {
    const dataStr = JSON.stringify(siteStructure, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'workhorse-sitemap.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (previewMode) {
    return (
      <DashboardLayout
        navigation={navigation}
        sections={sections}
      >
        <div className="space-y-8">
          <section>
            <div className="flex items-center justify-between">
              <div>
                <Heading as="h1" size="h1">Sitemap Preview</Heading>
                <Text className="text-muted-foreground">
                  Preview your site structure
                </Text>
              </div>
              <Button variant="outline" onClick={() => setPreviewMode(false)}>
                <Edit className="mr-2 h-4 w-4" />
                Back to Editor
              </Button>
            </div>
          </section>
          
          <SitemapGenerator customSiteStructure={siteStructure} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      navigation={navigation}
      sections={sections}
    >
      <div className="space-y-8">
        <section>
          <div className="flex items-center justify-between">
            <div>
              <Heading as="h1" size="h1">Sitemap Editor</Heading>
              <Text className="text-muted-foreground">Edit your website structure</Text>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setPreviewMode(true)}>
                <Activity className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button onClick={downloadSitemapJSON}>
                <BarChart className="mr-2 h-4 w-4" />
                Export JSON
              </Button>
            </div>
          </div>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Site Structure</CardTitle>
              <CardDescription>Organize your website pages and categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Main site details */}
                <div className="border p-4 rounded-md">
                  <div className="flex items-center mb-2">
                    <label htmlFor="root-name" className="mr-2">
                      <Text className="font-medium">Root:</Text>
                    </label>
                    <Input 
                      id="root-name"
                      type="text" 
                      className="border rounded px-2 py-1 flex-grow" 
                      value={siteStructure.name}
                      onChange={(e) => setSiteStructure(prev => ({...prev, name: e.target.value}))}
                      aria-label="Root name"
                    />
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="root-path" className="mr-2">
                      <Text className="font-medium">Path:</Text>
                    </label>
                    <Input 
                      id="root-path"
                      type="text" 
                      className="border rounded px-2 py-1 flex-grow" 
                      value={siteStructure.path}
                      onChange={(e) => setSiteStructure(prev => ({...prev, path: e.target.value}))}
                      aria-label="Root path"
                    />
                  </div>
                </div>

                {/* Add category form */}
                <div className="border p-4 rounded-md bg-gray-50">
                  <Text className="font-medium mb-2">Add New Category</Text>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Category name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    <Button onClick={addCategory}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Category
                    </Button>
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-4">
                  {categories.map((category, categoryIndex) => (
                    <div key={category.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        {editingCategory === categoryIndex ? (
                          <div className="flex items-center gap-2 flex-grow">
                            <label htmlFor={`edit-category-${categoryIndex}`} className="sr-only">Edit Category Name</label>
                            <Input
                              id={`edit-category-${categoryIndex}`}
                              type="text" 
                              className="border rounded px-2 py-1 flex-grow" 
                              value={newCategoryName}
                              onChange={(e) => setNewCategoryName(e.target.value)}
                              aria-label="Edit category name"
                            />
                            <Button variant="outline" size="sm" onClick={saveEditingCategory}>
                              <Edit className="mr-1 h-4 w-4" />
                              Save
                            </Button>
                          </div>
                        ) : (
                          <Text className="font-medium">{category.name}</Text>
                        )}
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteCategory(category.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {/* Pages */}
                      <div className="space-y-2 ml-4">
                        {category.pages.map((page, pageIndex) => (
                          <div key={page.id} className="flex items-center justify-between">
                            {editingPage?.categoryIndex === categoryIndex && editingPage?.pageIndex === pageIndex ? (
                              <div className="flex flex-col gap-2 flex-grow">
                                <label htmlFor={`edit-page-name-${categoryIndex}-${pageIndex}`} className="sr-only">Edit Page Name</label>
                                <Input
                                  id={`edit-page-name-${categoryIndex}-${pageIndex}`}
                                  type="text" 
                                  className="border rounded px-2 py-1" 
                                  placeholder="Page Name" 
                                  value={newPageName}
                                  onChange={(e) => setNewPageName(e.target.value)}
                                />
                                <label htmlFor={`edit-page-path-${categoryIndex}-${pageIndex}`} className="sr-only">Edit Page Path</label>
                                <Input
                                  id={`edit-page-path-${categoryIndex}-${pageIndex}`}
                                  type="text" 
                                  className="border rounded px-2 py-1" 
                                  placeholder="Path (e.g. /about)" 
                                  value={newPagePath}
                                  onChange={(e) => setNewPagePath(e.target.value)}
                                />
                                <Button variant="outline" size="sm" onClick={saveEditingPage}>
                                  <Edit className="mr-1 h-4 w-4" />
                                  Save
                                </Button>
                              </div>
                            ) : (
                              <div className="flex-grow">
                                <Text>{page.name}</Text>
                                <Text className="text-sm text-muted-foreground">{page.path}</Text>
                              </div>
                            )}
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deletePage(category.id, page.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}

                        {/* Add page form */}
                        <div className="mt-4">
                          <Text className="font-medium mb-2">Add Page to {category.name}</Text>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Page name"
                              value={newPageName}
                              onChange={(e) => setNewPageName(e.target.value)}
                            />
                            <Input
                              placeholder="Page path"
                              value={newPagePath}
                              onChange={(e) => setNewPagePath(e.target.value)}
                            />
                            <Button onClick={addPage}>
                              <Plus className="mr-2 h-4 w-4" />
                              Add Page
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
} 