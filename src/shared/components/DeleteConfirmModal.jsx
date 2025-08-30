import React from "react";
import { Modal, Typography, Space } from "antd";
import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const DeleteConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message,
  itemName = "this item",
  itemType = "item",
  loading = false,
  danger = true,
}) => {
  const defaultMessage = `Are you sure you want to delete this ${itemType}? This action cannot be undone.`;

  return (
    <Modal
      title={
        <Space align="center">
          <ExclamationCircleOutlined
            style={{
              color: danger ? "#ff4d4f" : "#faad14",
              fontSize: "20px",
            }}
          />
          <Title
            level={4}
            style={{ margin: 0, color: danger ? "#ff4d4f" : "#faad14" }}
          >
            {title}
          </Title>
        </Space>
      }
      open={open}
      onCancel={onClose}
      onOk={onConfirm}
      okText="Delete"
      cancelText="Cancel"
      width={480}
      centered
      okButtonProps={{
        danger: danger,
        loading: loading,
        icon: <DeleteOutlined />,
        style: {
          background: danger ? "#ff4d4f" : undefined,
          borderColor: danger ? "#ff4d4f" : undefined,
        },
      }}
      cancelButtonProps={{
        style: {
          borderColor: "#d9d9d9",
        },
      }}
      maskClosable={!loading}
      closable={!loading}
      destroyOnHidden
    >
      <div style={{ padding: "16px 0" }}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          {/* Main message */}
          <Text style={{ fontSize: "16px", lineHeight: "1.5" }}>
            {message || defaultMessage}
          </Text>

          {/* Item name highlight */}
          {itemName && itemName !== "this item" && (
            <div
              style={{
                padding: "12px 16px",
                backgroundColor: "#fff2f0",
                borderLeft: "4px solid #ff4d4f",
                borderRadius: "4px",
                marginTop: "8px",
              }}
            >
              <Text strong style={{ color: "#262626" }}>
                {itemType.charAt(0).toUpperCase() + itemType.slice(1)}:
              </Text>
              <Text
                style={{ color: "#ff4d4f", marginLeft: "8px", fontWeight: 600 }}
              >
                {itemName}
              </Text>
            </div>
          )}

          {/* Warning text */}
          <Text
            type="secondary"
            style={{ fontSize: "14px", fontStyle: "italic" }}
          >
            <ExclamationCircleOutlined
              style={{ marginRight: "6px", color: "#faad14" }}
            />
            This action is permanent and cannot be reversed.
          </Text>
        </Space>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
