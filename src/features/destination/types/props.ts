// Component Props Types for Destination Feature

import { DestinationData, DestinationAdditionalData } from "./index";

// View component props (only one still being used)
export interface DestinationViewProps {
  module: string;
  viewModal: {
    open: boolean;
    selectedObject: DestinationData | null;
  };
  closeViewModal: () => void;
  handleEdit: (item: DestinationData) => void;
  loadOneItem: (id: string | number) => Promise<DestinationData>;
  additionalData?: DestinationAdditionalData;
}
