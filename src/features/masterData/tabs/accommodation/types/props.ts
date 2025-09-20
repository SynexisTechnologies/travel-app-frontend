// Accommodation component props types
import { AccommodationCategoryData, AccommodationFacilityData } from "./index";

// Generic form props for accommodation
export interface AccommodationFormProps<
  T = AccommodationCategoryData | AccommodationFacilityData
> {
  open: boolean;
  module: string;
  closeFormModal: () => void;
  isEditing: boolean;
  selectedObject: T | null;
  addItem: (data: any) => Promise<any>;
  updateItem: (id: string | number, data: any) => Promise<any>;
  showUpdateConfirmModal: (item: any, data: any) => void;
  additionalData?: any;
}

// Accommodation category specific props
export interface AccommodationCategoryFormProps
  extends AccommodationFormProps<AccommodationCategoryData> {}

export interface AccommodationCategoryProps {
  categories: AccommodationCategoryData[];
  loading: boolean;
  onEdit: (id: string | number) => void;
  onDelete: (item: AccommodationCategoryData) => void;
}

// Accommodation facility specific props
export interface AccommodationFacilityFormProps
  extends AccommodationFormProps<AccommodationFacilityData> {}

export interface AccommodationFacilityProps {
  facilities: AccommodationFacilityData[];
  loading: boolean;
  onEdit: (id: string | number) => void;
  onDelete: (item: AccommodationFacilityData) => void;
}
