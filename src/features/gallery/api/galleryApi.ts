import { apiInstance } from "@/shared";
import { Gallery, GalleryResponse } from "../types";

const BASE_URL = "/photoGallery";

// Re-export types for convenience
export type { Gallery, GalleryResponse };

// Gallery CRUD operations
export const getGallery = (
  params: any = {}
): Promise<{ data: GalleryResponse }> =>
  apiInstance.get(`${BASE_URL}`, { params });

export const createGalleryItem = (data: Partial<Gallery>) =>
  apiInstance.post(`${BASE_URL}`, data);

export const updateGalleryItem = (
  id: string | number,
  data: Partial<Gallery>
) => apiInstance.put(`${BASE_URL}/${id}`, data);

export const deleteGalleryItem = (id: string | number) =>
  apiInstance.delete(`${BASE_URL}/${id}`);

export const getGalleryItemById = (
  id: string | number
): Promise<{ data: { data: Gallery } }> => apiInstance.get(`${BASE_URL}/${id}`);
