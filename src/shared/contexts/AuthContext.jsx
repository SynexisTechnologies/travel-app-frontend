import { createContext, useContext, useState, useEffect } from "react";
import apiInstance, { setupInterceptors } from "@/shared/api/apiInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  // Set up axios interceptors
  useEffect(() => {
    const cleanupInterceptors = setupInterceptors(logout);
    return cleanupInterceptors;
  }, []);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const userData = localStorage.getItem("user");
          if (userData) {
            setUser(JSON.parse(userData));
          }
        } catch (error) {
          console.error("Token validation failed:", error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await apiInstance.post("/users/login", {
        email,
        password,
      });

      const {
        user: userData,
        token: newToken,
        refreshToken: newRefreshToken,
      } = response.data;

      setUser(userData);
      setToken(newToken);
      setRefreshToken(newRefreshToken);

      // Store in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", newToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiInstance.post("/users/register", userData);

      const { user: newUser, token: newToken } = response.data;

      setUser(newUser);
      setToken(newToken);

      // Store in localStorage
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("token", newToken);

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
