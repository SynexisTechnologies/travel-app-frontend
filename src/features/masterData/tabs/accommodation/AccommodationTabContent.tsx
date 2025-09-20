import React, { useState } from "react";
import { Tabs } from "antd";
import AccommodationCategoriesTabContent from "./AccommodationCategoriesTabContent";
import AccommodationFacilitiesTabContent from "./AccommodationFacilitiesTabContent";

const AccommodationTabContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("categories");

  const tabItems = [
    {
      key: "categories",
      label: "Categories",
      children: <AccommodationCategoriesTabContent />,
    },
    {
      key: "facilities",
      label: "Facilities",
      children: <AccommodationFacilitiesTabContent />,
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

export default AccommodationTabContent;
