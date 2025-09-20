import React, { useState, useMemo, useEffect } from "react";
import {
  Layout,
  Menu,
  theme,
  Drawer,
  Button,
  Divider,
  ConfigProvider,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router";
import { menuItems } from "./SiderItems";
import CompanyLogo from "../shared/assets/company-logo.png";

interface AppSiderProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const { Sider } = Layout;

const AppSider: React.FC<AppSiderProps> = ({
  collapsed,
  onCollapse,
  mobileOpen,
  onMobileClose,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const {
    token: { colorBgContainer, colorText },
  } = theme.useToken();

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Get selected keys based on current path
  const selectedKeys = useMemo(() => {
    const currentPath = location.pathname;
    const selectedKey = menuItems
      .flatMap((group) => group.items)
      .find((item) => item.path === currentPath)?.key;
    return selectedKey ? [selectedKey] : [];
  }, [location.pathname]);

  // Convert menu structure to Ant Design Menu items
  const antdMenuItems: any[] = useMemo(() => {
    return menuItems.map((group) => ({
      type: "group" as const,
      label: group.title,
      children: group.items.map((item) => ({
        key: item.key,
        icon: item.icon,
        label: item.label,
        onClick: () => {
          navigate(item.path);
          // Close mobile drawer when navigating
          if (isMobile && onMobileClose) {
            onMobileClose();
          }
        },
      })),
    }));
  }, [navigate, isMobile, onMobileClose]);

  // Sidebar content
  const sidebarContent = (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Logo Section */}
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: colorBgContainer,
          position: "relative",
          padding: collapsed && !isMobile ? "0 16px" : "0 24px",
        }}
      >
        {/* Close button for mobile */}
        {isMobile && (
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={onMobileClose}
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        )}

        {collapsed && !isMobile ? (
          <div
            style={{
              width: 32,
              height: 32,
              background: "#1890ff",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            T
          </div>
        ) : (
          <img
            src={CompanyLogo}
            alt="Company Logo"
            style={{
              width: "100%",
              maxHeight: 36,
              objectFit: "contain",
            }}
          />
        )}
      </div>
      <Divider style={{ margin: 0 }} />

      {/* Menu Section */}
      <div
        style={{ flex: 1, overflow: "auto" }}
        className="sider-content-scroll"
      >
        <ConfigProvider theme={{ components: { Menu: { itemHeight: 28 } } }}>
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            style={{
              borderRight: 0,
            }}
            items={antdMenuItems}
            inlineCollapsed={collapsed && !isMobile}
            theme="light"
          />
        </ConfigProvider>
      </div>
    </div>
  );

  // Mobile drawer
  if (isMobile) {
    return (
      <Drawer
        title={null}
        placement="left"
        closable={false}
        onClose={onMobileClose}
        open={mobileOpen}
        styles={{ body: { padding: 0 } }}
        width={256}
      >
        {sidebarContent}
      </Drawer>
    );
  }

  // Desktop sidebar
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      theme="light"
      width={256}
      collapsedWidth={80}
      trigger={null}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
        background: colorBgContainer,
        zIndex: 1000,
        boxShadow:
          "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
      }}
    >
      {sidebarContent}
    </Sider>
  );
};

export default AppSider;
