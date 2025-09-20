import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { Spin } from "antd";
import { ChildrenProps } from "@/types";

const ProtectedRoute: React.FC<ChildrenProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Spin size="large" />;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
