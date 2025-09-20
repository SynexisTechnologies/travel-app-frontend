import { apiInstance } from "@/shared";
import { FindGuideCategoryData } from "../types";

const BASE_URL = "/findGuideCategories";

export const getFindGuideCategories = () => {
  return apiInstance.get(BASE_URL);
};

export const createFindGuideCategory = (data: FindGuideCategoryData) => {
  return apiInstance.post(BASE_URL, data);
};

export const updateFindGuideCategory = (
  id: string | number,
  data: FindGuideCategoryData
) => {
  return apiInstance.put(`${BASE_URL}/${id}`, data);
};

export const deleteFindGuideCategory = (id: string | number) => {
  return apiInstance.delete(`${BASE_URL}/${id}`);
};

export const getFindGuideCategoryById = (id: string | number) => {
  return apiInstance.get(`${BASE_URL}/${id}`);
};
