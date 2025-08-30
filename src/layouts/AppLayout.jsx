import { useState, useEffect } from "react";
import { Card, Layout } from "antd";
import AppHeader from "./AppHeader";
import AppSider from "./AppSider";
import { Outlet } from "react-router";

const { Content } = Layout;

const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(false); // Don't use collapsed state on mobile
      }
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleToggleCollapse = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <AppSider
        collapsed={collapsed}
        onCollapse={setCollapsed}
        mobileOpen={mobileOpen}
        onMobileClose={handleMobileClose}
      />

      {/* Main Layout */}
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <AppHeader
          collapsed={collapsed}
          onToggleCollapse={handleToggleCollapse}
          isMobile={isMobile}
        />

        {/* Content */}
        <Content style={{ padding: 16 }}>
          <Outlet />
        </Content>
      </Layout>

      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            zIndex: 999,
          }}
          onClick={handleMobileClose}
        />
      )}
    </Layout>
  );
};

export default AppLayout;
