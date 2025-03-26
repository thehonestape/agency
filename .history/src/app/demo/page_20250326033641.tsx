import React from 'react';
import { Container, composeComponents, createGridLayout, createFlexLayout } from '../../component-system';
import { Card } from '../../component-system';

const DemoPage = () => {
  // Create a flexible grid layout
  const gridLayout = createGridLayout({
    template: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    responsive: {
      sm: {
        template: '1fr',
        gap: '1rem'
      },
      md: {
        template: 'repeat(2, 1fr)',
        gap: '2rem'
      }
    }
  });

  // Create a flexible flex layout
  const flexLayout = createFlexLayout('row', '2rem', {
    wrap: true,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    responsive: {
      sm: {
        direction: 'column',
        gap: '1rem'
      },
      md: {
        direction: 'row',
        gap: '2rem'
      }
    }
  });

  // Example content components
  const leftContent = {
    type: 'pattern',
    name: 'LeftContent',
    tag: 'div',
    children: (
      <Card>
        <h2>Left Content</h2>
        <p>This is a flexible content area that can adapt to different layouts.</p>
      </Card>
    )
  };

  const rightContent = {
    type: 'pattern',
    name: 'RightContent',
    tag: 'div',
    children: (
      <Card>
        <h2>Right Content</h2>
        <p>This content area can be arranged in different ways based on the layout.</p>
      </Card>
    )
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
        
        {/* Grid Layout Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Grid Layout</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <h3>Grid Item 1</h3>
              <p>This content uses a grid layout that adapts to screen size.</p>
            </Card>
            <Card>
              <h3>Grid Item 2</h3>
              <p>The grid automatically adjusts based on available space.</p>
            </Card>
          </div>
        </section>

        {/* Flex Layout Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Flex Layout</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <Card>
              <h3>Flex Item 1</h3>
              <p>This content uses a flex layout that changes direction on mobile.</p>
            </Card>
            <Card>
              <h3>Flex Item 2</h3>
              <p>The flex layout provides flexible spacing and alignment.</p>
            </Card>
          </div>
        </section>

        {/* Dynamic Layout Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Dynamic Layout</h2>
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