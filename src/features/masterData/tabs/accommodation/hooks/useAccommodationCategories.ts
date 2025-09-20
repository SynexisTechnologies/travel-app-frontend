import { useMemo } from "react";
import { useCrud } from "@/shared/hooks";
import { AccommodationCategoryData } from "../types";
import {
  getAccommodationCategories,
  createAccommodationCategory,
  updateAccommodationCategory,
  deleteAccommodationCategory,
  getAccommodationCategoryById,
} from "../api/accommodationMasterApi";

export const useAccommodationCategories = () => {
  const operations = useMemo(
    () => ({
      list: async () => {
        const response = await getAccommodationCategories();
        return { data: response.data?.data || [], total: response.data?.total };
      },
      getById: async (id: string | number) => {
        const response = await getAccommodationCategoryById(id);
        return { data: response.data?.data };
      },
      create: async (data: any) => {
        const response = await createAccommodationCategory(data);
        return { data: response.data?.data };
      },
      update: async (id: string | number, data: any) => {
        const response = await updateAccommodationCategory(id, data);
        return { data: response.data?.data };
      },
      delete: async (id: string | number) => {
        await deleteAccommodationCategory(id);
      },
    }),
    []
  );

  return useCrud({
    operations,
    entityName: "Accommodation Category",
    autoLoad: true,
  });
};
