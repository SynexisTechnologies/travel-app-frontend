import { useState, useCallback, useEffect } from "react";
import { message } from "antd";
import React from "react";

// Generic CRUD operations interface
export interface CrudOperations<T = any> {
  list: () => Promise<{ data: T[]; total?: number }>;
  getById: (id: string | number) => Promise<{ data: T }>;
  create: (data: Omit<T, "id">) => Promise<{ data: T }>;
  update: (id: string | number, data: Partial<T>) => Promise<{ data: T }>;
  delete: (id: string | number) => Promise<void>;
}

// Hook configuration
export interface UseCrudConfig<T = any> {
  operations: CrudOperations<T>;
  entityName: string; // For success/error messages (e.g., "Service Category")
  autoLoad?: boolean;
  messageApi?: any; // Ant Design message API
}

// Hook state interface
export interface CrudHookReturn<T = any> {
  // Data state
  data: T[];
  loading: boolean;

  // Pagination state
  paginationDetails: {
    current: number;
    pageSize: number;
    total: number;
    searchQuery?: string;
  };
  setPaginationDetails: (details: any) => void;

  // CRUD methods that match GenericPage interface
  loadOneItem: (id: string | number) => Promise<T>;
  addItem: (data: Omit<T, "id">) => Promise<T>;
  updateItem: (id: string | number, data: Partial<T>) => Promise<T>;
  deleteItem: (id: string | number) => Promise<void>;

  // Additional methods
  loadData: () => Promise<void>;
  contextHolder: React.ReactElement;
}

// Generic CRUD hook
export const useCrud = <T = any>(
  config: UseCrudConfig<T>
): CrudHookReturn<T> => {
  const {
    operations,
    entityName,
    autoLoad = true,
    messageApi: providedMessageApi,
  } = config;

  // Use provided messageApi or create our own
  const [messageApi, contextHolder] = providedMessageApi
    ? [providedMessageApi, null]
    : message.useMessage();

  // State
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [paginationDetails, setPaginationDetails] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    searchQuery: "",
  });

  // Load data function
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await operations.list();
      setData(response.data || []);
      setPaginationDetails((prev) => ({
        ...prev,
        total: response.total || response.data?.length || 0,
      }));
    } catch (error: any) {
      console.error(`Error loading ${entityName.toLowerCase()}:`, error);
      messageApi?.error(`Error loading ${entityName.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  }, [operations.list, entityName, messageApi]);

  // Load single item
  const loadOneItem = useCallback(
    async (id: string | number): Promise<T> => {
      try {
        const response = await operations.getById(id);
        return response.data;
      } catch (error: any) {
        console.error(`Error loading ${entityName.toLowerCase()}:`, error);
        messageApi?.error(`Error loading ${entityName.toLowerCase()}`);
        throw error;
      }
    },
    [operations.getById, entityName, messageApi]
  );

  // Create item
  const addItem = useCallback(
    async (itemData: Omit<T, "id">): Promise<T> => {
      try {
        const response = await operations.create(itemData);
        messageApi?.success(`${entityName} created successfully!`);
        await loadData(); // Refresh the list
        return response.data;
      } catch (error: any) {
        console.error(`Error creating ${entityName.toLowerCase()}:`, error);
        messageApi?.error(`Error creating ${entityName.toLowerCase()}`);
        throw error;
      }
    },
    [operations.create, entityName, messageApi, loadData]
  );

  // Update item
  const updateItem = useCallback(
    async (id: string | number, itemData: Partial<T>): Promise<T> => {
      try {
        const response = await operations.update(id, itemData);
        messageApi?.success(`${entityName} updated successfully!`);
        await loadData(); // Refresh the list
        return response.data;
      } catch (error: any) {
        console.error(`Error updating ${entityName.toLowerCase()}:`, error);
        messageApi?.error(`Error updating ${entityName.toLowerCase()}`);
        throw error;
      }
    },
    [operations.update, entityName, messageApi, loadData]
  );

  // Delete item
  const deleteItem = useCallback(
    async (id: string | number): Promise<void> => {
      try {
        await operations.delete(id);
        messageApi?.success(`${entityName} deleted successfully!`);
        await loadData(); // Refresh the list
      } catch (error: any) {
        console.error(`Error deleting ${entityName.toLowerCase()}:`, error);
        messageApi?.error(`Error deleting ${entityName.toLowerCase()}`);
        throw error;
      }
    },
    [operations.delete, entityName, messageApi, loadData]
  );

  // Auto-load data on mount if enabled
  useEffect(() => {
    if (autoLoad) {
      loadData();
    }
  }, [autoLoad, loadData]);

  return {
    // Data state
    data,
    loading,

    // Pagination state
    paginationDetails,
    setPaginationDetails,

    // CRUD methods (matching GenericPage interface)
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,

    // Additional methods
    loadData,
    contextHolder: contextHolder || React.createElement(React.Fragment),
  };
};

export default useCrud;
