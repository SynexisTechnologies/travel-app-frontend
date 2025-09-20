import { useMemo } from "react";
import { useCrud } from "@/shared/hooks";
import {
  getTopRecommendedPlaces,
  createTopRecommendedPlace,
  updateTopRecommendedPlace,
  deleteTopRecommendedPlace,
  getTopRecommendedPlaceById,
  TopRecommendedPlace,
} from "../api/topRecommendedPlacesApi";

export const useTopRecommendedPlaces = (messageApi?: any) => {
  const operations = useMemo(
    () => ({
      list: async () => {
        const response = await getTopRecommendedPlaces();
        return {
          data: response.data?.data || response.data?.places || [],
          total: response.data?.total,
        };
      },
      getById: async (id: string | number) => {
        const response = await getTopRecommendedPlaceById(id);
        return { data: response.data?.data };
      },
      create: async (data: any) => {
        const response = await createTopRecommendedPlace(data);
        return { data: response.data?.data };
      },
      update: async (id: string | number, data: any) => {
        const response = await updateTopRecommendedPlace(id, data);
        return { data: response.data?.data };
      },
      delete: async (id: string | number) => {
        await deleteTopRecommendedPlace(id);
      },
    }),
    []
  );

  return useCrud({
    operations,
    entityName: "Top Recommended Place",
    autoLoad: true,
    messageApi,
  });
};
