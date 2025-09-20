import React, { useState } from "react";
import { Tabs } from "antd";
import {
  DestinationCategoriesTabContent,
  DestinationTravelTypesTabContent,
  DestinationTransportMethodsTabContent,
} from "./components";

const DestinationTabContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("categories");

  const tabItems = [
    {
      key: "categories",
      label: "Destination Categories",
      children: <DestinationCategoriesTabContent />,
    },
    {
      key: "travel-types",
      label: "Travel Types",
      children: <DestinationTravelTypesTabContent />,
    },
    {
      key: "transport-methods",
      label: "Transport Methods",
      children: <DestinationTransportMethodsTabContent />,
    },
  ];

  return (
    <Tabs
      activeKey={activeTab}
      onChange={setActiveTab}
      items={tabItems}
      type="line"
      size="middle"
      tabBarStyle={{
        margin: 0,
      }}
    />
  );
};

export default DestinationTabContent;
