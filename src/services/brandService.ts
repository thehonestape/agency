import { supabase } from '../lib/supabase';
import type { Database } from '../types/database.types';

export type Brand = Database['public']['Tables']['brands']['Row'];
export type InsertBrand = Database['public']['Tables']['brands']['Insert'];
export type UpdateBrand = Database['public']['Tables']['brands']['Update'];

export const brandService = {
  // Get all brands
  async getAll(): Promise<Brand[]> {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('creation_date', { ascending: false });
    
    if (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
    
    return data || [];
  },
  
  // Get brands by organization ID
  async getByOrganizationId(organizationId: string): Promise<Brand[]> {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('organization_id', organizationId)
      .order('creation_date', { ascending: false });
    
    if (error) {
      console.error(`Error fetching brands for organization ${organizationId}:`, error);
      throw error;
    }
    
    return data || [];
  },
  
  // Get brand by ID
  async getById(id: string): Promise<Brand | null> {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching brand with ID ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  // Create a new brand
  async create(brand: InsertBrand): Promise<Brand> {
    const { data, error } = await supabase
      .from('brands')
      .insert(brand)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating brand:', error);
      throw error;
    }
    
    return data;
  },
  
  // Update a brand
  async update(id: string, updates: UpdateBrand): Promise<Brand> {
    const { data, error } = await supabase
      .from('brands')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating brand with ID ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  // Delete a brand
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('brands')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting brand with ID ${id}:`, error);
      throw error;
    }
  }
}; 