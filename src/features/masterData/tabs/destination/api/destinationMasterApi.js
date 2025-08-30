import { apiInstance } from "@/shared";

// Destination Category API
const DESTINATION_CATEGORY_URL = "/destinationCategory";
const DESTINATION_TRAVEL_TYPE_URL = "/destinationTravelType";
const DESTINATION_TRANSPORT_METHOD_URL = "/destinationTransportMethod";

export const getDestinationCategories = (params = {}) =>
  apiInstance.get(`${DESTINATION_CATEGORY_URL}`, { params });

export const createDestinationCategory = (data) =>
  apiInstance.post(`${DESTINATION_CATEGORY_URL}`, data);

export const updateDestinationCategory = (id, data) =>
  apiInstance.put(`${DESTINATION_CATEGORY_URL}/${id}`, data);

export const deleteDestinationCategory = (id) =>
  apiInstance.delete(`${DESTINATION_CATEGORY_URL}/${id}`);

export const getDestinationCategoryById = (id) =>
  apiInstance.get(`${DESTINATION_CATEGORY_URL}/${id}`);

// Destination Travel Type API
export const getDestinationTravelTypes = (params = {}) =>
  apiInstance.get(`${DESTINATION_TRAVEL_TYPE_URL}`, { params });

export const createDestinationTravelType = (data) =>
  apiInstance.post(`${DESTINATION_TRAVEL_TYPE_URL}`, data);

export const updateDestinationTravelType = (id, data) =>
  apiInstance.put(`${DESTINATION_TRAVEL_TYPE_URL}/${id}`, data);

export const deleteDestinationTravelType = (id) =>
  apiInstance.delete(`${DESTINATION_TRAVEL_TYPE_URL}/${id}`);

export const getDestinationTravelTypeById = (id) =>
  apiInstance.get(`${DESTINATION_TRAVEL_TYPE_URL}/${id}`);

// Destination Transport Method API
export const getDestinationTransportMethods = (params = {}) =>
  apiInstance.get(`${DESTINATION_TRANSPORT_METHOD_URL}`, { params });

export const createDestinationTransportMethod = (data) =>
  apiInstance.post(`${DESTINATION_TRANSPORT_METHOD_URL}`, data);

export const updateDestinationTransportMethod = (id, data) =>
  apiInstance.put(`${DESTINATION_TRANSPORT_METHOD_URL}/${id}`, data);

export const deleteDestinationTransportMethod = (id) =>
  apiInstance.delete(`${DESTINATION_TRANSPORT_METHOD_URL}/${id}`);

export const getDestinationTransportMethodById = (id) =>
  apiInstance.get(`${DESTINATION_TRANSPORT_METHOD_URL}/${id}`);
