# Testing in the Agency Project

## Current Status

We've encountered significant challenges with testing React components that use hooks, particularly with the `useTheme` hook from our application's theme context system. These issues manifest as errors like:

```
Cannot read properties of null (reading 'useContext')
Cannot read properties of null (reading 'useState')
```

## Working Solutions

We have successfully created and run tests for:

1. **Simple standalone components that don't use hooks**
   - See: `src/components/MinimalTest.test.tsx`
   - See: `src/components/SimpleButton.test.tsx`

## Challenges and Limitations

The main challenges are:

1. **React Hooks in JSDOM Environment**: React hooks are failing when running in the JSDOM test environment. This appears to be an issue with how React is initialized in the test environment.

2. **Theme Context Dependency**: Many of our components depend on the `ThemeContext` and use the `useTheme` hook, making them difficult to test without a proper mock.

3. **Attempted Solutions**: We've tried various approaches to mock the `ThemeProvider` and `ThemeContext`, but continue to face issues with hooks.

## Recommendations

Here are some recommended approaches for moving forward with testing:

1. **Component Isolation**: Create non-context-dependent versions of components for testing or refactor components to accept theme values as props.

2. **Minimal Tests**: For now, focus on testing components that don't rely on context or hooks.

3. **Mock Development**: Continue to develop and refine ThemeContext mocks that work with the JSDOM environment.

4. **Integration Tests**: Consider adding more integration or e2e tests that test the components in a real browser environment where hooks work properly.

## Setting Up Tests

When creating new tests:

1. Use the simplified test setup in `src/test/setup.ts`
2. Use the basic render function from `src/test/test-utils.tsx` 
3. Follow the patterns established in `SimpleButton.test.tsx` for tests that don't depend on context

## Future Work

- Investigate React Testing Library's configuration for better hook support
- Consider upgrading testing tools if newer versions offer better support for hooks in JSDOM
- Develop better mocking strategies for the theme context 