import React, { useState } from 'react';
import BlockEditor from '../components/ui/BlockEditor';
import ErrorBoundary from '../components/ErrorBoundary';

export default function BlockEditorDemo() {
  const [content, setContent] = useState(null);

  const handleContentChange = (newContent: any) => {
    setContent(newContent);
    console.log('Editor content updated:', newContent);
  };

  const editorFallback = (
    <div className="p-4 border rounded-lg bg-yellow-50">
      <h3 className="font-medium text-yellow-800">Block editor failed to load</h3>
      <p className="text-sm mt-1 text-yellow-700">
        There was an error loading the block editor component.
      </p>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Block Editor Demo</h1>
        <p className="text-gray-600">
          A Notion-like block editor built with BlockNote
        </p>
      </div>

      <div className="border rounded-lg shadow-sm overflow-hidden bg-white mb-6">
        <ErrorBoundary fallback={editorFallback}>
          <BlockEditor 
            onChange={handleContentChange}
            className="min-h-[500px]"
          />
        </ErrorBoundary>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Editor Features:</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Type "/" to open the command menu</li>
          <li>Supports headings, lists, todos, code blocks, and more</li>
          <li>Drag blocks to reorder content</li>
          <li>Use Tab and Shift+Tab to nest list items</li>
          <li>Select text to format (bold, italic, code, etc.)</li>
          <li>Paste URLs to automatically create links</li>
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