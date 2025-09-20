import { useMemo } from "react";
import { useCrud } from "@/shared/hooks";
import {
  getDestinationCategories,
  createDestinationCategory,
  updateDestinationCategory,
  deleteDestinationCategory,
  getDestinationCategoryById,
} from "../api/destinationMasterApi";

export const useDestinationCategories = (messageApi?: any) => {
  const operations = useMemo(
    () => ({
      list: async () => {
        const response = await getDestinationCategories();
        return { data: response.data?.data || [], total: response.data?.total };
      },
      getById: async (id: string | number) => {
        const response = await getDestinationCategoryById(id);
        return { data: response.data?.data };
      },
      create: async (data: any) => {
        const response = await createDestinationCategory(data);
        return { data: response.data?.data };
      },
      update: async (id: string | number, data: any) => {
        const response = await updateDestinationCategory(id, data);
        return { data: response.data?.data };
      },
      delete: async (id: string | number) => {
        await deleteDestinationCategory(id);
      },
    }),
    []
  );

  return useCrud({
    operations,
    entityName: "Destination Category",
    autoLoad: true,
    messageApi,
  });
};
