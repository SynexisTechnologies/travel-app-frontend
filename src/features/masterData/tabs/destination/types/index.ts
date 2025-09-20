// Destination masterData domain types
export interface DestinationCategoryData {
  id?: string | number;
  category_name: string;
  subcategories?: {
    sub_category_name: string;
    image: string;
  }[];
  extra_int1?: number;
  extra_int2?: number;
  extra_text1?: string;
  extra_text2?: string;
}

export interface DestinationTravelTypeData {
  id?: string | number;
  travel_type: string;
  extra_int1?: number;
  extra_int2?: number;
  extra_text1?: string;
  extra_text2?: string;
}

export interface DestinationTransportMethodData {
  id?: string | number;
  transport_method: string;
  extra_int1?: number;
  extra_int2?: number;
  extra_text1?: string;
  extra_text2?: string;
}

// API response types
export interface DestinationMasterResponse<T> {
  data: T[];
  message?: string;
  success?: boolean;
}

export interface SingleDestinationMasterResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

// API parameters
export interface GetDestinationMasterParams {
  page?: number;
  limit?: number;
  search?: string;
}
