
import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'https://uhapi.jeebendu.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // You can add additional headers here if needed
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle response errors (like 401 Unauthorized)
    if (error.response && error.response.status === 401) {
      // Redirect to login or refresh token logic can go here
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Optional: redirect to login page
    }
    
    return Promise.reject(error);
  }
);

export default api;
