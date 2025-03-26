import React from 'react';

export interface WithDashedBorderProps {
  icon?: React.ReactNode;
  title: string;
  onClick?: () => void;
  className?: string;
}

export function WithDashedBorder({
  icon,
  title,
  onClick,
  className = ''
}: WithDashedBorderProps) {
  const defaultIcon = (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="mx-auto size-12 text-gray-400"
    >
      <path
        d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden ${className}`}
    >
      {icon || defaultIcon}
      <span className="mt-2 block text-sm font-semibold text-gray-900">{title}</span>
    </button>
  );
} 