import React from 'react';
import {
  Card,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Metric,
  Text,
  Title,
  ProgressBar,
  AreaChart,
  DonutChart
} from '@/components/ui/tremor';
import { cn } from '@/lib/utils';

// Sample data
const chartdata = [
  {
    date: '2023-01-01',
    'New Users': 2000,
    'Active Users': 1800,
  },
  {
    date: '2023-02-01',
    'New Users': 1800,
    'Active Users': 1650,
  },
  {
    date: '2023-03-01',
    'New Users': 2200,
    'Active Users': 1950,
  },
  {
    date: '2023-04-01',
    'New Users': 2800,
    'Active Users': 2500,
  },
  {
    date: '2023-05-01',
    'New Users': 3200,
    'Active Users': 2900,
  },
  {
    date: '2023-06-01',
    'New Users': 3800,
    'Active Users': 3300,
  },
];

const donutData = [
  {
    name: 'Completed',
    value: 35,
  },
  {
    name: 'In Progress',
    value: 45,
  },
  {
    name: 'Not Started',
    value: 20,
  },
];

export function TremorExample() {
  return (
    <div className="p-6 bg-background">
      <h1 className="text-2xl font-bold text-foreground mb-6">Tremor Dashboard Example</h1>
      
      <TabGroup className="mb-8">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Analytics</Tab>
          <Tab>Projects</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card className="p-6">
                <Text>Total Users</Text>
                <Metric>8,644</Metric>
                <div className="mt-4">
                  <Text>7% increase from last month</Text>
                  <ProgressBar value={70} className="mt-2" />
                </div>
              </Card>
              
              <Card className="p-6">
                <Text>Revenue</Text>
                <Metric>$45,232</Metric>
                <div className="mt-4">
                  <Text>12% increase from last month</Text>
                  <ProgressBar value={85} color="success" className="mt-2" />
                </div>
              </Card>
              
              <Card className="p-6">
                <Text>Active Projects</Text>
                <Metric>24</Metric>
                <div className="mt-4">
                  <Text>3 pending approval</Text>
                  <ProgressBar value={42} color="warning" className="mt-2" />
                </div>
              </Card>
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="p-6">
                <Title>User Growth</Title>
                <AreaChart
                  className="h-72 mt-4"
                  data={chartdata}
                  index="date"
                  categories={["New Users", "Active Users"]}
                  valueFormatter={(value) => `${value.toLocaleString()}`}
                />
              </Card>
              
              <Card className="p-6">
                <Title>Project Status</Title>
                <DonutChart
                  className="h-72 mt-4"
                  data={donutData}
                  category="value"
                  index="name"
                  valueFormatter={(value) => `${value}%`}
                  colors={["success", "primary", "warning"]}
                />
              </Card>
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="grid grid-cols-1 gap-6 mt-6">
              <Card className="p-6">
                <Title>Projects</Title>
                <Text className="mt-2">This tab would contain a list of projects.</Text>
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
} 