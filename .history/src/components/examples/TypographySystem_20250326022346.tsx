import React from 'react';
import { Card, CardContent } from '@/components/ui';

export function TypographySystem() {
  return (
    <div className="space-y-8">
      <Card className="border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden bg-white dark:bg-gray-800">
        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-850 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Headings</h2>
        </div>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Heading 1</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">text-4xl font-bold</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Heading 2</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">text-3xl font-bold</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Heading 3</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">text-2xl font-bold</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Heading 4</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">text-xl font-semibold</p>
            </div>
            <div>
              <h5 className="text-lg font-medium text-gray-900 dark:text-gray-100">Heading 5</h5>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">text-lg font-medium</p>
            </div>
            <div>
              <h6 className="text-base font-medium text-gray-900 dark:text-gray-100">Heading 6</h6>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">text-base font-medium</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden bg-white dark:bg-gray-800">
        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-850 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Text</h2>
        </div>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <p className="text-base text-gray-900 dark:text-gray-100 font-normal">Base Text</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">text-base font-normal</p>
            </div>
            <div>
              <p className="text-base text-gray-500 dark:text-gray-400 font-normal">Secondary Text</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">text-base text-gray-500 dark:text-gray-400</p>
            </div>
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-normal">Small Text</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">text-sm font-normal</p>
            </div>
            <div>
              <p className="text-xs text-gray-700 dark:text-gray-300 font-normal">Extra Small Text</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">text-xs font-normal</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden bg-white dark:bg-gray-800">
        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-850 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Font Weights</h2>
        </div>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <p className="text-lg font-normal text-gray-900 dark:text-gray-100">Normal text (400)</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">font-normal</p>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-gray-100">Medium text (500)</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">font-medium</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">Semibold text (600)</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">font-semibold</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">Bold text (700)</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">font-bold</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TypographySystem; 