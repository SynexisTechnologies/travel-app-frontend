import React, { useState } from "react";
import { Card, Tabs, Space, Badge, message } from "antd";
import { GenericPage } from "@/shared/components";
import { useUsers } from "../hooks/useUsers";
import { userColumns } from "../config/userColumns";
import { UserView, UserForm } from "../components";
import type { User } from "../types";

const ManageUsers: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const hookData = useUsers();
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<User | null>(null);
  const [viewingItem, setViewingItem] = useState<User | null>(null);

  const handleAddClick = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleEdit = (record: User) => {
    setEditingItem(record);
    setModalOpen(true);
  };

  const handleView = (record: User) => {
    setViewingItem(record);
    setViewModalOpen(true);
  };

  const handleDelete = async (record: User) => {
    try {
      await hookData.deleteItem(record.id!);
      messageApi.success("User deleted successfully");
    } catch (error) {
      messageApi.error("Failed to delete user");
    }
  };

  const handleAdd = async (values: any) => {
    try {
      await hookData.addItem(values);
      messageApi.success("User created successfully");
    } catch (error) {
      messageApi.error("Failed to create user");
    }
  };

  const handleEditSubmit = async (id: string, values: any) => {
    try {
      await hookData.updateItem(id, values);
      messageApi.success("User updated successfully");
    } catch (error) {
      messageApi.error("Failed to update user");
    }
  };

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
        {/* Role-based Tabs */}
        <Tabs
          activeKey={hookData.selectedTab.toString()}
          onChange={(key) => hookData.setSelectedTab(parseInt(key))}
          items={tabItems}
          style={{ margin: "0 16px" }}
        />

        {/* Users Table */}
        <div style={{ padding: "0 16px" }}>
          <GenericPage
            title="" // Empty title since we have tabs
            data={hookData.data}
            columns={userColumns}
            loading={hookData.loading}
            onAdd={handleAddClick}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            showSearch={true}
            searchPlaceholder="Search users..."
            showDeleteConfirmation={true}
            getItemDisplayName={(record) =>
              `${record.firstname || ""} ${record.lastname || ""}`.trim() ||
              "user"
            }
          />
        </div>
      </Card>

      <UserForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        isEditing={!!editingItem}
        userData={editingItem}
        onAdd={handleAdd}
        onEdit={handleEditSubmit}
      />

      {viewingItem && (
        <UserView
          open={viewModalOpen}
          onClose={() => {
            setViewModalOpen(false);
            setViewingItem(null);
          }}
          userData={viewingItem}
          onEdit={(userId) => {
            // Find user by ID and open edit modal
            const user = hookData.data.find((u) => u.id === userId);
            if (user) {
              handleEdit(user);
              setViewModalOpen(false);
              setViewingItem(null);
            }
          }}
        />
      )}
    </>
  );
};

export default ManageUsers;
