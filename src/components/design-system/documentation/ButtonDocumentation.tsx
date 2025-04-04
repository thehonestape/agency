
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { HStack, VStack } from "@/components/ui/stack";
import { Heading, Text } from "@/components/ui/typography";
import { Eyebrow } from "@/components/ui/typography/eyebrow";

/**
 * ButtonDocumentation component
 * 
 * Comprehensive documentation for the button system following a relational approach
 */
export const ButtonDocumentation = () => {
  return (
    <Card>
      <CardHeader>
        <Eyebrow>Interactive Elements</Eyebrow>
        <CardTitle>Button System</CardTitle>
        <CardDescription>A comprehensive button system with semantic meaning, consistent interaction patterns, and accessibility built-in</CardDescription>
      </CardHeader>
      <CardContent>
        <VStack spacing={8}>
          {/* Philosophy Section */}
          <VStack spacing={4} className="w-full">
            <Heading variant="heading">Philosophy</Heading>
            <Text>
              Our button system is designed around two core principles: semantic meaning and visual style. 
              Buttons communicate their purpose through their appearance, and maintain a consistent 
              relationship with other buttons in the interface.
            </Text>
            <div className="p-4 border rounded-md">
              <VStack spacing={3}>
                <Text>
                  <strong>Semantic Meaning:</strong> Each button variant communicates its purpose and relative 
                  importance in the interface. Primary buttons guide users toward main actions, while secondary 
                  and tertiary buttons provide alternative or supporting actions.
                </Text>
                <Text>
                  <strong>Visual Style:</strong> The visual appearance of buttons is determined by their semantic 
                  role. This ensures that buttons with similar purposes look consistent across the application.
                </Text>
              </VStack>
            </div>
          </VStack>
          
          {/* System Architecture */}
          <VStack spacing={4} className="w-full">
            <Heading variant="heading">System Architecture</Heading>
            <Text>
              The button system is built on a layered architecture that separates semantic meaning from visual styling 
              and behavioral patterns.
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <VStack spacing={3} className="p-4 border rounded-md">
                <Heading variant="subheading">Semantic Layer</Heading>
                <Text className="text-sm">
                  Defines the purpose and importance of buttons within the interface:
                </Text>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Primary actions</li>
                  <li>Secondary actions</li>
                  <li>Tertiary/subtle actions</li>
                  <li>Feedback actions (success, warning, etc.)</li>
                </ul>
              </VStack>
              
              <VStack spacing={3} className="p-4 border rounded-md">
                <Heading variant="subheading">Visual Layer</Heading>
                <Text className="text-sm">
                  Implements the visual appearance based on semantic meaning:
                </Text>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Color and contrast</li>
                  <li>Typography and spacing</li>
                  <li>Shape and borders</li>
                  <li>Visual hierarchy</li>
                </ul>
              </VStack>
              
              <VStack spacing={3} className="p-4 border rounded-md">
                <Heading variant="subheading">Behavioral Layer</Heading>
                <Text className="text-sm">
                  Defines how buttons respond to interaction:
                </Text>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Hover and focus states</li>
                  <li>Active/pressed states</li>
                  <li>Loading states</li>
                  <li>Disabled states</li>
                </ul>
              </VStack>
            </div>
          </VStack>
          
          {/* Semantic Variants */}
          <VStack spacing={4} className="w-full">
            <Heading variant="heading">Semantic Variants</Heading>
            <Text>
              Button variants are organized by their semantic meaning and purpose in the interface.
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <VStack spacing={4} className="p-4 border rounded-md">
                <Heading variant="subheading">Primary Actions</Heading>
                <Text className="text-sm">
                  Used for the main action in a section or flow. There should typically be only one primary 
                  action visible at a time.
                </Text>
                <Button variant="default">Default (Primary)</Button>
                <Button variant="destructive">Destructive</Button>
              </VStack>
              
              <VStack spacing={4} className="p-4 border rounded-md">
                <Heading variant="subheading">Secondary Actions</Heading>
                <Text className="text-sm">
                  Used for alternative or supporting actions that are less important than the primary action.
                </Text>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
              </VStack>
              
              <VStack spacing={4} className="p-4 border rounded-md">
                <Heading variant="subheading">Tertiary/Subtle Actions</Heading>
                <Text className="text-sm">
                  Used for actions that should be visually de-emphasized or for actions in dense UIs.
                </Text>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </VStack>
              
              <VStack spacing={4} className="p-4 border rounded-md">
                <Heading variant="subheading">Contextual Variants</Heading>
                <Text className="text-sm">
                  Variants that communicate specific meanings or feedback.
                </Text>
                <Button variant="ghost" className="text-destructive hover:bg-destructive/10">Ghost Destructive</Button>
                <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">Outline Destructive</Button>
              </VStack>
            </div>
          </VStack>
          
          {/* Size System */}
          <VStack spacing={4} className="w-full">
            <Heading variant="heading">Size System</Heading>
            <Text>
              Button sizes align with our typography system and ensure proper touch targets for different contexts.
            </Text>
            <div className="p-4 border rounded-md">
              <VStack spacing={4}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <VStack spacing={3}>
                    <Heading variant="subheading">Small</Heading>
                    <Text className="text-sm">
                      For compact UIs or secondary actions in dense layouts.
                      Minimum touch target: 32px
                    </Text>
                    <Button size="sm">Small Button</Button>
                  </VStack>
                  
                  <VStack spacing={3}>
                    <Heading variant="subheading">Default</Heading>
                    <Text className="text-sm">
                      Standard size for most interfaces.
                      Minimum touch target: 40px
                    </Text>
                    <Button>Default Button</Button>
                  </VStack>
                  
                  <VStack spacing={3}>
                    <Heading variant="subheading">Large</Heading>
                    <Text className="text-sm">
                      For prominent actions or touch-optimized interfaces.
                      Minimum touch target: 48px
                    </Text>
                    <Button size="lg">Large Button</Button>
                  </VStack>
                </div>
                
                <VStack spacing={3}>
                  <Heading variant="subheading">Icon Buttons</Heading>
                  <Text className="text-sm">
                    Square buttons designed for icon-only actions. Available in all sizes.
                  </Text>
                  <HStack spacing={3}>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </Button>
                    <Button size="icon" variant="outline">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </Button>
                    <Button size="icon" variant="outline" className="h-12 w-12">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </Button>
                  </HStack>
                </VStack>
              </VStack>
            </div>
          </VStack>
          
          {/* States */}
          <VStack spacing={4} className="w-full">
            <Heading variant="heading">Interactive States</Heading>
            <Text>
              Buttons have different states that provide feedback to users during interaction.
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <VStack spacing={3} className="p-4 border rounded-md">
                <Heading variant="subheading">Hover & Focus</Heading>
                <Text className="text-sm">
                  Visual feedback when users hover or focus on a button. This indicates that the button is interactive.
                </Text>
                <div className="flex flex-wrap gap-3">
                  <Button className="hover:bg-primary/90">Hover me</Button>
                  <Button variant="outline" className="focus:ring-2 focus:ring-offset-2 focus:ring-primary">Focus me</Button>
                </div>
              </VStack>
              
              <VStack spacing={3} className="p-4 border rounded-md">
                <Heading variant="subheading">Active/Pressed</Heading>
                <Text className="text-sm">
                  Visual feedback when users press the button. This indicates that the action is being triggered.
                  Our active states combine color changes and a subtle scale transform for clear tactile feedback.
                </Text>
                <div className="flex flex-wrap gap-3">
                  <Button>Press Primary</Button>
                  <Button variant="secondary">Press Secondary</Button>
                  <Button variant="outline">Press Outline</Button>
                  <Button variant="ghost">Press Ghost</Button>
                </div>
                <Text className="text-xs text-muted-foreground mt-2">
                  Try pressing the buttons above to see the active state effect. The buttons will darken and slightly shrink when pressed.
                </Text>
              </VStack>
              
              <VStack spacing={3} className="p-4 border rounded-md">
                <Heading variant="subheading">Loading</Heading>
                <Text className="text-sm">
                  Indicates that the action is in progress. Prevents multiple clicks and provides feedback.
                </Text>
                <div className="flex flex-wrap gap-3">
                  <Button isLoading>Loading</Button>
                  <Button variant="outline" isLoading>Loading</Button>
                </div>
              </VStack>
              
              <VStack spacing={3} className="p-4 border rounded-md">
                <Heading variant="subheading">Disabled</Heading>
                <Text className="text-sm">
                  Indicates that the action is not available. Visually de-emphasized and non-interactive.
                </Text>
                <div className="flex flex-wrap gap-3">
                  <Button disabled>Disabled</Button>
                  <Button variant="outline" disabled>Disabled</Button>
                </div>
              </VStack>
            </div>
          </VStack>
          
          {/* Common Patterns */}
          <VStack spacing={4} className="w-full">
            <Heading variant="heading">Common Patterns</Heading>
            <Text>
              Standard patterns for using buttons in different contexts.
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <VStack spacing={3} className="p-4 border rounded-md">
                <Heading variant="subheading">Form Actions</Heading>
                <div className="p-4 bg-muted/30 rounded-md w-full">
                  <div className="flex justify-end gap-3">
                    <Button variant="outline">Cancel</Button>
                    <Button>Submit</Button>
                  </div>
                </div>
              </VStack>
              
              <VStack spacing={3} className="p-4 border rounded-md">
                <Heading variant="subheading">Dialog Actions</Heading>
                <div className="p-4 bg-muted/30 rounded-md w-full">
                  <div className="flex justify-end gap-3">
                    <Button variant="ghost">Cancel</Button>
                    <Button variant="destructive">Delete</Button>
                  </div>
                </div>
              </VStack>
              
              <VStack spacing={3} className="p-4 border rounded-md">
                <Heading variant="subheading">Button Groups</Heading>
                <div className="p-4 bg-muted/30 rounded-md w-full">
                  <div className="inline-flex rounded-md shadow-sm">
                    <Button className="rounded-r-none">Day</Button>
                    <Button className="rounded-none border-l border-r border-primary/20">Week</Button>
                    <Button className="rounded-l-none">Month</Button>
                  </div>
                </div>
              </VStack>
              
              <VStack spacing={3} className="p-4 border rounded-md">
                <Heading variant="subheading">Icon + Text</Heading>
                <div className="p-4 bg-muted/30 rounded-md w-full">
                  <div className="flex gap-3">
                    <Button>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                      Add Item
                    </Button>
                    <Button variant="outline">
                      Download
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </VStack>
            </div>
          </VStack>
          
          {/* Best Practices */}
          <VStack spacing={4} className="w-full">
            <Heading variant="heading">Best Practices</Heading>
            <Text>
              Guidelines for using buttons effectively in your interfaces.
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <VStack spacing={3} className="p-4 border rounded-md border-success/30 bg-success/5">
                <Heading variant="subheading" className="text-success">Do</Heading>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Use primary buttons for the main action in a section</li>
                  <li>Position primary actions on the right in Western layouts</li>
                  <li>Use clear, concise action verbs for button labels</li>
                  <li>Maintain consistent button styling across the application</li>
                  <li>Ensure buttons have sufficient contrast with their background</li>
                  <li>Use appropriate button sizes for different contexts</li>
                </ul>
              </VStack>
              
              <VStack spacing={3} className="p-4 border rounded-md border-destructive/30 bg-destructive/5">
                <Heading variant="subheading" className="text-destructive">Don't</Heading>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Use multiple primary buttons in a single view</li>
                  <li>Use generic labels like "Click Here" or "Submit"</li>
                  <li>Place destructive actions next to frequently used actions</li>
                  <li>Use buttons when links would be more appropriate</li>
                  <li>Disable buttons without providing a reason</li>
                  <li>Create custom button styles outside the system</li>
                </ul>
              </VStack>
            </div>
          </VStack>
          
          {/* Accessibility */}
          <VStack spacing={4} className="w-full">
            <Heading variant="heading">Accessibility</Heading>
            <Text>
              Our button system is designed with accessibility in mind, ensuring that all users can interact with 
              our interfaces regardless of their abilities or the devices they use.
            </Text>
            <div className="p-4 border rounded-md">
              <VStack spacing={3} className="w-full">
                <ul className="list-disc pl-5 space-y-2 w-full">
                  <li>All buttons have appropriate contrast ratios (WCAG AA compliant)</li>
                  <li>Interactive states are communicated through multiple cues (color, opacity)</li>
                  <li>Buttons include appropriate ARIA attributes when needed</li>
                  <li>Focus states are clearly visible for keyboard navigation</li>
                  <li>Touch targets meet minimum size requirements (44×44px)</li>
                  <li>Loading states communicate status to screen readers</li>
                </ul>
              </VStack>
            </div>
          </VStack>
        </VStack>
      </CardContent>
    </Card>
  );
};

export default ButtonDocumentation;
