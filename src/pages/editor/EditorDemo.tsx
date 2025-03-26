import React, { useState } from 'react';
import { RichTextEditor } from '../../components/editor/RichTextEditor';
import { Card } from '@/components/ui/Card';

export default function EditorDemo() {
  const [content, setContent] = useState('<p>Hello World! This is a <strong>Tiptap</strong> editor.</p>');

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Rich Text Editor Demo</h1>
        <p className="text-muted-foreground">
          A lightweight rich text editor built with Tiptap
        </p>
      </div>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Editor</h2>
        <RichTextEditor 
          content={content} 
          onChange={setContent} 
          className="bg-white" 
        />
      </Card>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">HTML Output</h2>
        <pre className="bg-muted p-4 rounded overflow-auto max-h-[300px]">
          {content}
        </pre>
      </Card>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Rendered Output</h2>
        <div 
          className="bg-white p-4 rounded border prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Card>
    </div>
  );
} 