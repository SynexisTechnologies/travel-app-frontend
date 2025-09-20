// Destination masterData component props types
import {
  DestinationCategoryData,
  DestinationTravelTypeData,
  DestinationTransportMethodData,
} from "./index";

// Generic destination master form props
export interface DestinationMasterFormProps<
  T =
    | DestinationCategoryData
    | DestinationTravelTypeData
    | DestinationTransportMethodData
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

// Destination category specific props
export interface DestinationCategoryFormProps
  extends DestinationMasterFormProps<DestinationCategoryData> {}

export interface DestinationCategoryProps {
  categories: DestinationCategoryData[];
  loading: boolean;
  onEdit: (id: string | number) => void;
  onDelete: (item: DestinationCategoryData) => void;
}

// Travel type specific props
export interface DestinationTravelTypeFormProps
  extends DestinationMasterFormProps<DestinationTravelTypeData> {}

export interface DestinationTravelTypeProps {
  travelTypes: DestinationTravelTypeData[];
  loading: boolean;
  onEdit: (id: string | number) => void;
  onDelete: (item: DestinationTravelTypeData) => void;
}

// Transport method specific props
export interface DestinationTransportMethodFormProps
  extends DestinationMasterFormProps<DestinationTransportMethodData> {}

export interface DestinationTransportMethodProps {
  transportMethods: DestinationTransportMethodData[];
  loading: boolean;
  onEdit: (id: string | number) => void;
  onDelete: (item: DestinationTransportMethodData) => void;
}
