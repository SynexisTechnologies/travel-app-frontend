import { apiInstance } from "@/shared";
import { EventCategoryData } from "../types";

const BASE_URL = "/eventCategories";

export const getEventCategories = () => {
  return apiInstance.get(BASE_URL);
};

export const createEventCategory = (data: EventCategoryData) => {
  return apiInstance.post(BASE_URL, data);
};

export const updateEventCategory = (
  id: string | number,
  data: EventCategoryData
) => {
  return apiInstance.put(`${BASE_URL}/${id}`, data);
};

export const deleteEventCategory = (id: string | number) => {
  return apiInstance.delete(`${BASE_URL}/${id}`);
};

export const getEventCategoryById = (id: string | number) => {
  return apiInstance.get(`${BASE_URL}/${id}`);
};
