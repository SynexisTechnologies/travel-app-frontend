import { useState, useEffect, useCallback } from "react";
import { message } from "antd";

import {
  getServiceCategories,
  createServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
  getServiceCategoryById,
} from "../api/serviceMasterApi";

export const useServiceCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getServiceCategories();
      setCategories(response.data.data || []);
    } catch (error) {
      messageApi.error("Error loading service categories");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadSingleCategory = useCallback(async (id) => {
    try {
      const response = await getServiceCategoryById(id);
      return response.data.data;
    } catch (error) {
      messageApi.error("Error loading single service category");
      throw error;
    }
  }, []);

  const createCategory = useCallback(
    async (data) => {
      try {
        const response = await createServiceCategory(data);
        messageApi.success("Service category created successfully!");
        await loadCategories();
        return response.data;
      } catch (error) {
        messageApi.error("Error creating service category");
        throw error;
      }
    },
    [loadCategories]
  );

  const updateCategory = useCallback(
    async (id, data) => {
      try {
        const response = await updateServiceCategory(id, data);
        messageApi.success("Service category updated successfully!");
        await loadCategories();
        return response.data;
      } catch (error) {
        messageApi.error("Error updating service category");
        throw error;
      }
    },
    [loadCategories]
  );

  const deleteCategory = useCallback(
    async (id) => {
      try {
        await deleteServiceCategory(id);
        messageApi.success("Service category deleted successfully!");
        await loadCategories();
      } catch (error) {
        messageApi.error("Error deleting service category");
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
