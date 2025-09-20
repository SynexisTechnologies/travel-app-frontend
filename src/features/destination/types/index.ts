// Domain Types for Destination Feature

// Main destination data interface
export interface DestinationData {
  id?: string | number;
  province?: string;
  district?: string;
  city?: string;
  category?: string | number;
  name: string;
  google_map_location?: string;
  rating?: number;
  suggestion_time?: string;
  transport_method?: string | number;
  website_social_media_link?: any;
  contact_no?: any;
  ticket_price?: number;
  open_time?: string;
  always_open?: boolean;
  need_ticket?: boolean;
  traveler_type?: string | number;
  description?: string;
  photos?: string;
  tag?: string;
  pending?: boolean;
  reject?: boolean;
  approved?: boolean;
  extra_int1?: number;
  extra_int2?: number;
  extra_text1?: string;
  extra_text2?: string;
}

// Related entity types
export interface DestinationCategory {
  id: string | number;
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

export interface DestinationTransportMethod {
  id: string | number;
  transport_method: string;
  extra_int1?: number;
  extra_int2?: number;
  extra_text1?: string;
  extra_text2?: string;
}

export interface DestinationTravelType {
  id: string | number;
  travel_type: string;
  extra_int1?: number;
  extra_int2?: number;
  extra_text1?: string;
  extra_text2?: string;
}

// Additional data structure for dropdowns and lookups
export interface DestinationAdditionalData {
  categories: DestinationCategory[];
  transportMethods: DestinationTransportMethod[];
  travelTypes: DestinationTravelType[];
}

// API Response types
export interface DestinationListResponse {
  destinations?: DestinationData[];
  data?: DestinationData[];
  total?: number;
}

export interface DestinationResponse {
  destination?: DestinationData;
  data?: DestinationData;
}

// Form data types
export interface DestinationFormData
  extends Omit<DestinationData, "id" | "created_at" | "updated_at"> {}

export interface DestinationUpdateData extends Partial<DestinationFormData> {}

// Re-export all props types
export * from "./props";
