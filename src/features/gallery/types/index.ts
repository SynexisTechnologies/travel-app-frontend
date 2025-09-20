// Gallery domain types
export interface Gallery {
  id?: string | number;
  photos?: string | string[];
  description?: string;
  extratext1?: string;
  extratext2?: string;
  extraint1?: number;
  extraint2?: number;
  created_at?: string;
  updated_at?: string;
}

// API response types
export interface GalleryResponse {
  data?: Gallery[];
  photos?: Gallery[];
  total?: number;
  pagination?: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface SingleGalleryResponse {
  data: Gallery;
  message?: string;
  success?: boolean;
}
