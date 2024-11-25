import { useEffect } from 'react';
import apiClient from './apiClient';

const useAutoRefresh = () => {
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                await apiClient.post('/auth/refresh');
                console.log('Token refreshed successfully');
            } catch (error:any) {
                console.error('Token refresh failed:', error.message);
                clearInterval(interval); // Stop refreshing on failure
            }
        }, 10 * 60 * 1000); // Refresh every 10 minutes

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);
};

export default useAutoRefresh;
