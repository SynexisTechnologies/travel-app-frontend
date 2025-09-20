// Activity component props types
import { ActivityCategoryData } from "./index";

// Activity form props
export interface ActivityCategoryFormProps {
  open: boolean;
  module: string;
  closeFormModal: () => void;
  isEditing: boolean;
  selectedObject: ActivityCategoryData | null;
  addItem: (data: any) => Promise<any>;
  updateItem: (id: string | number, data: any) => Promise<any>;
  showUpdateConfirmModal: (item: any, data: any) => void;
  additionalData?: any;
}

// Activity table props
export interface ActivityCategoryProps {
  categories: ActivityCategoryData[];
  loading: boolean;
  onEdit: (id: string | number) => void;
  onDelete: (item: ActivityCategoryData) => void;
}
