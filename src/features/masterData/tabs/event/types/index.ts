// Event domain types
export interface EventCategoryData {
  id?: string | number;
  main_category: string;
  extra_int1?: number;
  extra_int2?: number;
  extra_text1?: string;
  extra_text2?: string;
}

// API response types
export interface EventResponse<T> {
  data: T[];
  message?: string;
  success?: boolean;
}

export interface SingleEventResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}
