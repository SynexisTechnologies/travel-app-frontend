import axios from "axios";

// Create axios instance with base configuration
const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set up interceptors
export const setupInterceptors = (logout: () => void) => {
  // Request interceptor to add token to headers
  const requestInterceptor = apiInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle token expiration
  const responseInterceptor = apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            const response = await axios.post(
              `${import.meta.env.VITE_API_URL}/users/refresh-token`,
              { refreshToken }
            );

            const newToken = response.data.token;
            localStorage.setItem("token", newToken);

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return apiInstance(originalRequest);
          } catch (refreshError) {
            // Refresh token is invalid, logout user
            console.error("Token refresh failed:", refreshError);
            logout();
            return Promise.reject(refreshError);
          }
        } else {
          // No refresh token, logout user
          logout();
        }
      }

      return Promise.reject(error);
    }
  );

  // Return cleanup function
  return () => {
    apiInstance.interceptors.request.eject(requestInterceptor);
    apiInstance.interceptors.response.eject(responseInterceptor);
  };
};

// Function to clear interceptors
export const clearInterceptors = () => {
  apiInstance.interceptors.request.clear();
  apiInstance.interceptors.response.clear();
};

export default apiInstance;
