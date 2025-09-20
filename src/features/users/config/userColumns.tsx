import React from "react";
import { Avatar, Tag, Typography } from "antd";
import {
  UserOutlined,
  CrownOutlined,
  SettingOutlined,
  TeamOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const ROLE_CONFIGS = {
  "SUPER ADMIN": { icon: CrownOutlined, color: "red" },
  ADMIN: { icon: SettingOutlined, color: "orange" },
  MANAGER: { icon: TeamOutlined, color: "blue" },
  USER: { icon: UserOutlined, color: "green" },
  VENDOR: { icon: UserOutlined, color: "purple" },
  CONTRIBUTOR: { icon: UserOutlined, color: "cyan" },
  Viewer: { icon: EyeOutlined, color: "default" },
};

const getRoleIcon = (role: string) => {
  const config = ROLE_CONFIGS[role?.toUpperCase() as keyof typeof ROLE_CONFIGS];
  const IconComponent = config?.icon || UserOutlined;
  return <IconComponent />;
};

const getRoleColor = (role: string) =>
  ROLE_CONFIGS[role?.toUpperCase() as keyof typeof ROLE_CONFIGS]?.color ||
  "default";

export const userColumns = [
  {
    title: "User",
    dataIndex: "user",
    key: "user",
    render: (_: any, record: any) => (
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
      </div>
    ),
    width: 200,
  },
  {
    title: "Contact",
    dataIndex: "email",
    key: "email",
    render: (email: any, record: any) => (
      <div>
        <Text>{email}</Text>
        <br />
        <Text type="secondary" style={{ fontSize: "12px" }}>
          {record.countryareacode && record.phonenumber
            ? `${record.countryareacode} ${record.phonenumber}`
            : "No phone"}
        </Text>
      </div>
    ),
    width: 220,
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    align: "center" as const,
    render: (role: any, record: any) => {
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
    align: "center" as const,
    render: (isActive: any) => (
      <Tag color={isActive ? "green" : "red"}>
        {isActive ? "Active" : "Inactive"}
      </Tag>
    ),
    width: 100,
  },
  {
    title: "Last Login",
    dataIndex: "loggeddatetime",
    key: "loggeddatetime",
    width: 150,
    render: (date: any) => (
      <Text>{date ? new Date(date).toLocaleString() : "Never"}</Text>
    ),
  },
  {
    title: "Created",
    dataIndex: "addeddatetime",
    key: "addeddatetime",
    width: 150,
    render: (date: any) => (
      <Text>{date ? new Date(date).toLocaleDateString() : "N/A"}</Text>
    ),
  },
];
