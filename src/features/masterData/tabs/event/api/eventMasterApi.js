import { apiInstance } from "@/shared";

const BASE_URL = "/eventCategories";

export const getEventCategories = () => {
  return apiInstance.get(BASE_URL);
};

export const createEventCategory = (data) => {
  return apiInstance.post(BASE_URL, data);
};

export const updateEventCategory = (id, data) => {
  return apiInstance.put(`${BASE_URL}/${id}`, data);
};

export const deleteEventCategory = (id) => {
  return apiInstance.delete(`${BASE_URL}/${id}`);
};

export const getEventCategoryById = (id) => {
  return apiInstance.get(`${BASE_URL}/${id}`);
};
