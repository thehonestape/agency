import * as React from "react";
import { Eyebrow } from "../ui/typography/eyebrow";
import { Heading } from "../ui/typography/heading";
import { Text } from "../ui/typography/text";
import { Button } from "../ui/button";
import { VStack, HStack } from "../ui/stack";
import { Icon } from "../ui/icon"; // Assuming you have an Icon component

export function TypographyStackExample() {
  return (
    <div className="p-8 bg-background rounded-lg">
      <VStack spacing={8}>
        {/* Simple text stack */}
        <VStack spacing={4} align="start">
          <Eyebrow>PRODUCT FEATURE</Eyebrow>
          <Heading variant="title">Main Product Title</Heading>
          <Text variant="body">
            Detailed product description that explains the features and benefits
            of the product. This text provides context and helps the user understand
            the value proposition.
          </Text>
          <Button size="md">Learn More</Button>
        </VStack>
        
        {/* Feature cards using HStack */}
        <VStack spacing={6}>
          <Heading variant="heading">Key Features</Heading>
          
          <HStack spacing={6} wrap className="w-full">
            {/* Feature 1 */}
            <div className="flex-1 min-w-[250px]">
              <VStack spacing={3} className="p-6 bg-card rounded-md shadow-sm">
                <div className="p-2 bg-primary/10 rounded-md w-fit">
                  <Icon name="star" className="text-primary h-6 w-6" />
                </div>
                <Heading variant="subheading">Feature One</Heading>
                <Text>Description of the first feature and its benefits.</Text>
              </VStack>
            </div>
            
            {/* Feature 2 */}
            <div className="flex-1 min-w-[250px]">
              <VStack spacing={3} className="p-6 bg-card rounded-md shadow-sm">
                <div className="p-2 bg-primary/10 rounded-md w-fit">
                  <Icon name="zap" className="text-primary h-6 w-6" />
                </div>
                <Heading variant="subheading">Feature Two</Heading>
                <Text>Description of the second feature and its benefits.</Text>
              </VStack>
            </div>
            
            {/* Feature 3 */}
            <div className="flex-1 min-w-[250px]">
              <VStack spacing={3} className="p-6 bg-card rounded-md shadow-sm">
                <div className="p-2 bg-primary/10 rounded-md w-fit">
                  <Icon name="shield" className="text-primary h-6 w-6" />
                </div>
                <Heading variant="subheading">Feature Three</Heading>
                <Text>Description of the third feature and its benefits.</Text>
              </VStack>
            </div>
          </HStack>
        </VStack>
        
        {/* Call to action section */}
        <VStack spacing={4} align="center" className="py-6">
          <Heading variant="heading" align="center">Ready to Get Started?</Heading>
          <Text align="center" className="max-w-lg">
            Join thousands of users who are already benefiting from our product.
            Sign up today and experience the difference.
          </Text>
          <HStack spacing={4}>
            <Button size="lg" variant="default">Sign Up</Button>
            <Button size="lg" variant="outline">Learn More</Button>
          </HStack>
        </VStack>
      </VStack>
    </div>
  );
}
