import { useState, useEffect, useCallback } from "react";
import { message } from "antd";

import {
  getActivityCategories,
  createActivityCategory,
  updateActivityCategory,
  deleteActivityCategory,
  getActivityCategoryById,
} from "../api/activityMasterApi";

export const useActivityCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getActivityCategories();
      setCategories(response.data.data || []);
    } catch (error) {
      messageApi.error("Error loading activity categories");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadSingleCategory = useCallback(async (id) => {
    try {
      const response = await getActivityCategoryById(id);
      return response.data.data;
    } catch (error) {
      messageApi.error("Error loading activity category");
      throw error;
    }
  }, []);

  const createCategory = useCallback(
    async (data) => {
      try {
        const response = await createActivityCategory(data);
        messageApi.success("Activity category created successfully!");
        await loadCategories();
        return response.data;
      } catch (error) {
        messageApi.error("Error creating activity category");
        throw error;
      }
    },
    [loadCategories]
  );

  const updateCategory = useCallback(
    async (id, data) => {
      try {
        const response = await updateActivityCategory(id, data);
        messageApi.success("Activity category updated successfully!");
        await loadCategories();
        return response.data;
      } catch (error) {
        messageApi.error("Error updating activity category");
        throw error;
      }
    },
    [loadCategories]
  );

  const deleteCategory = useCallback(
    async (id) => {
      try {
        await deleteActivityCategory(id);
        messageApi.success("Activity category deleted successfully!");
        await loadCategories();
      } catch (error) {
        messageApi.error("Error deleting activity category");
        throw error;
      }
    },
    [loadCategories]
  );

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,
    loadCategories,
    loadSingleCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    contextHolder,
  };
};
