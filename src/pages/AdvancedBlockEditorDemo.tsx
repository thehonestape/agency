import React, { useState } from 'react';
import BlockEditor from '../components/ui/BlockEditor';
import AdvancedBlockEditor from '../components/ui/AdvancedBlockEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import ErrorBoundary from '../components/ErrorBoundary';

export default function AdvancedBlockEditorDemo() {
  const [content, setContent] = useState(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isEditable, setIsEditable] = useState(true);
  const [autosaveEnabled, setAutosaveEnabled] = useState(true);

  const handleContentChange = (newContent: any) => {
    setContent(newContent);
    console.log('Editor content updated:', newContent);
  };

  const handleSave = (savedContent: any) => {
    console.log('Content saved:', savedContent);
    // Here you would typically save to a database or API
  };

  // Simple editor fallback UI
  const simpleEditorFallback = (
    <div className="p-4 border rounded-lg bg-yellow-50">
      <h3 className="font-medium text-yellow-800">Simple editor failed to load</h3>
      <p className="text-sm mt-1 text-yellow-700">
        There was an error loading the simple block editor component.
      </p>
    </div>
  );

  // Advanced editor fallback UI
  const advancedEditorFallback = (
    <div className="p-4 border rounded-lg bg-yellow-50">
      <h3 className="font-medium text-yellow-800">Advanced editor failed to load</h3>
      <p className="text-sm mt-1 text-yellow-700">
        There was an error loading the advanced block editor component.
      </p>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Block Editor Demo</h1>
        <p className="text-gray-600">
          A collection of Notion-like block editors built with BlockNote
        </p>
      </div>

      <div className="mb-6 flex space-x-4">
        <div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <span>Theme:</span>
            <select 
              value={theme} 
              onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
              className="border rounded px-2 py-1"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>

        <div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <span>Editable:</span>
            <input 
              type="checkbox" 
              checked={isEditable}
              onChange={(e) => setIsEditable(e.target.checked)}
              className="rounded"
            />
          </label>
        </div>

        <div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <span>Autosave:</span>
            <input 
              type="checkbox" 
              checked={autosaveEnabled}
              onChange={(e) => setAutosaveEnabled(e.target.checked)}
              className="rounded"
            />
          </label>
        </div>
      </div>

      <Tabs defaultValue="advanced" className="mb-6">
        <TabsList>
          <TabsTrigger value="simple">Simple Editor</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Editor</TabsTrigger>
        </TabsList>
        
        <TabsContent value="simple" className="mt-4">
          <div className="border rounded-lg shadow-sm overflow-hidden bg-white">
            <ErrorBoundary fallback={simpleEditorFallback}>
              <BlockEditor 
                onChange={handleContentChange}
                editable={isEditable}
                className="min-h-[500px]"
              />
            </ErrorBoundary>
          </div>
        </TabsContent>
        
        <TabsContent value="advanced" className="mt-4">
          <div className="border rounded-lg shadow-sm overflow-hidden bg-white">
            <ErrorBoundary fallback={advancedEditorFallback}>
              <AdvancedBlockEditor 
                onChange={handleContentChange}
                onSave={handleSave}
                autosaveInterval={autosaveEnabled ? 5000 : 0}
                isEditable={isEditable}
                theme={theme}
                className="min-h-[500px]"
                storageKey="advanced-editor-demo-content"
              />
            </ErrorBoundary>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Editor Features:</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Type "/" to open the command menu</li>
          <li>Supports headings, lists, todos, code blocks, and more</li>
          <li>Drag blocks to reorder content</li>
          <li>Use Tab and Shift+Tab to nest list items</li>
          <li>Select text to format (bold, italic, code, etc.)</li>
          <li>Advanced editor includes autosave and manual save options</li>
          <li>Content persists in local storage (Advanced editor only)</li>
        </ul>
      </div>

      {content && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Editor Content (JSON):</h2>
          <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-4 rounded overflow-auto max-h-[300px]">
            {JSON.stringify(content, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 