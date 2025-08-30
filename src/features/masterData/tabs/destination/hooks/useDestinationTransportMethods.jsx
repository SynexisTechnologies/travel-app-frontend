import { useEffect, useState } from "react";

import {
  getDestinationTransportMethods,
  createDestinationTransportMethod,
  updateDestinationTransportMethod,
  deleteDestinationTransportMethod,
  getDestinationTransportMethodById,
} from "../api/destinationMasterApi";

export const useDestinationTransportMethods = ({
  messageApi,
  autoLoad = true,
}) => {
  const [transportMethods, setTransportMethods] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTransportMethods = async () => {
    setLoading(true);
    try {
      const response = await getDestinationTransportMethods();
      setTransportMethods(response.data.data || []);
    } catch (error) {
      messageApi.error("Error loading transport methods");
    } finally {
      setLoading(false);
    }
  };

  const loadSingleTransportMethod = async (id) => {
    setLoading(true);
    try {
      const response = await getDestinationTransportMethodById(id);
      return response.data.data;
    } catch (error) {
      messageApi.error("Error loading transport method");
    } finally {
      setLoading(false);
    }
  };

  const createTransportMethod = async (data) => {
    try {
      await createDestinationTransportMethod(data);
      messageApi.success("Transport method created successfully!");
      loadTransportMethods();
    } catch (error) {
      messageApi.error("Failed to create transport method");
      throw error;
    }
  };

  const updateTransportMethod = async (id, data) => {
    try {
      await updateDestinationTransportMethod(id, data);
      messageApi.success("Transport method updated successfully!");
      loadTransportMethods();
    } catch (error) {
      messageApi.error("Failed to update transport method");
      throw error;
    }
  };

  const deleteTransportMethod = async (id) => {
    try {
      await deleteDestinationTransportMethod(id);
      messageApi.success("Transport method deleted successfully!");
      loadTransportMethods();
    } catch (error) {
      messageApi.error("Failed to delete transport method");
      throw error;
    }
  };

  // Auto-load data only when autoLoad is true
  useEffect(() => {
    if (autoLoad) {
      loadTransportMethods();
    }
  }, [autoLoad]);

  return {
    transportMethods,
    loading,
    loadTransportMethods,
    loadSingleTransportMethod,
    createTransportMethod,
    updateTransportMethod,
    deleteTransportMethod,
  };
};
