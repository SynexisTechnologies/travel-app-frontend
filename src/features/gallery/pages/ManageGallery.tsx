import React, { useState } from "react";
import { message } from "antd";
import { GenericPage, FormModal } from "@/shared/components";
import { useGallery } from "../hooks/useGallery";
import { galleryColumns } from "../config/galleryColumns";
import type { Gallery } from "../types";

const ManageGallery: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const hookData = useGallery(messageApi);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Gallery | null>(null);

  // Form fields configuration
  const formFields = [
    {
      name: "photos",
      label: "Photos",
      type: "upload" as const,
      rules: [{ required: true, message: "Please upload at least one photo" }],
      col: 24,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      rows: 4,
      col: 24,
    },
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleEdit = (record: Gallery) => {
    setEditingItem(record);
    setModalOpen(true);
  };

  const handleDelete = async (record: Gallery) => {
    try {
      if (!record.id) {
        messageApi.error("Cannot delete item without ID");
        return;
      }
      await hookData.deleteItem(record.id);
      messageApi.success("Gallery item deleted successfully");
    } catch (error) {
      messageApi.error("Failed to delete gallery item");
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingItem) {
        if (!editingItem.id) {
          messageApi.error("Cannot update item without ID");
          return;
        }
        await hookData.updateItem(editingItem.id, values);
        messageApi.success("Gallery item updated successfully");
      } else {
        await hookData.addItem(values);
        messageApi.success("Gallery item created successfully");
      }
      setModalOpen(false);
    } catch (error) {
      messageApi.error("Failed to save gallery item");
    }
  };

  return (
    <>
      {contextHolder}
      <GenericPage
        title="Manage Photo Gallery"
        data={hookData.data}
        columns={galleryColumns}
        loading={hookData.loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showSearch={true}
        searchPlaceholder="Search gallery items..."
        showDeleteConfirmation={true}
        getItemDisplayName={(record) => record.description || "gallery item"}
      />

      <FormModal
        title={editingItem ? "Edit Gallery Item" : "Add Gallery Item"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        fields={formFields}
        initialValues={editingItem}
        width={800}
      />
    </>
  );
};

export default ManageGallery;
