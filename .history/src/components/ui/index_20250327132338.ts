// Core UI Components
// These are primitive building blocks used throughout the application

// Layout
export { Card } from './Card';
export { 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from './Card';
export { ScrollArea } from './scroll-area';
export { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
export { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './sheet';

// Forms and Inputs
export { Input } from './input';
export { Textarea } from './textarea';
export { Label } from './label';
export { Switch } from './switch';
export { Slider } from './slider';
export { Checkbox, CheckboxWithLabel } from './checkbox';
export { Radio, RadioGroup, RadioItem } from './radio';
export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './select';
export { 
  Combobox, 
  ComboboxInput, 
  ComboboxButton, 
  ComboboxOptions, 
  ComboboxOption 
} from './combobox';

// Actions
export { Button, buttonVariants } from "./button";

// Display 
export { Badge } from './badge';
export { Avatar } from './avatar';
export { Alert, AlertDescription, AlertTitle } from './alert';
export { Banner, BannerTitle, BannerDescription } from './banner';
export { Skeleton } from './skeleton';
export { 
  Toast, 
  ToastProvider, 
  ToastTitle, 
  ToastDescription, 
  ToastAction 
} from './toast';

// Theme
export { ThemeSwitcher } from './theme-switcher';
export { ThemeSelector } from './ThemeSelector';

// Editor components
export { default as BlockEditor } from './BlockEditor';
export { default as AdvancedBlockEditor } from './AdvancedBlockEditor';

// Dialog component
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
} from "./dialog";

// Form Components
import {
  Input,
  Select,
  SelectGroup,
  SelectValue,
  SelectLabel,
  SelectSeparator,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Textarea,
  Switch,
  SwitchGroup,
  Slider,
  ColorPicker,
  DatePicker,
  TimePicker,
  DateTimePicker,
  MonthPicker,
} from './form';

// Basic UI Components
import { Button } from './button';
import { Card } from './Card';
import { Label } from './label';
import { Badge } from './badge';
import { Avatar } from './avatar';
import { ScrollArea } from './scroll-area';

// Dialog Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog';
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
} from './catalyst-ui-kit/javascript/dropdown';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './tabs';

// Feedback Components
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from './alert';
import { Banner } from './banner';

// Theme Components
import { ThemeSwitcher } from './theme-switcher';

// Semantic UI Composition
export const UI = {
  // Form Components
  Form: {
    Input,
    Select,
    SelectGroup,
    SelectValue,
    SelectLabel,
    SelectSeparator,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    Textarea,
    Switch,
    SwitchGroup,
    Slider,
    ColorPicker,
    DatePicker,
    TimePicker,
    DateTimePicker,
    MonthPicker,
  },
  
  // Basic UI Components
  Button,
  Card,
  Label,
  Badge,
  Avatar,
  ScrollArea,
  
  // Dialog Components
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Dropdown,
  DropdownButton,
  DropdownMenu,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  
  // Feedback Components
  Alert,
  AlertDescription,
  AlertTitle,
  Banner,
  
  // Theme Components
  ThemeSwitcher,
} as const; 