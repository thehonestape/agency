import React from "react";
import { useBrand } from "./BrandProvider";
import { BrandStyledButton } from "./BrandStyledButton";
import { BrandHeading } from "./BrandHeading";
import { BrandText } from "./BrandText";
import { Select } from "../catalyst-ui/catalyst-ui-kit/typescript/select";

interface BrandSwitcherProps {
  variant?: "dropdown" | "inline" | "pills";
  label?: string;
  className?: string;
}

export function BrandSwitcher({ 
  variant = "inline", 
  label = "Select Brand", 
  className = "" 
}: BrandSwitcherProps) {
  const { currentBrand, availableBrands, setBrandBySlug, isPending } = useBrand();
  
  if (isPending) {
    return <div className="animate-pulse h-8 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>;
  }
  
  if (variant === "dropdown") {
    return (
      <div className={`relative ${className}`}>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" id="brand-select-label">
          {label}
        </label>
        <Select 
          className="w-full"
          value={currentBrand?.slug || ''}
          onChange={(e) => setBrandBySlug(e.target.value)}
          disabled={isPending}
          aria-labelledby="brand-select-label"
        >
          {availableBrands.map(brand => (
            <option key={brand.slug} value={brand.slug}>
              {brand.name} - {brand.client}
            </option>
          ))}
        </Select>
      </div>
    );
  }
  
  if (variant === "pills") {
    return (
      <div className={`space-y-2 ${className}`}>
        {label && <BrandHeading level={5}>{label}</BrandHeading>}
        <div className="flex flex-wrap gap-2">
          {availableBrands.map(brand => (
            <BrandStyledButton
              key={brand.slug}
              size="sm"
              variant={currentBrand?.slug === brand.slug ? "default" : "outline"}
              colorVariant={currentBrand?.slug === brand.slug ? "primary" : "secondary"}
              onClick={() => setBrandBySlug(brand.slug)}
              disabled={isPending}
            >
              {brand.name}
            </BrandStyledButton>
          ))}
        </div>
      </div>
    );
  }
  
  // Default inline variant
  return (
    <div className={`space-y-2 ${className}`}>
      {label && <BrandText size="sm" weight="medium">{label}</BrandText>}
      <div className="flex flex-wrap items-center gap-3">
        {availableBrands.map(brand => (
          <div 
            key={brand.slug}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer transition-all ${
              currentBrand?.slug === brand.slug 
                ? 'bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent'
            }`}
            onClick={() => setBrandBySlug(brand.slug)}
          >
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ 
                backgroundColor: brand.colors.find(c => c.isPrimary)?.value || brand.colors[0].value 
              }}
            />
            <BrandText 
              size="sm"
              weight={currentBrand?.slug === brand.slug ? "medium" : "regular"}
            >
              {brand.name}
            </BrandText>
          </div>
        ))}
      </div>
    </div>
  );
} 