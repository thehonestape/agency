import React, { createContext, useContext, useState, useEffect } from 'react';
import { SimpleAIAssistant } from './SimpleAIAssistant';

interface AIAssistantContextType {
  isAssistantOpen: boolean;
  toggleAssistant: () => void;
  openAssistant: () => void;
  closeAssistant: () => void;
}

const AIAssistantContext = createContext<AIAssistantContextType | undefined>(undefined);

export function AIAssistantProvider({ children }: { children: React.ReactNode }) {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Check local storage for saved preference on initial load
  useEffect(() => {
    const savedState = localStorage.getItem('aiAssistantOpen');
    if (savedState === 'true') {
      setIsAssistantOpen(true);
    }
  }, []);

  // Save preference to local storage when changed
  useEffect(() => {
    localStorage.setItem('aiAssistantOpen', isAssistantOpen.toString());
  }, [isAssistantOpen]);

  const toggleAssistant = () => {
    setIsAssistantOpen(prev => !prev);
  };

  const openAssistant = () => {
    setIsAssistantOpen(true);
  };

  const closeAssistant = () => {
    setIsAssistantOpen(false);
  };

  // Listen for keyboard shortcut (Alt+A) to toggle assistant
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'a') {
        toggleAssistant();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <AIAssistantContext.Provider
      value={{
        isAssistantOpen,
        toggleAssistant,
        openAssistant,
        closeAssistant
      }}
    >
      {children}
      <SimpleAIAssistant isOpen={isAssistantOpen} onToggle={toggleAssistant} />
    </AIAssistantContext.Provider>
  );
}

export function useAIAssistant() {
  const context = useContext(AIAssistantContext);
  
  if (context === undefined) {
    throw new Error('useAIAssistant must be used within an AIAssistantProvider');
  }
  
  return context;
} 