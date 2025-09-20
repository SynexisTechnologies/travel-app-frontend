// Service component props types
import { ServiceCategoryData } from "./index";

// Service form props
export interface ServiceCategoryFormProps {
  open: boolean;
  module: string;
  closeFormModal: () => void;
  isEditing: boolean;
  selectedObject: ServiceCategoryData | null;
  addItem: (data: any) => Promise<any>;
  updateItem: (id: string | number, data: any) => Promise<any>;
  showUpdateConfirmModal: (item: any, data: any) => void;
  additionalData?: any;
}

// Service table props
export interface ServiceCategoryProps {
  categories: ServiceCategoryData[];
  loading: boolean;
  onEdit: (id: string | number) => void;
  onDelete: (item: ServiceCategoryData) => void;
}
