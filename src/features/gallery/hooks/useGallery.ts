import { useMemo } from "react";
import { useCrud } from "@/shared/hooks";
import {
  getGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getGalleryItemById,
  Gallery,
} from "../api/galleryApi";

export const useGallery = (messageApi?: any) => {
  const operations = useMemo(
    () => ({
      list: async () => {
        const response = await getGallery();
        return {
          data: response.data?.data || response.data?.photos || [],
          total: response.data?.total,
        };
      },
      getById: async (id: string | number) => {
        const response = await getGalleryItemById(id);
        return { data: response.data?.data };
      },
      create: async (data: any) => {
        const response = await createGalleryItem(data);
        return { data: response.data?.data };
      },
      update: async (id: string | number, data: any) => {
        const response = await updateGalleryItem(id, data);
        return { data: response.data?.data };
      },
      delete: async (id: string | number) => {
        await deleteGalleryItem(id);
      },
    }),
    []
  );

  return useCrud({
    operations,
    entityName: "Gallery Item",
    autoLoad: true,
    messageApi,
  });
};
