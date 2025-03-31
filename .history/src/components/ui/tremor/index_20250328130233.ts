/**
 * Re-export Tremor components with our theme-compatible wrappers
 */

// Our themed wrappers
export { AreaChart } from './area-chart';
export { DonutChart } from './donut-chart';
export { ProgressBar } from './progress.tsx';
export { TabList } from './tablist';

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
  BarChart,
  LineChart
} from '@tremor/react'; 