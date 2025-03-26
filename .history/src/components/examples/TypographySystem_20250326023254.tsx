import React from 'react';
import { Card, CardContent } from '@/components/ui';

export function TypographySystem() {
  return (
    <div className="typography-system space-y-8">
      <Card className="typography-card border border-border shadow-sm overflow-hidden bg-card">
        <div className="card-header border-b border-border bg-secondary px-6 py-4">
          <h2 className="card-title text-lg font-medium text-foreground">Headings</h2>
        </div>
        <CardContent className="card-content p-6">
          <div className="headings-showcase space-y-6">
            <div className="heading-item">
              <h1 className="text-4xl font-bold text-foreground">Heading 1</h1>
              <p className="text-sm text-muted-foreground mt-1">text-4xl font-bold</p>
            </div>
            <div className="heading-item">
              <h2 className="text-3xl font-bold text-foreground">Heading 2</h2>
              <p className="text-sm text-muted-foreground mt-1">text-3xl font-bold</p>
            </div>
            <div className="heading-item">
              <h3 className="text-2xl font-bold text-foreground">Heading 3</h3>
              <p className="text-sm text-muted-foreground mt-1">text-2xl font-bold</p>
            </div>
            <div className="heading-item">
              <h4 className="text-xl font-semibold text-foreground">Heading 4</h4>
              <p className="text-sm text-muted-foreground mt-1">text-xl font-semibold</p>
            </div>
            <div className="heading-item">
              <h5 className="text-lg font-medium text-foreground">Heading 5</h5>
              <p className="text-sm text-muted-foreground mt-1">text-lg font-medium</p>
            </div>
            <div className="heading-item">
              <h6 className="text-base font-medium text-foreground">Heading 6</h6>
              <p className="text-sm text-muted-foreground mt-1">text-base font-medium</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="typography-card border border-border shadow-sm overflow-hidden bg-card">
        <div className="card-header border-b border-border bg-secondary px-6 py-4">
          <h2 className="card-title text-lg font-medium text-foreground">Text</h2>
        </div>
        <CardContent className="card-content p-6">
          <div className="text-showcase space-y-6">
            <div className="text-item">
              <p className="text-base text-foreground font-normal">Base Text</p>
              <p className="text-sm text-muted-foreground mt-1">text-base font-normal</p>
            </div>
            <div className="text-item">
              <p className="text-base text-muted-foreground font-normal">Secondary Text</p>
              <p className="text-sm text-muted-foreground mt-1">text-base text-muted-foreground</p>
            </div>
            <div className="text-item">
              <p className="text-sm text-foreground font-normal">Small Text</p>
              <p className="text-sm text-muted-foreground mt-1">text-sm font-normal</p>
            </div>
            <div className="text-item">
              <p className="text-xs text-foreground font-normal">Extra Small Text</p>
              <p className="text-sm text-muted-foreground mt-1">text-xs font-normal</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="typography-card border border-border shadow-sm overflow-hidden bg-card">
        <div className="card-header border-b border-border bg-secondary px-6 py-4">
          <h2 className="card-title text-lg font-medium text-foreground">Font Weights</h2>
        </div>
        <CardContent className="card-content p-6">
          <div className="weight-showcase space-y-4">
            <div className="weight-item">
              <p className="text-lg font-normal text-foreground">Normal text (400)</p>
              <p className="text-sm text-muted-foreground mt-1">font-normal</p>
            </div>
            <div className="weight-item">
              <p className="text-lg font-medium text-foreground">Medium text (500)</p>
              <p className="text-sm text-muted-foreground mt-1">font-medium</p>
            </div>
            <div className="weight-item">
              <p className="text-lg font-semibold text-foreground">Semibold text (600)</p>
              <p className="text-sm text-muted-foreground mt-1">font-semibold</p>
            </div>
            <div className="weight-item">
              <p className="text-lg font-bold text-foreground">Bold text (700)</p>
              <p className="text-sm text-muted-foreground mt-1">font-bold</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TypographySystem; 