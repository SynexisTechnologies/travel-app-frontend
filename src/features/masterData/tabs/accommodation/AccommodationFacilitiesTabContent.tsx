import React, { useState } from "react";
import { message } from "antd";
import { GenericPage, FormModal } from "@/shared/components";
import { useAccommodationFacilities } from "./hooks/useAccommodationFacilities";
import type { AccommodationFacilityData } from "./types";

const AccommodationFacilitiesTabContent: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const hookData = useAccommodationFacilities();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] =
    useState<AccommodationFacilityData | null>(null);

  // Simple table columns
  const columns = [
    {
      title: "Facility Name",
      dataIndex: "facility",
      key: "facility",
    },
  ];

  // Simple form fields
  const formFields = [
    {
      name: "facility",
      label: "Facility Name",
      type: "input" as const,
      rules: [{ required: true, message: "Please enter facility name" }],
    },
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleEdit = (record: AccommodationFacilityData) => {
    setEditingItem(record);
    setModalOpen(true);
  };

  const handleDelete = async (record: AccommodationFacilityData) => {
    try {
      if (!record.id) {
        messageApi.error("Cannot delete item without ID");
        return;
      }
      await hookData.deleteItem(record.id);
      messageApi.success("Accommodation facility deleted successfully");
    } catch (error) {
      messageApi.error("Failed to delete accommodation facility");
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
        messageApi.success("Accommodation facility updated successfully");
      } else {
        await hookData.addItem(values);
        messageApi.success("Accommodation facility created successfully");
      }
      setModalOpen(false);
    } catch (error) {
      messageApi.error("Failed to save accommodation facility");
    }
  };

  return (
    <>
      {contextHolder}
      <GenericPage
        title="Accommodation Facilities"
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
            ? "Edit Accommodation Facility"
            : "Add Accommodation Facility"
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

export default AccommodationFacilitiesTabContent;
