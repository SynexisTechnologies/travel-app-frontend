// Event component props types
import { EventCategoryData } from "./index";

// Event form props
export interface EventCategoryFormProps {
  open: boolean;
  module: string;
  closeFormModal: () => void;
  isEditing: boolean;
  selectedObject: EventCategoryData | null;
  addItem: (data: any) => Promise<any>;
  updateItem: (id: string | number, data: any) => Promise<any>;
  showUpdateConfirmModal: (item: any, data: any) => void;
  additionalData?: any;
}

// Event table props
export interface EventCategoryProps {
  categories: EventCategoryData[];
  loading: boolean;
  onEdit: (id: string | number) => void;
  onDelete: (item: EventCategoryData) => void;
}
