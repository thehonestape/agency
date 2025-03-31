import React from 'react';
import { DesignSystemDocs } from '../design-system/DesignSystemDocs';

export default function DesignSystem() {
  // Adding a clean background wrapper to fix overlay issues
  return (
    <div className="min-h-screen bg-background">
      <DesignSystemDocs />
    </div>
  );
} 