import { apiInstance } from "@/shared";
import { News, NewsResponse } from "../types";

const BASE_URL = "/news";

// Re-export types for convenience
export type { News, NewsResponse };

// News CRUD operations
export const getNews = (params: any = {}): Promise<{ data: NewsResponse }> =>
  apiInstance.get(`${BASE_URL}`, { params });

export const createNews = (data: Partial<News>) =>
  apiInstance.post(`${BASE_URL}`, data);

export const updateNews = (id: string | number, data: Partial<News>) =>
  apiInstance.put(`${BASE_URL}/${id}`, data);

export const deleteNews = (id: string | number) =>
  apiInstance.delete(`${BASE_URL}/${id}`);

export const getNewsById = (
  id: string | number
): Promise<{ data: { data: News } }> => apiInstance.get(`${BASE_URL}/${id}`);
