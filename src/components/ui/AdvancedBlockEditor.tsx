import React, { useState, useEffect } from 'react';

// Types for props
interface AdvancedBlockEditorProps {
  initialContent?: any;
  onChange?: (content: any) => void;
  onSave?: (content: any) => void;
  autosaveInterval?: number; // in milliseconds
  isEditable?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
  placeholder?: string;
  storageKey?: string; // Local storage key for auto-saving content
}

/**
 * A fallback implementation since the BlockNote editor is not working
 */
export function AdvancedBlockEditor({
  initialContent,
  onChange,
  onSave,
  autosaveInterval = 5000, // Default to 5 seconds
  isEditable = true,
  theme = 'light',
  className,
  placeholder = 'Type / to insert blocks...',
  storageKey
}: AdvancedBlockEditorProps) {
  // State to track last saved timestamp
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  // State to track if there are unsaved changes
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  // State to store editor content for fallback mode
  const [editorContent, setEditorContent] = useState<string>('');

  useEffect(() => {
    // Load content from localStorage if available
    if (storageKey && typeof window !== 'undefined') {
      const savedContent = localStorage.getItem(storageKey);
      if (savedContent) {
        try {
          const parsed = JSON.parse(savedContent);
          if (typeof parsed === 'object' && parsed.text) {
            setEditorContent(parsed.text);
          } else if (typeof parsed === 'string') {
            setEditorContent(parsed);
          }
        } catch (e) {
          console.error('Failed to parse saved content:', e);
        }
      }
    }
  }, [storageKey]);

  // Simple text change handler
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditorContent(e.target.value);
    setHasUnsavedChanges(true);
    if (onChange) {
      onChange({ text: e.target.value });
    }
  };

  // Save content handler
  const saveContent = () => {
    if (!hasUnsavedChanges) return;
    
    const content = { text: editorContent };
    
    // Save to local storage if storageKey is provided
    if (storageKey && typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(content));
    }

    // Call onSave callback if provided
    if (onSave) {
      onSave(content);
    }

    setLastSaved(new Date());
    setHasUnsavedChanges(false);
  };

  // Set up autosave interval
  useEffect(() => {
    if (autosaveInterval && autosaveInterval > 0) {
      const interval = setInterval(() => {
        if (hasUnsavedChanges) {
          saveContent();
        }
      }, autosaveInterval);
      
      return () => clearInterval(interval);
    }
  }, [autosaveInterval, hasUnsavedChanges]);

  // Create keyboard shortcut for saving (Ctrl+S / Cmd+S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveContent();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasUnsavedChanges]);

  return (
    <div className={`advanced-block-editor-fallback ${className || ''}`}>
      <div className="p-4 border rounded-lg bg-yellow-50 mb-3">
        <h3 className="font-medium text-yellow-800">Simple Text Editor</h3>
        <p className="text-sm mt-1 text-yellow-700">
          A simplified version is shown because the advanced editor could not be loaded.
        </p>
      </div>
      
      <textarea
        className="w-full p-4 border rounded-md min-h-[400px] focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        value={editorContent}
        onChange={handleTextChange}
        placeholder={placeholder}
        disabled={!isEditable}
      />
      
      {/* Status indicator when editable */}
      {isEditable && (
        <div className="flex items-center justify-end text-xs text-gray-500 mt-2">
          {hasUnsavedChanges ? (
            <span>Unsaved changes</span>
          ) : lastSaved ? (
            <span>Saved at {lastSaved.toLocaleTimeString()}</span>
          ) : (
            <span>No changes</span>
          )}
          {hasUnsavedChanges && (
            <button 
              onClick={saveContent}
              className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              Save now
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default AdvancedBlockEditor; 