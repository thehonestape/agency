import React from 'react';
import { cn } from '@/lib/utils';

export const AlertDemo: React.FC = () => {
  return (
    <div className="mb-4 rounded-lg border border-info bg-info/10 p-4 text-sm text-info-foreground">
      <div className="flex items-center">
        <svg className="mr-2 h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12zm-1-5h2v2H9v-2zm0-6h2v4H9V5z" />
        </svg>
        <span className="font-medium">Info alert!</span>
      </div>
      <div className="mt-2 pl-6">
        Change a few things up and try submitting again. This is using the Tailwind CSS class
        sorting plugin.
      </div>
      <button className="mt-3 ml-6 rounded-md bg-info text-info-foreground px-4 py-2 transition-colors hover:bg-info/90 focus:ring-2 focus:ring-info focus:ring-offset-2 focus:outline-none">
        Dismiss
      </button>
    </div>
  );
};

export default AlertDemo;
