import { apiInstance } from "@/shared";

const BASE_URL = "/users";

// User CRUD operations
export const getUsers = (params = {}) =>
  apiInstance.get(`${BASE_URL}`, { params });

export const createUser = (data) => apiInstance.post(`${BASE_URL}`, data);

export const updateUser = (id, data) =>
  apiInstance.put(`${BASE_URL}/${id}`, data);

export const deleteUser = (id) => apiInstance.delete(`${BASE_URL}/${id}`);

export const getUserById = (id) => apiInstance.get(`${BASE_URL}/${id}`);

// Update status of a user
export const updateUserStatus = (id, status) =>
  apiInstance.patch(`${BASE_URL}/${id}/isActive`, { isActive: status });

// Authentication related functions
export const loginUser = (email, password) =>
  apiInstance.post(`${BASE_URL}/login`, { email, password });

export const registerUser = (userData) =>
  apiInstance.post(`${BASE_URL}/register`, userData);

export const refreshToken = (refreshToken) =>
  apiInstance.post(`${BASE_URL}/refresh-token`, { refreshToken });
