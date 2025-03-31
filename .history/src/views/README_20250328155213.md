# Simple View Switching System

This directory contains a simple but flexible view switching system that doesn't rely on React Router. This is perfect for creating multi-view interfaces within an existing page or application.

## Available Components

1. **SimpleViewSwitcher**: A button-based navigation system
2. **TabViewSwitcher**: A tabs-based navigation system 

## How to Use

### Basic Usage

```jsx
import SimpleViewSwitcher from './views/SimpleViewSwitcher';

// Define your views
const views = [
  {
    id: 'home',
    label: 'Home',
    content: <HomeComponent />
  },
  {
    id: 'about',
    label: 'About',
    content: <AboutComponent />
  },
  {
    id: 'settings',
    label: 'Settings',
    content: <SettingsComponent />
  }
];

// Use in your component
function MyPage() {
  return (
    <div>
      <h1>My Application</h1>
      <SimpleViewSwitcher views={views} defaultView="home" />
    </div>
  );
}
```

### Tabs Version

```jsx
import TabViewSwitcher from './views/TabViewSwitcher';

// Define your views (same structure as above)
const views = [...];

// Use the tabs version
function MyPage() {
  return (
    <div>
      <h1>My Application</h1>
      <TabViewSwitcher views={views} defaultView="home" />
    </div>
  );
}
```

## Examples

Check these files for fully working examples:

- `SimpleDemoPage.tsx`: Basic usage example
- `FullViewExample.tsx`: Comprehensive example with switchable view types

## Routes

Visit these routes to see the components in action:

- `/simple-views`: Simple button-based navigation
- `/full-view-demo`: Full example with both buttons and tabs options 