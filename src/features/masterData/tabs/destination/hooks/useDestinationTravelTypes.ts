import { useMemo } from "react";
import { useCrud } from "@/shared/hooks";
import {
  getDestinationTravelTypes,
  createDestinationTravelType,
  updateDestinationTravelType,
  deleteDestinationTravelType,
  getDestinationTravelTypeById,
} from "../api/destinationMasterApi";

export const useDestinationTravelTypes = (messageApi?: any) => {
  const operations = useMemo(
    () => ({
      list: async () => {
        const response = await getDestinationTravelTypes();
        return { data: response.data?.data || [], total: response.data?.total };
      },
      getById: async (id: string | number) => {
        const response = await getDestinationTravelTypeById(id);
        return { data: response.data?.data };
      },
      create: async (data: any) => {
        const response = await createDestinationTravelType(data);
        return { data: response.data?.data };
      },
      update: async (id: string | number, data: any) => {
        const response = await updateDestinationTravelType(id, data);
        return { data: response.data?.data };
      },
      delete: async (id: string | number) => {
        await deleteDestinationTravelType(id);
      },
    }),
    []
  );

  return useCrud({
    operations,
    entityName: "Destination Travel Type",
    autoLoad: true,
    messageApi,
  });
};
