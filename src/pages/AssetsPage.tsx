import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assetService, Asset } from '../services/assetService';
import { projectService } from '../services/projectService';
import { AssetList } from '../components/AssetList';
import { CreateAssetForm } from '../components/CreateAssetForm';
import { Button } from '../components/ui/button';
import { toast } from 'react-hot-toast';
import { FiPlus, FiArrowLeft, FiUpload } from 'react-icons/fi';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card'

interface AssetDetailsProps {
  assetId: string;
  onUpdate: () => void;
  onDelete: () => void;
  onBack: () => void;
}

interface AssetListProps {
  assets: Asset[];
  onSelect: (id: string) => void;
  onDelete: () => void;
}

// Mock AssetDetails until the actual component is implemented
function AssetDetails({ assetId, onUpdate, onDelete, onBack }: AssetDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Asset Details</h2>
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close details"
        >
          &times;
        </button>
      </div>
      <p>Viewing asset ID: {assetId}</p>
      <div className="flex justify-end space-x-3 mt-6">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Back
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Delete
        </button>
        <button
          onClick={onUpdate}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Update
        </button>
      </div>
    </div>
  );
}

export function AssetsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [projectName, setProjectName] = useState('');
  
  useEffect(() => {
    if (!projectId) {
      setError('Project ID is required');
      setLoading(false);
      return;
    }
    
    fetchAssets();
    fetchProjectDetails();
  }, [projectId]);
  
  const fetchAssets = async () => {
    try {
      setLoading(true);
      const data = await assetService.getByProjectId(projectId!);
      setAssets(data);
      setError('');
    } catch (err) {
      setError('Failed to load assets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchProjectDetails = async () => {
    try {
      if (!projectId) return;
      const project = await projectService.getById(projectId);
      if (project) {
        setProjectName(project.name);
      }
    } catch (err) {
      console.error('Failed to load project details:', err);
    }
  };
  
  const handleAssetCreated = () => {
    setShowCreateForm(false);
    fetchAssets();
    toast.success('Asset created successfully');
  };
  
  const handleAssetUpdated = () => {
    fetchAssets();
    toast.success('Asset updated successfully');
  };
  
  const handleAssetDeleted = () => {
    setSelectedAssetId(null);
    fetchAssets();
    toast.success('Asset deleted successfully');
  };
  
  const handleBackToProjects = () => {
    navigate(`/projects`);
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Assets</h1>
          <p className="text-muted-foreground">
            Manage your digital assets
          </p>
        </div>
        <Button className="flex items-center">
          <FiUpload className="mr-2" /> Upload Asset
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Assets</CardTitle>
          <CardDescription>View and manage your assets</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Asset management functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </>
  )
} 