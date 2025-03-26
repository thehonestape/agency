import React, { useState, useEffect } from 'react';
import { BrandHeading } from '../brand/BrandHeading';
import { BrandText } from '../brand/BrandText';
import { BrandCard, CardContent, CardHeader, CardTitle } from '../brand/BrandCard';
import { BrandStyledButton } from '../brand/BrandStyledButton';
import { BrandContainer } from '../brand/BrandContainer';
import { FiPlus, FiTrash, FiEdit2, FiSave, FiDownload, FiEye } from 'react-icons/fi';
import { SitemapGenerator, SiteStructure } from './SitemapGenerator';
import { defaultSiteStructure } from './defaultSiteStructure';

export function SitemapEditor() {
  const [siteStructure, setSiteStructure] = useState<SiteStructure>(defaultSiteStructure);
  const [previewMode, setPreviewMode] = useState(false);
  const [editingCategory, setEditingCategory] = useState<number | null>(null);
  const [editingPage, setEditingPage] = useState<{ categoryIndex: number; pageIndex: number } | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newPageName, setNewPageName] = useState('');
  const [newPagePath, setNewPagePath] = useState('');

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
    if (!newCategoryName.trim()) return;
    
    setSiteStructure(prev => ({
      ...prev,
      children: [
        ...prev.children,
        {
          name: newCategoryName,
          children: []
        }
      ]
    }));
    
    setNewCategoryName('');
  };

  const deleteCategory = (index: number) => {
    setSiteStructure(prev => ({
      ...prev,
      children: prev.children.filter((_, i) => i !== index)
    }));
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

  const addPage = (categoryIndex: number) => {
    if (!newPageName.trim() || !newPagePath.trim()) return;
    
    setSiteStructure(prev => {
      const newChildren = [...prev.children];
      const category = {...newChildren[categoryIndex]};
      
      category.children = [
        ...(category.children || []),
        {
          name: newPageName,
          path: newPagePath
        }
      ];
      
      newChildren[categoryIndex] = category;
      
      return {
        ...prev,
        children: newChildren
      };
    });
    
    setNewPageName('');
    setNewPagePath('');
  };

  const deletePage = (categoryIndex: number, pageIndex: number) => {
    setSiteStructure(prev => {
      const newChildren = [...prev.children];
      const category = {...newChildren[categoryIndex]};
      
      category.children = category.children?.filter((_, i) => i !== pageIndex);
      newChildren[categoryIndex] = category;
      
      return {
        ...prev,
        children: newChildren
      };
    });
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
      <BrandContainer>
        <div className="mb-4 flex justify-between items-center">
          <BrandHeading level={1}>Sitemap Preview</BrandHeading>
          <BrandStyledButton variant="outline" onClick={() => setPreviewMode(false)}>
            <FiEdit2 className="mr-2" />
            Back to Editor
          </BrandStyledButton>
        </div>
        
        <SitemapGenerator customSiteStructure={siteStructure} />
      </BrandContainer>
    );
  }

  return (
    <BrandContainer>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <BrandHeading level={1}>Sitemap Editor</BrandHeading>
            <BrandText color="muted">
              Create and edit your site structure visually
            </BrandText>
          </div>
          <div className="flex gap-2">
            <BrandStyledButton variant="outline" onClick={() => setPreviewMode(true)}>
              <FiEye className="mr-2" />
              Preview
            </BrandStyledButton>
            <BrandStyledButton onClick={downloadSitemapJSON}>
              <FiDownload className="mr-2" />
              Export JSON
            </BrandStyledButton>
          </div>
        </div>

        <BrandCard>
          <CardHeader>
            <CardTitle>
              <BrandHeading level={3}>Site Structure</BrandHeading>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Main site details */}
              <div className="border p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <label htmlFor="root-name" className="mr-2">
                    <BrandText weight="medium">Root:</BrandText>
                  </label>
                  <input 
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
                    <BrandText weight="medium">Path:</BrandText>
                  </label>
                  <input 
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
                <BrandText weight="medium" className="mb-2">Add New Category</BrandText>
                <div className="flex gap-2">
                  <label htmlFor="new-category-name" className="sr-only">New Category Name</label>
                  <input 
                    id="new-category-name"
                    type="text" 
                    className="border rounded px-2 py-1 flex-grow" 
                    placeholder="Category Name" 
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                  <BrandStyledButton onClick={addCategory} size="sm">
                    <FiPlus className="mr-1" />
                    Add
                  </BrandStyledButton>
                </div>
              </div>

              {/* Categories */}
              {siteStructure.children.map((category, categoryIndex) => (
                <div key={`category-${categoryIndex}`} className="border p-4 rounded-md">
                  {/* Category header */}
                  <div className="flex justify-between items-center mb-4 border-b pb-2">
                    {editingCategory === categoryIndex ? (
                      <div className="flex items-center gap-2 flex-grow">
                        <label htmlFor={`edit-category-${categoryIndex}`} className="sr-only">Edit Category Name</label>
                        <input 
                          id={`edit-category-${categoryIndex}`}
                          type="text" 
                          className="border rounded px-2 py-1 flex-grow" 
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          aria-label="Edit category name"
                        />
                        <BrandStyledButton variant="outline" size="sm" onClick={saveEditingCategory}>
                          <FiSave className="mr-1" />
                          Save
                        </BrandStyledButton>
                      </div>
                    ) : (
                      <BrandText weight="medium">{category.name}</BrandText>
                    )}
                    
                    <div className="flex gap-2">
                      {editingCategory !== categoryIndex && (
                        <BrandStyledButton variant="outline" size="sm" onClick={() => startEditingCategory(categoryIndex)}>
                          <FiEdit2 className="mr-1" />
                          Edit
                        </BrandStyledButton>
                      )}
                      <BrandStyledButton variant="destructive" size="sm" onClick={() => deleteCategory(categoryIndex)}>
                        <FiTrash className="mr-1" />
                        Delete
                      </BrandStyledButton>
                    </div>
                  </div>
                  
                  {/* Pages */}
                  <div className="space-y-3 mb-4">
                    {category.children?.map((page, pageIndex) => (
                      <div key={`page-${categoryIndex}-${pageIndex}`} className="flex justify-between items-center border-b pb-2 last:border-0">
                        {editingPage?.categoryIndex === categoryIndex && editingPage?.pageIndex === pageIndex ? (
                          <div className="flex flex-col gap-2 flex-grow">
                            <label htmlFor={`edit-page-name-${categoryIndex}-${pageIndex}`} className="sr-only">Edit Page Name</label>
                            <input 
                              id={`edit-page-name-${categoryIndex}-${pageIndex}`}
                              type="text" 
                              className="border rounded px-2 py-1" 
                              placeholder="Page Name" 
                              value={newPageName}
                              onChange={(e) => setNewPageName(e.target.value)}
                            />
                            <label htmlFor={`edit-page-path-${categoryIndex}-${pageIndex}`} className="sr-only">Edit Page Path</label>
                            <input 
                              id={`edit-page-path-${categoryIndex}-${pageIndex}`}
                              type="text" 
                              className="border rounded px-2 py-1" 
                              placeholder="Path (e.g. /about)" 
                              value={newPagePath}
                              onChange={(e) => setNewPagePath(e.target.value)}
                            />
                            <BrandStyledButton variant="outline" size="sm" onClick={saveEditingPage}>
                              <FiSave className="mr-1" />
                              Save
                            </BrandStyledButton>
                          </div>
                        ) : (
                          <div className="flex-grow">
                            <BrandText>{page.name}</BrandText>
                            <BrandText color="muted" className="text-xs">{page.path}</BrandText>
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          {!(editingPage?.categoryIndex === categoryIndex && editingPage?.pageIndex === pageIndex) && (
                            <BrandStyledButton variant="outline" size="sm" onClick={() => startEditingPage(categoryIndex, pageIndex)}>
                              <FiEdit2 className="mr-1" />
                              Edit
                            </BrandStyledButton>
                          )}
                          <BrandStyledButton variant="destructive" size="sm" onClick={() => deletePage(categoryIndex, pageIndex)}>
                            <FiTrash className="mr-1" />
                            Delete
                          </BrandStyledButton>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add page form */}
                  <div className="border p-3 rounded-md bg-gray-50">
                    <BrandText weight="medium" className="mb-2">Add Page to {category.name}</BrandText>
                    <div className="flex flex-col gap-2">
                      <label htmlFor={`new-page-name-${categoryIndex}`} className="sr-only">New Page Name</label>
                      <input 
                        id={`new-page-name-${categoryIndex}`}
                        type="text" 
                        className="border rounded px-2 py-1" 
                        placeholder="Page Name" 
                        value={newPageName}
                        onChange={(e) => setNewPageName(e.target.value)}
                      />
                      <label htmlFor={`new-page-path-${categoryIndex}`} className="sr-only">New Page Path</label>
                      <input 
                        id={`new-page-path-${categoryIndex}`}
                        type="text" 
                        className="border rounded px-2 py-1" 
                        placeholder="Path (e.g. /about)" 
                        value={newPagePath}
                        onChange={(e) => setNewPagePath(e.target.value)}
                      />
                      <BrandStyledButton onClick={() => addPage(categoryIndex)} size="sm">
                        <FiPlus className="mr-1" />
                        Add Page
                      </BrandStyledButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </BrandCard>
      </div>
    </BrandContainer>
  );
} 