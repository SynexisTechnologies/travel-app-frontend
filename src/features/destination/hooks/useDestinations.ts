import { useMemo, useState, useEffect } from "react";
import { useCrud } from "@/shared/hooks";
import type { DestinationData, DestinationAdditionalData } from "../types";
import {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
  getDestinationCategories,
  getTransportMethods,
  getTravelTypes,
  approveDestination,
  rejectDestination,
  updatePendingStatus,
} from "../api/destinationApi";

const STATUS_TABS = ["All", "Pending", "Approved", "Rejected"];

// Hook return type
export interface UseDestinationsReturn {
  data: DestinationData[];
  loading: boolean;
  paginationDetails: {
    current: number;
    pageSize: number;
    total: number;
    searchQuery?: string;
  };
  setPaginationDetails: (details: any) => void;
  loadOneItem: (id: string | number) => Promise<DestinationData>;
  addItem: (
    data: Omit<DestinationData, "id" | "created_at" | "updated_at">
  ) => Promise<DestinationData>;
  updateItem: (
    id: string | number,
    data: Partial<DestinationData>
  ) => Promise<DestinationData>;
  deleteItem: (id: string | number) => Promise<void>;
  loadData: () => Promise<void>;
  contextHolder: React.ReactElement;
  additionalData: DestinationAdditionalData;
  selectedTab: number;
  setSelectedTab: (tab: number) => void;
  statusTabs: string[];
  approveDestination: (id: string | number) => Promise<void>;
  rejectDestination: (id: string | number) => Promise<void>;
  updatePending: (id: string | number, pending: boolean) => Promise<void>;
  tabData: Array<{
    key: string;
    label: string;
    count: number;
  }>;
}

export const useDestinations = (messageApi?: any): UseDestinationsReturn => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [filteredData, setFilteredData] = useState<DestinationData[]>([]);
  const [additionalData, setAdditionalData] =
    useState<DestinationAdditionalData>({
      categories: [],
      transportMethods: [],
      travelTypes: [],
    });

  // Load additional data for dropdowns and display
  useEffect(() => {
    const loadAdditionalData = async () => {
      try {
        const [categoriesRes, transportRes, travelRes] = await Promise.all([
          getDestinationCategories(),
          getTransportMethods(),
          getTravelTypes(),
        ]);

        setAdditionalData({
          categories: categoriesRes.data?.data || [],
          transportMethods: transportRes.data?.data || [],
          travelTypes: travelRes.data?.data || [],
        });
      } catch (error) {
        console.error("Error loading additional data:", error);
      }
    };

    loadAdditionalData();
  }, []);

  const operations = useMemo(
    () => ({
      list: async () => {
        const response = await getDestinations();
        return {
          data: response.data?.destinations || response.data?.data || [],
          total:
            response.data?.total || response.data?.destinations?.length || 0,
        };
      },
      getById: async (id: string | number) => {
        const response = await getDestinationById(id);
        return { data: response.data?.destination || response.data?.data };
      },
      create: async (
        data: Omit<DestinationData, "id" | "created_at" | "updated_at">
      ) => {
        const response = await createDestination(data);
        return { data: response.data?.destination || response.data?.data };
      },
      update: async (id: string | number, data: Partial<DestinationData>) => {
        const response = await updateDestination(id, data);
        return { data: response.data?.destination || response.data?.data };
      },
      delete: async (id: string | number) => {
        await deleteDestination(id);
      },
    }),
    []
  );

  const crudResult = useCrud<DestinationData>({
    operations,
    entityName: "Destination",
    autoLoad: true,
    messageApi,
  });

  // Filter data when tab changes
  useEffect(() => {
    const statusFilter = STATUS_TABS[selectedTab] || "All";
    if (statusFilter === "All") {
      setFilteredData(crudResult.data);
    } else {
      const filtered = crudResult.data.filter((destination) => {
        switch (statusFilter) {
          case "Pending":
            return (
              destination.pending === true &&
              destination.approved !== true &&
              destination.reject !== true
            );
          case "Approved":
            return destination.approved === true;
          case "Rejected":
            return destination.reject === true;
          default:
            return true;
        }
      });
      setFilteredData(filtered);
    }
  }, [crudResult.data, selectedTab]);

  // Status management functions
  const approveDestinationById = async (id: string | number) => {
    try {
      await approveDestination(id);
      await crudResult.loadData(); // Refresh data
    } catch (error) {
      throw error;
    }
  };

  const rejectDestinationById = async (id: string | number) => {
    try {
      await rejectDestination(id);
      await crudResult.loadData(); // Refresh data
    } catch (error) {
      throw error;
    }
  };

  const updatePendingById = async (id: string | number, pending: boolean) => {
    try {
      await updatePendingStatus(id, pending);
      await crudResult.loadData(); // Refresh data
    } catch (error) {
      throw error;
    }
  };

  return {
    ...crudResult,
    data: filteredData,
    selectedTab,
    setSelectedTab,
    statusTabs: STATUS_TABS,
    additionalData,
    approveDestination: approveDestinationById,
    rejectDestination: rejectDestinationById,
    updatePending: updatePendingById,
    tabData: STATUS_TABS.map((label, index) => ({
      key: index.toString(),
      label,
      count: index === selectedTab ? filteredData.length : 0,
    })),
  };
};
