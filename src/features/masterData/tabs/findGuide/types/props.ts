// FindGuide component props types
import { FindGuideCategoryData } from "./index";

// FindGuide form props
export interface FindGuideCategoryFormProps {
  open: boolean;
  module: string;
  closeFormModal: () => void;
  isEditing: boolean;
  selectedObject: FindGuideCategoryData | null;
  addItem: (data: any) => Promise<any>;
  updateItem: (id: string | number, data: any) => Promise<any>;
  showUpdateConfirmModal: (item: any, data: any) => void;
  additionalData?: any;
}

// FindGuide table props
export interface FindGuideCategoryProps {
  categories: FindGuideCategoryData[];
  loading: boolean;
  onEdit: (id: string | number) => void;
  onDelete: (item: FindGuideCategoryData) => void;
}
