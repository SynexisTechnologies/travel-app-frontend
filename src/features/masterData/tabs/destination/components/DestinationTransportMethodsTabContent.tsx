import React, { useState } from "react";
import { message } from "antd";
import { GenericPage, FormModal } from "@/shared/components";
import { useDestinationTransportMethods } from "../hooks/useDestinationTransportMethods";
import type { DestinationTransportMethodData } from "../types";

const DestinationTransportMethodsTabContent: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const hookData = useDestinationTransportMethods();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] =
    useState<DestinationTransportMethodData | null>(null);

  // Simple table columns
  const columns = [
    {
      title: "Transport Method Name",
      dataIndex: "transport_method",
      key: "transport_method",
    },
  ];

  // Simple form fields
  const formFields = [
    {
      name: "transport_method",
      label: "Transport Method Name",
      type: "input" as const,
      rules: [
        { required: true, message: "Please enter transport method name" },
      ],
    },
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleEdit = (record: DestinationTransportMethodData) => {
    setEditingItem(record);
    setModalOpen(true);
  };

  const handleDelete = async (record: DestinationTransportMethodData) => {
    try {
      if (!record.id) {
        messageApi.error("Cannot delete item without ID");
        return;
      }
      await hookData.deleteItem(record.id);
      messageApi.success("Transport method deleted successfully");
    } catch (error) {
      messageApi.error("Failed to delete transport method");
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
        messageApi.success("Transport method updated successfully");
      } else {
        await hookData.addItem(values);
        messageApi.success("Transport method created successfully");
      }
      setModalOpen(false);
    } catch (error) {
      messageApi.error("Failed to save transport method");
    }
  };

  return (
    <>
      {contextHolder}
      <GenericPage
        title="Destination Transport Methods"
        data={hookData.data}
        columns={columns}
        loading={hookData.loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormModal
        title={editingItem ? "Edit Transport Method" : "Add Transport Method"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        fields={formFields}
        initialValues={editingItem}
      />
    </>
  );
};

export default DestinationTransportMethodsTabContent;
