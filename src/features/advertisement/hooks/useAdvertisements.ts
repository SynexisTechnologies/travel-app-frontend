import { useMemo } from "react";
import { useCrud } from "@/shared/hooks";
import {
  getAdvertisements,
  createAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
  getAdvertisementById,
  Advertisement,
} from "../api/advertisementApi";

export const useAdvertisements = (messageApi?: any) => {
  const operations = useMemo(
    () => ({
      list: async () => {
        const response = await getAdvertisements();
        return {
          data: response.data?.data || response.data?.advertisement || [],
          total: response.data?.total,
        };
      },
      getById: async (id: string | number) => {
        const response = await getAdvertisementById(id);
        return { data: response.data?.data };
      },
      create: async (data: any) => {
        const response = await createAdvertisement(data);
        return { data: response.data?.data };
      },
      update: async (id: string | number, data: any) => {
        const response = await updateAdvertisement(id, data);
        return { data: response.data?.data };
      },
      delete: async (id: string | number) => {
        await deleteAdvertisement(id);
      },
    }),
    []
  );

  return useCrud({
    operations,
    entityName: "Advertisement",
    autoLoad: true,
    messageApi,
  });
};
