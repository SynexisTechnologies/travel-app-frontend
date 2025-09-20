import { apiInstance } from "@/shared";
import { User, UserResponse } from "../types";

const BASE_URL = "/users";

// User CRUD operations
export const getUsers = (params: any = {}): Promise<{ data: UserResponse }> =>
  apiInstance.get(`${BASE_URL}`, { params });

export const createUser = (data: Partial<User>) =>
  apiInstance.post(`${BASE_URL}`, data);

export const updateUser = (id: string, data: Partial<User>) =>
  apiInstance.put(`${BASE_URL}/${id}`, data);

export const deleteUser = (id: string) =>
  apiInstance.delete(`${BASE_URL}/${id}`);

export const getUserById = (id: string): Promise<{ data: { user: User } }> =>
  apiInstance.get(`${BASE_URL}/${id}`);

// Update status of a user
export const updateUserStatus = (id: string, status: boolean) =>
  apiInstance.patch(`${BASE_URL}/${id}/isActive`, { isActive: status });

// Authentication related functions
export const loginUser = (email: string, password: string) =>
  apiInstance.post(`${BASE_URL}/login`, { email, password });

export const registerUser = (userData: Partial<User>) =>
  apiInstance.post(`${BASE_URL}/register`, userData);

export const refreshToken = (refreshToken: string) =>
  apiInstance.post(`${BASE_URL}/refresh-token`, { refreshToken });
