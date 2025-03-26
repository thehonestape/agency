import React from 'react';
import { BrandSystemProvider } from '../../context/BrandSystemContext';
import { BrandChat } from '../../components/brand/BrandChat';
import { cn } from '../../lib/utils';
import RootLayout from '../../components/layouts/RootLayout';

export function BrandBuilder() {
  return (
    <RootLayout>
      <BrandSystemProvider>
        <div className="flex min-h-screen flex-col bg-background">
          {/* Header */}
          <header className="border-b bg-card">
            <div className="container mx-auto px-4 py-6">
              <h1 className="text-3xl font-bold text-foreground">Brand Builder</h1>
              <p className="mt-2 text-muted-foreground">
                Build and evolve your brand with AI assistance
              </p>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            <div className="container mx-auto px-4 py-6">
              <div className="rounded-lg border bg-card shadow-sm">
                <BrandChat />
              </div>
            </div>
          </main>
        </div>
      </BrandSystemProvider>
    </RootLayout>
  );
}

export default BrandBuilder; 