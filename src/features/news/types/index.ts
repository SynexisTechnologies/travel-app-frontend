// News domain types
export interface News {
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
export interface NewsResponse {
  data?: News[];
  news?: News[];
  total?: number;
  pagination?: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface SingleNewsResponse {
  data: News;
  message?: string;
  success?: boolean;
}
