import { useMemo } from "react";
import { useCrud } from "@/shared/hooks";
import {
  getActivityCategories,
  createActivityCategory,
  updateActivityCategory,
  deleteActivityCategory,
  getActivityCategoryById,
} from "../api/activityMasterApi";

export const useActivityCategories = (messageApi?: any) => {
  const operations = useMemo(
    () => ({
      list: async () => {
        const response = await getActivityCategories();
        return { data: response.data?.data || [], total: response.data?.total };
      },
      getById: async (id: string | number) => {
        const response = await getActivityCategoryById(id);
        return { data: response.data?.data };
      },
      create: async (data: any) => {
        const response = await createActivityCategory(data);
        return { data: response.data?.data };
      },
      update: async (id: string | number, data: any) => {
        const response = await updateActivityCategory(id, data);
        return { data: response.data?.data };
      },
      delete: async (id: string | number) => {
        await deleteActivityCategory(id);
      },
    }),
    []
  );

  return useCrud({
    operations,
    entityName: "Activity Category",
    autoLoad: true,
    messageApi,
  });
};
