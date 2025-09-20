import { useState } from "react";

// Modal state interfaces
interface FormModalState {
  open: boolean;
  isEditing: boolean;
  selectedObject: any;
}

interface ViewModalState {
  open: boolean;
  selectedObject: any;
}

interface DeleteRestoreModalState {
  open: boolean;
  selectedObject: any;
  type: "delete" | "restore";
}

interface UpdateConfirmModalState {
  open: boolean;
  selectedObject: any;
  updateData: any;
}

// Custom hook for managing modal states
export const useModalStates = () => {
  // Form modal state (for add/edit)
  const [formModalState, setFormModalState] = useState<FormModalState>({
    open: false,
    isEditing: false,
    selectedObject: null,
  });

  // View modal state
  const [viewModal, setViewModal] = useState<ViewModalState>({
    open: false,
    selectedObject: null,
  });

  // Delete/Restore modal state
  const [deleteRestoreModal, setDeleteRestoreModal] =
    useState<DeleteRestoreModalState>({
      open: false,
      selectedObject: null,
      type: "delete",
    });

  // Update confirmation modal state
  const [updateConfirmModal, setUpdateConfirmModal] =
    useState<UpdateConfirmModalState>({
      open: false,
      selectedObject: null,
      updateData: null,
    });

  // Form modal functions
  const openFormModal = (isEditing: boolean, selectedObject: any = null) => {
    setFormModalState({
      open: true,
      isEditing,
      selectedObject,
    });
  };

  const closeFormModal = () => {
    setFormModalState({
      open: false,
      isEditing: false,
      selectedObject: null,
    });
  };

  const handleEdit = (item: any) => {
    openFormModal(true, item);
  };

  // View modal functions
  const handleView = (item: any) => {
    setViewModal({
      open: true,
      selectedObject: item,
    });
  };

  const closeViewModal = () => {
    setViewModal({
      open: false,
      selectedObject: null,
    });
  };

  // Delete/Restore modal functions
  const opendeleteRestoreModal = (
    selectedObject: any,
    type: "delete" | "restore" = "delete"
  ) => {
    setDeleteRestoreModal({
      open: true,
      selectedObject,
      type,
    });
  };

  const closedeleteRestoreModal = () => {
    setDeleteRestoreModal({
      open: false,
      selectedObject: null,
      type: "delete",
    });
  };

  // Update confirmation modal functions
  const showUpdateConfirmModal = (selectedObject: any, updateData: any) => {
    setUpdateConfirmModal({
      open: true,
      selectedObject,
      updateData,
    });
  };

  const closeUpdateConfirmModal = () => {
    setUpdateConfirmModal({
      open: false,
      selectedObject: null,
      updateData: null,
    });
  };

  return {
    // States
    formModalState,
    viewModal,
    deleteRestoreModal,
    updateConfirmModal,

    // Form modal functions
    openFormModal,
    closeFormModal,
    handleEdit,

    // View modal functions
    handleView,
    closeViewModal,

    // Delete/Restore modal functions
    opendeleteRestoreModal,
    closedeleteRestoreModal,

    // Update confirmation modal functions
    showUpdateConfirmModal,
    closeUpdateConfirmModal,
  };
};

export default useModalStates;
