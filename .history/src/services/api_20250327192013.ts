// api.ts - Service for handling API requests

import axios from 'axios';
import { supabase } from '../lib/supabase';

// Base URL for API requests
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Project service
export const projectsService = {
  getAll: async () => {
    const response = await api.get('/api/projects');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/api/projects/${id}`);
    return response.data;
  },
};

// Scraping service
export const scrapingService = {
  scrapeUrl: async (url: string) => {
    const response = await api.post('/api/scrape', { url });
    return response.data;
  },
  getData: async () => {
    try {
      const response = await api.get('/api/scrape/data');
      return response.data;
    } catch (error) {
      console.error('Error fetching scraper data:', error);
      throw error;
    }
  },
  runScraper: async (url: string, options: any = {}) => {
    const response = await api.post('/api/scrape', { url, options });
    return response.data;
  },
};

// User service
export const userService = {
  getProfile: async () => {
    const response = await api.get('/api/user/profile');
    return response.data;
  },
  updateProfile: async (data: any) => {
    const response = await api.put('/api/user/profile', data);
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await api.get('/api/users/me');
    return response.data;
  },
};

// Organization service
export const organizationService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('organizations')
      .select('*');
    if (error) throw error;
    return data;
  },
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('organizations')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },
};

// Asset service
export const assetService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('assets')
      .select('*');
    if (error) throw error;
    return data;
  },
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },
  delete: async (id: string) => {
    const { error } = await supabase
      .from('assets')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  }
};

// Export all services
export const services = {
  organizations: organizationService,
  projects: projectsService,
  assets: assetService,
  scraping: scrapingService,
  users: userService,
}; 