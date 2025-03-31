import { useState } from 'react';
import { Asset, assetService } from '../services/assetService';
import { Link } from 'react-router-dom';
import { FiFile, FiImage, FiFileText, FiVideo, FiMusic, FiTrash2, FiEdit } from 'react-icons/fi';

interface AssetListProps {
  assets: Asset[];
  onSelect: (id: string) => void;
  onDelete: () => void;
}

export function AssetList({ assets, onSelect, onDelete }: AssetListProps) {
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

  async function handleDelete(assetId: string) {
    if (!confirm('Are you sure you want to delete this asset? This action cannot be undone.')) {
      return;
    }

    try {
      // Delete the asset using the service
      await assetService.delete(assetId);
      // Refresh the asset list by calling the parent's onDelete callback
      onDelete();
    } catch (err) {
      console.error('Failed to delete asset:', err);
      alert('Failed to delete asset. Please try again later.');
    }
  }

  function handleSelectAsset(assetId: string) {
    setSelectedAssetId(assetId === selectedAssetId ? null : assetId);
    onSelect(assetId);
  }

  function getAssetTypeIcon(type: string) {
    switch (type) {
      case 'image':
        return <FiImage className="text-blue-500" />;
      case 'document':
        return <FiFileText className="text-green-500" />;
      case 'video':
        return <FiVideo className="text-purple-500" />;
      case 'audio':
        return <FiMusic className="text-yellow-500" />;
      default:
        return <FiFile className="text-gray-500" />;
    }
  }

  if (assets.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="mb-4">No assets found for this project.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Asset
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Version
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Updated
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {assets.map((asset) => (
            <tr 
              key={asset.id}
              className={`${selectedAssetId === asset.id ? 'bg-blue-50' : 'hover:bg-gray-50'} cursor-pointer`}
              onClick={() => handleSelectAsset(asset.id)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-xl">
                  {getAssetTypeIcon(asset.type)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {asset.metadata?.name || asset.file_url.split('/').pop() || 'Unnamed Asset'}
                </div>
                <div className="text-sm text-gray-500 truncate max-w-xs">
                  {asset.file_url}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                v{asset.version || 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(asset.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(asset.updated_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <Link to={`/assets/${asset.id}`} className="text-indigo-600 hover:text-indigo-900" onClick={(e) => e.stopPropagation()}>
                    <FiEdit className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(asset.id);
                    }}
                    className="text-red-600 hover:text-red-900"
                    aria-label="Delete asset"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {selectedAssetId && (
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Asset Details</h3>
          {assets.find(a => a.id === selectedAssetId)?.metadata && (
            <div className="bg-white p-4 rounded border border-gray-200 mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Metadata</h4>
              <pre className="text-sm text-gray-600 overflow-auto max-h-40">
                {JSON.stringify(assets.find(a => a.id === selectedAssetId)?.metadata, null, 2)}
              </pre>
            </div>
          )}
          
          {assets.find(a => a.id === selectedAssetId)?.content && (
            <div className="bg-white p-4 rounded border border-gray-200">
              <h4 className="font-medium text-gray-700 mb-2">Content</h4>
              <pre className="text-sm text-gray-600 overflow-auto max-h-40">
                {JSON.stringify(assets.find(a => a.id === selectedAssetId)?.content, null, 2)}
              </pre>
            </div>
          )}
          
          <div className="mt-4 flex justify-end">
            <Link
              to={`/assets/${selectedAssetId}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              View/Edit Full Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 