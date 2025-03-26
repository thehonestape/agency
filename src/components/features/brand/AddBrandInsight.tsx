import React, { useState } from 'react';
import { BrandCard, CardContent, CardHeader, CardTitle } from './BrandCard';
import { BrandHeading } from './BrandHeading';
import { BrandText } from './BrandText';
import { BrandStyledButton } from './BrandStyledButton';
import { AIBrandInsight } from '../../types/brandMemory.types';
import { FiPlus, FiCheck } from 'react-icons/fi';
import { useBrandMemory } from './BrandMemoryProvider';
import { brandMemoryService } from '../../services/brandMemoryService';

interface AddBrandInsightProps {
  brandId: string;
  onInsightAdded?: () => void;
}

export function AddBrandInsight({ brandId, onInsightAdded }: AddBrandInsightProps) {
  const { refreshBrandMemories } = useBrandMemory();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<AIBrandInsight['type']>('opportunity');
  const [confidence, setConfidence] = useState(0.8);
  const [source, setSource] = useState('manual-input');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description) return;
    
    try {
      setIsSubmitting(true);
      
      const insight: AIBrandInsight = {
        id: `insight-${Date.now()}`,
        type,
        title,
        description,
        confidence,
        source,
        data: {},
        createdAt: new Date(),
      };
      
      // Add the insight using the service
      await brandMemoryService.addBrandInsight(brandId, insight);
      
      // Reset form
      setTitle('');
      setDescription('');
      setType('opportunity');
      setConfidence(0.8);
      setSource('manual-input');
      setIsOpen(false);
      
      // Refresh brand memories
      await refreshBrandMemories(true);
      
      // Notify parent component if callback provided
      if (onInsightAdded) {
        onInsightAdded();
      }
    } catch (error) {
      console.error('Error adding brand insight:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-8">
      {!isOpen ? (
        <BrandStyledButton onClick={() => setIsOpen(true)}>
          <FiPlus className="mr-2" />
          Add Brand Insight
        </BrandStyledButton>
      ) : (
        <BrandCard>
          <CardHeader>
            <CardTitle>
              <BrandHeading level={3}>Add New Brand Insight</BrandHeading>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block mb-2">
                  <BrandText weight="medium">Title</BrandText>
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter insight title"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block mb-2">
                  <BrandText weight="medium">Description</BrandText>
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded-md h-24"
                  placeholder="Enter insight description"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="type" className="block mb-2">
                    <BrandText weight="medium">Type</BrandText>
                  </label>
                  <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value as AIBrandInsight['type'])}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="trend">Trend</option>
                    <option value="opportunity">Opportunity</option>
                    <option value="risk">Risk</option>
                    <option value="recommendation">Recommendation</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="confidence" className="block mb-2">
                    <BrandText weight="medium">Confidence ({Math.round(confidence * 100)}%)</BrandText>
                  </label>
                  <input
                    id="confidence"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={confidence}
                    onChange={(e) => setConfidence(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="source" className="block mb-2">
                  <BrandText weight="medium">Source</BrandText>
                </label>
                <input
                  id="source"
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter insight source"
                />
              </div>
              
              <div className="flex justify-end gap-4 pt-4">
                <BrandStyledButton
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </BrandStyledButton>
                <BrandStyledButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Adding...' : 'Add Insight'}
                  {!isSubmitting && <FiCheck className="ml-2" />}
                </BrandStyledButton>
              </div>
            </form>
          </CardContent>
        </BrandCard>
      )}
    </div>
  );
} 