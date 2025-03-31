import React from 'react';
import { generateTheme } from '@/lib/theme/generator';
import { ThemeColors } from '@/lib/theme/types';

interface ColorScaleProps {
  primaryColor: string;
  secondaryColor?: string;
  accentColor?: string;
}

export function ColorScale({ primaryColor, secondaryColor, accentColor }: ColorScaleProps) {
  const theme = generateTheme({
    primaryColor,
    secondaryColor,
    accentColor,
    mode: 'light',
  });

  const scales = ['primary', 'secondary', 'accent'] as const;
  const steps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const;

  return (
    <div className="space-y-8">
      {scales.map((scale) => (
        <div key={scale} className="space-y-2">
          <h3 className="text-lg font-semibold capitalize">{scale} Scale</h3>
          <div className="grid grid-cols-11 gap-2">
            {steps.map((step) => {
              const colorKey = `${scale}-${step}` as keyof ThemeColors;
              const color = theme.colors[colorKey];
              const textColor = parseInt(step) <= 500 ? 'text-gray-900' : 'text-white';
              
              return (
                <div
                  key={step}
                  className="group relative aspect-square rounded-lg shadow-sm"
                  style={{ backgroundColor: color }}
                >
                  <div className={`absolute inset-0 flex items-center justify-center text-sm font-mono ${textColor}`}>
                    {step}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className={`bg-white/90 p-2 rounded text-sm font-mono ${textColor}`}>
                      {color}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
} 