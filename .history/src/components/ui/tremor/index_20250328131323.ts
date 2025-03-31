/**
 * Re-export Tremor components with our theme-compatible wrappers
 */

// Our themed wrappers
export { AreaChart } from './area-chart';
export { DonutChart } from './donut-chart';
export { ProgressBar } from './progress.tsx';
export { TabList } from './tablist';
export { LineChart } from './line-chart';
export { BarChart } from './bar-chart';

// Re-export original Tremor components for convenient access
export {
  Tab,
  TabGroup,
  TabPanel,
  TabPanels,
  Metric,
  Text,
  Title,
  Grid,
  Card,
  Flex,
  // Additional components needed for dashboard
  Button,
  Divider,
  Bold,
  Badge,
  List,
  ListItem,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  // Additional components from ProjectDashboard
  Tracker,
  Subtitle,
  BarList,
  Legend
} from '@tremor/react';

// Re-export types
export type { Color } from '@tremor/react'; 