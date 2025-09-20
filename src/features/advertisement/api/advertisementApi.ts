import { apiInstance } from "@/shared";
import { Advertisement, AdvertisementResponse } from "../types";

const BASE_URL = "/advertisement";

// Re-export types for convenience
export type { Advertisement, AdvertisementResponse };

// Advertisement CRUD operations
export const getAdvertisements = (
  params: any = {}
): Promise<{ data: AdvertisementResponse }> =>
  apiInstance.get(`${BASE_URL}`, { params });

export const createAdvertisement = (data: Partial<Advertisement>) =>
  apiInstance.post(`${BASE_URL}`, data);

export const updateAdvertisement = (
  id: string | number,
  data: Partial<Advertisement>
) => apiInstance.put(`${BASE_URL}/${id}`, data);

export const deleteAdvertisement = (id: string | number) =>
  apiInstance.delete(`${BASE_URL}/${id}`);

export const getAdvertisementById = (
  id: string | number
): Promise<{ data: { data: Advertisement } }> =>
  apiInstance.get(`${BASE_URL}/${id}`);
