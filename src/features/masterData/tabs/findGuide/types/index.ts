// FindGuide domain types
export interface FindGuideCategoryData {
  id?: string | number;
  main_category: string;
  extra_int1?: number;
  extra_int2?: number;
  extra_text1?: string;
  extra_text2?: string;
}

// API response types
export interface FindGuideResponse<T> {
  data: T[];
  message?: string;
  success?: boolean;
}

export interface SingleFindGuideResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}
