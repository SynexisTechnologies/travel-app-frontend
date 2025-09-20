import React, { useState } from "react";
import { message } from "antd";
import { GenericPage, FormModal } from "@/shared/components";
import { useAdvertisements } from "../hooks/useAdvertisements";
import { advertisementColumns } from "../config/advertisementColumns";
import type { Advertisement } from "../types";

const ManageAdvertisements: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const hookData = useAdvertisements(messageApi);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Advertisement | null>(null);

  // Form fields configuration
  const formFields = [
    {
      name: "title",
      label: "Title",
      type: "input" as const,
      rules: [{ required: true, message: "Please enter advertisement title" }],
      col: 24,
    },
    {
      name: "category",
      label: "Category",
      type: "input" as const,
      col: 12,
    },
    {
      name: "datetime",
      label: "Date & Time",
      type: "date" as const,
      col: 12,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      rows: 4,
      col: 24,
    },
    {
      name: "photos",
      label: "Photos",
      type: "upload" as const,
      col: 24,
    },
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleEdit = (record: Advertisement) => {
    setEditingItem(record);
    setModalOpen(true);
  };

  const handleDelete = async (record: Advertisement) => {
    try {
      if (!record.id) {
        messageApi.error("Cannot delete item without ID");
        return;
      }
      await hookData.deleteItem(record.id);
      messageApi.success("Advertisement deleted successfully");
    } catch (error) {
      messageApi.error("Failed to delete advertisement");
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      // Convert datetime to proper format if needed
      if (values.datetime) {
        values.datetime = values.datetime.toISOString();
      }

      if (editingItem) {
        if (!editingItem.id) {
          messageApi.error("Cannot update item without ID");
          return;
        }
        await hookData.updateItem(editingItem.id, values);
        messageApi.success("Advertisement updated successfully");
      } else {
        await hookData.addItem(values);
        messageApi.success("Advertisement created successfully");
      }
      setModalOpen(false);
    } catch (error) {
      messageApi.error("Failed to save advertisement");
    }
  };

  return (
    <>
      {contextHolder}
      <GenericPage
        title="Manage Advertisements"
        data={hookData.data}
        columns={advertisementColumns}
        loading={hookData.loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showSearch={true}
        searchPlaceholder="Search advertisements..."
        showDeleteConfirmation={true}
        getItemDisplayName={(record) => record.title || "advertisement"}
      />

      <FormModal
        title={editingItem ? "Edit Advertisement" : "Add Advertisement"}
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

export default ManageAdvertisements;
