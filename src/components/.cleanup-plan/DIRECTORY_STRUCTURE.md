# New Directory Structure

## Core UI Components
```
src/components/ui/
├── alert.tsx
├── avatar.tsx
├── badge.tsx
├── banner.tsx
├── button.tsx
├── Card.tsx
├── combobox.tsx
├── input.tsx
├── label.tsx
├── scroll-area.tsx
├── select.tsx
├── sheet.tsx
├── skeleton.tsx
├── slider.tsx
├── switch.tsx
├── tabs.tsx
├── textarea.tsx
├── theme/
│   ├── theme-provider.tsx
│   └── theme-switcher.tsx
├── typography/
│   ├── heading.tsx
│   └── paragraph.tsx
└── index.ts
```

## Layout Components
```
src/components/layouts/
├── application/
│   ├── stacked/
│   │   ├── DarkNavWithWhitePageHeader.tsx
│   │   ├── LightNavWithBottomBorder.tsx
│   │   └── LightNavOnGrayBackground.tsx
│   ├── sidebar/
│   │   ├── BrandSidebarWithHeader.tsx
│   │   ├── DarkSidebarWithHeader.tsx
│   │   └── LightSidebarWithHeader.tsx
│   ├── multi-column/
│   │   ├── FullWidthThreeColumn.tsx
│   │   └── FullWidthSecondaryColumnOnRight.tsx
│   └── index.ts
├── page/
│   ├── SingleColumn.tsx
│   ├── TwoColumn.tsx
│   └── index.ts
└── index.ts
```

## Feature Components (Domain-Based)
```
src/components/features/
├── auth/
│   ├── LoginForm.tsx
│   ├── RegistrationForm.tsx
│   └── index.ts
├── dashboard/
│   ├── AnalyticsPanel.tsx
│   ├── MetricsCard.tsx
│   └── index.ts
├── projects/
│   ├── ProjectList.tsx
│   ├── ProjectDetails.tsx
│   └── index.ts
├── marketing/
│   ├── HeroSection.tsx
│   ├── FeatureList.tsx
│   └── index.ts
├── brand/
│   ├── BrandDetails.tsx
│   ├── BrandList.tsx
│   └── index.ts
├── editor/
│   ├── TextEditor.tsx
│   ├── RichEditor.tsx
│   └── index.ts
└── index.ts
```

## Examples and Documentation
```
src/components/examples/
├── auth/
│   └── LoginExample.tsx
├── layout/
│   └── SidebarExample.tsx
└── index.ts
```

## Main Index File
The main `src/components/index.ts` file would have a clean structure:

```typescript
// Core UI Components
export * from './ui';

// Layout Components
export * from './layouts';

// Feature Components
export * from './features';

// Specific Components
export * from './ErrorBoundary';
export * from './theme-toggle';

// Examples (only imported explicitly when needed)
// export * from './examples';
```

## Implementation Approach
1. Start with creating new directory structure
2. Move components to their new locations
3. Update imports in the components themselves
4. Update the index files
5. Remove old directories when everything is migrated

This approach allows for gradual migration without breaking existing code. 