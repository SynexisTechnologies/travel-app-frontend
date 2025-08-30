import { useState } from "react";
import { Card, Button, Tabs, Table, Space, Badge } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import UserForm from "../components/UserForm";
import UserView from "../components/UserView";
import { useUsers } from "../hooks/useUsers";
import { getUserConfigs } from "../config/getUserConfigs";

const ManageUsers = () => {
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const {
    users,
    loading,
    addUser,
    updateAnUser,
    getSingleUser,
    selectedTab,
    setSelectedTab,
    pagination,
    setPagination,
    updateAnUserStatus,
    contextHolder,
  } = useUsers();

  const openForm = (user = null, editing = false) => {
    setSelectedUser(user);
    setIsEditing(editing);
    setOpen(true);
  };

  const handleEdit = (userId) => {
    getSingleUser(userId).then((user) => {
      openForm(user, true);
    });
  };

  const handleView = (userId) => {
    getSingleUser(userId).then((user) => {
      setViewUser(user);
      setViewOpen(true);
    });
  };

  const { columnConfigs, tabData } = getUserConfigs(
    updateAnUserStatus,
    handleEdit,
    handleView
  );

  const handleTableChange = (pagination) => {
    setPagination({
      page: pagination.current,
      limit: pagination.pageSize,
    });
  };

  const tabItems = tabData.map((tab, index) => ({
    key: index.toString(),
    label: (
      <Space>
        {tab.label}
        <Badge count={pagination?.total || 0} />
      </Space>
    ),
  }));

  return (
    <>
      {contextHolder}
      <Card variant="borderless">
        {/* Tabs */}
        <Tabs
          activeKey={selectedTab.toString()}
          onChange={(key) => setSelectedTab(parseInt(key))}
          items={tabItems}
          style={{ margin: "0 16px" }}
          tabBarExtraContent={{
            right: (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => openForm()}
                style={{
                  background:
                    "linear-gradient(135deg, #00A5CF 0%, #00315C 100%)",
                  border: "none",
                }}
              >
                Add User
              </Button>
            ),
          }}
        />

        {/* Table */}
        <Table
          dataSource={users}
          columns={columnConfigs}
          loading={loading}
          bordered
          pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            total: pagination.total,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            pageSizeOptions: ["5", "10", "20", "50"],
          }}
          onChange={handleTableChange}
          scroll={{ x: "max-content" }}
          size="middle"
          locale={{ emptyText: "No users found" }}
          rowKey="id"
        />
      </Card>

      <UserForm
        open={open}
        onClose={() => setOpen(false)}
        isEditing={isEditing}
        userData={selectedUser}
        onAdd={addUser}
        onEdit={updateAnUser}
      />

      <UserView
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        userData={viewUser}
        onEdit={handleEdit}
      />
    </>
  );
};

export default ManageUsers;
