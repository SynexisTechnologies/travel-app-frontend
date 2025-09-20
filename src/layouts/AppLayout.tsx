import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import AppSider from "./AppSider";

const { Content } = Layout;

interface LayoutProps {
  children?: React.ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setCollapsed(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppSider
        collapsed={collapsed}
        onCollapse={setCollapsed}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <Layout>
        <AppHeader
          collapsed={collapsed}
          onToggleCollapse={handleToggle}
          isMobile={isMobile}
        />

        <Content style={{ padding: 16 }}>
          <Outlet />
          {children}
        </Content>
      </Layout>

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
          onClick={() => setMobileOpen(false)}
        />
      )}
    </Layout>
  );
};

export default AppLayout;
