# Component Directory Cleanup Plan

## Phase 1: Consolidate Layout Components

### 1. Merge Layout Directories
- [ ] Move contents from `layout/` to `layouts/`
- [ ] Move contents from `application-shells/` to `layouts/application/`
- [ ] Move contents from `application-ui/` to `layouts/application/`
- [ ] Delete empty directories after successful moves

### 2. Organize Layout Components
- [ ] Create subdirectories in `layouts/`:
  - `layouts/application/` - Application shells
  - `layouts/page/` - Page layouts
  - `layouts/sections/` - Section layouts
- [ ] Move components to appropriate subdirectories

## Phase 2: Development Tools

### 1. Create Dev Tools Directory
- [ ] Create `src/dev-tools/` directory
- [ ] Move development components:
  - `TailwindComponentBrowser.tsx`
  - `TailwindComponentViewer.tsx`
  - `component-viewer.css`
  - `PreviewImageGenerator.tsx`
  - `PreviewImageGenerator.css`

## Phase 3: Clean Up Redundant Directories

### 1. Merge Similar Directories
- [ ] Merge `ui-blocks/` into `ui/`
- [ ] Merge `catalyst-ui/` into `ui/`
- [ ] Merge `page-examples/` into `examples/`

### 2. Remove Empty/Redundant Directories
- [ ] Remove `.cleanup-plan/` after cleanup
- [ ] Remove any other empty directories

## Phase 4: Update Imports

### 1. Update Import Paths
- [ ] Update all import paths to reflect new structure
- [ ] Fix any broken imports
- [ ] Update index files

## Phase 5: Testing

### 1. Verify Changes
- [ ] Run test suite
- [ ] Check for build errors
- [ ] Verify component functionality
- [ ] Test in development environment

## Rollback Plan

If issues arise during cleanup:
1. Keep a backup of original directory structure
2. Document all changes made
3. Have a list of files moved
4. Maintain git history for easy rollback

## Success Criteria

1. All components are in their correct locations
2. No broken imports
3. All tests pass
4. Build succeeds
5. Development environment works
6. No redundant directories
7. Clear component organization 