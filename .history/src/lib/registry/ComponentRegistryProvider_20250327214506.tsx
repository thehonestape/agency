import React, { useEffect, useState } from 'react';
import { componentRegistry, ComponentRegistryContext } from './component-registry';

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

    // Register UI Components
    componentRegistry.register(Button, {
      id: 'ui-button',
      name: 'Button',
      description: 'Interactive button component with multiple variants and sizes',
      category: 'ui',
      tags: ['form', 'interactive', 'action', 'input']
    });

    componentRegistry.register(Input, {
      id: 'ui-input',
      name: 'Input',
      description: 'Text input field for forms',
      category: 'ui',
      tags: ['form', 'input', 'text']
    });

    componentRegistry.register(Card, {
      id: 'ui-card',
      name: 'Card',
      description: 'Container component for grouping related content',
      category: 'ui',
      tags: ['layout', 'container', 'grouping']
    });

    componentRegistry.register(Checkbox, {
      id: 'ui-checkbox',
      name: 'Checkbox',
      description: 'Selectable input component for boolean values',
      category: 'ui',
      tags: ['form', 'input', 'toggle', 'boolean']
    });

    componentRegistry.register(Switch, {
      id: 'ui-switch',
      name: 'Switch',
      description: 'Toggle switch for enabling/disabling settings',
      category: 'ui',
      tags: ['form', 'input', 'toggle', 'boolean']
    });

    componentRegistry.register(Select, {
      id: 'ui-select',
      name: 'Select',
      description: 'Dropdown selection component',
      category: 'ui',
      tags: ['form', 'input', 'dropdown', 'selection']
    });

    componentRegistry.register(Tabs, {
      id: 'ui-tabs',
      name: 'Tabs',
      description: 'Tabbed interface for content organization',
      category: 'ui',
      tags: ['navigation', 'layout', 'organization']
    });

    componentRegistry.register(Alert, {
      id: 'ui-alert',
      name: 'Alert',
      description: 'Status and notification message component',
      category: 'ui',
      tags: ['feedback', 'notification', 'status']
    });

    componentRegistry.register(Badge, {
      id: 'ui-badge',
      name: 'Badge',
      description: 'Small status indicator component',
      category: 'ui',
      tags: ['status', 'label', 'indicator']
    });

    componentRegistry.register(Avatar, {
      id: 'ui-avatar',
      name: 'Avatar',
      description: 'User profile picture component with fallback',
      category: 'ui',
      tags: ['user', 'profile', 'image']
    });

    // Register Pattern Components
    componentRegistry.register(SideNav, {
      id: 'pattern-sidenav',
      name: 'SideNav',
      description: 'Navigation sidebar for applications',
      category: 'pattern',
      tags: ['navigation', 'layout', 'sidebar']
    });

    componentRegistry.register(TopBar, {
      id: 'pattern-topbar',
      name: 'TopBar',
      description: 'Top navigation bar for applications',
      category: 'pattern',
      tags: ['navigation', 'layout', 'header']
    });

    componentRegistry.register(ProjectDashboard, {
      id: 'pattern-project-dashboard',
      name: 'ProjectDashboard',
      description: 'Dashboard for project management and tracking',
      category: 'pattern',
      tags: ['dashboard', 'project', 'analytics']
    });

    componentRegistry.register(AIUsageDashboard, {
      id: 'pattern-ai-usage-dashboard',
      name: 'AIUsageDashboard',
      description: 'Dashboard for monitoring AI usage metrics',
      category: 'pattern',
      tags: ['dashboard', 'ai', 'analytics', 'metrics']
    });

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