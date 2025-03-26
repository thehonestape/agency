import { supabase } from '../lib/supabase';
import { PostgrestError } from '@supabase/supabase-js';

// Asset types
export type AssetType = 'image' | 'document' | 'video' | 'audio' | 'other';

export interface Asset {
  id: string;
  project_id: string;
  type: AssetType;
  file_url: string;
  version: number;
  metadata: Record<string, any>;
  content?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export type InsertAsset = Omit<Asset, 'id' | 'created_at' | 'updated_at'>;

export type UpdateAsset = Partial<Omit<Asset, 'id' | 'project_id' | 'created_at' | 'updated_at'>>;

// Get all assets
export async function getAll(): Promise<Asset[]> {
  try {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data as Asset[];
  } catch (error) {
    console.error('Error fetching assets:', error);
    throw error;
  }
}

// Get assets by project ID
export async function getByProjectId(projectId: string): Promise<Asset[]> {
  try {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data as Asset[];
  } catch (error) {
    console.error(`Error fetching assets for project ${projectId}:`, error);
    throw error;
  }
}

// Get asset by ID
export async function getById(id: string): Promise<Asset> {
  try {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return data as Asset;
  } catch (error) {
    console.error(`Error fetching asset ${id}:`, error);
    throw error;
  }
}

// Create a new asset
export async function create(asset: InsertAsset): Promise<Asset> {
  try {
    const { data, error } = await supabase
      .from('assets')
      .insert(asset)
      .select()
      .single();
    
    if (error) throw error;
    
    return data as Asset;
  } catch (error) {
    console.error('Error creating asset:', error);
    throw error;
  }
}

// Update an asset
export async function update(id: string, updates: UpdateAsset): Promise<Asset> {
  try {
    const { data, error } = await supabase
      .from('assets')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return data as Asset;
  } catch (error) {
    console.error(`Error updating asset ${id}:`, error);
    throw error;
  }
}

// Delete an asset
export async function delete_(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('assets')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error(`Error deleting asset ${id}:`, error);
    throw error;
  }
}

export const assetService = {
  getAll,
  getByProjectId,
  getById,
  create,
  update,
  delete: delete_
};

export default assetService; 