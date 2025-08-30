import { useState, useEffect, useCallback } from "react";

import {
  getAccommodationFacilities,
  createAccommodationFacility,
  updateAccommodationFacility,
  deleteAccommodationFacility,
  getAccommodationFacilityById,
} from "../api/accommodationMasterApi";

export const useAccommodationFacilities = ({ messageApi, autoLoad = true }) => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadFacilities = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAccommodationFacilities();
      setFacilities(response.data.data);
    } catch (error) {
      messageApi.error("Error loading accommodation facilities");
    } finally {
      setLoading(false);
    }
  }, [messageApi]);

  const loadSingleFacility = useCallback(
    async (id) => {
      try {
        const response = await getAccommodationFacilityById(id);
        return response.data.data;
      } catch (error) {
        messageApi.error("Error loading accommodation facility");
        throw error;
      }
    },
    [messageApi]
  );

  const createFacility = useCallback(
    async (data) => {
      try {
        const response = await createAccommodationFacility(data);
        messageApi.success("Accommodation facility created successfully!");
        await loadFacilities();
        return response.data;
      } catch (error) {
        messageApi.error("Error creating accommodation facility");
        throw error;
      }
    },
    [loadFacilities, messageApi]
  );

  const updateFacility = useCallback(
    async (id, data) => {
      try {
        const response = await updateAccommodationFacility(id, data);
        messageApi.success("Accommodation facility updated successfully!");
        await loadFacilities();
        return response.data;
      } catch (error) {
        messageApi.error("Error updating accommodation facility");
        throw error;
      }
    },
    [loadFacilities, messageApi]
  );

  const deleteFacility = useCallback(
    async (id) => {
      try {
        await deleteAccommodationFacility(id);
        messageApi.success("Accommodation facility deleted successfully!");
        await loadFacilities();
      } catch (error) {
        messageApi.error("Error deleting accommodation facility");
        throw error;
      }
    },
    [loadFacilities, messageApi]
  );

  // Auto-load data only when autoLoad is true
  useEffect(() => {
    if (autoLoad) {
      loadFacilities();
    }
  }, [autoLoad, loadFacilities]);

  return {
    facilities,
    loading,
    loadFacilities,
    loadSingleFacility,
    createFacility,
    updateFacility,
    deleteFacility,
  };
};
