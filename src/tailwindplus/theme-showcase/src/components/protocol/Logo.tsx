import React from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`text-emerald-500 font-bold text-xl ${className}`}>
      Protocol
    </div>
  );
} 