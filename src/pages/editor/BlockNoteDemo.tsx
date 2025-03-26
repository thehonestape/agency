import React, { useState } from 'react';
import { BlockNoteEditor } from '../../components/editor/BlockNoteEditor';
import { PartialBlock } from '@blocknote/core';
import { Card } from '@/components/ui/Card';

export default function BlockNoteDemo() {
  const [content, setContent] = useState<PartialBlock[]>([]);

  const handleContentChange = (newContent: PartialBlock[]) => {
    setContent(newContent);
    console.log('Editor content updated:', newContent);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">BlockNote Editor Demo</h1>
        <p className="text-muted-foreground">
          A Notion-style block editor with rich text formatting and block-based editing
        </p>
      </div>

      <Card className="p-6">
        <BlockNoteEditor
          onChange={handleContentChange}
          className="min-h-[500px]"
        />
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Editor Features:</h2>
        <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
          <li>Type "/" to open the command menu</li>
          <li>Supports headings, lists, todos, code blocks, and more</li>
          <li>Drag blocks to reorder content</li>
          <li>Use Tab and Shift+Tab to nest list items</li>
          <li>Select text to format (bold, italic, code, etc.)</li>
          <li>Paste URLs to automatically create links</li>
          <li>Dark mode support</li>
        </ul>
      </div>

      {content.length > 0 && (
        <Card className="p-6 bg-muted/50">
          <h2 className="text-xl font-semibold mb-4">Editor Content (JSON):</h2>
          <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded overflow-auto max-h-[300px]">
            {JSON.stringify(content, null, 2)}
          </pre>
        </Card>
      )}
    </div>
  );
} 