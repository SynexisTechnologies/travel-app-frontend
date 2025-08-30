import { apiInstance } from "@/shared";

// Service Category API
const SERVICE_CATEGORY_URL = "/serviceCategories";

export const getServiceCategories = (params = {}) =>
  apiInstance.get(`${SERVICE_CATEGORY_URL}`, { params });

export const createServiceCategory = (data) =>
  apiInstance.post(`${SERVICE_CATEGORY_URL}`, data);

export const updateServiceCategory = (id, data) =>
  apiInstance.put(`${SERVICE_CATEGORY_URL}/${id}`, data);

export const deleteServiceCategory = (id) =>
  apiInstance.delete(`${SERVICE_CATEGORY_URL}/${id}`);

export const getServiceCategoryById = (id) =>
  apiInstance.get(`${SERVICE_CATEGORY_URL}/${id}`);
