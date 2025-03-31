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
    content: '{}',
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
          content: data.content ? JSON.stringify(data.content, null, 2) : undefined,
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
        projectId: asset.project_id,
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
        content: contentObj,
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
        content: updated.content ? JSON.stringify(updated.content, null, 2) : undefined,
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
        const jsonMatch =
          response.text.match(/```json\n([\s\S]*?)\n```/) ||
          response.text.match(/```\n([\s\S]*?)\n```/) ||
          response.text.match(/{[\s\S]*?}/);

        if (jsonMatch) {
          const jsonStr = jsonMatch[0].replace(/```json\n|```\n|```/g, '');
          const parsedData = JSON.parse(jsonStr);

          if (parsedData && typeof parsedData === 'object') {
            // Update the form data with the new metadata
            setFormData({
              ...formData,
              metadata: JSON.stringify(parsedData, null, 2),
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
    return <div className="py-8 text-center">Loading asset details...</div>;
  }

  if (error) {
    return (
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="py-4 text-center text-red-500">{error}</div>
        <div className="flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
          >
            <FiArrowLeft className="mr-2" /> Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="py-4 text-center">Asset not found</div>
        <div className="flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
          >
            <FiArrowLeft className="mr-2" /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Asset Details</h2>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                <FiSave className="mr-2" /> Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
              >
                <FiX className="mr-2" /> Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className="mr-2 flex items-center rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
              >
                <FiCpu className="mr-2" /> AI Assist
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <div className="mb-4">
            <label htmlFor="asset-type" className="mb-2 block font-medium text-gray-700">
              Asset Type
            </label>
            {isEditing ? (
              <select
                id="asset-type"
                name="type"
                value={formData.type}
                onChange={handleTypeChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                aria-label="Select asset type"
              >
                <option value="image">Image</option>
                <option value="document">Document</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <div className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2">
                {asset.type}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="file-url" className="mb-2 block font-medium text-gray-700">
              File URL
            </label>
            {isEditing ? (
              <input
                id="file-url"
                type="text"
                name="file_url"
                value={formData.file_url}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter file URL"
                aria-label="File URL"
              />
            ) : (
              <div className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2 break-all">
                {asset.file_url}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="version-input" className="mb-2 block font-medium text-gray-700">
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
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                aria-label="Version number"
              />
            ) : (
              <div className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2">
                {asset.version}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="mb-2 block font-medium text-gray-700">Created At</label>
            <div className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2">
              {new Date(asset.created_at).toLocaleString()}
            </div>
          </div>

          <div className="mb-4">
            <label className="mb-2 block font-medium text-gray-700">Updated At</label>
            <div className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2">
              {new Date(asset.updated_at).toLocaleString()}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <label htmlFor="metadata-editor" className="mb-2 block font-medium text-gray-700">
              Metadata (JSON)
            </label>
            {isEditing ? (
              <textarea
                id="metadata-editor"
                name="metadata"
                value={formData.metadata}
                onChange={handleMetadataChange}
                rows={8}
                className="w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder='{ "name": "" }'
                aria-label="Asset metadata in JSON format"
              />
            ) : (
              <pre className="h-40 overflow-auto rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                {JSON.stringify(asset.metadata, null, 2)}
              </pre>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="content-editor" className="mb-2 block font-medium text-gray-700">
              Content (JSON, Optional)
            </label>
            {isEditing ? (
              <textarea
                id="content-editor"
                name="content"
                value={formData.content || ''}
                onChange={handleContentChange}
                rows={8}
                className="w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="{}"
                aria-label="Asset content in JSON format"
              />
            ) : (
              <pre className="h-40 overflow-auto rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                {asset.content ? JSON.stringify(asset.content, null, 2) : ''}
              </pre>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
        >
          <FiArrowLeft className="mr-2" /> Back to Assets
        </button>
      </div>
    </div>
  );
}
