import { useEffect, useState } from "react";
import React from "react";

// Try to import BlockNote dependencies, but don't fail if they're not available
let BlockNoteEditorType, PartialBlock, useBlockNote, BlockNoteView;
let hasBlockNotePackage = true;

try {
  const blockNoteCore = require("@blocknote/core");
  BlockNoteEditorType = blockNoteCore.BlockNoteEditor;
  PartialBlock = blockNoteCore.PartialBlock;
  
  const blockNoteReact = require("@blocknote/react");
  useBlockNote = blockNoteReact.useBlockNote;
  
  const blockNoteMantine = require("@blocknote/mantine");
  BlockNoteView = blockNoteMantine.BlockNoteView;
  
  // Try to import styles
  require("@blocknote/core/fonts/inter.css");
  require("@blocknote/core/style.css");
  require("@blocknote/mantine/style.css");
} catch (e) {
  console.warn('BlockNote dependencies are not available. BlockNoteEditor will render a fallback.');
  hasBlockNotePackage = false;
}

// Try to import next-themes
let useTheme;
try {
  const nextThemes = require("next-themes");
  useTheme = nextThemes.useTheme;
} catch (e) {
  console.warn('next-themes package is not available. BlockNoteEditor will use default theme.');
}

// Define props interface
interface BlockNoteEditorProps {
  initialContent?: any[]; // Use any[] instead of PartialBlock[] to avoid type errors
  onChange?: (content: any[]) => void;
  editable?: boolean;
  className?: string;
  placeholder?: string;
}

// Create a theme type that matches BlockNote's requirements
type Theme = "light" | "dark";

export function BlockNoteEditor({
  initialContent,
  onChange,
  editable = true,
  className = "",
  placeholder = "Type '/' for commands...",
}: BlockNoteEditorProps) {
  // If BlockNote dependencies are not available, render a fallback
  if (!hasBlockNotePackage) {
    return (
      <div className={`border rounded-md p-4 ${className}`}>
        <textarea
          className="w-full min-h-[200px] p-2"
          placeholder={placeholder}
          disabled={!editable}
          onChange={(e) => onChange?.(e.target.value ? [{ type: "paragraph", content: e.target.value }] : [])}
        />
      </div>
    );
  }
  
  // Get the current theme from next-themes (if available)
  const { theme: applicationTheme } = useTheme?.() || { theme: "light" };
  
  // State to handle theme synchronization
  const [theme, setTheme] = useState<Theme>("light");
  
  // Update BlockNote's theme when the application theme changes
  useEffect(() => {
    if (applicationTheme) {
      setTheme(applicationTheme as Theme);
    }
  }, [applicationTheme]);

  // Create a new editor instance
  const editor = useBlockNote({
    initialContent,
    defaultStyles: false, // We'll use our Tailwind styles
  });

  return (
    <div className={`block-note-editor ${className}`}>
      <BlockNoteView
        editor={editor}
        theme={theme}
        editable={editable}
        onChange={() => {
          if (onChange) {
            onChange(editor.topLevelBlocks);
          }
        }}
        className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none focus:outline-none"
      />
    </div>
  );
}

export default BlockNoteEditor; 