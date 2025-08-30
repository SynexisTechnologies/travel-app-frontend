import { apiInstance } from "@/shared";

const BASE_URL = "/findGuideCategories";

export const getFindGuideCategories = () => {
  return apiInstance.get(BASE_URL);
};

export const createFindGuideCategory = (data) => {
  return apiInstance.post(BASE_URL, data);
};

export const updateFindGuideCategory = (id, data) => {
  return apiInstance.put(`${BASE_URL}/${id}`, data);
};

export const deleteFindGuideCategory = (id) => {
  return apiInstance.delete(`${BASE_URL}/${id}`);
};

export const getFindGuideCategoryById = (id) => {
  return apiInstance.get(`${BASE_URL}/${id}`);
};
