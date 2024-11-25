import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
    baseURL: 'http://localhost:8700/api', 
    withCredentials: true, // Include cookies with requests
});

// Add a response interceptor to handle token refresh automatically
apiClient.interceptors.response.use(
    response => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            try {
                // Attempt to refresh the token
                await apiClient.post('/auth/refresh');
                // Retry the original request
                error.config._retry = true;
                return apiClient(error.config);
            } catch (refreshError) {
                // Handle failed token refresh (e.g., logout user)
                console.error('Token refresh failed', refreshError);
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
