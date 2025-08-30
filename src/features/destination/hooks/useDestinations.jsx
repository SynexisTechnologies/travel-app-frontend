import { useEffect, useState } from "react";
import {
  getDestinations,
  createDestination,
  updateDestination,
  deleteDestination,
  getDestinationCategories,
  getTransportMethods,
  getTravelTypes,
} from "../api/destinationApi";

export const useDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const res = await getDestinations();
      setDestinations(res.data);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleAdd = async (destination) => {
    try {
      await createDestination(destination);
      fetchDestinations();
    } catch (error) {
      console.error("Error creating destination:", error);
      throw error;
    }
  };

  const handleEdit = async (destinationId, destination) => {
    try {
      await updateDestination(destinationId, destination);
      fetchDestinations();
    } catch (error) {
      console.error("Error updating destination:", error);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDestination(id);
      fetchDestinations();
    } catch (error) {
      console.error("Error deleting destination:", error);
      throw error;
    }
  };

  return {
    destinations,
    loading,
    handleAdd,
    handleEdit,
    handleDelete,
    fetchDestinations,
  };
};

export const useDestinationCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await getDestinationCategories();
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    fetchCategories,
  };
};

export const useTransportMethods = () => {
  const [transportMethods, setTransportMethods] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransportMethods = async () => {
    try {
      setLoading(true);
      const res = await getTransportMethods();
      setTransportMethods(res.data);
    } catch (error) {
      console.error("Error fetching transport methods:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransportMethods();
  }, []);

  return {
    transportMethods,
    loading,
    fetchTransportMethods,
  };
};

export const useTravelTypes = () => {
  const [travelTypes, setTravelTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTravelTypes = async () => {
    try {
      setLoading(true);
      const res = await getTravelTypes();
      setTravelTypes(res.data);
    } catch (error) {
      console.error("Error fetching travel types:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTravelTypes();
  }, []);

  return {
    travelTypes,
    loading,
    fetchTravelTypes,
  };
};
