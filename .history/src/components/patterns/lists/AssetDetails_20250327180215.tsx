import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Asset, assetService, AssetType } from '@services/assetService';
import { FiSave, FiX, FiArrowLeft, FiCpu } from 'react-icons/fi';
import { AIAssistant } from '@patterns/lists/AIAssistant';
import { AIResponse } from '@services/aiService';

export function AssetDetails() {
  const { assetId } = useParams<{ assetId: string }>();
  const navigate = useNavigate();
  
  const [asset, setAsset] = useState<Asset | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<{
    type: AssetType;
    file_url: string;
    version: number;
    metadata: string;
    content?: string;
  }>({
    type: 'other',
    file_url: '',
    version: 1,
    metadata: '{}',
    content: '{}'
  });
  
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiContext, setAiContext] = useState<Record<string, any>>({});
  
  useEffect(() => {
    if (!assetId) return;
    
    async function fetchAssetDetails() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await assetService.getById(assetId as string);
        setAsset(data);
        
        // Initialize form data
        setFormData({
          type: data.type,
          file_url: data.file_url,
          version: data.version,
          metadata: JSON.stringify(data.metadata, null, 2),
          content: data.content ? JSON.stringify(data.content, null, 2) : undefined
        });
      } catch (err) {
        console.error('Failed to fetch asset details:', err);
        setError('Failed to load asset details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchAssetDetails();
  }, [assetId]);
  
  useEffect(() => {
    if (asset) {
      // Set up AI context with asset data
      setAiContext({
        assetType: asset.type,
        assetName: asset.metadata?.name || 'Asset',
        metadata: asset.metadata,
        content: asset.content,
        projectId: asset.project_id
      });
    }
  }, [asset]);
  
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, type: e.target.value as AssetType });
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleMetadataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, metadata: e.target.value });
  };
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, content: e.target.value });
  };
  
  const handleSave = async () => {
    if (!assetId) return;
    
    try {
      // Validate JSON fields
      let metadataObj = {};
      let contentObj = undefined;
      
      try {
        metadataObj = JSON.parse(formData.metadata);
      } catch (err) {
        setError('Invalid JSON in metadata field');
        return;
      }
      
      if (formData.content) {
        try {
          contentObj = JSON.parse(formData.content);
        } catch (err) {
          setError('Invalid JSON in content field');
          return;
        }
      }
      
      setIsLoading(true);
      setError(null);
      
      await assetService.update(assetId, {
        type: formData.type,
        file_url: formData.file_url,
        version: formData.version,
        metadata: metadataObj,
        content: contentObj
      });
      
      // Refresh asset data
      const updated = await assetService.getById(assetId);
      setAsset(updated);
      
      // Reset form with updated data
      setFormData({
        type: updated.type,
        file_url: updated.file_url,
        version: updated.version,
        metadata: JSON.stringify(updated.metadata, null, 2),
        content: updated.content ? JSON.stringify(updated.content, null, 2) : undefined
      });
      
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update asset:', err);
      setError('Failed to update asset. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAIGeneration = (response: AIResponse) => {
    // If the response appears to be JSON, try to parse it and apply it to the metadata
    if (isEditing && response.text.includes('{') && response.text.includes('}')) {
      try {
        // Extract JSON from the response
        const jsonMatch = response.text.match(/```json\n([\s\S]*?)\n```/) || 
                         response.text.match(/```\n([\s\S]*?)\n```/) ||
                         response.text.match(/{[\s\S]*?}/);
                
        if (jsonMatch) {
          const jsonStr = jsonMatch[0].replace(/```json\n|```\n|```/g, '');
          const parsedData = JSON.parse(jsonStr);
          
          if (parsedData && typeof parsedData === 'object') {
            // Update the form data with the new metadata
            setFormData({
              ...formData,
              metadata: JSON.stringify(parsedData, null, 2)
            });
          }
        }
      } catch (err) {
        console.error('Failed to parse AI-generated JSON:', err);
        // Continue without applying changes
      }
    }
  };
  
  if (isLoading && !asset) {
    return <div className="text-center py-8">Loading asset details...</div>;
  }
  
  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="text-center py-4 text-red-500">{error}</div>
        <div className="flex justify-center">
          <button 
            onClick={() => navigate(-1)} 
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center"
          >
            <FiArrowLeft className="mr-2" /> Go Back
          </button>
        </div>
      </div>
    );
  }
  
  if (!asset) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="text-center py-4">Asset not found</div>
        <div className="flex justify-center">
          <button 
            onClick={() => navigate(-1)} 
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center"
          >
            <FiArrowLeft className="mr-2" /> Go Back
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Asset Details</h2>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
              >
                <FiSave className="mr-2" /> Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center"
              >
                <FiX className="mr-2" /> Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center mr-2"
              >
                <FiCpu className="mr-2" /> AI Assist
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
      
      {showAIAssistant && !isEditing && (
        <div className="mb-6">
          <AIAssistant 
            initialPrompt={`Help me improve the metadata for my ${asset?.type} asset "${asset?.metadata?.name || 'Asset'}"`}
            context={aiContext}
            onGenerate={handleAIGeneration}
            onClose={() => setShowAIAssistant(false)}
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label htmlFor="asset-type" className="block text-gray-700 font-medium mb-2">
              Asset Type
            </label>
            {isEditing ? (
              <select
                id="asset-type"
                name="type"
                value={formData.type}
                onChange={handleTypeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Select asset type"
              >
                <option value="image">Image</option>
                <option value="document">Document</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                {asset.type}
              </div>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="file-url" className="block text-gray-700 font-medium mb-2">
              File URL
            </label>
            {isEditing ? (
              <input
                id="file-url"
                type="text"
                name="file_url"
                value={formData.file_url}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter file URL"
                aria-label="File URL"
              />
            ) : (
              <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 break-all">
                {asset.file_url}
              </div>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="version-input" className="block text-gray-700 font-medium mb-2">
              Version
            </label>
            {isEditing ? (
              <input
                id="version-input"
                type="number"
                name="version"
                value={formData.version}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Version number"
              />
            ) : (
              <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                {asset.version}
              </div>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Created At
            </label>
            <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
              {new Date(asset.created_at).toLocaleString()}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Updated At
            </label>
            <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
              {new Date(asset.updated_at).toLocaleString()}
            </div>
          </div>
        </div>
        
        <div>
          <div className="mb-4">
            <label htmlFor="metadata-editor" className="block text-gray-700 font-medium mb-2">
              Metadata (JSON)
            </label>
            {isEditing ? (
              <textarea
                id="metadata-editor"
                name="metadata"
                value={formData.metadata}
                onChange={handleMetadataChange}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder='{ "name": "" }'
                aria-label="Asset metadata in JSON format"
              />
            ) : (
              <pre className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 overflow-auto h-40 text-sm">
                {JSON.stringify(asset.metadata, null, 2)}
              </pre>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="content-editor" className="block text-gray-700 font-medium mb-2">
              Content (JSON, Optional)
            </label>
            {isEditing ? (
              <textarea
                id="content-editor"
                name="content"
                value={formData.content || ''}
                onChange={handleContentChange}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="{}"
                aria-label="Asset content in JSON format"
              />
            ) : (
              <pre className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 overflow-auto h-40 text-sm">
                {asset.content ? JSON.stringify(asset.content, null, 2) : ''}
              </pre>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button 
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center"
        >
          <FiArrowLeft className="mr-2" /> Back to Assets
        </button>
      </div>
    </div>
  );
} 