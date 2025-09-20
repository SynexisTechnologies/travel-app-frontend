import { useMemo } from "react";
import { useCrud } from "@/shared/hooks";
import { AccommodationFacilityData } from "../types";
import {
  getAccommodationFacilities,
  createAccommodationFacility,
  updateAccommodationFacility,
  deleteAccommodationFacility,
  getAccommodationFacilityById,
} from "../api/accommodationMasterApi";

export const useAccommodationFacilities = () => {
  const operations = useMemo(
    () => ({
      list: async () => {
        const response = await getAccommodationFacilities();
        return { data: response.data?.data || [], total: response.data?.total };
      },
      getById: async (id: string | number) => {
        const response = await getAccommodationFacilityById(id);
        return { data: response.data?.data };
      },
      create: async (data: any) => {
        const response = await createAccommodationFacility(data);
        return { data: response.data?.data };
      },
      update: async (id: string | number, data: any) => {
        const response = await updateAccommodationFacility(id, data);
        return { data: response.data?.data };
      },
      delete: async (id: string | number) => {
        await deleteAccommodationFacility(id);
      },
    }),
    []
  );

  return useCrud({
    operations,
    entityName: "Accommodation Facility",
    autoLoad: true,
  });
};
