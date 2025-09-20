import React, { useState } from "react";
import { message } from "antd";
import { GenericPage, FormModal } from "@/shared/components";
import { useFindGuideCategories } from "./hooks/useFindGuideCategories";
import type { FindGuideCategoryData } from "./types";

const FindGuideTabContent: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const hookData = useFindGuideCategories();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FindGuideCategoryData | null>(
    null
  );

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

  const handleEdit = (record: FindGuideCategoryData) => {
    setEditingItem(record);
    setModalOpen(true);
  };

  const handleDelete = async (record: FindGuideCategoryData) => {
    try {
      if (!record.id) {
        messageApi.error("Cannot delete item without ID");
        return;
      }
      await hookData.deleteItem(record.id);
      messageApi.success("Find guide category deleted successfully");
    } catch (error) {
      messageApi.error("Failed to delete find guide category");
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
        messageApi.success("Find guide category updated successfully");
      } else {
        await hookData.addItem(values);
        messageApi.success("Find guide category created successfully");
      }
      setModalOpen(false);
    } catch (error) {
      messageApi.error("Failed to save find guide category");
    }
  };

  return (
    <>
      {contextHolder}
      <GenericPage
        title="Find Guide Categories"
        data={hookData.data}
        columns={columns}
        loading={hookData.loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormModal
        title={
          editingItem ? "Edit Find Guide Category" : "Add Find Guide Category"
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

export default FindGuideTabContent;
