import React from 'react';
import { 
  Box, 
  Center, 
  Container, 
  Flex, 
  Grid, 
  GridItem, 
  Stack, 
  HStack 
} from '@/components/ui/layout';
import { 
  Text, 
  Heading, 
  Code, 
  Kbd 
} from '@/components/ui/typography';
import { 
  Button,
  Input,
  Textarea,
  Label,
  Badge,
  Alert,
  AlertTitle,
  AlertDescription,
  Banner,
  Avatar,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  ScrollArea,
  ThemeSwitcher
} from '@/components/ui';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/Card';
import { BannerTitle, BannerDescription } from '@/components/ui/banner';
import { AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Helper component to display each component with title and description
const ComponentDisplay = ({ 
  title, 
  description, 
  children 
}: { 
  title: string; 
  description: string; 
  children: React.ReactNode 
}) => (
  <Box className="p-4 mb-8 border border-gray-200 rounded-md">
    <Heading as="h3" className="mb-2 text-lg font-semibold">{title}</Heading>
    <Text className="mb-4 text-gray-600">{description}</Text>
    <Box className="p-4 bg-gray-50 rounded-md">
      {children}
    </Box>
  </Box>
);

// Helper component for section headers
const SectionHeader = ({ title }: { title: string }) => (
  <Heading as="h2" className="my-6 pb-2 text-xl font-bold border-b-2 border-primary">
    {title}
  </Heading>
);

// Main component with proper export
const ComponentGallery: React.FC = () => {
  return (
    <Container className="max-w-7xl py-12">
      <Heading as="h1" className="mb-8 text-4xl font-bold text-center">
        Component Gallery
      </Heading>
      <Text className="mb-8 text-lg text-center mx-auto max-w-3xl">
        This page showcases all available UI components in our design system, organized from the most atomic to larger composite components.
      </Text>

      <SectionHeader title="Layout Primitives" />
      
      <ComponentDisplay 
        title="Box" 
        description="The most basic layout component that renders a div with style props.">
        <Box className="p-4 bg-primary text-white rounded-md">
          Basic Box Component
        </Box>
      </ComponentDisplay>

      <ComponentDisplay 
        title="Center" 
        description="Centers content horizontally and vertically.">
        <Center className="h-24 bg-primary text-white rounded-md">
          Centered Content
        </Center>
      </ComponentDisplay>

      <ComponentDisplay 
        title="Container" 
        description="A responsive container with max-width constraints.">
        <Container className="bg-primary text-white p-4 rounded-md">
          Container Content
        </Container>
      </ComponentDisplay>

      <ComponentDisplay 
        title="Flex" 
        description="Flexbox layout container.">
        <Flex className="gap-4">
          <Box className="p-4 bg-primary text-white rounded-md">Flex Item 1</Box>
          <Box className="p-4 bg-primary text-white rounded-md">Flex Item 2</Box>
          <Box className="p-4 bg-primary text-white rounded-md">Flex Item 3</Box>
        </Flex>
      </ComponentDisplay>

      <ComponentDisplay 
        title="Grid" 
        description="CSS Grid layout container.">
        <Grid className="grid-cols-3 gap-4">
          <GridItem className="p-4 bg-primary text-white rounded-md">Grid Item 1</GridItem>
          <GridItem className="p-4 bg-primary text-white rounded-md">Grid Item 2</GridItem>
          <GridItem className="p-4 bg-primary text-white rounded-md">Grid Item 3</GridItem>
          <GridItem className="p-4 bg-primary text-white rounded-md">Grid Item 4</GridItem>
          <GridItem className="p-4 bg-primary text-white rounded-md">Grid Item 5</GridItem>
          <GridItem className="p-4 bg-primary text-white rounded-md">Grid Item 6</GridItem>
        </Grid>
      </ComponentDisplay>

      <ComponentDisplay 
        title="Stack" 
        description="Vertical or horizontal stack with even spacing.">
        <Stack className="space-y-4">
          <Box className="p-4 bg-primary text-white rounded-md">Stack Item 1</Box>
          <Box className="p-4 bg-primary text-white rounded-md">Stack Item 2</Box>
          <Box className="p-4 bg-primary text-white rounded-md">Stack Item 3</Box>
        </Stack>
      </ComponentDisplay>

      <SectionHeader title="Typography" />

      <ComponentDisplay 
        title="Text" 
        description="Basic text component for paragraphs and spans.">
        <Stack className="space-y-4 items-start">
          <Text>Default text</Text>
          <Text className="text-xs">Extra small text</Text>
          <Text className="text-sm">Small text</Text>
          <Text className="text-base">Medium text</Text>
          <Text className="text-lg">Large text</Text>
          <Text className="text-xl">Extra large text</Text>
          <Text className="font-bold">Bold text</Text>
          <Text className="italic">Italic text</Text>
          <Text className="text-primary">Colored text</Text>
        </Stack>
      </ComponentDisplay>

      <ComponentDisplay 
        title="Heading" 
        description="Heading component for titles and subtitles.">
        <Stack className="space-y-4 items-start">
          <Heading as="h1" className="text-4xl">Heading 1 (4xl)</Heading>
          <Heading as="h2" className="text-3xl">Heading 2 (3xl)</Heading>
          <Heading as="h3" className="text-2xl">Heading 3 (2xl)</Heading>
          <Heading as="h4" className="text-xl">Heading 4 (xl)</Heading>
          <Heading as="h5" className="text-lg">Heading 5 (lg)</Heading>
          <Heading as="h6" className="text-base">Heading 6 (base)</Heading>
        </Stack>
      </ComponentDisplay>

      <ComponentDisplay 
        title="Code" 
        description="Inline and block code display.">
        <Stack className="space-y-4 items-start">
          <Code>console.log('Hello World');</Code>
          <Code className="block p-4">
            {`function example() {\n  return 'Hello World';\n}`}
          </Code>
        </Stack>
      </ComponentDisplay>

      <ComponentDisplay 
        title="Kbd" 
        description="Keyboard input display.">
        <HStack className="space-x-2">
          <Text>Press</Text>
          <Kbd>Ctrl</Kbd>
          <Text>+</Text>
          <Kbd>C</Kbd>
          <Text>to copy</Text>
        </HStack>
      </ComponentDisplay>

      <SectionHeader title="Form Elements" />

      <ComponentDisplay 
        title="Label" 
        description="Form label component.">
        <Label htmlFor="example-input">Example Label</Label>
      </ComponentDisplay>

      <ComponentDisplay 
        title="Input" 
        description="Text input component.">
        <Stack className="space-y-4">
          <Input placeholder="Default input" />
          <Input placeholder="Disabled input" disabled />
          <Input placeholder="Required input" required />
          <Input type="password" placeholder="Password input" />
          <Input type="email" placeholder="Email input" />
        </Stack>
      </ComponentDisplay>

      <ComponentDisplay 
        title="Textarea" 
        description="Multi-line text input.">
        <Textarea placeholder="Enter your message here..." rows={4} />
      </ComponentDisplay>

      <SectionHeader title="Interactive Elements" />

      <ComponentDisplay 
        title="Button" 
        description="Button component with variants.">
        <Stack className="space-y-4 items-start">
          <HStack className="space-x-4">
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </HStack>
          <HStack className="space-x-4">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
          </HStack>
          <HStack className="space-x-4">
            <Button disabled>Disabled</Button>
          </HStack>
        </Stack>
      </ComponentDisplay>

      <ComponentDisplay 
        title="Tabs" 
        description="Tab navigation component.">
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Tab 1 content</TabsContent>
          <TabsContent value="tab2">Tab 2 content</TabsContent>
          <TabsContent value="tab3">Tab 3 content</TabsContent>
        </Tabs>
      </ComponentDisplay>

      <SectionHeader title="Feedback & Display" />

      <ComponentDisplay 
        title="Badge" 
        description="Badge component for status indicators.">
        <HStack className="space-x-4">
          <Badge>Default</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </HStack>
      </ComponentDisplay>

      <ComponentDisplay 
        title="Alert" 
        description="Alert component for important messages.">
        <Stack className="space-y-4">
          <Alert>
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>This is an information alert</AlertDescription>
          </Alert>
          <Alert variant="success">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>This is a success alert</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>This is a warning alert</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>This is an error alert</AlertDescription>
          </Alert>
        </Stack>
      </ComponentDisplay>

      <ComponentDisplay 
        title="Banner" 
        description="Banner notification component.">
        <Banner>
          <BannerTitle>Notification</BannerTitle>
          <BannerDescription>This is a banner notification with important information.</BannerDescription>
        </Banner>
      </ComponentDisplay>

      <ComponentDisplay 
        title="Avatar" 
        description="User avatar component.">
        <HStack className="space-x-4">
          <Avatar>
            <AvatarImage src="https://bit.ly/dan-abramov" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8">
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
          <Avatar className="h-12 w-12">
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
        </HStack>
      </ComponentDisplay>

      <ComponentDisplay 
        title="Card" 
        description="Card container component.">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here</CardDescription>
          </CardHeader>
          <CardContent>
            <Text>This is the content of the card.</Text>
          </CardContent>
          <CardFooter>
            <Button>Action</Button>
          </CardFooter>
        </Card>
      </ComponentDisplay>

      <SectionHeader title="Layout & Navigation" />

      <ComponentDisplay 
        title="ScrollArea" 
        description="Custom scrollable container.">
        <ScrollArea className="h-48 w-full">
          <Box className="p-4">
            <Text>This is scrollable content.</Text>
            {Array.from({ length: 20 }).map((_, i) => (
              <Text key={i} className="my-4">Item {i + 1}</Text>
            ))}
          </Box>
        </ScrollArea>
      </ComponentDisplay>

      <SectionHeader title="Theme" />

      <ComponentDisplay 
        title="ThemeSwitcher" 
        description="Theme toggle component.">
        <ThemeSwitcher />
      </ComponentDisplay>
    </Container>
  );
};

export default ComponentGallery; 