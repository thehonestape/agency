import { useState, useEffect } from 'react';
import { brandService, Brand, UpdateBrand } from '../services/brandService';
import { BrandMemoryView } from './brand/BrandMemoryView';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface BrandDetailsProps {
  brandId: string;
  onClose: () => void;
  onUpdate?: () => void;
}

export function BrandDetails({ brandId, onClose, onUpdate }: BrandDetailsProps) {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<UpdateBrand>({
    name: '',
    description: '',
  });

  useEffect(() => {
    async function fetchBrand() {
      try {
        setIsLoading(true);
        const data = await brandService.getById(brandId);
        setBrand(data);
        
        if (data) {
          setFormData({
            name: data.name,
            description: data.description || '',
          });
        }
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch brand:', err);
        setError('Failed to load brand details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    if (brandId) {
      fetchBrand();
    }
  }, [brandId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    if (!formData.name?.trim()) {
      setError('Brand name is required');
      return;
    }

    try {
      await brandService.update(brandId, formData);
      setIsEditing(false);
      
      // Refresh brand data
      const updatedBrand = await brandService.getById(brandId);
      setBrand(updatedBrand);
      
      if (onUpdate) {
        onUpdate();
      }
      
      setError(null);
    } catch (err) {
      console.error('Failed to update brand:', err);
      setError('Failed to update brand. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="text-center py-8">Loading brand details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="text-center py-8 text-red-500">{error}</div>
        <div className="flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="text-center py-8 text-red-500">Brand not found</div>
        <div className="flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Brand Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="memory">Brand Memory</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  {isEditing ? (
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Brand name"
                    />
                  ) : (
                    <p className="text-lg font-medium">{brand.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  {isEditing ? (
                    <Textarea
                      name="description"
                      value={formData.description || ''}
                      onChange={handleChange}
                      placeholder="Brand description"
                    />
                  ) : (
                    <p className="text-muted-foreground">{brand.description || 'No description'}</p>
                  )}
                </div>

                <div className="flex justify-end space-x-2">
                  {isEditing ? (
                    <>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave}>Save Changes</Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>Edit</Button>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="memory">
              <BrandMemoryView brandId={brandId} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 