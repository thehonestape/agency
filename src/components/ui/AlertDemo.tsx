import React from 'react';

export const AlertDemo: React.FC = () => {
  return (
    <div className="mb-4 rounded-lg border border-blue-300 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-800 dark:bg-gray-800 dark:text-blue-400">
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
      <button className="mt-3 ml-6 rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
        Dismiss
      </button>
    </div>
  );
};

export default AlertDemo;
