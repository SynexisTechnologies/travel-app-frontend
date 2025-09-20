import { apiInstance } from "@/shared";
import {
  DestinationCategoryData,
  DestinationTravelTypeData,
  DestinationTransportMethodData,
  GetDestinationMasterParams,
} from "../types";

// Destination Category API
const DESTINATION_CATEGORY_URL = "/destinationCategory";
const DESTINATION_TRAVEL_TYPE_URL = "/destinationTravelType";
const DESTINATION_TRANSPORT_METHOD_URL = "/destinationTransportMethod";

export const getDestinationCategories = (
  params: GetDestinationMasterParams = {}
) => apiInstance.get(`${DESTINATION_CATEGORY_URL}`, { params });

export const createDestinationCategory = (
  data:
    | Omit<DestinationCategoryData, "id" | "created_at" | "updated_at">
    | FormData
) => {
  if (data instanceof FormData) {
    return apiInstance.post(`${DESTINATION_CATEGORY_URL}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  return apiInstance.post(`${DESTINATION_CATEGORY_URL}`, data);
};

export const updateDestinationCategory = (
  id: string | number,
  data:
    | Partial<Omit<DestinationCategoryData, "id" | "created_at" | "updated_at">>
    | FormData
) => {
  if (data instanceof FormData) {
    return apiInstance.put(`${DESTINATION_CATEGORY_URL}/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  return apiInstance.put(`${DESTINATION_CATEGORY_URL}/${id}`, data);
};

export const deleteDestinationCategory = (id: string | number) =>
  apiInstance.delete(`${DESTINATION_CATEGORY_URL}/${id}`);

export const getDestinationCategoryById = (id: string | number) =>
  apiInstance.get(`${DESTINATION_CATEGORY_URL}/${id}`);

// Destination Travel Type API
export const getDestinationTravelTypes = (
  params: GetDestinationMasterParams = {}
) => apiInstance.get(`${DESTINATION_TRAVEL_TYPE_URL}`, { params });

export const createDestinationTravelType = (
  data: Omit<DestinationTravelTypeData, "id" | "created_at" | "updated_at">
) => apiInstance.post(`${DESTINATION_TRAVEL_TYPE_URL}`, data);

export const updateDestinationTravelType = (
  id: string | number,
  data: Partial<
    Omit<DestinationTravelTypeData, "id" | "created_at" | "updated_at">
  >
) => apiInstance.put(`${DESTINATION_TRAVEL_TYPE_URL}/${id}`, data);

export const deleteDestinationTravelType = (id: string | number) =>
  apiInstance.delete(`${DESTINATION_TRAVEL_TYPE_URL}/${id}`);

export const getDestinationTravelTypeById = (id: string | number) =>
  apiInstance.get(`${DESTINATION_TRAVEL_TYPE_URL}/${id}`);

// Destination Transport Method API
export const getDestinationTransportMethods = (
  params: GetDestinationMasterParams = {}
) => apiInstance.get(`${DESTINATION_TRANSPORT_METHOD_URL}`, { params });

export const createDestinationTransportMethod = (
  data: Omit<DestinationTransportMethodData, "id" | "created_at" | "updated_at">
) => apiInstance.post(`${DESTINATION_TRANSPORT_METHOD_URL}`, data);

export const updateDestinationTransportMethod = (
  id: string | number,
  data: Partial<
    Omit<DestinationTransportMethodData, "id" | "created_at" | "updated_at">
  >
) => apiInstance.put(`${DESTINATION_TRANSPORT_METHOD_URL}/${id}`, data);

export const deleteDestinationTransportMethod = (id: string | number) =>
  apiInstance.delete(`${DESTINATION_TRANSPORT_METHOD_URL}/${id}`);

export const getDestinationTransportMethodById = (id: string | number) =>
  apiInstance.get(`${DESTINATION_TRANSPORT_METHOD_URL}/${id}`);
