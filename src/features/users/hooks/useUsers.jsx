import { useEffect, useState } from "react";
import { message } from "antd";

import {
  getUserById,
  getUsers,
  registerUser,
  updateUser,
  updateUserStatus,
} from "../api/userApi";
import { getUserConfigs } from "../config/getUserConfigs";
import { useAuth } from "@/shared";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [messageApi, contextHolder] = message.useMessage();

  const { user } = useAuth();

  const fetchUsers = async () => {
    const roleName = getUserConfigs().getRoleName(selectedTab);
    const params =
      roleName !== "All"
        ? { role: roleName, ...pagination }
        : { ...pagination };
    setLoading(true);
    try {
      const res = await getUsers(params);
      setUsers(res.data.users);
      setPagination(res.data.pagination);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      messageApi.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, pagination.limit, selectedTab]);

  const getSingleUser = async (userId) => {
    try {
      const { data } = await getUserById(userId);
      return data.user;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      messageapi.error("Failed to fetch user");
    }
  };

  const addUser = async (user) => {
    try {
      await registerUser(user);
      messageApi.success("User created successfully");
    } catch (error) {
      messageApi.error(`Failed to create user: ${error.message}`);
    } finally {
      fetchUsers();
    }
  };

  const updateAnUser = async (userId, user) => {
    try {
      await updateUser(userId, user);
      messageApi.success("User updated successfully");
    } catch (error) {
      messageApi.error("Failed to update user");
    } finally {
      fetchUsers();
    }
  };

  const updateAnUserStatus = async (id, status) => {
    try {
      if (user?.id === id) {
        messageApi.error("You can't update your own status");
        return;
      }
      const newStatus = status == true ? 1 : 0;
      await updateUserStatus(id, newStatus);
      messageApi.success("User status updated successfully");
    } catch (error) {
      console.error("Failed to update user status:", error);
      messageApi.error("Failed to update user status");
    } finally {
      fetchUsers();
    }
  };

  return {
    users,
    loading,
    addUser,
    updateAnUser,
    getSingleUser,
    updateAnUserStatus,
    selectedTab,
    setSelectedTab,
    pagination,
    setPagination,
    contextHolder,
  };
};
