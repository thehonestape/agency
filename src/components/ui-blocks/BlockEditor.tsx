import React from 'react';
import { BlockNoteEditor } from '../editor/BlockNoteEditor';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';

interface BlockEditorProps {
  title?: string;
  content?: any[];
  onChange?: (content: any[]) => void;
  onBack?: () => void;
  onForward?: () => void;
  onMenuClick?: () => void;
  className?: string;
}

export function BlockEditor({
  title = 'Untitled',
  content,
  onChange,
  onBack,
  onForward,
  onMenuClick,
  className = '',
}: BlockEditorProps) {
  return (
    <div className={`flex h-screen flex-col ${className}`}>
      {/* Header */}
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="h-8 w-8"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onForward}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="ml-4 flex-1">
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <Card className="min-h-[500px] p-4">
            <BlockNoteEditor
              initialContent={content}
              onChange={onChange}
              className="min-h-[500px]"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default BlockEditor; 