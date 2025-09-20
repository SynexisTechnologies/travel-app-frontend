import { useMemo } from "react";
import { useCrud } from "@/shared/hooks";
import {
  getEventCategories,
  createEventCategory,
  updateEventCategory,
  deleteEventCategory,
  getEventCategoryById,
  EventCategoryData,
} from "../api/eventMasterApi";

export const useEventCategories = (messageApi?: any) => {
  const operations = useMemo(
    () => ({
      list: async () => {
        const response = await getEventCategories();
        return { data: response.data?.data || [], total: response.data?.total };
      },
      getById: async (id: string | number) => {
        const response = await getEventCategoryById(id);
        return { data: response.data?.data };
      },
      create: async (data: any) => {
        const response = await createEventCategory(data);
        return { data: response.data?.data };
      },
      update: async (id: string | number, data: any) => {
        const response = await updateEventCategory(id, data);
        return { data: response.data?.data };
      },
      delete: async (id: string | number) => {
        await deleteEventCategory(id);
      },
    }),
    []
  );

  return useCrud({
    operations,
    entityName: "Event Category",
    autoLoad: true,
    messageApi,
  });
};
