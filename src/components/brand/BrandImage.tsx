import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { useBrand, useBrandAssets } from "./BrandProvider";

export interface BrandImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  assetKey?: string;
  fallbackSrc?: string;
  aspectRatio?: "square" | "video" | "portrait" | "landscape" | "auto";
  fit?: "contain" | "cover" | "fill" | "none";
  position?: "center" | "top" | "bottom" | "left" | "right";
  rounded?: boolean | "sm" | "md" | "lg" | "full";
  shadow?: "none" | "sm" | "md" | "lg";
  bordered?: boolean;
  overlay?: boolean;
  overlayColor?: "primary" | "secondary" | "accent" | "black" | "white";
  overlayOpacity?: number;
  className?: string;
}

export function BrandImage({
  assetKey,
  fallbackSrc,
  aspectRatio = "auto",
  fit = "cover",
  position = "center",
  rounded = false,
  shadow = "none",
  bordered = false,
  overlay = false,
  overlayColor = "black",
  overlayOpacity = 0.5,
  alt = "",
  className,
  ...props
}: BrandImageProps) {
  const { currentBrand } = useBrand();
  const brandAssets = useBrandAssets();
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [error, setError] = useState(false);
  
  // Get image source from brand assets or fallback
  useEffect(() => {
    if (assetKey && brandAssets.length > 0) {
      const asset = brandAssets.find(asset => {
        // Look for exact key match first
        if (asset.key && asset.key === assetKey) return true;
        // If no key, try matching by id
        return asset.id === assetKey;
      });
      
      if (asset?.url) {
        setImageSrc(asset.url);
        return;
      }
    }
    
    // Use fallback if asset not found or no asset key specified
    if (fallbackSrc) {
      setImageSrc(fallbackSrc);
    } else {
      setError(true);
    }
  }, [assetKey, brandAssets, fallbackSrc]);
  
  // Image loader error handling
  const handleError = () => {
    if (imageSrc !== fallbackSrc && fallbackSrc) {
      setImageSrc(fallbackSrc);
    } else {
      setError(true);
    }
  };
  
  // Get border radius based on the brand or requested size
  const getBorderRadius = () => {
    if (!rounded) return undefined;
    
    // Use brand radii if available
    if (currentBrand?.radii) {
      if (rounded === "sm") return currentBrand.radii.small;
      if (rounded === "md") return currentBrand.radii.medium;
      if (rounded === "lg") return currentBrand.radii.large;
      if (rounded === "full" || rounded === true) return currentBrand.radii.full;
    }
    
    // Fallback values
    if (rounded === "sm") return "0.25rem";
    if (rounded === "md") return "0.5rem";
    if (rounded === "lg") return "1rem";
    if (rounded === "full" || rounded === true) return "9999px";
    
    return undefined;
  };
  
  // Get shadow style
  const getShadow = () => {
    if (shadow === "none") return undefined;
    
    // Fallback shadow values
    if (shadow === "sm") return "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
    if (shadow === "md") return "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
    if (shadow === "lg") return "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
    
    return undefined;
  };
  
  // Get aspect ratio style
  const getAspectRatio = () => {
    if (aspectRatio === "auto") return undefined;
    
    const ratios = {
      square: "1 / 1",
      video: "16 / 9",
      portrait: "3 / 4",
      landscape: "4 / 3"
    };
    
    return ratios[aspectRatio];
  };
  
  // Get overlay color
  const getOverlayColor = () => {
    if (!overlay) return undefined;
    
    if (overlayColor === "primary" && currentBrand) {
      const primaryColor = currentBrand.colors.find(c => c.isPrimary);
      return primaryColor ? primaryColor.value : "rgba(0, 0, 0, 0.5)";
    }
    
    if (overlayColor === "secondary" && currentBrand) {
      const secondaryColor = currentBrand.colors.find(c => c.isSecondary);
      return secondaryColor ? secondaryColor.value : "rgba(0, 0, 0, 0.5)";
    }
    
    if (overlayColor === "accent" && currentBrand) {
      const accentColor = currentBrand.colors.find(c => c.isAccent);
      return accentColor ? accentColor.value : "rgba(0, 0, 0, 0.5)";
    }
    
    return overlayColor === "white" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)";
  };
  
  // Create CSS styles for the image container
  const containerStyle: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    borderRadius: getBorderRadius(),
    boxShadow: getShadow(),
    aspectRatio: getAspectRatio(),
    border: bordered ? "1px solid rgba(0,0,0,0.1)" : undefined
  };
  
  // If we have an error and no fallback, show a placeholder
  if (error || (!imageSrc && !fallbackSrc)) {
    return (
      <div 
        style={containerStyle}
        className={cn("bg-gray-200 flex items-center justify-center", className)}
        {...props}
      >
        <span className="text-gray-500 text-sm">{alt || "Image not found"}</span>
      </div>
    );
  }
  
  return (
    <div style={containerStyle} className={className}>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          onError={handleError}
          style={{
            objectFit: fit,
            objectPosition: position,
            width: "100%",
            height: "100%",
          }}
          {...props}
        />
      )}
      
      {overlay && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: getOverlayColor(),
            opacity: overlayOpacity
          }}
        />
      )}
    </div>
  );
} 