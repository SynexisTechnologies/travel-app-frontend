import { apiInstance } from "@/shared";
import { ActivityCategoryData } from "../types";

// Activity Category API
const ACTIVITY_CATEGORY_URL = "/activityCategories";

export const getActivityCategories = (params: any = {}) =>
  apiInstance.get(`${ACTIVITY_CATEGORY_URL}`, { params });

export const createActivityCategory = (
  data: ActivityCategoryData | FormData
) => {
  if (data instanceof FormData) {
    return apiInstance.post(`${ACTIVITY_CATEGORY_URL}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  return apiInstance.post(`${ACTIVITY_CATEGORY_URL}`, data);
};

export const updateActivityCategory = (
  id: string | number,
  data: ActivityCategoryData | FormData
) => {
  if (data instanceof FormData) {
    return apiInstance.put(`${ACTIVITY_CATEGORY_URL}/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  return apiInstance.put(`${ACTIVITY_CATEGORY_URL}/${id}`, data);
};

export const deleteActivityCategory = (id: string | number) =>
  apiInstance.delete(`${ACTIVITY_CATEGORY_URL}/${id}`);

export const getActivityCategoryById = (id: string | number) =>
  apiInstance.get(`${ACTIVITY_CATEGORY_URL}/${id}`);
