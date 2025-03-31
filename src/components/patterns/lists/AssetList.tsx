import { useState } from 'react';
import { Asset, assetService } from '@services/assetService';
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
      <div className="py-8 text-center text-gray-500">
        <p className="mb-4">No assets found for this project.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
            >
              Type
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
            >
              Asset
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
            >
              Version
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
            >
              Created
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
            >
              Updated
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {assets.map((asset) => (
            <tr
              key={asset.id}
              className={`${selectedAssetId === asset.id ? 'bg-blue-50' : 'hover:bg-gray-50'} cursor-pointer`}
              onClick={() => handleSelectAsset(asset.id)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-xl">{getAssetTypeIcon(asset.type)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {asset.metadata?.name || asset.file_url.split('/').pop() || 'Unnamed Asset'}
                </div>
                <div className="max-w-xs truncate text-sm text-gray-500">{asset.file_url}</div>
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                v{asset.version || 1}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                {new Date(asset.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                {new Date(asset.updated_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                <div className="flex justify-end space-x-2">
                  <Link
                    to={`/assets/${asset.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiEdit className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(asset.id);
                    }}
                    className="text-red-600 hover:text-red-900"
                    aria-label="Delete asset"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedAssetId && (
        <div className="border-t border-gray-200 bg-gray-50 p-6">
          <h3 className="mb-4 text-lg font-medium text-gray-900">Asset Details</h3>
          {assets.find((a) => a.id === selectedAssetId)?.metadata && (
            <div className="mb-4 rounded border border-gray-200 bg-white p-4">
              <h4 className="mb-2 font-medium text-gray-700">Metadata</h4>
              <pre className="max-h-40 overflow-auto text-sm text-gray-600">
                {JSON.stringify(assets.find((a) => a.id === selectedAssetId)?.metadata, null, 2)}
              </pre>
            </div>
          )}

          {assets.find((a) => a.id === selectedAssetId)?.content && (
            <div className="rounded border border-gray-200 bg-white p-4">
              <h4 className="mb-2 font-medium text-gray-700">Content</h4>
              <pre className="max-h-40 overflow-auto text-sm text-gray-600">
                {JSON.stringify(assets.find((a) => a.id === selectedAssetId)?.content, null, 2)}
              </pre>
            </div>
          )}

          <div className="mt-4 flex justify-end">
            <Link
              to={`/assets/${selectedAssetId}`}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              View/Edit Full Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
