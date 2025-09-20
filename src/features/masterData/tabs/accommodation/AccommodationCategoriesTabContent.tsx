import React, { useState } from "react";
import { message } from "antd";
import { GenericPage, FormModal } from "@/shared/components";
import { useAccommodationCategories } from "./hooks/useAccommodationCategories";
import type { AccommodationCategoryData } from "./types";

const AccommodationCategoriesTabContent: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const hookData = useAccommodationCategories();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] =
    useState<AccommodationCategoryData | null>(null);

  // Simple table columns
  const columns = [
    {
      title: "Category Name",
      dataIndex: "main_category",
      key: "main_category",
    },
  ];

  // Simple form fields
  const formFields = [
    {
      name: "main_category",
      label: "Category Name",
      type: "input" as const,
      rules: [{ required: true, message: "Please enter category name" }],
    },
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleEdit = (record: AccommodationCategoryData) => {
    setEditingItem(record);
    setModalOpen(true);
  };

  const handleDelete = async (record: AccommodationCategoryData) => {
    try {
      if (!record.id) {
        messageApi.error("Cannot delete item without ID");
        return;
      }
      await hookData.deleteItem(record.id);
      messageApi.success("Accommodation category deleted successfully");
    } catch (error) {
      messageApi.error("Failed to delete accommodation category");
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
        messageApi.success("Accommodation category updated successfully");
      } else {
        await hookData.addItem(values);
        messageApi.success("Accommodation category created successfully");
      }
      setModalOpen(false);
    } catch (error) {
      messageApi.error("Failed to save accommodation category");
    }
  };

  return (
    <>
      {contextHolder}
      <GenericPage
        title="Accommodation Categories"
        data={hookData.data}
        columns={columns}
        loading={hookData.loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormModal
        title={
          editingItem
            ? "Edit Accommodation Category"
            : "Add Accommodation Category"
        }
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        fields={formFields}
        initialValues={editingItem}
      />
    </>
  );
};

export default AccommodationCategoriesTabContent;
