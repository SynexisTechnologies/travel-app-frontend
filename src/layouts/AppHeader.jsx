import { useState } from "react";
import {
  Layout,
  theme,
  Typography,
  Input,
  Space,
  Button,
  Dropdown,
  Avatar,
  Badge,
  Tooltip,
  Flex,
} from "antd";
import {
  SearchOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  SunOutlined,
  MoonOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import { useLocation, useNavigate } from "react-router";
import { useTheme, useAuth } from "@/shared";
import { menuItems } from "./SiderItems";

const { Header } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

const AppHeader = ({ collapsed, onToggleCollapse, isMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { themeMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [searchValue, setSearchValue] = useState("");

  const {
    token: { colorBgContainer, colorPrimary },
  } = theme.useToken();

  const headerLabel =
    menuItems
      .flatMap((group) => group.items)
      .find((item) => item.path === location.pathname)?.label || "Travel App";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  // Get user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Profile dropdown menu items
  const profileMenuItems = [
    {
      key: "profile",
      label: "Profile",
      icon: <UserOutlined />,
      onClick: handleProfile,
    },
    {
      key: "settings",
      label: "Settings",
      icon: <SettingOutlined />,
      onClick: handleSettings,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <Header
      style={{
        padding: "0 16px",
        background: colorBgContainer,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow:
          "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
      }}
    >
      {/* Left Section - Toggle and Title */}
      <Flex align="center" gap="middle">
        <Button
          type="text"
          icon={<MenuOutlined style={{ color: colorPrimary }} />}
          onClick={onToggleCollapse}
          style={{
            fontSize: "16px",
            width: 32,
            height: 32,
          }}
          shape="circle"
        />
        <Title level={4} style={{ margin: 0, color: colorPrimary }}>
          {headerLabel}
        </Title>
      </Flex>

      {/* Center Section - Search Bar (Hidden on small screens) */}
      <Flex
        style={{
          flex: 1,
          maxWidth: 500,
          margin: "0 32px",
          display: isMobile ? "none" : "flex",
        }}
        align="center"
        justify="center"
      >
        <Search
          placeholder="Search destinations, users..."
          allowClear
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: "100%" }}
        />
      </Flex>

      {/* Right Section - Actions and Profile */}
      <Space size="middle">
        {/* Mobile Search Button */}
        {isMobile && (
          <Tooltip title="Search">
            <Button type="text" icon={<SearchOutlined />} />
          </Tooltip>
        )}

        {/* Theme Toggle */}
        <Button
          type="text"
          size="large"
          icon={themeMode === "dark" ? <SunOutlined /> : <MoonOutlined />}
          onClick={toggleTheme}
          shape="circle"
          style={{
            fontSize: "20px",
          }}
        />

        {/* Notifications */}
        <Badge count={3} size="small">
          <BellOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
        </Badge>

        {/* Profile Dropdown */}
        <Dropdown
          menu={{ items: profileMenuItems }}
          placement="bottomRight"
          arrow
        >
          <Flex align="center" gap="middle">
            <Button type="text" style={{ padding: 0, height: "auto" }}>
              <Avatar
                size={32}
                style={{
                  backgroundColor: colorPrimary,
                  cursor: "pointer",
                }}
              >
                {getUserInitials(user?.firstname + " " + user?.lastname)}
              </Avatar>
              <Space direction="vertical" size={0} align="start">
                <Text>{user?.firstname || "User"}</Text>
                {user?.role && <Text type="secondary">{user.role}</Text>}
              </Space>
            </Button>
          </Flex>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default AppHeader;
