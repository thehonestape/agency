import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

// Define file types for validation
export type AllowedFileType = 'image' | 'document' | 'video' | 'audio' | 'other';

// File metadata interface
export interface FileInfo {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  bucket: string;
  path: string;
  created_at: string;
}

// Map of allowed MIME types
const ALLOWED_MIME_TYPES: Record<AllowedFileType, string[]> = {
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'text/csv'],
  video: ['video/mp4', 'video/webm', 'video/ogg'],
  audio: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  other: ['application/octet-stream'] // Generic file type
};

// Map file MIME type to our asset type
export function getAssetTypeFromMimeType(mimeType: string): AllowedFileType {
  for (const [type, mimeTypes] of Object.entries(ALLOWED_MIME_TYPES)) {
    if (mimeTypes.includes(mimeType)) {
      return type as AllowedFileType;
    }
  }
  return 'other';
}

// Generate a unique filename to avoid collisions
function generateUniqueFilename(originalName: string): string {
  const fileExtension = originalName.split('.').pop() || '';
  const uniqueId = uuidv4();
  return `${uniqueId}.${fileExtension}`;
}

// Upload a file to Supabase Storage
export async function uploadFile(
  file: File,
  bucketName: string = 'assets',
  folder: string = ''
): Promise<FileInfo> {
  try {
    // Create the bucket if it doesn't exist
    const { data: bucketData, error: bucketError } = await supabase.storage.getBucket(bucketName);
    
    if (bucketError && bucketError.message.includes('does not exist')) {
      const { error: createError } = await supabase.storage.createBucket(bucketName, {
        public: false,
        fileSizeLimit: 52428800 // 50MB
      });
      
      if (createError) throw createError;
    } else if (bucketError) {
      throw bucketError;
    }
    
    // Generate a unique filename
    const uniqueFilename = generateUniqueFilename(file.name);
    
    // Construct the file path (with folder if provided)
    const filePath = folder ? `${folder}/${uniqueFilename}` : uniqueFilename;
    
    // Upload the file
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) throw error;
    
    if (!data) {
      throw new Error('Upload completed but no data returned');
    }
    
    // Get the public URL
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);
    
    return {
      id: data.id || uuidv4(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: urlData.publicUrl,
      bucket: bucketName,
      path: data.path,
      created_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

// Delete a file from Supabase Storage
export async function deleteFile(path: string, bucket: string = 'assets'): Promise<void> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

// List files in a bucket/folder
export async function listFiles(bucket: string = 'assets', folder: string = ''): Promise<FileInfo[]> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder);
    
    if (error) throw error;
    
    if (!data) return [];
    
    // Map the response to our FileInfo interface
    return data.map(item => {
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(folder ? `${folder}/${item.name}` : item.name);
      
      return {
        id: item.id,
        name: item.name,
        size: item.metadata?.size || 0,
        type: item.metadata?.mimetype || 'application/octet-stream',
        url: urlData.publicUrl,
        bucket,
        path: folder ? `${folder}/${item.name}` : item.name,
        created_at: item.created_at
      };
    });
  } catch (error) {
    console.error('Error listing files:', error);
    throw error;
  }
}

// Get a single file's info
export async function getFileInfo(path: string, bucket: string = 'assets'): Promise<FileInfo | null> {
  try {
    // We can't directly get a single file's metadata from Supabase Storage
    // So we need to check if the file exists by trying to download it
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(path);
    
    if (error) {
      if (error.message.includes('does not exist')) {
        return null;
      }
      throw error;
    }
    
    // Get the public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    
    // Get the file name from the path
    const name = path.split('/').pop() || path;
    
    return {
      id: path, // Using path as ID since we don't have a real ID
      name,
      size: data.size,
      type: data.type,
      url: urlData.publicUrl,
      bucket,
      path,
      created_at: new Date().toISOString() // We don't have the created_at time
    };
  } catch (error) {
    console.error('Error getting file info:', error);
    throw error;
  }
}

export const storageService = {
  uploadFile,
  deleteFile,
  listFiles,
  getFileInfo,
  getAssetTypeFromMimeType
};

export default storageService; 