import { useMemo } from "react";
import { useCrud } from "@/shared/hooks";
import {
  getServiceCategories,
  createServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
  getServiceCategoryById,
  ServiceCategoryData,
} from "../api/serviceMasterApi";

export const useServiceCategories = (messageApi?: any) => {
  const operations = useMemo(
    () => ({
      list: async () => {
        const response = await getServiceCategories();
        return { data: response.data?.data || [], total: response.data?.total };
      },
      getById: async (id: string | number) => {
        const response = await getServiceCategoryById(id);
        return { data: response.data?.data };
      },
      create: async (data: ServiceCategoryData | FormData) => {
        const response = await createServiceCategory(data);
        return { data: response.data?.data };
      },
      update: async (
        id: string | number,
        data: Partial<ServiceCategoryData> | FormData
      ) => {
        const response = await updateServiceCategory(id, data);
        return { data: response.data?.data };
      },
      delete: async (id: string | number) => {
        await deleteServiceCategory(id);
      },
    }),
    []
  );

  return useCrud({
    operations,
    entityName: "Service Category",
    autoLoad: true,
    messageApi,
  });
};
