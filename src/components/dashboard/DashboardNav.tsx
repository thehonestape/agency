import { useState, useEffect, ReactNode, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Monitor, Users, MessageSquare, Brush, User, GripVertical, X, Minimize, Maximize } from 'lucide-react';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';

// Types for the utility component
interface UtilityPanelProps {
  title?: string;
  children?: ReactNode;
  defaultWidth?: number;
  defaultCollapsed?: boolean;
  storageKey?: string;
  className?: string;
}

// Default position if nothing in localStorage
const DEFAULT_POSITION = { x: 20, y: 80 };

// The main utility panel component - can be used for testing various features
export function UtilityPanel({
  title = "Utility Panel",
  children,
  defaultWidth = 320,
  defaultCollapsed = false,
  storageKey = 'utilityPanelPosition',
  className = ''
}: UtilityPanelProps) {
  // Create a ref for the draggable element
  const nodeRef = useRef(null);
  
  // Get initial position based on storage key
  const getInitialPosition = () => {
    if (storageKey === 'dashboardNavPosition') {
      return { x: 20, y: 80 };
    } else if (storageKey === 'testPanelPosition') {
      return { x: 400, y: 80 };
    } else if (storageKey === 'featureTester') {
      return { x: 30, y: 100 };
    } else if (storageKey === 'theme-panel') {
      return { x: 30, y: 100 };
    } else {
      return { x: 20, y: 100 };
    }
  };
  
  const [position, setPosition] = useState(getInitialPosition());
  const [isDragging, setIsDragging] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [width, setWidth] = useState(defaultWidth);
  
  // Load saved position from localStorage on component mount
  useEffect(() => {
    try {
      const savedPosition = localStorage.getItem(storageKey);
      if (savedPosition) {
        const parsedPosition = JSON.parse(savedPosition);
        // Only use the saved position if it has valid x and y coordinates
        if (typeof parsedPosition.x === 'number' && typeof parsedPosition.y === 'number') {
          setPosition(parsedPosition);
        }
      }
      
      const savedCollapsed = localStorage.getItem(`${storageKey}_collapsed`);
      if (savedCollapsed !== null) {
        setIsCollapsed(JSON.parse(savedCollapsed));
      }

      const savedWidth = localStorage.getItem(`${storageKey}_width`);
      if (savedWidth !== null) {
        setWidth(JSON.parse(savedWidth));
      }
    } catch (error) {
      console.error('Failed to load settings from localStorage:', error);
    }
  }, [storageKey, defaultWidth]);
  
  // Save position to localStorage when it changes
  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    setIsDragging(false);
    const newPosition = { x: data.x, y: data.y };
    setPosition(newPosition);
    try {
      localStorage.setItem(storageKey, JSON.stringify(newPosition));
    } catch (error) {
      console.error('Failed to save position to localStorage:', error);
    }
  };
  
  // Toggle collapsed state
  const toggleCollapsed = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    try {
      localStorage.setItem(`${storageKey}_collapsed`, JSON.stringify(newState));
    } catch (error) {
      console.error('Failed to save collapsed state to localStorage:', error);
    }
  };

  // Save width when it changes
  useEffect(() => {
    try {
      localStorage.setItem(`${storageKey}_width`, JSON.stringify(width));
    } catch (error) {
      console.error('Failed to save width to localStorage:', error);
    }
  }, [width, storageKey]);
  
  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      onStart={() => setIsDragging(true)}
      onStop={handleDragStop}
      handle=".drag-handle"
      bounds="body"
    >
      <div 
        ref={nodeRef}
        className={`fixed bg-white dark:bg-slate-900 p-0 rounded-lg shadow-md border border-gray-200 z-[1000] transition-all duration-300 ${
          isDragging ? 'opacity-80' : 'opacity-100'
        } ${isCollapsed ? 'h-10' : ''} ${className}`}
        style={{ width: isCollapsed ? '320px' : `${width}px` }}
      >
        {/* Top bar - Only title and controls */}
        <div className="drag-handle flex justify-between items-center px-4 h-10 cursor-move border-b border-gray-200 rounded-t-lg">
          <h2 className="text-base font-medium truncate text-gray-800 dark:text-gray-100">{title}</h2>
          <div className="flex items-center gap-2">
            {isCollapsed ? (
              <Maximize 
                className="h-4 w-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer" 
                onClick={toggleCollapsed}
              />
            ) : (
              <Minimize 
                className="h-4 w-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer" 
                onClick={toggleCollapsed}
              />
            )}
          </div>
        </div>
        
        {/* Body content */}
        {!isCollapsed && (
          <div className="max-h-[calc(100vh-12rem)] overflow-y-auto text-gray-900 dark:text-gray-100">
            {children}
          </div>
        )}
      </div>
    </Draggable>
  );
}

// Default dashboard utility component (simplified without navigation items)
export function DashboardNav() {
  return (
    <UtilityPanel title="Dashboard Utility" storageKey="dashboardNavPosition">
      <div className="col-span-8">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
          <p className="text-gray-800 dark:text-gray-100 mb-2">This utility panel can be used for testing various features.</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Drag it anywhere on the screen or collapse it when not needed.</p>
        </div>
      </div>
    </UtilityPanel>
  );
}