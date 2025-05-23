import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Token management functions
const getStoredToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

const setStoredToken = (token) => {
  if (!token) {
    localStorage.removeItem('token');
    return;
  }
  // Store token as is - no need to remove Bearer prefix as it should be handled by the server
  localStorage.setItem('token', token);
};

const clearStoredToken = () => {
  localStorage.removeItem('token');
};

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      // Add Bearer prefix if not present
      config.headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    // If response includes a new token, update it
    if (response.data?.token) {
      setStoredToken(response.data.token);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to verify/refresh token
        const token = getStoredToken();
        if (token) {
          console.log('Attempting token refresh with:', token);
          const response = await axios.post(`${API_URL}/auth/verify-token`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (response.data?.token) {
            setStoredToken(response.data.token);
            const newToken = response.data.token;
            api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            console.log('Token refreshed successfully:', newToken);
            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        clearStoredToken();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 401) {
      clearStoredToken();
      window.location.href = '/login';
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
      return Promise.reject({ message: 'Request timeout. Please try again.' });
    } else if (!error.response) {
      console.error('Network error:', error);
      return Promise.reject({ message: 'Network error. Please check your connection.' });
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      if (response.data?.token) {
        setStoredToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error.response?.data || { message: 'Failed to login' };
    }
  },
  register: async (username, password) => {
    try {
      const response = await api.post('/auth/register', { username, password });
      if (response.data?.token) {
        setStoredToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error.response?.data || { message: 'Failed to register' };
    }
  },
  getMe: async () => {
    try {
      const response = await api.get('/auth/me');
      if (response.data?.token) {
        setStoredToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Get user error:', error);
      throw error.response?.data || { message: 'Failed to get user data' };
    }
  },
  verifyToken: async () => {
    try {
      const token = getStoredToken();
      if (!token) {
        throw new Error('No token found');
      }
      const response = await api.post('/auth/verify-token');
      if (response.data?.token) {
        setStoredToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Token verification error:', error);
      throw error.response?.data || { message: 'Failed to verify token' };
    }
  },
  logout: () => {
    clearStoredToken();
    window.location.href = '/login';
  },
};

// Topics API
export const topicsAPI = {
  getTopics: async () => {
    try {
      const response = await api.get('/topics');
      return response.data;
    } catch (error) {
      console.error('Error fetching topics:', error);
      throw error.response?.data || { message: 'Failed to fetch topics' };
    }
  },
  updateProgress: async (topicId, subTopicId, completed) => {
    try {
      console.log('Updating progress:', { topicId, subTopicId, completed });
      
      if (!topicId || !subTopicId) {
        throw new Error('Topic ID and SubTopic ID are required');
      }

      const response = await api.post('/topics/progress', {
        topicId,
        subTopicId,
        completed,
      });

      console.log('Progress update response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating progress:', {
        error,
        topicId,
        subTopicId,
        completed,
        response: error.response?.data,
      });
      throw error.response?.data || { 
        message: 'Failed to update progress',
        details: error.message 
      };
    }
  },
};

export default api; 