import React, { createContext, useContext, useState, useEffect } from "react";
import apiInstance, { setupInterceptors } from "@/shared/api/apiInstance";
import { AuthContextType, User, RegisterData, ChildrenProps } from "@/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken")
  );
  const [loading, setLoading] = useState<boolean>(true);

  const logout = (): void => {
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

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
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

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (
    userData: RegisterData
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await apiInstance.post("/users/register", userData);

      const { user: newUser, token: newToken } = response.data;

      setUser(newUser);
      setToken(newToken);

      // Store in localStorage
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("token", newToken);

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
