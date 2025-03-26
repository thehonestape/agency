import React, { useEffect } from "react";
import { DashboardLayout } from "../components/layouts/DashboardLayout";
import { BrandHeading } from "../components/brand/BrandHeading";
import { BrandText } from "../components/brand/BrandText";
import { BrandContainer } from "../components/brand/BrandContainer";
import { BrandGrid } from "../components/brand/BrandGrid";
import { BrandCard, CardContent, CardHeader, CardTitle } from "../components/brand/BrandCard";
import { BrandStyledButton } from "../components/brand/BrandStyledButton";
import { useBrand } from "../components/brand/BrandProvider";
import { FiInfo, FiCalendar, FiLayers, FiUsers, FiSettings, FiFile, FiHelpCircle, FiPlus } from "react-icons/fi";
import { AddBrandInsight } from "../components/brand/AddBrandInsight";
import { 
  useBrandMemory, 
  useBrandMemoryValues, 
  useBrandMemoryHistory, 
  useBrandMemoryInsights, 
  useBrandMemoryVisualIdentity
} from "../components/brand/BrandMemoryProvider";

export function WorkhorseBrandPage() {
  const { setBrandBySlug, currentBrand } = useBrand();
  const { 
    currentBrandMemory: brandMemory, 
    isLoading, 
    error, 
    isInitializing, 
    initializeBrandMemory, 
    refreshBrandMemories, 
    selectBrandMemory 
  } = useBrandMemory();

  // Make sure we're using the workhorse brand memory
  useEffect(() => {
    // Set the current brand in the brand provider
    setBrandBySlug('workhorse');
  }, [setBrandBySlug]);

  // Select the workhorse brand memory once it's available
  useEffect(() => {
    if (!isLoading && currentBrand?.slug === 'workhorse') {
      selectBrandMemory('workhorse');
    }
  }, [isLoading, currentBrand, selectBrandMemory]);

  const handleInitialize = async () => {
    await initializeBrandMemory('workhorse');
  };

  // Add a function to handle adding insights
  const handleInsightAdded = () => {
    refreshBrandMemories(true);
  };

  return (
    <DashboardLayout>
      <BrandContainer>
        <div className="space-y-8">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <BrandHeading level={1}>Workhorse Brand Memory</BrandHeading>
              <BrandText color="muted">
                Intelligent Brand Management for the AI Era
              </BrandText>
            </div>
            {!brandMemory && !isLoading && (
              <BrandStyledButton onClick={handleInitialize} disabled={isInitializing}>
                <FiPlus className="mr-2" />
                {isInitializing ? 'Initializing...' : 'Initialize Brand Memory'}
              </BrandStyledButton>
            )}
          </div>

          {brandMemory && (
            <AddBrandInsight brandId="workhorse" onInsightAdded={handleInsightAdded} />
          )}

          {isLoading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <BrandText>Loading brand memory...</BrandText>
            </div>
          ) : error ? (
            <BrandCard>
              <CardContent className="flex flex-col items-center justify-center min-h-[200px]">
                <FiInfo className="w-8 h-8 text-red-500 mb-2" />
                <BrandText size="lg" weight="medium">Error loading brand memory</BrandText>
                <BrandText color="muted">{error.message}</BrandText>
                <BrandStyledButton className="mt-4" onClick={() => refreshBrandMemories(true)}>
                  Try Again
                </BrandStyledButton>
              </CardContent>
            </BrandCard>
          ) : !brandMemory ? (
            <BrandCard>
              <CardContent className="flex flex-col items-center justify-center min-h-[200px]">
                <FiInfo className="w-8 h-8 text-amber-500 mb-2" />
                <BrandText size="lg" weight="medium">Brand Memory Not Found</BrandText>
                <BrandText color="muted">The Workhorse brand memory has not been initialized yet.</BrandText>
                <BrandStyledButton className="mt-4" onClick={handleInitialize} disabled={isInitializing}>
                  {isInitializing ? 'Initializing...' : 'Initialize Brand Memory'}
                </BrandStyledButton>
              </CardContent>
            </BrandCard>
          ) : (
            <BrandGrid columns={2}>
              <BrandValuesCardEnhanced brandId="workhorse" />
              <BrandHistoryCardEnhanced brandId="workhorse" />
              <BrandVisualsCardEnhanced brandId="workhorse" />
              <BrandInsightsCardEnhanced brandId="workhorse" />
            </BrandGrid>
          )}
        </div>
      </BrandContainer>
    </DashboardLayout>
  );
}

