import { apiInstance } from "@/shared";
import { TopRecommendedPlace, TopRecommendedPlaceResponse } from "../types";

const BASE_URL = "/topRecommendedPlaces";

// Re-export types for convenience
export type { TopRecommendedPlace, TopRecommendedPlaceResponse };

// Top Recommended Places CRUD operations
export const getTopRecommendedPlaces = (
  params: any = {}
): Promise<{ data: TopRecommendedPlaceResponse }> =>
  apiInstance.get(`${BASE_URL}`, { params });

export const createTopRecommendedPlace = (data: Partial<TopRecommendedPlace>) =>
  apiInstance.post(`${BASE_URL}`, data);

export const updateTopRecommendedPlace = (
  id: string | number,
  data: Partial<TopRecommendedPlace>
) => apiInstance.put(`${BASE_URL}/${id}`, data);

export const deleteTopRecommendedPlace = (id: string | number) =>
  apiInstance.delete(`${BASE_URL}/${id}`);

export const getTopRecommendedPlaceById = (
  id: string | number
): Promise<{ data: { data: TopRecommendedPlace } }> =>
  apiInstance.get(`${BASE_URL}/${id}`);
