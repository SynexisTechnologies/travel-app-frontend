import { useEffect, useState } from "react";

import {
  getDestinationTravelTypes,
  createDestinationTravelType,
  updateDestinationTravelType,
  deleteDestinationTravelType,
  getDestinationTravelTypeById,
} from "../api/destinationMasterApi";

export const useDestinationTravelTypes = ({ messageApi, autoLoad = true }) => {
  const [travelTypes, setTravelTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTravelTypes = async () => {
    setLoading(true);
    try {
      const response = await getDestinationTravelTypes();
      setTravelTypes(response.data.data || []);
    } catch (error) {
      messageApi.error("Error loading travel types");
    } finally {
      setLoading(false);
    }
  };

  const loadSingleTravelType = async (id) => {
    setLoading(true);
    try {
      const response = await getDestinationTravelTypeById(id);
      return response.data.data;
    } catch (error) {
      messageApi.error("Error loading travel type");
    } finally {
      setLoading(false);
    }
  };

  const createTravelType = async (data) => {
    try {
      await createDestinationTravelType(data);
      messageApi.success("Travel type created successfully!");
      loadTravelTypes();
    } catch (error) {
      messageApi.error("Failed to create travel type");
      throw error;
    }
  };

  const updateTravelType = async (id, data) => {
    try {
      await updateDestinationTravelType(id, data);
      messageApi.success("Travel type updated successfully!");
      loadTravelTypes();
    } catch (error) {
      messageApi.error("Failed to update travel type");
      throw error;
    }
  };

  const deleteTravelType = async (id) => {
    try {
      await deleteDestinationTravelType(id);
      messageApi.success("Travel type deleted successfully!");
      loadTravelTypes();
    } catch (error) {
      messageApi.error("Failed to delete travel type");
      throw error;
    }
  };

  // Auto-load data only when autoLoad is true
  useEffect(() => {
    if (autoLoad) {
      loadTravelTypes();
    }
  }, [autoLoad]);

  return {
    travelTypes,
    loading,
    loadTravelTypes,
    loadSingleTravelType,
    createTravelType,
    updateTravelType,
    deleteTravelType,
  };
};
