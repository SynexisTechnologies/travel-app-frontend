// Top Recommended Places domain types
export interface TopRecommendedPlace {
  id?: string | number;
  name: string;
  city?: string;
  category?: string;
  description?: string;
  photos?: string | string[];
  extratext1?: string;
  extratext2?: string;
  extraint1?: number;
  extraint2?: number;
  created_at?: string;
  updated_at?: string;
}

// API response types
export interface TopRecommendedPlaceResponse {
  data?: TopRecommendedPlace[];
  places?: TopRecommendedPlace[];
  total?: number;
  pagination?: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface SingleTopRecommendedPlaceResponse {
  data: TopRecommendedPlace;
  message?: string;
  success?: boolean;
}
