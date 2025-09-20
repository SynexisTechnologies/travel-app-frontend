// Advertisement domain types
export interface Advertisement {
  id?: string | number;
  title: string;
  category?: string;
  description?: string;
  photos?: string | string[];
  datetime?: string;
  extratext1?: string;
  extratext2?: string;
  extraint1?: number;
  extraint2?: number;
  created_at?: string;
  updated_at?: string;
}

// API response types
export interface AdvertisementResponse {
  data?: Advertisement[];
  advertisement?: Advertisement[];
  total?: number;
  pagination?: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface SingleAdvertisementResponse {
  data: Advertisement;
  message?: string;
  success?: boolean;
}
