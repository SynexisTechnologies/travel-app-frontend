import React, { useState } from "react";
import { Card, Tabs, Space, Badge, message } from "antd";
import { GenericPage } from "@/shared/components";
import { useDestinations } from "../hooks/useDestinations";
import { destinationColumnsWithActions } from "../config/destinationColumnsWithActions";
import { DestinationView, DestinationForm } from "../components";
import type { DestinationData } from "../types";

const ManageDestinations: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const hookData = useDestinations();
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DestinationData | null>(null);
  const [viewingItem, setViewingItem] = useState<DestinationData | null>(null);

  const handleAddRecord = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleEditRecord = (record: DestinationData) => {
    setEditingItem(record);
    setModalOpen(true);
  };

  const handleView = (record: DestinationData) => {
    setViewingItem(record);
    setViewModalOpen(true);
  };

  const handleDelete = async (record: DestinationData) => {
    try {
      await hookData.deleteItem(record.id!);
      messageApi.success("Destination deleted successfully");
    } catch (error) {
      messageApi.error("Failed to delete destination");
    }
  };

  const handleApprove = async (record: DestinationData) => {
    await hookData.approveDestination(record.id!);
  };

  const handleReject = async (record: DestinationData) => {
    await hookData.rejectDestination(record.id!);
  };

  const handleAdd = async (data: any) => {
    await hookData.addItem(data);
  };

  const handleEdit = async (id: string | number, data: any) => {
    await hookData.updateItem(id, data);
  };

  // Create columns with actions
  const columns = destinationColumnsWithActions({
    additionalData: hookData.additionalData,
    onApprove: handleApprove,
    onReject: handleReject,
    selectedTab: hookData.selectedTab,
    messageApi,
  });

  const tabItems = hookData.tabData.map((tab) => ({
    key: tab.key,
    label: (
      <Space>
        {tab.label}
        <Badge count={tab.count} />
      </Space>
    ),
  }));

  return (
    <>
      {contextHolder}
      <Card variant="borderless">
        {/* Status-based Tabs */}
        <Tabs
          activeKey={hookData.selectedTab.toString()}
          onChange={(key) => hookData.setSelectedTab(parseInt(key))}
          items={tabItems}
          style={{ margin: "0 16px" }}
        />

        {/* Destinations Table */}
        <div style={{ padding: "0 16px" }}>
          <GenericPage
            title="" // Empty title since we have tabs
            data={hookData.data}
            columns={columns}
            loading={hookData.loading}
            onAdd={handleAddRecord}
            onEdit={handleEditRecord}
            onDelete={handleDelete}
            onView={handleView}
            showSearch={true}
            searchPlaceholder="Search destinations..."
            showDeleteConfirmation={true}
            getItemDisplayName={(record) => record.name || "destination"}
          />
        </div>
      </Card>

      <DestinationForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        isEditing={!!editingItem}
        destinationData={editingItem}
        onAdd={handleAdd}
        onEdit={handleEdit}
        additionalData={hookData.additionalData}
      />

      {viewingItem && (
        <DestinationView
          module="destinations"
          viewModal={{
            open: viewModalOpen,
            selectedObject: viewingItem,
          }}
          closeViewModal={() => {
            setViewModalOpen(false);
            setViewingItem(null);
          }}
          handleEdit={handleEditRecord}
          loadOneItem={hookData.loadOneItem}
          additionalData={hookData.additionalData}
        />
      )}
    </>
  );
};

export default ManageDestinations;
