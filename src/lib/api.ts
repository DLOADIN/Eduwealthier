import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

// Common headers and interceptors
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('clerk-db-jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/sign-in';
    }
    return Promise.reject(error);
  }
);

/**
 * Fetch mentors with filtering options
 */
export const getMentors = async (filters: {
  search?: string;
  min_price?: number;
  max_price?: number;
  categories?: string[];
  sort_by?: string;
}) => {
  try {
    const response = await api.get('/mentors', {
      params: {
        search: filters.search,
        min_price: filters.min_price,
        max_price: filters.max_price,
        categories: filters.categories?.join(','),
        sort_by: filters.sort_by,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching mentors:', error);
    throw error;
  }
};

/**
 * Fetch learning progress analytics
 */
export const getLearningProgress = async (timeRange: string) => {
  try {
    const response = await api.get('/analytics/learning-progress', {
      params: { time_range: timeRange },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching learning progress:', error);
    throw error;
  }
};

/**
 * Fetch personalized recommendations
 */
export const getRecommendations = async () => {
  try {
    const response = await api.get('/analytics/recommendations');
    return response.data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};

/**
 * Fetch video details
 */
export const getVideoDetail = async (videoId: string) => {
  try {
    const response = await api.get(`/videos/${videoId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw error;
  }
};

/**
 * Record video view
 */
export const recordVideoView = async (videoId: string, durationWatched: number) => {
  try {
    await api.post(`/videos/${videoId}`, {
      duration_watched: durationWatched,
    });
  } catch (error) {
    console.error('Error recording video view:', error);
    throw error;
  }
};

// Add more API functions as needed