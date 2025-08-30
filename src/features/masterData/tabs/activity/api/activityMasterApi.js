import { apiInstance } from "@/shared";

// Activity Category API
const ACTIVITY_CATEGORY_URL = "/activityCategories";

export const getActivityCategories = (params = {}) =>
  apiInstance.get(`${ACTIVITY_CATEGORY_URL}`, { params });

export const createActivityCategory = (data) =>
  apiInstance.post(`${ACTIVITY_CATEGORY_URL}`, data);

export const updateActivityCategory = (id, data) =>
  apiInstance.put(`${ACTIVITY_CATEGORY_URL}/${id}`, data);

export const deleteActivityCategory = (id) =>
  apiInstance.delete(`${ACTIVITY_CATEGORY_URL}/${id}`);

export const getActivityCategoryById = (id) =>
  apiInstance.get(`${ACTIVITY_CATEGORY_URL}/${id}`);
