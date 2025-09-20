import React from "react";

// Simple base entity for all data models
export interface BaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
}

// Common subcategory structure used across multiple features
export interface Subcategory {
  id?: string | number;
  sub_category_name: string;
  image?: string;
}

// Simple pagination type
export interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}

// Simple table action handlers
export interface TableActions<T = any> {
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
  onView?: (record: T) => void;
}

// Simple modal props
export interface ModalProps {
  open: boolean;
  onCancel: () => void;
  title?: string;
  loading?: boolean;
}

// Form field types - keeping it simple
export interface FormField {
  name: string;
  label: string;
  type: "input" | "textarea" | "select" | "date" | "switch" | "password";
  rules?: any[];
  options?: { label: string; value: any }[];
  placeholder?: string;
  rows?: number;
}

// CRUD operations interface - simplified
export interface CrudOperations<T = any> {
  data: T[];
  loading: boolean;
  addItem: (item: Omit<T, "id">) => Promise<void>;
  updateItem: (id: string, item: Partial<T>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
}
