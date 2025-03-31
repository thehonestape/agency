import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/button';
import { ThemeSwitcher } from '../components/ui/theme-switcher';
import { Box, Container, Flex, Grid, Stack } from '../components/ui/layout';
import { Heading, Text } from '../components/ui/typography';

const HomePage = () => {
  return (
    <Box className="min-h-screen bg-background">
      <Box className="sticky top-0 z-40 border-b bg-background">
        <Container>
          <Flex className="h-16 items-center justify-between">
            <Flex className="items-center gap-2">
              <Heading className="text-xl font-bold">Semantic UI</Heading>
            </Flex>
            <Flex className="items-center gap-4">
              <Box className="hidden md:flex items-center space-x-4">
                <Link to="/" className="text-sm font-medium hover:text-primary">Home</Link>
                <Link to="/semantic-system" className="text-sm font-medium hover:text-primary">Components</Link>
                <Link to="/demo" className="text-sm font-medium hover:text-primary">Demo</Link>
                <Link to="/theme-editor" className="text-sm font-medium hover:text-primary">Theme</Link>
              </Box>
              <ThemeSwitcher />
            </Flex>
          </Flex>
        </Container>
      </Box>
      
      <Box className="py-8">
        <Container>
          <Stack className="gap-4 text-center mb-12">
            <Heading className="text-4xl font-bold tracking-tight">Semantic Component System</Heading>
            <Text className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A modern, accessible, and themeable component system built with React and Tailwind CSS.
            </Text>
          </Stack>
          
          <Grid className="grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Component Library</CardTitle>
                <CardDescription>
                  Explore our collection of semantic UI components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Text className="text-sm text-muted-foreground">
                  Browse through our comprehensive set of components, from basic primitives to complex patterns.
                  Each component is built with accessibility and theming in mind.
                </Text>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/semantic-system">View Components</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Theme System</CardTitle>
                <CardDescription>
                  Customize and manage your design system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Text className="text-sm text-muted-foreground">
                  Create and manage themes with our HSL-based color system. Preview and switch between themes
                  in real-time.
                </Text>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/theme-editor">Theme Editor</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Interactive Demo</CardTitle>
                <CardDescription>
                  See components in action
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Text className="text-sm text-muted-foreground">
                  Experience our component system through interactive examples and live demos.
                  Test different variants and see how components adapt to different themes.
                </Text>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/demo">View Demo</Link>
                </Button>
              </CardFooter>
            </Card>
          </Grid>
        </Container>
      </Box>
      
      <Box className="border-t bg-background">
        <Container>
          <Box className="py-6 text-center text-sm text-muted-foreground">
            <Text>© {new Date().getFullYear()} Semantic UI. All rights reserved.</Text>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 