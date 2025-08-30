import React from "react";
import { Avatar, Tag, Button, Space, Tooltip, Typography } from "antd";
import {
  UserOutlined,
  CrownOutlined,
  SettingOutlined,
  TeamOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const ROLES = ["All", "Super Admin", "Admin", "User", "Vendor", "Contributor"];

const ROLE_CONFIGS = {
  "SUPER ADMIN": { icon: CrownOutlined, color: "red" },
  ADMIN: { icon: SettingOutlined, color: "orange" },
  MANAGER: { icon: TeamOutlined, color: "blue" },
  USER: { icon: UserOutlined, color: "green" },
  VENDOR: { icon: UserOutlined, color: "purple" },
  CONTRIBUTOR: { icon: UserOutlined, color: "cyan" },
  Viewer: { icon: EyeOutlined, color: "default" },
};

const getRoleIcon = (role) => {
  const config = ROLE_CONFIGS[role?.toUpperCase()];
  const IconComponent = config?.icon || UserOutlined;
  return <IconComponent />;
};

const getRoleColor = (role) =>
  ROLE_CONFIGS[role?.toUpperCase()]?.color || "default";

export const getUserConfigs = (updateAnUserStatus, handleEdit, handleView) => {
  return {
    getRoleName: (selectedTab) => ROLES[selectedTab] || "All",

    tabData: ROLES.map((label) => ({ label, count: 0 })),

    columnConfigs: [
      {
        title: "User",
        dataIndex: "user",
        key: "user",
        render: (_, record) => (
          <Space size="middle">
            <Avatar size="large" style={{ backgroundColor: "#1890ff" }}>
              {record.avatar ||
                `${record.firstname?.[0] || ""}${record.lastname?.[0] || ""}`}
            </Avatar>
            <div>
              <Text strong>
                {record?.firstname} {record?.lastname}
              </Text>
              <br />
              <Text type="secondary" style={{ fontSize: "12px" }}>
                ID: {record.userid}
              </Text>
            </div>
          </Space>
        ),
        width: 200,
      },
      {
        title: "Contact",
        dataIndex: "email",
        key: "email",
        render: (email, record) => (
          <div>
            <Text>{email}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: "12px" }}>
              Member since {new Date(record.addeddatetime).toLocaleDateString()}
            </Text>
          </div>
        ),
        width: 220,
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
        align: "center",
        render: (role, record) => {
          const roleName =
            role?.toUpperCase() === "USER"
              ? record.vendor
                ? "Vendor"
                : "Contributor"
              : role;
          return (
            <Tag icon={getRoleIcon(roleName)} color={getRoleColor(roleName)}>
              {roleName}
            </Tag>
          );
        },
        width: 120,
      },
      {
        title: "Status",
        dataIndex: "isactive",
        key: "isactive",
        align: "center",
        render: (isActive, record) => (
          <Tooltip
            title={`Click to set status to ${isActive ? "Inactive" : "Active"}`}
          >
            <Button
              variant="solid"
              color={isActive ? "green" : "red"}
              size="small"
              onClick={() => updateAnUserStatus(record.id, !isActive)}
              style={{ borderRadius: "6px" }}
            >
              {isActive ? "Active" : "Inactive"}
            </Button>
          </Tooltip>
        ),
        width: 100,
      },
      {
        title: "Last Login",
        dataIndex: "loggeddatetime",
        key: "loggeddatetime",
        width: 150,
        render: (date) => (
          <Text>{date ? new Date(date).toLocaleString() : "Never"}</Text>
        ),
      },
      {
        title: "Actions",
        key: "actions",
        align: "center",
        render: (_, record) => (
          <Space>
            <Tooltip title="View User">
              <Button
                type="text"
                icon={<EyeOutlined />}
                onClick={() => handleView(record.id)}
                style={{ color: "#1890ff" }}
              />
            </Tooltip>
            <Tooltip title="Edit User">
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleEdit(record.id)}
                style={{ color: "#52c41a" }}
              />
            </Tooltip>
          </Space>
        ),
        width: 100,
      },
    ],
  };
};
