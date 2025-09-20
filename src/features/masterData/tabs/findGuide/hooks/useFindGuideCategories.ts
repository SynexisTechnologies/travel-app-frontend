import { useMemo } from "react";
import { useCrud } from "@/shared/hooks";
import {
  getFindGuideCategories,
  createFindGuideCategory,
  updateFindGuideCategory,
  deleteFindGuideCategory,
  getFindGuideCategoryById,
} from "../api/findGuideMasterApi";

export const useFindGuideCategories = (messageApi?: any) => {
  const operations = useMemo(
    () => ({
      list: async () => {
        const response = await getFindGuideCategories();
        return { data: response.data?.data || [], total: response.data?.total };
      },
      getById: async (id: string | number) => {
        const response = await getFindGuideCategoryById(id);
        return { data: response.data?.data };
      },
      create: async (data: any) => {
        const response = await createFindGuideCategory(data);
        return { data: response.data?.data };
      },
      update: async (id: string | number, data: any) => {
        const response = await updateFindGuideCategory(id, data);
        return { data: response.data?.data };
      },
      delete: async (id: string | number) => {
        await deleteFindGuideCategory(id);
      },
    }),
    []
  );

  return useCrud({
    operations,
    entityName: "Find Guide Category",
    autoLoad: true,
    messageApi,
  });
};
