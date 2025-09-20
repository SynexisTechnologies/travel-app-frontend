import React, { useState } from "react";
import { message } from "antd";
import { GenericPage, FormModal } from "@/shared/components";
import { useEventCategories } from "./hooks/useEventCategories";
import type { EventCategoryData } from "./types";

const EventTabContent: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const hookData = useEventCategories();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EventCategoryData | null>(
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

  const handleEdit = (record: EventCategoryData) => {
    setEditingItem(record);
    setModalOpen(true);
  };

  const handleDelete = async (record: EventCategoryData) => {
    try {
      if (!record.id) {
        messageApi.error("Cannot delete item without ID");
        return;
      }
      await hookData.deleteItem(record.id);
      messageApi.success("Event category deleted successfully");
    } catch (error) {
      messageApi.error("Failed to delete event category");
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
        messageApi.success("Event category updated successfully");
      } else {
        await hookData.addItem(values);
        messageApi.success("Event category created successfully");
      }
      setModalOpen(false);
    } catch (error) {
      messageApi.error("Failed to save event category");
    }
  };

  return (
    <>
      {contextHolder}
      <GenericPage
        title="Event Categories"
        data={hookData.data}
        columns={columns}
        loading={hookData.loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormModal
        title={editingItem ? "Edit Event Category" : "Add Event Category"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        fields={formFields}
        initialValues={editingItem}
      />
    </>
  );
};

export default EventTabContent;
