import { BlockNoteEditor as BlockNoteEditorType, PartialBlock } from "@blocknote/core";
import { useBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/core/style.css";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Define props interface
interface BlockNoteEditorProps {
  initialContent?: PartialBlock[];
  onChange?: (content: PartialBlock[]) => void;
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
  // Get the current theme from next-themes
  const { theme: applicationTheme } = useTheme();
  
  // State to handle theme synchronization
  const [theme, setTheme] = useState<Theme>("light");
  
  // Update BlockNote's theme when the application theme changes
  useEffect(() => {
    if (applicationTheme) {
      setTheme(applicationTheme as Theme);
    }
  }, [applicationTheme]);

  // Create a new editor instance
  const editor: BlockNoteEditorType = useBlockNote({
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