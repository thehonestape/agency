// api.ts - Service for handling API requests

import axios from 'axios';

// Base URL for API requests
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3030';

// Configure axios defaults
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example service for a Projects API
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

// Scraping service for accessing web-scraper data
export const scrapingService = {
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
  
  // Additional scraping-related methods can be added here
  runScraper: async (url: string, options: any = {}) => {
    const response = await api.post('/api/scrape', { url, options });
    return response.data;
  }
};

// Brand service
export const brandService = {
  getAll: async () => {
    const response = await api.get('/api/brands');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/api/brands/${id}`);
    return response.data;
  },
  // Additional brand-related methods
};

// User service
export const userService = {
  getCurrentUser: async () => {
    const response = await api.get('/api/users/me');
    return response.data;
  },
  // Additional user-related methods
};

// Default export
export default {
  projects: projectsService,
  scraping: scrapingService,
  brands: brandService,
  users: userService,
}; 