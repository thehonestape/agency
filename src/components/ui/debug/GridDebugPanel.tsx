import * as React from "react";
import { toggleBaselineGridDebug } from "@/lib/utils";

interface GridDebugPanelProps {
  defaultOpen?: boolean;
}

export function GridDebugPanel({ defaultOpen = false }: GridDebugPanelProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const [isEnabled, setIsEnabled] = React.useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const toggleDebug = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    toggleBaselineGridDebug(newState);
  };

  React.useEffect(() => {
    // Check if debug mode is enabled via URL
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const debugMode = urlParams.get("debug");
      if (debugMode === "grid") {
        setIsEnabled(true);
      }
    }
  }, []);

  return (
    <div
      className="fixed bottom-4 right-4 z-50"
      data-component="grid-debug-panel"
    >
      <button
        onClick={togglePanel}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
        aria-label={isOpen ? "Close grid debug panel" : "Open grid debug panel"}
      >
        <GridIcon className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute bottom-12 right-0 w-64 rounded-lg border bg-card p-4 shadow-lg">
          <h3 className="mb-2 font-medium">Baseline Grid Debug</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Visualize the semantic grid structure of your components
          </p>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">
              <input
                type="checkbox"
                checked={isEnabled}
                onChange={toggleDebug}
                className="mr-2 h-4 w-4"
              />
              Show grid overlay
            </label>
          </div>
          
          <div className="mt-4 text-xs text-muted-foreground">
            <p>Tip: Add <code>?debug=grid</code> to URL to enable on load</p>
          </div>
        </div>
      )}
    </div>
  );
}

function GridIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M3 15h18" />
      <path d="M9 3v18" />
      <path d="M15 3v18" />
    </svg>
  );
}
