import { apiInstance } from "@/shared";
import { AccommodationCategoryData, AccommodationFacilityData } from "../types";

// Accommodation Categories API
const CATEGORY_BASE_URL = "/accommodationCategory";
const FACILITY_BASE_URL = "/accommodationFacility";

export const getAccommodationCategories = () => {
  return apiInstance.get(CATEGORY_BASE_URL);
};

export const createAccommodationCategory = (
  data: AccommodationCategoryData
) => {
  return apiInstance.post(CATEGORY_BASE_URL, data);
};

export const updateAccommodationCategory = (
  id: string | number,
  data: AccommodationCategoryData
) => {
  return apiInstance.put(`${CATEGORY_BASE_URL}/${id}`, data);
};

export const deleteAccommodationCategory = (id: string | number) => {
  return apiInstance.delete(`${CATEGORY_BASE_URL}/${id}`);
};

export const getAccommodationCategoryById = (id: string | number) => {
  return apiInstance.get(`${CATEGORY_BASE_URL}/${id}`);
};

// Accommodation Facilities API

export const getAccommodationFacilities = () => {
  return apiInstance.get(FACILITY_BASE_URL);
};

export const createAccommodationFacility = (
  data: AccommodationFacilityData
) => {
  return apiInstance.post(FACILITY_BASE_URL, data);
};

export const updateAccommodationFacility = (
  id: string | number,
  data: AccommodationFacilityData
) => {
  return apiInstance.put(`${FACILITY_BASE_URL}/${id}`, data);
};

export const deleteAccommodationFacility = (id: string | number) => {
  return apiInstance.delete(`${FACILITY_BASE_URL}/${id}`);
};

export const getAccommodationFacilityById = (id: string | number) => {
  return apiInstance.get(`${FACILITY_BASE_URL}/${id}`);
};
