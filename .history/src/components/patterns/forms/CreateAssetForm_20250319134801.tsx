import { useState } from 'react';
import { assetService, AssetType, InsertAsset } from '../services/assetService';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { FileUpload } from './FileUpload';
import { FileInfo } from '../services/storageService';
import { toast } from 'react-hot-toast';

interface CreateAssetFormProps {
  projectId: string;
  onAssetCreated: () => void;
  onCancel: () => void;
}

export function CreateAssetForm({ projectId, onAssetCreated, onCancel }: CreateAssetFormProps) {
  const [formData, setFormData] = useState<Omit<InsertAsset, 'metadata' | 'content'> & {
    metadata: string;
    content: string;
  }>({
    project_id: projectId,
    type: 'image' as AssetType,
    file_url: '',
    version: 1,
    metadata: '{}',
    content: '{}'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMetadataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const value = e.target.value;
      // Try to parse as JSON to validate, but store as string
      if (value) {
        JSON.parse(value);
      }
      setFormData((prev) => ({ ...prev, metadata: value }));
      setError('');
    } catch (err) {
      setError('Metadata must be valid JSON');
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const value = e.target.value;
      // Try to parse as JSON to validate, but store as string
      if (value) {
        JSON.parse(value);
      }
      setFormData((prev) => ({ ...prev, content: value }));
      setError('');
    } catch (err) {
      setError('Content must be valid JSON');
    }
  };

  const handleVersionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setFormData((prev) => ({ ...prev, version: value }));
    }
  };

  const handleFileUpload = (fileInfo: FileInfo) => {
    setFormData((prev) => ({
      ...prev,
      file_url: fileInfo.url,
      type: (fileInfo.type.split('/')[0] || 'other') as AssetType
    }));
    setFileUploaded(true);
    toast.success('File uploaded successfully!');
  };

  const handleFileUploadError = (error: string) => {
    setError(error);
    toast.error(error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.file_url && !fileUploaded) {
      setError('Please upload a file first');
      return;
    }
    
    if (error) return;
    
    try {
      setIsSubmitting(true);
      
      // Convert string JSON to objects
      const assetData: InsertAsset = {
        ...formData,
        metadata: JSON.parse(formData.metadata),
        content: formData.content ? JSON.parse(formData.content) : {}
      };
      
      const asset = await assetService.create(assetData);
      setIsSubmitting(false);
      onAssetCreated();
      toast.success('Asset created successfully!');
    } catch (err) {
      setIsSubmitting(false);
      setError(err instanceof Error ? err.message : 'Failed to create asset');
      toast.error('Failed to create asset');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="fileUpload">File Upload</Label>
          <FileUpload
            onFileUpload={handleFileUpload}
            onError={handleFileUploadError}
            className="mt-1"
          />
        </div>
        
        {formData.file_url && (
          <>
            <div>
              <Label htmlFor="type">Asset Type</Label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                aria-label="Select asset type"
              >
                <option value="image">Image</option>
                <option value="document">Document</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <Label htmlFor="version">Version</Label>
              <Input
                id="version"
                name="version"
                type="number"
                min="1"
                value={formData.version}
                onChange={handleVersionChange}
              />
            </div>

            <div>
              <Label htmlFor="metadata">Metadata (JSON)</Label>
              <Textarea
                id="metadata"
                name="metadata"
                value={formData.metadata}
                onChange={handleMetadataChange}
                rows={4}
                placeholder='{"key": "value"}'
              />
            </div>

            <div>
              <Label htmlFor="content">Content (JSON)</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleContentChange}
                rows={4}
                placeholder='{"key": "value"}'
              />
            </div>
          </>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || !!error}>
            {isSubmitting ? 'Creating...' : 'Create Asset'}
          </Button>
        </div>
      </div>
    </form>
  );
} 