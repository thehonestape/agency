import { useState, useEffect } from 'react';
import { brandService, Brand } from '../services/brandService';
import { BrandDetails } from './BrandDetails';

interface BrandListProps {
  organizationId: string;
  onSelectBrand?: (brand: Brand) => void;
}

export function BrandList({ organizationId, onSelectBrand }: BrandListProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);

  const fetchBrands = async () => {
    try {
      setIsLoading(true);
      const data = await brandService.getByOrganizationId(organizationId);
      setBrands(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch brands:', err);
      setError('Failed to load brands. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (organizationId) {
      fetchBrands();
    }
  }, [organizationId]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      try {
        await brandService.delete(id);
        setBrands(brands.filter(brand => brand.id !== id));
      } catch (err) {
        console.error('Failed to delete brand:', err);
        alert('Failed to delete brand. Please try again.');
      }
    }
  };

  const handleSelectBrand = (brand: Brand) => {
    setSelectedBrandId(brand.id);
    if (onSelectBrand) {
      onSelectBrand(brand);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading brands...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (brands.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No brands found for this organization. Create a new brand to get started.
      </div>
    );
  }

  if (selectedBrandId) {
    return (
      <BrandDetails 
        brandId={selectedBrandId} 
        onClose={() => setSelectedBrandId(null)} 
        onUpdate={fetchBrands}
      />
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Brands</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {brands.map((brand) => (
          <div 
            key={brand.id} 
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleSelectBrand(brand)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{brand.name}</h3>
                <p className="text-gray-600 mt-1">{brand.description || 'No description'}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Created on {new Date(brand.creation_date).toLocaleDateString()}
                </p>
              </div>
              <button 
                className="text-red-500 hover:text-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(brand.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 