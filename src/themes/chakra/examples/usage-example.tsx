/**
 * Example usage of our Chakra-inspired components
 * This demonstrates how to use the style props and responsive features
 */

import React from 'react';
import Box from './Box';
import Flex from './Flex';
import Grid, { GridItem } from './Grid';
import Typography from './Typography';
import Button from './Button';
import Card from './Card';
import FormControl from './FormControl';
import { extendTheme } from '../theme-extension';
import { useTheme } from '../../providers/ThemeProvider';

/**
 * Example component showing how to use the Chakra-inspired components
 */
export const ChakraExample: React.FC = () => {
  // Get current theme
  const { theme } = useTheme();
  
  return (
    <Box p="lg" maxW="1200px" mx="auto">
      <Box 
        as="h1" 
        fontSize="2xl" 
        fontWeight="bold" 
        mb="md"
        color="primary"
      >
        Chakra-Inspired Components
      </Box>
      
      {/* Simple Box with responsive props */}
      <Box 
        p={{ base: 'md', md: 'lg' }}
        mb="xl"
        bg="muted"
        borderRadius="md"
        boxShadow="md"
      >
        <Box as="h2" fontSize="xl" mb="sm">Style Props Example</Box>
        <Box>
          This Box uses style props for padding, margin, background, border radius, and shadow.
          The padding responsively changes based on viewport size.
        </Box>
      </Box>
      
      {/* Typography components example */}
      <Box mb="xl">
        <Typography.Heading as="h2" size="xl" mb="md">Typography Components</Typography.Heading>
        <Typography.Text mb="md" fontSize="md" color="gray.700">
          This is the Text component which supports font size, color, and other typography props.
        </Typography.Text>
        <Typography.Heading as="h3" size="md" mb="sm">This is a Heading component</Typography.Heading>
        <Typography.Link href="#" mb="md">This is a Link component</Typography.Link>
      </Box>
      
      {/* Form components example */}
      <Box mb="xl">
        <Typography.Heading as="h2" size="xl" mb="md">Form Components</Typography.Heading>
        <Box maxW="md" mb="lg">
          <FormControl.FormControl
            id="email"
            label="Email Address"
            helperText="We'll never share your email with anyone."
            isRequired
            mb="md"
          >
            <FormControl.Input placeholder="Enter your email" />
          </FormControl.FormControl>
          
          <FormControl.FormControl
            id="password"
            label="Password"
            helperText="Must be at least 8 characters."
            mb="md"
          >
            <FormControl.Input type="password" placeholder="Enter your password" />
          </FormControl.FormControl>
          
          <FormControl.FormControl
            id="bio"
            label="Bio"
            isInvalid
            errorText="Bio is required."
            mb="md"
          >
            <FormControl.Input placeholder="Tell us about yourself" />
          </FormControl.FormControl>
          
          <FormControl.FormControl
            id="disabled"
            label="Disabled Input"
            isDisabled
            mb="md"
          >
            <FormControl.Input placeholder="This is disabled" value="Disabled value" />
          </FormControl.FormControl>
          
          <Flex gap="md">
            <Button type="submit" colorScheme="primary">Submit Form</Button>
            <Button variant="outline">Cancel</Button>
          </Flex>
        </Box>
      </Box>
      
      {/* Button components example */}
      <Box mb="xl">
        <Typography.Heading as="h2" size="xl" mb="md">Button Component</Typography.Heading>
        <Flex gap="md" mb="md" direction={{ base: 'column', sm: 'row' }}>
          <Button variant="solid" colorScheme="primary">Solid Button</Button>
          <Button variant="outline" colorScheme="secondary">Outline Button</Button>
          <Button variant="ghost" colorScheme="accent">Ghost Button</Button>
          <Button variant="link" colorScheme="primary">Link Button</Button>
        </Flex>
        <Flex gap="md" mb="md">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Flex>
        <Flex gap="md" mb="md">
          <Button leftIcon={<span>👍</span>}>With Left Icon</Button>
          <Button rightIcon={<span>👉</span>}>With Right Icon</Button>
          <Button isLoading loadingText="Loading...">Loading Button</Button>
          <Button isDisabled>Disabled Button</Button>
        </Flex>
      </Box>
      
      {/* Card component example */}
      <Box mb="xl">
        <Typography.Heading as="h2" size="xl" mb="md">Card Component</Typography.Heading>
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap="md"
        >
          <Card.Card variant="elevated">
            <Card.CardHeader>
              <Typography.Heading size="md">Elevated Card</Typography.Heading>
            </Card.CardHeader>
            <Card.CardBody>
              <Typography.Text>Card with shadow elevation</Typography.Text>
            </Card.CardBody>
            <Card.CardFooter>
              <Button size="sm">Action</Button>
            </Card.CardFooter>
          </Card.Card>
          
          <Card.Card variant="outline">
            <Card.CardHeader>
              <Typography.Heading size="md">Outline Card</Typography.Heading>
            </Card.CardHeader>
            <Card.CardBody>
              <Typography.Text>Card with border outline</Typography.Text>
            </Card.CardBody>
            <Card.CardFooter>
              <Button size="sm" variant="outline">Action</Button>
            </Card.CardFooter>
          </Card.Card>
          
          <Card.Card variant="filled">
            <Card.CardHeader>
              <Typography.Heading size="md">Filled Card</Typography.Heading>
            </Card.CardHeader>
            <Card.CardBody>
              <Typography.Text>Card with background fill</Typography.Text>
            </Card.CardBody>
            <Card.CardFooter>
              <Button size="sm" variant="ghost">Action</Button>
            </Card.CardFooter>
          </Card.Card>
          
          <Card.Card variant="unstyled">
            <Card.CardHeader>
              <Typography.Heading size="md">Unstyled Card</Typography.Heading>
            </Card.CardHeader>
            <Card.CardBody>
              <Typography.Text>Card with no styling</Typography.Text>
            </Card.CardBody>
            <Card.CardFooter>
              <Button size="sm" variant="link">Action</Button>
            </Card.CardFooter>
          </Card.Card>
        </Grid>
      </Box>
      
      {/* Flex layout example */}
      <Flex 
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
        gap="md"
        mb="xl"
      >
        <Box 
          p="md" 
          bg="secondary" 
          color="white" 
          borderRadius="md" 
          flexBasis={{ md: '30%' }}
        >
          Flex Item 1
        </Box>
        <Box 
          p="md" 
          bg="accent" 
          color="white" 
          borderRadius="md"
          flexBasis={{ md: '30%' }}
        >
          Flex Item 2
        </Box>
        <Box 
          p="md" 
          bg="primary" 
          color="white" 
          borderRadius="md"
          flexBasis={{ md: '30%' }}
        >
          Flex Item 3
        </Box>
      </Flex>
      
      {/* Grid layout example */}
      <Box mb="xl">
        <Box as="h2" fontSize="xl" mb="sm">Grid Layout Example</Box>
        <Grid
          templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap="md"
        >
          <GridItem p="md" bg="muted" borderRadius="md">Grid Item 1</GridItem>
          <GridItem p="md" bg="muted" borderRadius="md">Grid Item 2</GridItem>
          <GridItem p="md" bg="muted" borderRadius="md">Grid Item 3</GridItem>
          <GridItem p="md" bg="muted" borderRadius="md">Grid Item 4</GridItem>
        </Grid>
      </Box>
      
      {/* Theme extension example */}
      <Box mb="xl">
        <Box as="h2" fontSize="xl" mb="sm">Theme Extension Example</Box>
        <Box>
          Current theme: <strong>{theme.name}</strong>
        </Box>
        <Box mt="sm">
          You can extend the theme with:
          <Box as="pre" p="md" bg="muted" borderRadius="md" mt="sm" fontSize="sm" fontFamily="mono">
            {`const extendedTheme = extendTheme(theme, {
  colors: {
    brand: '#ff0000',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'primary',
          color: 'white',
        },
        outline: {
          border: '1px solid',
          borderColor: 'primary',
        },
      },
    },
  },
});`}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChakraExample; 