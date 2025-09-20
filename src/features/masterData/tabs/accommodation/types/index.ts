// Accommodation domain types
export interface AccommodationCategoryData {
  id?: string | number;
  main_category: string;
  extra_int1?: number;
  extra_int2?: number;
  extra_text1?: string;
  extra_text2?: string;
}

export interface AccommodationFacilityData {
  id?: string | number;
  facility: string;
  extra_int1?: number;
  extra_int2?: number;
  extra_text1?: string;
  extra_text2?: string;
}

// API response types
export interface AccommodationResponse<T> {
  data: T[];
  message?: string;
  success?: boolean;
}

export interface SingleAccommodationResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}
