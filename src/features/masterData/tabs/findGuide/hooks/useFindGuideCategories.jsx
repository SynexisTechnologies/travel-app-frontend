import { useState, useEffect, useCallback } from "react";
import { message } from "antd";

import {
  getFindGuideCategories,
  createFindGuideCategory,
  updateFindGuideCategory,
  deleteFindGuideCategory,
  getFindGuideCategoryById,
} from "../api/findGuideMasterApi";

export const useFindGuideCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getFindGuideCategories();
      setCategories(response.data.data || []);
    } catch (error) {
      messageApi.error("Error loading find guide categories");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadSingleCategory = useCallback(async (id) => {
    try {
      const response = await getFindGuideCategoryById(id);
      return response.data.data;
    } catch (error) {
      messageApi.error("Error loading find guide category");
      throw error;
    }
  }, []);

  const createCategory = useCallback(
    async (data) => {
      try {
        const response = await createFindGuideCategory(data);
        messageApi.success("Find guide category created successfully!");
        await loadCategories();
        return response.data;
      } catch (error) {
        messageApi.error("Error creating find guide category");
        throw error;
      }
    },
    [loadCategories]
  );

  const updateCategory = useCallback(
    async (id, data) => {
      try {
        const response = await updateFindGuideCategory(id, data);
        messageApi.success("Find guide category updated successfully!");
        await loadCategories();
        return response.data;
      } catch (error) {
        messageApi.error("Error updating find guide category");
        throw error;
      }
    },
    [loadCategories]
  );

  const deleteCategory = useCallback(
    async (id) => {
      try {
        await deleteFindGuideCategory(id);
        messageApi.success("Find guide category deleted successfully!");
        await loadCategories();
      } catch (error) {
        messageApi.error("Error deleting find guide category");
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
