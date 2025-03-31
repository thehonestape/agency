import { supabase } from '../lib/supabase';

export interface BrandMemory {
  id: string;
  brandId: string;
  context: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface BrandContext {
  brandId: string;
  name: string;
  description?: string;
  guidelines?: string;
  tone?: string;
  values?: string[];
  keywords?: string[];
}

export const brandMemoryService = {
  async getBrandContext(brandId: string): Promise<BrandContext | null> {
    const { data, error } = await supabase
      .from('brand_contexts')
      .select('*')
      .eq('brandId', brandId)
      .single();

    if (error) {
      console.error('Error fetching brand context:', error);
      return null;
    }

    return data;
  },

  async updateBrandContext(brandId: string, context: Partial<BrandContext>): Promise<boolean> {
    const { error } = await supabase
      .from('brand_contexts')
      .upsert({
        brandId,
        ...context,
        updatedAt: new Date().toISOString()
      });

    if (error) {
      console.error('Error updating brand context:', error);
      return false;
    }

    return true;
  },

  async addMemory(brandId: string, context: Record<string, any>): Promise<BrandMemory | null> {
    const { data, error } = await supabase
      .from('brand_memories')
      .insert({
        brandId,
        context,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding brand memory:', error);
      return null;
    }

    return data;
  },

  async getMemories(brandId: string): Promise<BrandMemory[]> {
    const { data, error } = await supabase
      .from('brand_memories')
      .select('*')
      .eq('brandId', brandId)
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error fetching brand memories:', error);
      return [];
    }

    return data || [];
  }
}; 