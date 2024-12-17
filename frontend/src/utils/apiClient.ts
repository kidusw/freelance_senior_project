import axios from 'axios';
import { useAsyncValue } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Create an Axios instance
const apiClient = axios.create({
    baseURL: 'http://localhost:8700/api', 
    withCredentials: true, // Include cookies with requests
});

apiClient.interceptors.request.use(
    (config) => {
      // Get the token from localStorage
      const token = localStorage.getItem('adminToken');
      
      // If the token exists, attach it to the request headers
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


export default apiClient;
