import { useState, useEffect, useCallback } from "react";

import {
  getAccommodationCategories,
  createAccommodationCategory,
  updateAccommodationCategory,
  deleteAccommodationCategory,
  getAccommodationCategoryById,
} from "../api/accommodationMasterApi";

export const useAccommodationCategories = ({ messageApi, autoLoad = true }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAccommodationCategories();
      setCategories(response.data.data);
    } catch (error) {
      messageApi.error("Error loading accommodation categories");
    } finally {
      setLoading(false);
    }
  }, [messageApi]);

  const loadSingleCategory = useCallback(
    async (id) => {
      try {
        const response = await getAccommodationCategoryById(id);
        return response.data.data;
      } catch (error) {
        messageApi.error("Error loading accommodation category");
        throw error;
      }
    },
    [messageApi]
  );

  const createCategory = useCallback(
    async (data) => {
      try {
        const response = await createAccommodationCategory(data);
        messageApi.success("Accommodation category created successfully!");
        await loadCategories();
        return response.data;
      } catch (error) {
        messageApi.error("Error creating accommodation category");
        throw error;
      }
    },
    [loadCategories, messageApi]
  );

  const updateCategory = useCallback(
    async (id, data) => {
      try {
        const response = await updateAccommodationCategory(id, data);
        messageApi.success("Accommodation category updated successfully!");
        await loadCategories();
        return response.data;
      } catch (error) {
        messageApi.error("Error updating accommodation category");
        throw error;
      }
    },
    [loadCategories, messageApi]
  );

  const deleteCategory = useCallback(
    async (id) => {
      try {
        await deleteAccommodationCategory(id);
        messageApi.success("Accommodation category deleted successfully!");
        await loadCategories();
      } catch (error) {
        messageApi.error("Error deleting accommodation category");
        throw error;
      }
    },
    [loadCategories, messageApi]
  );

  // Auto-load data only when autoLoad is true
  useEffect(() => {
    if (autoLoad) {
      loadCategories();
    }
  }, [autoLoad, loadCategories]);

  return {
    categories,
    loading,
    loadCategories,
    loadSingleCategory,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
