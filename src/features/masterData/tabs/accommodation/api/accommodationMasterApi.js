import { apiInstance } from "@/shared";

// Accommodation Categories API
const CATEGORY_BASE_URL = "/accommodationCategory";
const FACILITY_BASE_URL = "/accommodationFacility";

export const getAccommodationCategories = () => {
  return apiInstance.get(CATEGORY_BASE_URL);
};

export const createAccommodationCategory = (data) => {
  return apiInstance.post(CATEGORY_BASE_URL, data);
};

export const updateAccommodationCategory = (id, data) => {
  return apiInstance.put(`${CATEGORY_BASE_URL}/${id}`, data);
};

export const deleteAccommodationCategory = (id) => {
  return apiInstance.delete(`${CATEGORY_BASE_URL}/${id}`);
};

export const getAccommodationCategoryById = (id) => {
  return apiInstance.get(`${CATEGORY_BASE_URL}/${id}`);
};

// Accommodation Facilities API

export const getAccommodationFacilities = () => {
  return apiInstance.get(FACILITY_BASE_URL);
};

export const createAccommodationFacility = (data) => {
  return apiInstance.post(FACILITY_BASE_URL, data);
};

export const updateAccommodationFacility = (id, data) => {
  return apiInstance.put(`${FACILITY_BASE_URL}/${id}`, data);
};

export const deleteAccommodationFacility = (id) => {
  return apiInstance.delete(`${FACILITY_BASE_URL}/${id}`);
};

export const getAccommodationFacilityById = (id) => {
  return apiInstance.get(`${FACILITY_BASE_URL}/${id}`);
};
