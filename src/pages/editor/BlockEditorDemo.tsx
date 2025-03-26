import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronUp } from 'lucide-react';
import UIBlockPreview from '@/components/ui-blocks/UIBlockPreview';
import { BlockEditor } from '@/components/ui-blocks/NotionEditor';
import { PartialBlock } from '@blocknote/core';

// Sample code string for demonstration
const blockEditorCode = `import React from 'react';
import { BlockEditor } from '@/components/ui-blocks/NotionEditor';

export function BlockEditorDemo() {
  const [content, setContent] = useState<PartialBlock[]>([]);

  return (
    <BlockEditor
      title="My Document"
      content={content}
      onChange={setContent}
      onBack={() => console.log('Back')}
      onForward={() => console.log('Forward')}
      onMenuClick={() => console.log('Menu clicked')}
    />
  );
}`;

export default function BlockEditorDemo() {
  const [content, setContent] = useState<PartialBlock[]>([]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        <div className="container mx-auto py-8 px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Button variant="outline" size="sm" asChild className="mr-4">
                <Link to="/ui-blocks">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back to UI Blocks
                </Link>
              </Button>
              <h1 className="text-3xl font-bold">Block Editor Demo</h1>
            </div>
            <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <ChevronUp className="h-4 w-4 mr-1" />
              Back to Top
            </Button>
          </div>

          <div className="space-y-16">
            <section>
              <h2 className="text-2xl font-bold mb-6">Block Editor</h2>
              <UIBlockPreview 
                title="Block Editor" 
                description="A block-based editor with support for rich text, lists, and more."
                codeString={blockEditorCode}
              >
                <BlockEditor
                  title="My Document"
                  content={content}
                  onChange={setContent}
                  onBack={() => console.log('Back')}
                  onForward={() => console.log('Forward')}
                  onMenuClick={() => console.log('Menu clicked')}
                />
              </UIBlockPreview>
            </section>

            {content && content.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Editor Content</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-sm overflow-auto max-h-[300px]">
                    {JSON.stringify(content, null, 2)}
                  </pre>
                </div>
              </section>
            )}
          </div>

          <div className="flex justify-between items-center mt-12 pt-8 border-t">
            <Button variant="outline" asChild>
              <Link to="/ui-blocks">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to All UI Blocks
              </Link>
            </Button>
            <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <ChevronUp className="h-4 w-4 mr-1" />
              Back to Top
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
} 