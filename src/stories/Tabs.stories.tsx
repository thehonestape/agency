import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Card, CardContent } from '../components/ui/Card';

const meta = {
  title: 'Agency/UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[450px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardContent className="pt-6">
            <p>This is the account tab content.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardContent className="pt-6">
            <p>Change your password here.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const ProjectTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[600px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="assets">Assets</TabsTrigger>
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="text-lg font-medium">Project Overview</h3>
            <p>A complete brand redesign for TechVision Inc., focusing on modern aesthetics and digital-first approach.</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                <p>In Progress</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Deadline</h4>
                <p>May 15, 2023</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Budget</h4>
                <p>$12,500</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Team Size</h4>
                <p>4 members</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="assets">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium">Project Assets</h3>
            <p className="my-2">Manage your project assets here.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Logo Package (4 files)</li>
              <li>Brand Guidelines (PDF)</li>
              <li>Color Palette</li>
              <li>Typography Samples</li>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="timeline">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium">Project Timeline</h3>
            <p className="my-2">View and manage your project timeline.</p>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">Discovery Phase</h4>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
                <p className="text-sm">Mar 1 - Mar 15</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">Design Phase</h4>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
                <p className="text-sm">Mar 16 - Apr 30</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">Implementation</h4>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                </div>
                <p className="text-sm">May 1 - May 15</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="team">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium">Project Team</h3>
            <p className="my-2">Manage your project team members.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">SJ</div>
                <div>
                  <h4 className="font-medium">Sarah Johnson</h4>
                  <p className="text-sm text-muted-foreground">Project Manager</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white">MR</div>
                <div>
                  <h4 className="font-medium">Michael Reynolds</h4>
                  <p className="text-sm text-muted-foreground">Brand Designer</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center text-white">AK</div>
                <div>
                  <h4 className="font-medium">Anna Kim</h4>
                  <p className="text-sm text-muted-foreground">UI/UX Designer</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white">JD</div>
                <div>
                  <h4 className="font-medium">Jason Davis</h4>
                  <p className="text-sm text-muted-foreground">Content Strategist</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
}; 