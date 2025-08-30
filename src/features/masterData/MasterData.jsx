import { Card, Tabs } from "antd";
import { useCallback, useState } from "react";
import { tabs } from "./config/masterDataConfig";

const MasterData = () => {
  const [activeTab, setActiveTab] = useState("0");

  const handleTabChange = useCallback((newValue) => {
    setActiveTab(newValue);
  }, []);

  // Render only the active tab content to ensure proper component lifecycle
  const getActiveTabContent = () => {
    const activeTabIndex = parseInt(activeTab);
    const tab = tabs[activeTabIndex];

    if (!tab) {
      return (
        <div style={{ padding: 16, textAlign: "center", color: "#8c8c8c" }}>
          Tab content not found
        </div>
      );
    }

    return tab.content || <div>{tab.label} Content</div>;
  };

  const tabItems = tabs?.map((tab, index) => ({
    key: index.toString(),
    label: tab.label,
    children: null,
  }));

  return (
    <Card variant="borderless">
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        type="line"
        size="middle"
        items={tabItems}
        tabBarStyle={{
          margin: 0,
        }}
      />
      {/* Render active tab content separately to ensure proper component lifecycle */}
      <div>{getActiveTabContent()}</div>
    </Card>
  );
};

export default MasterData;
