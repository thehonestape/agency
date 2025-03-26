import React, { useState } from 'react';

interface BlockEditorProps {
  initialContent?: any;
  onChange?: (content: any) => void;
  editable?: boolean;
  className?: string;
}

/**
 * A simple text editor component (fallback for BlockNote)
 */
export function BlockEditor({
  initialContent,
  onChange,
  editable = true,
  className,
}: BlockEditorProps) {
  // State for the editor content
  const [textContent, setTextContent] = useState<string>(
    initialContent?.text || ''
  );

  // Simple text change handler
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextContent(e.target.value);
    if (onChange) {
      onChange({ text: e.target.value });
    }
  };

  return (
    <div className={className}>
      <div className="p-4 border rounded-lg bg-yellow-50 mb-3">
        <h3 className="font-medium text-yellow-800">Simple Text Editor</h3>
        <p className="text-sm mt-1 text-yellow-700">
          A basic text editor is shown because the block editor could not be loaded.
        </p>
      </div>
      
      <textarea
        className="w-full p-4 border rounded-md min-h-[400px] focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        value={textContent}
        onChange={handleTextChange}
        placeholder="Start typing..."
        disabled={!editable}
      />
    </div>
  );
}

export default BlockEditor; 