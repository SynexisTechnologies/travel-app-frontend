import { useState, useEffect, useCallback } from "react";
import { message } from "antd";

import {
  getEventCategories,
  createEventCategory,
  updateEventCategory,
  deleteEventCategory,
  getEventCategoryById,
} from "../api/eventMasterApi";

export const useEventCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getEventCategories();
      setCategories(response.data.data || []);
    } catch (error) {
      messageApi.error("Error loading event categories");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadSingleCategory = useCallback(async (id) => {
    try {
      const response = await getEventCategoryById(id);
      return response.data.data;
    } catch (error) {
      messageApi.error("Error loading event category");
      throw error;
    }
  }, []);

  const createCategory = useCallback(
    async (data) => {
      try {
        const response = await createEventCategory(data);
        messageApi.success("Event category created successfully!");
        await loadCategories();
        return response.data;
      } catch (error) {
        messageApi.error("Error creating event category");
        throw error;
      }
    },
    [loadCategories]
  );

  const updateCategory = useCallback(
    async (id, data) => {
      try {
        const response = await updateEventCategory(id, data);
        messageApi.success("Event category updated successfully!");
        await loadCategories();
        return response.data;
      } catch (error) {
        messageApi.error("Error updating event category");
        throw error;
      }
    },
    [loadCategories]
  );

  const deleteCategory = useCallback(
    async (id) => {
      try {
        await deleteEventCategory(id);
        messageApi.success("Event category deleted successfully!");
        await loadCategories();
      } catch (error) {
        messageApi.error("Error deleting event category");
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