// Enhanced component using the custom hooks
function BrandValuesCardEnhanced({ brandId }: { brandId: string }) {
  const values = useBrandMemoryValues(brandId);
  
  return (
    <BrandCard>
      <CardHeader>
        <CardTitle>
          <BrandHeading level={3}>Brand Values</BrandHeading>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {values.map((value, index) => (
            <div key={index} className="pb-4 border-b last:border-0">
              <BrandText weight="medium">{value.key}</BrandText>
              <BrandText color="muted">{value.value}</BrandText>
              <div className="flex items-center mt-2">
                <div 
                  className="h-2 rounded-full bg-primary flex-grow" 
                  style={{ opacity: value.confidence }}
                ></div>
                <BrandText size="xs" color="muted" className="ml-2">
                  {Math.round(value.confidence * 100)}% confidence
                </BrandText>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </BrandCard>
  );
}

function BrandHistoryCardEnhanced({ brandId }: { brandId: string }) {
  const history = useBrandMemoryHistory(brandId);
  
  // Sort history by timestamp in descending order
  const sortedHistory = [...history].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <BrandCard>
      <CardHeader>
        <CardTitle>
          <BrandHeading level={3}>Brand History</BrandHeading>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedHistory.map((event) => (
            <div key={event.id} className="flex gap-4 pb-4 border-b last:border-0">
              <div className="mt-1">
                <div className="bg-primary h-8 w-8 rounded-full flex items-center justify-center">
                  <FiCalendar className="text-white" />
                </div>
              </div>
              <div>
                <BrandText weight="medium">
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </BrandText>
                <BrandText color="muted">{event.description}</BrandText>
                <BrandText size="xs" color="muted">
                  {new Date(event.timestamp).toLocaleDateString()}
                </BrandText>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </BrandCard>
  );
}

function BrandVisualsCardEnhanced({ brandId }: { brandId: string }) {
  const visualIdentity = useBrandMemoryVisualIdentity(brandId);
  
  if (!visualIdentity) return null;

  return (
    <BrandCard>
      <CardHeader>
        <CardTitle>
          <BrandHeading level={3}>Visual Identity</BrandHeading>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Color palette */}
          <div>
            <BrandText weight="medium" className="mb-4">Color Palette</BrandText>
            <div className="space-y-4">
              <div>
                <BrandText size="sm">Primary</BrandText>
                <div className="flex gap-2 mt-1">
                  {visualIdentity.colorPalette.primary.map((color, index) => (
                    <div 
                      key={index} 
                      className="h-10 w-10 rounded-md border" 
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <div>
                <BrandText size="sm">Secondary</BrandText>
                <div className="flex gap-2 mt-1">
                  {visualIdentity.colorPalette.secondary.map((color, index) => (
                    <div 
                      key={index} 
                      className="h-10 w-10 rounded-md border" 
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <div>
                <BrandText size="sm">Accent</BrandText>
                <div className="flex gap-2 mt-1">
                  {visualIdentity.colorPalette.accent.map((color, index) => (
                    <div 
                      key={index} 
                      className="h-10 w-10 rounded-md border" 
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div>
            <BrandText weight="medium" className="mb-4">Typography</BrandText>
            <div className="space-y-4">
              <div>
                <BrandText size="sm">Primary Font</BrandText>
                <BrandText 
                  style={{ fontFamily: visualIdentity.typography.fonts.primary }}
                  size="xl"
                >
                  {visualIdentity.typography.fonts.primary || 'Not specified'}
                </BrandText>
              </div>
              
              <div>
                <BrandText size="sm">Secondary Font</BrandText>
                <BrandText 
                  style={{ fontFamily: visualIdentity.typography.fonts.secondary }}
                  size="xl"
                >
                  {visualIdentity.typography.fonts.secondary || 'Not specified'}
                </BrandText>
              </div>
            </div>
          </div>

          {/* Assets */}
          {visualIdentity.assets.length > 0 && (
            <div>
              <BrandText weight="medium" className="mb-4">Brand Assets</BrandText>
              <div className="grid grid-cols-4 gap-4">
                {visualIdentity.assets.map((asset) => (
                  <div key={asset.id} className="text-center">
                    <div className="bg-gray-100 rounded-md p-2 mb-2 aspect-square flex items-center justify-center">
                      <img 
                        src={asset.url} 
                        alt={asset.name} 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <BrandText size="xs">{asset.name}</BrandText>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </BrandCard>
  );
}

function BrandInsightsCardEnhanced({ brandId }: { brandId: string }) {
  const insights = useBrandMemoryInsights(brandId);
  
  return (
    <BrandCard>
      <CardHeader>
        <CardTitle>
          <BrandHeading level={3}>AI Insights</BrandHeading>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.length === 0 ? (
            <BrandText color="muted">No insights yet. Add an insight to get started.</BrandText>
          ) : (
            insights.map((insight) => (
              <div key={insight.id} className="pb-4 border-b last:border-0">
                <div className="flex items-start justify-between">
                  <BrandText weight="medium">{insight.title}</BrandText>
                  <div className="bg-primary/10 rounded-full px-2 py-1">
                    <BrandText size="xs">
                      {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                    </BrandText>
                  </div>
                </div>
                <BrandText color="muted">{insight.description}</BrandText>
                <div className="flex items-center justify-between mt-2">
                  <BrandText size="xs" color="muted">Source: {insight.source}</BrandText>
                  <BrandText size="xs" color="muted">
                    {new Date(insight.createdAt).toLocaleDateString()}
                  </BrandText>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </BrandCard>
  );
} 