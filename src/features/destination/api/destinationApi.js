import apiInstance from "@/shared/api/apiInstance";

const BASE_URL = "/destinations";
const DESTINATION_CATEGORY_URL = "/api/destinationCategory";
const TRANSPORT_METHOD_URL = "/api/destinationTransportMethod";
const TRAVEL_TYPE_URL = "/api/destinationTravelType";

// Destinations
export const getDestinations = () => apiInstance.get(`${BASE_URL}`);
export const createDestination = (data) =>
  apiInstance.post(`${BASE_URL}`, data);
export const updateDestination = (id, data) =>
  apiInstance.put(`${BASE_URL}/${id}`, data);
export const deleteDestination = (id) =>
  apiInstance.delete(`${BASE_URL}/${id}`);

// Destination Categories
export const getDestinationCategories = () =>
  apiInstance.get(`${DESTINATION_CATEGORY_URL}`);
export const createDestinationCategory = (data) =>
  apiInstance.post(`${DESTINATION_CATEGORY_URL}`, data);
export const updateDestinationCategory = (id, data) =>
  apiInstance.put(`${DESTINATION_CATEGORY_URL}/${id}`, data);
export const deleteDestinationCategory = (id) =>
  apiInstance.delete(`${DESTINATION_CATEGORY_URL}/${id}`);

// Transport Methods
export const getTransportMethods = () =>
  apiInstance.get(`${TRANSPORT_METHOD_URL}`);
export const createTransportMethod = (data) =>
  apiInstance.post(`${TRANSPORT_METHOD_URL}`, data);
export const updateTransportMethod = (id, data) =>
  apiInstance.put(`${TRANSPORT_METHOD_URL}/${id}`, data);
export const deleteTransportMethod = (id) =>
  apiInstance.delete(`${TRANSPORT_METHOD_URL}/${id}`);

// Travel Types
export const getTravelTypes = () => apiInstance.get(`${TRAVEL_TYPE_URL}`);
export const createTravelType = (data) =>
  apiInstance.post(`${TRAVEL_TYPE_URL}`, data);
export const updateTravelType = (id, data) =>
  apiInstance.put(`${TRAVEL_TYPE_URL}/${id}`, data);
export const deleteTravelType = (id) =>
  apiInstance.delete(`${TRAVEL_TYPE_URL}/${id}`);
