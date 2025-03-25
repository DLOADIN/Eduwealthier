// src/services/api.ts
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

export const useApi = () => {
  const { getToken, userId } = useAuth(); // Get Clerk's user ID
  
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  });

  // Add interceptors to include auth token and user ID
  api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token && userId) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['X-User-ID'] = userId; // Add Clerk user ID to headers
    }
    return config;
  });

  return api;
};