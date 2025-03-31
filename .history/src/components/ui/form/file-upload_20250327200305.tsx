import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { FileInfo } from '@services/storageService';

interface FileUploadProps {
  onFileUpload: (fileInfo: FileInfo) => void;
  onError: (error: string) => void;
  className?: string;
}

export function FileUpload({
  onFileUpload,
  onError,
  className,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setError(null);
      
      try {
        // TODO: Implement file upload to storage service
        // For now, we'll create a mock FileInfo
        const fileInfo: FileInfo = {
          url: URL.createObjectURL(selectedFile),
          type: selectedFile.type,
          size: selectedFile.size,
          name: selectedFile.name,
        };
        onFileUpload(fileInfo);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to upload file';
        setError(errorMessage);
        onError(errorMessage);
      }
    }
  }, [onFileUpload, onError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'video/*': ['.mp4', '.webm'],
      'audio/*': ['.mp3', '.wav'],
    },
    maxSize: 5242880, // 5MB
    multiple: false,
  });

  const handleRemove = () => {
    setFile(null);
    setError(null);
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
          isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300',
          file ? 'bg-gray-50' : 'hover:border-primary/50'
        )}
      >
        <input {...getInputProps()} />
        {file ? (
          <div className="flex items-center justify-center space-x-2">
            <span className="text-sm text-gray-600">{file.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <Upload className="h-8 w-8 text-gray-400" />
            <div className="text-sm text-gray-600">
              {isDragActive ? (
                <p>Drop the file here</p>
              ) : (
                <p>Drag and drop a file here, or click to select</p>
              )}
            </div>
            <div className="text-xs text-gray-500">
              Max file size: 5MB
            </div>
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
} 