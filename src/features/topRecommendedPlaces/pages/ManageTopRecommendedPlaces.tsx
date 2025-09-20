import React, { useState } from "react";
import { message } from "antd";
import { GenericPage, FormModal } from "@/shared/components";
import { useTopRecommendedPlaces } from "../hooks/useTopRecommendedPlaces";
import { topRecommendedPlacesColumns } from "../config/topRecommendedPlacesColumns";
import type { TopRecommendedPlace } from "../types";

const ManageTopRecommendedPlaces: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const hookData = useTopRecommendedPlaces(messageApi);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TopRecommendedPlace | null>(
    null
  );

  // Form fields configuration
  const formFields = [
    {
      name: "name",
      label: "Place Name",
      type: "input" as const,
      rules: [{ required: true, message: "Please enter place name" }],
      col: 24,
    },
    {
      name: "city",
      label: "City",
      type: "input" as const,
      rules: [{ required: true, message: "Please enter city" }],
      col: 12,
    },
    {
      name: "category",
      label: "Category",
      type: "input" as const,
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

  const handleEdit = (record: TopRecommendedPlace) => {
    setEditingItem(record);
    setModalOpen(true);
  };

  const handleDelete = async (record: TopRecommendedPlace) => {
    try {
      if (!record.id) {
        messageApi.error("Cannot delete item without ID");
        return;
      }
      await hookData.deleteItem(record.id);
      messageApi.success("Top recommended place deleted successfully");
    } catch (error) {
      messageApi.error("Failed to delete top recommended place");
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
        messageApi.success("Top recommended place updated successfully");
      } else {
        await hookData.addItem(values);
        messageApi.success("Top recommended place created successfully");
      }
      setModalOpen(false);
    } catch (error) {
      messageApi.error("Failed to save top recommended place");
    }
  };

  return (
    <>
      {contextHolder}
      <GenericPage
        title="Manage Top Recommended Places"
        data={hookData.data}
        columns={topRecommendedPlacesColumns}
        loading={hookData.loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showSearch={true}
        searchPlaceholder="Search top recommended places..."
        showDeleteConfirmation={true}
        getItemDisplayName={(record) => record.name || "place"}
      />

      <FormModal
        title={
          editingItem
            ? "Edit Top Recommended Place"
            : "Add Top Recommended Place"
        }
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

export default ManageTopRecommendedPlaces;
