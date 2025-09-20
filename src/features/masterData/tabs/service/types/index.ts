// Service domain types
export interface ServiceCategoryData {
  id?: string | number;
  category_name: string;
  subcategories?: Array<{
    sub_category_name: string;
    image: string;
  }>;
  extra_int1?: number;
  extra_int2?: number;
  extra_text1?: string;
  extra_text2?: string;
}

// API response types
export interface ServiceResponse<T> {
  data: T[];
  message?: string;
  success?: boolean;
}

export interface SingleServiceResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

// API parameters
export interface GetServiceCategoriesParams {
  page?: number;
  limit?: number;
  search?: string;
}

// Form data type for multipart uploads
export interface ServiceCategoryFormData extends FormData {}
