import apiInstance from "@/shared/api/apiInstance";

const BASE_URL = "/destinations";
const DESTINATION_CATEGORY_URL = "/destinationCategory";
const TRANSPORT_METHOD_URL = "/destinationTransportMethod";
const TRAVEL_TYPE_URL = "/destinationTravelType";

// Destinations CRUD operations
export const getDestinations = () => apiInstance.get(`${BASE_URL}`);
export const getDestinationById = (id: string | number) =>
  apiInstance.get(`${BASE_URL}/${id}`);
export const createDestination = (data: FormData | any) =>
  apiInstance.post(`${BASE_URL}`, data);
export const updateDestination = (id: string | number, data: FormData | any) =>
  apiInstance.put(`${BASE_URL}/${id}`, data);
export const deleteDestination = (id: string | number) =>
  apiInstance.delete(`${BASE_URL}/${id}`);

// Status management operations
export const approveDestination = (id: string | number) =>
  apiInstance.patch(`${BASE_URL}/${id}/approved`, { approved: true });
export const rejectDestination = (id: string | number) =>
  apiInstance.patch(`${BASE_URL}/${id}/reject`, { reject: true });
export const updatePendingStatus = (id: string | number, pending: boolean) =>
  apiInstance.patch(`${BASE_URL}/${id}/pending`, { pending });

// Destination Categories
export const getDestinationCategories = () =>
  apiInstance.get(`${DESTINATION_CATEGORY_URL}`);
export const createDestinationCategory = (data: any) =>
  apiInstance.post(`${DESTINATION_CATEGORY_URL}`, data);
export const updateDestinationCategory = (id: string | number, data: any) =>
  apiInstance.put(`${DESTINATION_CATEGORY_URL}/${id}`, data);
export const deleteDestinationCategory = (id: string | number) =>
  apiInstance.delete(`${DESTINATION_CATEGORY_URL}/${id}`);

// Transport Methods
export const getTransportMethods = () =>
  apiInstance.get(`${TRANSPORT_METHOD_URL}`);
export const createTransportMethod = (data: any) =>
  apiInstance.post(`${TRANSPORT_METHOD_URL}`, data);
export const updateTransportMethod = (id: string | number, data: any) =>
  apiInstance.put(`${TRANSPORT_METHOD_URL}/${id}`, data);
export const deleteTransportMethod = (id: string | number) =>
  apiInstance.delete(`${TRANSPORT_METHOD_URL}/${id}`);

// Travel Types
export const getTravelTypes = () => apiInstance.get(`${TRAVEL_TYPE_URL}`);
export const createTravelType = (data: any) =>
  apiInstance.post(`${TRAVEL_TYPE_URL}`, data);
export const updateTravelType = (id: string | number, data: any) =>
  apiInstance.put(`${TRAVEL_TYPE_URL}/${id}`, data);
export const deleteTravelType = (id: string | number) =>
  apiInstance.delete(`${TRAVEL_TYPE_URL}/${id}`);
