import { useState, useCallback } from "react";

// Custom hook to manage delete confirmation modal state and actions
export const useDeleteConfirm = (onDelete) => {
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    loading: false,
    item: null,
    itemName: "",
    itemType: "item",
    message: "",
    title: "Confirm Delete",
    type: null,
  });

  const openDeleteModal = useCallback((item, options = {}) => {
    setDeleteModal({
      open: true,
      loading: false,
      item,
      itemName:
        options.itemName || item?.name || item?.title || item?.label || "",
      itemType: options.itemType || "item",
      message: options.message || "",
      title: options.title || "Confirm Delete",
      type: options.type, // Add type to support different delete operations
    });
  }, []);

  const closeDeleteModal = useCallback(() => {
    setDeleteModal((prev) => ({
      ...prev,
      open: false,
      loading: false,
      item: null,
    }));
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!deleteModal.item || !onDelete) return;

    setDeleteModal((prev) => ({ ...prev, loading: true }));

    try {
      await onDelete(deleteModal.item);
      closeDeleteModal();
    } catch (error) {
      console.error("Delete failed:", error);
      setDeleteModal((prev) => ({ ...prev, loading: false }));
    }
  }, [deleteModal.item, onDelete, closeDeleteModal]);

  return {
    deleteModal,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  };
};
