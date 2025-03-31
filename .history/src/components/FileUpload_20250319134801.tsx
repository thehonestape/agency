import { useState, useRef, useEffect } from 'react';
import { storageService, FileInfo } from '../services/storageService';
import { FiUpload, FiX, FiFile, FiImage, FiFileText, FiVideo, FiMusic, FiCheckCircle } from 'react-icons/fi';

interface FileUploadProps {
  onFileUpload: (fileInfo: FileInfo) => void;
  onError?: (error: string) => void;
  bucketName?: string;
  folder?: string;
  allowedTypes?: string[];
  maxSizeMB?: number;
  className?: string;
}

export function FileUpload({
  onFileUpload,
  onError,
  bucketName = 'assets',
  folder = '',
  allowedTypes = [], // Empty means all types allowed
  maxSizeMB = 50, // Default to 50MB
  className = ''
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Convert maxSizeMB to bytes
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
  // Clean up the selected file when the component unmounts
  useEffect(() => {
    return () => {
      if (selectedFile) {
        // Release any object URLs we might have created
        URL.revokeObjectURL(URL.createObjectURL(selectedFile));
      }
    };
  }, [selectedFile]);
  
  // Handle drag events
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  // Validate the file
  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxSizeBytes) {
      onError?.(`File is too large. Maximum size is ${maxSizeMB}MB.`);
      return false;
    }
    
    // Check file type if allowedTypes is not empty
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      onError?.(`File type not allowed. Allowed types: ${allowedTypes.join(', ')}`);
      return false;
    }
    
    return true;
  };
  
  // Handle file selection
  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
    }
  };
  
  // Handle drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };
  
  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };
  
  // Trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  // Remove selected file
  const handleRemoveFile = () => {
    setSelectedFile(null);
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Upload file to Supabase Storage
  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setUploadProgress(10); // Start progress
    
    try {
      // Simulate progress updates (since Supabase doesn't provide progress events)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + Math.floor(Math.random() * 10);
          return newProgress > 90 ? 90 : newProgress; // Cap at 90% until complete
        });
      }, 300);
      
      // Upload the file
      const fileInfo = await storageService.uploadFile(selectedFile, bucketName, folder);
      
      // Clear the interval and set progress to 100%
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Pass the file info to the parent component
      onFileUpload(fileInfo);
      
      // Reset the component state after a short delay
      setTimeout(() => {
        setSelectedFile(null);
        setIsUploading(false);
        setUploadProgress(0);
        
        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 1000);
    } catch (error) {
      // Handle upload error
      setIsUploading(false);
      setUploadProgress(0);
      onError?.(error instanceof Error ? error.message : 'Failed to upload file');
    }
  };
  
  // Get appropriate icon for file type
  const getFileIcon = (file: File) => {
    const type = file.type.split('/')[0];
    switch (type) {
      case 'image':
        return <FiImage className="mr-2 text-blue-500" />;
      case 'video':
        return <FiVideo className="mr-2 text-purple-500" />;
      case 'audio':
        return <FiMusic className="mr-2 text-yellow-500" />;
      case 'text':
      case 'application':
        return <FiFileText className="mr-2 text-green-500" />;
      default:
        return <FiFile className="mr-2 text-gray-500" />;
    }
  };
  
  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  return (
    <div className={`${className}`}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        className="hidden"
        accept={allowedTypes.length > 0 ? allowedTypes.join(',') : undefined}
        aria-label="File upload input"
      />
      
      {/* Drag and drop area */}
      {!selectedFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <FiUpload className="mx-auto h-10 w-10 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Drag and drop a file here, or click to select a file
          </p>
          {allowedTypes.length > 0 && (
            <p className="mt-1 text-xs text-gray-500">
              Allowed types: {allowedTypes.join(', ')}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Maximum size: {maxSizeMB}MB
          </p>
        </div>
      ) : (
        // Selected file preview
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              {getFileIcon(selectedFile)}
              <div className="overflow-hidden">
                <p className="font-medium text-gray-900 truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-gray-400 hover:text-gray-500"
              disabled={isUploading}
              aria-label="Remove file"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
          
          {/* Progress bar */}
          {isUploading && (
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
          
          {/* Upload button */}
          <button
            type="button"
            onClick={handleUpload}
            disabled={isUploading}
            className={`mt-2 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isUploading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
            }`}
          >
            {isUploading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </span>
            ) : uploadProgress === 100 ? (
              <span className="flex items-center justify-center">
                <FiCheckCircle className="mr-2" />
                Upload Complete
              </span>
            ) : (
              'Upload File'
            )}
          </button>
        </div>
      )}
    </div>
  );
} 