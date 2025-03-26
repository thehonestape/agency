import React from 'react';
import { Container, composeComponents, createGridLayout, createFlexLayout, ComponentRenderer } from '../../component-system';
import { Card } from '../../component-system';
import type { ComponentDescriptor, LayoutDescriptor } from '../../lib/composition/types';

const DemoPage = () => {
  // Create a flexible grid layout
  const gridLayout: LayoutDescriptor = {
    type: 'grid',
    columns: 2,
    gap: '2rem',
    responsive: {
      sm: {
        columns: 1,
        gap: '1rem'
      },
      md: {
        columns: 2,
        gap: '2rem'
      }
    }
  };

  // Create a flexible flex layout
  const flexLayout: LayoutDescriptor = {
    type: 'flex',
    flow: 'row',
    gap: '2rem',
    responsive: {
      sm: {
        flow: 'column',
        gap: '1rem'
      },
      md: {
        flow: 'row',
        gap: '2rem'
      }
    }
  };

  // Example content components
  const leftContent: ComponentDescriptor = {
    type: 'pattern',
    name: 'LeftContent',
    tag: 'div',
    children: [
      {
        type: 'primitive',
        name: 'Card',
        tag: 'div',
        children: [
          {
            type: 'primitive',
            name: 'Heading',
            tag: 'h2',
            children: 'Left Content'
          },
          {
            type: 'primitive',
            name: 'Paragraph',
            tag: 'p',
            children: 'This is a flexible content area that can adapt to different layouts.'
          }
        ]
      }
    ]
  };

  const rightContent: ComponentDescriptor = {
    type: 'pattern',
    name: 'RightContent',
    tag: 'div',
    children: [
      {
        type: 'primitive',
        name: 'Card',
        tag: 'div',
        children: [
          {
            type: 'primitive',
            name: 'Heading',
            tag: 'h2',
            children: 'Right Content'
          },
          {
            type: 'primitive',
            name: 'Paragraph',
            tag: 'p',
            children: 'This content area can be arranged in different ways based on the layout.'
          }
        ]
      }
    ]
  };

  // Compose the layouts
  const gridComposition = composeComponents(
    [leftContent, rightContent],
    gridLayout
  );

  const flexComposition = composeComponents(
    [leftContent, rightContent],
    flexLayout
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Container size="xl" className="py-12">
        <h1 className="text-4xl font-bold mb-8">Demo Page</h1>
        
        {/* Main Content Area */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Main Content</h2>
          <ComponentRenderer component={gridComposition} />
        </section>

        {/* Secondary Content Area */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Secondary Content</h2>
          <ComponentRenderer component={flexComposition} />
        </section>

        {/* Dynamic Content Area */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Dynamic Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <h3>Dynamic Item {i}</h3>
                <p>This layout automatically adjusts based on content and screen size.</p>
              </Card>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default DemoPage; 