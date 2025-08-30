import { useEffect, useState } from "react";

import {
  getDestinationCategories,
  createDestinationCategory,
  updateDestinationCategory,
  deleteDestinationCategory,
  getDestinationCategoryById,
} from "../api/destinationMasterApi";

export const useDestinationCategories = ({ messageApi, autoLoad = true }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const response = await getDestinationCategories();
      setCategories(response.data.data || []);
    } catch (error) {
      messageApi.error("Error loading destination categories");
    } finally {
      setLoading(false);
    }
  };

  const loadSingleCategory = async (id) => {
    setLoading(true);
    try {
      const response = await getDestinationCategoryById(id);
      return response.data.data;
    } catch (error) {
      messageApi.error("Error loading destination category");
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (data) => {
    try {
      await createDestinationCategory(data);
      messageApi.success("Category created successfully!");
      loadCategories();
    } catch (error) {
      messageApi.error("Failed to create category");
      throw error;
    }
  };

  const updateCategory = async (id, data) => {
    try {
      await updateDestinationCategory(id, data);
      messageApi.success("Category updated successfully!");
      loadCategories();
    } catch (error) {
      messageApi.error("Failed to update category");
      throw error;
    }
  };

  const deleteCategory = async (id) => {
    try {
      await deleteDestinationCategory(id);
      messageApi.success("Category deleted successfully!");
      loadCategories();
    } catch (error) {
      messageApi.error("Failed to delete category");
      throw error;
    }
  };

  // Auto-load data only when autoLoad is true
  useEffect(() => {
    if (autoLoad) {
      loadCategories();
    }
  }, [autoLoad]);

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
