// Activity domain types
export interface ActivityCategoryData {
  id?: string | number;
  category_name: string;
  sub_categories?: {
    sub_category_name: string;
    image: string;
  }[];
  extra_int1?: number;
  extra_int2?: number;
  extra_text1?: string;
  extra_text2?: string;
}

// API response types
export interface ActivityResponse<T> {
  data: T[];
  message?: string;
  success?: boolean;
}

export interface SingleActivityResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}
