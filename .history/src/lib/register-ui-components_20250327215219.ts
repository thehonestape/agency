import { registerUIComponents } from './registry-utils';

// Import UI components
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { RadioGroup } from '../components/ui/radio';
import { Switch } from '../components/ui/switch';
import { Slider } from '../components/ui/slider';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { Heading, Text } from '../components/ui/typography';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Label } from '../components/ui/label';

/**
 * Register all UI components with the component registry
 */
export function registerAllUIComponents() {
  // Register base UI components
  registerUIComponents({
    'ui.button': {
      component: Button,
      name: 'Button',
      description: 'Interactive button component with multiple variants and sizes',
      category: 'ui.inputs',
      tags: ['form', 'interactive', 'action', 'input'],
      descriptor: {
        type: 'primitive',
        tag: 'button',
      }
    },
    'ui.input': {
      component: Input,
      name: 'Input',
      description: 'Text input field for forms',
      category: 'ui.inputs',
      tags: ['form', 'input', 'text'],
      descriptor: {
        type: 'primitive',
        tag: 'input',
      }
    },
    'ui.textarea': {
      component: Textarea,
      name: 'Textarea',
      description: 'Multi-line text input for forms',
      category: 'ui.inputs',
      tags: ['form', 'input', 'text', 'multiline'],
      descriptor: {
        type: 'primitive',
        tag: 'textarea',
      }
    },
    'ui.checkbox': {
      component: Checkbox,
      name: 'Checkbox',
      description: 'Selectable input component for boolean values',
      category: 'ui.inputs',
      tags: ['form', 'input', 'toggle', 'boolean'],
      descriptor: {
        type: 'primitive',
        tag: 'input',
      }
    },
    'ui.switch': {
      component: Switch,
      name: 'Switch',
      description: 'Toggle switch for enabling/disabling settings',
      category: 'ui.inputs',
      tags: ['form', 'input', 'toggle', 'boolean'],
      descriptor: {
        type: 'primitive',
      }
    },
    'ui.select': {
      component: Select,
      name: 'Select',
      description: 'Dropdown selection component',
      category: 'ui.inputs',
      tags: ['form', 'input', 'dropdown', 'selection'],
      descriptor: {
        type: 'primitive',
      }
    },
    'ui.radiogroup': {
      component: RadioGroup,
      name: 'Radio Group',
      description: 'Group of radio buttons for selecting one option',
      category: 'ui.inputs',
      tags: ['form', 'input', 'selection', 'radio'],
      descriptor: {
        type: 'primitive',
      }
    },
    'ui.slider': {
      component: Slider,
      name: 'Slider',
      description: 'Slider control for selecting a value from a range',
      category: 'ui.inputs',
      tags: ['form', 'input', 'range', 'slider'],
      descriptor: {
        type: 'primitive',
      }
    },
    'ui.card': {
      component: Card,
      name: 'Card',
      description: 'Container component for grouping related content',
      category: 'ui.layout',
      tags: ['layout', 'container', 'grouping'],
      descriptor: {
        type: 'primitive',
        tag: 'div',
      }
    },
    'ui.tabs': {
      component: Tabs,
      name: 'Tabs',
      description: 'Tabbed interface for content organization',
      category: 'ui.navigation',
      tags: ['navigation', 'tabs', 'organization'],
      descriptor: {
        type: 'primitive',
      }
    },
    'ui.alert': {
      component: Alert,
      name: 'Alert',
      description: 'Status and notification message component',
      category: 'ui.feedback',
      tags: ['feedback', 'notification', 'status'],
      descriptor: {
        type: 'primitive',
        tag: 'div',
      }
    },
    'ui.badge': {
      component: Badge,
      name: 'Badge',
      description: 'Small status indicator component',
      category: 'ui.data-display',
      tags: ['status', 'label', 'indicator'],
      descriptor: {
        type: 'primitive',
        tag: 'span',
      }
    },
    'ui.avatar': {
      component: Avatar,
      name: 'Avatar',
      description: 'User profile picture component with fallback',
      category: 'ui.data-display',
      tags: ['user', 'profile', 'image'],
      descriptor: {
        type: 'primitive',
        tag: 'div',
      }
    },
    'ui.heading': {
      component: Heading,
      name: 'Heading',
      description: 'Typographic heading component with variants',
      category: 'ui.typography',
      tags: ['typography', 'text', 'heading'],
      descriptor: {
        type: 'primitive',
        tag: 'h2',
      }
    },
    'ui.text': {
      component: Text,
      name: 'Text',
      description: 'Typographic text component for paragraphs and content',
      category: 'ui.typography',
      tags: ['typography', 'text', 'paragraph'],
      descriptor: {
        type: 'primitive',
        tag: 'p',
      }
    },
    'ui.label': {
      component: Label,
      name: 'Label',
      description: 'Label component for form inputs',
      category: 'ui.inputs',
      tags: ['form', 'accessibility', 'label'],
      descriptor: {
        type: 'primitive',
        tag: 'label',
      }
    },
  });

  console.log('All UI components registered with the component registry');
}

export default registerAllUIComponents; 