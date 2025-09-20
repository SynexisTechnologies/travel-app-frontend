import React, { useState } from "react";
import { message } from "antd";
import { GenericPage, FormModal } from "@/shared/components";
import { useNews } from "../hooks/useNews";
import { newsColumns } from "../config/newsColumns";
import type { News } from "../types";

const ManageNews: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const hookData = useNews(messageApi);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<News | null>(null);

  // Form fields configuration
  const formFields = [
    {
      name: "title",
      label: "Title",
      type: "input" as const,
      rules: [{ required: true, message: "Please enter news title" }],
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

  const handleEdit = (record: News) => {
    setEditingItem(record);
    setModalOpen(true);
  };

  const handleDelete = async (record: News) => {
    try {
      if (!record.id) {
        messageApi.error("Cannot delete item without ID");
        return;
      }
      await hookData.deleteItem(record.id);
      messageApi.success("News deleted successfully");
    } catch (error) {
      messageApi.error("Failed to delete news");
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
        messageApi.success("News updated successfully");
      } else {
        await hookData.addItem(values);
        messageApi.success("News created successfully");
      }
      setModalOpen(false);
    } catch (error) {
      messageApi.error("Failed to save news");
    }
  };

  return (
    <>
      {contextHolder}
      <GenericPage
        title="Manage News"
        data={hookData.data}
        columns={newsColumns}
        loading={hookData.loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showSearch={true}
        searchPlaceholder="Search news..."
        showDeleteConfirmation={true}
        getItemDisplayName={(record) => record.title || "news item"}
      />

      <FormModal
        title={editingItem ? "Edit News" : "Add News"}
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

export default ManageNews;
