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
  create: async (project: any) => {
    const response = await api.post('/api/projects', project);
    return response.data;
  },
  update: async (id: string, project: any) => {
    const response = await api.put(`/api/projects/${id}`, project);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/api/projects/${id}`);
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
      // Try to get data from the dedicated scraper server
      const response = await axios.get('http://localhost:3030/api/data');
      return response.data;
    } catch (error) {
      // If that fails, try a local fallback endpoint or path
      console.error('Failed to fetch data from scraper server:', error);
      
      // You might implement a fallback here to local JSON data
      // For now, we'll just re-throw the error
      throw error;
    }
  },
  runScraper: async (url: string, options: any = {}) => {
    const response = await api.post('/api/scrape', { url, options });
    return response.data;
  }
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

// API service for handling all Supabase database operations
export const organizationService = {
  // ... existing code ...
};

export const projectService = {
  // ... existing code ...
};

export const assetService = {
  // ... existing code ...
};

// Export all services
export const services = {
  projects: projectsService,
  scraping: scrapingService,
  users: userService,
  organizations: organizationService,
  projects: projectService,
  assets: assetService,
}; 