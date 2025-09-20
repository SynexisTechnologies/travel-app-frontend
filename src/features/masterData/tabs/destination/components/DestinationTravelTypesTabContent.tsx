import React, { useState } from "react";
import { message } from "antd";
import { GenericPage, FormModal } from "@/shared/components";
import { useDestinationTravelTypes } from "../hooks/useDestinationTravelTypes";
import type { DestinationTravelTypeData } from "../types";

const DestinationTravelTypesTabContent: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const hookData = useDestinationTravelTypes();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] =
    useState<DestinationTravelTypeData | null>(null);

  // Simple table columns
  const columns = [
    {
      title: "Travel Type Name",
      dataIndex: "travel_type",
      key: "travel_type",
    },
  ];

  // Simple form fields
  const formFields = [
    {
      name: "travel_type",
      label: "Travel Type Name",
      type: "input" as const,
      rules: [{ required: true, message: "Please enter travel type name" }],
    },
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleEdit = (record: DestinationTravelTypeData) => {
    setEditingItem(record);
    setModalOpen(true);
  };

  const handleDelete = async (record: DestinationTravelTypeData) => {
    try {
      if (!record.id) {
        messageApi.error("Cannot delete item without ID");
        return;
      }
      await hookData.deleteItem(record.id);
      messageApi.success("Travel type deleted successfully");
    } catch (error) {
      messageApi.error("Failed to delete travel type");
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
        messageApi.success("Travel type updated successfully");
      } else {
        await hookData.addItem(values);
        messageApi.success("Travel type created successfully");
      }
      setModalOpen(false);
    } catch (error) {
      messageApi.error("Failed to save travel type");
    }
  };

  return (
    <>
      {contextHolder}
      <GenericPage
        title="Destination Travel Types"
        data={hookData.data}
        columns={columns}
        loading={hookData.loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormModal
        title={editingItem ? "Edit Travel Type" : "Add Travel Type"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        fields={formFields}
        initialValues={editingItem}
      />
    </>
  );
};

export default DestinationTravelTypesTabContent;
