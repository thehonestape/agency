import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/button';

const meta = {
  title: 'Agency/UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Project Brief</CardTitle>
        <CardDescription>Details about the current project</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This project requires a complete brand redesign with a focus on modern typography and vibrant colors that reflect the company's values.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button variant="brand" size="sm">Continue</Button>
      </CardFooter>
    </Card>
  ),
};

export const Marketing: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Marketing Strategy</CardTitle>
        <CardDescription>Q3 2023 Campaign</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>Key metrics:</p>
          <ul className="list-disc pl-5">
            <li>Engagement rate: 4.6%</li>
            <li>Conversion rate: 2.3%</li>
            <li>ROI: 320%</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">View Full Report</Button>
      </CardFooter>
    </Card>
  ),
};

export const TeamMember: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-full bg-gradient-to-br from-blue-500 to-purple-600" />
        </div>
        <CardTitle>Sarah Johnson</CardTitle>
        <CardDescription>Senior Project Manager</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm">Expert in leading complex branding projects with 8+ years of experience in creative industries.</p>
      </CardContent>
      <CardFooter className="flex justify-center gap-2">
        <Button variant="ghost" size="sm">Message</Button>
        <Button variant="outline" size="sm">View Profile</Button>
      </CardFooter>
    </Card>
  ),
};

export const ProjectCard: Story = {
  render: () => (
    <Card className="w-[350px] overflow-hidden">
      <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
      <CardHeader>
        <CardTitle>Ecosystem Rebrand</CardTitle>
        <CardDescription>Client: TechVision Inc.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">In Progress</span>
          <span>Deadline: May 15, 2023</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="link" size="sm">Team (4)</Button>
        <Button variant="outline" size="sm">View</Button>
      </CardFooter>
    </Card>
  ),
}; 