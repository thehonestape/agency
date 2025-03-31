import React, { useEffect, useState } from 'react';
import { componentRegistry, ComponentRegistryContext } from './component-registry';
import { registerComponentsInCategory } from './register-components';
import { ComponentExamples } from './component-examples';

// Import UI components for registry
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/input';
import { Checkbox } from '../../components/ui/checkbox';
import { RadioGroup } from '../../components/ui/radio';
import { Switch } from '../../components/ui/switch';
import { Slider } from '../../components/ui/slider';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '../../components/ui/alert';
import { Badge } from '../../components/ui/badge';
import { Heading, Text } from '../../components/ui/typography';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';
import { Label } from '../../components/ui/label';

// Import pattern components
import { SideNav } from '../../components/patterns/navigation/SideNav';
import { TopBar } from '../../components/patterns/navigation/TopBar';
import { ProjectDashboard } from '../../components/patterns/dashboard/ProjectDashboard';
import { AIUsageDashboard } from '../../components/patterns/dashboard/AIUsageDashboard';

interface ComponentRegistryProviderProps {
  children: React.ReactNode;
}

export const ComponentRegistryProvider: React.FC<ComponentRegistryProviderProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  // Register all components once on mount
  useEffect(() => {
    if (isInitialized) return;

    // Register UI components in bulk
    registerComponentsInCategory('ui', {
      'ui-button': {
        component: Button,
        name: 'Button',
        description: 'Interactive button component with multiple variants and sizes',
        tags: ['form', 'interactive', 'action', 'input'],
        example: <ComponentExamples.Button />
      },
      'ui-input': {
        component: Input,
        name: 'Input',
        description: 'Text input field for forms',
        tags: ['form', 'input', 'text'],
        example: <ComponentExamples.Input />
      },
      'ui-card': {
        component: Card,
        name: 'Card',
        description: 'Container component for grouping related content',
        tags: ['layout', 'container', 'grouping'],
        example: <ComponentExamples.Card />
      },
      'ui-checkbox': {
        component: Checkbox,
        name: 'Checkbox',
        description: 'Selectable input component for boolean values',
        tags: ['form', 'input', 'toggle', 'boolean'],
        example: <ComponentExamples.Checkbox />
      },
      'ui-switch': {
        component: Switch,
        name: 'Switch',
        description: 'Toggle switch for enabling/disabling settings',
        tags: ['form', 'input', 'toggle', 'boolean'],
        example: <ComponentExamples.Switch />
      },
      'ui-tabs': {
        component: Tabs,
        name: 'Tabs',
        description: 'Tabbed interface for content organization',
        tags: ['navigation', 'layout', 'organization'],
        example: <ComponentExamples.Tabs />
      },
      'ui-alert': {
        component: Alert,
        name: 'Alert',
        description: 'Status and notification message component',
        tags: ['feedback', 'notification', 'status'],
        example: <ComponentExamples.Alert />
      },
      'ui-badge': {
        component: Badge,
        name: 'Badge',
        description: 'Small status indicator component',
        tags: ['status', 'label', 'indicator'],
        example: <ComponentExamples.Badge />
      },
      'ui-avatar': {
        component: Avatar,
        name: 'Avatar',
        description: 'User profile picture component with fallback',
        tags: ['user', 'profile', 'image'],
        example: <ComponentExamples.Avatar />
      },
      'ui-heading': {
        component: Heading,
        name: 'Heading',
        description: 'Typographic heading component with variants',
        tags: ['typography', 'text', 'heading']
      },
      'ui-text': {
        component: Text,
        name: 'Text',
        description: 'Typographic text component for paragraphs and content',
        tags: ['typography', 'text', 'paragraph']
      },
      'ui-select': {
        component: Select,
        name: 'Select',
        description: 'Dropdown selection component',
        tags: ['form', 'input', 'dropdown', 'selection']
      },
      'ui-textarea': {
        component: Textarea,
        name: 'Textarea',
        description: 'Multi-line text input for forms',
        tags: ['form', 'input', 'text', 'multiline']
      },
      'ui-radio-group': {
        component: RadioGroup,
        name: 'Radio Group',
        description: 'Group of radio buttons for selecting one option',
        tags: ['form', 'input', 'selection', 'radio']
      },
      'ui-slider': {
        component: Slider,
        name: 'Slider',
        description: 'Slider control for selecting a value from a range',
        tags: ['form', 'input', 'range', 'slider']
      },
      'ui-label': {
        component: Label,
        name: 'Label',
        description: 'Label component for form inputs',
        tags: ['form', 'accessibility', 'label']
      }
    });

    // Register Pattern Components
    registerComponentsInCategory('pattern', {
      'pattern-sidenav': {
        component: SideNav,
        name: 'SideNav',
        description: 'Navigation sidebar for applications',
        tags: ['navigation', 'layout', 'sidebar']
      },
      'pattern-topbar': {
        component: TopBar,
        name: 'TopBar',
        description: 'Top navigation bar for applications',
        tags: ['navigation', 'layout', 'header']
      },
      'pattern-project-dashboard': {
        component: ProjectDashboard,
        name: 'ProjectDashboard',
        description: 'Dashboard for project management and tracking',
        tags: ['dashboard', 'project', 'analytics']
      },
      'pattern-ai-usage-dashboard': {
        component: AIUsageDashboard,
        name: 'AIUsageDashboard',
        description: 'Dashboard for monitoring AI usage metrics',
        tags: ['dashboard', 'ai', 'analytics', 'metrics']
      }
    });

    // Log component registration success
    console.log(`Initialized component registry with ${componentRegistry.getCount()} components`);
    setIsInitialized(true);
  }, [isInitialized]);

  return (
    <ComponentRegistryContext.Provider value={componentRegistry}>
      {children}
    </ComponentRegistryContext.Provider>
  );
};

export default ComponentRegistryProvider; 