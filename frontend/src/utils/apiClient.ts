import axios from 'axios';
import { useAsyncValue } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Create an Axios instance
const apiClient = axios.create({
    baseURL: 'http://localhost:8700/api', 
    withCredentials: true, // Include cookies with requests
});



export default apiClient;
