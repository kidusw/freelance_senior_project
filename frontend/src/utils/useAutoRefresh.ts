import { useEffect } from "react";
import apiClient from "./apiClient";

const useAutoRefresh = () => {
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const refreshResponse = await apiClient.post("/auth/refresh");
                const newAccessToken = refreshResponse.data.token;
                // Update token storage
                if(!newAccessToken) console.log("no access token");
                console.log("Token refreshed successfully");
            } catch (error:any) {
                console.error("Token refresh failed:", error.message);
                localStorage.clear(); // Clear stored tokens
                window.location.href = "/login"; // Redirect to login
                clearInterval(interval); // Stop refreshing on failure
            }
        }, 4.5 * 60 * 1000); // Refresh every 5 minutes

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);
};

export default useAutoRefresh;
