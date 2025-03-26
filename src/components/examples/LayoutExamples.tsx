import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui';

// Import layout examples
import { 
  LightNavWithBottomBorder,
  LightNavOnGrayBackground,
  SimpleStackedWithPageHeader,
  StackedWithBreadcrumbs,
  StackedWithTabs,
  StackedWithShadowedCards,
  DarkNavWithWhitePageHeader,
} from '@/components/layouts/application/stacked';

import {
  LightSidebarWithHeader,
  DarkSidebarWithHeader,
  BrandSidebarWithHeader,
} from '@/components/layouts/application/sidebar';

import {
  FullWidthSecondaryColumnOnRight,
  FullWidthThreeColumn,
} from '@/components/layouts/application/multi-column';

const LAYOUT_IFRAME_HEIGHT = 500;

export function LayoutExamples() {
  const [activeCategory, setActiveCategory] = useState('stacked');
  
  return (
    <div className="w-full mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Layout Components</CardTitle>
          <CardDescription>
            Explore different layout patterns for your application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="stacked" onValueChange={setActiveCategory}>
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="stacked">Stacked Layouts</TabsTrigger>
              <TabsTrigger value="sidebar">Sidebar Layouts</TabsTrigger>
              <TabsTrigger value="multi-column">Multi-Column Layouts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="stacked" className="pt-6">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-3">Light Nav With Bottom Border</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <iframe 
                      srcDoc={`
                        <style>
                          body { margin: 0; font-family: system-ui, sans-serif; }
                          * { box-sizing: border-box; }
                        </style>
                        <div id="root"></div>
                        <script>
                          const root = document.getElementById('root');
                          root.innerHTML = \`${LightNavWithBottomBorder()}\`;
                        </script>
                      `}
                      width="100%"
                      height={LAYOUT_IFRAME_HEIGHT}
                      frameBorder="0"
                      title="Light Nav With Bottom Border"
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Light Nav On Gray Background</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <iframe 
                      srcDoc={`
                        <style>
                          body { margin: 0; font-family: system-ui, sans-serif; }
                          * { box-sizing: border-box; }
                        </style>
                        <div id="root"></div>
                        <script>
                          const root = document.getElementById('root');
                          root.innerHTML = \`${LightNavOnGrayBackground()}\`;
                        </script>
                      `}
                      width="100%"
                      height={LAYOUT_IFRAME_HEIGHT}
                      frameBorder="0"
                      title="Light Nav On Gray Background"
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Simple Stacked With Page Header</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <iframe 
                      srcDoc={`
                        <style>
                          body { margin: 0; font-family: system-ui, sans-serif; }
                          * { box-sizing: border-box; }
                        </style>
                        <div id="root"></div>
                        <script>
                          const root = document.getElementById('root');
                          root.innerHTML = \`${SimpleStackedWithPageHeader()}\`;
                        </script>
                      `}
                      width="100%"
                      height={LAYOUT_IFRAME_HEIGHT}
                      frameBorder="0"
                      title="Simple Stacked With Page Header"
                    />
                  </div>
                </div>
                
                {/* More stacked layouts can be added here */}
              </div>
            </TabsContent>
            
            <TabsContent value="sidebar" className="pt-6">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-3">Light Sidebar With Header</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <iframe 
                      srcDoc={`
                        <style>
                          body { margin: 0; font-family: system-ui, sans-serif; }
                          * { box-sizing: border-box; }
                        </style>
                        <div id="root"></div>
                        <script>
                          const root = document.getElementById('root');
                          root.innerHTML = \`${LightSidebarWithHeader()}\`;
                        </script>
                      `}
                      width="100%"
                      height={LAYOUT_IFRAME_HEIGHT}
                      frameBorder="0"
                      title="Light Sidebar With Header"
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Dark Sidebar With Header</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <iframe 
                      srcDoc={`
                        <style>
                          body { margin: 0; font-family: system-ui, sans-serif; }
                          * { box-sizing: border-box; }
                        </style>
                        <div id="root"></div>
                        <script>
                          const root = document.getElementById('root');
                          root.innerHTML = \`${DarkSidebarWithHeader()}\`;
                        </script>
                      `}
                      width="100%"
                      height={LAYOUT_IFRAME_HEIGHT}
                      frameBorder="0"
                      title="Dark Sidebar With Header"
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Brand Sidebar With Header</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <iframe 
                      srcDoc={`
                        <style>
                          body { margin: 0; font-family: system-ui, sans-serif; }
                          * { box-sizing: border-box; }
                        </style>
                        <div id="root"></div>
                        <script>
                          const root = document.getElementById('root');
                          root.innerHTML = \`${BrandSidebarWithHeader({
                            children: "<div class='p-4'>Page content goes here</div>"
                          })}\`;
                        </script>
                      `}
                      width="100%"
                      height={LAYOUT_IFRAME_HEIGHT}
                      frameBorder="0"
                      title="Brand Sidebar With Header"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="multi-column" className="pt-6">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-3">Full Width Secondary Column On Right</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <iframe 
                      srcDoc={`
                        <style>
                          body { margin: 0; font-family: system-ui, sans-serif; }
                          * { box-sizing: border-box; }
                        </style>
                        <div id="root"></div>
                        <script>
                          const root = document.getElementById('root');
                          root.innerHTML = \`${FullWidthSecondaryColumnOnRight({
                            renderMainContent: () => "<div class='p-4'>Main content</div>",
                            renderSecondaryContent: () => "<div class='p-4'>Secondary content</div>"
                          })}\`;
                        </script>
                      `}
                      width="100%"
                      height={LAYOUT_IFRAME_HEIGHT}
                      frameBorder="0"
                      title="Full Width Secondary Column On Right"
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Full Width Three Column</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <iframe 
                      srcDoc={`
                        <style>
                          body { margin: 0; font-family: system-ui, sans-serif; }
                          * { box-sizing: border-box; }
                        </style>
                        <div id="root"></div>
                        <script>
                          const root = document.getElementById('root');
                          root.innerHTML = \`${FullWidthThreeColumn({
                            renderMiddleContent: () => "<div class='p-4'>Middle content</div>",
                            renderSidebarContent: () => "<div class='p-4'>Sidebar content</div>",
                            renderRightContent: () => "<div class='p-4'>Right content</div>"
                          })}\`;
                        </script>
                      `}
                      width="100%"
                      height={LAYOUT_IFRAME_HEIGHT}
                      frameBorder="0"
                      title="Full Width Three Column"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="bg-muted p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          Note: These layout examples are rendered in iframes to demonstrate the structure. In a real application, you would import these layout components and wrap your content with them.
        </p>
      </div>
    </div>
  );
}

export default LayoutExamples; 