import React from "react";
import { Tag, Rate, Button, Space, Popconfirm, message } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import type { DestinationData, DestinationAdditionalData } from "../types";

interface DestinationColumnsProps {
  additionalData?: DestinationAdditionalData;
  onApprove?: (record: DestinationData) => Promise<void>;
  onReject?: (record: DestinationData) => Promise<void>;
  selectedTab?: number;
  messageApi?: any;
}

export const destinationColumnsWithActions = ({
  additionalData = {
    categories: [],
    transportMethods: [],
    travelTypes: [],
  },
  onApprove,
  onReject,
  selectedTab = 0,
  messageApi,
}: DestinationColumnsProps) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 70,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 200,
    ellipsis: true,
  },
  {
    title: "Location",
    dataIndex: "city",
    key: "city",
    width: 200,
    render: (city: string, record: DestinationData) => {
      const locationParts = [];
      if (city) locationParts.push(city);
      if (record.district) locationParts.push(record.district);
      if (record.province) locationParts.push(record.province);

      return locationParts.length > 0 ? locationParts.join(", ") : "-";
    },
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    width: 150,
    render: (categoryId: string | number) => {
      if (!categoryId) return "-";
      const category = additionalData.categories?.find(
        (cat: any) => cat.id == categoryId
      );
      return category ? category.category_name : categoryId;
    },
  },
  {
    title: "Transport",
    dataIndex: "transport_method",
    key: "transport_method",
    width: 120,
    render: (transportId: string | number) => {
      if (!transportId) return "-";
      const transport = additionalData.transportMethods?.find(
        (t: any) => t.id == transportId
      );
      return transport ? transport.transport_method : transportId;
    },
  },
  {
    title: "Travel Type",
    dataIndex: "traveler_type",
    key: "traveler_type",
    width: 120,
    render: (travelTypeId: string | number) => {
      if (!travelTypeId) return "-";
      const travelType = additionalData.travelTypes?.find(
        (t: any) => t.id == travelTypeId
      );
      return travelType ? travelType.travel_type : travelTypeId;
    },
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
    width: 120,
    render: (rating: number) => (
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <Rate disabled defaultValue={rating || 0} style={{ fontSize: 14 }} />
        <span style={{ fontSize: "12px", color: "#666" }}>({rating || 0})</span>
      </div>
    ),
  },
  {
    title: "Price",
    dataIndex: "ticket_price",
    key: "ticket_price",
    width: 100,
    render: (price: number) => {
      return price ? `$${price}` : "Free";
    },
  },
  {
    title: "Status",
    key: "status",
    width: 100,
    render: (_: any, record: DestinationData) => {
      let status = "pending";
      let color = "orange";

      if (record.approved) {
        status = "approved";
        color = "green";
      } else if (record.reject) {
        status = "rejected";
        color = "red";
      }

      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
  },
  {
    title: "Actions",
    key: "actions",
    width: 150,
    render: (_: any, record: DestinationData) => {
      // Show approve/reject buttons only for pending items or on All tab
      const isPending = record.pending && !record.approved && !record.reject;
      const showActions = selectedTab === 0 || selectedTab === 1; // All or Pending tab

      if (!showActions || !isPending) {
        return null;
      }

      return (
        <Space size="small">
          <Popconfirm
            title="Approve Destination"
            description="Are you sure you want to approve this destination?"
            onConfirm={async () => {
              if (onApprove) {
                try {
                  await onApprove(record);
                  messageApi?.success("Destination approved successfully");
                } catch (error) {
                  messageApi?.error("Failed to approve destination");
                }
              }
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              size="small"
              icon={<CheckOutlined />}
              style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
            >
              Approve
            </Button>
          </Popconfirm>

          <Popconfirm
            title="Reject Destination"
            description="Are you sure you want to reject this destination?"
            onConfirm={async () => {
              if (onReject) {
                try {
                  await onReject(record);
                  messageApi?.success("Destination rejected successfully");
                } catch (error) {
                  messageApi?.error("Failed to reject destination");
                }
              }
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" size="small" danger icon={<CloseOutlined />}>
              Reject
            </Button>
          </Popconfirm>
        </Space>
      );
    },
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
    width: 120,
    render: (date: string) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    },
  },
];
