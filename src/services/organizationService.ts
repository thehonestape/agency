import { supabase } from '../lib/supabase';
import type { Database } from '../types/database.types';

export type Organization = Database['public']['Tables']['organizations']['Row'];
export type InsertOrganization = Database['public']['Tables']['organizations']['Insert'];
export type UpdateOrganization = Database['public']['Tables']['organizations']['Update'];

export const organizationService = {
  // Get all organizations
  async getAll(): Promise<Organization[]> {
    const { data, error } = await supabase
      .from('organizations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching organizations:', error);
      throw error;
    }
    
    return data || [];
  },
  
  // Get organization by ID
  async getById(id: string): Promise<Organization | null> {
    const { data, error } = await supabase
      .from('organizations')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching organization with ID ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  // Create a new organization
  async create(organization: InsertOrganization): Promise<Organization> {
    const { data, error } = await supabase
      .from('organizations')
      .insert(organization)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating organization:', error);
      throw error;
    }
    
    return data;
  },
  
  // Update an organization
  async update(id: string, updates: UpdateOrganization): Promise<Organization> {
    const { data, error } = await supabase
      .from('organizations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating organization with ID ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  // Delete an organization
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('organizations')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting organization with ID ${id}:`, error);
      throw error;
    }
  }
}; 