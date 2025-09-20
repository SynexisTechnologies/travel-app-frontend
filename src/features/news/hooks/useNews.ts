import { useMemo } from "react";
import { useCrud } from "@/shared/hooks";
import {
  getNews,
  createNews,
  updateNews,
  deleteNews,
  getNewsById,
  News,
} from "../api/newsApi";

export const useNews = (messageApi?: any) => {
  const operations = useMemo(
    () => ({
      list: async () => {
        const response = await getNews();
        return {
          data: response.data?.data || response.data?.news || [],
          total: response.data?.total,
        };
      },
      getById: async (id: string | number) => {
        const response = await getNewsById(id);
        return { data: response.data?.data };
      },
      create: async (data: any) => {
        const response = await createNews(data);
        return { data: response.data?.data };
      },
      update: async (id: string | number, data: any) => {
        const response = await updateNews(id, data);
        return { data: response.data?.data };
      },
      delete: async (id: string | number) => {
        await deleteNews(id);
      },
    }),
    []
  );

  return useCrud({
    operations,
    entityName: "News",
    autoLoad: true,
    messageApi,
  });
};
