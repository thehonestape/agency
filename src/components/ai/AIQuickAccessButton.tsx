import React from 'react';
import { FiCpu, FiMessageCircle } from 'react-icons/fi';
import { useAIAssistant } from './AIAssistantProvider';

interface AIQuickAccessButtonProps {
  variant?: 'icon' | 'text' | 'full';
  position?: 'inline' | 'floating';
  customPrompt?: string;
  className?: string;
}

export function AIQuickAccessButton({ 
  variant = 'icon',
  position = 'inline',
  customPrompt,
  className = ''
}: AIQuickAccessButtonProps) {
  const { openAssistant } = useAIAssistant();
  
  const handleClick = () => {
    openAssistant();
    // In the future, we could add functionality to pre-fill the AI input with customPrompt
  };
  
  if (position === 'floating') {
    return (
      <button
        onClick={handleClick}
        className={`fixed bottom-24 right-6 bg-brand-primary hover:bg-brand-primary-dark text-white p-3 rounded-full shadow-lg z-40 transition-all duration-300 ${className}`}
        aria-label="AI Assistant"
      >
        <FiCpu size={24} />
      </button>
    );
  }
  
  if (variant === 'icon') {
    return (
      <button
        onClick={handleClick}
        className={`p-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-full ${className}`}
        aria-label="AI Assistant"
      >
        <FiCpu size={20} />
      </button>
    );
  }
  
  if (variant === 'text') {
    return (
      <button
        onClick={handleClick}
        className={`text-brand-primary hover:text-brand-primary-dark font-medium ${className}`}
      >
        Ask AI
      </button>
    );
  }
  
  // Full variant
  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-md ${className}`}
    >
      <FiMessageCircle size={16} />
      <span>Ask AI Assistant</span>
    </button>
  );
} 