# Components Library Cleanup Plan

## Current Structure Issues
- Too many nested directories
- Duplication of similar components across categories
- Inconsistent naming conventions
- Complex import paths
- Poor discoverability

## New Structure

### 1. Core Components
- Keep `ui/` directory for all primitive components
- Standardize file naming (already improved)
- All core components in flat structure with consistent naming

### 2. Layout Components
- Consolidate all layout-related components in `layouts/`
- Move application shells into layouts with clear categorization
- Create consistent patterns

### 3. Feature Components
- Reorganize by domain rather than UI pattern
- Group related features together
- Reduce the depth of nesting

### 4. Actions

1. **Flatten Directory Structure**
   - Remove excessive nesting
   - Group similar components
   - Reduce path depth
   
2. **Standardize Naming**
   - Use consistent casing (PascalCase for components)
   - Clear, descriptive names
   - No redundant prefixes

3. **Optimize Exports**
   - Clean index files
   - Logical grouping in exports
   - Proper typing

4. **Component Organization**
   - Organize by function not by UI pattern
   - Keeps related components together
   - Improves developer experience

## Implementation Priority
1. UI Components (✅ Complete)
2. Layout Components
3. Feature Components
4. Remove redundant directories
5. Update all imports

## Benefits
- Faster imports
- Better developer experience
- Reduced bundle size through better tree-shaking
- More maintainable codebase
- Easier discovery of components 