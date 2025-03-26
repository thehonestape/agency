import React, { useEffect, useState } from 'react';
import { BrandMemory, BrandEvent, AIBrandInsight } from '@/types/brandMemory.types';
import { brandMemoryService } from '@/services/brandMemoryService';
import { createSampleWorkhorseMemory } from '@/services/brandMemoryService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface BrandMemoryViewProps {
  brandId: string;
}

export const BrandMemoryView: React.FC<BrandMemoryViewProps> = ({ brandId }) => {
  const [brandMemory, setBrandMemory] = useState<BrandMemory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrandMemory = async () => {
      try {
        let memory;
        if (brandId === 'workhorse') {
          memory = await createSampleWorkhorseMemory();
        } else {
          memory = await brandMemoryService.getBrandMemory(brandId);
          if (!memory) {
            memory = await brandMemoryService.createBrandMemory(brandId, {});
          }
        }
        setBrandMemory(memory);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch brand memory');
      } finally {
        setLoading(false);
      }
    };

    fetchBrandMemory();
  }, [brandId]);

  if (loading) {
    return <div>Loading brand memory...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!brandMemory) {
    return <div>No brand memory found</div>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Brand Memory</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="history">
            <TabsList>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="values">Values</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="visual">Visual Identity</TabsTrigger>
            </TabsList>

            <TabsContent value="history">
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {brandMemory.history.map((event: BrandEvent) => (
                    <Card key={event.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{event.description}</h4>
                            <p className="text-sm text-muted-foreground">
                              {format(event.timestamp || new Date(), 'PPpp')}
                            </p>
                          </div>
                          <Badge variant="outline">{event.type}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="values">
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {brandMemory.values.map((value) => (
                    <Card key={value.key}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{value.key}</h4>
                            <p className="text-sm text-muted-foreground">{value.value}</p>
                          </div>
                          <Badge variant="outline">{value.source}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="insights">
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {brandMemory.insights.map((insight: AIBrandInsight) => (
                    <Card key={insight.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{insight.title}</h4>
                            <p className="text-sm text-muted-foreground">{insight.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Expires: {format(insight.expiresAt || new Date(), 'PP')}
                            </p>
                          </div>
                          <Badge variant="outline">{insight.type}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="visual">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Color Palette</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {Object.entries(brandMemory.visualIdentity.colorPalette).map(([key, value]) => (
                      <div key={key}>
                        <h4 className="text-sm font-medium mb-1">{key}</h4>
                        <div className="space-y-2">
                          {Array.isArray(value) ? (
                            value.map((color, index) => (
                              <div
                                key={index}
                                className="h-8 rounded"
                                style={{ backgroundColor: color }}
                              />
                            ))
                          ) : (
                            <div
                              className="h-8 rounded"
                              style={{ backgroundColor: value }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Typography</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Fonts</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(brandMemory.visualIdentity.typography.fonts).map(([key, value]) => (
                          <div key={key}>
                            <p className="text-sm text-muted-foreground">{key}</p>
                            <p className="font-medium">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Assets</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {brandMemory.visualIdentity.assets.map((asset) => (
                      <Card key={asset.id}>
                        <CardContent className="pt-6">
                          <div className="aspect-square relative">
                            <img
                              src={asset.url}
                              alt={asset.name}
                              className="object-contain w-full h-full"
                            />
                          </div>
                          <p className="text-sm font-medium mt-2">{asset.name}</p>
                          <Badge variant="outline" className="mt-1">
                            {asset.type}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}; 