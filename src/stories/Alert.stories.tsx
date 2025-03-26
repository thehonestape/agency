import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';
import { 
  CheckCircle, 
  Info as InfoIcon, 
  AlertTriangle, 
  AlertCircle, 
  Bell
} from 'lucide-react';

const meta = {
  title: 'Agency/UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert className="w-[450px]">
      <AlertTitle>Default Alert</AlertTitle>
      <AlertDescription>This is a default alert message.</AlertDescription>
    </Alert>
  ),
};

export const Primary: Story = {
  render: () => (
    <Alert variant="primary" className="w-[450px]">
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Primary Alert</AlertTitle>
      <AlertDescription>This is a primary alert with an icon.</AlertDescription>
    </Alert>
  ),
};

export const Success: Story = {
  render: () => (
    <Alert variant="success" className="w-[450px]">
      <CheckCircle className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>Your brand assets have been successfully uploaded.</AlertDescription>
    </Alert>
  ),
};

export const Warning: Story = {
  render: () => (
    <Alert variant="warning" className="w-[450px]">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>Your subscription will expire in 7 days. Please renew to maintain access.</AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-[450px]">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>There was an error processing your request. Please try again.</AlertDescription>
    </Alert>
  ),
};

export const Information: Story = {
  render: () => (
    <Alert variant="info" className="w-[450px]">
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>A new version of the design system is available. Review the changes in the documentation.</AlertDescription>
    </Alert>
  ),
};

export const Muted: Story = {
  render: () => (
    <Alert variant="muted" className="w-[450px]">
      <Bell className="h-4 w-4" />
      <AlertTitle>Reminder</AlertTitle>
      <AlertDescription>You have a team meeting scheduled in 15 minutes.</AlertDescription>
    </Alert>
  ),
};

export const AlertGroup: Story = {
  render: () => (
    <div className="space-y-4 w-[450px]">
      <Alert variant="default">
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>This is a default alert message.</AlertDescription>
      </Alert>
      
      <Alert variant="primary">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Primary Alert</AlertTitle>
        <AlertDescription>This is a primary alert with an icon.</AlertDescription>
      </Alert>
      
      <Alert variant="success">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your brand assets have been successfully uploaded.</AlertDescription>
      </Alert>
      
      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Your subscription will expire in 7 days.</AlertDescription>
      </Alert>
      
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>There was an error processing your request.</AlertDescription>
      </Alert>
      
      <Alert variant="info">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>A new version of the design system is available.</AlertDescription>
      </Alert>
      
      <Alert variant="muted">
        <Bell className="h-4 w-4" />
        <AlertTitle>Reminder</AlertTitle>
        <AlertDescription>You have a team meeting scheduled in 15 minutes.</AlertDescription>
      </Alert>
    </div>
  ),
}; 