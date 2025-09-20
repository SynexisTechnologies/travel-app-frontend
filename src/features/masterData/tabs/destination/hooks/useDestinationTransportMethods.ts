import { useMemo } from "react";
import { useCrud } from "@/shared/hooks";
import {
  getDestinationTransportMethods,
  createDestinationTransportMethod,
  updateDestinationTransportMethod,
  deleteDestinationTransportMethod,
  getDestinationTransportMethodById,
} from "../api/destinationMasterApi";

export const useDestinationTransportMethods = (messageApi?: any) => {
  const operations = useMemo(
    () => ({
      list: async () => {
        const response = await getDestinationTransportMethods();
        return { data: response.data?.data || [], total: response.data?.total };
      },
      getById: async (id: string | number) => {
        const response = await getDestinationTransportMethodById(id);
        return { data: response.data?.data };
      },
      create: async (data: any) => {
        const response = await createDestinationTransportMethod(data);
        return { data: response.data?.data };
      },
      update: async (id: string | number, data: any) => {
        const response = await updateDestinationTransportMethod(id, data);
        return { data: response.data?.data };
      },
      delete: async (id: string | number) => {
        await deleteDestinationTransportMethod(id);
      },
    }),
    []
  );

  return useCrud({
    operations,
    entityName: "Destination Transport Method",
    autoLoad: true,
    messageApi,
  });
};
