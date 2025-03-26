import React, { useState, useRef, useEffect } from 'react';
import { useBrandSystem } from '../../context/BrandSystemContext';
import { cn } from '../../lib/utils';
import { Message, Suggestion } from '../../types/brand-system';

export function BrandChat() {
  const {
    conversationContext,
    sendMessage,
    applySuggestion,
    isLoading,
    error
  } = useBrandSystem();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationContext?.history.messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    await sendMessage(input);
    setInput('');
  };

  const renderMessage = (message: Message) => {
    const isUser = message.role === 'user';
    return (
      <div
        key={message.timestamp}
        className={cn(
          'flex w-full',
          isUser ? 'justify-end' : 'justify-start'
        )}
      >
        <div
          className={cn(
            'max-w-[80%] rounded-lg px-4 py-2',
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          )}
        >
          <p className="text-sm">{message.content}</p>
          <span className="mt-1 block text-xs opacity-70">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>
    );
  };

  const renderSuggestions = (suggestions: Suggestion[]) => {
    if (!suggestions.length) return null;

    return (
      <div className="flex flex-wrap gap-2 p-4">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => applySuggestion(suggestion)}
            className="rounded-full bg-primary/10 px-4 py-2 text-sm text-primary hover:bg-primary/20"
          >
            {suggestion.text}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {conversationContext?.history.messages.map(renderMessage)}
        {error && (
          <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
            {error.message}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {conversationContext?.current.suggestions &&
        renderSuggestions(conversationContext.current.suggestions)}

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-md border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={cn(
              'rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'hover:bg-primary/90'
            )}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
} 