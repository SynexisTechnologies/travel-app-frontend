import { apiInstance } from "@/shared";
import {
  ServiceCategoryData,
  GetServiceCategoriesParams,
  ServiceCategoryFormData,
} from "../types";

// Service Category API
const SERVICE_CATEGORY_URL = "/serviceCategories";

export const getServiceCategories = (params: GetServiceCategoriesParams = {}) =>
  apiInstance.get(`${SERVICE_CATEGORY_URL}`, { params });

export const createServiceCategory = (data: ServiceCategoryData | FormData) => {
  if (data instanceof FormData) {
    return apiInstance.post(`${SERVICE_CATEGORY_URL}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  return apiInstance.post(`${SERVICE_CATEGORY_URL}`, data);
};

export const updateServiceCategory = (
  id: string | number,
  data: Partial<ServiceCategoryData> | FormData
) => {
  if (data instanceof FormData) {
    return apiInstance.put(`${SERVICE_CATEGORY_URL}/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  return apiInstance.put(`${SERVICE_CATEGORY_URL}/${id}`, data);
};

export const deleteServiceCategory = (id: string | number) =>
  apiInstance.delete(`${SERVICE_CATEGORY_URL}/${id}`);

export const getServiceCategoryById = (id: string | number) =>
  apiInstance.get(`${SERVICE_CATEGORY_URL}/${id}`);
