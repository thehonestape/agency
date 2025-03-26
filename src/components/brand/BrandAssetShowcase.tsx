import React from "react";
import { useBrand, useBrandAssets } from "./BrandProvider";
import { BrandImage } from "./BrandImage";
import { BrandHeading } from "./BrandHeading";
import { BrandText } from "./BrandText";
import { BrandGrid } from "./BrandGrid";
import { BrandCard, CardContent, CardHeader, CardTitle } from "./BrandCard";

interface BrandAssetShowcaseProps {
  filter?: "logo" | "icon" | "image" | "pattern" | "illustration";
  maxItems?: number;
  showLabels?: boolean;
  layout?: "grid" | "list" | "carousel";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function BrandAssetShowcase({
  filter,
  maxItems,
  showLabels = true,
  layout = "grid",
  size = "md",
  className = "",
}: BrandAssetShowcaseProps) {
  const { currentBrand } = useBrand();
  const assets = useBrandAssets();
  
  if (!currentBrand) {
    return (
      <div className="text-center p-4 text-gray-500">
        No brand selected
      </div>
    );
  }
  
  // Filter assets based on the filter prop
  const filteredAssets = filter 
    ? assets.filter(asset => asset.type === filter)
    : assets;
  
  // Limit the number of assets if maxItems is specified
  const limitedAssets = maxItems && maxItems > 0
    ? filteredAssets.slice(0, maxItems)
    : filteredAssets;
  
  // Get image size based on the size prop
  const getImageSize = () => {
    if (size === "sm") return { width: 100, height: 100 };
    if (size === "lg") return { width: 250, height: 250 };
    return { width: 150, height: 150 }; // Default medium size
  };
  
  // Get asset type display name
  const getAssetTypeDisplay = (type: string) => {
    const typeMap: Record<string, string> = {
      logo: "Logo",
      icon: "Icon",
      image: "Image",
      pattern: "Pattern",
      illustration: "Illustration"
    };
    
    return typeMap[type] || type;
  };
  
  // Render grid layout
  const renderGridLayout = () => {
    return (
      <BrandGrid columns={filter === "logo" ? 2 : 3} gap="md" responsive>
        {limitedAssets.map(asset => (
          <div key={asset.id} className="flex flex-col items-center">
            <div className="p-4 flex items-center justify-center">
              <BrandImage
                assetKey={asset.key || asset.id}
                fallbackSrc={asset.url}
                alt={asset.altText || `${currentBrand.name} ${asset.type}`}
                aspectRatio={asset.type === "logo" ? "landscape" : "square"}
                rounded={asset.type === "icon"}
                fit="contain"
                width={getImageSize().width}
                height={getImageSize().height}
                className="mb-2"
              />
            </div>
            {showLabels && (
              <div className="text-center">
                <BrandText weight="medium" size="sm" className="mb-1">
                  {asset.altText || `${getAssetTypeDisplay(asset.type)} ${assets.indexOf(asset) + 1}`}
                </BrandText>
                <BrandText size="xs" color="muted">
                  {asset.key || asset.id}
                </BrandText>
              </div>
            )}
          </div>
        ))}
      </BrandGrid>
    );
  };
  
  // Render list layout
  const renderListLayout = () => {
    return (
      <div className="space-y-4">
        {limitedAssets.map(asset => (
          <div key={asset.id} className="flex items-center p-2 border rounded-md">
            <BrandImage
              assetKey={asset.key || asset.id}
              fallbackSrc={asset.url}
              alt={asset.altText || `${currentBrand.name} ${asset.type}`}
              rounded={asset.type === "icon"}
              fit="contain"
              width={size === "sm" ? 50 : size === "lg" ? 100 : 75}
              height={size === "sm" ? 50 : size === "lg" ? 100 : 75}
              className="mr-4"
            />
            {showLabels && (
              <div>
                <BrandText weight="medium" size="sm" className="mb-1">
                  {asset.altText || `${getAssetTypeDisplay(asset.type)} ${assets.indexOf(asset) + 1}`}
                </BrandText>
                <BrandText size="xs" color="muted">
                  Type: {getAssetTypeDisplay(asset.type)}
                </BrandText>
                {asset.key && (
                  <BrandText size="xs" color="muted">
                    Key: {asset.key}
                  </BrandText>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  // Render carousel layout
  const renderCarouselLayout = () => {
    return (
      <div className="relative overflow-hidden">
        <div className="flex space-x-4 overflow-x-auto pb-4 px-2 snap-x snap-mandatory">
          {limitedAssets.map(asset => (
            <div 
              key={asset.id} 
              className="flex-shrink-0 snap-center"
              style={{ width: getImageSize().width + 20 }}
            >
              <div className="flex flex-col items-center">
                <BrandImage
                  assetKey={asset.key || asset.id}
                  fallbackSrc={asset.url}
                  alt={asset.altText || `${currentBrand.name} ${asset.type}`}
                  rounded={asset.type === "icon"}
                  fit="contain"
                  width={getImageSize().width}
                  height={getImageSize().height}
                  className="mb-2"
                />
                {showLabels && (
                  <BrandText weight="medium" size="sm" className="text-center">
                    {asset.altText || `${getAssetTypeDisplay(asset.type)} ${assets.indexOf(asset) + 1}`}
                  </BrandText>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Render the appropriate layout
  const renderLayout = () => {
    switch (layout) {
      case "list":
        return renderListLayout();
      case "carousel":
        return renderCarouselLayout();
      case "grid":
      default:
        return renderGridLayout();
    }
  };
  
  // Display a message if no assets are found
  if (limitedAssets.length === 0) {
    return (
      <BrandCard className={className}>
        <CardContent>
          <div className="text-center p-4 text-gray-500">
            No {filter ? getAssetTypeDisplay(filter) + " " : ""}assets found for this brand
          </div>
        </CardContent>
      </BrandCard>
    );
  }
  
  return (
    <div className={`brand-asset-showcase ${className}`}>
      {renderLayout()}
    </div>
  );
} 